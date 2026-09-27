"use client";

import { useMemo, useState } from "react";
import { Check, Scissors, Shield } from "lucide-react";
import IgIcon from "@/components/IgIcon";

interface ServiceOption {
  id: string;
  name: string;
  desc: string;
}

interface AddonOption {
  id: string;
  name: string;
}

const services: ServiceOption[] = [
  {
    id: "skin",
    name: "Skin Fade (Seiten auf 0)",
    desc: "Messerscharfer Übergang von 0mm, präzise Konturen und Styling.",
  },
  {
    id: "taper",
    name: "Low / Mid / High Taper Fade",
    desc: "Modernster Streetwear-Cut mit weichen Koteletten- & Nackenübergängen.",
  },
  {
    id: "burst",
    name: "Burst Fade & Crop",
    desc: "Runder Fade um das Ohr, perfekt abgestimmt auf texturiertes Deckhaar.",
  },
  {
    id: "perm",
    name: "Dauerwelle / Perm Treatment",
    desc: "Struktur, Locken und langanhaltendes Volumen inkl. Schnitt & Finish.",
  },
  {
    id: "highlights",
    name: "Strähnen / Highlights",
    desc: "Sonnige Kontraste & Akzente für mehr Dimension im Haar.",
  },
];

const addons: AddonOption[] = [
  { id: "beard", name: "Bartrasur & Razor Lineup" },
  { id: "spray", name: "Tressa Texture Spray Finish" },
];

