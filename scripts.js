// Extracted scripts from InterActiveResume.html
// Initialize animations
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Mobile menu toggle
document.getElementById('menu-btn').addEventListener('click', function() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});

// Close mobile menu when clicking a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', function() {
        document.getElementById('mobile-menu').classList.add('hidden');
    });
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-bar');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0';
            setTimeout(() => {
                entry.target.style.width = width;
            }, 100);
        }
    });
}, {threshold: 0.5});

skillBars.forEach(bar => {
    observer.observe(bar);
});

// Vanta.js background
VANTA.GLOBE({
    el: "#vanta-bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x3b82f6,
    backgroundColor: 0x1e3a8a,
    size: 0.8
});

// Replace Feather icons
feather.replace();

// Prefer loading content from a committed JSON file (GitHub Pages-friendly)
// If present, it hydrates localStorage so the existing renderers work unchanged.
window.__portfolioDataReady = (async function(){
    try {
        const res = await fetch('data/portfolio-data.json', { cache: 'no-store' });
        if(!res.ok) return;
        const data = await res.json();

        function isEmptyStoredValue(raw){
            if(raw == null) return true;
            if(raw === '') return true;
            if(raw === '[]') return true;
            if(raw === '{}') return true;
            return false;
        }

        function hydrateIfEmpty(key, value){
            const existing = localStorage.getItem(key);
            if(!isEmptyStoredValue(existing)) return;
            if(value == null) return;
            localStorage.setItem(key, JSON.stringify(value));
        }

        if(data && typeof data === 'object') {
            hydrateIfEmpty('portfolioBio', data.bio);
            hydrateIfEmpty('portfolioProjects', data.projects);
            hydrateIfEmpty('portfolioSkills', data.skills);
            hydrateIfEmpty('portfolioExperience', data.experience);
            hydrateIfEmpty('portfolioCertifications', data.certifications);
            hydrateIfEmpty('portfolioMedia', data.media);
        }
    } catch (e) {
        // If the JSON doesn't exist yet or can't be parsed, fall back to existing localStorage.
    }
})();

function withPortfolioDataReady(fn){
    const p = window.__portfolioDataReady;
    if(p && typeof p.then === 'function') {
        p.then(() => fn()).catch(() => fn());
    } else {
        fn();
    }
}

