# Dance Coach Frontend

Next.js frontend with SSR for the dance coach business card website.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file from `.env.local.example`:
```bash
cp .env.local.example .env.local
```

3. Update `.env.local` with your configuration:
   - API URL
   - GTM ID (optional)

4. Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Build for Production

```bash
npm run build
npm start
```

## Features

- Server-Side Rendering (SSR) for all pages
- SEO optimization with metadata
- Responsive design
- Analytics integration (GTM, Yandex.Metrica, GA4)
- Authentication and user dashboard
- Lead form with analytics events

