# wymm — Interactive Biodata Platform
## Design Specification

**Project:** Will You Marry Me? (wymm)  
**Date:** 2026-06-02  
**Status:** Design Approved  

---

## 1. Project Vision

wymm is a bright, celebratory SaaS platform for creating stunning, animated biodata profiles for arranged marriages in India. Users (individuals or marriage agents) fill a guided form → see a live preview → share online or download as PDF. Every interaction should feel delightful, interactive, and emotionally resonant with the joy of finding a life partner.

**Core Value Proposition:**
- Professional-grade biodata design vs. outdated DIY or agent templates
- Highly animated, engaging "personal website" aesthetic
- Easy guided form (no design skills needed)
- Free to use, shareable links, PDF download
- Cultural respect + modern energy

---

## 2. User Personas

### 2.1 Individual User
- Age: 25-35
- Creating their own biodata for matrimony sites or sharing with brokers
- Tech-comfortable, appreciates beautiful design and professional presentation
- Wants their biodata to feel elevated, mature, and stand out with refined sophistication
- Values elegance over flashiness
- Shares via links or downloads PDF to send to matrimony agents/families

### 2.2 Marriage Agent / Broker
- Creates biodatas for multiple clients
- Values speed, professional output, and elegant presentation
- Wants to impress clients with sophisticated, refined designs
- Plans to offer this as a premium service (future: bulk management, white-label options)
- Currently: one client at a time, same workflow as individuals

---

## 3. Feature Set

### 3.1 Core Features (MVP)

**1. Landing Page**
- Bright white background with subtle ambient aurora gradient (barely visible)
- Headline: "Will You Marry Me?" in elegant 56px typography with minimal glow (soft accent color)
- Subheading: refined 18px text explaining the vision (maturity, elegance)
- 4 template preview cards displayed elegantly
  - Each card has soft shadow, minimal borders
  - Hover: subtle background wash, smooth scale (1.02x)
  - Refined cursor interactions (subtle glow, smooth pointer transition)
- CTA button: "Create Your Biodata" (large, white with soft lavender background, smooth hover transition)
- Navigation: clean, minimal, light aesthetic

**2. Template Selection**
- 4 professionally designed templates (all elegant, refined, no childish elements)
  - **Template A: "Modern Minimal"** — clean white space, elegant typography, subtle accent color highlights, smooth scroll animations, minimal geometric accents
  - **Template B: "Refined Elegance"** — soft gradient backgrounds (lavender/rose), card-based layout with refined spacing, elegant micro-interactions, sophisticated color blocking
  - **Template C: "Professional Premium"** — minimal aesthetic, photo gallery with refined frames, timeline-style career section, premium typography
  - **Template D: "Cultural Grace"** — incorporates refined Indian design elements (subtle patterns, warm accent colors), elegant animations, celebrates cultural identity with sophistication
- Each template:
  - Has 5-6 customizable sections
  - Animates on scroll (fade-in, subtle slide effects — no jarring transitions)
  - Loads images with smooth transitions (fade-in over 300ms)
  - Is fully responsive (mobile-first, elegant on all sizes)
  - Exports cleanly to PDF (animations become static polish, layout preserved, colors remain elegant)