// Load projects from editor (localStorage) if available
(function(){
    function loadProjectsFromEditor(){
        const grid = document.getElementById('projects-grid');
        if(!grid) return;

        const editorProjects = JSON.parse(localStorage.getItem('portfolioProjects') || '[]');
        
        // If editor has projects, use them; otherwise keep placeholder cards
        if(editorProjects.length > 0){
            // Clear placeholders
            grid.innerHTML = '';
            
            // Add projects from editor
            editorProjects.forEach((proj, idx) => {
                const card = createProjectCard(proj, idx);
                grid.appendChild(card);
            });
        }
    }

    function createProjectCard(proj, idx){
        const article = document.createElement('article');
        article.className = 'project-card shadow-md p-0';
        article.setAttribute('data-category', proj.category);
        article.setAttribute('data-projectid', proj.id);
        article.setAttribute('aria-labelledby', 'proj-title-' + proj.id);

        // Use hero image from editor if available, otherwise fallback to placeholder
        const heroImg = proj.heroImage || '/assets/placeholder-' + proj.category + '-' + (idx+1) + '.jpg';
        
        // Build tools badges
        const toolsBadges = (proj.tools || []).map(t => {
            return '<span class="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">' + t + '</span>';
        }).join('');

        // Build status badge if available
        const statusBadge = proj.status ? '<span class="inline-block text-xs font-semibold px-2 py-1 rounded ' + 
            (proj.status === 'completed' ? 'bg-green-100 text-green-800' : 
             proj.status === 'ongoing' ? 'bg-yellow-100 text-yellow-800' : 
             'bg-blue-100 text-blue-800') + '">' + proj.status.charAt(0).toUpperCase() + proj.status.slice(1) + '</span>' : '';

        // Build card HTML
        const cardHTML = '<div class="skeleton">' +
            '<img data-src="' + heroImg + '" alt="' + proj.title + ' project image" class="card-img" loading="lazy">' +
            '</div>' +
            '<div class="p-6">' +
            '<div class="flex items-start justify-between mb-2">' +
            '<h3 id="proj-title-' + proj.id + '" class="text-xl font-bold text-gray-800 flex-1">' + proj.title + '</h3>' +
            (statusBadge ? '<div class="ml-2">' + statusBadge + '</div>' : '') +
            '</div>' +
            '<p class="text-gray-600 mb-4 text-sm line-clamp-2">' + proj.description + '</p>' +
            (toolsBadges ? '<div class="flex flex-wrap gap-2 mb-4">' + toolsBadges + '</div>' : '') +
            '<div class="flex items-center justify-between">' +
            '<small class="text-sm text-gray-500">' + (proj.date || 'N/A') + '</small>' +
            '<button class="text-blue-600 font-medium view-details" data-id="' + proj.id + '" onclick="openProjectDetailModal(this.closest(\'article\'))">' +
            'View Details <i data-feather="arrow-right" class="ml-2 w-4 h-4" style="display: inline-block; vertical-align: middle;"></i>' +
            '</button>' +
            '</div>' +
            '</div>';

        article.innerHTML = cardHTML;
        
        // Store full project data on element for modal use
        article.dataset.projectData = JSON.stringify(proj);
        
        return article;
    }

    // Global function to open project modal from card
    window.openProjectDetailModal = function(cardEl){
        const projData = JSON.parse(cardEl.dataset.projectData);
        openProjectModal(projData);
    };

    document.addEventListener('DOMContentLoaded', () => withPortfolioDataReady(loadProjectsFromEditor));
})();

// Load certifications from editor (localStorage) if available
(function(){
    function loadCertificationsFromEditor(){
        const grid = document.getElementById('cert-grid');
        if(!grid) return;

        const editorCerts = JSON.parse(localStorage.getItem('portfolioCertifications') || '[]');
        
        if(editorCerts.length > 0){
            grid.innerHTML = '';
            editorCerts.forEach((cert) => {
                const card = createCertificationCard(cert);
                grid.appendChild(card);
            });
            // Show certifications section if certifications exist
            const certsSection = document.getElementById('certifications');
            if(certsSection) certsSection.classList.remove('hidden');
        }
    }

    function createCertificationCard(cert){
        const article = document.createElement('div');
        article.className = 'cert-card';
        
        // Build skills badges if available
        const skillsBadges = (cert.skills || []).map(skill => 
            '<span class="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">' + skill + '</span>'
        ).join('');

        article.innerHTML = '<div class="cert-logo">' +
            (cert.badgeImage ? '<img src="' + cert.badgeImage + '" alt="' + cert.name + ' badge" style="max-width: 60px; max-height: 60px; object-fit: contain;">' : '') +
            '</div>' +
            '<div class="cert-body">' +
            '<div class="cert-name">' + cert.name + '</div>' +
            '<div class="cert-meta">' + cert.organization + ' &middot; Issued: ' + cert.issueDate +
            (cert.credentialId ? ' &middot; ID: ' + cert.credentialId : '') + 
            '</div>' +
            (skillsBadges ? '<div style="margin-top: 0.5rem; display: flex; flex-wrap: wrap; gap: 0.5rem;">' + skillsBadges + '</div>' : '') +
            '</div>' +
            (cert.verificationLink ? '<div class="cert-actions"><a href="' + cert.verificationLink + '" target="_blank" rel="noopener noreferrer" class="text-sm text-blue-600 hover:underline">Verify</a></div>' : '') +
            '';
        
        return article;
    }

    document.addEventListener('DOMContentLoaded', () => withPortfolioDataReady(loadCertificationsFromEditor));
})();

