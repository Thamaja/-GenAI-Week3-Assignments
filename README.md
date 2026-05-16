# -GenAI-Week3-Assignments

# Gmail Email Sender Automation (Google Apps Script) -> Send emails to multiple people using data from Google Sheets

## What the Script Does

This script automates sending bulk emails directly from a Google Sheet.
It reads recipient data row by row and sends a personalized email to each
address using the Gmail account of the script owner.

### Key behaviours
- Reads recipient email, subject line, and email body from the sheet
- Skips any row already marked as "Sent" in the Status column (prevents duplicates)
- Sends the email via Gmail and marks the row Status as "Sent"
- Records the exact date and time the email was sent in a "Sent Date" column
- If the "Sent Date" column does not exist, the script creates it automatically
- Logs all activity (sent, skipped, errors) to the Apps Script execution log

---

## Google Workspace Services Used

| Service | Purpose |
|---|---|
| **Google Sheets** (`SpreadsheetApp`) | Read recipient data (email, subject, body, status) and write back the "Sent" status and sent date |
| **Gmail** (`GmailApp`) | Send emails from the authorised Google account |
| **Utilities** (`Utilities.formatDate`) | Format the sent timestamp into a readable date/time string |
| **Session** (`Session.getScriptTimeZone`) | Ensure the timestamp reflects the correct local timezone |

---

## How to Use

1. Open your Google Sheet containing the email data
2. Go to **Extensions → Apps Script**
3. Paste the script and save
4. Click **Run → sendEmails** and authorise Gmail + Sheets access when prompted
5. Check **View → Logs** to confirm execution

---

## Sheet Structure Expected

| Receiver Email | Email Subject | Email Body | Status | Sent Date |
|---|---|---|---|---|
| alice@example.com | Welcome! | Hi Alice… | Sent | 16/05/2026 14:32:05 |
| bob@example.com | Hello Bob | Dear Bob… | | |
