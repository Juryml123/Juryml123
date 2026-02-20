# Quick Testing Guide

## What's New
Your portfolio editor now has a **comprehensive project form** with 3 tabs:
- **Basic Info** - Title, Category, Status, Date, Description
- **Details** - Challenge, Role, Tools, Process, Results  
- **Media & Links** - Hero image, Gallery (4 images), GitHub link, Documentation link

## Step-by-Step Test

### 1. Open the Editor
- Open `portfolio-editor.html` in your browser
- You should see the CMS interface with a sidebar navigation

### 2. Add a Test Project
- Click **"Projects"** in the sidebar
- Click **"+ Add New Project"** button
- Fill in the **Basic Info** tab:
  - Title: "Pump Reliability Analysis"
  - Category: "Mining"
  - Status: "Completed"
  - Date: "Oct 2024"
  - Description: "Analyzed pump failure patterns in copper extraction systems, identifying critical maintenance intervals."

### 3. Add Project Details
- Click the **"Details"** tab
- Challenge: "Mining pumps were experiencing unexpected failures, causing production downtime."
- Role: "Led root cause analysis of pump failures and recommended preventive maintenance schedule"
- Tools: "Python, Excel, SolidWorks, MATLAB"
- Process: "Collected failure data, performed statistical analysis, created CAD models of components"
- Results: "Reduced unplanned downtime by 35%, implemented new maintenance schedule"

### 4. Add Media & Links
- Click the **"Media & Links"** tab
- **Hero Image**: Upload any image from your computer (or use a placeholder)
- **Gallery Images**: Upload 1-4 additional images
- **GitHub Link**: (optional) https://github.com/
- **Documentation Link**: (optional) https://example.com/docs
- Click **"Save Project"**

### 5. Verify in Projects List
- You should see your new project in the projects list below
- It shows: Title, Category badge, Description, Date, Tools, Edit/Delete buttons

### 6. View in Main Portfolio
- Click **"Preview"** in the sidebar
- You'll see an iframe of your main portfolio
- Refresh the preview (or open `InterActiveResume.html` in a new tab)
- Scroll to Projects section
- Your test project should appear with:
  - Hero image in the card
  - Title, Description, Tools
  - "View Details" button
  - Status badge (if set)

### 7. Click "View Details" 
- The project modal should open showing:
  - Title and Status badge
  - Hero image
  - Challenge/Problem section
  - My Role & Responsibilities
  - Tools & Technologies badges
  - Process/Approach
  - Results/Outcomes
  - Image Gallery (with your uploaded images)
  - Links section (GitHub & Documentation if provided)

### 8. Edit the Project
- Back in the editor, click **"Edit"** on your test project
- Modify some details (e.g., change the date)
- Click **"Save Project"**
- The project list updates immediately

### 9. Delete the Project (Optional)
- Click **"Delete"** on the test project
- Click **"OK"** in the confirmation dialog
- The project disappears from the list

### 10. Export Your Data
- In the sidebar, click **"Export Data"**
- A JSON file downloads (named `portfolio-data-YYYY-MM-DD.json`)
- This is your backup file with all project data

## Troubleshooting

**Images not showing?**
- Make sure you selected actual image files
- Browser localStorage has size limits (~5MB)
- Try with smaller image files first

**Project not appearing in main portfolio?**
- Make sure to refresh/reload `InterActiveResume.html`
- Check that localStorage is enabled in your browser
- Open browser DevTools (F12) → Application → Local Storage to verify data is saved

**Form tabs not switching?**
- Check browser console for JavaScript errors (F12 → Console)
- Make sure JavaScript is enabled

**Unable to upload images?**
- Check file size (use images under 500KB)
- Try a different image format (JPG, PNG)
- Verify localStorage isn't full

## What Data is Saved?
- All text fields and metadata
- Images are converted to base64 and stored in localStorage
- Timestamps for when the project was created/updated
- Project ID (for tracking edits)

## What to Do Next
1. ✅ Test with the sample project above
2. 📸 Add your real projects with actual images and content
3. 🔗 Add GitHub and documentation links
4. 💾 Export your data for backup
5. 🌐 Refresh main portfolio to see your projects live
6. 📱 Test on mobile to ensure responsive design

## Notes
- All data is stored locally in your browser
- Your data persists until you clear browser cache
- Always keep a JSON export for backup
- You can edit projects anytime and see changes on next refresh
