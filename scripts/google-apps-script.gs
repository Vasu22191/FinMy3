const SHEET_NAME = 'Enquiries';

function getSheet() {
  const props = PropertiesService.getScriptProperties();
  const spreadsheetId = props.getProperty('SPREADSHEET_ID');
  const spreadsheet = spreadsheetId
    ? SpreadsheetApp.openById(spreadsheetId)
    : SpreadsheetApp.getActiveSpreadsheet();

  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp', 'Full Name', 'Business Email', 'Phone Number',
      'Company Name', 'Country', 'Service Required', 'Message',
      'Status', 'Team Email', 'Confirmation Email'
    ]);
  }

  return sheet;
}

function logEmailResult(subject, recipient, ok, details) {
  const spreadsheet = getSheet().getParent();
  let logSheet = spreadsheet.getSheetByName('Email Log');
  if (!logSheet) {
    logSheet = spreadsheet.insertSheet('Email Log');
    logSheet.appendRow(['Timestamp', 'Subject', 'Recipient', 'Status', 'Details']);
  }
  logSheet.appendRow([new Date(), subject, recipient, ok ? 'Sent' : 'Failed', details || '']);
}

function doPost(request) {
  try {
    let data = {};

    if (request.postData && request.postData.contents) {
      try {
        data = JSON.parse(request.postData.contents);
      } catch (_) {
        data = request.parameter || {};
      }
    } else {
      data = request.parameter || {};
    }

    const fullName = String(data.fullName || '').trim();
    const businessEmail = String(data.businessEmail || data.email || '').trim();
    const phoneNumber = String(data.phoneNumber || data.phone || '').trim();
    const companyName = String(data.companyName || data.company || '').trim();
    const country = String(data.country || '').trim();
    const serviceRequired = String(data.serviceRequired || data.service || '').trim();
    const message = String(data.message || '').trim();

    if (!fullName || !businessEmail || !phoneNumber || !companyName || !country || !serviceRequired || !message) {
      throw new Error('Required enquiry fields are missing.');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(businessEmail)) {
      throw new Error('The submitted business email address is invalid.');
    }

    const sheet = getSheet();
    const rowNumber = sheet.getLastRow() + 1;

    sheet.appendRow([
      new Date(), fullName, businessEmail, phoneNumber,
      companyName, country, serviceRequired, message, 'New', 'Pending', 'Pending'
    ]);

    const teamRecipient = PropertiesService.getScriptProperties().getProperty('GMAIL_TO_ADDRESS')
      || 'finmy3global@gmail.com';

    let teamEmailStatus = 'Failed';
    try {
      sendTeamNotification(teamRecipient, fullName, businessEmail, phoneNumber, companyName, country, serviceRequired, message);
      teamEmailStatus = 'Sent';
      console.info(`SENT team email to ${teamRecipient} for enquiry from ${fullName}`);
    } catch (teamEmailError) {
      teamEmailStatus = 'Failed: ' + teamEmailError.message;
      console.error(`NOT SENT team email to ${teamRecipient} for enquiry from ${fullName}: ${teamEmailError.message}`);
    }

    let confirmationEmailStatus = 'Failed';
    try {
      sendClientConfirmation(fullName, businessEmail, companyName, serviceRequired, message);
      sheet.getRange(rowNumber, 11).setValue('Sent');
      confirmationEmailStatus = 'Sent';
      console.info(`SENT confirmation email to client ${businessEmail} for ${fullName}`);
    } catch (confirmationEmailError) {
      confirmationEmailStatus = 'Failed: ' + confirmationEmailError.message;
      console.error(`NOT SENT confirmation email to client ${businessEmail} for ${fullName}: ${confirmationEmailError.message}`);
    }

    sheet.getRange(rowNumber, 9).setValue(teamEmailStatus === 'Sent' && confirmationEmailStatus === 'Sent' ? 'Processed' : 'Processed - Email issue');
    sheet.getRange(rowNumber, 10).setValue(teamEmailStatus);
    sheet.getRange(rowNumber, 11).setValue(confirmationEmailStatus);

    logEmailResult(`New FinMy3 enquiry from ${fullName}`, teamRecipient, teamEmailStatus === 'Sent', teamEmailStatus);
    logEmailResult('Thank you for contacting FinMy3', businessEmail, confirmationEmailStatus === 'Sent', confirmationEmailStatus);

    return ContentService.createTextOutput(JSON.stringify({
      ok: true,
      teamEmailStatus: teamEmailStatus,
      confirmationEmailStatus: confirmationEmailStatus
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error('doPost failed: ' + error.message);
    return ContentService.createTextOutput(JSON.stringify({
      ok: false,
      message: error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function sendTeamNotification(teamRecipient, fullName, businessEmail, phoneNumber, companyName, country, serviceRequired, message) {
  const teamBody = [
    'New FinMy3 website enquiry',
    '',
    `Full name: ${fullName}`,
    `Business email: ${businessEmail}`,
    `Phone number: ${phoneNumber}`,
    `Company: ${companyName}`,
    `Country: ${country}`,
    `Service: ${serviceRequired}`,
    `Message:\n${message}`
  ].join('\n');

  const teamHtml = buildTeamEmailHtml(fullName, businessEmail, phoneNumber, companyName, country, serviceRequired, message);

  GmailApp.sendEmail(teamRecipient, `New enquiry: ${fullName} - ${serviceRequired}`, teamBody, {
    name: 'FinMy3',
    replyTo: businessEmail,
    htmlBody: teamHtml
  });
}

function sendClientConfirmation(fullName, businessEmail, companyName, serviceRequired, message) {
  const confirmationBody = `Dear ${fullName},\n\nThank you for contacting FinMy3. We have received your application and our team will reach out to you within 2 business days.\n\nYour enquiry details:\nService: ${serviceRequired}\nCompany: ${companyName}\nMessage: ${message}\n\nWarm regards,\nFinMy3 Team\n`;

  GmailApp.sendEmail(businessEmail, 'Thank you for contacting FinMy3', confirmationBody, {
    name: 'FinMy3',
    htmlBody: buildClientEmailHtml(fullName, companyName, serviceRequired, message)
  });
}

function buildClientEmailHtml(fullName, companyName, serviceRequired, message) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>FinMy3 enquiry confirmation</title>
</head>
<body style="margin:0;padding:0;background:#f3f6f4;font-family:Arial,Helvetica,sans-serif;color:#18322a;-webkit-text-size-adjust:100%;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f3f6f4;width:100%;">
    <tr><td align="center" style="padding:24px 12px;">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #dde7e1;">
        <tr><td style="background:#1f513d;padding:28px 32px;text-align:left;">
          <p style="margin:0;color:#ffffff;font-size:28px;font-weight:700;letter-spacing:-0.5px;">FinMy3</p>
          <p style="margin:8px 0 0;color:#dbeae2;font-size:14px;">Financial clarity for your next move</p>
        </td></tr>
        <tr><td style="padding:32px 32px 18px;">
          <p style="margin:0 0 18px;font-size:16px;line-height:1.6;color:#18322a;">Dear ${escapeHtml(fullName)},</p>
          <p style="margin:0 0 18px;font-size:16px;line-height:1.7;color:#41564d;">Thank you for contacting <strong style="color:#1f513d;">FinMy3</strong>. We have received your application and appreciate you taking the time to share your requirements with us.</p>
          <p style="margin:0 0 24px;font-size:16px;line-height:1.7;color:#41564d;">Our team will review your enquiry and <strong>reach out to you within 2 business days</strong>.</p>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f5f8f6;border:1px solid #e1ebe5;border-radius:10px;">
            <tr><td style="padding:20px 22px;">
              <p style="margin:0 0 14px;font-size:13px;text-transform:uppercase;letter-spacing:1px;font-weight:700;color:#1f513d;">Your enquiry summary</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr><td style="padding:5px 0;font-size:14px;line-height:1.5;color:#697a72;width:92px;vertical-align:top;"><strong style="color:#18322a;">Service</strong></td><td style="padding:5px 0;font-size:14px;line-height:1.5;color:#41564d;">${escapeHtml(serviceRequired)}</td></tr>
                <tr><td style="padding:5px 0;font-size:14px;line-height:1.5;color:#697a72;vertical-align:top;"><strong style="color:#18322a;">Company</strong></td><td style="padding:5px 0;font-size:14px;line-height:1.5;color:#41564d;">${escapeHtml(companyName)}</td></tr>
                <tr><td style="padding:10px 0 5px;font-size:14px;line-height:1.5;color:#697a72;vertical-align:top;"><strong style="color:#18322a;">Message</strong></td><td style="padding:10px 0 5px;font-size:14px;line-height:1.6;color:#41564d;">${escapeHtml(message).replace(/\\n/g, '<br>')}</td></tr>
              </table>
            </td></tr>
          </table>
          <p style="margin:26px 0 0;font-size:16px;line-height:1.7;color:#41564d;">Warm regards,<br><strong style="color:#18322a;">The FinMy3 Team</strong></p>
        </td></tr>
        <tr><td style="border-top:1px solid #e7ede9;padding:20px 32px;text-align:center;color:#7a8982;font-size:12px;line-height:1.6;">This is an automated confirmation for your FinMy3 enquiry.<br>Please do not include passwords or sensitive payment information.</td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function buildTeamEmailHtml(fullName, businessEmail, phoneNumber, companyName, country, serviceRequired, message) {
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>New FinMy3 enquiry</title></head>
<body style="margin:0;padding:0;background:#f3f6f4;font-family:Arial,Helvetica,sans-serif;color:#18322a;-webkit-text-size-adjust:100%;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f3f6f4;width:100%;"><tr><td align="center" style="padding:24px 12px;">
    <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:12px;border:1px solid #dde7e1;">
      <tr><td style="background:#1f513d;padding:24px 32px;"><p style="margin:0;color:#fff;font-size:24px;font-weight:700;">FinMy3</p><p style="margin:6px 0 0;color:#dbeae2;font-size:14px;">New website enquiry</p></td></tr>
      <tr><td style="padding:30px 32px;"><p style="margin:0 0 20px;font-size:18px;font-weight:700;color:#18322a;">Enquiry from ${escapeHtml(fullName)}</p>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f5f8f6;border:1px solid #e1ebe5;border-radius:10px;"><tr><td style="padding:18px 20px;">
          ${emailDetailRow('Full name', fullName)}${emailDetailRow('Email', businessEmail)}${emailDetailRow('Phone', phoneNumber)}${emailDetailRow('Company', companyName)}${emailDetailRow('Country', country)}${emailDetailRow('Service', serviceRequired)}${emailDetailRow('Message', message)}
        </td></tr></table>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;
}

function emailDetailRow(label, value) {
  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr><td style="padding:6px 0;font-size:13px;color:#697a72;width:80px;vertical-align:top;"><strong style="color:#18322a;">${escapeHtml(label)}</strong></td><td style="padding:6px 0;font-size:14px;line-height:1.5;color:#41564d;">${escapeHtml(value).replace(/\\n/g, '<br>')}</td></tr></table>`;
}

function setupAutomaticEmailRetry() {
  const triggers = ScriptApp.getProjectTriggers();
  const alreadyInstalled = triggers.some((trigger) =>
    trigger.getHandlerFunction() === 'processPendingEnquiries'
  );

  if (!alreadyInstalled) {
    ScriptApp.newTrigger('processPendingEnquiries')
      .timeBased()
      .everyMinutes(5)
      .create();
  }

  return 'Automatic email retry is configured.';
}

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    ok: true,
    service: 'FinMy3 enquiry endpoint'
  })).setMimeType(ContentService.MimeType.JSON);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function testEmailSending() {
  const testRecipient = Session.getEffectiveUser().getEmail();
  const testSubject = 'Test Email from FinMy3';
  const testBody = 'This is a test email to verify the sending configuration.';

  try {
    GmailApp.sendEmail(testRecipient, testSubject, testBody, {
      name: 'FinMy3'
    });
    Logger.log('Test email sent successfully to ' + testRecipient);
  } catch (error) {
    Logger.log('Failed to send test email: ' + error.message);
  }
}

function manualEmailTest(recipient, subject, body) {
  try {
    GmailApp.sendEmail(recipient, subject, body, {
      name: 'FinMy3'
    });
    Logger.log('Manual email sent successfully to ' + recipient);
  } catch (error) {
    Logger.log('Failed to send manual email: ' + error.message);
  }
}

function testEmailDelivery() {
  const recipient = PropertiesService.getScriptProperties().getProperty('GMAIL_TO_ADDRESS')
    || 'finmy3global@gmail.com';

  try {
    GmailApp.sendEmail(
      recipient,
      'FinMy3 email delivery test',
      'This test confirms that Gmail delivery is working for FinMy3 enquiries.',
      { name: 'FinMy3' }
    );
    logEmailResult('FinMy3 email delivery test', recipient, true, 'Manual test sent successfully');
  } catch (error) {
    logEmailResult('FinMy3 email delivery test', recipient, false, error.message);
    throw error;
  }
}

function testConfirmationEmail() {
  const recipient = PropertiesService.getScriptProperties().getProperty('GMAIL_TO_ADDRESS')
    || 'finmy3global@gmail.com';

  try {
    GmailApp.sendEmail(recipient, 'Thank you for contacting FinMy3',
      'Dear Client Test,\n\nThank you for contacting FinMy3. We have received your application and our team will reach out within 2 business days.\n\nWarm regards,\nFinMy3 Team',
      {
        name: 'FinMy3',
        htmlBody: buildClientEmailHtml('Client Test', 'FinMy3 Test Company', 'Virtual CFO Services', 'This is a professional confirmation email test.')
      });
    Logger.log(`Professional confirmation test sent to ${recipient}.`);
  } catch (error) {
    Logger.log('Professional confirmation test failed: ' + error.message);
    throw error;
  }
}

function processPendingEnquiries() {
  const sheet = getSheet();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return { processed: 0, sent: 0, failed: 0 };

  const values = sheet.getRange(2, 1, lastRow - 1, 11).getValues();
  let sent = 0;
  let failed = 0;

  values.forEach((row, index) => {
    const rowNumber = index + 2;
    const fullName = String(row[1] || '').trim();
    const businessEmail = String(row[2] || '').trim();
    const companyName = String(row[4] || '').trim();
    const serviceRequired = String(row[6] || '').trim();
    const message = String(row[7] || '').trim();
    const confirmationStatus = String(row[10] || '').trim();

    if (!fullName || !businessEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(businessEmail)) return;
    if (confirmationStatus === 'Sent') return;

    try {
      sendClientConfirmation(fullName, businessEmail, companyName, serviceRequired, message);
      sheet.getRange(rowNumber, 11).setValue('Sent');
      logEmailResult('Thank you for contacting FinMy3', businessEmail, true, 'Sent from spreadsheet');
      sent++;
    } catch (error) {
      sheet.getRange(rowNumber, 11).setValue('Failed: ' + error.message);
      logEmailResult('Thank you for contacting FinMy3', businessEmail, false, error.message);
      failed++;
    }
  });

  const processed = sent + failed;
  Logger.log(`Processed spreadsheet confirmations: ${processed}; Sent: ${sent}; Failed: ${failed}`);
  return { processed: processed, sent: sent, failed: failed };
}

