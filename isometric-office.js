/**
 * ============================================================================
 * MAYANK SINGH SADUDIA — REAL-TIME ISOMETRIC OFFICE INTERACTIVE ENGINE
 * Vibrant Vector Architectural Center, Auto-Scaling Camera & Dialogue Engine
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // Departments & Cabins Definition (Coordinates calibrated to 1200x950 SVG)
  // --------------------------------------------------------------------------
  const ROOMS = {
    outside: {
      id: 'outside',
      name: 'Ground Entrance & Paved Walkway',
      floor: 'Ground Exterior',
      coords: { x: 230, y: 790 },
      camera: { x: 180, y: -160, zoom: 1.15 },
      npc: null,
      introText: "You are outside Mayank Headquarters in Indore, India. Head receptionist Priya waves from her ergonomic chair behind the glass reception desk, inviting you inside!"
    },
    reception: {
      id: 'reception',
      name: 'Reception & Welcome Lobby',
      floor: 'Ground Floor (West Wing)',
      coords: { x: 380, y: 730 },
      camera: { x: 110, y: -140, zoom: 1.25 },
      npc: {
        name: 'Priya Sharma',
        role: 'Head Receptionist',
        avatar: 'assets/user_projects/log0_1.jpg',
        initialDialog: "Hello and welcome to our headquarters! I am Priya Sharma, Head Receptionist at Mayank Headquarters. I am seated here at the concierge desk to welcome our visitors. Mayank is a Data Analyst & Creative Designer with an MCA degree from IPS Academy. Here is your official VIP Visitor Pass! Which department would you like to explore first?",
        choices: [
          { text: "📊 Visit Data & Analytics Lab", targetRoom: 'data' },
          { text: "🎨 Visit Creative Design Studio", targetRoom: 'design' },
          { text: "⚡ Go to Escalator Transit Concourse", targetRoom: 'central' },
          { text: "🎓 View Academic Archives & Boardroom", targetRoom: 'academic' },
          { text: "👑 Visit Boss Mayank in his Penthouse", targetRoom: 'boss' }
        ]
      }
    },
    data: {
      id: 'data',
      name: 'Data Science & Analytics Lab',
      floor: 'Ground Floor (East Wing)',
      coords: { x: 840, y: 730 },
      camera: { x: -250, y: -140, zoom: 1.25 },
      npc: {
        name: 'Rahul Verma',
        role: 'Data Science & BI Lead',
        avatar: 'assets/user_projects/customer-project.svg',
        initialDialog: "Hello! I am Rahul Verma, Data Science & Business Intelligence Lead here in the Data Intelligence Lab. Inside our glass cabin, our analysts work on live systems extracting quantitative intelligence using Python (Pandas, NumPy), SQL, and Power BI dashboards. What project or analysis would you like me to walk you through?",
        choices: [
          { text: "📦 Amazon Review VADER NLP Analysis", action: 'open_project', projectId: 'amazon' },
          { text: "📈 Online Retail 541k Sales Study", action: 'open_project', projectId: 'retail' },
          { text: "👥 Customer Management SQLite System", action: 'open_project', projectId: 'cms' },
          { text: "🏥 Lifecare Health Database Prototype", action: 'open_project', projectId: 'lifecare' },
          { text: "⚡ Ride Escalators to Central Concourse", targetRoom: 'central' }
        ]
      }
    },
    design: {
      id: 'design',
      name: 'Creative Design & Packaging Studio',
      floor: '1st Floor (West Wing)',
      coords: { x: 280, y: 530 },
      camera: { x: 180, y: 20, zoom: 1.25 },
      npc: {
        name: 'Sneha Patel',
        role: 'Creative Design Director',
        avatar: 'assets/user_projects/artboard_1.jpg',
        initialDialog: "Hi there! I am Sneha Patel, Creative Design Director at our 3D & Visual Craft Studio. Behind our glass cabin doors, our designers are working on workstations crafting bespoke brand identities, photorealistic 3D product packaging, and interactive WebGL experiences. Which showcase would you like to inspect?",
        choices: [
          { text: "🔊 3D Exploding Speaker Web App", action: 'open_project', projectId: 'speaker' },
          { text: "🏎️ 1968 Ford Mustang 3D Showcase", action: 'open_project', projectId: 'mustang' },
          { text: "⚡ Dragon Energy 3D Beverage Can", action: 'open_project', projectId: 'dragon' },
          { text: "🪧 Corporate Brand Stationery Kits", action: 'open_project', projectId: 'stationery' },
          { text: "⬆️ Head to Executive Penthouse", targetRoom: 'boss' }
        ]
      }
    },
    central: {
      id: 'central',
      name: 'Central Transit Concourse & Escalators',
      floor: 'Mid-Level Transit Hub',
      coords: { x: 600, y: 510 },
      camera: { x: -50, y: 20, zoom: 1.2 },
      npc: {
        name: 'Vikram Malhotra',
        role: 'Head of Building Operations',
        avatar: 'assets/user_projects/dobby_poly_art.jpg',
        initialDialog: "Welcome to our Central Transit Concourse! I am Vikram Malhotra, Building & Operations Host. From this architectural glass nexus, our moving escalators and floating stairs connect you directly to every creative studio, data lab, boardroom, and the executive penthouse. Where would you like to travel next?",
        choices: [
          { text: "☕ Relax in Concourse Lounge", action: 'show_lounge_info' },
          { text: "💡 Go to 3D Brainstorm Lounge", targetRoom: 'brainstorm' },
          { text: "🎓 Visit Executive Boardroom & Credentials", targetRoom: 'academic' },
          { text: "👑 Climb to Boss Mayank's Penthouse", targetRoom: 'boss' }
        ]
      }
    },
    academic: {
      id: 'academic',
      name: 'Executive Boardroom & Academic Vault',
      floor: '2nd Floor (West Wing)',
      coords: { x: 360, y: 310 },
      camera: { x: 150, y: 160, zoom: 1.25 },
      npc: {
        name: 'Kunal Joshi',
        role: 'Academic & Tech Lead',
        avatar: 'assets/user_projects/dobby_poly_art.jpg',
        initialDialog: "Greetings! I am Kunal Joshi, Knowledge & Academic Lead here in the Executive Boardroom & Credentials Vault. Inside our glass boardroom, researchers review technical architectures and maintain Mayank's verified academic degrees—including his MCA from IPS Academy (2024) and B.Com in Computer Applications from MRSC (2022).",
        choices: [
          { text: "📜 View Academic Qualifications", action: 'show_credentials' },
          { text: "💻 View Full Technical Toolbelt", action: 'show_skills' },
          { text: "💡 Visit 3D Brainstorm Lounge", targetRoom: 'brainstorm' },
          { text: "👑 Visit Boss Mayank in his Penthouse", targetRoom: 'boss' }
        ]
      }
    },
    brainstorm: {
      id: 'brainstorm',
      name: '3D Brainstorm & Creative Lounge',
      floor: '2nd Floor (East Wing)',
      coords: { x: 840, y: 330 },
      camera: { x: -250, y: 150, zoom: 1.25 },
      npc: {
        name: 'Ananya Sen',
        role: 'Innovation & 3D Web Lead',
        avatar: 'assets/user_projects/artboard_1.jpg',
        initialDialog: "Hey there! I am Ananya Sen, 3D Web & Innovation Lead at the Innovation Lab. Inside our open glass creative lounge, engineers and artists are actively working on laptops prototyping Three.js scenes, kinetic UI micro-interactions, and generative AI pipelines. What would you like to check out?",
        choices: [
          { text: "🏎️ View 1968 Ford Mustang 3D Project", action: 'open_project', projectId: 'mustang' },
          { text: "🔊 View Exploding Speaker 3D Web App", action: 'open_project', projectId: 'speaker' },
          { text: "🎓 Check Academic Credentials", targetRoom: 'academic' },
          { text: "👑 Take Stairs to Boss Penthouse", targetRoom: 'boss' }
        ]
      }
    },
    boss: {
      id: 'boss',
      name: "Executive Penthouse — Boss Mayank's Cabin",
      floor: 'Summit Floor (Top Penthouse)',
      coords: { x: 640, y: 170 },
      camera: { x: -70, y: 250, zoom: 1.35 },
      npc: {
        name: 'Mayank Singh Sadudia',
        role: 'Founder, Data Analyst & Designer (The Boss)',
        avatar: 'assets/mayank_avatar_hd_v6.png',
        initialDialog: "Welcome to my Executive Penthouse! I am Mayank Singh Sadudia, Founder, Lead Data Analyst & Creative Designer. My core philosophy is simple: Analytical Mind, Creative Eye. I unite rigorous quantitative data analytics with world-class visual communication and 3D web. How can I help you today?",
        choices: [
          { text: "💼 I Want to Hire You / Send Inquiry", action: 'open_hire' },
          { text: "📥 Download Official Resume CV (PDF)", action: 'download_resume' },
          { text: "📱 Direct Contact & WhatsApp / LinkedIn", action: 'show_contact' },
          { text: "🔄 Take a Tour of the Office Again", targetRoom: 'reception' }
        ]
      }
    }
  };

  // --------------------------------------------------------------------------
  // Projects Data for Interactive Department Terminals
  // --------------------------------------------------------------------------
  const PROJECTS_DATA = {
    amazon: {
      title: "Amazon Review Sentiment Analysis",
      category: "Data Analytics • NLP & Python",
      img: "assets/user_projects/amazon_sentiment_preview.png",
      desc: "End-to-end NLP sentiment pipeline processing real customer feedback with VADER. Features positive/neutral/negative categorization and interactive dynamic visualization dashboards.",
      link: "amazon-sentiment-analysis.html",
      linkText: "Launch Interactive Analysis"
    },
    retail: {
      title: "Online Retail Sales Analysis",
      category: "Data Science • Python & SQL",
      img: "retail-analysis-preview.png",
      desc: "Deep-dive study of 541,909 real UCI retail transactions: automated data cleansing, monthly sales metrics, country mix analysis, and customer repeat purchase modeling.",
      link: "retail-analysis.html",
      linkText: "View Full Case Study"
    },
    cms: {
      title: "Customer Management System (CMS)",
      category: "Database Engineering • SQLite & Python",
      img: "assets/user_projects/cms_preview.png",
      desc: "Relational database application storing customer profiles, transaction history, and generating real-time SQL summaries for revenue and repeat buyers.",
      link: "cms-analysis.html",
      linkText: "Explore CMS System"
    },
    lifecare: {
      title: "Lifecare Health System Prototype",
      category: "Full-Stack Prototype • Flask & SQLite",
      img: "assets/user_projects/lifecare_preview.png",
      desc: "MCA academic prototype for healthcare management: patient & physician registration, appointment requests, administrative approvals, and medical history tracking.",
      link: "lifecare-health-system.html",
      linkText: "Inspect Architecture"
    },
    speaker: {
      title: "3D Exploding Speaker Web Application",
      category: "Interactive 3D Web • Three.js",
      img: "assets/user_projects/exploding_speaker_3d.jpg",
      desc: "Interactive 3D audio hardware simulation allowing users to inspect exploded component assemblies, driver coils, acoustic chambers, and sound frequency curves.",
      link: "https://github.com/Mayanksinghsadudia/Exploding-Speaker",
      linkText: "View GitHub Repository"
    },
    mustang: {
      title: "1968 Ford Mustang 3D Showcase",
      category: "3D Product Visualization • Three.js",
      img: "assets/user_projects/ford_mustang_1968.jpg",
      desc: "Cinematic real-time 3D vehicle inspection showcasing realistic metallic paint shaders, chrome reflections, orbital camera controls, and interior cutaways.",
      link: "https://github.com/Mayanksinghsadudia/Ford-Mustang-1968",
      linkText: "View 3D Project"
    },
    dragon: {
      title: "Dragon Energy 3D Beverage Packaging",
      category: "Product Packaging & CGI Render",
      img: "assets/dragon_energy.jpg",
      desc: "Photorealistic 3D aluminum beverage packaging design with condensation droplet physics, matte-finish labels, and dynamic studio lighting.",
      link: "index.html#projects",
      linkText: "Inspect Packaging Art"
    },
    stationery: {
      title: "Corporate Identity & Stationery Kits",
      category: "Brand Design • Adobe Illustrator",
      img: "assets/corporate_identity.jpg",
      desc: "Comprehensive brand identity system including vector logos, typography guidelines, business cards, letterheads, envelopes, and brand style decks.",
      link: "index.html#projects",
      linkText: "View Brand Deck"
    }
  };

  // --------------------------------------------------------------------------
  // Synthesizer Audio Engine (Web Audio API)
  // --------------------------------------------------------------------------
  class OfficeAudio {
    constructor() {
      this.ctx = null;
      this.enabled = true;
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
        }
      }
    }

    playFootstep() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    }

    playChime() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.07);
        gain.gain.setValueAtTime(0.14, this.ctx.currentTime + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.07 + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + i * 0.07);
        osc.stop(this.ctx.currentTime + i * 0.07 + 0.36);
      });
    }

    playBlip() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    }
  }

  // --------------------------------------------------------------------------
  // Main Isometric Office Engine
  // --------------------------------------------------------------------------
  class IsometricOffice {
    constructor() {
      this.currentRoom = 'outside';
      this.isWalking = false;
      this.isOverview = false;
      this.hasVisitorPass = false;
      this.audio = new OfficeAudio();
      
      // DOM Elements
      this.world = document.getElementById('isometricWorld');
      this.visitorAvatar = document.getElementById('visitorAvatar');
      this.dialogueOverlay = document.getElementById('dialogueOverlay');
      this.speakerName = document.getElementById('speakerName');
      this.speakerRole = document.getElementById('speakerRole');
      this.speakerImg = document.getElementById('speakerImg');
      this.dialogueBody = document.getElementById('dialogueBody');
      this.dialogueChoices = document.getElementById('dialogueChoices');
      this.visitorPassToast = document.getElementById('visitorPassToast');
      this.projectModal = document.getElementById('projectModal');
      this.hireModal = document.getElementById('hireModal');
      this.soundToggleBtn = document.getElementById('soundToggleBtn');
      this.overviewBtn = document.getElementById('overviewBtn');
      
      this.init();
    }

    getBaseScale() {
      const availW = window.innerWidth;
      const availH = window.innerHeight;
      const scaleW = availW / 1280;
      const scaleH = (availH - 120) / 950;
      return Math.min(1.0, Math.max(0.5, Math.min(scaleW, scaleH)));
    }

    init() {
      // Place visitor at outside entrance
      this.setAvatarPosition(ROOMS.outside.coords.x, ROOMS.outside.coords.y);
      this.updateCamera(ROOMS.outside.camera);
      this.bindEvents();

      // Auto update camera on window resize
      window.addEventListener('resize', () => {
        if (this.isOverview) {
          this.updateCamera({ x: 0, y: 0, zoom: 1.0 });
        } else {
          const current = ROOMS[this.currentRoom];
          if (current) this.updateCamera(current.camera);
        }
      });

      // Outside receptionist welcome prompt
      setTimeout(() => {
        this.showOutsideWelcome();
      }, 800);
    }

    bindEvents() {
      // Room Tabs Click
      document.querySelectorAll('.room-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          const roomId = tab.getAttribute('data-room');
          if (roomId) {
            this.isOverview = false;
            if (this.overviewBtn) this.overviewBtn.classList.remove('active');
            this.goToRoom(roomId);
          }
        });
      });

      // SVG Hotspots & Radar Beacon Clicks
      document.querySelectorAll('.room-hotspot, .radar-beacon').forEach(spot => {
        spot.addEventListener('click', (e) => {
          const roomId = spot.getAttribute('data-room-id');
          if (roomId) {
            this.isOverview = false;
            if (this.overviewBtn) this.overviewBtn.classList.remove('active');
            this.goToRoom(roomId);
          }
        });
      });

      // Overview Camera Toggle
      if (this.overviewBtn) {
        this.overviewBtn.addEventListener('click', () => {
          this.toggleOverview();
        });
      }

      // Dialogue Close Button
      document.getElementById('dialogueCloseBtn')?.addEventListener('click', () => {
        this.closeDialogue();
      });

      // Sound Toggle
      if (this.soundToggleBtn) {
        this.soundToggleBtn.addEventListener('click', () => {
          this.audio.enabled = !this.audio.enabled;
          this.soundToggleBtn.classList.toggle('active', this.audio.enabled);
          this.soundToggleBtn.innerHTML = this.audio.enabled 
            ? '<span class="material-symbols-outlined" style="font-size:16px;">volume_up</span> AUDIO ON'
            : '<span class="material-symbols-outlined" style="font-size:16px;">volume_off</span> AUDIO MUTED';
        });
      }

      // Close Project Modal
      document.getElementById('projectModalClose')?.addEventListener('click', () => {
        this.closeProjectModal();
      });

      // Close Hire Modal
      document.getElementById('hireModalClose')?.addEventListener('click', () => {
        this.closeHireModal();
      });

      // Keyboard Controls (WASD / Arrows / O)
      window.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        const sequence = ['outside', 'reception', 'data', 'design', 'central', 'academic', 'brainstorm', 'boss'];
        const currentIdx = sequence.indexOf(this.currentRoom);
        if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
          const next = sequence[Math.min(sequence.length - 1, currentIdx + 1)];
          this.goToRoom(next);
        } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
          const prev = sequence[Math.max(0, currentIdx - 1)];
          this.goToRoom(prev);
        } else if (e.key === 'Escape') {
          this.closeDialogue();
          this.closeProjectModal();
          this.closeHireModal();
        } else if (e.key === 'o' || e.key === 'O' || e.key === ' ') {
          this.toggleOverview();
        }
      });
    }

    toggleOverview() {
      this.isOverview = !this.isOverview;
      if (this.overviewBtn) this.overviewBtn.classList.toggle('active', this.isOverview);
      if (this.isOverview) {
        this.closeDialogue();
        this.updateCamera({ x: 0, y: 0, zoom: 0.95 });
      } else {
        const target = ROOMS[this.currentRoom];
        if (target) this.updateCamera(target.camera);
      }
    }

    setAvatarPosition(x, y) {
      if (this.visitorAvatar) {
        this.visitorAvatar.style.left = `${x}px`;
        this.visitorAvatar.style.top = `${y}px`;
      }
    }

    updateCamera(cam) {
      if (!this.world || !cam) return;
      const base = this.getBaseScale();
      const finalScale = (cam.zoom || 1.0) * base;
      const finalX = cam.x * base;
      const finalY = cam.y * base;
      this.world.style.transform = `translate(${finalX}px, ${finalY}px) scale(${finalScale})`;
    }

    showOutsideWelcome() {
      const bubble = document.getElementById('outsideSpeechBubble');
      if (bubble) bubble.style.display = 'flex';
      this.audio.playChime();
    }

    goToRoom(roomId) {
      const target = ROOMS[roomId];
      if (!target || this.isWalking) return;

      this.isWalking = true;
      this.currentRoom = roomId;

      // Close any open dialogues / bubbles
      this.closeDialogue();
      const bubble = document.getElementById('outsideSpeechBubble');
      if (bubble) bubble.style.display = 'none';

      // Update room tabs
      document.querySelectorAll('.room-tab').forEach(t => {
        t.classList.toggle('active', t.getAttribute('data-room') === roomId);
      });

      // Update hotspot highlights
      document.querySelectorAll('.room-hotspot').forEach(spot => {
        spot.classList.toggle('is-current', spot.getAttribute('data-room-id') === roomId);
      });

      // Determine face direction
      const currentX = parseFloat(this.visitorAvatar.style.left) || 0;
      if (target.coords.x < currentX) {
        this.visitorAvatar.classList.add('face-left');
      } else {
        this.visitorAvatar.classList.remove('face-left');
      }

      // Start walk animation
      this.visitorAvatar.classList.add('is-walking');
      this.audio.playFootstep();

      // Footstep cadence
      const stepInterval = setInterval(() => {
        if (this.isWalking) this.audio.playFootstep();
      }, 260);

      // Move avatar
      this.setAvatarPosition(target.coords.x, target.coords.y);
      if (!this.isOverview) {
        this.updateCamera(target.camera);
      }

      // Arrival after movement (0.8s)
      setTimeout(() => {
        clearInterval(stepInterval);
        this.isWalking = false;
        this.visitorAvatar.classList.remove('is-walking');

        // Give visitor pass on first reception visit
        if (roomId === 'reception' && !this.hasVisitorPass) {
          this.hasVisitorPass = true;
          this.awardVisitorBadge();
        }

        // Trigger NPC interaction
        if (target.npc) {
          this.audio.playChime();
          this.openDialogue(target.npc);
        }
      }, 820);
    }

    awardVisitorBadge() {
      if (this.visitorPassToast) {
        this.visitorPassToast.classList.add('is-show');
        setTimeout(() => {
          this.visitorPassToast.classList.remove('is-show');
        }, 5000);
      }
    }

    openDialogue(npc) {
      if (!this.dialogueOverlay) return;

      this.speakerName.textContent = npc.name;
      this.speakerRole.textContent = npc.role;
      this.speakerImg.src = npc.avatar;
      this.dialogueBody.textContent = '';
      this.dialogueChoices.innerHTML = '';

      this.dialogueOverlay.classList.add('is-visible');

      // Typewriter text effect
      const text = npc.initialDialog;
      let i = 0;
      const typeSpeed = 16;
      const typeInterval = setInterval(() => {
        if (i < text.length) {
          this.dialogueBody.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(typeInterval);
          this.renderChoices(npc.choices);
        }
      }, typeSpeed);
    }

    renderChoices(choices) {
      if (!this.dialogueChoices || !choices) return;
      this.dialogueChoices.innerHTML = '';

      choices.forEach(c => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        if (c.action === 'open_hire' || c.targetRoom === 'boss') btn.classList.add('primary');
        btn.textContent = c.text;

        btn.addEventListener('click', () => {
          this.audio.playBlip();
          if (c.targetRoom) {
            this.goToRoom(c.targetRoom);
          } else if (c.action === 'open_project') {
            this.showProjectModal(c.projectId);
          } else if (c.action === 'open_hire') {
            this.openHireModal();
          } else if (c.action === 'download_resume') {
            this.downloadResume();
          } else if (c.action === 'show_contact') {
            this.showContactPrompt();
          } else if (c.action === 'show_credentials') {
            this.showCredentialsPrompt();
          } else if (c.action === 'show_skills') {
            this.showSkillsPrompt();
          } else if (c.action === 'show_lounge_info') {
            this.showLoungePrompt();
          }
        });

        this.dialogueChoices.appendChild(btn);
      });
    }

    closeDialogue() {
      if (this.dialogueOverlay) {
        this.dialogueOverlay.classList.remove('is-visible');
      }
    }

    showProjectModal(projId) {
      const proj = PROJECTS_DATA[projId];
      if (!proj || !this.projectModal) return;

      document.getElementById('projectModalTitle').textContent = proj.title;
      document.getElementById('projectModalCategory').textContent = proj.category;
      document.getElementById('projectModalDesc').textContent = proj.desc;
      document.getElementById('projectModalImg').src = proj.img;

      const linkBtn = document.getElementById('projectModalLink');
      if (linkBtn) {
        linkBtn.href = proj.link;
        linkBtn.textContent = proj.linkText;
        if (proj.link.startsWith('http')) {
          linkBtn.setAttribute('target', '_blank');
          linkBtn.setAttribute('rel', 'noopener noreferrer');
        } else {
          linkBtn.removeAttribute('target');
        }
      }

      this.projectModal.classList.add('is-open');
    }

    closeProjectModal() {
      if (this.projectModal) {
        this.projectModal.classList.remove('is-open');
      }
    }

    openHireModal() {
      if (this.hireModal) {
        this.hireModal.classList.add('is-open');
      }
    }

    closeHireModal() {
      if (this.hireModal) {
        this.hireModal.classList.remove('is-open');
      }
    }

    downloadResume() {
      const link = document.createElement('a');
      link.href = 'assets/Mayank_Singh_Sadudia_Resume.pdf';
      link.download = 'Mayank_Singh_Sadudia_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.dialogueBody.textContent = "Downloaded Mayank's Official Resume CV! Is there anything else you'd like to collaborate on?";
    }

    showContactPrompt() {
      this.dialogueBody.textContent = "You can reach Mayank directly: Phone/WhatsApp at +91 7977519636, Email at mayanksadudia@gmail.com, or connect on LinkedIn (linkedin.com/in/mayank-singh-sadudia-45637627b).";
      this.renderChoices([
        { text: "💼 Open Hire & Project Inquiry Form", action: 'open_hire' },
        { text: "📥 Download Resume CV (PDF)", action: 'download_resume' },
        { text: "🔄 Explore Other Cabins", targetRoom: 'reception' }
      ]);
    }

    showCredentialsPrompt() {
      this.dialogueBody.textContent = "🎓 Academic Qualifications:\n• MCA: Computer Application (2024) — IPS Academy, Indore\n• B.Com: Computer Application (2022) — MRSC, Indore\n• Certifications: Certified Python Programmer, Certified Data Analyst, Graphic Design Specialist.";
      this.renderChoices([
        { text: "💻 View Full Tools & Tech", action: 'show_skills' },
        { text: "👑 Visit Boss Mayank in his Cabin", targetRoom: 'boss' }
      ]);
    }

    showSkillsPrompt() {
      this.dialogueBody.textContent = "⚡ Core Technical Capabilities:\n• Data: Python (Pandas, NumPy, Matplotlib), SQL, SQLite, Power BI, Advanced Excel, Tableau\n• Design & 3D: Adobe Photoshop, Illustrator, CorelDraw, SketchUp, Canva, Three.js 3D Web\n• Generative AI: Midjourney, Adobe Firefly, Claude, ChatGPT, Antigravity.";
      this.renderChoices([
        { text: "📊 Check Projects in Data Lab", targetRoom: 'data' },
        { text: "🎨 Check 3D Projects in Creative Studio", targetRoom: 'design' },
        { text: "👑 Talk with Boss Mayank", targetRoom: 'boss' }
      ]);
    }

    showLoungePrompt() {
      this.dialogueBody.textContent = "☕ Welcome to the Central Lounge. Our team meets here daily to coordinate data workflows with creative deliveries. Use the escalators or stairs to reach any department!";
      this.renderChoices([
        { text: "💡 Go to 3D Brainstorm Lounge", targetRoom: 'brainstorm' },
        { text: "📊 Go to Data Analytics Lab", targetRoom: 'data' },
        { text: "👑 Meet Boss Mayank", targetRoom: 'boss' }
      ]);
    }
  }

  // Initialize on DOM load
  window.addEventListener('DOMContentLoaded', () => {
    window.isometricOffice = new IsometricOffice();
  });

})();
