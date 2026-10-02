"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import IgIcon from "./IgIcon";

const links = [
  { href: "/", label: "HOME" },
  { href: "/cuts", label: "SERVICES" },
  { href: "/tressa", label: "TRESSA SHOP" },
  { href: "/studio", label: "STUDIO" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-matte/80 backdrop-blur-xl transition-all">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative flex h-10 w-28 items-center justify-center overflow-hidden rounded-xl border border-amber/40 bg-black/80 px-2 py-1 shadow-[0_0_15px_rgba(232,186,132,0.2)]">
            <Image
              src="/images/gmcutz-logo.png"
              alt="Gm-Cutz Logo"
              fill
              className="object-contain p-1"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-base font-black tracking-tight text-warm">
                GM-CUTZ
              </span>
              <span className="rounded-full border border-amber/30 bg-amber/10 px-2 py-0.2 text-[9px] font-bold tracking-[0.25em] text-amber">
                TRESSA
              </span>
            </div>
            <span className="text-[9px] tracking-widest text-muted/70 font-mono hidden sm:block">
              PRIVATE BARBER STUDIO
            </span>
          </div>
        </Link>

        {/* Live Studio Status Pill */}
        <div className="hidden lg:flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold tracking-wider text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          STUDIO ACTIVE · SLOTS AVAILABLE
        </div>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => {
            const isActive = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative text-xs font-bold tracking-[0.2em] transition-all ${
                  isActive
                    ? "text-amber text-glow"
                    : "text-muted hover:text-warm"
                }`}
              >
                {l.label}
                {isActive && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-amber to-amber/30" />
                )}
              </Link>
            );
          })}

          <Link
            href="/cuts#booking"
            className="btn-shimmer flex items-center gap-2 rounded-full border border-amber/50 px-5 py-2 text-xs font-bold tracking-[0.2em] text-warm transition hover:border-amber hover:text-amber"
          >
            TERMIN BUCHEN
          </Link>
        </div>

        {/* Mobile toggle button */}
        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-amber md:hidden"
          aria-label="Menü"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-white/10 bg-matte/98 px-6 py-6 backdrop-blur-2xl md:hidden">
          <div className="flex flex-col gap-4">
            <div className="mb-2 flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-semibold text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              STUDIO ACTIVE · SLOTS AVAILABLE
            </div>

            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between border-b border-white/5 py-2 text-sm font-bold tracking-[0.2em] ${
                  pathname === l.href ? "text-amber text-glow" : "text-muted"
                }`}
              >
                {l.label}
                {pathname === l.href && <Sparkles size={14} className="text-amber" />}
              </Link>
            ))}

            <Link
              href="/cuts#booking"
              onClick={() => setOpen(false)}
              className="mt-4 flex items-center justify-center gap-2 rounded-full border border-amber/50 bg-amber/10 py-3.5 text-xs font-bold tracking-widest text-amber"
            >
              TERMIN ONLINE BUCHEN
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
