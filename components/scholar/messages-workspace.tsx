"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
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
import { SCHOLAR_MESSAGE_CATEGORIES } from "@/lib/constants";
import {
    createMessageThread,
    getThreadMessages,
    markThreadRead,
    sendMessage,
} from "@/lib/supabase/actions";
import type { MessageThreadSummary, ThreadMessage } from "@/types";

function getCategoryLabel(value: string): string {
    return SCHOLAR_MESSAGE_CATEGORIES.find((category) => category.value === value)?.label ?? value;
}

function getSenderLabel(message: ThreadMessage, currentUserId: string): string {
    return message.senderId === currentUserId ? "You" : "Programme Team";
}

interface ScholarMessagesWorkspaceProps {
    threads: MessageThreadSummary[];
    currentUserId: string;
}

export function ScholarMessagesWorkspace({ threads, currentUserId }: ScholarMessagesWorkspaceProps) {
    const router = useRouter();
    const [selectedThreadId, setSelectedThreadId] = useState<string | null>(threads[0]?.id ?? null);
    const [messages, setMessages] = useState<ThreadMessage[]>([]);
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [draft, setDraft] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [isNewMessageOpen, setIsNewMessageOpen] = useState(false);
    const [newCategory, setNewCategory] = useState<string>(SCHOLAR_MESSAGE_CATEGORIES[0].value);
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
        setNewCategory(SCHOLAR_MESSAGE_CATEGORIES[0].value);
        setIsCreating(false);
        setSelectedThreadId(threadId);
        router.refresh();
    }

    return (
        <PageContainer
            title="Messages"
            section="Scholar Portal"
            description="Direct communication with your programme mentor, academic support, and finance team."
            action={
                <Dialog open={isNewMessageOpen} onOpenChange={setIsNewMessageOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm" className="rounded-md">
                            New Message
                        </Button>
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
                                        {SCHOLAR_MESSAGE_CATEGORIES.map((category) => (
                                            <SelectItem key={category.value} value={category.value}>
                                                {category.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-subject">Subject (optional)</Label>
                                <Input
                                    id="new-subject"
                                    value={newSubject}
                                    onChange={(event) => setNewSubject(event.target.value)}
                                    placeholder="What is this about?"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-body">Message</Label>
                                <Textarea
                                    id="new-body"
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
            <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
                {/* Thread list */}
                <div className="border border-border/50 rounded-xl overflow-hidden">
                    <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border/50 bg-muted/20">
                        <Mail className="h-3.5 w-3.5 text-primary" />
                        <div>
                            <p className="text-xs font-semibold">Threads</p>
                            <p className="text-[11px] text-muted-foreground mt-0.5">
                                Recent conversations and requests.
                            </p>
                        </div>
                    </div>
                    <div className="divide-y divide-border/50">
                        {threads.length === 0 && (
                            <div className="p-6 text-center text-[11px] text-muted-foreground">
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
                                    className={cn(
                                        "w-full p-4 text-left transition-colors",
                                        isActive
                                            ? "bg-foreground text-background"
                                            : "hover:bg-muted/30"
                                    )}
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p
                                                className={cn(
                                                    "text-xs font-semibold",
                                                    isActive ? "text-background" : "text-foreground"
                                                )}
                                            >
                                                {thread.subject || getCategoryLabel(thread.category)}
                                            </p>
                                            <p
                                                className={cn(
                                                    "text-[11px]",
                                                    isActive
                                                        ? "text-background/60"
                                                        : "text-muted-foreground"
                                                )}
                                            >
                                                {getCategoryLabel(thread.category)}
                                            </p>
                                        </div>
                                        {thread.unreadCount > 0 && (
                                            <span
                                                className={cn(
                                                    "text-[9px] font-bold rounded-full px-2 py-px",
                                                    isActive
                                                        ? "bg-primary text-primary-foreground"
                                                        : "bg-foreground text-background"
                                                )}
                                            >
                                                {thread.unreadCount}
                                            </span>
                                        )}
                                    </div>
                                    <p
                                        className={cn(
                                            "mt-2 text-[11px] line-clamp-1",
                                            isActive ? "text-background/60" : "text-muted-foreground"
                                        )}
                                    >
                                        {thread.lastMessage || "No messages yet."}
                                    </p>
                                    <p
                                        className={cn(
                                            "mt-1 text-[10px]",
                                            isActive
                                                ? "text-background/40"
                                                : "text-muted-foreground/50"
                                        )}
                                    >
                                        {formatRelativeTime(thread.lastMessageAt)}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Thread view */}
                <div className="border border-border/50 rounded-xl overflow-hidden flex flex-col min-h-[500px]">
                    <div className="px-5 py-3.5 border-b border-border/50 bg-muted/20">
                        <p className="text-xs font-semibold">
                            {activeThread ? activeThread.subject || getCategoryLabel(activeThread.category) : "No thread selected"}
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                            {activeThread
                                ? getCategoryLabel(activeThread.category)
                                : "Select a thread to view messages."}
                        </p>
                    </div>
                    <div className="flex-1 flex flex-col p-4">
                        {activeThread ? (
                            <>
                                <div className="flex-1 space-y-3 overflow-y-auto pr-1 pb-3">
                                    {isLoadingMessages ? (
                                        <div className="flex items-center justify-center h-full text-muted-foreground">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        </div>
                                    ) : (
                                        messages.map((message) => {
                                            const isMine = message.senderId === currentUserId;
                                            return (
                                                <div
                                                    key={message.id}
                                                    className={`rounded-xl p-4 text-xs max-w-[85%] ${
                                                        isMine
                                                            ? "bg-foreground text-background ml-auto"
                                                            : "bg-muted/30 mr-auto"
                                                    }`}
                                                >
                                                    <p className="font-semibold mb-1">{getSenderLabel(message, currentUserId)}</p>
                                                    <p
                                                        className={
                                                            isMine
                                                                ? "text-background/80"
                                                                : "text-muted-foreground"
                                                        }
                                                    >
                                                        {message.body}
                                                    </p>
                                                    <p
                                                        className={`mt-1.5 text-[10px] ${
                                                            isMine
                                                                ? "text-background/40"
                                                                : "text-muted-foreground/50"
                                                        }`}
                                                    >
                                                        {formatRelativeTime(message.createdAt)}
                                                    </p>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                                <div className="border border-border/50 rounded-xl p-4 mt-auto bg-muted/10">
                                    {error && <p className="text-xs text-destructive mb-2">{error}</p>}
                                    <Textarea
                                        rows={3}
                                        placeholder="Write a reply..."
                                        className="resize-none text-xs"
                                        value={draft}
                                        onChange={(event) => setDraft(event.target.value)}
                                    />
                                    <div className="mt-3 flex justify-end">
                                        <Button
                                            size="sm"
                                            className="gap-2 rounded-md"
                                            disabled={isSending || !draft.trim()}
                                            onClick={handleSend}
                                        >
                                            {isSending ? (
                                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                            ) : (
                                                <Send className="h-3.5 w-3.5" />
                                            )}
                                            Send Message
                                        </Button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center border border-dashed border-border/50 rounded-xl text-xs text-muted-foreground text-center p-6">
                                Your inbox is empty. Once you receive a message, it will appear
                                here.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PageContainer>
    );
}
