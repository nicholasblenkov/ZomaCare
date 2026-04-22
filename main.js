/* ZomaCare — Interactions */

(function () {
    'use strict';

    // --- Sticky header shadow ---
    const header = document.getElementById('header');
    let lastScroll = 0;

    function onScroll() {
        const y = window.scrollY;
        header.classList.toggle('scrolled', y > 20);
        lastScroll = y;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // --- Mobile nav ---
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    let overlay = null;

    function openNav() {
        burger.classList.add('open');
        burger.setAttribute('aria-expanded', 'true');
        nav.classList.add('open');

        if (!overlay) {
            overlay = document.createElement('div');
            overlay.style.cssText =
                'position:fixed;inset:0;background:rgba(0,0,0,0.3);z-index:104;opacity:0;transition:opacity .3s';
            overlay.addEventListener('click', closeNav);
        }
        document.body.appendChild(overlay);
        requestAnimationFrame(() => (overlay.style.opacity = '1'));
        document.body.style.overflow = 'hidden';
    }

    function closeNav() {
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        nav.classList.remove('open');
        if (overlay && overlay.parentNode) {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.parentNode && overlay.parentNode.removeChild(overlay), 300);
        }
        document.body.style.overflow = '';
    }

    burger.addEventListener('click', function () {
        nav.classList.contains('open') ? closeNav() : openNav();
    });

    // Close nav on link click
    nav.querySelectorAll('a.nav__link').forEach(function (link) {
        link.addEventListener('click', closeNav);
    });
    nav.querySelectorAll('.nav__sub a').forEach(function (link) {
        link.addEventListener('click', closeNav);
    });

    // --- Dropdown toggles ---
    var dropdowns = document.querySelectorAll('.nav__dropdown');

    dropdowns.forEach(function (dd) {
        var toggle = dd.querySelector('.nav__link--has-sub');
        toggle.addEventListener('click', function (e) {
            e.stopPropagation();
            var isOpen = dd.classList.contains('open');

            dropdowns.forEach(function (other) {
                if (other !== dd) other.classList.remove('open');
            });

            dd.classList.toggle('open', !isOpen);
            toggle.setAttribute('aria-expanded', !isOpen);
        });
    });

    document.addEventListener('click', function () {
        dropdowns.forEach(function (dd) {
            dd.classList.remove('open');
            dd.querySelector('.nav__link--has-sub').setAttribute('aria-expanded', 'false');
        });
    });

    // --- Scroll reveal ---
    const reveals = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );

        reveals.forEach(function (el) {
            io.observe(el);
        });
    } else {
        reveals.forEach(function (el) {
            el.classList.add('visible');
        });
    }

    // --- Stagger siblings ---
    document.querySelectorAll('.service-card, .cred-item').forEach(function (el, i) {
        el.style.transitionDelay = (i % 4) * 0.1 + 's';
    });
})();
