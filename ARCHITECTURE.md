# Portfolio System Architecture

## Overview
Your portfolio system consists of two main pages working together:
1. **InterActiveResume.html** - Main portfolio showcase (read-only, displays projects)
2. **portfolio-editor.html** - Content management system (edit/add/delete projects)

Both pages share the same **localStorage** database for project data.

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    BROWSER LOCAL STORAGE                         │
│                                                                   │
│  localStorage['portfolioProjects'] = [                           │
│    { id: 1, title: "Project 1", heroImage: "base64..." },       │
│    { id: 2, title: "Project 2", galleryImages: [...] },         │
│    ...                                                            │
│  ]                                                                │
│                                                                   │
│  localStorage['portfolioPassword'] (optional)                    │
└─────────────────────────────────────────────────────────────────┘
                              ↑ ↓
                    Shared Data Source
                              
        ┌─────────────────┬───────────────────┐
        │                 │                   │
        ↓                 ↓                   │
┌──────────────────┐  ┌──────────────────────┴─┐
│  portfolio-      │  │InterActiveResume.html  │
│  editor.html     │  │                        │
│  (CMS)           │  │ (Public Portfolio)     │
│                  │  │                        │
│ • Add projects   │  │ • Display projects     │
│ • Edit projects  │  │ • Show project details │
│ • Delete         │  │ • Modal popup for work │
│ • Upload images  │  │ • Image galleries      │
│ • Export/Import  │  │ • External links       │
│ • Backup data    │  │                        │
└──────────────────┘  └────────────────────────┘
        ↓                        ↓
    WRITES                    READS
    TO                        FROM
  STORAGE                     STORAGE
        └────────────────────────┘
