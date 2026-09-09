document.addEventListener('DOMContentLoaded', function () {
    // === AOS (Animate on Scroll) ===
    if (typeof AOS !== 'undefined') {
        AOS.init({
            offset: 40,
            duration: 750,
            once: true,
            easing: 'ease-out-cubic'
        });
    }

    // === Typed.js with Vintage Elegant Styling ===
    const typedElement = document.querySelector('.typed-text');
    if (typedElement && typeof Typed !== 'undefined') {
        new Typed('.typed-text', {
            strings: ['Data Analyst', 'Insight Catalyst', 'Data Integrator', 'BI Specialist'],
            typeSpeed: 65,
            backSpeed: 30,
            backDelay: 1900,
            startDelay: 400,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            smartBackspace: true
        });
    }

    // === Navbar Scroll Shadow & Blur Effect ===
    const navbar = document.getElementById('main-nav');
    const handleScroll = () => {
        if (window.scrollY > 20) {
            navbar?.classList.add('shadow-sm', 'bg-[#FAF7F2]/95');
            navbar?.classList.remove('bg-[#FAF7F2]/80');
        } else {
            navbar?.classList.remove('shadow-sm', 'bg-[#FAF7F2]/95');
            navbar?.classList.add('bg-[#FAF7F2]/80');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // === Mobile Drawer Menu Toggle (Smooth Slide & Backdrop) ===
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileBackdrop = document.getElementById('mobile-backdrop');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    const toggleMenu = (open) => {
        if (!mobileMenu || !mobileDrawer) return;
        if (open) {
            mobileMenu.classList.remove('pointer-events-none', 'opacity-0', 'invisible');
            mobileMenu.classList.add('pointer-events-auto', 'opacity-100', 'visible');
            mobileMenu.setAttribute('aria-hidden', 'false');
            mobileDrawer.classList.remove('translate-x-full');
            mobileDrawer.classList.add('translate-x-0');
            document.body.style.overflow = 'hidden';
        } else {
            mobileDrawer.classList.remove('translate-x-0');
            mobileDrawer.classList.add('translate-x-full');
            mobileMenu.classList.remove('pointer-events-auto', 'opacity-100', 'visible');
            mobileMenu.classList.add('pointer-events-none', 'opacity-0');
            mobileMenu.setAttribute('aria-hidden', 'true');
            setTimeout(() => {
                if (mobileMenu.classList.contains('opacity-0')) {
                    mobileMenu.classList.add('invisible');
                }
            }, 300);
            document.body.style.overflow = '';
        }
    };

    mobileMenuBtn?.addEventListener('click', () => toggleMenu(true));
    mobileMenuClose?.addEventListener('click', () => toggleMenu(false));
    mobileBackdrop?.addEventListener('click', () => toggleMenu(false));
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('opacity-0')) {
            toggleMenu(false);
        }
    });

    // === Skill Category Tabs ===
    const skillTabButtons = document.querySelectorAll('.skill-tab-btn');
    const skillPanes = document.querySelectorAll('.skill-tab-pane');

    skillTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.dataset.tab;
            
            skillTabButtons.forEach(btn => {
                btn.classList.remove('bg-white', 'text-sage-800', 'shadow-2xs', 'font-semibold', 'border-vintage-200');
                btn.classList.add('text-ink-600', 'hover:text-ink-900');
            });
            button.classList.remove('text-ink-600', 'hover:text-ink-900');
            button.classList.add('bg-white', 'text-sage-800', 'shadow-2xs', 'font-semibold', 'border-vintage-200');

            skillPanes.forEach(pane => {
                if (pane.id === target) {
                    pane.classList.remove('hidden');
                    pane.classList.add('grid');
                } else {
                    pane.classList.add('hidden');
                    pane.classList.remove('grid');
                }
            });
        });
    });

    // === Accordion: Education & Experience ===
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');
    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', function () {
            const parent = this.closest('.accordion-item');
            if (!parent) return;

            const isOpen = parent.classList.contains('accordion-open');
            const icon = this.querySelector('.accordion-icon');

            if (isOpen) {
                parent.classList.remove('accordion-open');
                if (icon) icon.style.transform = 'rotate(0deg)';
            } else {
                parent.classList.add('accordion-open');
                if (icon) icon.style.transform = 'rotate(180deg)';
            }
        });
    });

    // === Project Filter & Pagination ===
    const projectCards = Array.from(document.querySelectorAll('.project-card'));
    const itemsPerPage = 3;
    let currentProjectPage = 1;
    let currentCategory = 'all';

    const filterButtons = document.querySelectorAll('.project-filter-btn');

    const updateProjects = () => {
        const filtered = projectCards.filter(card => {
            if (currentCategory === 'all') return true;
            const category = card.dataset.category || '';
            return category.toLowerCase().includes(currentCategory.toLowerCase());
        });

        const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
        if (currentProjectPage > totalPages) currentProjectPage = totalPages;

        projectCards.forEach(card => {
            card.classList.add('hidden');
            card.classList.remove('flex');
        });

        const startIndex = (currentProjectPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        filtered.slice(startIndex, endIndex).forEach(card => {
            card.classList.remove('hidden');
            card.classList.add('flex');
        });

        const pageIndicator = document.getElementById('pageIndicator');
        if (pageIndicator) pageIndicator.textContent = `${currentProjectPage} / ${totalPages}`;

        const prevBtn = document.getElementById('prevPage');
        if (prevBtn) {
            prevBtn.disabled = currentProjectPage === 1;
            prevBtn.classList.toggle('opacity-40', currentProjectPage === 1);
            prevBtn.classList.toggle('cursor-not-allowed', currentProjectPage === 1);
        }

        const nextBtn = document.getElementById('nextPage');
        if (nextBtn) {
            nextBtn.disabled = currentProjectPage === totalPages;
            nextBtn.classList.toggle('opacity-40', currentProjectPage === totalPages);
            nextBtn.classList.toggle('cursor-not-allowed', currentProjectPage === totalPages);
        }
    };

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            currentCategory = btn.dataset.filter || 'all';
            currentProjectPage = 1;

            filterButtons.forEach(b => {
                b.classList.remove('bg-sage-700', 'text-vintage-50', 'shadow-2xs');
                b.classList.add('bg-white', 'text-ink-700', 'hover:bg-vintage-100');
            });
            btn.classList.remove('bg-white', 'text-ink-700', 'hover:bg-vintage-100');
            btn.classList.add('bg-sage-700', 'text-vintage-50', 'shadow-2xs');

            updateProjects();
        });
    });

    document.getElementById('prevPage')?.addEventListener('click', () => {
        if (currentProjectPage > 1) {
            currentProjectPage--;
            updateProjects();
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    document.getElementById('nextPage')?.addEventListener('click', () => {
        const filtered = projectCards.filter(card => {
            if (currentCategory === 'all') return true;
            return (card.dataset.category || '').toLowerCase().includes(currentCategory.toLowerCase());
        });
        const totalPages = Math.ceil(filtered.length / itemsPerPage);
        if (currentProjectPage < totalPages) {
            currentProjectPage++;
            updateProjects();
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    updateProjects();

    // === Certification Pagination ===
    const certCards = Array.from(document.querySelectorAll('.certification-card'));
    const certItemsPerPage = 3;
    let currentCertPage = 1;

    const updateCertifications = () => {
        const totalCertPages = Math.max(1, Math.ceil(certCards.length / certItemsPerPage));
        if (currentCertPage > totalCertPages) currentCertPage = totalCertPages;

        certCards.forEach((card, index) => {
            const isVisible = index >= (currentCertPage - 1) * certItemsPerPage && index < currentCertPage * certItemsPerPage;
            if (isVisible) {
                card.classList.remove('hidden');
                card.classList.add('flex');
            } else {
                card.classList.add('hidden');
                card.classList.remove('flex');
            }
        });

        const certPageIndicator = document.getElementById('certPageIndicator');
        if (certPageIndicator) certPageIndicator.textContent = `${currentCertPage} / ${totalCertPages}`;

        const prevCertBtn = document.getElementById('prevCertPage');
        if (prevCertBtn) {
            prevCertBtn.disabled = currentCertPage === 1;
            prevCertBtn.classList.toggle('opacity-40', currentCertPage === 1);
            prevCertBtn.classList.toggle('cursor-not-allowed', currentCertPage === 1);
        }

        const nextCertBtn = document.getElementById('nextCertPage');
        if (nextCertBtn) {
            nextCertBtn.disabled = currentCertPage === totalCertPages;
            nextCertBtn.classList.toggle('opacity-40', currentCertPage === totalCertPages);
            nextCertBtn.classList.toggle('cursor-not-allowed', currentCertPage === totalCertPages);
        }
    };

    document.getElementById('prevCertPage')?.addEventListener('click', () => {
        if (currentCertPage > 1) {
            currentCertPage--;
            updateCertifications();
            document.getElementById('certification')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    document.getElementById('nextCertPage')?.addEventListener('click', () => {
        const totalCertPages = Math.ceil(certCards.length / certItemsPerPage);
        if (currentCertPage < totalCertPages) {
            currentCertPage++;
            updateCertifications();
            document.getElementById('certification')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    updateCertifications();

    // === Interactive Contact WhatsApp Form ===
    const contactForm = document.getElementById('quick-contact-form');
    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('sender-name');
        const msgInput = document.getElementById('sender-message');
        const name = nameInput ? nameInput.value.trim() : '';
        const message = msgInput ? msgInput.value.trim() : '';

        const text = encodeURIComponent(`Halo Haris, saya ${name || 'rekan'}.\n\n${message || 'Saya ingin berdiskusi terkait project data analytics.'}`);
        window.open(`https://wa.me/6285892640801?text=${text}`, '_blank');
    });
});