// Load experience from editor (localStorage) if available
(function(){
    function loadExperienceFromEditor(){
        const expSection = document.querySelector('#experience-timeline');
        if(!expSection) return;

        const editorExp = JSON.parse(localStorage.getItem('portfolioExperience') || '[]');
        
        if(editorExp.length > 0){
            // Sort by start date (most recent first)
            editorExp.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
            
            // Clear placeholder experience items
            const timeline = expSection.querySelector('.experience-timeline');
            if(timeline) {
                const items = timeline.querySelectorAll('.experience-item');
                items.forEach(item => item.remove());
            }
            
            // Add experience from editor
            editorExp.forEach((exp) => {
                const item = createExperienceItem(exp);
                if(timeline) timeline.appendChild(item);
            });
        }
    }

    function createExperienceItem(exp){
        const article = document.createElement('article');
        article.className = 'experience-item';
        article.setAttribute('data-aos', 'fade-up');
        
        const duration = exp.endDate && exp.endDate !== 'Present' ? 
            exp.startDate + ' - ' + exp.endDate : 
            exp.startDate + ' - ' + (exp.endDate || 'Present');
        
        const responsibilitiesHtml = (exp.responsibilities || []).map(r => '<li>' + r + '</li>').join('');
        const technologiesHtml = (exp.technologies || []).map(t => '<span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">' + t + '</span>').join('');

        article.innerHTML = '<div class="experience-dot"></div>' +
            '<div class="experience-content">' +
            '<div class="flex items-center gap-3 mb-2">' +
            (exp.companyLogo ? '<img src="' + exp.companyLogo + '" alt="' + exp.company + '" style="width: 40px; height: 40px; border-radius: 0.375rem; object-fit: contain;">' : '') +
            '<div>' +
            '<h4 class="font-semibold text-lg">' + exp.jobTitle + '</h4>' +
            '<p class="text-gray-600">' + exp.company + ' • ' + exp.industry.charAt(0).toUpperCase() + exp.industry.slice(1) + '</p>' +
            '</div>' +
            '</div>' +
            '<p class="text-sm text-gray-500 mb-3">' + duration + 
            (exp.type && exp.type !== 'full-time' ? ' • ' + exp.type : '') + '</p>' +
            (responsibilitiesHtml ? '<ul class="list-disc ml-5 text-gray-600 mb-3">' + responsibilitiesHtml + '</ul>' : '') +
            (technologiesHtml ? '<div class="flex flex-wrap gap-2 mb-3">' + technologiesHtml + '</div>' : '') +
            (exp.achievements ? '<p class="text-gray-600 text-sm italic border-l-2 border-blue-600 pl-3">' + exp.achievements + '</p>' : '') +
            '</div>';
        
        return article;
    }

    if(document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => withPortfolioDataReady(loadExperienceFromEditor));
    } else {
        withPortfolioDataReady(loadExperienceFromEditor);
    }
})();

