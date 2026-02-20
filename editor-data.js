/**
 * Portfolio Editor Data Management
 * Handles localStorage sync, data persistence, and integration with main portfolio
 */

// Initialize editor on load and sync with main portfolio
document.addEventListener('DOMContentLoaded', function() {
    initializeEditor();
});

function initializeEditor() {
    // Check for password protection
    const savedPassword = localStorage.getItem('portfolioPassword');
    if(savedPassword) {
        const enteredPassword = prompt('This editor is password protected. Enter password:');
        if(enteredPassword !== savedPassword) {
            alert('Incorrect password!');
            window.location.href = 'index.html';
            return;
        }
    }

    // Sync data with main portfolio
    syncWithMainPortfolio();
}

/**
 * Synchronizes editor data with the main portfolio HTML
 * This ensures changes in the editor update the main portfolio in real-time
 */
function syncWithMainPortfolio() {
    const projects = JSON.parse(localStorage.getItem('portfolioProjects') || '[]');
    
    // Build and update project grid in main portfolio
    const projectsGrid = document.getElementById('projects-grid');
    if(projectsGrid) {
        // Clear existing placeholder cards
        projectsGrid.innerHTML = '';
        
        // Add projects from localStorage
        projects.forEach((proj, idx) => {
            const card = createProjectCard(proj, idx);
            projectsGrid.appendChild(card);
        });
    }
}

/**
 * Creates a project card element matching the portfolio's card structure
 */
function createProjectCard(proj, idx) {
    const article = document.createElement('article');
    article.className = 'project-card shadow-md p-0';
    article.setAttribute('data-category', proj.category);
    article.setAttribute('aria-labelledby', `proj-${proj.category}-${idx}`);
    
    const heroImg = proj.image || `/assets/placeholder-${proj.category}-${idx+1}.jpg`;
    const toolsBadges = proj.tools.map(t => `
        <span class="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">${t}</span>
    `).join('');
    
    article.innerHTML = `
        <div class="skeleton">
            <img data-src="${heroImg}" alt="${proj.title} project image" class="card-img" loading="lazy">
        </div>
        <div class="p-6">
            <h3 id="proj-${proj.category}-${idx}" class="text-xl font-bold text-gray-800 mb-2">${proj.title}</h3>
            <p class="text-gray-600 mb-4">${proj.description}</p>
            <div class="flex flex-wrap gap-2 mb-4">
                ${toolsBadges}
            </div>
            <div class="flex items-center justify-between">
                <small class="text-sm text-gray-500">${proj.date}</small>
                <button class="text-blue-600 font-medium view-details" data-id="${proj.id}">
                    View Details <i data-feather="arrow-right" class="ml-2 w-4 h-4"></i>
                </button>
            </div>
        </div>
    `;
    
    return article;
}

/**
 * Export portfolio data to JSON file
 * User can download this for backup or migration
 */
function exportPortfolioData() {
    const data = {
        projects: JSON.parse(localStorage.getItem('portfolioProjects') || '[]'),
        skills: JSON.parse(localStorage.getItem('portfolioSkills') || '[]'),
        experience: JSON.parse(localStorage.getItem('portfolioExperience') || '[]'),
        certifications: JSON.parse(localStorage.getItem('portfolioCertifications') || '[]'),
        metadata: {
            exportedAt: new Date().toISOString(),
            exportedFrom: 'Portfolio Editor CMS'
        }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

/**
 * Import portfolio data from JSON file
 */
function importPortfolioData(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            
            // Restore all data from JSON
            if(data.projects) localStorage.setItem('portfolioProjects', JSON.stringify(data.projects));
            if(data.skills) localStorage.setItem('portfolioSkills', JSON.stringify(data.skills));
            if(data.experience) localStorage.setItem('portfolioExperience', JSON.stringify(data.experience));
            if(data.certifications) localStorage.setItem('portfolioCertifications', JSON.stringify(data.certifications));
            
            console.log('Portfolio data imported successfully');
            syncWithMainPortfolio();
            
            // Notify user to refresh main portfolio
            alert('Data imported! Refresh your main portfolio page to see changes.');
        } catch(err) {
            console.error('Error importing data:', err);
            alert('Error: Invalid portfolio backup file');
        }
    };
    reader.readAsText(file);
}

/**
 * Get all projects grouped by category
 */
