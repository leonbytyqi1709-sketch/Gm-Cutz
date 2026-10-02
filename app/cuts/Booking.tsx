"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Check,
  Scissors,
  Shield,
  Calendar as CalendarIcon,
  Clock,
  User,
  Mail,
  Phone,
  Sparkles,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { formatDisplayDate } from "@/lib/schedule";

interface ServiceOption {
  id: string;
  name: string;
  desc: string;
}

interface AddonOption {
  id: string;
  name: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
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

// Erzeugt die nächsten 14 buchbaren Tage ab heute (Lokale Zeitzone sicher)
function generateNextDays(count = 14) {
  const result: { dateStr: string; label: string; weekday: string }[] = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const dateStr = `${year}-${month}-${day}`;
    const weekday = d.toLocaleDateString("de-DE", { weekday: "short" });
    const label = d.toLocaleDateString("de-DE", { day: "2-digit", month: "short" });
    result.push({ dateStr, label, weekday });
  }

  return result;
}

export default function Booking() {
  const availableDays = useMemo(() => generateNextDays(14), []);

  const [selectedService, setSelectedService] = useState<string>(services[0].id);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(availableDays[0]?.dateStr || "");
  const [selectedTime, setSelectedTime] = useState<string>("");

  // Zeitslots vom Server
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);

  // Kontaktdaten Formular
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  // Buchungs-Status
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successBooking, setSuccessBooking] = useState<any | null>(null);

  const activeService = services.find((s) => s.id === selectedService) || services[0];

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Slots für das gewählte Datum laden
  useEffect(() => {
    if (!selectedDate) return;
    let isMounted = true;
    setLoadingSlots(true);
    setSelectedTime("");
    setErrorMsg(null);

    fetch(`/api/bookings/slots?date=${selectedDate}`, { cache: "no-store" })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Fehler beim Laden der Zeitslots");
        }
        return data;
      })
      .then((data) => {
        if (!isMounted) return;
        if (data.slots && Array.isArray(data.slots)) {
          setSlots(data.slots);
          // Automatisch den ersten freien Slot vorwählen
          const firstFree = data.slots.find((s: TimeSlot) => s.available);
          if (firstFree) {
            setSelectedTime(firstFree.time);
          }
        } else {
          setSlots([]);
        }
      })
      .catch((err) => {
        console.error("Fehler beim Laden der Slots:", err);
        if (isMounted) {
          setErrorMsg(err.message || "Fehler beim Laden der Zeitslots");
          setSlots([]);
        }
      })
      .finally(() => {
        if (isMounted) setLoadingSlots(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedDate]);

  // Buchung abschicken
  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim()) {
      setErrorMsg("Bitte gib deinen Vor- und Nachnamen an.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Bitte gib eine gültige E-Mail-Adresse für die Bestätigung an.");
      return;
    }
    if (!phone.trim() || phone.trim().length < 6) {
      setErrorMsg("Bitte gib eine Mobilnummer / WhatsApp für Rückfragen an.");
      return;
    }
    if (!selectedTime) {
      setErrorMsg("Bitte wähle eine freie Uhrzeit aus.");
      return;
    }

    setSubmitting(true);

    try {
      const addonNames = selectedAddons
        .map((id) => addons.find((a) => a.id === id)?.name)
        .filter(Boolean);

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          service: activeService.name,
          addons: addonNames,
          date: selectedDate,
          time: selectedTime,
          notes,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Buchung fehlgeschlagen.");
      }

      setSuccessBooking(data.booking);
    } catch (err: any) {
      setErrorMsg(err.message || "Ein unerwarteter Fehler ist aufgetreten.");
    } finally {
      setSubmitting(false);
    }
  };

  // Erfolgsanzeige nach der Buchung
  if (successBooking) {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-amber/40 bg-gradient-to-b from-card via-card to-matte p-8 sm:p-12 text-center shadow-[0_0_50px_rgba(232,186,132,0.15)]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-amber/50 bg-amber/10 text-amber shadow-[0_0_20px_rgba(232,186,132,0.3)]">
          <CheckCircle2 size={36} />
        </div>

        <span className="mt-6 inline-block rounded-full border border-amber/30 bg-amber/10 px-4 py-1 text-[10px] font-mono tracking-[0.3em] text-amber uppercase">
          BUCHUNG BESTÄTIGT · VIP PASS AKTIV
        </span>

        <h3 className="mt-3 text-2xl sm:text-3xl font-black text-warm">
          DEIN TERMIN STEHT, {successBooking.name.toUpperCase()}!
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-muted">
          Wir haben dir eine verbindliche Bestätigung sowie eine{" "}
          <strong className="text-amber">.ics-Kalenderdatei</strong> direkt an{" "}
          <span className="text-warm font-semibold">{successBooking.email}</span> gesendet.
          Gio wurde ebenfalls benachrichtigt.
        </p>

        {/* Ticket Box */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-matte/80 p-6 text-left space-y-3.5">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="text-xs text-muted uppercase font-mono">Buchungs-ID</span>
            <span className="text-sm font-mono font-bold text-amber">{successBooking.id}</span>
          </div>

          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="text-xs text-muted">Datum & Uhrzeit</span>
            <span className="text-sm font-bold text-warm">
              {formatDisplayDate(successBooking.date)} um {successBooking.time} Uhr
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="text-xs text-muted">Service</span>
            <span className="text-sm font-bold text-warm">{successBooking.service}</span>
          </div>

          {successBooking.addons && successBooking.addons.length > 0 && (
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-xs text-muted">Extras</span>
              <span className="text-sm text-warm/90">{successBooking.addons.join(", ")}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-muted">Location</span>
            <span className="text-xs font-bold text-amber">GMCUTZ Private Studio (1-on-1)</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              setSuccessBooking(null);
              setName("");
              setEmail("");
              setPhone("");
              setNotes("");
            }}
            className="w-full sm:w-auto rounded-full border border-white/15 bg-white/5 px-6 py-3 text-xs font-bold tracking-widest text-warm hover:bg-white/10 transition"
          >
            WEITEREN TERMIN BUCHEN
          </button>
        </div>
      </div>
    );
  }

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
                  Wähle deinen Schnitt und deinen exklusiven Slot.
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
                    type="button"
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
                    type="button"
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

          {/* Date Picker */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-[10px] font-bold tracking-[0.3em] text-muted uppercase flex items-center gap-1.5">
                <CalendarIcon size={12} className="text-amber" /> 3. WUNSCHDATUM WÄHLEN
              </label>
              <span className="text-[10px] text-muted font-mono">NÄCHSTE 14 TAGE</span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {availableDays.map((d) => {
                const isSelected = selectedDate === d.dateStr;
                return (
                  <button
                    key={d.dateStr}
                    type="button"
                    onClick={() => setSelectedDate(d.dateStr)}
                    className={`flex flex-col items-center justify-center rounded-xl border py-2.5 px-1.5 transition-all text-center ${
                      isSelected
                        ? "border-amber bg-amber/15 text-amber shadow-[0_0_15px_rgba(232,186,132,0.15)]"
                        : "border-white/5 bg-matte/60 text-muted hover:border-white/20 hover:text-warm"
                    }`}
                  >
                    <span className="text-[10px] font-mono uppercase tracking-wider">{d.weekday}</span>
                    <span className="text-xs font-bold mt-0.5">{d.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slot Picker */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-[10px] font-bold tracking-[0.3em] text-muted uppercase flex items-center gap-1.5">
                <Clock size={12} className="text-amber" /> 4. FREIE UHRZEIT WÄHLEN
              </label>
              {loadingSlots && (
                <span className="text-[10px] text-amber flex items-center gap-1">
                  <Loader2 size={10} className="animate-spin" /> Slots werden geladen...
                </span>
              )}
            </div>

            {loadingSlots ? (
              <div className="h-20 flex items-center justify-center rounded-xl border border-white/5 bg-matte/30">
                <Loader2 size={20} className="animate-spin text-amber" />
              </div>
            ) : slots.length === 0 ? (
              <div className="rounded-xl border border-white/5 bg-matte/40 p-4 text-center text-xs text-muted">
                Keine Slots für dieses Datum verfügbar.
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {slots.map((slot) => {
                  const isSelected = selectedTime === slot.time;
                  if (!slot.available) {
                    return (
                      <div
                        key={slot.time}
                        className="flex flex-col items-center justify-center rounded-xl border border-white/5 bg-matte/20 py-2.5 text-center opacity-30 cursor-not-allowed"
                      >
                        <span className="text-xs font-semibold line-through text-muted">{slot.time}</span>
                        <span className="text-[8px] font-mono uppercase text-red-400 mt-0.5">Belegt</span>
                      </div>
                    );
                  }

                  return (
                    <button
                      key={slot.time}
                      type="button"
                      onClick={() => setSelectedTime(slot.time)}
                      className={`flex flex-col items-center justify-center rounded-xl border py-2.5 transition-all text-center ${
                        isSelected
                          ? "border-amber bg-amber/20 text-amber shadow-[0_0_15px_rgba(232,186,132,0.15)] font-bold"
                          : "border-white/5 bg-matte/60 text-warm/90 hover:border-white/20 hover:text-amber"
                      }`}
                    >
                      <span className="text-xs font-bold">{slot.time} Uhr</span>
                      <span className="text-[8px] font-mono uppercase text-emerald-400 mt-0.5">Frei</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Customer Contact Details */}
          <div className="border-t border-white/10 pt-6">
            <label className="mb-4 block text-[10px] font-bold tracking-[0.3em] text-muted uppercase">
              5. DEINE KONTAKTDATEN (FÜR KALENDER & BESTÄTIGUNG)
            </label>

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-muted mb-1 flex items-center gap-1.5">
                  <User size={12} className="text-amber" /> Vor- & Nachname *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="z. B. Alex Müller"
                  className="w-full rounded-xl border border-white/10 bg-matte/80 px-4 py-2.5 text-xs text-warm placeholder-white/20 focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-muted mb-1 flex items-center gap-1.5">
                    <Mail size={12} className="text-amber" /> E-Mail-Adresse *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@beispiel.de"
                    className="w-full rounded-xl border border-white/10 bg-matte/80 px-4 py-2.5 text-xs text-warm placeholder-white/20 focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted mb-1 flex items-center gap-1.5">
                    <Phone size={12} className="text-amber" /> Mobilnummer / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="z. B. 0176 12345678"
                    className="w-full rounded-xl border border-white/10 bg-matte/80 px-4 py-2.5 text-xs text-warm placeholder-white/20 focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted mb-1">
                  Besondere Wünsche oder Notiz (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="z. B. Locken, dichter Bart, erster Besuch..."
                  className="w-full rounded-xl border border-white/10 bg-matte/80 px-4 py-2.5 text-xs text-warm placeholder-white/20 focus:border-amber focus:outline-none focus:ring-1 focus:ring-amber resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Reservation Pass & Instant Booking Button */}
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
                    EXTRAS & FINISH
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
                    DATUM
                  </span>
                  <p className="mt-1 text-sm font-black text-warm">
                    {formatDisplayDate(selectedDate)}
                  </p>
                </div>
                <div className="rounded-xl border border-white/5 bg-matte/60 p-3.5 text-center">
                  <span className="text-[9px] font-mono tracking-widest text-muted uppercase">
                    UHRZEIT
                  </span>
                  <p className="mt-1 text-sm font-black text-amber">
                    {selectedTime ? `${selectedTime} UHR` : "—"}
                  </p>
                </div>
              </div>

              {/* Studio Info Badge */}
              <div className="rounded-xl border border-amber/20 bg-amber/5 p-3.5 text-left text-[11px] text-muted">
                <div className="font-semibold text-amber flex items-center gap-1.5 mb-1">
                  <Sparkles size={12} /> Studio Öffnungszeiten
                </div>
                <div>Mo–Fr: 15:30 – 21:30 Uhr</div>
                <div>Sa–So: 13:00 – 21:00 Uhr</div>
              </div>
            </div>

            {errorMsg && (
              <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300 flex items-start gap-2">
                <AlertCircle size={14} className="mt-0.5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="mt-8 border-t border-dashed border-white/15 pt-6">
              <button
                type="button"
                onClick={handleSubmitBooking}
                disabled={submitting}
                className="btn-shimmer flex w-full items-center justify-center gap-2 rounded-full border border-amber bg-amber/15 py-4 text-xs font-bold tracking-[0.25em] text-warm transition hover:bg-amber hover:text-black disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_25px_rgba(232,186,132,0.2)]"
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> RESERVIERUNG WIRD VERARBEITET...
                  </>
                ) : (
                  <>VERBINDLICH RESERVIEREN</>
                )}
              </button>

              <p className="mt-3 text-center text-[10px] text-muted leading-relaxed">
                Sofortige Zusage ohne Wartezeit. Deine Kalender-Datei (.ics) und Buchungsdetails werden dir direkt per E-Mail gesendet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
