# 💈 GMCUTZ — Konzept & Möglichkeiten für das Terminbuchungssystem

**Projekt:** GMCUTZ (Private Barber Studio) × TRESSA  
**Dokument-Typ:** Konzept, Architekturvergleich & Umsetzungsplan für die nächste Session  
**Datum:** 1. Oktober 2026  
**Ziel:** Vollautomatisches, exklusives Buchungssystem mit sofortiger Festbuchung, E-Mail/Kalender-Bestätigung für den Kunden und Sofortbenachrichtigung für Gio – bei 0 € monatlichen Fixkosten.

---

## 📑 Inhaltsverzeichnis
1. [Übersicht aller Möglichkeiten & Architektur-Vergleich](#1-übersicht-aller-möglichkeiten--architektur-vergleich)
2. [Getroffene Entscheidung: Option A (Kostenloses Custom VIP-System)](#2-getroffene-entscheidung-option-a)
3. [Detaillierter Buchungsablauf (Kunde)](#3-detaillierter-buchungsablauf-kunde)
4. [Benachrichtigungs-System (Kunde & Gio)](#4-benachrichtigungs-system-kunde--gio)
5. [Backend-Architektur & Slot-Management (Keine Doppelbuchungen)](#5-backend-architektur--slot-management)
6. [Schritt-für-Schritt-Fahrplan für die nächste Session](#6-schritt-für-schritt-fahrplan-für-die-nächste-session)

---

## 1. Übersicht aller Möglichkeiten & Architektur-Vergleich

Für GMCUTZ wurden vier grundlegende Lösungsansätze evaluiert:

| Kriterium | Option A: Next.js + Resend + ICS (Gewählt) | Option B: Google Sheets + Webhook | Option C: Cal.com / Calendly Embed | Option D: SMS via Twilio |
| :--- | :--- | :--- | :--- | :--- |
| **Monatliche Kosten** | **0 €** (3.000 Mails/Mo frei) | **0 €** | 0 € – 15 € / Monat | Laufend (~0,07 € pro SMS) |
| **Design / Branding** | **100% Custom** (Obsidian & Gold) | 100% Custom | Fremd-Widget / iFrame | Kein Web-Einfluss |
| **Kundenbestätigung** | E-Mail (HTML) + `.ics`-Kalender | E-Mail via Google Script | E-Mail / Kalender-Invite | SMS aufs Handy |
| **Friseur-Benachrichtigung** | Sofort-Mail + Kalender-Datei | Google Tabellen-Zeile + Mail | E-Mail / Kalender-Sync | SMS aufs Handy |
| **Schutz vor Doppelbuchung** | Automatisch über API / DB | Eingeschränkt | Vollautomatisch | N/A |
| **Aufwand / Wartung** | Einmalig Next.js Route + DB | Google Sheets AppScript | Nur Account verknüpfen | API-Account & Guthaben |

---

## 2. Getroffene Entscheidung: Option A

* **Buchungsmodus:** **Sofortige Festbuchung** (Keine manuelle Bestätigung nötig; wenn der Slot frei ist, ist der Termin verbindlich gebucht).
* **Kosten:** **0 € Fixkosten** durch kostenlose Free-Tiers moderner Entwickler-Tools (Resend für Mails, Supabase/SQLite für die Slots).
* **Vorteil:** Nahtloses Nutzererlebnis ohne Weiterleitung zu Drittanbietern, exakter GMCUTZ-Look.

---

## 3. Detaillierter Buchungsablauf (Kunde)

Die bestehende Komponente `app/cuts/Booking.tsx` wird erweitert:

```
[ 1. Schnitt & Extras wählen ]
             │
             ▼
[ 2. Datum & Uhrzeit wählen ]  ──► (API prüft belegte Zeiten -> graut diese aus)
             │
             ▼
[ 3. Kontaktdaten eingeben ]   ──► Name, E-Mail, Telefonnummer, Notiz
             │
             ▼
[ 4. Verbindlich Buchen ]      ──► POST /api/bookings
             │
             ▼
[ 5. Bestätigungs-Screen ]     ──► VIP Pass & Bestätigungshinweis
```

### Abgefragte Kundendaten:
1. **Vor- & Nachname** (Pflichtfeld)
2. **E-Mail-Adresse** (Pflichtfeld, für Bestätigung und Kalendereintrag)
3. **Telefonnummer / WhatsApp** (Pflichtfeld, für Rückfragen oder Verspätungen)
4. **Bemerkung / Sonderwünsche** (Optional, z. B. „Habe dichte Locken“, etc.)

---

## 4. Benachrichtigungs-System (Kunde & Gio)

### A. E-Mail an den Kunden
* **Absender:** `GMCUTZ Private Studio <termine@gmcutz.de>` (oder Resend-Domain)
* **Design:** Dark-Mode, goldene Akzente, typografisch passend zur Marke.
* **Inhalt:**
  * Verbindliche Zusage mit Buchungsnummer.
  * Gewählter Schnitt (*z. B. Skin Fade*), Extras (*z. B. Bartrasur*), Gesamtpreis und Datum/Uhrzeit.
  * Diskrete Studio-Adresse (Keller-Studio).
  * Hinweise für den Kunden (*Bitte 5 Min. vorher da sein, Haare am besten vorher waschen*).
* **Highlight:** Eine angehängte **`.ics`-Kalenderdatei**. Ein Klick auf dem iPhone oder Android-Smartphone trägt den Termin direkt in den Kalender ein.

### B. Benachrichtigung an Gio (Friseur)
* **Kanal:** Direkte E-Mail an Gios Postfach.
* **Betreff:** `💈 Neuer Termin: [Kundenname] – [Datum] um [Uhrzeit]`
* **Inhalt:**
  * Kunde: Name, Telefonnummer (als klickbarer `tel:`- und `wa.me/`-Link für direkten WhatsApp-Chat) und E-Mail.
  * Leistung: Schnitt, gewählte Extras, geplante Dauer.
  * Notiz des Kunden (falls ausgefüllt).
* **Highlight:** Ebenfalls mit `.ics`-Kalenderdatei für Gios Smartphone-Kalender.

---

## 5. Backend-Architektur & Slot-Management

### API-Routen in Next.js:
1. `GET /api/bookings/slots?date=YYYY-MM-DD`
   * Liefert alle Standard-Zeitslots des Tages (z. B. 10:00, 11:00, 12:00, 14:00, 15:00, 16:00, 17:00, 18:00).
   * Markiert bereits gebuchte Slots als `available: false`.

2. `POST /api/bookings`
   * Validiert Eingaben (E-Mail-Format, Telefonnummer, Datum in der Zukunft).
   * Prüft serverseitig nochmals, ob der Slot in der Sekunde noch frei ist (Race-Condition-Schutz).
   * Schreibt die Buchung in die Datenbank.
   * Sendet die beiden E-Mails via Resend.
   * Gibt `success: true` und Buchungsdetails an das Frontend zurück.

### Datenhaltung (Kostenlos & Vercel-kompatibel):
* **Option 1 (Empfohlen): Supabase (PostgreSQL Cloud)**
  * Kostenlos bis 500 MB (reicht für zehntausende Termine).
  * Tabelle `bookings`: `id`, `name`, `email`, `phone`, `service`, `addons`, `date`, `time`, `notes`, `created_at`.
* **Option 2: Lokale SQLite / JSON-Datei**
  * Schneller Einstieg ohne Account-Erstellung. Kann später mit 1 Klick auf Cloud-DB migriert werden.

---

## 6. Schritt-für-Schritt-Fahrplan für die nächste Session

Wenn du in der nächsten Session weiterarbeitest, können wir diese Punkte der Reihe nach abarbeiten:

1. **Pakete installieren:**
   * `npm install resend` (für modernen, kostenlosen Mailversand)
2. **Datenbank / Speicher bereitstellen:**
   * Tabelle für `bookings` anlegen.
3. **Backend-Routen erstellen:**
   * `app/api/bookings/route.ts` (Buchungsabwicklung & E-Mail-Trigger).
   * `app/api/bookings/slots/route.ts` (Slot-Verfügbarkeitsprüfung).
4. **Kalender-Generator (.ics):**
   * Automatische Erstellung der iCalendar-Datei mit Studio-Adresse & Uhrzeit.
5. **Frontend UI aktualisieren (`app/cuts/Booking.tsx`):**
   * Kalender-/Datums-Picker einbauen.
   * Kontaktdaten-Eingabemaske gestalten.
   * Buchungs-Button mit API verknüpfen & Lade-/Erfolgsstatus anzeigen.
6. **Testlauf:**
   * Einen echten Test-Termin durchbuchen und prüfen, ob beide E-Mails ankommen und der Kalendereintrag klappt.

---

*Erstellt für die Weiterarbeit in der nächsten GMCUTZ-Entwicklungssession.*