function getProjectsByCategory(category) {
    const projects = JSON.parse(localStorage.getItem('portfolioProjects') || '[]');
    if(category === 'all') return projects;
    return projects.filter(p => p.category === category);
}

/**
 * Add a new project to localStorage
 */
function addProject(projectData) {
    const projects = JSON.parse(localStorage.getItem('portfolioProjects') || '[]');
    const newProject = {
        ...projectData,
        id: Date.now(),
        createdAt: new Date().toISOString()
    };
    projects.push(newProject);
    localStorage.setItem('portfolioProjects', JSON.stringify(projects));
    syncWithMainPortfolio();
    return newProject;
}

/**
 * Update an existing project
 */
function updateProject(projectId, updatedData) {
    const projects = JSON.parse(localStorage.getItem('portfolioProjects') || '[]');
    const idx = projects.findIndex(p => p.id === projectId);
    if(idx >= 0) {
        projects[idx] = { ...projects[idx], ...updatedData, updatedAt: new Date().toISOString() };
        localStorage.setItem('portfolioProjects', JSON.stringify(projects));
        syncWithMainPortfolio();
        return true;
    }
    return false;
}

/**
 * Delete a project
 */
function deleteProject(projectId) {
    const projects = JSON.parse(localStorage.getItem('portfolioProjects') || '[]');
    const filtered = projects.filter(p => p.id !== projectId);
    localStorage.setItem('portfolioProjects', JSON.stringify(filtered));
    syncWithMainPortfolio();
}

/**
 * Get statistics for dashboard
 */
function getPortfolioStats() {
    const projects = JSON.parse(localStorage.getItem('portfolioProjects') || '[]');
    const skills = JSON.parse(localStorage.getItem('portfolioSkills') || '[]');
    const experience = JSON.parse(localStorage.getItem('portfolioExperience') || '[]');
    const certs = JSON.parse(localStorage.getItem('portfolioCertifications') || '[]');
    
    return {
        totalProjects: projects.length,
        miningProjects: projects.filter(p => p.category === 'mining').length,
        petroProjects: projects.filter(p => p.category === 'petrochemical').length,
        shipProjects: projects.filter(p => p.category === 'shipbuilding').length,
        academicProjects: projects.filter(p => p.category === 'academic').length,
        totalSkills: skills.length,
        totalExperience: experience.length,
        totalCertifications: certs.length
    };
}

/**
 * Clear all editor data (with confirmation)
 */
function clearEditorData() {
    if(confirm('⚠️ This will permanently delete ALL portfolio data. Are you sure?')) {
        localStorage.removeItem('portfolioProjects');
        localStorage.removeItem('portfolioSkills');
        localStorage.removeItem('portfolioExperience');
        localStorage.removeItem('portfolioCertifications');
        console.log('All data cleared');
        syncWithMainPortfolio();
        return true;
    }
    return false;
}

/**
 * Utility: Convert project object to downloadable CSV
 * Useful for backup or external reporting
 */
function exportProjectsAsCSV() {
    const projects = JSON.parse(localStorage.getItem('portfolioProjects') || '[]');
    if(projects.length === 0) {
        alert('No projects to export');
        return;
    }
    
    // Build CSV header
    let csv = 'Title,Category,Description,Date,Tools\n';
    
    // Build CSV rows
    projects.forEach(p => {
        const title = `"${p.title}"`;
        const category = p.category;
        const desc = `"${p.description}"`;
        const date = p.date;
        const tools = `"${p.tools.join(', ')}"`;
        csv += `${title},${category},${desc},${date},${tools}\n`;
    });
    
    // Download CSV
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-projects-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
}

/**
 * Auto-save indicator
 * Debounced save function to prevent excessive localStorage writes
 */
const autoSaveDebounce = (() => {
    let timeout;
    return (callback) => {
        clearTimeout(timeout);
        timeout = setTimeout(callback, 500);
    };
})();

/**
 * Initialize projects data from main portfolio into editor
 * This populates the editor with existing project entries from InterActiveResume.html
 */
