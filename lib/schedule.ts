export interface DaySchedule {
  dayName: string;
  isOpen: boolean;
  slots: string[];
}

export const OPENING_HOURS = {
  weekday: {
    label: "Montag – Freitag",
    time: "15:30 – 21:30 Uhr",
    slots: ["15:30", "16:30", "17:30", "18:30", "19:30", "20:30"],
  },
  weekend: {
    label: "Samstag – Sonntag",
    time: "13:00 – 21:00 Uhr",
    slots: ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"],
  },
};

/**
 * Liefert die verfügbaren Zeitslots für ein bestimmtes Datum (YYYY-MM-DD).
 */
export function getSlotsForDate(dateStr: string): string[] {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const dayOfWeek = date.getDay(); // 0 = Sonntag, 1 = Montag, ..., 6 = Samstag

  if (dayOfWeek === 0 || dayOfWeek === 6) {
    // Samstag oder Sonntag
    return [...OPENING_HOURS.weekend.slots];
  } else {
    // Montag bis Freitag
    return [...OPENING_HOURS.weekday.slots];
  }
}

/**
 * Formatierungshilfe für deutsches Datumsformat (z.B. "Mo, 05. Okt")
 */
export function formatDisplayDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("de-DE", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
}
