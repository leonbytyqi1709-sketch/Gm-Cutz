import nodemailer from "nodemailer";
import type { BookingRecord } from "./db";

/**
 * Erstellt den Dateiinhalt einer iCalendar (.ics) Datei für Apple/Google Kalender
 * Verwendet METHOD:PUBLISH (RFC 5546 Standard für Event-Einladungen ohne RSVP),
 * um Fehlinterpretationen als Spam durch E-Mail-Provider zu vermeiden.
 */
export function generateIcsContent(booking: BookingRecord): string {
  const [year, month, day] = booking.date.split("-").map(Number);
  const [hours, minutes] = booking.time.split(":").map(Number);

  // Startzeit und Endzeit (60 Minuten)
  const startDate = new Date(year, month - 1, day, hours, minutes);
  const endDate = new Date(year, month - 1, day, hours + 1, minutes);

  const pad = (n: number) => n.toString().padStart(2, "0");
  const formatDateToIcs = (d: Date) =>
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

  const dtStart = formatDateToIcs(startDate);
  const dtEnd = formatDateToIcs(endDate);
  const now = formatDateToIcs(new Date());

  const summary = `GMCUTZ Termin: ${booking.service}`;
  const description = `Exklusiver 1-on-1 Termin bei GMCUTZ im Keller-Studio.\\nService: ${booking.service}\\nExtras: ${
    booking.addons.join(", ") || "Keine"
  }\\nBuchungs-ID: ${booking.id}\\n\\nBitte ca. 5 Minuten vor dem Termin eintreffen.`;
  const location = "GMCUTZ Private Barber Studio";

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//GMCUTZ//Terminbuchung//DE",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${booking.id}-${Date.now()}@gmail.com`,
    `DTSTAMP:${now}Z`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    "STATUS:CONFIRMED",
    "TRANSP:OPAQUE",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

/**
 * Versendet Bestätigungs-Mails an den Kunden und an Gio
 */
export async function sendBookingNotifications(booking: BookingRecord) {
  const gmailUser = process.env.GMAIL_USER || "gmcutzz774@gmail.com";
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  const adminEmail = process.env.NOTIFICATION_EMAIL || "gmcutzz774@gmail.com";

  // Saubere Telefonnummer für WhatsApp-Link (z. B. 0176... -> 49176...)
  let cleanPhone = booking.phone.replace(/[^0-9]/g, "");
  if (cleanPhone.startsWith("0")) {
    cleanPhone = "49" + cleanPhone.substring(1);
  }
  const whatsappUrl = `https://wa.me/${cleanPhone}`;

  const icsData = generateIcsContent(booking);

  // Falls noch kein App-Passwort hinterlegt ist, simulieren wir den Versand
  if (!gmailPass) {
    console.log("--------------------------------------------------");
    console.log("[EMAIL SIMULATION - GMAIL_APP_PASSWORD fehlt in .env.local]");
    console.log(`An Kunde: ${booking.email}`);
    console.log(`An Gio: ${adminEmail}`);
    console.log(`Termin: ${booking.date} um ${booking.time} Uhr`);
    console.log("--------------------------------------------------");
    return { success: true, simulated: true };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
  });

  // Spam-optimierte Text-Fassung für den Kunden
  const customerText = `Hallo ${booking.name},

dein Termin im GM-CUTZ Private Studio ist verbindlich bestätigt!

ÜBERSICHT:
- Buchungs-ID: ${booking.id}
- Datum: ${booking.date}
- Uhrzeit: ${booking.time} Uhr
- Gewählter Service: ${booking.service}
${booking.addons.length > 0 ? `- Extras: ${booking.addons.join(", ")}\n` : ""}- Ort: GM-CUTZ Private Barber Studio

HINWEISE:
- Bitte sei ca. 5 Minuten vor deinem Termin da.
- Im Anhang findest du deinen Kalendereintrag (.ics) für dein Smartphone.

Bei Fragen oder Verspätungen:
Telefon / WhatsApp: +49 151 15565427
E-Mail: ${gmailUser}

Viele Grüße,
Gio | GM-CUTZ`;

  // Spam-optimiertes HTML für den Kunden (saubere Standard-Attribute, Hex-Farben, kein rgba)
  const customerHtml = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <title>Terminbestätigung GM-CUTZ</title>
</head>
<body style="margin: 0; padding: 20px; background-color: #0c0c0e; font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif; color: #f5f5f7;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 580px; background-color: #17171c; border-radius: 12px; border: 1px solid #2a2a34; padding: 32px 24px; text-align: left;">
          <tr>
            <td align="center" style="padding-bottom: 24px; border-bottom: 1px solid #2a2a34;">
              <div style="display: inline-block; background-color: #e8ba84; color: #0c0c0e; font-weight: 900; font-size: 18px; padding: 6px 12px; border-radius: 6px; letter-spacing: 2px;">GM</div>
              <h1 style="color: #e8ba84; font-size: 20px; margin: 12px 0 4px 0; letter-spacing: 1px; text-transform: uppercase;">Terminbestätigung</h1>
              <p style="color: #8e8d98; font-size: 12px; margin: 0; letter-spacing: 0.5px;">GM-CUTZ PRIVATE BARBER STUDIO · 1-ON-1 SESSION</p>
            </td>
          </tr>

          <tr>
            <td style="padding-top: 24px;">
              <p style="font-size: 15px; margin: 0 0 8px 0; color: #ffffff;">Hallo <strong>${booking.name}</strong>,</p>
              <p style="font-size: 14px; margin: 0 0 20px 0; color: #d0d0d8; line-height: 1.5;">
                dein exklusiver 1-on-1 Termin im Studio ist verbindlich für dich reserviert.
              </p>

              <!-- Termindetails Box -->
              <table role="presentation" width="100%" style="background-color: #0c0c0e; border: 1px solid #2a2a34; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #8e8d98;">Buchungs-ID:</td>
                  <td align="right" style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #e8ba84; font-family: monospace;">${booking.id}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #8e8d98;">Datum:</td>
                  <td align="right" style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #ffffff;">${booking.date}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #8e8d98;">Uhrzeit:</td>
                  <td align="right" style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #e8ba84;">${booking.time} Uhr</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-size: 13px; color: #8e8d98;">Service:</td>
                  <td align="right" style="padding: 6px 0; font-size: 13px; font-weight: bold; color: #ffffff;">${booking.service}</td>
                </tr>
                ${
                  booking.addons.length > 0
                    ? `<tr><td style="padding: 6px 0; font-size: 13px; color: #8e8d98;">Extras:</td><td align="right" style="padding: 6px 0; font-size: 13px; color: #ffffff;">${booking.addons.join(", ")}</td></tr>`
                    : ""
                }
              </table>

              <!-- Hinweise Box -->
              <table role="presentation" width="100%" style="border-left: 3px solid #e8ba84; background-color: #1f1f26; border-radius: 0 6px 6px 0; padding: 12px 16px; margin-bottom: 24px;">
                <tr>
                  <td>
                    <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: bold; color: #e8ba84;">Wichtige Hinweise:</p>
                    <p style="margin: 0; font-size: 12px; color: #b0b0b8; line-height: 1.5;">
                      • Bitte sei ca. 5 Minuten vor deinem Slot da.<br>
                      • Der Kalendereintrag (.ics) ist im Anhang – tippe ihn an, um den Termin direkt in deinen Kalender zu speichern.<br>
                      • Vor Ort Barzahlung & PayPal möglich.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Footer Contact -->
              <p style="font-size: 12px; color: #70707a; margin: 24px 0 0 0; text-align: center; line-height: 1.6; border-top: 1px solid #2a2a34; padding-top: 20px;">
                GM-CUTZ Private Barber Studio<br>
                Telefon / WhatsApp: <a href="tel:+4915115565427" style="color: #e8ba84; text-decoration: none;">+49 151 15565427</a> · 
                E-Mail: <a href="mailto:${gmailUser}" style="color: #e8ba84; text-decoration: none;">${gmailUser}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  // Text für Gio
  const adminText = `Neuer Termin gebucht!

Kunde: ${booking.name}
Datum: ${booking.date} um ${booking.time} Uhr
Service: ${booking.service}
Extras: ${booking.addons.join(", ") || "Keine"}
E-Mail: ${booking.email}
Telefon: ${booking.phone}
WhatsApp Direktchat: ${whatsappUrl}
Notiz: ${booking.notes || "Keine"}`;

  // HTML für Gio
  const adminHtml = `<!DOCTYPE html>
<html lang="de">
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; background-color: #0c0c0e; color: #ffffff; padding: 20px;">
  <div style="max-width: 550px; margin: 0 auto; background: #17171c; border: 1px solid #e8ba84; border-radius: 10px; padding: 24px;">
    <h2 style="color: #e8ba84; margin-top: 0;">Neuer Termin gebucht!</h2>
    <p style="font-size: 14px;">Folgender Kunde hat gebucht:</p>
    <table style="width: 100%; font-size: 14px; margin: 15px 0;">
      <tr><td style="color: #888; padding: 4px 0;">Name:</td><td style="font-weight: bold;">${booking.name}</td></tr>
      <tr><td style="color: #888; padding: 4px 0;">Datum/Zeit:</td><td style="color: #e8ba84; font-weight: bold;">${booking.date} um ${booking.time} Uhr</td></tr>
      <tr><td style="color: #888; padding: 4px 0;">Service:</td><td>${booking.service}</td></tr>
      <tr><td style="color: #888; padding: 4px 0;">Extras:</td><td>${booking.addons.join(", ") || "Keine"}</td></tr>
      <tr><td style="color: #888; padding: 4px 0;">E-Mail:</td><td><a href="mailto:${booking.email}" style="color: #e8ba84;">${booking.email}</a></td></tr>
      <tr><td style="color: #888; padding: 4px 0;">Telefon:</td><td><a href="tel:${booking.phone}" style="color: #e8ba84;">${booking.phone}</a></td></tr>
      ${booking.notes ? `<tr><td style="color: #888; padding: 4px 0;">Notiz:</td><td>${booking.notes}</td></tr>` : ""}
    </table>
    <div style="text-align: center; margin-top: 25px;">
      <a href="${whatsappUrl}" target="_blank" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 6px; font-weight: bold; font-size: 13px;">
        WhatsApp Chat mit ${booking.name} öffnen
      </a>
    </div>
  </div>
</body>
</html>`;

  // 1. Mail an den Kunden (Anti-Spam optimiert: sauberer Betreff, Sendername, sauberes HTML + Text)
  try {
    const custRes = await transporter.sendMail({
      from: `"GM-CUTZ" <${gmailUser}>`,
      replyTo: gmailUser,
      to: booking.email,
      subject: `Terminbestätigung: GM-CUTZ Studio (${booking.date}, ${booking.time} Uhr)`,
      text: customerText,
      html: customerHtml,
      attachments: [
        {
          filename: `termin-${booking.id}.ics`,
          content: icsData,
          contentType: "text/calendar; charset=utf-8",
        },
      ],
    });
    console.log(`[Email Success] Customer mail sent to ${booking.email} (MessageId: ${custRes.messageId})`);
  } catch (err) {
    console.error(`[Email Error] Failed to send customer mail to ${booking.email}:`, err);
  }

  // 2. Mail an Gio / Friseur
  try {
    const adminRes = await transporter.sendMail({
      from: `"GM-CUTZ Buchungssystem" <${gmailUser}>`,
      replyTo: booking.email,
      to: adminEmail,
      subject: `Neuer Termin: ${booking.name} (${booking.date}, ${booking.time} Uhr)`,
      text: adminText,
      html: adminHtml,
      attachments: [
        {
          filename: `termin-${booking.name}-${booking.date}.ics`,
          content: icsData,
          contentType: "text/calendar; charset=utf-8",
        },
      ],
    });
    console.log(`[Email Success] Admin mail sent to ${adminEmail} (MessageId: ${adminRes.messageId})`);
  } catch (err) {
    console.error(`[Email Error] Failed to send admin mail to ${adminEmail}:`, err);
  }

  return { success: true };
}