const days = ["MO", "DI", "MI", "DO", "FR", "SA"];
const times = ["10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

export default function Booking() {
  const [selectedService, setSelectedService] = useState<string>(services[0].id);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>(days[0]);
  const [selectedTime, setSelectedTime] = useState<string>(times[1]);

  const activeService = services.find((s) => s.id === selectedService) || services[0];

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const igUrl = useMemo(() => {
    const addonNames = selectedAddons
      .map((id) => addons.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(", ");

    const text = `Hey Gio! Ich möchte einen 1-on-1 Termin im Keller-Studio anfragen:%0A%0A💈 Service: ${activeService.name}%0A${
      addonNames ? `✨ Extras: ${addonNames}%0A` : ""
    }📅 Wunschtag: ${selectedDay}%0A🕐 Wunschzeit: ${selectedTime} Uhr%0A%0APasst das bei dir? Danke dir!`;

    return `https://ig.me/m/gmcutz_z?text=${text}`;
  }, [activeService, selectedAddons, selectedDay, selectedTime]);

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column: Interactive Configuration */}
        <div className="space-y-8 rounded-2xl border border-white/10 bg-card p-6 sm:p-8 lg:col-span-7">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber/30 bg-amber/10 text-amber">
                <Scissors size={20} />
              </div>
              <div>
                <h3 className="text-lg font-black text-warm">
                  TERMIN KONFIGURATOR
                </h3>
                <p className="text-xs text-muted">
                  Wähle deinen Schnitt und deinen Wunschslot.
                </p>
              </div>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold text-amber">
              1-ON-1 SESSION
            </span>
          </div>

          {/* Service Selection */}
          <div>
            <label className="mb-3 block text-[10px] font-bold tracking-[0.3em] text-muted uppercase">
              1. WÄHLE DEINEN SERVICE
            </label>
            <div className="space-y-2.5">
              {services.map((s) => {
                const isSelected = selectedService === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedService(s.id)}
                    className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition-all ${
                      isSelected
                        ? "border-amber bg-white/5 shadow-[0_0_20px_rgba(232,186,132,0.1)]"
                        : "border-white/5 bg-matte/50 hover:border-white/20 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border transition ${
                          isSelected
                            ? "border-amber bg-amber text-black"
                            : "border-white/20 bg-transparent"
                        }`}
                      >
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-warm">{s.name}</p>
                        <p className="mt-0.5 text-xs text-muted">{s.desc}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add-ons */}
          <div>
            <label className="mb-3 block text-[10px] font-bold tracking-[0.3em] text-muted uppercase">
              2. OPTIONALE UPGRADES
            </label>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {addons.map((a) => {
                const isChecked = selectedAddons.includes(a.id);
                return (
                  <button
                    key={a.id}
                    onClick={() => toggleAddon(a.id)}
                    className={`flex items-center justify-between rounded-xl border p-3.5 text-left text-xs font-semibold transition ${
                      isChecked
                        ? "border-amber/60 bg-amber/10 text-warm"
                        : "border-white/5 bg-matte/40 text-muted hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex h-4 w-4 items-center justify-center rounded border ${
                          isChecked
                            ? "border-amber bg-amber text-black"
                            : "border-white/20"
                        }`}
                      >
                        {isChecked && <Check size={10} strokeWidth={3} />}
                      </div>
                      <span>{a.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Day & Time Selection */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2.5 block text-[10px] font-bold tracking-[0.3em] text-muted uppercase">
                3. WUNSCHTAG
              </label>
              <div className="grid grid-cols-3 gap-2">
                {days.map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDay(d)}
                    className={`rounded-xl border py-2.5 text-xs font-bold transition ${
                      selectedDay === d
                        ? "border-amber bg-amber/15 text-amber"
                        : "border-white/5 bg-matte/60 text-muted hover:border-white/20 hover:text-warm"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2.5 block text-[10px] font-bold tracking-[0.3em] text-muted uppercase">
                4. UHRZEIT
              </label>
              <div className="grid grid-cols-4 gap-2">
                {times.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className={`rounded-xl border py-2 text-[11px] font-bold transition ${
                      selectedTime === t
                        ? "border-amber bg-amber/15 text-amber"
                        : "border-white/5 bg-matte/60 text-muted hover:border-white/20 hover:text-warm"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Reservation Pass */}
        <div className="flex flex-col lg:col-span-5">
          <div className="sticky top-28 rounded-2xl border border-amber/40 bg-gradient-to-b from-card via-card to-matte p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[9px] font-mono tracking-[0.3em] text-amber uppercase">
                  RESERVATION TICKET
                </span>
                <h4 className="text-xl font-black text-warm">GM-CUTZ PASS</h4>
              </div>
              <Shield className="text-amber" size={24} />
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-white/5 bg-matte/60 p-4">
                <span className="text-[9px] font-mono tracking-widest text-muted block uppercase">
                  GEWÄHLTER SERVICE
                </span>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-sm font-bold text-warm">
                    {activeService.name}
                  </span>
                </div>
              </div>

              {selectedAddons.length > 0 && (
                <div className="rounded-xl border border-white/5 bg-matte/60 p-4">
                  <span className="text-[9px] font-mono tracking-widest text-muted block uppercase">
                    EXTRAS
                  </span>
                  <div className="mt-1 space-y-1">
                    {selectedAddons.map((id) => {
                      const item = addons.find((a) => a.id === id);
                      return (
                        <div key={id} className="text-xs text-warm/90">
                          • {item?.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/5 bg-matte/60 p-3.5 text-center">
                  <span className="text-[9px] font-mono tracking-widest text-muted uppercase">
                    TAG
                  </span>
                  <p className="mt-1 text-base font-black text-warm">
                    {selectedDay}
                  </p>
                </div>
                <div className="rounded-xl border border-white/5 bg-matte/60 p-3.5 text-center">
                  <span className="text-[9px] font-mono tracking-widest text-muted uppercase">
                    UHRZEIT
                  </span>
                  <p className="mt-1 text-base font-black text-amber">
                    {selectedTime} UHR
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-dashed border-white/15 pt-6">
              <a
                href={igUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer flex w-full items-center justify-center gap-2 rounded-full border border-amber/60 py-4 text-xs font-bold tracking-[0.25em] text-warm transition hover:border-amber hover:text-amber"
              >
                <IgIcon size={16} /> VIA INSTAGRAM BUCHEN
              </a>
              <p className="mt-3 text-center text-[10px] text-muted">
                Deine Konfiguration wird direkt in die Instagram-DM übertragen. Gio antwortet schnellstmöglich mit der Terminbestätigung.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
