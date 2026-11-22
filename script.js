/**
 * LIZAM — INTERATIVIDADE INDUSTRIAL & APPLE CRAFT
 * Funcionalidades: Expanding Center-Stage, Apple Segmented Filter, Lightbox Sheet, Sticky Glass
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Ano dinâmico no copyright
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Menu Mobile Acessível
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.getElementById('menu-principal');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Fechar ao clicar em qualquer link
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Header com Liquid Glass ao rolar a página
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // 4. Expanding Center-Stage Visual Block (Skill Editorial Minimalist)
  const stageFrame = document.getElementById('centerStageFrame');
  const stageToggleBtn = document.getElementById('stageToggleBtn');
  const stageBtnText = document.getElementById('stageBtnText');

  let isManualExpanded = false;

  if (stageFrame) {
    // Expansão dinâmica por scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking && !isManualExpanded) {
        window.requestAnimationFrame(() => {
          const rect = stageFrame.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          if (rect.top < windowHeight && rect.bottom > 0) {
            const progress = Math.min(Math.max((windowHeight - rect.top) / (windowHeight + rect.height * 0.7), 0), 1);
            const widthPercent = 90 + (progress * 10); // Expande de 90% a 100% suavemente
            stageFrame.style.width = `${widthPercent}%`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    // Alternância manual pelo botão Apple Style
    if (stageToggleBtn && stageBtnText) {
      stageToggleBtn.addEventListener('click', () => {
        isManualExpanded = !isManualExpanded;
        if (isManualExpanded) {
          stageFrame.style.width = '100%';
          stageFrame.classList.add('expanded');
          stageBtnText.textContent = 'Modo Compacto';
        } else {
          stageFrame.style.width = '90%';
          stageFrame.classList.remove('expanded');
          stageBtnText.textContent = 'Modo Expandido';
        }
      });
    }
  }

  // 5. Filtro de Serviços — Apple Segmented Control
  const filterButtons = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.transition = 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 6. Lightbox Apple (Sheet Style) para Galeria de Peças
  const modal = document.getElementById('appleModal');
  const modalImg = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (modal && modalImg && modalTitle) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const src = item.getAttribute('data-src');
        const title = item.getAttribute('data-title');
        modalImg.src = src;
        modalTitle.textContent = title;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeModal = () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    modalCloseBtn?.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
      }
    });
  }

  // 7. Scroll Reveal com IntersectionObserver (Suave e Progressivo)
  const fadeElements = document.querySelectorAll('.fade-in-up');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
  } else {
    fadeElements.forEach(el => el.classList.add('visible'));
  }

  // 8. Destaque dinâmico de links de navegação ativa
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
});