**3. Guided Form Builder (Split-screen)**
- **Left panel:** Multi-step form in refined glass card (very subtle frosted effect)
  - Background: rgba(255,255,255,0.7) with 8px backdrop blur
  - Subtle border: 1px solid rgba(0,0,0,0.05)
  - Step 1: Basic Info (name, age, height, religion, caste, location)
  - Step 2: Family (father/mother name & profession, siblings)
  - Step 3: Education & Career (qualification, current profession, income range optional)
  - Step 4: Personal Interests (hobbies, languages, lifestyle preferences, personality traits)
  - Step 5: Match Preferences (looking for: qualities, education, profession, location)
  - Step 6: Media (profile photo, gallery up to 5 images, optional resume/certifications)
  - Step indicators at top: clean dots with smooth progress bar (soft lavender color)
  - Input fields: white background, soft border (1px #E5E5E5), glow on focus (lavender)
  - Labels: float smoothly when focused (elegant 150ms animation)
  - Help text: subtle gray (#AAAAAA), non-intrusive
- **Right panel:** Live template preview with refined elegance
  - White or soft background, matching selected template aesthetic
  - Updates in real-time as user types (smooth transitions)
  - Staggered fade-in animations (300ms per section)
  - Scroll-snap within preview (smooth, purposeful)
  - Buttons visible: "Edit" (returns to form), "Download PDF", "Share Link" (all refined styling)

**4. Share & Download**
- **Share link:** Generates unique URL → `wymm.com/bidi-sharma-123`
  - QR code for scanning (refined black on white, 2cm x 2cm)
  - Copy link button: smooth hover transition, success toast (green checkmark, soft green glow)
  - Social sharing: refined buttons for WhatsApp, email (LinkedIn optional, not Facebook — maintains professionalism)
  - Message: elegant, brief copy about sharing the biodata
- **PDF Download:** Server-side rendering via Puppeteer
  - Renders template to static PDF with refined styling intact
  - Animations become visual polish (colors, gradients preserved, layouts perfect)
  - A4 format, optimized for printing and professional presentation
  - Filename: `wymm-biodata-{name}-{date}.pdf` (professional naming)

### 3.2 Media & Storage (Free Tier)

**Image Upload:**
- Profile photo (1): max 5MB, auto-compressed to 1MB via Firebase Storage
- Gallery (up to 5 images): max 500KB each after compression
- Optional: Resume/certification PDF (max 2MB)

**Firebase Storage Limits:**
- 1GB free monthly download
- 5GB total storage free
- Images auto-resized via Cloud Storage rules (max width 1200px, JPEG 80% quality)

**Performance:**
- CDN delivery via Firebase Hosting
- Lazy-load images on template
- Blur-up placeholder while loading

### 3.3 Data Structure

**Biodata Record (Firebase Firestore):**
```
{
  userId: "user-id",
  templateId: "template-a|b|c|d",
  slug: "bidi-sharma-123",
  basicInfo: {
    name, age, height, religion, caste, location, bloodType (optional)
  },
  family: {
    father: {name, profession}, 
    mother: {name, profession}, 
    siblings: [{name, age, profession}]
  },
  education: {
    qualification, university, field, yearOfPassing
  },
  career: {
    profession, company, yearsOfExperience, incomeRange (optional, privacy flag)
  },
  personalInterests: {
    hobbies: [], languages: [], lifestyle: {}, personalityTraits: []
  },
  matchPreferences: {
    lookingFor: {qualities, minAge, maxAge, professions, locations}
  },
  media: {
    profilePhoto: {url, uploadedAt},
    gallery: [{url, caption, uploadedAt}],
    resume: {url, fileName}
  },
  createdAt, updatedAt, isPublic: true
}
```

---

## 4. Technical Architecture

### 4.1 Frontend Stack (Free)

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS + custom Aurora/glassmorphism layers
- **Animation:** Framer Motion (smooth transitions) + GSAP (complex cursor interactions)
- **Components:** Headless UI (accessible, unstyled)
- **Image Processing:** Client-side compression via browser APIs + Firebase Storage
- **Hosting:** Vercel (free tier)

### 4.2 Backend Stack (Free)

- **Runtime:** Node.js + Express
- **Database:** Firebase Firestore (free tier: 1GB storage, 50k reads/day)
- **File Storage:** Firebase Storage (free tier: 5GB, 1GB/day download)
- **PDF Generation:** Puppeteer (headless Chrome, runs server-side)
- **Hosting:** Railway or Render (free tier)
- **Auth:** Firebase Auth (email/password, optional social login)

### 4.3 Data Flow

```
User → Form Builder → Live Preview
          ↓
       Save (POST /api/biodata)
          ↓
     Firebase Firestore (store JSON)
     Firebase Storage (store media)
          ↓
    Generate unique slug
          ↓
Return shareable link: wymm.com/{slug}
```

**Share Flow:**
```
User clicks "Share" → Backend generates QR → Frontend displays link + QR + social buttons → User copies/shares
```

**PDF Flow:**
```
User clicks "Download" → Backend fetches biodata from Firestore → Renders React template via Puppeteer → Converts to PDF → Returns file
```

---

## 5. UI/UX Design System

### 5.1 Color Palette

**Design Philosophy:** White/light bright theme as primary, with elegant color accents in soft ambient gradients. Mature, sophisticated, celebratory but dignified (inspired by humanshere.ai's elegance). Dual theme support (light + dark mode).

**Light Mode (Primary):**
- Background: #FFFFFF (pure white)
- Secondary background: #F8F9FB (soft off-white)
- Accent colors (subtle, soft gradients):
  - Lavender: #E8DFF5 (light purple accent)
  - Rose: #FCE8EB (soft pink accent)
  - Sage: #E5F0E8 (muted green accent)
  - Soft blue: #E8F2F9 (gentle blue accent)
- Text primary: #1A1A1A (almost black, easier on eyes)
- Text secondary: #666666 (muted gray)
- Borders: #E5E5E5 (light gray)
- Accent dots/highlights: #7C3AED (soft purple), #EC4899 (muted pink), #10B981 (muted green)

**Dark Mode (Alternative):**
- Background: #0F0F0F (deep dark, not pure black)
- Secondary background: #1A1A1A (slightly lighter)
- Accent colors (same soft palette, adjusted for dark):
  - Lavender: #6B5B95 (muted purple)
  - Rose: #A85A6A (muted rose)
  - Sage: #5A8C69 (muted sage)
  - Soft blue: #5A8DB8 (muted blue)
- Text primary: #F5F5F5 (off-white)
- Text secondary: #AAAAAA (muted gray)
- Borders: #333333 (subtle dark border)
- Accent dots: same vibrant but not neon

**Aurora Ambient Gradients (Subtle):**
- Flowing, barely perceptible color shifts in backgrounds
- Used in hero sections, form backgrounds, template preview areas
- Direction: slow, gentle gradient animations (15-20s loops)
- Example: white → soft lavender → soft rose → white (30% opacity overlay)
- Never jarring; always supports readability

### 5.2 Typography

**Font Stack (Google Fonts):**
- Headings: "Sora" or "Inter" (modern, clean, professional weight: 600-700)
- Body: "Inter" (readable, elegant, weight: 400-500)
- Accents: "Poppins" (sparingly, for special callouts only)

**Type Scale:**
- H1 (Hero): 56px, weight 700, letter-spacing -1px
- H2 (Section): 36px, weight 600, letter-spacing -0.5px
- H3 (Subsection): 24px, weight 600, letter-spacing 0
- Body (Large): 18px, weight 400, line-height 1.6
- Body (Regular): 16px, weight 400, line-height 1.6
- Body (Small): 14px, weight 500, line-height 1.5
- Label/Input: 14px, weight 500, line-height 1.4

**Text Colors:**
- Primary: #1A1A1A (on light backgrounds)
- Secondary: #666666 (descriptions, hints)
- Tertiary: #AAAAAA (disabled, faded)
- Interactive text: #7C3AED (link purple, soft purple)

### 5.3 Animation & Interaction

**Core Philosophy:** Refined, purposeful micro-interactions. Every animation should have intention — not busy, but polished. Animations are smooth, subtle, and enhance rather than distract.

**Entrance Animations:**
- Fade + slight scale: 300ms ease-out (slower than typical for elegance)
- Staggered delays: 50-100ms between elements
- No bounce or overshoot (too playful)

**Hover States:**
- Color shift: 200ms smooth transition (text/accent color)
- Background wash: subtle background color change (5-10% opacity shift)
- Underline reveal: smooth line appears under interactive text
- Scale: minimal (1.02x on buttons, 1.01x on cards) — refined, not dramatic

**Focus States (Keyboard Navigation):**
- Subtle ring: 2px solid #7C3AED (soft purple) with 4px offset
- No jarring outline; elegant focus indicator

**Cursor Interactions:**
- Custom cursor (refined dot, not flashy)
- Hover: slight glow around cursor (soft shadow, 10px blur)
- Interactive elements: cursor transitions smoothly to pointer
- Magnetic hover: very subtle pull (20-30px range) toward buttons — refined, not aggressive
- No cursor trail (too playful for this aesthetic)

**Scroll Interactions:**
- Scroll-snap sections: smooth, purposeful snapping
- Parallax: very subtle (2-3% offset), almost imperceptible
- Staggered reveal: elements fade in on scroll (opacity + 10px translate)
- No jarring animations; smooth 150-200ms transitions

**Form Interactions:**
- Input focus: soft glow (lavender or sage, 0.3 opacity)
- Label float: smooth upward animation (150ms) with color shift
- Error state: red text (soft red #DC2626) with gentle shake (100ms)
- Success: checkmark icon fades in with soft green glow
- Field validation: real-time feedback, non-intrusive

**Button Interactions:**
- Default: clean, minimal (white or subtle background)
- Hover: background shifts to soft accent color (10% opacity)
- Active: slight depression effect (1-2px inset shadow)
- Loading: spinner appears (animated dots, soft colors)
- Success: checkmark fade-in, gentle pulse

**Modal/Card Interactions:**
- Entrance: fade + scale-up (200ms, no overshoot)
- Blur backdrop: subtle (5px blur, 20% opacity dark overlay)
- Close: fade-out (100ms)

**Transition Between Pages:**
- Fade (200ms ease-in-out)
- No sliding or dramatic transforms

### 5.4 Glassmorphism & Depth

**Refined Glass Effect (not overdone):**
- Used sparingly on: form backgrounds, preview panes, important cards
- Not on every element (too much = loses elegance)
- Background: rgba(255,255,255,0.7) on light mode (very subtle)
- Backdrop blur: 8-10px (not 20px — too extreme)
- Border: 1px solid rgba(0,0,0,0.05) (barely visible)
- Shadow: subtle 0 8px 24px rgba(0,0,0,0.08)

**Depth Layering:**
- Base (white): #FFFFFF
- Elevated (cards): subtle shadow 0 2px 8px rgba(0,0,0,0.04)
- High (glass): shadow 0 8px 24px rgba(0,0,0,0.08)
- No harsh shadows; everything is refined

### 5.5 Ambient Aurora (Background Gradients)

**Subtle Color Breathing:**
- Used in: hero section background, template preview areas, section separators
- Effect: very faint gradient animation (20-30s loop)
- Opacity: 0.1-0.3 (barely visible, supports readability)
- Example on light background: 
  - Start: white
  - Mid: 10% lavender
  - End: 5% rose
  - Loop smoothly back to white
- On dark mode: same principle with darker accent colors

**When NOT to Use Aurora:**
- Form input areas (would be distracting)
- Text-heavy sections
- Navigation
- Biodata template previews (use clean backgrounds)

---

## 6. User Flow

### 6.1 First-Time User

1. **Landing:** White bright page with subtle aurora gradient, elegant headline, 4 template cards
   - User browses templates, experiences refined hover effects (soft shadows, subtle scaling)
   - Cursor interactions are elegant (subtle glow, smooth transitions)
2. **Inspiration Moment:** Reading maturity-driven copy about what wymm offers (dignity, elegance, professional presentation)
3. **Click:** Smooth transition to template selector
4. **Template Selection:** Chooses one of 4 templates, sees refined preview immediately
   - Transition is smooth (fade 200ms), not jarring
5. **Form Builder:** Clean split-screen experience
   - Left: multi-step form in refined glass card, inputs with elegant focus states
   - Right: live preview showing template updating smoothly
   - User fills Step 1-6 progressively, seeing beautiful updates in real-time
   - Images upload with smooth compression feedback (progress indicator, soft animation)
6. **Preview Moment:** Full-screen biodata view with all refined aesthetic elements
   - User sees how professional their biodata looks (emotional engagement)
   - Buttons visible: "Download PDF", "Share Link", "Edit"
7. **Share/Download:**
   - Download PDF: Puppeteer renders, smooth download with refined filename
   - Share: Copy link, QR code, elegant sharing buttons, success toast with checkmark
8. **Done:** User shares link with matrimony sites/agents with confidence in how professional it looks

### 6.2 Agent Workflow (Same as above, repeated for each client)
- Agents use wymm to create polished biodatas for their clients
- Professional output impresses clients and increases agent's reputation
- Future: bulk management dashboard, white-label options

---

## 7. Success Criteria

- **Performance:** Landing page loads < 2s (white backgrounds + minimal gradients = fast), form builder < 1s on 4G
- **Design Quality:** Every element feels refined, intentional, and professional — no jarring animations or childish aesthetics
- **Accessibility:** WCAG AA, keyboard navigation fully supported, focus states elegant and visible
- **Mobile Experience:** Fully responsive, touch-friendly on iOS/Android, form remains elegant on small screens
- **Interactivity:** Every interaction has refined visual feedback (smooth transitions, elegant hover states)
- **Emotional Impact:** Users feel their biodata is professional and elevated (not generic or cheap-looking)
- **Conversion:** Users choose to download/share because they're impressed with the quality
- **Reliability:** PDF export works on all browsers, no data loss, professional naming and delivery
- **Media Handling:** Images compress smoothly with visual feedback, no jarring uploads
- **Sharing:** QR code generates instantly, social sharing works seamlessly, copy-to-clipboard confirmation is elegant

---

## 8. Constraints & Limitations

**Free Tier Limits:**
- Firebase Firestore: 50k reads/day, 20k writes/day
- Firebase Storage: 5GB total, 1GB download/day
- Image compression: max 1200px width, 80% JPEG quality
- Media per biodata: 1 profile photo + 5 gallery images + 1 resume

**Tech Debt (Out of scope MVP):**
- No user authentication (add later)
- No profile analytics (view counts, click-through rate)
- No bulk export (agents can't download all client biodatas at once)
- No API for third-party integrations (matrimony sites) — planned phase 2

---

## 9. Implementation Phases

### Phase 1: MVP (Current)
- Landing page + template showcase
- Guided form builder (6 steps)
- Live preview
- Share link generation + QR code
- PDF download (basic)

### Phase 2: Polish & Growth (Later)
- User authentication (Firebase Auth)
- Profile editing (update saved biodatas)
- Analytics dashboard
- Email notifications (shared link view count)

### Phase 3: Integration (Future)
- API for matrimony site integrations (Shaadi, BharatMatrimony)
- Agent bulk management dashboard
- Custom branding options

---

## 10. Design Tokens (Stitch MCP Ready)

**Colors (Light Mode):**
```
bg-primary: #FFFFFF
bg-secondary: #F8F9FB
accent-lavender: #E8DFF5 (light purple)
accent-rose: #FCE8EB (soft pink)
accent-sage: #E5F0E8 (muted green)
accent-blue: #E8F2F9 (gentle blue)
text-primary: #1A1A1A
text-secondary: #666666
text-tertiary: #AAAAAA
border-light: #E5E5E5
highlight-purple: #7C3AED (soft purple)
highlight-pink: #EC4899 (muted pink)
highlight-green: #10B981 (muted green)
highlight-red: #DC2626 (soft red for errors)
```

**Colors (Dark Mode):**
```
bg-primary: #0F0F0F
bg-secondary: #1A1A1A
accent-lavender: #6B5B95 (muted purple)
accent-rose: #A85A6A (muted rose)
accent-sage: #5A8C69 (muted sage)
accent-blue: #5A8DB8 (muted blue)
text-primary: #F5F5F5
text-secondary: #AAAAAA
text-tertiary: #666666
border-dark: #333333
highlight-purple: #A78BFA (light purple)
highlight-pink: #F472B6 (light pink)
highlight-green: #86EFAC (light green)
highlight-red: #FCA5A5 (light red)
```

**Spacing (8px base unit):**
```
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
3xl: 64px
4xl: 80px
5xl: 96px
```

**Shadows:**
```
subtle: 0 2px 8px rgba(0,0,0,0.04)
elevated: 0 8px 24px rgba(0,0,0,0.08)
focus: 0 0 0 3px rgba(124,58,237,0.1) (soft purple focus ring)
none: 0 0 0 rgba(0,0,0,0)
```

**Border Radius:**
```
sm: 4px
md: 8px
lg: 12px
xl: 16px
full: 9999px (for pills)
```

**Animations (Durations):**
```
fast: 150ms
normal: 200ms
slow: 300ms
verySlow: 400ms
entrance-easing: cubic-bezier(0.23, 1, 0.320, 1) (ease-out)
hover-easing: cubic-bezier(0.4, 0, 0.2, 1) (ease-in-out)
smooth-easing: cubic-bezier(0.25, 0.46, 0.45, 0.94) (smooth)
```

**Backdrop Blur:**
```
subtle: 8px
medium: 10px
strong: 12px
```

**Opacity:**
```
glass-light: 0.7 (for glass backgrounds)
gradient-overlay: 0.1-0.3 (for aurora gradients)
disabled: 0.5
subtle-text: 0.7
```

---

## 11. File Structure

```
wymm/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Landing.tsx
│   │   │   ├── TemplateSelector.tsx
│   │   │   ├── FormBuilder.tsx
│   │   │   ├── TemplateA.tsx
│   │   │   ├── TemplateB.tsx
│   │   │   ├── TemplateC.tsx
│   │   │   ├── TemplateD.tsx
│   │   │   ├── PreviewPane.tsx
│   │   │   └── CursorTrail.tsx
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── styles/
│   │   │   └── globals.css (Aurora gradients, glass morphism utilities)
│   │   └── App.tsx
│   └── vite.config.ts
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── biodata.ts (POST, GET, DELETE)
│   │   │   └── pdf.ts (POST /generate-pdf)
│   │   ├── services/
│   │   │   ├── firebase.ts
│   │   │   ├── puppeteer.ts (PDF generation)
│   │   │   └── slug.ts (unique slug generation)
│   │   └── index.ts
│   └── package.json
├── docs/
│   └── superpowers/specs/
│       └── 2026-06-02-wymm-biodata-design.md (this file)
└── README.md
```

---

## 12. Notes

- **Firebase free tier covers MVP** with reasonable usage assumptions (< 50k daily active users initially)
- **All animations are GPU-accelerated** (transform + opacity only, no paint/layout shifts)
- **Stitch MCP will generate design tokens + component library** before development
- **ui-ux-pro-max-skill search** informed color choices, animation patterns, and glassmorphism implementation
- **Marketing angle:** Position wymm as the "Figma for marriage biodatas" — beautiful, easy, free