// Load skills from editor (localStorage) if available
(function(){
    function loadSkillsFromEditor(){
        const skillsSection = document.querySelector('#skills');
        if(!skillsSection) return;

        const editorSkills = JSON.parse(localStorage.getItem('portfolioSkills') || '[]');
        
        if(editorSkills.length > 0){
            // Group skills by category
            const categories = {
                'mechanical-software': { name: 'Mechanical Engineering Software', skills: [] },
                'maintenance-ops': { name: 'Maintenance & Operations', skills: [] },
                'programming': { name: 'Programming & Data Analysis', skills: [] },
                'other': { name: 'General / Other', skills: [] }
            };

            editorSkills.forEach(skill => {
                if(categories[skill.category]) {
                    categories[skill.category].skills.push(skill);
                }
            });

            // Update the skills display areas
            let colCount = 0;
            const grids = skillsSection.querySelectorAll('.skills-grid');
            
            // Update existing skill cards and create new ones as needed
            Object.keys(categories).forEach((catKey, catIndex) => {
                const catData = categories[catKey];
                if(catData.skills.length === 0) return;

                // Find or create the grid for this category
                let grid = grids[colCount];
                if(!grid) {
                    // Create a new column div if needed
                    const colDiv = document.createElement('div');
                    colDiv.setAttribute('data-aos', 'fade-right');
                    const h3 = document.createElement('h3');
                    h3.className = 'text-xl font-semibold mb-4';
                    h3.textContent = catData.name;
                    colDiv.appendChild(h3);
                    grid = document.createElement('div');
                    grid.className = 'skills-grid';
                    colDiv.appendChild(grid);
                    skillsSection.querySelector('.grid').appendChild(colDiv);
                }

                // Clear and populate the grid
                grid.innerHTML = '';
                catData.skills.forEach(skill => {
                    const skillCard = document.createElement('div');
                    skillCard.className = 'skill-card';
                    skillCard.innerHTML = `
                        <div class="skill-label">
                            <span>${skill.name}</span>
                            <span>${skill.proficiency}%</span>
                        </div>
                        <div class="skill-track">
                            <div class="skill-progress" data-progress="${skill.proficiency}"></div>
                        </div>
                    `;
                    grid.appendChild(skillCard);
                });
                colCount++;
            });

            // Reinitialize skill animations
            document.querySelectorAll('.skill-progress').forEach(el => {
                const progress = el.parentElement.parentElement;
                const width = el.getAttribute('data-progress');
                el.style.width = width + '%';
            });
        }
    }

    document.addEventListener('DOMContentLoaded', () => withPortfolioDataReady(loadSkillsFromEditor));
})();

// Load bio/about data from editor (localStorage) if available
(function(){
    function loadBioFromEditor(){
        const bioData = JSON.parse(localStorage.getItem('portfolioBio') || '{}');
        
        // If no bio data exists or only headline is missing, don't update (uses defaults)
        if(Object.keys(bioData).length === 0) {
            return;
        }

        // ===== UPDATE HERO SECTION =====
        // Update hero section headline/typing text
        const heroTyping = document.querySelector('.hero-typing');
        if(heroTyping && bioData.headline) {
            heroTyping.textContent = bioData.headline;
        }

        // ===== UPDATE ABOUT SECTION =====
        // Update current role/position h3
        const roleHeading = document.getElementById('bio-current-role');
        if(roleHeading && bioData.headline) {
            roleHeading.textContent = bioData.headline;
        }

        // Update about paragraph 1 (short bio)
        const bioP1 = document.getElementById('bio-paragraph-1');
        if(bioP1 && bioData.short) {
            bioP1.textContent = bioData.short;
        }

        // Update about paragraph 2 (if full bio exists and has multiple parts)
        const bioP2 = document.getElementById('bio-paragraph-2');
        const bioP3 = document.getElementById('bio-paragraph-3');
        if(bioData.full) {
            // Try to split full bio into paragraphs
            const paragraphs = bioData.full.split('\n\n').filter(p => p.trim());
            if(paragraphs.length > 1 && bioP2) {
                bioP2.textContent = paragraphs[1];
            }
            if(paragraphs.length > 2 && bioP3) {
                bioP3.textContent = paragraphs[2];
            }
        }

        // Update profile photo if provided
        const profileImg = document.querySelector('#about .w-48.h-48 img') ||
            document.querySelector('#about img[alt="Professional photo placeholder"]') ||
            document.querySelector('#about img');
        if(profileImg) {
            if(bioData.photo) {
                profileImg.src = bioData.photo;
            } else {
                profileImg.src = '/assets/profile.jpg';
            }
        }

        // ===== UPDATE ABOUT SECTION INFO CARDS =====
        if(bioData.location) {
            const companyCard = document.getElementById('bio-info-company');
            if(companyCard) {
                const span = companyCard.querySelector('span');
                if(span) span.textContent = 'Location: ' + bioData.location;
            }
        }

        // ===== UPDATE CONTACT SECTION =====
        if(bioData.email) {
            const emailElement = document.getElementById('contact-email');
            if(emailElement) emailElement.textContent = bioData.email;
            // Also update mailto links
            const emailLink = document.querySelector('a[href^="mailto:"]');
            if(emailLink) emailLink.href = 'mailto:' + bioData.email;
        }

        if(bioData.phone) {
            const phoneElement = document.getElementById('contact-phone');
            if(phoneElement) phoneElement.textContent = bioData.phone;
            // Also update tel links
            const phoneLink = document.querySelector('a[href^="tel:"]');
            if(phoneLink) phoneLink.href = 'tel:' + bioData.phone;
        }

        if(bioData.location) {
            const locationElement = document.getElementById('contact-location');
            if(locationElement) locationElement.textContent = bioData.location;
        }

        // ===== UPDATE SOCIAL LINKS =====
        // Update LinkedIn link
        if(bioData.linkedin) {
            const linkedInLinks = document.querySelectorAll('a[href*="linkedin"]');
            linkedInLinks.forEach(link => {
                link.href = bioData.linkedin;
            });
        }

        // Update GitHub link
        if(bioData.github) {
            const gitHubLinks = document.querySelectorAll('a[href*="github"]');
            gitHubLinks.forEach(link => {
                link.href = bioData.github;
            });
        }

        // ===== UPDATE RESUME =====
        // Update resume download link if resume data exists
        if(bioData.resumeData) {
            document.querySelectorAll('a[href*="/resume.pdf"], a.btn-resume').forEach(link => {
                link.href = bioData.resumeData;
                link.download = bioData.resumeName || 'resume.pdf';
            });
        }
    }

    document.addEventListener('DOMContentLoaded', () => withPortfolioDataReady(loadBioFromEditor));
})();

