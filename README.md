# Jhoremil C. Cabrillos — Portfolio

A clean, minimal, and fully maintainable portfolio website built with **vanilla HTML, CSS, and JavaScript** — no frameworks, no build tools, no dependencies.

---

## 📁 File Structure

```
portfolio/
├── index.html              ← Home page
├── mechanical.html         ← Mechanical Engineering projects
├── software.html           ← Software / Programming projects
├── academic.html           ← Academic projects + certificates
├── project-detail.html     ← Template for individual project pages
├── css/
│   └── styles.css          ← All styles (one file, well-organized)
├── js/
│   ├── script.js           ← Navigation, animations, gallery
│   └── projects.js         ← ALL project data + detail renderer
└── assets/
    ├── images/             ← Put all your images here
    │   └── profile.jpg     ← Your profile photo (replace placeholder)
    └── project-files/      ← PDFs, docs, etc. for download links
```

---

## 🚀 How to Run Locally

Just open `index.html` in any browser. No server required.

---

## ➕ How to Add a New Project

### Step 1 — Add to `js/projects.js`

Open `projects.js` and copy one of the existing project objects in the `PROJECTS` array.
Update these fields:

```javascript
{
  id: 'my-new-project',           // unique URL-safe ID (no spaces)
  category: 'mechanical',         // 'mechanical' | 'software' | 'academic'
  categoryLabel: 'Mechanical Engineering',
  badgeClass: 'badge-mech',       // 'badge-mech' | 'badge-soft' | 'badge-acad'
  backHref: 'mechanical.html',    // which page to return to
  title: 'My New Project',
  subtitle: 'Short one-line description',
  description: `Full description HTML here. You can use <br> tags.`,
  responsibilities: [
    'First thing I did',
    'Second thing I did',
  ],
  technologies: ['Python', 'Flask'],
  meta: {
    'Category': 'Engineering',
    'Role': 'Lead Engineer',
    'Status': 'Completed',
  },
  images: [
    'assets/images/my-project-1.jpg',
    'assets/images/my-project-2.jpg',
  ],
  files: [
    { label: 'Download Report', href: 'assets/project-files/my-report.pdf' }
  ],
},
```

### Step 2 — Add a card to the right HTML page

In `mechanical.html`, `software.html`, or `academic.html`, copy an existing `<article class="project-card">` block and update:
- `data-category` — for filter buttons
- `href` in the card link — use `?id=my-new-project`
- title, description, tags

### Step 3 — Add your images

Drop images in `assets/images/` and reference them in the `images` array in `projects.js`.

---

## 🖼️ Adding Your Profile Photo

Replace the placeholder in the About section of `index.html`:

1. Add your photo at `assets/images/profile.jpg`
2. In `index.html`, find the `.about-photo-placeholder` div
3. Replace it with: `<img src="assets/images/profile.jpg" alt="Jhoremil Cabrillos" />`

---

## 🎨 Customizing the Design

All design tokens (colors, fonts, spacing) are CSS variables at the top of `css/styles.css`:

```css
:root {
  --accent: #e8a045;     /* ← Change this to change the main color */
  --bg: #0d0f14;         /* ← Main background */
  --text: #e8eaf0;       /* ← Main text color */
  /* ... etc */
}
```

---

## 📜 Certificates

Add new certificates in `academic.html` by copying a `.cert-card` block and updating the name and issuer.

---

## 🔗 Adding Links to Real Documents

In `projects.js`, use the `files` array:

```javascript
files: [
  { label: 'Download PDF', href: 'assets/project-files/my-doc.pdf' },
  { label: 'View on GitHub', href: 'https://github.com/your-repo' },
],
```

External links will open in a new tab automatically.

---

Built by Jhoremil C. Cabrillos | 2025
