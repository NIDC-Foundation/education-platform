"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageContainer } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn, formatRelativeTime } from "@/lib/utils";
import { Loader2, Mail, Send } from "lucide-react";
import { DONOR_MESSAGE_CATEGORIES } from "@/lib/constants";
import {
    createMessageThread,
    getThreadMessages,
    markThreadRead,
    sendMessage,
} from "@/lib/supabase/actions";
import type { MessageThreadSummary, ThreadMessage } from "@/types";

function getCategoryLabel(value: string): string {
    return DONOR_MESSAGE_CATEGORIES.find((category) => category.value === value)?.label ?? value;
}

function getSenderLabel(message: ThreadMessage, currentUserId: string): string {
    if (message.senderId === currentUserId) return "You";
    return "Programme Office";
}

interface DonorMessagesWorkspaceProps {
    threads: MessageThreadSummary[];
    currentUserId: string;
}

export function DonorMessagesWorkspace({ threads, currentUserId }: DonorMessagesWorkspaceProps) {
    const router = useRouter();
    const [selectedThreadId, setSelectedThreadId] = useState<string | null>(threads[0]?.id ?? null);
    const [messages, setMessages] = useState<ThreadMessage[]>([]);
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [draft, setDraft] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
    const [newCategory, setNewCategory] = useState<string>(DONOR_MESSAGE_CATEGORIES[0].value);
    const [newSubject, setNewSubject] = useState("");
    const [newBody, setNewBody] = useState("");
    const [isCreating, setIsCreating] = useState(false);

    const activeThread = threads.find((thread) => thread.id === selectedThreadId) ?? null;

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

    async function handleCreateThread() {
        if (!newBody.trim()) {
            setError("Please write a message before sending.");
            return;
        }

        setIsCreating(true);
        setError(null);

        const { threadId, error: createError } = await createMessageThread(
            newCategory,
            newSubject.trim() || null,
            newBody.trim()
        );

        if (createError || !threadId) {
            setError(createError || "Unable to start conversation.");
            setIsCreating(false);
            return;
        }

        setIsNewMessageOpen(false);
        setNewSubject("");
        setNewBody("");
        setNewCategory(DONOR_MESSAGE_CATEGORIES[0].value);
        setIsCreating(false);
        setSelectedThreadId(threadId);
        router.refresh();
    }

    return (
        <PageContainer
            title="Messages"
            description="Direct communication with the programme office, scholar support team, and finance operations."
            action={
                <Dialog open={isNewMessageOpen} onOpenChange={setIsNewMessageOpen}>
                    <DialogTrigger asChild>
                        <Button>New Message</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Start a new conversation</DialogTitle>
                            <DialogDescription>
                                Choose a category so the right team can respond.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Category</Label>
                                <Select value={newCategory} onValueChange={setNewCategory}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {DONOR_MESSAGE_CATEGORIES.map((category) => (
                                            <SelectItem key={category.value} value={category.value}>
                                                {category.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="donor-new-subject">Subject (optional)</Label>
                                <Input
                                    id="donor-new-subject"
                                    value={newSubject}
                                    onChange={(event) => setNewSubject(event.target.value)}
                                    placeholder="What is this about?"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="donor-new-body">Message</Label>
                                <Textarea
                                    id="donor-new-body"
                                    rows={4}
                                    value={newBody}
                                    onChange={(event) => setNewBody(event.target.value)}
                                    placeholder="Write your message..."
                                />
                            </div>
                            {error && <p className="text-xs text-destructive">{error}</p>}
                        </div>
                        <DialogFooter>
                            <Button onClick={handleCreateThread} disabled={isCreating} className="gap-2">
                                {isCreating && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                                Send Message
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            }
        >
            <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
                <Card className="border-border/60">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-primary" />
                            Threads
                        </CardTitle>
                        <CardDescription>Recent donor conversations and reporting requests.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {threads.length === 0 && (
                            <div className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
                                No conversations yet. Start one with &ldquo;New Message&rdquo;.
                            </div>
                        )}
                        {threads.map((thread) => {
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
                                            <p className="font-medium">{thread.subject || getCategoryLabel(thread.category)}</p>
                                            <p className="text-xs text-muted-foreground">{getCategoryLabel(thread.category)}</p>
                                        </div>
                                        {thread.unreadCount > 0 && <Badge>{thread.unreadCount}</Badge>}
                                    </div>
                                    <p className="mt-3 text-sm text-muted-foreground">{thread.lastMessage || "No messages yet."}</p>
                                    <p className="mt-2 text-xs text-muted-foreground">{formatRelativeTime(thread.lastMessageAt)}</p>
                                </button>
                            );
                        })}
                    </CardContent>
                </Card>

                <Card className="border-border/60">
                    <CardHeader>
                        <CardTitle>{activeThread ? activeThread.subject || getCategoryLabel(activeThread.category) : "No thread selected"}</CardTitle>
                        <CardDescription>
                            {activeThread ? getCategoryLabel(activeThread.category) : "There are no donor messages yet."}
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
                                                    <p className="font-medium">{getSenderLabel(message, currentUserId)}</p>
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
                                        placeholder="Write a reply or request a specific funding or impact breakdown..."
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
                                            Send Message
                                        </Button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="rounded-xl border border-dashed bg-muted/20 p-6 text-sm text-muted-foreground">
                                Your donor inbox is empty. Once the programme office sends an update, it will appear here.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </PageContainer>
    );
}
