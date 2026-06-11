/* ============================================================
   JHOREMIL C. CABRILLOS — PORTFOLIO
   projects.js | Project data + detail page renderer

   HOW TO ADD A NEW PROJECT:
   1. Add a new object to the PROJECTS array below
   2. Make sure 'id' matches the ?id= in your project card link
   3. Fill in all fields (images can be empty array if no images yet)
   ============================================================ */

const PROJECTS = [

  /* ── MECHANICAL ─────────────────────────────────────────── */

  {
    id: 'pulley-viability-finder',
    category: 'mechanical',
    categoryLabel: 'Mechanical Engineering',
    badgeClass: 'badge-mech',
    backHref: 'mechanical.html',
    title: 'Pulley Viability Finder',
    subtitle: 'Custom web tool for belt conveyor pulley assessment',
    description: `
      During my cadetship at Carmen Copper Corporation, I identified a recurring challenge:
      maintenance engineers needed a fast, reliable way to assess whether belt conveyor pulleys
      were still within acceptable tolerance ranges based on field measurements.
      <br><br>
      I built a web-based tool — entirely from scratch using HTML, CSS, and JavaScript —
      that takes profile measurement data (from CSV files) and cross-references it against
      a comprehensive pulley database (JSON) to determine viability. The tool also includes
      a CMS interface for updating the pulley database without touching code.
    `,
    responsibilities: [
      'Designed and built the full UI/UX of the web application',
      'Created a JSON-based pulley database covering multiple pulley specifications',
      'Built CSV import functionality for profile measurement data',
      'Implemented viability logic based on measurement tolerance thresholds',
      'Developed a CMS (Content Management System) interface for database updates',
      'Collected real measurement data from 2nd Lift and Slaking conveyor systems',
      'Tested and validated outputs against actual field engineer assessments',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'JSON', 'CSV'],
    meta: {
      'Category': 'Engineering Tool',
      'Organization': 'Carmen Copper Corporation',
      'Role': 'Cadet Engineer / Developer',
      'Type': 'Web Application',
      'Status': 'Completed',
    },
    images: [
      'assets/images/ccc/pulleycover.png',
    ],
    files: [
      /* { label: 'View Pulley Database', href: 'assets/project-files/pulley_data.json' } */
    ],
  },

  {
    id: 'shotblast-dismantling',
    category: 'mechanical',
    categoryLabel: 'Mechanical Engineering',
    badgeClass: 'badge-mech',
    backHref: 'mechanical.html',
    title: 'Shotblast Machinery Dismantling Procedure',
    subtitle: 'Technical documentation for Shotblast No.4 maintenance',
    description: `
      As part of my OJT, I was involved in the systematic dismantling of Shotblast Machine No.4.
      This required creating detailed step-by-step procedures to ensure the process was executed
      safely and could be repeated by maintenance staff in the future.
      <br><br>
      The documentation covers pre-dismantling inspection, tool requirements, safety lockout/tagout
      procedures, component removal sequences, and component storage guidelines.
    `,
    responsibilities: [
      'Participated in the actual dismantling operation under supervision',
      'Documented each step of the dismantling process in detail',
      'Created safety checklists and lockout/tagout procedures',
      'Identified and labeled all components for organized storage',
      'Produced a final technical report reviewed by senior engineers',
    ],
    technologies: ['Technical Writing', 'Machine Maintenance', 'Safety Procedures', 'Documentation'],
    meta: {
      'Category': 'OJT Project',
      'Machine': 'Shotblast No.4',
      'Role': 'OJT Engineer',
      'Type': 'Technical Documentation',
      'Status': 'Completed',
    },
    images: [
      'assets/images/shotblast/shotblastcover.png',
      'assets/images/shotblast/shotblast.png',
      'assets/images/shotblast/shotblast_1.png',
    ],
    files: [
      {label: 'Download Dismantling Procedure (PDF)', href: 'assets/project-files/shotblast_dismantling.pdf' }
    ],
  },

  {
    id: 'railing-replacement',
    category: 'mechanical',
    categoryLabel: 'Mechanical Engineering',
    badgeClass: 'badge-mech',
    backHref: 'mechanical.html',
    title: 'Replacement of Damaged Railings — Shotblast No.4',
    subtitle: 'Structural repair and engineering report',
    description: `
      This project involved the complete assessment, planning, and execution of a railing
      replacement task on Shotblast No.4. Damaged railings posed a safety risk to maintenance
      personnel, making this a priority safety improvement project.
      <br><br>
      The work covered inspecting existing railing conditions, specifying replacement materials
      to meet safety standards, coordinating with the fabrication team, and performing
      post-installation inspection to verify compliance.
    `,
    responsibilities: [
      'Conducted visual inspection and damage assessment of existing railings',
      'Specified material requirements for replacement railings',
      'Coordinated with fabrication shop for custom railing sections',
      'Supervised installation and ensured compliance with safety standards',
      'Produced a completion report documenting all work performed',
    ],
    technologies: ['Structural Assessment', 'Material Specification', 'Safety Compliance', 'Engineering Report'],
    meta: {
      'Category': 'OJT Project',
      'Machine': 'Shotblast No.4',
      'Role': 'OJT Engineer',
      'Type': 'Maintenance / Safety',
      'Status': 'Completed',
    },
    images: [
      'assets/images/shotblast/railingscover.png',
    ],
    files: [],
  },

  {
    id: 'carmen-copper-cadetship',
    category: 'mechanical',
    categoryLabel: 'Mechanical Engineering',
    badgeClass: 'badge-mech',
    backHref: 'mechanical.html',
    title: 'Cadet Engineer — Carmen Copper Corporation',
    subtitle: 'Industrial cadetship program in copper mining operations',
    description: `
      Carmen Copper Corporation is one of the Philippines' largest copper mining companies,
      operating in Toledo, Cebu. As a Cadet Engineer, I rotated through various departments
      and gained broad exposure to the mechanical engineering challenges unique to large-scale
      mining operations.
      <br><br>
      The cadetship covered equipment maintenance planning, conveyor systems, rotating machinery,
      field inspections, and the practical side of engineering problem-solving in an industrial
      environment.
    `,
    responsibilities: [
      'Performed regular equipment inspections and documented findings',
      'Assisted maintenance teams in scheduled and breakdown maintenance',
      'Participated in belt conveyor system assessments',
      'Contributed to developing engineering tools for the maintenance department',
      'Completed milestone assessments and progress reviews',
      'Observed and assisted in safety-critical procedures',
    ],
    technologies: ['Mining Operations', 'Conveyor Systems', 'Rotating Equipment', 'Maintenance Planning', 'Field Engineering'],
    meta: {
      'Category': 'Cadetship',
      'Organization': 'Carmen Copper Corporation',
      'Location': 'Toledo, Cebu',
      'Role': 'Cadet Engineer',
      'Status': 'Completed',
    },
    images: [],
    files: [],
  },

  /* ── SOFTWARE ────────────────────────────────────────────── */

  {
    id: 'bank-ledger-microservice',
    category: 'software',
    categoryLabel: 'Software / Programming',
    badgeClass: 'badge-soft',
    backHref: 'software.html',
    title: 'Bank Ledger Microservice',
    subtitle: 'Java Spring Boot RESTful microservice for banking operations',
    description: `
      A backend microservice built with Java Spring Boot designed to handle banking ledger
      operations. The service manages time deposit (TD) accounts — from creation through
      maturity calculation — and integrates with external pricing and product mapping APIs
      via HTTP calls.
      <br><br>
      This was a backend engineering assessment project that demonstrated understanding of
      microservice architecture, RESTful API design, exception handling, and downstream
      service integration patterns.
    `,
    responsibilities: [
      'Designed RESTful API endpoints for TD account operations',
      'Implemented service layer business logic for deposit and maturity calculations',
      'Built repository layer integrations for Bank Ledger, Pricing, and Product Mapping APIs',
      'Set up global exception handling with custom error responses',
      'Used Maven for dependency management and build configuration',
      'Structured code following Spring Boot layered architecture best practices',
    ],
    technologies: ['Java', 'Spring Boot', 'Maven', 'REST API', 'Microservices', 'JSON', 'JPA'],
    meta: {
      'Category': 'Backend Assessment',
      'Language': 'Java',
      'Framework': 'Spring Boot',
      'Build Tool': 'Maven',
      'Type': 'Microservice',
    },
    images: [],
    files: [],
  },

  {
    id: 'open-td-debugging',
    category: 'software',
    categoryLabel: 'Software / Programming',
    badgeClass: 'badge-soft',
    backHref: 'software.html',
    title: 'Open TD Microservice — Debugging Assessment',
    subtitle: 'Backend debugging of a Spring Boot time deposit microservice',
    description: `
      A focused debugging assessment where I was given a pre-written Java Spring Boot microservice
      with intentional bugs and tasked with identifying and resolving all issues.
      <br><br>
      The service handles the opening of time deposit accounts and integrates with a bank ledger
      API. Bugs were spread across the controller, service, and repository layers, requiring
      systematic debugging and code comprehension skills.
    `,
    responsibilities: [
      'Analyzed existing codebase to understand intended functionality',
      'Identified bugs in controller, service, and repository layers',
      'Fixed incorrect API request/response mappings',
      'Resolved exception handling issues causing incorrect error responses',
      'Corrected business logic errors in deposit calculation flow',
      'Documented all identified bugs and their fixes in a debugging report',
    ],
    technologies: ['Java', 'Spring Boot', 'Maven', 'REST API', 'Debugging', 'Spring MVC'],
    meta: {
      'Category': 'Backend Assessment',
      'Language': 'Java',
      'Framework': 'Spring Boot',
      'Type': 'Debugging Task',
      'Status': 'Completed',
    },
    images: [],
    files: [],
  },

  {
    id: 'python-data-analysis',
    category: 'software',
    categoryLabel: 'Software / Programming',
    badgeClass: 'badge-soft',
    backHref: 'software.html',
    title: 'Python Data Analysis Projects',
    subtitle: 'Data analysis and visualization using Python — IBM Certified',
    description: `
      A collection of data analysis projects completed as part of IBM's Data Analysis with Python
      and Cognitive Class programs. These projects cover the full data analysis pipeline:
      data acquisition, cleaning, exploratory analysis, statistical testing, and visualization.
      <br><br>
      Completing these projects built a strong foundation in Python's scientific computing stack
      and gave me hands-on experience turning raw data into actionable insights.
    `,
    responsibilities: [
      'Loaded and cleaned real-world datasets using pandas',
      'Performed exploratory data analysis (EDA) with summary statistics',
      'Applied statistical methods and hypothesis testing',
      'Built data visualizations using matplotlib and seaborn',
      'Completed IBM-graded labs and assessments',
      'Earned IBM DA0101EN certificate upon completion',
    ],
    technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter Notebook', 'IBM Cognitive Class'],
    meta: {
      'Category': 'Self-Learning',
      'Language': 'Python',
      'Platform': 'IBM / Codecademy',
      'Certification': 'IBM DA0101EN',
      'Status': 'Certified',
    },
    images: [],
    files: [],
  },

  {
    id: 'flask-web-app',
    category: 'software',
    categoryLabel: 'Software / Programming',
    badgeClass: 'badge-soft',
    backHref: 'software.html',
    title: 'Flask Web Application',
    subtitle: 'Python web app development using Flask framework',
    description: `
      Web application development using Python's Flask micro-framework, completed through
      Codecademy's "Build Python Web Apps with Flask" course. Covers the core concepts of
      server-side web development: routing, templating with Jinja2, form handling, and
      basic data persistence.
      <br><br>
      This project deepened my understanding of how web backends work — from HTTP request
      handling to rendering dynamic HTML pages.
    `,
    responsibilities: [
      'Set up Flask application structure with blueprints and routing',
      'Built dynamic page templates using Jinja2',
      'Implemented HTML form handling with input validation',
      'Connected application to a basic database for data persistence',
      'Deployed and tested locally using Flask development server',
    ],
    technologies: ['Python', 'Flask', 'Jinja2', 'HTML/CSS', 'SQL', 'Codecademy'],
    meta: {
      'Category': 'Self-Learning',
      'Language': 'Python',
      'Framework': 'Flask',
      'Platform': 'Codecademy',
      'Status': 'Certified',
    },
    images: [],
    files: [],
  },

  /* ── ACADEMIC ────────────────────────────────────────────── */

  {
    id: 'bsmech-thesis',
    category: 'academic',
    categoryLabel: 'Academic',
    badgeClass: 'badge-acad',
    backHref: 'academic.html',
    title: 'BS Mechanical Engineering Thesis',
    subtitle: 'Undergraduate thesis — BSMEch program',
    description: `
      The undergraduate thesis is the capstone of the BS Mechanical Engineering degree —
      representing original research, engineering analysis, and design work developed over
      the final year of study.
      <br><br>
      The thesis required comprehensive technical writing, experimental or analytical
      methodology, and defense before a faculty panel. It demonstrates mastery of core
      mechanical engineering principles applied to a novel research question.
    `,
    responsibilities: [
      'Identified a research problem aligned with mechanical engineering principles',
      'Conducted literature review of related works and prior research',
      'Designed and executed research/experimental methodology',
      'Analyzed results and drew engineering conclusions',
      'Produced a complete thesis document following academic standards',
      'Defended the thesis before a faculty evaluation panel',
    ],
    technologies: ['Mechanical Engineering', 'Research Methodology', 'Technical Writing', 'Engineering Design', 'Academic Research'],
    meta: {
      'Category': 'Thesis',
      'Degree': 'BS Mechanical Engineering',
      'Type': 'Undergraduate Research',
      'Status': 'Completed',
    },
    images: [
      'assets/images/thesis/1.png',
      'assets/images/thesis/2.jpg',
      'assets/images/thesis/3.jpg',
      'assets/images/thesis/4.gif',
    ],
    files: [
      
         { label: 'Download Thesis (PDF)', href: 'assets/project-files/thesis.pdf' }
      
    ],
  },

  {
    id: 'four-bees-engineering',
    category: 'academic',
    categoryLabel: 'Academic',
    badgeClass: 'badge-acad',
    backHref: 'academic.html',
    title: 'Four Bees Engineering Services — Completion Report',
    subtitle: 'Academic engineering services project',
    description: `
      An academic engineering services project completed as part of coursework requirements.
      The project involved real engineering service work — designed, planned, and executed
      by the student team under faculty supervision.
      <br><br>
      I served as the lead designer for the project, personally developing the engineering
      plans and overseeing execution to ensure the service was completed to specification.
    `,
    responsibilities: [
      'Led the engineering design phase of the project',
      'Developed technical plans and specifications',
      'Coordinated team activities and task assignments',
      'Supervised execution and ensured quality standards',
      'Produced the final completion report for academic submission',
    ],
    technologies: ['Engineering Design', 'Project Management', 'Technical Documentation', 'Academic Research'],
    meta: {
      'Category': 'Academic Project',
      'Organization': 'Four Bees Engineering Services',
      'Role': 'Lead Designer',
      'Type': 'Engineering Services',
      'Status': 'Completed',
    },
    images: [
      'assets/images/4bees/1.png'
    ],
    files: [
      { label: 'Download Completion Report (PDF)', href: 'assets/project-files/4bees/4B.pdf' },
      { label: 'Organization/Management Information (PDF)', href: 'assets/project-files/4bees/Org.pdf' },
    ],
  },

  {
    id: 'ojt-report',
    category: 'academic',
    categoryLabel: 'Academic',
    badgeClass: 'badge-acad',
    backHref: 'academic.html',
    title: 'On-the-Job Training Report',
    subtitle: 'Comprehensive OJT documentation and weekly log',
    description: `
      The OJT report documents the entirety of my industrial training experience — capturing
      weekly activities, technical learnings, accomplishments, and reflections throughout
      the on-the-job training period.
      <br><br>
      It includes a structured weekly log with detailed accounts of tasks performed,
      skills developed, challenges encountered, and how they were overcome. Evaluated
      and graded by both the host company and the university.
    `,
    responsibilities: [
      'Maintained detailed weekly activity logs throughout the OJT period',
      'Documented technical procedures and engineering tasks performed',
      'Reflected on professional and technical skills developed',
      'Compiled all weekly logs into a comprehensive final report',
      'Submitted for evaluation and received OJT grade certification',
    ],
    technologies: ['Technical Documentation', 'Report Writing', 'Industrial Training', 'Professional Development'],
    meta: {
      'Category': 'OJT Documentation',
      'Type': 'Training Report',
      'Evaluation': 'Graded',
      'Status': 'Completed',
    },
    images: [],
    files: [],
  },

];

