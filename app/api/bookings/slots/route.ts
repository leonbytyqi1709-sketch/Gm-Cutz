import { NextResponse } from "next/server";
import { getSlotsForDate } from "@/lib/schedule";
import { getBookingsByDate } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * Ermittelt das aktuelle Datum & die Minuten in deutscher Zeitzone (Europe/Berlin)
 */
function getBerlinTime() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = formatter.formatToParts(now);
  const getPart = (type: string) => parts.find((p) => p.type === type)?.value || "";
  const year = getPart("year");
  const month = getPart("month");
  const day = getPart("day");
  const hour = parseInt(getPart("hour") || "0", 10);
  const minute = parseInt(getPart("minute") || "0", 10);

  return {
    todayStr: `${year}-${month}-${day}`,
    currentMinutes: hour * 60 + minute,
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateStr = searchParams.get("date");

    if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return NextResponse.json(
        { error: "Ungültiges oder fehlendes Datumsformat (erwartet: YYYY-MM-DD)" },
        { status: 400 }
      );
    }

    // Verfügbare Zeitslots laut Öffnungszeiten ermitteln
    const baseSlots = getSlotsForDate(dateStr);

    // Bestehende Buchungen für dieses Datum abrufen
    let bookedTimes = new Set<string>();
    try {
      const existingBookings = await getBookingsByDate(dateStr);
      bookedTimes = new Set(existingBookings.map((b) => b.time));
    } catch (dbErr) {
      console.error("[Slots API] Error fetching booked times:", dbErr);
    }

    // Prüfen, ob das Datum in der Vergangenheit liegt oder heute ist (in Berliner Zeit)
    const { todayStr, currentMinutes } = getBerlinTime();
    const isToday = dateStr === todayStr;
    const isPast = dateStr < todayStr;

    const slots = baseSlots.map((time) => {
      let isAvailable = !bookedTimes.has(time);

      if (isPast) {
        isAvailable = false;
      } else if (isToday) {
        const [h, m] = time.split(":").map(Number);
        const slotMinutes = h * 60 + m;
        // Mindestens 30 Minuten Vorlaufzeit bei heutigen Buchungen
        if (slotMinutes <= currentMinutes + 30) {
          isAvailable = false;
        }
      }

      return {
        time,
        available: isAvailable,
      };
    });

    return NextResponse.json(
      {
        date: dateStr,
        slots,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (error: any) {
    console.error("[Slots API Error]:", error);
    return NextResponse.json(
      { error: "Fehler beim Laden der Zeitslots" },
      { status: 500 }
    );
  }
}
