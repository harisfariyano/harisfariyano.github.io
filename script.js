// script.js
document.addEventListener('DOMContentLoaded', function () {
    // === AOS ===
    AOS.init({
        offset: 0,
        duration: 1000,
        once: true,
    });

    // === Typed.js ===
    const typedElement = document.querySelector('.typed-text');
    if (typedElement) {
        new Typed('.typed-text', {
            strings: [,'Data Integrator', 'Insight Catalyst', 'Data Analyst'],
            typeSpeed: 80,
            backSpeed: 40,
            backDelay: 1500,
            startDelay: 100,
            loop: true,
            showCursor: true,
            loopCount: false,
            smartBackspace: true
        });
    }

    // === Tabs ===
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            button.classList.add('active');
            const targetPane = document.getElementById(targetTab);
            if (targetPane) targetPane.classList.add('active');
        });
    });

    // === Toggle Experience/Education ===
    const entryTitles = document.querySelectorAll('.entry-title');
    entryTitles.forEach(title => {
        title.addEventListener('click', function () {
            const parentEntry = this.closest('.entry');
            const icon = this.querySelector('.toggle-icon');
            if (parentEntry && icon) {
                parentEntry.classList.toggle('open');
                icon.textContent = parentEntry.classList.contains('open') ? '-' : '+';
            }
        });
    });

    // === Mobile Dropdown Menu ===
    const hamburg = document.getElementById('hamburg-icon');
    const cancel = document.getElementById('cancel-icon');
    const dropdown = document.getElementById('dropdown-menu');
    const dropdownLinks = document.querySelectorAll('.dropdown-links a');

    const openMenu = () => {
        // Mengubah penggunaan optional chaining pada penugasan
        if (dropdown) dropdown.classList.add('open');
        if (hamburg) hamburg.classList.add('active');
        if (cancel) cancel.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        // Mengubah penggunaan optional chaining pada penugasan
        if (dropdown) dropdown.classList.remove('open');
        if (hamburg) hamburg.classList.remove('active');
        if (cancel) cancel.style.display = 'none';
        document.body.style.overflow = '';
    };

    // Untuk event listener, optional chaining aman karena hasilnya undefined jika elemen tidak ada,
    // dan addEventListener tidak akan dipanggil pada undefined.
    hamburg?.addEventListener('click', openMenu);
    cancel?.addEventListener('click', closeMenu);
    dropdownLinks.forEach(link => link.addEventListener('click', closeMenu));

    // === Project Pagination ===
    const itemsPerPage = 3;
    let currentPage = 1;

    const showPage = (page) => {
        const cards = document.querySelectorAll('.project-card');
        const totalPages = Math.ceil(cards.length / itemsPerPage);

        cards.forEach((card, index) => {
            card.style.display = (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage) ? 'flex' : 'none';
        });

        // Bagian yang menyebabkan error. Ubah seperti ini:
        const pageIndicatorElement = document.getElementById('pageIndicator');
        if (pageIndicatorElement) {
            pageIndicatorElement.textContent = page;
        }

        const prevPageButton = document.getElementById('prevPage');
        if (prevPageButton) {
            prevPageButton.disabled = page === 1;
        }

        const nextPageButton = document.getElementById('nextPage');
        if (nextPageButton) {
            nextPageButton.disabled = page === totalPages;
        }
    };

    // Event listener aman dengan optional chaining
    document.getElementById('prevPage')?.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });

    // Event listener aman dengan optional chaining
    document.getElementById('nextPage')?.addEventListener('click', () => {
        const cards = document.querySelectorAll('.project-card');
        const totalPages = Math.ceil(cards.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    });

    window.addEventListener('resize', () => {
        showPage(currentPage);
    });

    showPage(currentPage); // Panggil ini setelah semua definisi fungsi dan variabel

    // === Certification Pagination ===
    const certCards = document.querySelectorAll('.certification-card');
    const certItemsPerPage = 3;
    let currentCertPage = 1;

    const showCertPage = (page) => {
        const totalCertPages = Math.ceil(certCards.length / certItemsPerPage);

        certCards.forEach((card, index) => {
            card.style.display = (index >= (page - 1) * certItemsPerPage && index < page * certItemsPerPage) ? 'flex' : 'none';
        });

        // Bagian yang menyebabkan error. Ubah seperti ini:
        const certPageIndicatorElement = document.getElementById('certPageIndicator');
        if (certPageIndicatorElement) {
            certPageIndicatorElement.textContent = page;
        }

        const prevCertPageButton = document.getElementById('prevCertPage');
        if (prevCertPageButton) {
            prevCertPageButton.disabled = page === 1;
        }

        const nextCertPageButton = document.getElementById('nextCertPage');
        if (nextCertPageButton) {
            nextCertPageButton.disabled = page === totalCertPages;
        }
    };

    // Event listener aman dengan optional chaining
    document.getElementById('prevCertPage')?.addEventListener('click', () => {
        if (currentCertPage > 1) {
            currentCertPage--;
            showCertPage(currentCertPage);
        }
    });

    // Event listener aman dengan optional chaining
    document.getElementById('nextCertPage')?.addEventListener('click', () => {
        const totalCertPages = Math.ceil(certCards.length / certItemsPerPage);
        if (currentCertPage < totalCertPages) {
            currentCertPage++;
            showCertPage(currentCertPage);
        }
    });

    showCertPage(currentCertPage); // Panggil ini setelah semua definisi fungsi dan variabel
});