// Project tabs + filtering + modal behavior
(function(){
    const tabs = document.querySelectorAll('.proj-tab');
    const grid = document.getElementById('projects-grid');

    // ... rest of the code remains the same ...
    function setActiveTab(catBtn){
        tabs.forEach(t => t.classList.remove('active'));
        catBtn.classList.add('active');
        const cat = catBtn.getAttribute('data-cat');
        filterByCategory(cat);
    }

    function filterByCategory(cat){
        // Get cards dynamically each time to ensure we get dynamically loaded cards
        if(!grid) return;
        const cards = Array.from(grid.querySelectorAll('[data-category]'));
        
        cards.forEach(card => {
            const c = card.getAttribute('data-category');
            if(cat === 'all' || c === cat){
                card.style.display = '';
                card.setAttribute('aria-hidden', 'false');
            } else {
                card.style.display = 'none';
                card.setAttribute('aria-hidden', 'true');
            }
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => setActiveTab(tab));
    });

    // Lazy-load images and remove skeleton when loaded
    function initCardImages(){
        const imgs = document.querySelectorAll('.card-img');
        imgs.forEach(img => {
            const src = img.getAttribute('data-src');
            if(!src) return;
            const tmp = new Image();
            tmp.src = src;
            tmp.onload = () => {
                img.src = src;
                img.classList.add('loaded');
                const parent = img.closest('.skeleton');
                if(parent) parent.classList.remove('skeleton');
            };
        });
    }

    // Modal: populate with full project data from editor or card element
    function openProjectModal(projDataOrCard){
        const tpl = document.getElementById('project-detail-template');
        if(!tpl) return;
        
        let projData = {};
        
        // Handle both object data (from editor) and card element (from UI click)
        if(typeof projDataOrCard === 'object' && projDataOrCard.title){
            // It's project data from editor
            projData = projDataOrCard;
        } else if(projDataOrCard && projDataOrCard.querySelector){
            // It's an HTML card element
            const cardEl = projDataOrCard;
            projData.title = cardEl.querySelector('h3') ? cardEl.querySelector('h3').textContent.trim() : 'Project Title';
            projData.date = cardEl.querySelector('small') ? cardEl.querySelector('small').textContent.trim() : '';
            projData.tools = Array.from(cardEl.querySelectorAll('.p-6 .flex span')).map(s => s.textContent.trim()).filter(Boolean);
            const imgEl = cardEl.querySelector('.card-img');
            projData.heroImage = (imgEl && (imgEl.getAttribute('src') || imgEl.getAttribute('data-src'))) || '/assets/placeholder-hero.jpg';
        }
        
        const clone = tpl.content.cloneNode(true);
        const backdrop = clone.querySelector('.modal-backdrop');

        // Populate all fields from project data
        const titleEl = clone.querySelector('.project-title');
        const dateEl = clone.querySelector('.project-date');
        const heroImg = clone.querySelector('.project-hero img');
        
        if(titleEl) titleEl.textContent = projData.title || 'Project Title';
        if(dateEl) dateEl.textContent = projData.date || '';
        if(heroImg){
            heroImg.classList.add('skeleton');
            heroImg.addEventListener('load', ()=> { 
                heroImg.classList.remove('skeleton'); 
                heroImg.classList.add('loaded'); 
            });
            heroImg.src = projData.heroImage || '/assets/placeholder-hero.jpg';
        }

        // Challenge section
        const challengeSection = clone.querySelector('section:nth-of-type(1)');
        if(challengeSection){
            const p = challengeSection.querySelector('p');
            if(p) p.textContent = projData.challenge || '(Challenge details)';
        }

        // Role section 
        const roleSection = clone.querySelector('section:nth-of-type(2)');
        if(roleSection){
            const ul = roleSection.querySelector('ul');
            if(ul){
                ul.innerHTML = '';
                if(projData.role){
                    const li = document.createElement('li');
                    li.textContent = projData.role;
                    li.className = 'text-gray-600';
                    ul.appendChild(li);
                } else {
                    ul.innerHTML = '<li class="text-gray-600">(Role details)</li>';
                }
            }
        }

        // Tools section
        const toolsSection = clone.querySelector('.tools-list');
        if(toolsSection){
            toolsSection.innerHTML = '';
            const tools = projData.tools || [];
            if(tools.length > 0){
                tools.forEach(t => {
                    const span = document.createElement('span');
                    span.className = 'bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full mr-2 mb-2 inline-block';
                    span.textContent = t;
                    toolsSection.appendChild(span);
                });
            } else {
                const span = document.createElement('span');
                span.className = 'text-gray-600 text-sm';
                span.textContent = '(Tools details)';
                toolsSection.appendChild(span);
            }
        }

        // Process section
        const processSection = clone.querySelector('section:nth-of-type(4)');
        if(processSection){
            const p = processSection.querySelector('p');
            if(p) p.textContent = projData.process || '(Process details)';
        }

        // Results section
        const resultsSection = clone.querySelector('section:nth-of-type(5)');
        if(resultsSection){
            const p = resultsSection.querySelector('p');
            if(p) p.textContent = projData.results || '(Results details)';
        }

        // Gallery section
        const gallery = clone.querySelector('.gallery');
        if(gallery){
            gallery.innerHTML = '';
            const galleryImages = projData.galleryImages || [];
            
            if(galleryImages.length > 0){
                galleryImages.forEach((imgSrc, idx) => {
                    const gImg = document.createElement('img');
                    gImg.alt = (projData.title || 'Project') + ' image ' + (idx+1);
                    gImg.className = 'w-full h-40 object-cover rounded cursor-pointer skeleton';
                    gImg.loading = 'lazy';
                    gImg.addEventListener('load', () => { 
                        gImg.classList.remove('skeleton'); 
                        gImg.classList.add('loaded'); 
                    });
                    gImg.addEventListener('click', ()=> openLightbox(gImg.src, gImg.alt));
                    gImg.src = imgSrc;
                    gallery.appendChild(gImg);
                });
            } else {
                // Fallback to placeholder gallery
                for(let i=1;i<=4;i++){
                    const gImg = document.createElement('img');
                    gImg.alt = (projData.title || 'Project') + ' image ' + i;
                    gImg.className = 'w-full h-40 object-cover rounded cursor-pointer skeleton';
                    gImg.loading = 'lazy';
                    gImg.addEventListener('load', () => { 
                        gImg.classList.remove('skeleton'); 
                        gImg.classList.add('loaded'); 
                    });
                    gImg.addEventListener('click', ()=> openLightbox(gImg.src, gImg.alt));
                    gImg.src = '/assets/placeholder-' + i + '.jpg';
                    gallery.appendChild(gImg);
                }
            }
        }

        // Add external links section if available
        let linksHTML = '';
        if(projData.github || projData.docLink){
            linksHTML = '<section class="mb-4"><h4 class="font-semibold">Links</h4><div class="flex gap-4 mt-2">';
            if(projData.github) linksHTML += '<a href="' + projData.github + '" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">GitHub Repository</a>';
            if(projData.docLink) linksHTML += '<a href="' + projData.docLink + '" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Documentation</a>';
            linksHTML += '</div></section>';
            
            const lastSection = clone.querySelector('section:last-of-type');
            if(lastSection) lastSection.insertAdjacentHTML('afterend', linksHTML);
        }

        // Append and show
        document.body.appendChild(clone);
        const appendedBackdrop = document.querySelector('.modal-backdrop:last-of-type');
        if(!appendedBackdrop) return;
        appendedBackdrop.classList.remove('hidden');

        // Scoped handlers
        const closeBtn = appendedBackdrop.querySelector('.close-modal');
        const backBtn = appendedBackdrop.querySelector('.back-to-projects');
        const previouslyFocused = document.activeElement;
        
        function removeModal(){
            appendedBackdrop.remove();
            if(previouslyFocused) previouslyFocused.focus();
            document.removeEventListener('keydown', handleKeydown);
        }
        
        if(closeBtn) closeBtn.addEventListener('click', removeModal);
        if(backBtn) backBtn.addEventListener('click', removeModal);
        appendedBackdrop.addEventListener('click', (e)=>{ if(e.target === appendedBackdrop) removeModal(); });

        // Accessibility: focus management & trap
        const modalCard = appendedBackdrop.querySelector('.modal-card');
        const focusableSelector = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';
        const focusableEls = Array.from(appendedBackdrop.querySelectorAll(focusableSelector)).filter(el => el.offsetParent !== null);
        const firstFocusable = focusableEls[0] || modalCard;
        const lastFocusable = focusableEls[focusableEls.length-1] || modalCard;
        
        function handleKeydown(e){
            if(e.key === 'Escape') { removeModal(); }
            if(e.key === 'Tab'){
                if(focusableEls.length === 0){ e.preventDefault(); return; }
                if(e.shiftKey){
                    if(document.activeElement === firstFocusable){ e.preventDefault(); lastFocusable.focus(); }
                } else {
                    if(document.activeElement === lastFocusable){ e.preventDefault(); firstFocusable.focus(); }
                }
            }
        }
        document.addEventListener('keydown', handleKeydown);
        // Move focus into the modal
        setTimeout(()=> { (modalCard || firstFocusable).focus(); }, 50);
    }

    // Wire up view-details buttons (for non-editor cards)
    function initViewDetails(){
        document.querySelectorAll('.view-details').forEach(btn => {
            if(!btn.hasAttribute('onclick')){
                btn.addEventListener('click', (e)=>{
                    const card = btn.closest('[data-category]');
                    if(card) openProjectModal(card);
                });
            }
        });
    }

    // Lightbox for gallery images
    function openLightbox(src, alt){
        const lb = document.createElement('div');
        lb.className = 'lightbox-backdrop';
        lb.innerHTML = `<div class="lightbox-content"><img src="${src}" alt="${alt}" class="lightbox-img"/></div>`;
        document.body.appendChild(lb);
        lb.addEventListener('click', ()=> lb.remove());
    }

    // Initialize on load
    document.addEventListener('DOMContentLoaded', ()=>{
        initCardImages();
        initViewDetails();
        // default filter
        const defaultTab = document.querySelector('.proj-tab.active');
        if(defaultTab) filterByCategory(defaultTab.getAttribute('data-cat'));
    });
})();

