"use client";

import { useSession } from "next-auth/react";

export default function AdminOnly({ children }) {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  if (!session || session.user?.role !== "admin") {
    return null; // hide admin UI from non-admins
  }

  return children;
}
