# FinMy3

FinMy3 is a responsive financial consulting and virtual CFO website built to present professional services, business solutions, company information, and online enquiries.

## Features

- Responsive desktop and mobile layouts
- Services, solutions, about, contact, privacy, and terms pages
- Interactive homepage dashboard carousel
- Mobile service and audience carousels
- Contact enquiry form with country calling-code selection
- Google Sheets enquiry storage
- Automated team notification and client confirmation emails
- Accessible navigation and mobile menu
- SEO metadata and branded browser icon

## Tech Stack

- React 19
- TanStack Start and TanStack Router
- TypeScript
- Vite
- Tailwind CSS 4
- Lucide React
- Google Apps Script
- Google Sheets and Gmail
- Vitest

## Local Development

### Requirements

- Node.js 20 or later
- npm

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and configure the values:

```env
VITE_WHATSAPP_NUMBER=COUNTRYCODE_MOBILE_NUMBER
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
VITE_LINKEDIN_URL=
VITE_INSTAGRAM_URL=
VITE_FACEBOOK_URL=
GMAIL_TO_ADDRESS=your-address@gmail.com
```

`VITE_WHATSAPP_NUMBER` must contain only the international digits. For example: `919876543210`.

The `VITE_GOOGLE_APPS_SCRIPT_URL` is public browser configuration. Never place Gmail app passwords or private credentials in variables beginning with `VITE_`.

### Start the Website

```bash
npm run dev
```

Open the local URL printed by Vite. The default project port is `8080`, but Vite will select another port if it is occupied.

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run test
```

## Google Apps Script Setup

1. Open [Google Apps Script](https://script.google.com/) and create a project.
2. Copy the contents of `scripts/google-apps-script.gs` into `Code.gs`.
3. Set the script property `GMAIL_TO_ADDRESS` to the FinMy3 team email.
4. Optionally set `SPREADSHEET_ID` to the target Google Sheet ID.
5. If `SPREADSHEET_ID` is not set, the script uses the spreadsheet bound to the Apps Script project.
6. Save the project and deploy it as a Web App.
7. Configure **Execute as: Me** and **Who has access: Anyone**.
8. Copy the generated `/exec` URL into `VITE_GOOGLE_APPS_SCRIPT_URL`.
9. Redeploy after script changes and grant Gmail and Sheets permissions when requested.

The script stores submissions in an `Enquiries` sheet and can send:

- A team notification to `GMAIL_TO_ADDRESS`
- A confirmation email to the visitor's submitted business email

Email delivery and failure statuses are recorded in `Email Log`.

## Vercel Deployment

### Option 1: Deploy from the Vercel Dashboard

1. Push the project to GitHub.
2. Create a new Vercel project.
3. Import the repository.
4. Use these settings:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Install Command: `npm install`
5. Add the environment variables from `.env.example` in Vercel Project Settings.
6. Deploy the project.

### Option 2: Deploy with Vercel CLI

```bash
npm install -g vercel
vercel
vercel --prod
```

Add the production environment variables in the Vercel dashboard or with:

```bash
vercel env add VITE_GOOGLE_APPS_SCRIPT_URL
vercel env add VITE_WHATSAPP_NUMBER
vercel env add GMAIL_TO_ADDRESS
```

Redeploy after changing environment variables.

## Production Checklist

- Replace example social URLs with real profiles.
- Set the live WhatsApp international number.
- Configure the production Google Apps Script `/exec` URL.
- Deploy the latest Apps Script code.
- Authorize Gmail and Google Sheets access.
- Verify that team and client emails arrive outside Spam.
- Configure SPF, DKIM, and DMARC for the eventual custom email domain.
- Add the production domain in Vercel.
- Run `npm run build` before deployment.

## Project Structure

```text
src/
  components/
  lib/
  routes/
  styles.css
scripts/
  google-apps-script.gs
public/
.env.example
package.json
vite.config.ts
```

## Security

- Do not commit `.env` or real credentials.
- `.env` is ignored by Git.
- Do not prefix private secrets with `VITE_`.
- Rotate credentials if they have been exposed.
- Validate and restrict Google Apps Script access.

## License

Add the appropriate business or proprietary license for the FinMy3 project.
