/**
 * VIKAS.ELITE // Master Orchestration Engine
 * Handles Navigation, Theme Switcher, Typing Effects, HUD Telemetry, and Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHUDClock();
  initTypingEffect();
  initCounters();
  initThemeSwitcher();
  initAudioToggle();
  initSkillsFilter();
  initProjectModal();
  initContactForm();
  initInstaFollowers();
  initScrollSmoothEffects();
  initMatrixRain();
});

// 1. NAVBAR & SCROLL SPY
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll spy
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      if (window.cyberAudio) window.cyberAudio.playClick();
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        if (window.cyberAudio) window.cyberAudio.playClick();
      });
    });
  }
}

// 2. HUD SYSTEM CLOCK
function initHUDClock() {
  const clockEl = document.getElementById('hud-clock');
  if (!clockEl) return;

  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockEl.textContent = `${hours}:${minutes}:${seconds} IST`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

// 3. TYPING EFFECT IN HERO
function initTypingEffect() {
  const target = document.getElementById('hero-typing-text');
  if (!target) return;

  const phrases = [
    "B.Tech 2nd Year CYBERSECURITY Specialist @ CVRCE",
    "Digital Influencer & Tech Content Creator",
    "Ethical Hacker & Defensive System Architect",
    "Official Instagram: @gt__vickey | 485 Followers",
    "Content Page: @vickey_theelite",
    "Pur Sport Hypercar & Security Enthusiast"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 75;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      target.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      target.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 75;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 2200; // Pause at end of phrase
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500; // Pause before typing next phrase
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

// 4. ANIMATED STATS COUNTERS
function initCounters() {
  const counters = document.querySelectorAll('.stat-count');
  let animated = false;

  function runCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const increment = target / 60;

      const updateCount = () => {
        count += increment;
        if (count < target) {
          counter.textContent = Math.ceil(count);
          requestAnimationFrame(updateCount);
        } else {
          counter.textContent = target;
        }
      };

      updateCount();
    });
  }

  window.addEventListener('scroll', () => {
    const heroSection = document.getElementById('hero');
    if (!heroSection || animated) return;

    const rect = heroSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      animated = true;
      runCounters();
    }
  });

  // Run on start
  setTimeout(runCounters, 300);
}

// 5. COLOR THEMES SWITCHER (7 HIGH-DEFINITION CYBER PALETTES)
const THEME_CONFIG = {
  violet: {
    dataTheme: null,
    p3d: 0xc084fc,
    s3d: 0xfbbf24,
    matrixColor: '#c084fc'
  },
  matrix: {
    dataTheme: 'matrix',
    p3d: 0x00ff9d,
    s3d: 0x00e5ff,
    matrixColor: '#00ff9d'
  },
  cyan: {
    dataTheme: 'cyan',
    p3d: 0x00e5ff,
    s3d: 0x3b82f6,
    matrixColor: '#00e5ff'
  },
  amber: {
    dataTheme: 'amber',
    p3d: 0xffaa00,
    s3d: 0xff6b35,
    matrixColor: '#ffaa00'
  },
  crimson: {
    dataTheme: 'crimson',
    p3d: 0xff0055,
    s3d: 0xff5252,
    matrixColor: '#ff0055'
  },
  synthwave: {
    dataTheme: 'synthwave',
    p3d: 0xb026ff,
    s3d: 0x00f0ff,
    matrixColor: '#b026ff'
  },
  emerald: {
    dataTheme: 'emerald',
    p3d: 0x10b981,
    s3d: 0x06b6d4,
    matrixColor: '#10b981'
  }
};

const THEME_KEYS = Object.keys(THEME_CONFIG);

function applyTheme(themeKey, playSound = false) {
  const conf = THEME_CONFIG[themeKey] || THEME_CONFIG.violet;

  if (conf.dataTheme) {
    document.body.setAttribute('data-theme', conf.dataTheme);
  } else {
    document.body.removeAttribute('data-theme');
  }

  // Update active pill button beside ONLINE
  document.querySelectorAll('.color-pill-btn').forEach(btn => {
    if (btn.getAttribute('data-theme-id') === themeKey) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update 3D scenes & matrix rain
  if (typeof updateMatrixColor === 'function') {
    updateMatrixColor(conf.matrixColor);
  }
  if (window.update3DTheme) {
    window.update3DTheme(conf.p3d, conf.s3d);
  }

  // Save to localStorage
  try {
    localStorage.setItem('vikas_cyber_theme', themeKey);
  } catch (err) {}

  if (playSound && window.cyberAudio) {
    window.cyberAudio.playSuccess();
  }
}

function initThemeSwitcher() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  const pillBtns = document.querySelectorAll('.color-pill-btn');

  // Load saved theme or default to violet
  let savedTheme = 'violet';
  try {
    savedTheme = localStorage.getItem('vikas_cyber_theme') || 'violet';
  } catch (e) {}
  
  // Apply initial theme
  applyTheme(savedTheme, false);

  // Click on specific color pill beside ONLINE
  pillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tId = btn.getAttribute('data-theme-id');
      if (tId) applyTheme(tId, true);
    });
  });

  // Cycle button in HUD
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      let currentTheme = localStorage.getItem('vikas_cyber_theme') || 'violet';
      let currentIdx = THEME_KEYS.indexOf(currentTheme);
      if (currentIdx === -1) currentIdx = 0;
      let nextIdx = (currentIdx + 1) % THEME_KEYS.length;
      applyTheme(THEME_KEYS[nextIdx], true);
    });
  }
}

// 6. AUDIO SFX TOGGLE
function initAudioToggle() {
  const audioBtn = document.getElementById('audio-toggle-btn');
  const audioBars = document.querySelector('.audio-bars');

  if (!audioBtn || !window.cyberAudio) return;

  audioBtn.addEventListener('click', () => {
    const isMuted = window.cyberAudio.toggleMute();
    if (isMuted) {
      audioBtn.classList.add('muted');
      if (audioBars) audioBars.classList.remove('audio-playing');
    } else {
      audioBtn.classList.remove('muted');
      if (audioBars) audioBars.classList.add('audio-playing');
      window.cyberAudio.playSuccess();
    }
  });

  // Start animated bars
  if (audioBars) audioBars.classList.add('audio-playing');
}

// 7. SKILLS CATEGORY FILTER
function initSkillsFilter() {
  const filterChips = document.querySelectorAll('.filter-chip');
  const skillCards = document.querySelectorAll('.skill-card');

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });

      if (window.cyberAudio) window.cyberAudio.playClick();
    });
  });
}

// 8. PROJECT DEMO MODAL
function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body-content');

  const projectDetails = {
    'zeroday-sentry': {
      title: 'ZeroDay Sentry // AI-Powered Network Intrusion Detection Engine',
      content: `
        <p style="margin-bottom: 12px; color: var(--text-secondary);">
          ZeroDay Sentry is an automated packet analysis and anomaly detection system trained on synthetic attack datasets (DDoS, SYN Floods, Port Scans, SQLi probes).
        </p>
        <div style="background: rgba(0,0,0,0.4); padding: 12px; border-radius: 6px; font-family: var(--font-mono); font-size: 0.85rem; margin-bottom: 16px;">
          <div style="color: var(--accent-primary);"><i class="fas fa-check-circle"></i> Detection Accuracy: 98.4% on NSL-KDD dataset</div>
          <div style="color: var(--accent-secondary);"><i class="fas fa-microchip"></i> Engine: Scapy + PyTorch + FastAPI</div>
          <div style="color: #fff;"><i class="fas fa-bolt"></i> Live Latency: &lt; 4.2ms packet triage</div>
        </div>
        <p style="color: var(--text-muted); font-size: 0.85rem;">
          Developed as part of Vikas's research at CVR College of Engineering Cyber Labs.
        </p>
      `
    },
    'vanguard-recon': {
      title: 'Vanguard Recon Toolkit // Automated OSINT & Surface Enumeration',
      content: `
        <p style="margin-bottom: 12px; color: var(--text-secondary);">
          A multi-threaded intelligence gathering suite combining sub-domain brute-forcing, certificate transparency search, Shodan service fingerprinting, and DNS zone transfer tests.
        </p>
        <div style="background: rgba(0,0,0,0.4); padding: 12px; border-radius: 6px; font-family: var(--font-mono); font-size: 0.85rem; margin-bottom: 16px;">
          <div style="color: var(--accent-primary);"><i class="fas fa-check-circle"></i> Modules: 14 OSINT micro-scanners</div>
          <div style="color: var(--accent-secondary);"><i class="fas fa-bolt"></i> Multi-threading: Asyncio Python core</div>
          <div style="color: #fff;"><i class="fas fa-file-export"></i> Output: Auto-generated PDF/HTML triage report</div>
        </div>
      `
    },
    'stegoshield': {
      title: 'StegoShield // LSB Steganographic Payload Concealer & Detector',
      content: `
        <p style="margin-bottom: 12px; color: var(--text-secondary);">
          Encodes encrypted binary payloads within high-frequency spatial regions of PNG/WAV containers using Least Significant Bit insertion paired with AES-256 cipher keys.
        </p>
        <div style="background: rgba(0,0,0,0.4); padding: 12px; border-radius: 6px; font-family: var(--font-mono); font-size: 0.85rem;">
          <div style="color: var(--accent-primary);"><i class="fas fa-shield-alt"></i> Encryption: AES-256-CBC + SHA-512 Key derivation</div>
          <div style="color: var(--accent-secondary);"><i class="fas fa-image"></i> Container Support: PNG, BMP, WAV, FLAC</div>
        </div>
      `
    },
    'cvr-cyberlab': {
      title: 'CVR CyberLab Sandbox // 25+ Collegiate CTF Challenges',
      content: `
        <p style="margin-bottom: 12px; color: var(--text-secondary);">
          A tailored vulnerable lab platform built for fellow students at CVR College of Engineering to master web exploits, buffer overflows, and cryptographic puzzles.
        </p>
        <div style="background: rgba(0,0,0,0.4); padding: 12px; border-radius: 6px; font-family: var(--font-mono); font-size: 0.85rem;">
          <div style="color: var(--accent-primary);"><i class="fas fa-flag"></i> Categories: Web, Reverse Eng, Forensics, Pwn, Crypto</div>
          <div style="color: var(--accent-secondary);"><i class="fas fa-users"></i> Student Active Users: 120+ peer hackers</div>
        </div>
      `
    }
  };

  document.querySelectorAll('.open-project-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project');
      const details = projectDetails[projId];

      if (details && modal && modalTitle && modalBody) {
        modalTitle.textContent = details.title;
        modalBody.innerHTML = details.content;
        modal.classList.add('active');
        if (window.cyberAudio) window.cyberAudio.playSuccess();
      }
    });
  });

  if (modalClose && modal) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
      if (window.cyberAudio) window.cyberAudio.playClick();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }
}

// 9. AUTOMATIC WHATSAPP TRANSMISSION DISPATCH FORM
function initContactForm() {
  const form = document.getElementById('cyber-contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');

  if (!form || !submitBtn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectSelect = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');

    const name = nameInput ? nameInput.value.trim() : 'Website Visitor';
    const email = emailInput ? emailInput.value.trim() : 'Not provided';
    const subject = subjectSelect ? subjectSelect.value : 'Cybersecurity Collaboration';
    const message = messageInput ? messageInput.value.trim() : '';

    if (!message) {
      if (messageInput) messageInput.focus();
      return;
    }

    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENCRYPTING & DISPATCHING TO WHATSAPP...';

    if (window.cyberAudio) window.cyberAudio.playKeypress();

    // Destination WhatsApp Number: 7671992956 (+91)
    const whatsappNumber = '917671992956';
    
    // Clean formatted payload for WhatsApp
    const waPayload = 
`🛡️ *VIKAS.ELITE // TRANSMISSION DISPATCH*
━━━━━━━━━━━━━━━━━━
👤 *Sender Name:* ${name}
📧 *Email Address:* ${email}
🎯 *Purpose:* ${subject}
📝 *Encrypted Content:*
${message}
━━━━━━━━━━━━━━━━━━
⚡ Sent from https://vikas-elite.netlify.app`;

    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waPayload)}`;

    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fab fa-whatsapp"></i> OPENING WHATSAPP SECURE CHAT...';
    }, 700);

    setTimeout(() => {
      // Automatically trigger WhatsApp direct message
      window.open(waUrl, '_blank');

      submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> DISPATCHED TO WHATSAPP (+91 7671992956)!';
      submitBtn.style.background = '#25D366';
      submitBtn.style.color = '#000';

      if (window.cyberAudio) window.cyberAudio.playSuccess();
      form.reset();

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.style.color = '';
      }, 4000);
    }, 1400);
  });
}

// 10. INSTAGRAM LIVE FOLLOWER COUNTER & DYNAMIC ACTION
function initInstaFollowers() {
  const followButtons = document.querySelectorAll('.insta-follow-btn');

  followButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const username = btn.getAttribute('data-username');
      const counterId = btn.getAttribute('data-counter');
      const counterEl = document.getElementById(counterId);

      if (btn.classList.contains('followed')) {
        // Open link directly if already followed
        window.open(`https://instagram.com/${username}`, '_blank', 'noopener,noreferrer');
        return;
      }

      // Add 1 to follower counter
      if (counterEl) {
        let currentCount = parseInt(counterEl.textContent.replace(/,/g, ''), 10) || 0;
        let newCount = currentCount + 1;
        counterEl.textContent = newCount.toLocaleString();
        counterEl.style.color = '#00ff9d';
        counterEl.style.transform = 'scale(1.25)';
        counterEl.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => {
          counterEl.style.transform = 'scale(1)';
        }, 300);
      }

      // Update button state
      btn.classList.add('followed');
      btn.style.background = 'linear-gradient(135deg, rgba(0, 255, 157, 0.25), rgba(0, 229, 255, 0.25))';
      btn.style.borderColor = 'var(--accent-primary)';
      btn.style.color = 'var(--accent-primary)';
      const label = btn.querySelector('.follow-label') || btn;
      label.innerHTML = `<i class="fas fa-check"></i> Following @${username} (Opening...)`;

      if (window.cyberAudio) window.cyberAudio.playSuccess();

      // Open Instagram profile in new tab after a brief feedback moment
      setTimeout(() => {
        window.open(`https://instagram.com/${username}`, '_blank', 'noopener,noreferrer');
        label.innerHTML = `<i class="fas fa-check"></i> Following @${username}`;
      }, 700);
    });
  });
}

// 11. SCROLL SMOOTH EFFECTS & BIG LETTER HIGHLIGHT
function initScrollSmoothEffects() {
  // A. Profile Big Title Glowing Highlight on Scroll
  const profileTitle = document.querySelector('.profile-big-title');
  if (profileTitle && 'IntersectionObserver' in window) {
    const profileObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          profileTitle.classList.add('scrolled-in');
        } else {
          profileTitle.classList.remove('scrolled-in');
        }
      });
    }, { threshold: 0.35 });
    profileObserver.observe(profileTitle);
  }

  // B. Staggered Smooth Reveal for 5 Informations
  const infoBlocks = document.querySelectorAll('.scroll-stagger-info');
  if (infoBlocks.length > 0 && 'IntersectionObserver' in window) {
    const staggerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.15 });

    infoBlocks.forEach(block => staggerObserver.observe(block));
  }
}

// 12. MATRIX RAIN EFFECT (High DPI & Dynamic Theme Sync)
let matrixRainColor = '#c084fc';

function updateMatrixColor(color) {
  matrixRainColor = color;
}

function initMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(dpr, dpr);
  }
  resize();

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+-/<>~ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ';
  const fontSize = 14;
  const columns = Math.floor(window.innerWidth / fontSize);
  const drops = Array(columns).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(5, 8, 14, 0.08)';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    ctx.fillStyle = matrixRainColor;
    ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > window.innerHeight && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 35);
  window.addEventListener('resize', resize);
}

