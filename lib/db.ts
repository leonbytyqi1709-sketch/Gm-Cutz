import { neon } from "@neondatabase/serverless";
import fs from "fs/promises";
import path from "path";

export interface BookingRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  addons: string[];
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  notes?: string;
  status: "confirmed" | "cancelled";
  createdAt: string;
}

const LOCAL_STORAGE_FILE = path.join(process.cwd(), "data", "bookings.json");

// Hilfsfunktion: Stellt sicher, dass der lokale Datenordner existiert (Serverless-Safe)
async function ensureLocalFile(): Promise<BookingRecord[]> {
  try {
    const content = await fs.readFile(LOCAL_STORAGE_FILE, "utf-8");
    return JSON.parse(content);
  } catch {
    try {
      const dir = path.dirname(LOCAL_STORAGE_FILE);
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(LOCAL_STORAGE_FILE, JSON.stringify([], null, 2), "utf-8");
    } catch {
      // Ignoriere Schreibfehler auf Serverless / Read-Only Filesystemen (z. B. Vercel)
    }
    return [];
  }
}

// Initialisiert die Neon-Datenbanktabelle, falls DATABASE_URL gesetzt ist
let isTableInitialized = false;
async function initNeonTable(sql: any) {
  if (isTableInitialized) return;
  await sql`
    CREATE TABLE IF NOT EXISTS bookings (
      id VARCHAR(64) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(64) NOT NULL,
      service VARCHAR(255) NOT NULL,
      addons TEXT NOT NULL,
      date VARCHAR(32) NOT NULL,
      time VARCHAR(32) NOT NULL,
      notes TEXT,
      status VARCHAR(32) DEFAULT 'confirmed',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;
  isTableInitialized = true;
}

/**
 * Holt alle bestätigten Buchungen für ein bestimmtes Datum (YYYY-MM-DD)
 */
export async function getBookingsByDate(dateStr: string): Promise<BookingRecord[]> {
  const dbUrl = process.env.DATABASE_URL;

  if (dbUrl) {
    try {
      const sql = neon(dbUrl);
      await initNeonTable(sql);
      const rows = await sql`
        SELECT id, name, email, phone, service, addons, date, time, notes, status, created_at
        FROM bookings
        WHERE date = ${dateStr} AND status = 'confirmed'
      `;

      return rows.map((row: any) => ({
        id: row.id,
        name: row.name,
        email: row.email,
        phone: row.phone,
        service: row.service,
        addons: typeof row.addons === "string" ? JSON.parse(row.addons || "[]") : row.addons,
        date: row.date,
        time: row.time,
        notes: row.notes || "",
        status: row.status,
        createdAt: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
      }));
    } catch (error) {
      console.error("[Database] Neon Query Error, fallback to local:", error);
    }
  }

  // Fallback: Lokale JSON-Datei (Serverless-Safe)
  try {
    const allBookings = await ensureLocalFile();
    return allBookings.filter((b) => b.date === dateStr && b.status === "confirmed");
  } catch (err) {
    console.error("[Database] Fallback error:", err);
    return [];
  }
}

/**
 * Erstellt eine neue Buchung in der Datenbank oder im lokalen Speicher
 */
export async function createBooking(
  data: Omit<BookingRecord, "id" | "createdAt" | "status">
): Promise<BookingRecord> {
  const newBooking: BookingRecord = {
    ...data,
    id: "GM-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };

  const dbUrl = process.env.DATABASE_URL;

  if (dbUrl) {
    try {
      const sql = neon(dbUrl);
      await initNeonTable(sql);

      // Race-Condition Schutz: Prüfen, ob Slot noch frei ist
      const existing = await sql`
        SELECT id FROM bookings
        WHERE date = ${newBooking.date} AND time = ${newBooking.time} AND status = 'confirmed'
      `;

      if (existing.length > 0) {
        throw new Error("Dieser Zeitslot ist leider bereits vergeben.");
      }

      await sql`
        INSERT INTO bookings (id, name, email, phone, service, addons, date, time, notes, status, created_at)
        VALUES (
          ${newBooking.id},
          ${newBooking.name},
          ${newBooking.email},
          ${newBooking.phone},
          ${newBooking.service},
          ${JSON.stringify(newBooking.addons)},
          ${newBooking.date},
          ${newBooking.time},
          ${newBooking.notes || ""},
          ${newBooking.status},
          ${newBooking.createdAt}
        )
      `;

      return newBooking;
    } catch (error: any) {
      if (error?.message?.includes("bereits vergeben")) {
        throw error;
      }
      console.error("[Database] Neon Insert Error, fallback to local:", error);
    }
  }

  // Fallback: Lokale JSON-Datei
  try {
    const allBookings = await ensureLocalFile();
    const isTaken = allBookings.some(
      (b) => b.date === newBooking.date && b.time === newBooking.time && b.status === "confirmed"
    );

    if (isTaken) {
      throw new Error("Dieser Zeitslot ist leider bereits vergeben.");
    }

    allBookings.push(newBooking);
    await fs.writeFile(LOCAL_STORAGE_FILE, JSON.stringify(allBookings, null, 2), "utf-8");
    return newBooking;
  } catch (err: any) {
    if (err?.message?.includes("bereits vergeben")) {
      throw err;
    }
    console.error("[Database] Local fallback write error:", err);
    throw new Error(
      "Datenbankverbindung nicht verfügbar. Bitte DATABASE_URL in den Vercel Environment Variables konfigurieren."
    );
  }
}
