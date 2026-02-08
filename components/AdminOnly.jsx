"use client";

import { useSession } from "next-auth/react";

export default function AdminOnly({ children }) {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  if (!session || session.user.role !== "admin") {
    return <p>Access Denied</p>;
  }

  return children;
}