function initializeProjectsData() {
    const existingProjects = JSON.parse(localStorage.getItem('portfolioProjects') || '[]');
    
    // Only initialize if there's no existing data
    if(existingProjects.length > 0) {
        console.log('Projects data already exists, skipping initialization');
        return; // Data already exists, skip initialization
    }
    
    // Projects data extracted from InterActiveResume.html
    const projectsData = [
        {
            id: 'mining-pump-reliability',
            title: 'Pump Reliability Analysis',
            category: 'mining',
            status: 'completed',
            date: 'Oct 2024',
            description: 'Analysis and optimization of pump performance in mining operations',
            challenge: 'Equipment reliability issues causing operational downtime and maintenance costs in mining operations',
            role: 'Lead analysis on pump condition monitoring and predictive maintenance systems',
            tools: ['Python', 'Condition Monitoring', 'Data Analysis'],
            process: 'Implemented condition monitoring system using vibration analysis and performance metrics to identify failure patterns before equipment breakdown',
            results: 'Reduced unplanned downtime by optimizing maintenance schedules based on data insights',
            heroImage: '',
            galleryImages: [],
            github: '',
            docLink: '',
            createdAt: new Date().toISOString()
        },
        {
            id: 'mining-equipment-maintenance',
            title: 'Ball Mill & Pipeline Maintenance System',
            category: 'mining',
            status: 'completed',
            date: '2024',
            description: 'Comprehensive maintenance strategy for critical equipment including pumps, pipelines, and ball mills',
            challenge: 'Managing maintenance for multiple critical equipment types to maintain operational continuity',
            role: 'Equipment maintenance specialist responsible for pumps, pipelines, and ball mills',
            tools: ['Pumps', 'Reliability Engineering', 'Maintenance Planning'],
            process: 'Developed integrated maintenance planning approach combining preventive and condition-based strategies',
            results: 'Improved equipment lifecycle management and extended operational lifetime',
            heroImage: '',
            galleryImages: [],
            github: '',
            docLink: '',
            createdAt: new Date().toISOString()
        },
        {
            id: 'petro-smartplant-modeling',
            title: '3D Plant Modeling & Digital Twin',
            category: 'petrochemical',
            status: 'completed',
            date: 'Feb 2024',
            description: 'Development of 3D petrochemical plant models using SmartPlant 3D for engineering documentation and simulation',
            challenge: 'Creating accurate digital representations of complex petrochemical plant infrastructure for design and operational reference',
            role: 'Junior engineer responsible for 3D modeling and digital twin development',
            tools: ['SmartPlant 3D', 'CAD', 'Digital Twin', '3D Modelling'],
            process: 'Utilized SmartPlant 3D to create detailed 3D models capturing equipment layout, piping, and instrumentation',
            results: 'Delivered comprehensive plant documentation enabling improved design collaboration and operation planning',
            heroImage: '',
            galleryImages: [],
            github: '',
            docLink: '',
            createdAt: new Date().toISOString()
        },
        {
            id: 'ship-bulk-carrier-construction',
            title: 'Bulk Carrier Construction & Technical Documentation',
            category: 'shipbuilding',
            status: 'completed',
            date: 'Jul 2023',
            description: 'On-the-job training observing bulk carrier construction and learning shipbuilding processes and techniques',
            challenge: 'Understanding complex shipbuilding construction techniques and specialized equipment operations',
            role: 'OJT participant observing bulk carrier construction and technical documentation',
            tools: ['Technical Drawings', 'CAD Interpretation', 'Construction Techniques'],
            process: 'Participated in bulk carrier construction observing hull fabrication, equipment installation, and specialized machinery (FCB machines, ship benders)',
            results: 'Gained practical knowledge of shipbuilding processes and specialized engineering applications',
            heroImage: '',
            galleryImages: [],
            github: '',
            docLink: '',
            createdAt: new Date().toISOString()
        },
        {
            id: 'acad-coconut-dehusking-machine',
            title: 'Coconut Dehusking Machine (Thesis)',
            category: 'academic',
            status: 'completed',
            date: 'Thesis',
            description: 'University thesis project designing and fabricating an automated coconut dehusking machine',
            challenge: 'Engineer an efficient mechanical solution for coconut processing while considering manufacturability and safety',
            role: 'Primary thesis researcher and designer responsible for mechanical design, analysis, and fabrication',
            tools: ['SolidWorks', 'FEA', 'CAD', 'Fabrication'],
            process: 'Performed comprehensive CAD design using SolidWorks, conducted FEA for structural analysis, and oversaw fabrication of working prototype',
            results: 'Successfully completed and fabricated thesis project demonstrating mechanical engineering design workflow from concept through prototype',
            heroImage: '',
            galleryImages: [],
            github: '',
            docLink: '',
            createdAt: new Date().toISOString()
        }
    ];
    
    // Save to localStorage
    localStorage.setItem('portfolioProjects', JSON.stringify(projectsData));
    console.log('Projects data initialized:', projectsData.length + ' projects loaded');
}

