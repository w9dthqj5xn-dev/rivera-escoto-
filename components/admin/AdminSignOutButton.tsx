"use client";
import { signOut } from "next-auth/react";

export default function AdminSignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="text-sm text-gray-400 hover:text-white transition-colors"
    >
      Cerrar sesión
    </button>
  );
}