// Experience timeline read-more toggles
(function(){
    function initTimeline(){
        document.querySelectorAll('.read-toggle').forEach(btn => {
            btn.addEventListener('click', (e)=>{
                const readMore = btn.closest('.read-more');
                if(!readMore) return;
                const isOpen = readMore.classList.toggle('open');
                btn.setAttribute('aria-expanded', String(isOpen));
                btn.textContent = isOpen ? 'Show less' : 'Read more';
            });
        });
    }
    document.addEventListener('DOMContentLoaded', initTimeline);
})();

// Skills progress animation and certifications toggle
(function(){
    function animateSkills(){
        document.querySelectorAll('.skill-progress').forEach(el => {
            const p = el.getAttribute('data-progress') || el.dataset.progress;
            if(p){
                setTimeout(()=> { el.style.width = p + '%'; }, 300);
            }
        });
    }

    function initCertToggle(){
        const btn = document.getElementById('toggle-certifications');
        const certs = document.getElementById('certifications');
        if(!btn || !certs) return;
        btn.addEventListener('click', ()=>{
            const isHidden = certs.classList.toggle('hidden');
            btn.textContent = isHidden ? 'Show Certifications' : 'Hide Certifications';
        });
    }

    document.addEventListener('DOMContentLoaded', ()=>{
        animateSkills();
        initCertToggle();
    });
})();