/* ══════════════════════════════════════════════════════════
   DETAIL PAGE RENDERER
   You don't need to edit anything below this line.
   ══════════════════════════════════════════════════════════ */

(function renderDetailPage() {
  const container = document.getElementById('projectContent');
  if (!container) return;

  // Read ?id= from URL
  const params = new URLSearchParams(location.search);
  const id = params.get('id');

  const project = PROJECTS.find(p => p.id === id);

  if (!project) {
    container.innerHTML = `
      <div style="text-align:center; padding:80px 0;">
        <h2 style="font-family:var(--font-display); font-size:2rem; margin-bottom:16px; color:var(--text);">Project not found</h2>
        <p style="color:var(--text-muted); margin-bottom:32px;">No project with that ID exists yet.</p>
        <a href="index.html" class="btn btn-primary">Back to Home</a>
      </div>`;
    return;
  }

  // Update page title
  document.title = `${project.title} — Jhoremil Cabrillos`;

  // Update back link
  const backLink = document.getElementById('backLink');
  if (backLink) {
    backLink.href = project.backHref;
    backLink.querySelector('svg').nextSibling.textContent = ` ${project.categoryLabel}`;
  }

  // Build gallery HTML
  const hasImages = project.images && project.images.length > 0;
  const galleryHTML = `
    <div class="detail-gallery">
      <div class="gallery-main">
        ${hasImages
          ? `<img src="${project.images[0]}" alt="${project.title} — preview" loading="lazy" />`
          : `<div class="gallery-placeholder">
               <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <rect x="8" y="14" width="48" height="36" rx="4" stroke="currentColor" stroke-width="2"/>
                 <circle cx="22" cy="26" r="5" stroke="currentColor" stroke-width="2"/>
                 <path d="M8 40l14-10 10 8 8-6 14 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
               </svg>
               <p>Add images to assets/images/<br>then update this project's <code>images</code> array in projects.js</p>
             </div>`
        }
      </div>
      ${hasImages && project.images.length > 1 ? `
        <div class="gallery-thumbs">
          ${project.images.map((src, i) => `
            <div class="gallery-thumb ${i === 0 ? 'active' : ''}">
              <img src="${src}" alt="Thumbnail ${i+1}" loading="lazy" />
            </div>`).join('')}
        </div>` : ''}
    </div>`;

  // Build meta sidebar
  const metaHTML = Object.entries(project.meta).map(([k, v]) => `
    <div class="sidebar-meta-item">
      <span class="sidebar-meta-key">${k}</span>
      <span class="sidebar-meta-val">${v}</span>
    </div>`).join('');

  // Build tech chips
  const techHTML = project.technologies.map(t => `<span class="tech-chip">${t}</span>`).join('');

  // Build file links
  const filesHTML = project.files && project.files.length > 0
    ? `<div class="detail-sidebar-card">
         <div class="sidebar-label">Files &amp; Links</div>
         ${project.files.map(f => `
           <a href="${f.href}" target="_blank" rel="noopener" class="btn btn-ghost" style="width:100%;justify-content:center;margin-top:8px;">
             ${f.label}
           </a>`).join('')}
       </div>` : '';

  // Build responsibilities list
  const respHTML = project.responsibilities.map(r => `<li>${r}</li>`).join('');

  // Render
  container.innerHTML = `
    <div class="detail-grid">

      <!-- Main column -->
      <div class="detail-main">
        ${galleryHTML}
        <span class="card-badge ${project.badgeClass}" style="display:inline-block;position:static;margin-bottom:16px;">${project.categoryLabel}</span>
        <h1 class="detail-title">${project.title}</h1>
        <p style="color:var(--text-muted);font-size:1.05rem;font-weight:300;margin-bottom:8px;">${project.subtitle}</p>

        <div class="detail-section-title">Overview</div>
        <div class="detail-body">${project.description}</div>

        <div class="detail-section-title">Key Responsibilities &amp; Activities</div>
        <ul class="detail-list">${respHTML}</ul>
      </div>

      <!-- Sidebar -->
      <div class="detail-sidebar">
        <div class="detail-sidebar-card">
          <div class="sidebar-label">Project Details</div>
          ${metaHTML}
        </div>
        <div class="detail-sidebar-card">
          <div class="sidebar-label">Technologies &amp; Skills</div>
          <div class="tech-chips">${techHTML}</div>
        </div>
        ${filesHTML}
      </div>

    </div>`;

  // Re-init gallery thumbs now that DOM is ready
  const thumbs  = container.querySelectorAll('.gallery-thumb');
  const mainImg = container.querySelector('.gallery-main img');
  if (thumbs.length && mainImg) {
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const src = thumb.querySelector('img')?.src;
        if (src) {
          mainImg.src = src;
          thumbs.forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
        }
      });
    });
  }
})();
