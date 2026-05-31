/**
 * programacion-imso.js
 * Comportamento interactivo para a programación MP0369 IMSO
 */
(function() {
  'use strict';

  /* ── Tabs por UD ─────────────────────────────────── */
  function initTabs() {
    document.querySelectorAll('.ud-tab-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var tabId = this.dataset.tab;
        var udId  = this.dataset.ud;

        // Desactivar todos os tabs da mesma UD
        var accordion = this.closest('.ud-accordion-body') || this.closest('.ud-accordion') || document.body;
        accordion.querySelectorAll('.ud-tab-btn[data-ud="' + udId + '"]').forEach(function(b) {
          b.classList.remove('active');
        });
        accordion.querySelectorAll('.ud-tab-panel[data-ud="' + udId + '"]').forEach(function(p) {
          p.classList.remove('active');
        });

        // Activar o tab clicado
        this.classList.add('active');
        var panel = document.getElementById(tabId);
        if (panel) {
          panel.classList.add('active');
        }
      });
    });
  }

  /* ── Acordeón de actividades ─────────────────────── */
  function initActividades() {
    document.querySelectorAll('.actividad-header').forEach(function(header) {
      header.addEventListener('click', function() {
        var card = this.closest('.actividad-card');
        var body = card.querySelector('.actividad-body');
        var arrow = this.querySelector('.act-arrow');
        var isOpen = body.classList.contains('open');

        if (isOpen) {
          body.classList.remove('open');
          this.classList.remove('open');
          if (arrow) arrow.style.transform = '';
        } else {
          body.classList.add('open');
          this.classList.add('open');
          if (arrow) arrow.style.transform = 'rotate(180deg)';
        }
      });
    });

    // Abrir a primeira actividade de cada UD por defecto
    document.querySelectorAll('.ud-tab-panel').forEach(function(panel) {
      var firstCard = panel.querySelector('.actividad-card');
      if (firstCard) {
        var body  = firstCard.querySelector('.actividad-body');
        var hdr   = firstCard.querySelector('.actividad-header');
        var arrow = hdr ? hdr.querySelector('.act-arrow') : null;
        if (body) {
          body.classList.add('open');
          if (hdr)  hdr.classList.add('open');
          if (arrow) arrow.style.transform = 'rotate(180deg)';
        }
      }
    });
  }

  /* ── Animación barras temporais ──────────────────── */
  function animateTimeline() {
    var fills = document.querySelectorAll('.timeline-bar-fill');
    if (!fills.length) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.transform = 'scaleX(1)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    fills.forEach(function(fill) {
      observer.observe(fill);
    });
  }

  /* ── Nav activo no scroll ────────────────────────── */
  function initScrollSpy() {
    var sections = document.querySelectorAll('.prog-section[id]');
    var navLinks  = document.querySelectorAll('.prog-nav a');

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });

    sections.forEach(function(section) {
      observer.observe(section);
    });
  }

  /* ── Botón back to top ───────────────────────────── */
  function initBackToTop() {
    var btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function() {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Navegar dende tarxetas UD overview ──────────── */
  function initOverviewCards() {
    document.querySelectorAll('.ud-overview-card').forEach(function(card) {
      card.addEventListener('click', function() {
        var ud = this.dataset.ud;
        var target = document.getElementById('ud' + ud);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Abrir o details se está pechado
          var details = target.querySelector('details.ud-accordion');
          if (details && !details.open) {
            details.open = true;
          }
        }
      });

      card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    });
  }

  /* ── Suavizar apertura de <details> ──────────────── */
  function initSmoothDetails() {
    document.querySelectorAll('details.ud-accordion').forEach(function(details) {
      details.addEventListener('toggle', function() {
        if (this.open) {
          var body = this.querySelector('.ud-accordion-body');
          if (body) {
            body.style.opacity = '0';
            body.style.transform = 'translateY(8px)';
            requestAnimationFrame(function() {
              body.style.transition = 'opacity 250ms ease, transform 250ms ease';
              body.style.opacity = '1';
              body.style.transform = 'translateY(0)';
            });
          }
        }
      });
    });
  }

  /* ── Init ────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function() {
    initTabs();
    initActividades();
    animateTimeline();
    initScrollSpy();
    initBackToTop();
    initOverviewCards();
    initSmoothDetails();
  });

})();