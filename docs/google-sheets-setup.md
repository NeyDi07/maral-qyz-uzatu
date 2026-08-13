# Google Sheets RSVP Setup

This project sends RSVP submissions to a Google Sheet through a Google Apps Script Web App endpoint.

## Sheet Columns

Create these columns in the first row:

```text
Submitted At | Name | Attendance | Partner Name | User Agent
```

## Apps Script Code

Use this script in `Extensions -> Apps Script`:

```javascript
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.name || '',
      data.attendance || '',
      data.partnerName || '',
      data.userAgent || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Deployment

1. Click `Deploy -> New deployment`.
2. Select `Web app`.
3. Set `Execute as` to `Me`.
4. Set `Who has access` to `Anyone`.
5. Copy the Web App URL ending with `/exec`.
6. Add it to `.env.local` as `NEXT_PUBLIC_RSVP_ENDPOINT`.

## Vercel

Add the same variable in Vercel Project Settings:

```text
NEXT_PUBLIC_RSVP_ENDPOINT=https://script.google.com/macros/s/.../exec
```