```

## File Structure

### Core Files
```
Online Portfolio/
├── InterActiveResume.html (Main portfolio page)
├── portfolio-editor.html (Content management system)
├── scripts.js (Shared functionality)
├── styles.css (Styling)
├── editor-data.js (Data utilities)
└── [Documentation]
    ├── ENHANCEMENT_SUMMARY.md (What's new)
    ├── TESTING_GUIDE.md (How to test)
    ├── EDITOR_ENHANCEMENTS.md (Features)
    └── ARCHITECTURE.md (This file)
```

## Key Functions

### In portfolio-editor.html (CMS)

**Function: openProjectModal()/editProject()**
- Opens the form to add or edit a project
- Takes optional parameter: project index for editing
- Loads existing data if editing
- Displays 3-tab form interface

**Function: saveProject()**
- Collects all form fields from the three tabs
- Validates required fields (title, category, description)
- Converts images to base64
- Creates project object with timestamps
- Stores in localStorage['portfolioProjects']

**Function: renderProjects()**
- Reads all projects from localStorage
- Displays them in a list with category badges
- Shows Edit and Delete buttons
- Updates dashboard statistics

**Function: previewImage() / previewGallery()**
- Convert file uploads to base64
- Display previews in the form
- Store in dataset for later saving

### In scripts.js (Portal)

**Function: loadProjectsFromEditor()**
- Runs on page load
- Checks for stored projects in localStorage
- If projects exist, clears placeholder cards
- Calls createProjectCard() for each project

**Function: createProjectCard(proj, idx)**
- Creates HTML article element for a project
- Uses hero image from editor if available
- Displays status badge (Completed/Ongoing/Academic)
- Stores full project data in element's dataset
- Returns ready-to-append DOM element

**Function: openProjectDetailModal(cardEl)**
- Bridge function for editor-created projects
- Extracts project data from card's dataset
- Passes to openProjectModal()

**Function: openProjectModal(projDataOrCard)**
- Universal modal opener
- Accepts either project data object OR HTML card element
- Populates all modal sections:
  - Challenge/Problem
  - My Role & Responsibilities
  - Tools & Technologies badges
  - Process/Approach
  - Results/Outcomes
  - Image gallery (with lightbox)
  - External links (GitHub, Documentation)
- Implements focus trap for accessibility
- Supports keyboard navigation (Escape, Tab)

## localStorage Structure

### Projects Storage
```javascript
// Key: 'portfolioProjects'
// Value: JSON string of array
[
  {
    id: 1707945600000,                    // Unix timestamp, unique
    createdAt: "2026-02-14T23:20:00Z",    // ISO string
    updatedAt: "2026-02-14T23:20:00Z",    // Last modification
    title: "Pump Reliability Analysis",
    category: "mining",
    status: "completed",                   // or "ongoing" or "academic"
    date: "Oct 2024",
    description: "Analyzed pump failure patterns...",
    challenge: "Pumps were experiencing...",
    role: "Led root cause analysis...",
    tools: ["Python", "Excel", "SolidWorks"],
    process: "Collected data, performed analysis...",
    results: "Reduced downtime by 35%...",
    heroImage: "data:image/jpeg;base64,/9j/4AAQSkZJRg...", // Base64 encoded
    galleryImages: [
      "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
      "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
      ...
    ],
    github: "https://github.com/user/project",
    docLink: "https://docs.example.com"
  },
  // ... more projects
]
```

### Password Storage (Optional)
```javascript
// Key: 'portfolioPassword'
// Value: plain text password (stored insecurely, for demo only)
"myPortfolioPassword123"
```

## Data Flow: Adding a Project

```
User Opens Editor
    ↓
Clicks "+ Add New Project"
    ↓
openProjectModal() called (no parameters = new project)
    ↓
3-tab form displayed
    ↓
User fills out Basic Info, Details, Media & Links tabs
    ↓
User uploads hero image → previewImage() → converts to base64
    ↓
User uploads gallery images → previewGallery() → converts to base64
    ↓
User clicks "Save Project"
    ↓
saveProject() function:
  ├─ Validates required fields
  ├─ Creates project object
  ├─ Adds metadata (id, createdAt, updatedAt)
  ├─ Adds base64 images
  ├─ Reads current projects from localStorage
  ├─ Adds new project to array
  └─ Writes updated array back to localStorage
    ↓
renderProjects() called
    ↓
Project appears in editor list
    ↓
Success message shown to user
    ↓
Modal closes, form resets
```

## Data Flow: Displaying in Portfolio

```
User Opens InterActiveResume.html
    ↓
Page loads, DOMContentLoaded event fires
    ↓
loadProjectsFromEditor() function runs:
  ├─ Gets 'portfolioProjects' from localStorage
  ├─ If projects exist:
  │  ├─ Clears placeholder cards
  │  └─ Loops through projects
  │     └─ createProjectCard() for each project
  │        ├─ Creates article element
  │        ├─ Sets project data in dataset
  │        ├─ Uses hero image if provided
  │        ├─ Shows status badge if set
  │        └─ Adds "View Details" button
  │        └─ appendChild() to projects grid
  ├─ Project cards now visible
  └─ feather.replace() updates icon SVGs
    ↓
User sees projects with images and status badges
    ↓
User clicks "View Details" on a project
    ↓
openProjectDetailModal(cardEl) triggered:
  ├─ Extracts project data from card.dataset.projectData
  ├─ Calls openProjectModal(projData)
    ↓
Modal populates with all project data:
  ├─ Title and status badge
  ├─ Hero image loads
  ├─ Challenge/Problem section
  ├─ Role & Responsibilities
  ├─ Tools badges
  ├─ Process/Approach
  ├─ Results/Outcomes
  ├─ Gallery images (clickable for lightbox)
  └─ External links (GitHub, Documentation)
    ↓
User reads full project details
```

## Data Flow: Editing a Project

```
Editor: User clicks "Edit" on a project
    ↓
editProject(index) called
    ↓
openProjectModal(index) called with index parameter
    ↓
Form loads with existing project data:
  ├─ All fields pre-populated
  ├─ Images previewed
  ├─ currentEditIndex = index (stored)
    ↓
User modifies fields
    ↓
User uploads new images (replaces old ones in preview)
    ↓
User clicks "Save Project"
    ↓
saveProject() detects currentEditIndex >= 0 (edit mode)
    ↓
Instead of pushing new project:
  ├─ Reads project at index
  ├─ Merges updated fields
  ├─ Updates 'updatedAt' timestamp
  ├─ Replaces old project in array
  └─ Writes back to localStorage
    ↓
renderProjects() refreshes list
    ↓
Project updated both in editor and main portfolio
```

## Data Flow: Backup & Restore

### Export (Download Backup)
```
User clicks "Export Data"
    ↓
exportData() function:
  ├─ Reads 'portfolioProjects' from localStorage
  ├─ Creates wrapper object: { projects: [...], exportedAt: "..." }
  ├─ Converts to JSON string
  ├─ Creates Blob with application/json MIME type
  ├─ Generates filename: portfolio-data-YYYY-MM-DD.json
  ├─ Creates download link
  └─ Triggers browser download
    ↓
User gets JSON file on their computer (backup)
```

### Import (Restore Backup)
```
User clicks "Import Data"
    ↓
File picker opens
    ↓
User selects previously exported JSON file
    ↓
importData() function:
  ├─ Reads file with FileReader API
  ├─ Parses JSON
  ├─ Extracts projects array
  ├─ Writes to localStorage['portfolioProjects']
  ├─ Updates dashboard statistics
  └─ Refreshes project list
    ↓
All projects restored to editor
    ↓
Main portfolio reflects changes on next page refresh
    ↓
Success message shown
```

## Technical Considerations

### localStorage Limits
- Typical limit: 5-10MB per domain
- Varies by browser (IE 10MB, Firefox 10MB, Chrome 10MB)
- Base64 images take ~1.3x the original file size
- Recommendation: Keep total data under 3MB

### Performance
- localStorage is synchronous (blocks execution)
- Large datasets (>100 projects) may cause UI lag
- Image operations (base64 conversion) are fast for <5MB images
- Consider pagination if managing 100+ projects

### Browser Compatibility
- localStorage: Modern browsers (IE8+, but use IE10+ for best support)
- FileReader API: Modern browsers (IE10+)
- Base64 encoding: All modern browsers
- ES6 features used (arrow functions, template literals, destructuring)
- Recommended: Chrome, Firefox, Safari 10+, Edge

### Security Notes
- ⚠️ All data stored unencrypted in localStorage
- ⚠️ Password stored in plain text (for demo purposes)
- ⚠️ Anyone with browser access can read data
- ⚠️ No backend encryption or server-side storage
- Use password protection only for basic obfuscation

### Data Persistence
- Data persists: Across browser sessions, computer restart
- Data lost if: Browser cache cleared, localStorage data deleted, browser uninstalled
- Mitigation: Export JSON regularly for backup

## Integration Points

### How Editor and Portfolio Connect
1. **Shared Data**: Both use localStorage['portfolioProjects']
2. **Independent**: No direct communication between pages
3. **Data Format**: JSON serialization ensures compatibility
4. **Images**: Base64 encoding allows storage in localStorage
5. **Sync**: Changes visible after page refresh
6. **Timestamps**: Track when projects were created/edited

### Extending the System
To add new features:

1. **Add new project fields**: 
   - Add form input in portfolio-editor.html
   - Update saveProject() to collect new field
   - Update project object structure

2. **Display new fields in portfolio**:
   - Update createProjectCard() for card display
   - Update openProjectModal() for detail modal

3. **Add new sections** (Skills, Certifications):
   - Create new editor form in portfolio-editor.html
   - Create new data structure in localStorage
   - Create display functions in scripts.js

## Future Enhancements
- Backend database for cloud sync
- User authentication for shared portfolios
- Tags and filtering system
- Project sorting and search
- Comments and notes on projects
- Version history and undo/redo
- Collaborative editing
- Mobile app with sync
- API for third-party integrations

---

This architecture provides a simple, effective system for managing your portfolio entirely in the browser without needing a backend server.
