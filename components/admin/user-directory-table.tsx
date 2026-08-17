"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";

type UserEntry = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    status: string;
    created_at: string;
};

function getUserStatusVariant(status: string) {
    if (status === "active") return "default" as const;
    if (status === "pending") return "secondary" as const;
    return "destructive" as const;
}

interface UserDirectoryTableProps {
    users: UserEntry[];
}

export function UserDirectoryTable({ users }: UserDirectoryTableProps) {
    const [query, setQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");

    const roles = useMemo(() => {
        const uniqueRoles = new Set(users.map((u) => u.role || "applicant"));
        return Array.from(uniqueRoles).sort();
    }, [users]);

    const filteredUsers = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        return users.filter((u) => {
            const matchesRole = roleFilter === "all" || u.role === roleFilter;
            if (!matchesRole) return false;

            if (!normalizedQuery) return true;

            const haystack = `${u.first_name} ${u.last_name} ${u.email}`.toLowerCase();
            return haystack.includes(normalizedQuery);
        });
    }, [users, query, roleFilter]);

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by name or email..."
                        className="pl-9"
                    />
                </div>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="sm:w-[180px]">
                        <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All roles</SelectItem>
                        {roles.map((role) => (
                            <SelectItem key={role} value={role} className="capitalize">
                                {role}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <p className="text-sm text-muted-foreground">
                Showing {filteredUsers.length} of {users.length} profiles
            </p>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredUsers.map((u) => (
                        <TableRow key={u.id}>
                            <TableCell className="font-medium">{u.first_name} {u.last_name}</TableCell>
                            <TableCell className="capitalize">{u.role}</TableCell>
                            <TableCell>{u.email}</TableCell>
                            <TableCell>{new Date(u.created_at).toLocaleDateString()}</TableCell>
                            <TableCell>
                                <Badge variant={getUserStatusVariant(u.status)}>
                                    {u.status}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                    {filteredUsers.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-6 text-muted-foreground text-sm">
                                No profiles match your search.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
