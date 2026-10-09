/**
 * MUSTAFA LLC — ENTERPRISE DIGITAL ARCHITECTURE
 * Core Interactive Logic & Dynamic Components
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. Sticky Navigation & Scroll Header
  // =========================================================================
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // =========================================================================
  // 2. Mobile Drawer Navigation
  // =========================================================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const mobileScheduleBtn = document.getElementById('mobileScheduleBtn');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  if (mobileScheduleBtn) {
    mobileScheduleBtn.addEventListener('click', () => {
      closeDrawer();
      openConsultModal();
    });
  }

  // =========================================================================
  // 3. Interactive 3D Perspective Tilt on Hero Card
  // =========================================================================
  const heroTiltCard = document.getElementById('heroTiltCard');
  if (heroTiltCard && window.innerWidth > 992) {
    heroTiltCard.addEventListener('mousemove', (e) => {
      const rect = heroTiltCard.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 12;
      const rotateY = (x / rect.width) * 12;
      heroTiltCard.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    heroTiltCard.addEventListener('mouseleave', () => {
      heroTiltCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  // =========================================================================
  // 4. Animated KPI Counters on Scroll
  // =========================================================================
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsCounted = false;

  const countUpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsCounted) {
        statsCounted = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'), 10);
          const prefix = stat.getAttribute('data-prefix') || '';
          const suffix = stat.getAttribute('data-suffix') || '';
          let count = 0;
          const duration = 1800;
          const stepTime = 25;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;

          const counterInterval = setInterval(() => {
            count += increment;
            if (count >= target) {
              count = target;
              clearInterval(counterInterval);
            }
            stat.textContent = `${prefix}${Math.floor(count)}${suffix}`;
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const heroStatsSection = document.querySelector('.hero-stats');
  if (heroStatsSection) {
    countUpObserver.observe(heroStatsSection);
  }

  // =========================================================================
  // 5. Service Category Filter Tabs
  // =========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterVal = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // =========================================================================
  // 6. Service Deep Dive Specs Modal
  // =========================================================================
  const serviceModal = document.getElementById('serviceDetailModal');
  const closeServiceModal = document.getElementById('closeServiceModal');
  const serviceModalCloseBtn = document.getElementById('serviceModalCloseBtn');
  const serviceModalConsultBtn = document.getElementById('serviceModalConsultBtn');
  const serviceDetailTitle = document.getElementById('serviceDetailTitle');
  const serviceDetailTag = document.getElementById('serviceDetailTag');
  const serviceDetailContent = document.getElementById('serviceDetailContent');
  const openServiceDetailBtns = document.querySelectorAll('.open-service-detail');

  const serviceSpecsData = {
    cloud: {
      tag: 'CLOUD ARCHITECTURE & DEVOPS',
      title: 'Distributed Multi-Cloud Systems Engineering',
      content: `
        <p><strong>Overview:</strong> MUSTAFA LLC architects zero-failure distributed systems across AWS, Google Cloud Platform, and Microsoft Azure, leveraging containerized Kubernetes clusters with automated mesh networking.</p>
        <p><strong>Core Deliverables:</strong></p>
        <ul style="padding-left: 20px; line-height: 1.8;">
          <li>Automated Infrastructure-as-Code (Terraform / Pulumi) with immutable state locking.</li>
          <li>Multi-region active-active cluster topology with sub-second failover.</li>
          <li>FinOps continuous cloud cost telemetry and rightsizing (achieving 30-45% average run-rate cost reductions).</li>
          <li>Zero-downtime blue/green and canary deployments powered by ArgoCD & GitOps.</li>
        </ul>
        <p><strong>Engagement Profile:</strong> Tailored for high-growth tech platforms, financial trading desks, and enterprises transitioning legacy monoliths.</p>
      `
    },
    ai: {
      tag: 'ENTERPRISE AI & AUTOMATION',
      title: 'Agentic Workflows & Proprietary LLM Orchestration',
      content: `
        <p><strong>Overview:</strong> Transform unstructured organizational data into high-accuracy autonomous intelligence engines built within your sovereign enterprise security perimeter.</p>
        <p><strong>Core Deliverables:</strong></p>
        <ul style="padding-left: 20px; line-height: 1.8;">
          <li>Retrieval-Augmented Generation (RAG) with hybrid dense/sparse vector search and re-ranking.</li>
          <li>Autonomous multi-agent orchestration for complex multi-step workflows.</li>
          <li>Fine-tuned open-source LLMs (Llama 3, DeepSeek, Mistral) hosted locally on dedicated GPU clusters.</li>
          <li>Strict hallucination prevention guards and prompt injection defenses.</li>
        </ul>
        <p><strong>Impact:</strong> Reduces repetitive human cognitive workloads by up to 70% while preserving total data ownership.</p>
      `
    },
    strategy: {
      tag: 'EXECUTIVE ADVISORY',
      title: 'Digital Transformation & Architectural Governance',
      content: `
        <p><strong>Overview:</strong> Strategic advisory for executive boards, CTOs, and CIOs seeking clarity, operational velocity, and technical risk reduction.</p>
        <p><strong>Core Deliverables:</strong></p>
        <ul style="padding-left: 20px; line-height: 1.8;">
          <li>Comprehensive Architecture Review & Technical Debt Remediation Roadmap.</li>
          <li>Mergers & Acquisitions (M&A) technical diligence and consolidation roadmap.</li>
          <li>Fractional CTO/CISO leadership and executive engineering coaching.</li>
          <li>Technology vendor evaluation and contract optimization.</li>
        </ul>
        <p><strong>Outcome:</strong> Boardroom alignment, compressed product release cycles, and defensible technology roadmaps.</p>
      `
    },
    security: {
      tag: 'ZERO-TRUST CYBERSECURITY',
      title: 'Enterprise Cyber Resilience & Continuous Compliance',
      content: `
        <p><strong>Overview:</strong> Comprehensive defense-in-depth architecture designed to withstand state-sponsored threats, ransomware vectors, and insider privilege abuse.</p>
        <p><strong>Core Deliverables:</strong></p>
        <ul style="padding-left: 20px; line-height: 1.8;">
          <li>Zero-Trust Network Access (ZTNA) with cryptographic mutual TLS microsegmentation.</li>
          <li>Automated compliance monitors for SOC 2 Type II, ISO 27001, HIPAA, and GDPR.</li>
          <li>Identity Governance and Administration (IGA) with ephemeral just-in-time access keys.</li>
          <li>Red Team adversarial penetration testing and simulated disaster recovery drills.</li>
        </ul>
        <p><strong>Guarantee:</strong> 100% audit readiness and immutable audit trail logging.</p>
      `
    }
  };

  openServiceDetailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceKey = btn.getAttribute('data-service') || 'cloud';
      const data = serviceSpecsData[serviceKey] || serviceSpecsData.cloud;
      serviceDetailTag.textContent = data.tag;
      serviceDetailTitle.textContent = data.title;
      serviceDetailContent.innerHTML = data.content;
      serviceModal.classList.add('open');
      serviceModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeServiceDetails() {
    serviceModal.classList.remove('open');
    serviceModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (closeServiceModal) closeServiceModal.addEventListener('click', closeServiceDetails);
  if (serviceModalCloseBtn) serviceModalCloseBtn.addEventListener('click', closeServiceDetails);
  if (serviceModalConsultBtn) {
    serviceModalConsultBtn.addEventListener('click', () => {
      closeServiceDetails();
      openConsultModal();
    });
  }

  // =========================================================================
  // 7. Interactive Telemetry Waveform Canvas & Live Metrics
  // =========================================================================
  const canvas = document.getElementById('telemetryCanvas');
  const metricThroughput = document.getElementById('metricThroughput');
  const metricLatency = document.getElementById('metricLatency');
  const simulateLoadBtn = document.getElementById('simulateLoadBtn');
  const consoleLogs = document.getElementById('consoleLogs');

  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width;
    let height = canvas.height;
    let step = 0;
    let loadMultiplier = 1;

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      width = rect.width;
      height = rect.height;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function drawWave() {
      ctx.clearRect(0, 0, width, height);

      // Grid Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Sine Wave 1 (Cyan)
      ctx.beginPath();
      ctx.lineWidth = 2.5;
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, '#00f2fe');
      gradient.addColorStop(0.5, '#4facfe');
      gradient.addColorStop(1, '#9d4edd');
      ctx.strokeStyle = gradient;

      for (let x = 0; x < width; x++) {
        const y = height / 2 +
          Math.sin((x * 0.035) + step) * 22 * loadMultiplier +
          Math.sin((x * 0.08) - step * 1.5) * 8 * loadMultiplier;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Soft glow fill under curve
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      const fillGrad = ctx.createLinearGradient(0, height / 2, 0, height);
      fillGrad.addColorStop(0, 'rgba(0, 242, 254, 0.15)');
      fillGrad.addColorStop(1, 'rgba(0, 242, 254, 0)');
      ctx.fillStyle = fillGrad;
      ctx.fill();

      step += 0.045;
      requestAnimationFrame(drawWave);
    }

    drawWave();

    // Occasional subtle fluctuation
    setInterval(() => {
      if (loadMultiplier === 1) {
        const baseReq = 1428000 + Math.floor(Math.random() * 8500);
        const baseLat = (9.2 + Math.random() * 0.6).toFixed(1);
        if (metricThroughput) metricThroughput.textContent = `${baseReq.toLocaleString()} req/s`;
        if (metricLatency) metricLatency.textContent = `${baseLat} ms`;
      }
    }, 2400);

    // Simulate Load Spike Button
    if (simulateLoadBtn) {
      simulateLoadBtn.addEventListener('click', () => {
        loadMultiplier = 1.85;
        if (metricThroughput) metricThroughput.textContent = '2,185,400 req/s';
        if (metricLatency) metricLatency.textContent = '14.8 ms';

        const now = new Date().toTimeString().split(' ')[0];
        const newLog = document.createElement('div');
        newLog.className = 'log-line';
        newLog.innerHTML = `<span class="log-time">[${now}]</span> <span class="log-tag text-purple">[AUTOSCALE]</span> Dynamic pod surge activated (+64 nodes). Cluster balanced.`;
        consoleLogs.prepend(newLog);

        showToast('Load surge simulation active: Auto-healer rebalanced in 180ms.');

        setTimeout(() => {
          loadMultiplier = 1;
          if (metricThroughput) metricThroughput.textContent = '1,432,100 req/s';
          if (metricLatency) metricLatency.textContent = '9.3 ms';
        }, 4500);
      });
    }
  }

  // =========================================================================
  // 8. Interactive ROI & Project Estimator Widget
  // =========================================================================
  const engagementDomain = document.getElementById('engagementDomain');
  const orgSizeSlider = document.getElementById('orgSizeSlider');
  const orgSizeDisplay = document.getElementById('orgSizeDisplay');
  const velBtns = document.querySelectorAll('.vel-btn');
  const calcEfficiency = document.getElementById('calcEfficiency');
  const calcVelocity = document.getElementById('calcVelocity');
  const calcDowntime = document.getElementById('calcDowntime');
  const calcPayback = document.getElementById('calcPayback');
  const deliverablesList = document.getElementById('deliverablesList');
  const applyProposalBtn = document.getElementById('applyProposalBtn');

  let currentVelocity = 'accelerated';

  const orgLabels = {
    '1': 'Growth (<100 Employees)',
    '2': 'Mid-Market (100 - 500 Employees)',
    '3': 'Large Enterprise (500 - 2,500 Employees)',
    '4': 'Global Fortune 500 (2,500+ Employees)'
  };

  function updateEstimator() {
    const domain = engagementDomain ? engagementDomain.value : 'cloud';
    const size = orgSizeSlider ? orgSizeSlider.value : '2';

    if (orgSizeDisplay) {
      orgSizeDisplay.textContent = orgLabels[size] || 'Mid-Market';
    }

    let eff = 35;
    let vel = 3.0;
    let payback = 3.4;
    let deliverables = [];

    // Base adjustments on domain
    if (domain === 'cloud') {
      eff = 38 + (size * 3);
      vel = 3.2 + (size * 0.3);
      payback = 3.6 - (size * 0.3);
      deliverables = [
        'Dedicated Principal Cloud Solutions Architect',
        'Automated CI/CD Pipeline & Multi-Region Kubernetes Topology',
        'Continuous FinOps Cost Telemetry & Auto-Scaling Rules',
        'Executive Governance Review & 24/7 SLA Handover'
      ];
    } else if (domain === 'ai') {
      eff = 44 + (size * 4);
      vel = 3.8 + (size * 0.4);
      payback = 2.8 - (size * 0.2);
      deliverables = [
        'Lead AI/ML Systems Engineer & RAG Specialist',
        'Proprietary Vector Database & Hybrid Embedding Pipeline',
        'Custom Agentic Automation & Hallucination Guardrails',
        'Secure On-Premises or Private Cloud Model Serving'
      ];
    } else if (domain === 'advisory') {
      eff = 32 + (size * 2);
      vel = 2.8 + (size * 0.2);
      payback = 4.0 - (size * 0.3);
      deliverables = [
        'Fractional Executive Advisory Squad (CTO / Head of Cloud)',
        'Full Enterprise Tech Debt & Microservices Modernization Roadmap',
        'M&A Technical Due Diligence & Platform Consolidation',
        'Organizational Engineering Enablement & Hiring Blueprints'
      ];
    } else if (domain === 'security') {
      eff = 28 + (size * 3);
      vel = 4.2 + (size * 0.2);
      payback = 2.5 - (size * 0.2);
      deliverables = [
        'Principal Cybersecurity & Zero-Trust Architect',
        'SOC 2 Type II, ISO 27001 & HIPAA Automated Compliance Framework',
        'Cryptographic Identity Federation & Microsegmentation',
        'Adversarial Penetration Testing & Threat Incident Playbooks'
      ];
    }

    // Velocity adjustments
    if (currentVelocity === 'sprint') {
      vel = (vel * 1.3).toFixed(1);
      payback = (Math.max(1.8, payback * 0.8)).toFixed(1);
    } else if (currentVelocity === 'enterprise') {
      eff = eff + 6;
      payback = (payback * 1.15).toFixed(1);
    }

    if (calcEfficiency) calcEfficiency.textContent = `+${eff}%`;
    if (calcVelocity) calcVelocity.textContent = `${vel}x`;
    if (calcDowntime) calcDowntime.textContent = '99.99%';
    if (calcPayback) calcPayback.textContent = `${payback} Mo`;

    if (deliverablesList) {
      deliverablesList.innerHTML = deliverables.map(d => `<li>${d}</li>`).join('');
    }
  }

  if (engagementDomain) engagementDomain.addEventListener('change', updateEstimator);
  if (orgSizeSlider) orgSizeSlider.addEventListener('input', updateEstimator);

  velBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      velBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentVelocity = btn.getAttribute('data-vel');
      updateEstimator();
    });
  });

  updateEstimator();

  if (applyProposalBtn) {
    applyProposalBtn.addEventListener('click', () => {
      const selectedDomain = engagementDomain.options[engagementDomain.selectedIndex].text;
      const org = orgLabels[orgSizeSlider.value];
      openConsultModal(`Scope Proposal: ${selectedDomain} for ${org}`);
    });
  }

  // =========================================================================
  // 9. Client Testimonials Carousel
  // =========================================================================
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const carouselDots = document.querySelectorAll('.c-dot');
  const prevBtn = document.getElementById('prevTestimonialBtn');
  const nextBtn = document.getElementById('nextTestimonialBtn');
  let currentTestimonial = 0;
  let carouselInterval;

  function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
      card.classList.toggle('active', i === index);
    });
    carouselDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentTestimonial = index;
  }

  function nextTestimonial() {
    let nextIdx = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(nextIdx);
  }

  function prevTestimonial() {
    let prevIdx = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(prevIdx);
  }

  if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
  if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);

  carouselDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      showTestimonial(idx);
    });
  });

  function startCarouselTimer() {
    carouselInterval = setInterval(nextTestimonial, 7000);
  }

  function stopCarouselTimer() {
    clearInterval(carouselInterval);
  }

  startCarouselTimer();

  const carouselContainer = document.querySelector('.testimonial-carousel-container');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopCarouselTimer);
    carouselContainer.addEventListener('mouseleave', startCarouselTimer);
  }

  // =========================================================================
  // 10. FAQ Accordion
  // =========================================================================
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close other items for single-open experience
      accordionItems.forEach(other => {
        other.classList.remove('open');
        other.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // =========================================================================
  // 11. Discovery Consultation Modal
  // =========================================================================
  const consultModal = document.getElementById('consultModal');
  const closeConsultModal = document.getElementById('closeConsultModal');
  const cancelModalBtn = document.getElementById('cancelModalBtn');
  const openConsultModalBtn = document.getElementById('openConsultModalBtn');
  const heroDiscoveryBtn = document.getElementById('heroDiscoveryBtn');
  const modalBookingForm = document.getElementById('modalBookingForm');
  const modalSuccessState = document.getElementById('modalSuccessState');
  const mDateInput = document.getElementById('mDate');
  const mTopicInput = document.getElementById('mTopic');

  // Set default minimum date to tomorrow
  if (mDateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    mDateInput.min = tomorrow.toISOString().split('T')[0];
    mDateInput.value = tomorrow.toISOString().split('T')[0];
  }

  function openConsultModal(defaultTopic = '') {
    if (mTopicInput && defaultTopic) {
      mTopicInput.value = defaultTopic;
    }
    consultModal.classList.add('open');
    consultModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeConsultModalFn() {
    consultModal.classList.remove('open');
    consultModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Reset state after transition
    setTimeout(() => {
      if (modalSuccessState) modalSuccessState.classList.remove('show');
      if (modalBookingForm) {
        modalBookingForm.reset();
        modalBookingForm.querySelectorAll('.form-field, .modal-actions').forEach(el => el.style.display = '');
      }
    }, 300);
  }

  if (openConsultModalBtn) openConsultModalBtn.addEventListener('click', () => openConsultModal());
  if (heroDiscoveryBtn) heroDiscoveryBtn.addEventListener('click', () => openConsultModal());
  if (closeConsultModal) closeConsultModal.addEventListener('click', closeConsultModalFn);
  if (cancelModalBtn) cancelModalBtn.addEventListener('click', closeConsultModalFn);

  // Close modals on ESC or backdrop click
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (consultModal.classList.contains('open')) closeConsultModalFn();
      if (serviceModal.classList.contains('open')) closeServiceDetails();
      if (mobileDrawer.classList.contains('open')) closeDrawer();
    }
  });

  [consultModal, serviceModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        if (modal === consultModal) closeConsultModalFn();
        if (modal === serviceModal) closeServiceDetails();
      }
    });
  });

  // Modal Booking Submit
  if (modalBookingForm) {
    modalBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const mName = document.getElementById('mName').value;
      const mDate = document.getElementById('mDate').value;
      const mSlot = document.getElementById('mSlot').value;

      // Hide fields and show success state
      modalBookingForm.querySelectorAll('.form-group-row, .form-field, .modal-actions').forEach(el => el.style.display = 'none');
      const modalSuccessDetail = document.getElementById('modalSuccessDetail');
      if (modalSuccessDetail) {
        modalSuccessDetail.textContent = `Confirmed for ${mName} on ${mDate} at ${mSlot}. An encrypted calendar invitation and executive briefing document have been sent.`;
      }
      modalSuccessState.classList.add('show');
      showToast('Discovery Session Reserved! Check your inbox.');
    });
  }

  // =========================================================================
  // 12. Contact Form with Real-Time Validation & Async Simulation
  // =========================================================================
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('contactSubmitBtn');
  const formSuccess = document.getElementById('formSuccessMessage');

  if (contactForm) {
    const nameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('workEmail');
    const companyInput = document.getElementById('companyName');
    const briefInput = document.getElementById('projectBrief');

    function validateField(input, errorId) {
      const field = input.closest('.form-field');
      const val = input.value.trim();
      let isValid = true;

      if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(val);
      } else {
        isValid = val.length >= 2;
      }

      if (!isValid) {
        field.classList.add('invalid');
      } else {
        field.classList.remove('invalid');
      }
      return isValid;
    }

    [nameInput, emailInput, companyInput, briefInput].forEach(inp => {
      if (inp) {
        inp.addEventListener('input', () => {
          if (inp.closest('.form-field').classList.contains('invalid')) {
            validateField(inp);
          }
        });
      }
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateField(nameInput);
      const isEmailValid = validateField(emailInput);
      const isCompanyValid = validateField(companyInput);
      const isBriefValid = validateField(briefInput);

      if (!isNameValid || !isEmailValid || !isCompanyValid || !isBriefValid) {
        showToast('Please verify all required fields.');
        return;
      }

      // Simulate loading state
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        contactForm.reset();
        formSuccess.classList.add('show');
        showToast('Enterprise brief transmitted successfully! Partner response in < 4 hours.');

        setTimeout(() => {
          formSuccess.classList.remove('show');
        }, 10000);
      }, 1200);
    });
  }

  // =========================================================================
  // 13. Newsletter Form
  // =========================================================================
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterToast = document.getElementById('newsletterToast');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      newsletterToast.classList.add('show');
      newsletterForm.reset();
      showToast('Subscribed to MUSTAFA LLC Executive Brief.');
      setTimeout(() => {
        newsletterToast.classList.remove('show');
      }, 4500);
    });
  }

  // =========================================================================
  // 14. Toast Notification Manager
  // =========================================================================
  const toastPopup = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer;

  function showToast(msg) {
    if (!toastPopup || !toastMessage) return;
    toastMessage.textContent = msg;
    toastPopup.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastPopup.classList.remove('show');
    }, 4000);
  }

  // Legal Links Modal Preview
  ['privacyPolicyLink', 'termsLink', 'securityWhitepaperLink'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        showToast(`${el.textContent} is archived and available upon signed enterprise engagement.`);
      });
    }
  });

});
