import { NextResponse } from "next/server";
import { createBooking } from "@/lib/db";
import { sendBookingNotifications } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, addons, date, time, notes } = body;

    // Grundlegende Validierung
    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Bitte gib deinen Namen an." }, { status: 400 });
    }

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Bitte gib eine gültige E-Mail-Adresse an." }, { status: 400 });
    }

    if (!phone || phone.trim().length < 6) {
      return NextResponse.json({ error: "Bitte gib eine gültige Telefonnummer an." }, { status: 400 });
    }

    if (!service || !date || !time) {
      return NextResponse.json({ error: "Service, Datum und Uhrzeit sind erforderlich." }, { status: 400 });
    }

    // Buchung in Datenbank / Speicher anlegen
    const booking = await createBooking({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      service: service.trim(),
      addons: Array.isArray(addons) ? addons : [],
      date,
      time,
      notes: notes ? notes.trim() : "",
    });

    // E-Mail-Benachrichtigungen versenden (asynchron bzw. mit Fehlerabfangung)
    try {
      await sendBookingNotifications(booking);
    } catch (mailError) {
      console.error("[Email Dispatch Error]:", mailError);
      // Buchung ist trotzdem in der DB gespeichert
    }

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error: any) {
    console.error("[Booking API Error]:", error);
    return NextResponse.json(
      { error: error?.message || "Fehler bei der Buchung. Bitte versuche es erneut." },
      { status: 400 }
    );
  }
}
