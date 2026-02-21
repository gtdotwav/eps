"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconMenu2,
  IconX,
  IconHome,
  IconUsers,
  IconClipboard,
  IconTimeline,
  IconSearch,
  IconTarget,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Feed", icon: IconHome },
  { href: "/people", label: "People", icon: IconUsers },
  { href: "/board", label: "Investigation Board", icon: IconClipboard },
  { href: "/timeline", label: "Timeline", icon: IconTimeline },
  { href: "/search", label: "Search", icon: IconSearch },
  { href: "/progress", label: "Progress", icon: IconTarget },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
        >
          {isOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col z-40 transition-transform md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 border-b border-zinc-800">
          <h1 className="text-2xl font-bold text-white">
            <span className="text-red-600">EPSTEIN</span> FILES
          </h1>
          <p className="text-xs text-zinc-500 mt-1">Investigation Platform</p>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                pathname === href
                  ? "bg-red-600 text-white"
                  : "text-zinc-300 hover:bg-zinc-800"
              )}
            >
              <Icon size={20} />
              <span className="font-medium">{label}</span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-zinc-800 p-4 text-xs text-zinc-500">
          <p>Documents: 33</p>
          <p className="mt-2">Last updated: Today</p>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