/**
 * Initialize experience data from main portfolio into editor
 * This populates the editor with existing experience entries from InterActiveResume.html
 */
function initializeExperienceData() {
    const existingExperience = JSON.parse(localStorage.getItem('portfolioExperience') || '[]');
    
    // Only initialize if there's no existing data
    if(existingExperience.length > 0) {
        console.log('Experience data already exists, skipping initialization');
        return; // Data already exists, skip initialization
    }
    
    // Experience data extracted from InterActiveResume.html
    const experienceData = [
        {
            company: 'Carmen Copper Corporation',
            jobTitle: 'Cadet Mechanical Engineer',
            industry: 'mining',
            type: 'full-time',
            startDate: 'Oct 2024',
            endDate: 'Present',
            responsibilities: [
                'Equipment maintenance: pumps, pipelines, ball mills',
                'Condition monitoring and performance analysis',
                'Data-driven maintenance planning (Python / Excel)'
            ],
            technologies: ['Python', 'Excel', 'Condition Monitoring'],
            achievements: '',
            companyLogo: '',
            createdAt: new Date().toISOString()
        },
        {
            company: 'TecSurge',
            jobTitle: 'Intern Solutions Engineer',
            industry: 'petrochemical',
            type: 'internship',
            startDate: 'Feb 2024',
            endDate: 'May 2024',
            responsibilities: [
                '3D modelling using SmartPlant 3D',
                'Digital twin development',
                'Plant engineering documentation'
            ],
            technologies: ['SmartPlant 3D', 'Digital Twin', '3D Modelling', 'CAD'],
            achievements: '',
            companyLogo: '',
            createdAt: new Date().toISOString()
        },
        {
            company: 'Tsuneishi Heavy Industries',
            jobTitle: 'On-the-Job Training (OJT)',
            industry: 'shipbuilding',
            type: 'internship',
            startDate: 'Jul 2023',
            endDate: 'Sep 2023',
            responsibilities: [
                'Bulk carrier construction observation',
                'Technical drawing interpretation',
                'Exposure to specialized equipment (FCB machines, ship benders)'
            ],
            technologies: ['Technical Drawings', 'CAD Interpretation', 'Construction'],
            achievements: '',
            companyLogo: '',
            createdAt: new Date().toISOString()
        },
        {
            company: 'University',
            jobTitle: 'Academic Projects & Thesis',
            industry: 'academic',
            type: 'other',
            startDate: '2019',
            endDate: '2023',
            responsibilities: [
                'Coconut Dehusking Machine (Thesis) — SolidWorks, FEA, Fabrication',
                'Fingerprint Door Locking System — Senior High Capstone (Arduino-based)',
                'Andresians\' Perceived Level of Security — Research study (Senior High)',
                'Python data analysis projects (certifications)'
            ],
            technologies: ['SolidWorks', 'FEA', 'Arduino', 'Python', 'Research'],
            achievements: 'Completed thesis project with fabrication',
            companyLogo: '',
            createdAt: new Date().toISOString()
        }
    ];
    
    // Save to localStorage
    localStorage.setItem('portfolioExperience', JSON.stringify(experienceData));
    console.log('Experience data initialized:', experienceData.length + ' entries loaded');
}

/**
 * Initialize skills data from main portfolio into editor
 * This populates the editor with existing skills from InterActiveResume.html
 */
