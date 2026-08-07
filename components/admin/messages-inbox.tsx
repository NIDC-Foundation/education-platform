"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn, formatRelativeTime } from "@/lib/utils";
import { Loader2, Mail, Send } from "lucide-react";
import { DONOR_MESSAGE_CATEGORIES, SCHOLAR_MESSAGE_CATEGORIES } from "@/lib/constants";
import { getThreadMessages, markThreadRead, sendMessage } from "@/lib/supabase/actions";
import type { MessageThreadSummary, ThreadMessage } from "@/types";

const ALL_CATEGORIES = [...SCHOLAR_MESSAGE_CATEGORIES, ...DONOR_MESSAGE_CATEGORIES];

function getCategoryLabel(value: string): string {
    return ALL_CATEGORIES.find((category) => category.value === value)?.label ?? value;
}

function getSenderLabel(message: ThreadMessage, currentUserId: string, thread: MessageThreadSummary): string {
    if (message.senderId === currentUserId) return "You";
    if (message.senderId === thread.ownerId) return thread.ownerName || "Sender";
    return "Team member";
}

interface AdminMessagesInboxProps {
    threads: MessageThreadSummary[];
    currentUserId: string;
}

export function AdminMessagesInbox({ threads, currentUserId }: AdminMessagesInboxProps) {
    const router = useRouter();
    const [ownerRoleFilter, setOwnerRoleFilter] = useState<"all" | "scholar" | "donor">("all");
    const [selectedThreadId, setSelectedThreadId] = useState<string | null>(threads[0]?.id ?? null);
    const [messages, setMessages] = useState<ThreadMessage[]>([]);
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [draft, setDraft] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const filteredThreads = useMemo(
        () => threads.filter((thread) => ownerRoleFilter === "all" || thread.ownerRole === ownerRoleFilter),
        [threads, ownerRoleFilter]
    );

    const activeThread = filteredThreads.find((thread) => thread.id === selectedThreadId) ?? null;

    function handleOwnerRoleFilterChange(nextFilter: "all" | "scholar" | "donor") {
        const nextFilteredThreads = threads.filter(
            (thread) => nextFilter === "all" || thread.ownerRole === nextFilter
        );
        setOwnerRoleFilter(nextFilter);
        setSelectedThreadId(nextFilteredThreads[0]?.id ?? null);
    }

    useEffect(() => {
        if (!selectedThreadId) {
            return;
        }

        let cancelled = false;

        (async () => {
            setIsLoadingMessages(true);
            const threadMessages = await getThreadMessages(selectedThreadId);
            if (cancelled) return;
            setMessages(threadMessages);
            setIsLoadingMessages(false);
            await markThreadRead(selectedThreadId);
            if (!cancelled) router.refresh();
        })();

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedThreadId]);

    async function handleSend() {
        if (!selectedThreadId || !draft.trim()) return;
        setIsSending(true);
        setError(null);

        const { error: sendError } = await sendMessage(selectedThreadId, draft.trim());

        if (sendError) {
            setError(sendError);
            setIsSending(false);
            return;
        }

        setDraft("");
        const threadMessages = await getThreadMessages(selectedThreadId);
        setMessages(threadMessages);
        setIsSending(false);
        router.refresh();
    }

    return (
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <Card className="border-border/60">
                <CardHeader className="space-y-3">
                    <CardTitle className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-primary" />
                        Threads
                    </CardTitle>
                    <CardDescription>All scholar and donor conversations.</CardDescription>
                    <Select value={ownerRoleFilter} onValueChange={(value) => handleOwnerRoleFilterChange(value as typeof ownerRoleFilter)}>
                        <SelectTrigger className="w-full">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All conversations</SelectItem>
                            <SelectItem value="scholar">Scholars</SelectItem>
                            <SelectItem value="donor">Donors</SelectItem>
                        </SelectContent>
                    </Select>
                </CardHeader>
                <CardContent className="space-y-3">
                    {filteredThreads.length === 0 && (
                        <div className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
                            No conversations in this view.
                        </div>
                    )}
                    {filteredThreads.map((thread) => {
                        const isActive = thread.id === selectedThreadId;

                        return (
                            <button
                                key={thread.id}
                                type="button"
                                onClick={() => setSelectedThreadId(thread.id)}
                                aria-pressed={isActive}
                                className={cn(
                                    "w-full rounded-xl border bg-background p-4 text-left transition-colors",
                                    isActive ? "border-primary/40 bg-primary/5" : "hover:bg-muted/30"
                                )}
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <p className="font-medium">{thread.ownerName || "Unknown user"}</p>
                                        <p className="text-xs text-muted-foreground capitalize">{thread.ownerRole}</p>
                                    </div>
                                    {thread.unreadCount > 0 && <Badge>{thread.unreadCount}</Badge>}
                                </div>
                                <p className="mt-2 text-xs font-medium text-primary">
                                    {thread.subject || getCategoryLabel(thread.category)}
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                                    {thread.lastMessage || "No messages yet."}
                                </p>
                                <p className="mt-2 text-xs text-muted-foreground">{formatRelativeTime(thread.lastMessageAt)}</p>
                            </button>
                        );
                    })}
                </CardContent>
            </Card>

            <Card className="border-border/60">
                <CardHeader>
                    <CardTitle>{activeThread ? activeThread.ownerName || "Unknown user" : "No thread selected"}</CardTitle>
                    <CardDescription>
                        {activeThread
                            ? `${getCategoryLabel(activeThread.category)} · ${activeThread.ownerRole}`
                            : "Select a conversation from the queue."}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {activeThread ? (
                        <>
                            <div className="space-y-3">
                                {isLoadingMessages ? (
                                    <div className="flex items-center justify-center py-10 text-muted-foreground">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    </div>
                                ) : (
                                    messages.map((message) => {
                                        const isMine = message.senderId === currentUserId;

                                        return (
                                            <div
                                                key={message.id}
                                                className={`rounded-xl p-4 text-sm ${isMine ? "bg-primary text-primary-foreground ml-8" : "bg-muted/30 mr-8"}`}
                                            >
                                                <p className="font-medium">
                                                    {getSenderLabel(message, currentUserId, activeThread)}
                                                </p>
                                                <p className={`mt-2 ${isMine ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
                                                    {message.body}
                                                </p>
                                                <p className={`mt-2 text-xs ${isMine ? "text-primary-foreground/70" : "text-muted-foreground/70"}`}>
                                                    {formatRelativeTime(message.createdAt)}
                                                </p>
                                            </div>
                                        );
                                    })
                                )}
                            </div>

                            <div className="rounded-xl border bg-background p-4">
                                {error && <p className="text-xs text-destructive mb-2">{error}</p>}
                                <Textarea
                                    rows={5}
                                    placeholder="Reply on behalf of the programme office..."
                                    value={draft}
                                    onChange={(event) => setDraft(event.target.value)}
                                />
                                <div className="mt-3 flex justify-end">
                                    <Button disabled={isSending || !draft.trim()} onClick={handleSend}>
                                        {isSending ? (
                                            <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                                        ) : (
                                            <Send className="mr-1" />
                                        )}
                                        Send Reply
                                    </Button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="rounded-xl border border-dashed bg-muted/20 p-6 text-sm text-muted-foreground">
                            No conversations to show yet.
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
