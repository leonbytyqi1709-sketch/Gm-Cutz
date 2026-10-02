import { NextResponse } from "next/server";
import { getSlotsForDate } from "@/lib/schedule";
import { getBookingsByDate } from "@/lib/db";

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
    const existingBookings = await getBookingsByDate(dateStr);
    const bookedTimes = new Set(existingBookings.map((b) => b.time));

    // Prüfen, ob das Datum in der Vergangenheit liegt oder heute ist
    const todayStr = new Date().toISOString().split("T")[0];
    const isToday = dateStr === todayStr;
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const slots = baseSlots.map((time) => {
      let isAvailable = !bookedTimes.has(time);

      if (isToday) {
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

    return NextResponse.json({
      date: dateStr,
      slots,
    });
  } catch (error: any) {
    console.error("[Slots API Error]:", error);
    return NextResponse.json(
      { error: "Fehler beim Laden der Zeitslots" },
      { status: 500 }
    );
  }
}