// Hero typing effect and scroll indicator
(function(){
    const messages = ["Mechanical Engineer","3D Modelling","Data Analysis","Condition Monitoring"];
    const typingEl = document.querySelector('.hero-typing');
    const cursor = document.querySelector('.typing-cursor');
    let msgIndex = 0, charIndex = 0, typing = true;

    function typeLoop(){
        if(!typingEl) return;
        const current = messages[msgIndex];
        if(typing){
            typingEl.textContent = current.slice(0, charIndex+1);
            charIndex++;
            if(charIndex === current.length){ typing = false; setTimeout(typeLoop, 1200); return; }
            setTimeout(typeLoop, 90);
        } else {
            typingEl.textContent = current.slice(0, charIndex-1);
            charIndex--;
            if(charIndex === 0){ typing = true; msgIndex = (msgIndex+1) % messages.length; setTimeout(typeLoop, 300); return; }
            setTimeout(typeLoop, 40);
        }
    }

    // Scroll indicator
    function initScrollIndicator(){
        const btn = document.getElementById('scroll-indicator');
        if(!btn) return;
        btn.addEventListener('click', ()=>{
            const next = document.getElementById('about');
            if(next) next.scrollIntoView({behavior:'smooth'});
        });
    }

    document.addEventListener('DOMContentLoaded', ()=>{
        typeLoop();
        initScrollIndicator();
        // Wire dropdown quick-filter links in nav to tabs
        document.querySelectorAll('.dropdown-menu a[data-cat]').forEach(a=>{
            a.addEventListener('click', (e)=>{
                e.preventDefault();
                const cat = a.getAttribute('data-cat');
                const tab = document.querySelector(`.proj-tab[data-cat="${cat}"]`);
                if(tab) tab.click();
                document.getElementById('projects').scrollIntoView({behavior:'smooth'});
            });
        });
    });
})();
