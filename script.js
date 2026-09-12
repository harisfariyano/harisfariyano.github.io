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
            navbar?.classList.add('shadow-sm', 'is-scrolled');
        } else {
            navbar?.classList.remove('shadow-sm', 'is-scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // === Theme Engine: Dark Mode & System Preference ===
    const THEME_STORAGE_KEY = 'portfolio-theme';
    const themeDropdownContainer = document.getElementById('theme-dropdown-container');
    const themeMenuBtn = document.getElementById('theme-menu-btn');
    const themeDropdownMenu = document.getElementById('theme-dropdown-menu');
    const themeOptionBtns = document.querySelectorAll('.theme-option-btn');
    const mobileThemeBtns = document.querySelectorAll('.mobile-theme-btn');
    const mobileQuickThemeBtn = document.getElementById('mobile-quick-theme-btn');
    const themeActiveIcon = document.getElementById('theme-active-icon');
    const mobileQuickThemeIcon = document.getElementById('mobile-quick-theme-icon');
    const mobileThemeStatusText = document.getElementById('mobile-theme-status-text');

    const getStoredTheme = () => {
        return localStorage.getItem(THEME_STORAGE_KEY) || 'system';
    };

    const getSystemPrefersDark = () => {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    };

    const updateThemeUI = (theme) => {
        const isDark = theme === 'dark' || (theme === 'system' && getSystemPrefersDark());

        // Update active class on documentElement
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // Update Desktop active icon
        if (themeActiveIcon) {
            if (theme === 'light') {
                themeActiveIcon.className = 'fas fa-sun text-brass-600 text-xs';
            } else if (theme === 'dark') {
                themeActiveIcon.className = 'fas fa-moon text-sage-600 dark:text-sage-400 text-xs';
            } else {
                themeActiveIcon.className = 'fas fa-desktop text-ink-600 dark:text-ink-400 text-xs';
            }
        }

        // Update Mobile quick button icon
        if (mobileQuickThemeIcon) {
            if (theme === 'light') {
                mobileQuickThemeIcon.className = 'fas fa-sun text-brass-600 text-xs';
            } else if (theme === 'dark') {
                mobileQuickThemeIcon.className = 'fas fa-moon text-sage-600 dark:text-sage-400 text-xs';
            } else {
                mobileQuickThemeIcon.className = 'fas fa-desktop text-ink-600 dark:text-ink-400 text-xs';
            }
        }

        // Update Dropdown checkmarks & active states
        const allChecks = document.querySelectorAll('.theme-check-light, .theme-check-dark, .theme-check-system');
        allChecks.forEach(el => el.classList.add('hidden'));
        const activeCheck = document.querySelector(`.theme-check-${theme}`);
        if (activeCheck) activeCheck.classList.remove('hidden');

        themeOptionBtns.forEach(btn => {
            if (btn.dataset.theme === theme) {
                btn.classList.add('active-theme');
            } else {
                btn.classList.remove('active-theme');
            }
        });

        // Update Mobile Drawer buttons & status text
        mobileThemeBtns.forEach(btn => {
            if (btn.dataset.theme === theme) {
                btn.classList.add('active-theme');
            } else {
                btn.classList.remove('active-theme');
            }
        });

        if (mobileThemeStatusText) {
            if (theme === 'system') {
                mobileThemeStatusText.textContent = `System (${isDark ? 'Dark' : 'Light'})`;
            } else {
                mobileThemeStatusText.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
            }
        }
    };

    let themeTransitionTimer = null;

    const animateThemeIcon = () => {
        if (themeActiveIcon) {
            themeActiveIcon.classList.remove('theme-icon-rotate');
            void themeActiveIcon.offsetWidth;
            themeActiveIcon.classList.add('theme-icon-rotate');
            setTimeout(() => themeActiveIcon.classList.remove('theme-icon-rotate'), 1200);
        }
        if (mobileQuickThemeIcon) {
            mobileQuickThemeIcon.classList.remove('theme-icon-rotate');
            void mobileQuickThemeIcon.offsetWidth;
            mobileQuickThemeIcon.classList.add('theme-icon-rotate');
            setTimeout(() => mobileQuickThemeIcon.classList.remove('theme-icon-rotate'), 1200);
        }
    };

    const applyTheme = (theme, isUserAction = true) => {
        localStorage.setItem(THEME_STORAGE_KEY, theme);

        if (isUserAction) {
            animateThemeIcon();
            
            // Prime the 5-second universal eye-comfort transition
            document.documentElement.classList.add('theme-transitioning');
            void document.documentElement.offsetWidth; // Force reflow to commit transition properties

            updateThemeUI(theme);

            // Keep the eye-comfort transition state active for 5.2 seconds
            clearTimeout(themeTransitionTimer);
            themeTransitionTimer = setTimeout(() => {
                document.documentElement.classList.remove('theme-transitioning');
            }, 5200);
        } else {
            // Initial page load: set theme instantly without transition delay
            updateThemeUI(theme);
        }
    };

    // Initialize UI with current theme preference (instant, no initial flash)
    applyTheme(getStoredTheme(), false);

    // Listen for System OS theme changes dynamically
    const systemMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemSchemeChange = () => {
        if (getStoredTheme() === 'system') {
            applyTheme('system', true);
        }
    };
    if (systemMediaQuery.addEventListener) {
        systemMediaQuery.addEventListener('change', handleSystemSchemeChange);
    } else if (systemMediaQuery.addListener) {
        systemMediaQuery.addListener(handleSystemSchemeChange);
    }

    // Desktop Theme Menu Toggle
    let isThemeMenuOpen = false;
    const toggleThemeMenu = (open) => {
        isThemeMenuOpen = typeof open === 'boolean' ? open : !isThemeMenuOpen;
        if (themeDropdownMenu) {
            if (isThemeMenuOpen) {
                themeDropdownMenu.classList.remove('opacity-0', 'invisible', 'scale-95');
                themeDropdownMenu.classList.add('opacity-100', 'visible', 'scale-100');
            } else {
                themeDropdownMenu.classList.add('opacity-0', 'invisible', 'scale-95');
                themeDropdownMenu.classList.remove('opacity-100', 'visible', 'scale-100');
            }
        }
    };

    themeMenuBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleThemeMenu();
    });

    document.addEventListener('click', (e) => {
        if (isThemeMenuOpen && themeDropdownContainer && !themeDropdownContainer.contains(e.target)) {
            toggleThemeMenu(false);
        }
    });

    themeOptionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedTheme = btn.dataset.theme;
            if (selectedTheme) {
                applyTheme(selectedTheme);
                toggleThemeMenu(false);
            }
        });
    });

    mobileThemeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedTheme = btn.dataset.theme;
            if (selectedTheme) {
                applyTheme(selectedTheme);
            }
        });
    });

    // Mobile quick toggle cycles through: system -> light -> dark -> system
    mobileQuickThemeBtn?.addEventListener('click', () => {
        const current = getStoredTheme();
        let next = 'light';
        if (current === 'system') {
            next = 'light';
        } else if (current === 'light') {
            next = 'dark';
        } else if (current === 'dark') {
            next = 'system';
        }
        applyTheme(next);
    });

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
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            if (scrollbarWidth > 0) {
                document.body.style.paddingRight = `${scrollbarWidth}px`;
                const navbar = document.getElementById('main-nav');
                if (navbar) navbar.style.paddingRight = `${scrollbarWidth}px`;
            }
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
            document.body.style.paddingRight = '';
            const navbar = document.getElementById('main-nav');
            if (navbar) navbar.style.paddingRight = '';
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

    // === Clean URL Navigation: Keep Only Domain in Address Bar (No /#projects or /#section) ===
    const cleanUrlAddressBar = () => {
        if (window.history && window.history.replaceState) {
            window.history.replaceState(null, document.title, window.location.pathname + window.location.search);
        }
    };

    // Clean hash on page load if one was present in URL
    if (window.location.hash) {
        setTimeout(cleanUrlAddressBar, 80);
    }

    // Intercept all internal anchor navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hash = this.getAttribute('href');
            if (hash && hash !== '#') {
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    e.preventDefault();

                    const nav = document.getElementById('main-nav');
                    const navHeight = nav ? nav.offsetHeight : 70;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = Math.max(0, elementPosition - navHeight + 2);

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Ensure the URL bar remains clean showing only the domain
                    cleanUrlAddressBar();
                }
            }
        });
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
