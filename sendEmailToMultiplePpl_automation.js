function sendEmails() {
  const SHEET_NAME = "Sheet1"; // Change if needed

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];

  const emailCol   = headers.findIndex(h => h.toString().toLowerCase().includes("receiver"));
  const subjectCol = headers.findIndex(h => h.toString().toLowerCase().includes("subject"));
  const bodyCol    = headers.findIndex(h => h.toString().toLowerCase().includes("body"));
  const statusCol  = headers.findIndex(h => h.toString().toLowerCase().includes("status"));

  // Find or create "Sent Date" column
  let sentDateCol = headers.findIndex(h => h.toString().toLowerCase().includes("sent date"));
  if (sentDateCol === -1) {
    sentDateCol = headers.length; // next empty column
    sheet.getRange(1, sentDateCol + 1).setValue("Sent Date");
  }

  if ([emailCol, subjectCol, bodyCol, statusCol].includes(-1)) {
    Logger.log("Could not find one or more required columns. Check your headers.");
    return;
  }

  let sent = 0, skipped = 0;

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const email   = row[emailCol].toString().trim();
    const subject = row[subjectCol].toString().trim();
    const body    = row[bodyCol].toString().trim();
    const status  = row[statusCol].toString().trim().toLowerCase();

    if (!email) continue;

    if (status === "sent") {
      Logger.log(`Row ${i + 1}: Skipped (already sent) → ${email}`);
      skipped++;
      continue;
    }

    try {
      GmailApp.sendEmail(email, subject, body);

      const now = new Date();
      const formattedDate = Utilities.formatDate(now, Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm:ss");

      sheet.getRange(i + 1, statusCol + 1).setValue("Sent");
      sheet.getRange(i + 1, sentDateCol + 1).setValue(formattedDate);

      Logger.log(`Row ${i + 1}: Sent → ${email} at ${formattedDate}`);
      sent++;
    } catch (e) {
      Logger.log(`Row ${i + 1}: Failed → ${email} | Error: ${e.message}`);
    }
  }

  Logger.log(`Done. Sent: ${sent}, Skipped: ${skipped}`);
}