function initializeSkillsData() {
    const existingSkills = JSON.parse(localStorage.getItem('portfolioSkills') || '[]');
    
    // Only initialize if there's no existing data
    if(existingSkills.length > 0) {
        console.log('Skills data already exists, skipping initialization');
        return; // Data already exists, skip initialization
    }
    
    // Skills data extracted from InterActiveResume.html
    const skillsData = [
        // Mechanical Engineering Software
        {
            name: 'SolidWorks',
            category: 'mechanical-software',
            proficiency: 90,
            icon: '📐',
            createdAt: new Date().toISOString()
        },
        {
            name: 'AutoCAD',
            category: 'mechanical-software',
            proficiency: 88,
            icon: '📏',
            createdAt: new Date().toISOString()
        },
        {
            name: 'SmartPlant 3D',
            category: 'mechanical-software',
            proficiency: 75,
            icon: '🏗️',
            createdAt: new Date().toISOString()
        },
        {
            name: 'FEA (Ansys)',
            category: 'mechanical-software',
            proficiency: 70,
            icon: '⚙️',
            createdAt: new Date().toISOString()
        },
        // Maintenance & Operations
        {
            name: 'Pumps / Pipelines / Ball Mills',
            category: 'maintenance-ops',
            proficiency: 92,
            icon: '🔧',
            createdAt: new Date().toISOString()
        },
        {
            name: 'Condition Monitoring',
            category: 'maintenance-ops',
            proficiency: 88,
            icon: '📊',
            createdAt: new Date().toISOString()
        },
        // Programming & Data Analysis
        {
            name: 'Python / Data Analysis',
            category: 'programming',
            proficiency: 85,
            icon: '🐍',
            createdAt: new Date().toISOString()
        },
        {
            name: 'Excel (Advanced)',
            category: 'programming',
            proficiency: 90,
            icon: '📈',
            createdAt: new Date().toISOString()
        }
    ];
    
    // Save to localStorage
    localStorage.setItem('portfolioSkills', JSON.stringify(skillsData));
    console.log('Skills data initialized:', skillsData.length + ' skills loaded');
}

/**
 * Initialize bio/about data
 * This extracts existing bio data from InterActiveResume.html
 */
function initializeBioData() {
    const existingBio = JSON.parse(localStorage.getItem('portfolioBio') || '{}');
    
    // Only initialize if there's no existing data
    if(Object.keys(existingBio).length > 0) {
        console.log('Bio data already exists, skipping initialization');
        return;
    }
    
    // Bio data extracted from InterActiveResume.html
    const bioData = {
        headline: 'Licensed Mechanical Engineer | Mining × Shipbuilding × Petrochemical',
        short: 'I currently work as a Cadet Mechanical Engineer at Carmen Copper Corporation (Oct 2024 – Present), focusing on equipment maintenance and reliability for mining operations. My core responsibilities include condition monitoring, performance analysis, and data-driven maintenance planning using Python and Excel.',
        full: `Licensed Mechanical Engineer with cross-industry experience in mining, Petrochem Plant Digital Twin/3D Modelling, and shipbuilding. I currently work as a Cadet Mechanical Engineer at Carmen Copper Corporation (Oct 2024 – Present), focusing on equipment maintenance and reliability for mining operations. My core responsibilities include condition monitoring, performance analysis, and data-driven maintenance planning using Python and Excel.

Previously, I worked as an Intern Solutions Engineer at TecSurge (Petrochemical) where I contributed to 3D modelling with SmartPlant 3D and digital twin efforts, and I completed an OJT at Tsuneishi Heavy Industries (Shipbuilding) where I gained hands-on exposure to large-scale fabrication and technical drawing interpretation.

My academic work includes a thesis project on a Coconut Dehusking Machine (SolidWorks CAD, FEA, fabrication) and various Python data analysis projects. I build practical engineering solutions with a focus on reliability, manufacturability, and data-backed decisions.

Education: BS Mechanical Engineering, 2024 — Cebu Technological University (Main Campus)`,
        email: 'your.email@example.com',
        phone: '',
        location: 'Cebu, Philippines',
        linkedin: 'https://linkedin.com/in/yourprofile',
        github: '',
        photo: '',
        resumeName: '',
        resumeSize: 0,
        resumeData: null,
        updatedAt: new Date().toISOString()
    };
    
    // Save to localStorage
    localStorage.setItem('portfolioBio', JSON.stringify(bioData));
    console.log('Bio data initialized');
}

// Initialize all data immediately and on DOMContentLoaded
if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initializeProjectsData();
        initializeExperienceData();
        initializeSkillsData();
        initializeBioData();
    });
} else {
    // DOM is already loaded
    initializeProjectsData();
    initializeExperienceData();
    initializeSkillsData();
    initializeBioData();
}

// Export functions for external use
window.portfolioEditor = {
    getStats: getPortfolioStats,
    addProject,
    updateProject,
    deleteProject,
    getProjectsByCategory,
    exportData: exportPortfolioData,
    importData: importPortfolioData,
    clearData: clearEditorData,
    exportCSV: exportProjectsAsCSV,
    sync: syncWithMainPortfolio,
    initExperience: initializeExperienceData,
    initBio: initializeBioData,
    initProjects: initializeProjectsData,
    initSkills: initializeSkillsData
};
