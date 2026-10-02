import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Phone, Mail, Calendar, Clock } from "lucide-react";
import IgIcon from "./IgIcon";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-matte/90 pt-16 pb-12">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-10 md:grid-cols-12 md:items-start">
          {/* Brand Info with Real Logos */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-amber/30 bg-black/60 p-0.5 shadow-[0_0_15px_rgba(232,186,132,0.15)]">
                <Image
                  src="/images/gmcutz-logo.png"
                  alt="GM-CUTZ Logo"
                  width={40}
                  height={40}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-warm">
                  GM-CUTZ
                </span>
                <span className="text-muted">×</span>
                <div className="relative h-6 w-16">
                  <Image
                    src="/images/tressa-logo.png"
                    alt="TRESSA Logo"
                    fill
                    className="object-contain object-left"
                  />
                </div>
              </div>
            </div>

            <p className="mt-4 max-w-sm text-xs leading-relaxed text-muted">
              Exklusives 1-on-1 Keller-Studio für Signature Fades & Tapers. Y2K Streetwear & Grooming Essentials aus dem Untergrund.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-warm/90">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>1-on-1 Private Sessions nach Vereinbarung</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-bold tracking-[0.3em] text-amber uppercase">
              NAVIGATION
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs font-semibold tracking-wider text-muted">
              <li>
                <Link href="/" className="transition hover:text-warm">
                  HOME
                </Link>
              </li>
              <li>
                <Link href="/cuts" className="transition hover:text-warm">
                  SERVICES
                </Link>
              </li>
              <li>
                <Link href="/tressa" className="transition hover:text-warm">
                  TRESSA SHOP
                </Link>
              </li>
              <li>
                <Link href="/studio" className="transition hover:text-warm">
                  THE KELLER-STUDIO
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Booking */}
          <div className="md:col-span-4">
            <h4 className="text-[10px] font-bold tracking-[0.3em] text-amber uppercase">
              KONTAKT & BOOKING
            </h4>

            <div className="mt-4 space-y-2.5 text-xs text-muted">
              <div>
                <a
                  href="tel:+4915115565427"
                  className="flex items-center gap-2 font-bold text-warm transition hover:text-amber"
                >
                  <Phone size={14} className="text-amber" /> +49 151 15565427
                </a>
              </div>

              <div>
                <a
                  href="mailto:gmcutzz774@gmail.com"
                  className="flex items-center gap-2 text-muted transition hover:text-amber"
                >
                  <Mail size={14} className="text-amber" /> gmcutzz774@gmail.com
                </a>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/cuts#booking"
                className="inline-flex items-center gap-1.5 rounded-xl border border-amber/40 bg-amber/10 px-3.5 py-2 text-xs font-bold text-amber transition hover:bg-amber hover:text-black"
              >
                <Calendar size={13} /> ONLINE BUCHEN
              </Link>

              <a
                href="https://ig.me/m/gmcutz_z"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-card px-3.5 py-2 text-xs font-bold text-warm transition hover:border-amber/50 hover:text-amber"
              >
                <IgIcon size={14} /> @gmcutz_z <ArrowUpRight size={12} className="text-muted" />
              </a>
            </div>

            {/* Opening Hours */}
            <div className="mt-5 rounded-xl border border-white/5 bg-black/40 p-3 text-[11px] text-muted space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-warm/90">
                <Clock size={12} className="text-amber" /> STUDIO ÖFFNUNGSZEITEN
              </div>
              <div className="flex justify-between">
                <span>Mo — Fr:</span>
                <span className="font-semibold text-warm">15:30 — 21:30 Uhr</span>
              </div>
              <div className="flex justify-between">
                <span>Sa — So:</span>
                <span className="font-semibold text-warm">13:00 — 21:00 Uhr</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-[11px] text-muted/60 sm:flex-row">
          <p>© {new Date().getFullYear()} GM-CUTZ × TRESSA. All rights reserved.</p>
          <p className="tracking-widest">PRECISION CUTS. EXCLUSIVE VIBES.</p>
        </div>
      </div>
    </footer>
  );
}
