# 💍 wymm — Will You Marry Me?

> **The biodata that speaks before you do.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/your-username/wymm/pulls)

**wymm** is an open-source Indian marriage biodata platform. Build a beautiful, shareable profile in minutes — no design skills, no PDF attachments, no awkward Word documents.

---

## What is wymm?

A biodata travels farther than you do. It reaches families you haven't met, relatives in cities you've never visited, and people whose first impression of you is a printed sheet passed across a dining table. For something so consequential, most biodatas look like they were made in 2003 — a Times New Roman table, a passport photo pasted in the corner, information crammed into rows.

wymm was built to change that. Every person deserves a biodata that actually reflects who they are — with the warmth, personality, and visual care their story deserves. Not a form. Not a template from a Google search. A first impression that feels like *you*.

Built specifically for the Indian matrimonial context, wymm understands the nuance — gotra, mother tongue, family type, native place, dietary preference, the particular weight of a parent's profession in a biodata. It's all there, thoughtfully structured, without sacrificing beauty. Fill out a guided 6-step form, pick a template, and share a link. That's it.

---

## 🔗 Live Demo

**Try [wymm.store](https://wymm.store)** — no account required to create your first biodata.

---

## ✨ Features

- 🎨 **16 professionally designed templates** — from minimal to royal, modern to traditional
- 🔗 **Shareable profile links** — animated, mobile-optimized pages (not PDFs)
- 👁️ **Live preview while building** — see your biodata update in real time
- 🆓 **Free forever** — no account required to create and share
- 📱 **Mobile-first design** — looks great on every screen size
- 📄 **PDF export** — download a print-ready version anytime
- ☁️ **Firebase backend** — Firestore for data, Storage for photos
- 🧭 **Guided 6-step form** — Basic Info → Family → Education & Career → Interests → Preferences → Photos
- 🖼️ **Template gallery** — browse all designs before you commit
- 👤 **Multi-profile management** — sign in with email to manage multiple biodatas

---

## 🎨 Templates (16 designs)

| Template | Style | Vibe |
|---|---|---|
| Modern Minimal | Contemporary | Quietly confident |
| Refined Elegance | Classic serif | Warmly sophisticated |
| Professional Premium | Corporate clean | High-achiever energy |
| Cultural Grace | Heritage motifs | Proud of roots |
| The Modernist | Bold, graphic | Unconventional |
| Mountain Soul | Earthy, outdoorsy | Grounded & adventurous |
| Vintage Warmth | Retro warmth | Keeper of traditions |
| Aurora Glass | Glassmorphism | Beautifully modern |
| Ocean Breeze | Coastal, airy | Calm & open |
| Royal Majestic | Regal, ornate | Grand & opulent |
| Botanical Fresh | Nature-inspired | Fresh & organic |
| Celestial Night | Dark, cosmic | Mysterious & dreamy |
| Rose Gold Luxe | Soft luxury | Elegant & refined |
| Zen Minimal | Sparse, peaceful | Still & intentional |
| Pastel Dreams | Soft gradients | Gentle & romantic |
| Heritage Splendor | Traditional Indian | Rich & cultural |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + TypeScript 6 |
| Routing | React Router v7 |
| State | Zustand 5 |
| Forms | React Hook Form 7 + Zod 4 |
| Animations | Framer Motion 12 |
| Styling | Tailwind CSS 4 |
| PDF Export | jsPDF + html2canvas |
| Backend | Firebase 12 |
| Database | Cloud Firestore |
| Storage | Firebase Storage |
| Auth | Firebase Authentication |
| Build | Vite 8 |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A Firebase project ([free tier](https://firebase.google.com/pricing) works perfectly)

### Installation

```bash
git clone https://github.com/your-username/wymm
cd wymm/frontend
npm install
cp .env.example .env
# Fill in your Firebase config (see below)
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and you're live.

### Firebase Setup

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Firestore Database** — start in test mode
3. Enable **Firebase Storage**
4. Enable **Firebase Authentication** — turn on Email/Password and Google providers
5. Copy your Firebase config values into `.env` (see below)
6. Deploy Firestore security rules:
   ```bash
   firebase deploy --only firestore:rules
   ```

### Environment Variables

Create a `.env` file in `frontend/` with:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

---

## 📁 Project Structure

```
wymm/
└── frontend/
    ├── public/
    │   └── templates/          # Template preview images
    ├── src/
    │   ├── components/
    │   │   ├── layout/         # Navbar, footer
    │   │   └── templates/      # All 16 template components
    │   ├── pages/
    │   │   ├── LandingPage.tsx
    │   │   ├── BuilderPage.tsx  # 6-step guided form
    │   │   ├── PreviewPage.tsx  # Live preview
    │   │   ├── SharePage.tsx    # Public shareable profile (/:slug)
    │   │   └── AboutPage.tsx
    │   ├── types/
    │   │   └── biodata.ts      # All types, TemplateId union, TEMPLATE_META
    │   ├── store/              # Zustand state management
    │   ├── lib/                # Firebase config, utilities
    │   └── App.tsx             # Routes
    └── package.json
```

---

## 🎯 How to Add a New Template

Contributing a template is the most impactful way to help. Here's the complete guide:

**1. Create your component**

```
src/components/templates/TemplateYourName.tsx
```

**2. Build it using the `BiodataRecord` prop**

```tsx
import type { BiodataRecord } from '@/types/biodata'

export default function TemplateYourName({ biodata }: { biodata: BiodataRecord }) {
  const { basicInfo, familyInfo, education, career, personalInterests } = biodata
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#FFFFFF' }}>
      <h1>{basicInfo.fullName}</h1>
      {/* Build your template here */}
    </div>
  )
}
```

**3. Register your template ID**

Add to the `TemplateId` union in `src/types/biodata.ts`:

```ts
export type TemplateId = '...' | 'your-template-name'
```

**4. Add metadata**

Add an entry to `TEMPLATE_META` in the same file:

```ts
'your-template-name': {
  name: 'Your Template Name',
  tagline: 'For the ...',
  accent: '#HEX',
  preview: '/templates/your-template-name-preview.jpg',
},
```

**5. Register in page switch statements**

Add your template to the `switch` statements in:
- `src/pages/BuilderPage.tsx`
- `src/pages/PreviewPage.tsx`
- `src/pages/SharePage.tsx`

**6. (Optional) Add a preview image**

Drop a `your-template-name-preview.jpg` in `public/templates/` and add it to the category filter in `src/pages/TemplatesPage.tsx`.

---

## 🌐 Deployment

### Vercel (Recommended)

Connect your GitHub repo to [vercel.com](https://vercel.com) for zero-config auto-deploys on every push.

Or deploy manually:

```bash
cd frontend
npm run build
# Deploy the dist/ folder to Vercel
```

Set your `VITE_FIREBASE_*` environment variables in the Vercel project settings.

### Firebase Hosting (Alternative)

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Set public directory to: frontend/dist
# Configure as single-page app: yes
cd frontend && npm run build
firebase deploy
```

---

## 🤝 Contributing

Contributions are welcome — templates, features, bug fixes, or design improvements.

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/amazing-template`
3. Commit your changes
4. Push and open a PR

For new templates, follow the template guide above. For new features or significant changes, open an issue first to discuss the approach. This keeps everyone's effort aligned.

---

## 📄 License

MIT — free to use, modify, and distribute. See [LICENSE](./LICENSE) for details.

---

## 💙 Made with love in India

wymm was built to give every person in India the biodata they deserve — one that represents their story with the elegance and intention it deserves. Whether you're 24 in Bengaluru or 32 in Patna, your first impression should be as thoughtful as you are.

---

*"Will You Marry Me?" — four words that change everything. wymm is the journey that leads to that question.*
