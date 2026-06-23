# Edify Documents Checklist (Next.js)

Web-based Documents Checklist form for Edify Group of Companies.

## Features

- Fill out document checklist with checkboxes
- Country dropdown and remarks
- **Download PDF** – saves filled form as PDF
- **Share on WhatsApp** – client number modal + text template
- **Share via Email** – opens email client with checklist template

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
npm run build
npm start
```

## Deploy

Deploy to **Vercel** (recommended for Next.js):

1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Deploy automatically

Or use Netlify, Cloudflare Pages, or any Node.js host.

## Project Structure

```
app/
  layout.jsx      # Root layout
  page.jsx        # Home page
  globals.css     # Styles
components/
  ChecklistForm.jsx  # Main form (client component)
lib/
  constants.js    # Countries, sections, offices
  templates.js    # WhatsApp & email templates
  validation.js   # Form & phone validation
  pdf.js          # PDF generation
  whatsapp.js     # WhatsApp sharing
  email.js        # Email sharing
```
