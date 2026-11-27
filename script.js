// Early global availability for portfolio lightbox API
window.openPortfolioLightbox = window.openPortfolioLightbox || function(idx, triggerEl) {
    if (window.__portfolioLightboxEngine && typeof window.__portfolioLightboxEngine.open === 'function') {
        window.__portfolioLightboxEngine.open(idx, triggerEl);
    } else {
        window.__portfolioPendingOpen = { idx: Number(idx), triggerEl: triggerEl || null };
    }
};
window.openPortfolio = window.openPortfolioLightbox;
window.openCertificateLightbox = window.openCertificateLightbox || function(idx, triggerEl) {
    if (window.__portfolioLightboxEngine && typeof window.__portfolioLightboxEngine.openCertificate === 'function') {
        window.__portfolioLightboxEngine.openCertificate(idx, triggerEl);
    } else {
        window.__portfolioPendingOpen = { idx: Number(idx), triggerEl: triggerEl || null, gallery: 'certificate' };
    }
};
window.closePortfolioLightbox = window.closePortfolioLightbox || function() {
    if (window.__portfolioLightboxEngine && typeof window.__portfolioLightboxEngine.close === 'function') {
        window.__portfolioLightboxEngine.close();
    }
};
window.setLightboxMode = window.setLightboxMode || function(mode) {
    if (window.__portfolioLightboxEngine && typeof window.__portfolioLightboxEngine.setMode === 'function') {
        window.__portfolioLightboxEngine.setMode(mode);
    } else {
        window.__portfolioPendingMode = mode;
    }
};
window.lightboxNext = window.lightboxNext || function() {
    if (window.__portfolioLightboxEngine && typeof window.__portfolioLightboxEngine.next === 'function') {
        window.__portfolioLightboxEngine.next();
    }
};
window.lightboxPrev = window.lightboxPrev || function() {
    if (window.__portfolioLightboxEngine && typeof window.__portfolioLightboxEngine.prev === 'function') {
        window.__portfolioLightboxEngine.prev();
    }
};
window.lightboxZoomIn = window.lightboxZoomIn || function() {
    if (window.__portfolioLightboxEngine && typeof window.__portfolioLightboxEngine.zoomIn === 'function') {
        window.__portfolioLightboxEngine.zoomIn();
    }
};
window.lightboxZoomOut = window.lightboxZoomOut || function() {
    if (window.__portfolioLightboxEngine && typeof window.__portfolioLightboxEngine.zoomOut === 'function') {
        window.__portfolioLightboxEngine.zoomOut();
    }
};
window.lightboxZoomReset = window.lightboxZoomReset || function() {
    if (window.__portfolioLightboxEngine && typeof window.__portfolioLightboxEngine.zoomReset === 'function') {
        window.__portfolioLightboxEngine.zoomReset();
    }
};
window.lightboxToggleFullscreen = window.lightboxToggleFullscreen || function() {
    if (window.__portfolioLightboxEngine && typeof window.__portfolioLightboxEngine.toggleFullscreen === 'function') {
        window.__portfolioLightboxEngine.toggleFullscreen();
    }
};

/*==================== Toggle Icon Navbar ====================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

const setMobileMenuOpen = isOpen => {
    if (!menuIcon || !navbar) return;
    menuIcon.classList.toggle('bx-x', isOpen);
    navbar.classList.toggle('active', isOpen);
    menuIcon.setAttribute('aria-expanded', String(isOpen));
    menuIcon.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    if (isOpen) {
        const bgMenu = document.getElementById('background-menu');
        if (bgMenu && bgMenu.open) bgMenu.open = false;
    }
};

if (menuIcon) {
    menuIcon.onclick = () => setMobileMenuOpen(!navbar.classList.contains('active'));
}

// Close mobile menu if background customize menu opens
const bgMenu = document.getElementById('background-menu');
if (bgMenu) {
    bgMenu.addEventListener('toggle', () => {
        if (bgMenu.open && navbar && navbar.classList.contains('active')) {
            setMobileMenuOpen(false);
        }
    });
}

// Close mobile menu when clicking outside header/navbar
document.addEventListener('click', (e) => {
    if (navbar && navbar.classList.contains('active') && !navbar.contains(e.target) && !menuIcon.contains(e.target)) {
        setMobileMenuOpen(false);
    }
});

// Reset mobile menu if resizing back to desktop (> 991px)
window.addEventListener('resize', () => {
    if (window.innerWidth > 991 && navbar && navbar.classList.contains('active')) {
        setMobileMenuOpen(false);
    }
}, { passive: true });

/*==================== Smooth Scroll for Nav Links ====================*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (!href || href === '#' || href === '#!') return;
        let target;
        try {
            target = document.querySelector(href);
        } catch (err) {
            return;
        }
        if (target) {
            e.preventDefault();
            if (menuIcon && navbar && navbar.classList.contains('active')) {
                setMobileMenuOpen(false);
            }
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/*==================== Parallax Effect on Hero Image ====================*/
const homeImg = document.querySelector('.home-img img');
if (homeImg) {
    window.addEventListener('mousemove', (e) => {
        if (document.body.classList.contains('lightbox-open')) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 10;
        const y = (e.clientY / window.innerHeight - 0.5) * 10;
        homeImg.style.setProperty('--pointer-x', `${Math.round(x)}px`);
        homeImg.style.setProperty('--pointer-y', `${Math.round(y)}px`);
    });
}

/*==================== Color Theme Picker ====================*/
const themeSelect = document.getElementById('theme-select');
const availableThemes = new Set(Array.from(themeSelect.options, option => option.value));
const themeStorageKey = 'portfolio-theme';

const applyTheme = (theme, persist = false) => {
    if (!availableThemes.has(theme)) return;

    document.documentElement.dataset.theme = theme;
    themeSelect.value = theme;

    if (persist) {
        document.documentElement.dataset.customColors = 'true';
        try {
            localStorage.setItem(themeStorageKey, theme);
        } catch {}
    }
};

if (themeSelect) {
    const initialTheme = document.documentElement.dataset.theme;
    applyTheme(availableThemes.has(initialTheme) ? initialTheme : 'ocean');
    themeSelect.addEventListener('change', () => {
        applyTheme(themeSelect.value, true);
    });
}

/*==================== Light and Dark Appearance Toggle & Background System ====================*/
const schemeToggle = document.getElementById('scheme-toggle');
const schemeStorageKey = 'portfolio-scheme';
const nightModeRecommendation = document.getElementById('night-mode-recommendation');
const nightModeRecommendationText = document.getElementById('night-mode-recommendation-text');
const useDarkModeButton = document.getElementById('use-dark-mode');
const backgroundMenu = document.getElementById('background-menu');
const backgroundColorInput = document.getElementById('background-color');
const backgroundPresetButtons = Array.from(document.querySelectorAll('[data-background-preset]'));
const backgroundResetButton = document.getElementById('background-reset');
const videoBackgroundButton = document.getElementById('video-background');
const backgroundEffectStatus = document.getElementById('background-effect-status');
const backgroundVideo = document.getElementById('background-video');
const meteorCanvas = document.getElementById('meteor-canvas');
const constellationCanvas = document.getElementById('constellation-canvas');
const meteorShowerToggle = document.getElementById('meteor-shower-toggle');
const heroMeteorBtn = document.getElementById('hero-meteor-btn');
const meteorEventToast = document.getElementById('meteor-event-toast');
const toastEventTitle = document.getElementById('toast-event-title');
const toastEventDesc = document.getElementById('toast-event-desc');
const toastCloseBtn = document.getElementById('toast-close-btn');
const toastProgressBar = document.getElementById('toast-progress-bar');
const backgroundStorageKey = 'portfolio-background';
const backgroundEffectStorageKey = 'portfolio-background-effect';
const meteorStorageKey = 'portfolio-meteor-shower';
let meteorShower = null;
let constellationChart = null;
const defaultBackgroundByTheme = {
    ocean: { dark: '#0b0f19', light: '#ffffff' },
    forest: { dark: '#08140e', light: '#ffffff' },
    amber: { dark: '#16110a', light: '#ffffff' },
    rose: { dark: '#160b13', light: '#ffffff' }
};

const recommendDarkMode = message => {
    if (document.documentElement.dataset.scheme !== 'light' || !nightModeRecommendation || !nightModeRecommendationText) return;
    nightModeRecommendationText.textContent = message;
    nightModeRecommendation.hidden = false;
    if (backgroundMenu) backgroundMenu.open = true;
};

const hideDarkModeRecommendation = () => {
    if (nightModeRecommendation) nightModeRecommendation.hidden = true;
};

const stopBackgroundEffect = (clearPreference = true) => {
    const root = document.documentElement;
    delete root.dataset.backgroundEffect;
    if (backgroundVideo) {
        backgroundVideo.pause();
        backgroundVideo.hidden = true;
    }
    if (videoBackgroundButton) videoBackgroundButton.setAttribute('aria-pressed', 'false');
    if (backgroundEffectStatus) backgroundEffectStatus.textContent = '';

    if (clearPreference) {
        try {
            localStorage.removeItem(backgroundEffectStorageKey);
        } catch {}
    }
};

const applyScheme = (scheme, persist = false, resetCustomBackground = false) => {
    const isLight = scheme === 'light';
    const root = document.documentElement;
    const shouldResetBackground = persist && resetCustomBackground && root.dataset.userBackground === 'true';

    if (shouldResetBackground) {
        root.style.removeProperty('--user-bg-color');
        delete root.dataset.userBackground;
        try {
            localStorage.removeItem('portfolio-background');
        } catch {}
    }

    root.dataset.scheme = isLight ? 'light' : 'dark';
    if (schemeToggle) {
        schemeToggle.setAttribute('aria-checked', String(isLight));
        schemeToggle.setAttribute('title', `Switch to ${isLight ? 'dark' : 'light'} appearance`);
        schemeToggle.querySelector('span').textContent = isLight ? 'Light' : 'Dark';

        const schemeIcon = schemeToggle.querySelector('i');
        schemeIcon.classList.toggle('bx-sun', isLight);
        schemeIcon.classList.toggle('bx-moon', !isLight);
    }

    // Automatically stop video and disable meteor trails on white/light background
    if (isLight) {
        stopBackgroundEffect(persist);
        if (meteorShower) {
            meteorShower.setActive(false, persist);
        } else {
            root.dataset.meteorShower = 'false';
        }
        if (meteorShowerToggle) {
            meteorShowerToggle.setAttribute('aria-pressed', 'false');
        }
        if (constellationChart) {
            constellationChart.start();
        }
    } else {
        if (constellationChart) {
            constellationChart.stop();
        }
    }

    if (shouldResetBackground && backgroundColorInput) {
        const defaultColor = defaultBackgroundByTheme[themeSelect?.value]?.[root.dataset.scheme] ?? '#ffffff';
        backgroundColorInput.value = defaultColor;
        markBackgroundPreset(defaultColor);
    }

    if (persist) {
        document.documentElement.dataset.customColors = 'true';
        try {
            localStorage.setItem(schemeStorageKey, isLight ? 'light' : 'dark');
        } catch {}
    }

    if (!isLight) hideDarkModeRecommendation();
};

if (schemeToggle) {
    const initialScheme = document.documentElement.dataset.scheme === 'light' ? 'light' : 'dark';
    applyScheme(initialScheme);
    schemeToggle.addEventListener('click', () => {
        applyScheme(schemeToggle.getAttribute('aria-checked') === 'false' ? 'light' : 'dark', true, true);
    });
}

if (useDarkModeButton) {
    useDarkModeButton.addEventListener('click', () => {
        applyScheme('dark', true, false);
        if (backgroundMenu) backgroundMenu.open = true;
    });
}

/*==================== Hardware Detection & Performance Mode System ====================*/
const perfToggle = document.getElementById('perf-toggle');
const perfStorageKey = 'portfolio-perf-mode';

const detectLowSpecDevice = () => {
    const cores = navigator.hardwareConcurrency || 8;
    const memory = navigator.deviceMemory || 8;
    const isSmallScreen = window.innerWidth < 768;
    return cores <= 4 || memory <= 4 || isSmallScreen;
};

let isEcoAutoDetected = typeof window !== 'undefined' && typeof window.__isEcoAutoDetected === 'boolean'
    ? window.__isEcoAutoDetected
    : false;

const showEcoMeteorNotice = () => {
    const noticeText = isEcoAutoDetected
        ? 'Maaf, perangkat atau ukuran layar Anda terlalu kecil untuk mode ini.'
        : 'Anda mengaktifkan mode Eco. Jika ingin menggunakan efek ini, sebaiknya dimatikan terlebih dahulu.';

    if (backgroundEffectStatus) {
        backgroundEffectStatus.textContent = noticeText;
        backgroundEffectStatus.classList.remove('status-highlight');
        void backgroundEffectStatus.offsetWidth;
        backgroundEffectStatus.classList.add('status-highlight');
    }

    if (meteorShowerToggle) {
        meteorShowerToggle.classList.remove('btn-blocked-shake');
        void meteorShowerToggle.offsetWidth;
        meteorShowerToggle.classList.add('btn-blocked-shake');
        setTimeout(() => {
            meteorShowerToggle.classList.remove('btn-blocked-shake');
        }, 400);
    }

    if (meteorEventToast && toastEventTitle && toastEventDesc) {
        toastEventTitle.textContent = isEcoAutoDetected ? 'Perangkat Tidak Mendukung' : 'Mode Eco Sedang Aktif';
        toastEventDesc.textContent = noticeText;
        const toastBadge = meteorEventToast.querySelector('.toast-badge');
        if (toastBadge) {
            toastBadge.textContent = 'Eco Mode Notice';
            toastBadge.style.background = 'rgba(16, 185, 129, 0.2)';
            toastBadge.style.color = '#10b981';
            toastBadge.style.borderColor = 'rgba(16, 185, 129, 0.35)';
        }
        const toastIcon = meteorEventToast.querySelector('.toast-icon i');
        if (toastIcon) {
            toastIcon.className = 'bx bx-leaf';
        }
        meteorEventToast.setAttribute('aria-hidden', 'false');
        meteorEventToast.classList.add('show');

        if (toastProgressBar) {
            toastProgressBar.style.transition = 'none';
            toastProgressBar.style.transform = 'scaleX(1)';
            void toastProgressBar.offsetWidth;
            toastProgressBar.style.transition = 'transform 5s linear';
            toastProgressBar.style.transform = 'scaleX(0)';
        }

        if (window.__ecoToastTimer) clearTimeout(window.__ecoToastTimer);
        window.__ecoToastTimer = setTimeout(() => {
            meteorEventToast.classList.remove('show');
            meteorEventToast.setAttribute('aria-hidden', 'true');
        }, 5000);
    }
};
window.showEcoMeteorNotice = showEcoMeteorNotice;

// Dynamic portfolio image manager based on efficiency/eco mode
const updatePortfolioCardsImageSource = (isEco) => {
    const cards = document.querySelectorAll('.portfolio-card');
    cards.forEach(card => {
        const img = card.querySelector('.portfolio-image-wrap img');
        if (!img) return;
        const targetSrc = isEco
            ? (card.dataset.ecoImg || card.dataset.fallbackImg || card.dataset.normalImg)
            : (card.dataset.normalImg || card.dataset.fullImg);
        if (targetSrc && img.getAttribute('src') !== targetSrc) {
            img.src = targetSrc;
        }
    });
};
window.updatePortfolioCardsImageSource = updatePortfolioCardsImageSource;

const applyPerfMode = (mode, persist = false) => {
    const isEco = mode === 'eco';
    document.documentElement.dataset.perfMode = mode;

    if (perfToggle) {
        perfToggle.setAttribute('aria-checked', String(isEco));
        perfToggle.title = isEco 
            ? 'Performance Mode: Eco (Click to switch to High Performance)' 
            : 'Performance Mode: High (Click to switch to Eco / Battery Saver)';
        const textSpan = perfToggle.querySelector('.perf-toggle-text');
        const icon = perfToggle.querySelector('i');
        if (textSpan) {
            textSpan.textContent = isEco ? 'Eco' : 'High';
        }
        if (icon) {
            icon.className = isEco ? 'bx bx-leaf' : 'bx bx-tachometer';
        }
    }

    // Update Meteor Shower toggle button state and title in background menu
    if (meteorShowerToggle) {
        if (isEco) {
            meteorShowerToggle.setAttribute('aria-disabled', 'true');
            meteorShowerToggle.title = isEcoAutoDetected
                ? 'Dinonaktifkan: Perangkat/layar terlalu kecil untuk mode ini'
                : 'Dinonaktifkan dalam Mode Eco (Matikan Mode Eco untuk mengaktifkan)';
        } else {
            meteorShowerToggle.removeAttribute('aria-disabled');
            meteorShowerToggle.title = 'Toggle meteor shower trails';
        }
    }

    // Update Hero Wish button accessibility and title
    const heroMeteorBadge = document.getElementById('hero-meteor-btn');
    if (heroMeteorBadge) {
        if (isEco) {
            heroMeteorBadge.removeAttribute('role');
            heroMeteorBadge.removeAttribute('tabindex');
            heroMeteorBadge.title = 'Software Engineering • SMK Krian 1';
        } else {
            heroMeteorBadge.setAttribute('role', 'button');
            heroMeteorBadge.setAttribute('tabindex', '0');
            heroMeteorBadge.title = 'Software Engineering • SMK Krian 1';
        }
    }

    // Update outer portfolio card images dynamically:
    // khusus image10 dan images7 ketika normal memanggil versi originalnya lalu ketika efisiensi mode memanggil versi pressnya
    updatePortfolioCardsImageSource(isEco);

    // If lightbox is currently open, dynamically refresh preview media to match mode
    if (window.__portfolioLightboxEngine && typeof window.__portfolioLightboxEngine.refreshMedia === 'function') {
        window.__portfolioLightboxEngine.refreshMedia();
    }

    // Canvas & Video animation throttling for genuine power and GPU saving
    if (isEco) {
        // 1. Pause Meteor Shower canvas loop & cosmic event timer
        if (typeof meteorShower !== 'undefined' && meteorShower && typeof meteorShower.pause === 'function') {
            meteorShower.pause();
            if (meteorShower.cosmicEventTimeout) {
                clearTimeout(meteorShower.cosmicEventTimeout);
                meteorShower.cosmicEventTimeout = 0;
            }
            if (typeof meteorShower.hideCosmicEventNotification === 'function') {
                meteorShower.hideCosmicEventNotification();
            }
        }
        // 2. Stop Constellation Star Chart canvas loop
        if (typeof constellationChart !== 'undefined' && constellationChart && typeof constellationChart.stop === 'function') {
            constellationChart.stop();
        }
        // 3. Pause 1080p background video decoding
        if (typeof backgroundVideo !== 'undefined' && backgroundVideo && !backgroundVideo.paused && !backgroundVideo.hidden) {
            try { backgroundVideo.pause(); } catch (e) {}
        }
    } else {
        // High Mode: resume animations if not inside an open lightbox
        const isLightboxOpen = document.body.classList.contains('lightbox-open') || document.documentElement.dataset.lightboxActive === 'true';
        if (!isLightboxOpen) {
            if (typeof meteorShower !== 'undefined' && meteorShower && typeof meteorShower.start === 'function' && meteorShower.active) {
                meteorShower.isMobile = meteorShower.checkIsMobileOrEco();
                meteorShower.resize();
                meteorShower.lastTime = performance.now();
                meteorShower.start();
                if (typeof meteorShower.scheduleNextCosmicEvent === 'function') {
                    meteorShower.scheduleNextCosmicEvent();
                }
            }
            if (typeof constellationChart !== 'undefined' && constellationChart && typeof constellationChart.start === 'function' && document.documentElement.dataset.scheme === 'light') {
                constellationChart.isMobile = constellationChart.checkIsMobileOrEco();
                constellationChart.resize();
                constellationChart.start();
            }
            if (document.documentElement.dataset.backgroundEffect === 'video' && typeof backgroundVideo !== 'undefined' && backgroundVideo && backgroundVideo.paused && !backgroundVideo.hidden) {
                try { backgroundVideo.play().catch(() => {}); } catch (e) {}
            }
        }
    }

    if (persist) {
        try {
            localStorage.setItem(perfStorageKey, mode);
        } catch {}
    }
};

if (perfToggle) {
    let initialPerfMode = document.documentElement.dataset.perfMode;
    if (!initialPerfMode) {
        let stored = null;
        try { stored = localStorage.getItem(perfStorageKey); } catch (e) {}
        if (stored === 'eco' || stored === 'high') {
            initialPerfMode = stored;
            isEcoAutoDetected = false;
        } else if (detectLowSpecDevice()) {
            initialPerfMode = 'eco';
            isEcoAutoDetected = true;
        } else {
            initialPerfMode = 'high';
            isEcoAutoDetected = false;
        }
    } else if (initialPerfMode === 'eco' && window.__isEcoAutoDetected) {
        isEcoAutoDetected = true;
    }

    applyPerfMode(initialPerfMode);

    perfToggle.addEventListener('click', () => {
        const currentMode = document.documentElement.dataset.perfMode || 'high';
        const nextMode = currentMode === 'eco' ? 'high' : 'eco';
        isEcoAutoDetected = false; // User explicitly selected their preference
        if (typeof window !== 'undefined') window.__isEcoAutoDetected = false;
        applyPerfMode(nextMode, true);
    });
}

const backgroundRgb = hex => {
    const value = hex.slice(1);
    return [0, 2, 4].map(index => parseInt(value.slice(index, index + 2), 16));
};

const backgroundLuminance = hex => {
    const [red, green, blue] = backgroundRgb(hex).map(channel => {
        const normalized = channel / 255;
        return normalized <= .04045 ? normalized / 12.92 : ((normalized + .055) / 1.055) ** 2.4;
    });
    return .2126 * red + .7152 * green + .0722 * blue;
};

const markBackgroundPreset = color => {
    backgroundPresetButtons.forEach(button => {
        button.setAttribute('aria-pressed', String(button.dataset.backgroundPreset.toLowerCase() === color.toLowerCase()));
    });
};

const applyBackground = (color, persist = false, adjustScheme = true) => {
    if (!/^#[0-9a-f]{6}$/i.test(color)) return;

    const root = document.documentElement;
    root.style.setProperty('--user-bg-color', color);
    root.dataset.userBackground = 'true';
    root.dataset.customColors = 'true';
    backgroundColorInput.value = color;
    markBackgroundPreset(color);

    const isLight = backgroundLuminance(color) > .42;

    // Automatically stop video and disable meteor trails on white/light background
    if (isLight) {
        stopBackgroundEffect(persist);
        if (meteorShower) {
            meteorShower.setActive(false, persist);
        } else {
            root.dataset.meteorShower = 'false';
        }
        if (meteorShowerToggle) {
            meteorShowerToggle.setAttribute('aria-pressed', 'false');
        }
    } else if (persist && root.dataset.backgroundEffect) {
        stopBackgroundEffect();
    }

    if (adjustScheme) {
        applyScheme(isLight ? 'light' : 'dark', persist, false);
    }

    if (persist) {
        try {
            localStorage.setItem(backgroundStorageKey, color);
        } catch {}
    }
};

if (backgroundMenu && backgroundColorInput) {
    let savedBackground = null;
    try {
        savedBackground = localStorage.getItem(backgroundStorageKey);
    } catch {}

    if (savedBackground && /^#[0-9a-f]{6}$/i.test(savedBackground)) {
        applyBackground(savedBackground, false, false);
    } else {
        const defaultColor = defaultBackgroundByTheme[themeSelect?.value]?.[document.documentElement.dataset.scheme] ?? '#0b0f19';
        backgroundColorInput.value = defaultColor;
        markBackgroundPreset(defaultColor);
    }

    backgroundPresetButtons.forEach(button => {
        button.addEventListener('click', () => {
            applyBackground(button.dataset.backgroundPreset, true);
            backgroundMenu.open = false;
        });
    });

    backgroundColorInput.addEventListener('input', () => {
        applyBackground(backgroundColorInput.value, false);
    });

    backgroundColorInput.addEventListener('change', () => {
        applyBackground(backgroundColorInput.value, true);
    });

    backgroundResetButton.addEventListener('click', () => {
        const root = document.documentElement;
        stopBackgroundEffect();
        root.style.removeProperty('--user-bg-color');
        delete root.dataset.userBackground;
        backgroundMenu.open = false;

        const isLight = root.dataset.scheme === 'light';
        const defaultColor = defaultBackgroundByTheme[themeSelect?.value]?.[root.dataset.scheme] ?? (isLight ? '#ffffff' : '#0b0f19');
        backgroundColorInput.value = defaultColor;
        markBackgroundPreset(defaultColor);

        try {
            localStorage.removeItem(backgroundStorageKey);
            localStorage.removeItem(backgroundEffectStorageKey);
        } catch {}

        if (meteorShower && root.dataset.perfMode !== 'eco') {
            meteorShower.setActive(!isLight, true);
        }
        if (meteorShowerToggle) {
            meteorShowerToggle.setAttribute('aria-pressed', String(!isLight && root.dataset.perfMode !== 'eco'));
        }
    });
}

if (backgroundMenu) {
    backgroundMenu.addEventListener('toggle', () => {
        if (backgroundMenu.open && document.documentElement.dataset.perfMode === 'eco') {
            if (backgroundEffectStatus && !backgroundEffectStatus.textContent) {
                backgroundEffectStatus.textContent = isEcoAutoDetected
                    ? 'Mode Eco aktif otomatis untuk perangkat/layar ini.'
                    : 'Mode Eco aktif. Efek meteor dan video diistirahatkan.';
            }
        }
    });
}

const startVideoBackground = async (persist = true) => {
    const root = document.documentElement;
    if (root.dataset.scheme === 'light') {
        applyScheme('dark', true, true);
    }

    if (root.dataset.backgroundEffect !== 'video') {
        stopBackgroundEffect(false);
    }

    root.dataset.backgroundEffect = 'video';
    videoBackgroundButton.setAttribute('aria-pressed', 'true');
    backgroundVideo.hidden = false;
    backgroundEffectStatus.textContent = 'Loading cinematic video scene…';
    recommendDarkMode('Video backgrounds look more cinematic in dark mode and keep the foreground easy to read.');

    if (persist) {
        try {
            localStorage.setItem(backgroundEffectStorageKey, 'video');
        } catch {}
    }

    try {
        if (root.dataset.perfMode === 'eco') {
            backgroundVideo.pause();
            if (root.dataset.backgroundEffect !== 'video') return;
            backgroundEffectStatus.textContent = 'Cinematic video paused (Eco mode active).';
        } else {
            await backgroundVideo.play();
            if (root.dataset.backgroundEffect !== 'video') return;
            backgroundEffectStatus.textContent = 'Cinematic video scene active.';
        }
    } catch (error) {
        if (root.dataset.backgroundEffect !== 'video' || error.name === 'AbortError') return;
        console.error('Could not play video background:', error);
        stopBackgroundEffect();
        backgroundEffectStatus.textContent = 'Could not play the video background.';
    }
};

if (videoBackgroundButton) {
    videoBackgroundButton.addEventListener('click', () => {
        if (document.documentElement.dataset.backgroundEffect === 'video') {
            stopBackgroundEffect();
        } else {
            startVideoBackground();
        }
        backgroundMenu.open = true;
    });

    if (document.documentElement.dataset.backgroundEffect === 'video') {
        startVideoBackground(false);
    }
}

/*==================== Space Meteor Shower (Custom Interactive Animation) ====================*/
class MeteorShower {
    constructor(canvas) {
        if (!canvas) return;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        if (!this.ctx) return;

        this.meteors = [];
        this.sparks = [];
        this.shockwaves = [];
        this.flashes = [];
        this.embers = [];
        this.rafId = 0;
        const isSchemeLight = document.documentElement.dataset.scheme === 'light';
        this.active = !isSchemeLight && document.documentElement.dataset.meteorShower === 'true';
        if (!this.active) {
            this.canvas.hidden = true;
            document.documentElement.dataset.meteorShower = 'false';
        }
        this.isMobile = this.checkIsMobileOrEco();
        this.lastTime = performance.now();
        this.nextSpawn = this.lastTime + this.getRandomDelay();
        this.pointer = { x: -1000, y: -1000, active: false };
        this.dpr = this.isMobile ? Math.min(window.devicePixelRatio || 1, 1.0) : Math.min(window.devicePixelRatio || 1, 1.75);
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.cosmicEventTimeout = 0;
        this.toastTimeout = 0;
        this.isCosmicEventActive = false;

        this.init();
    }

    checkIsMobileOrEco() {
        return window.innerWidth < 768 || ('ontouchstart' in window && window.innerWidth < 1024) || document.documentElement.dataset.perfMode === 'eco';
    }

    getRandomDelay() {
        if (this.isMobile) {
            return 3400 + Math.random() * 3200;
        }
        return 2200 + Math.random() * 2600;
    }

    getThemeAccent() {
        try {
            const root = document.documentElement;
            const style = getComputedStyle(root);
            const rgbStr = style.getPropertyValue('--accent-rgb').trim();
            if (rgbStr) {
                const parts = rgbStr.split(',').map(s => parseInt(s.trim(), 10));
                if (parts.length === 3 && parts.every(n => !isNaN(n))) {
                    return parts;
                }
            }
        } catch {}
        return [0, 229, 255];
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize(), { passive: true });

        window.addEventListener('pointermove', (e) => {
            if (document.body.classList.contains('lightbox-open')) return;
            this.pointer.x = e.clientX;
            this.pointer.y = e.clientY;
            this.pointer.active = true;
        }, { passive: true });

        window.addEventListener('pointerleave', () => {
            this.pointer.active = false;
        });

        window.addEventListener('pointerdown', (e) => {
            if (!this.active || document.body.classList.contains('lightbox-open')) return;
            const interactive = e.target.closest('a, button, input, textarea, select, label, summary, details, .theme-picker, .background-menu, .meteor-event-toast, #portfolio-lightbox');
            if (interactive) return;

            this.summonMeteor(e.clientX, e.clientY, true);
        });

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pause();
                if (this.cosmicEventTimeout) {
                    clearTimeout(this.cosmicEventTimeout);
                    this.cosmicEventTimeout = 0;
                }
            } else if (this.active) {
                this.lastTime = performance.now();
                this.start();
                this.scheduleNextCosmicEvent();
            }
        });

        // Rare initial delay for cosmic meteor events (2.5 - 4.5 minutes)
        if (this.active) {
            this.scheduleNextCosmicEvent(150000 + Math.random() * 120000);
        }

        if (this.active && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.start();
        } else {
            this.draw();
        }
    }

    resize() {
        this.isMobile = this.checkIsMobileOrEco();
        this.dpr = this.isMobile ? Math.min(window.devicePixelRatio || 1, 1.0) : Math.min(window.devicePixelRatio || 1, 1.75);
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = Math.round(this.width * this.dpr);
        this.canvas.height = Math.round(this.height * this.dpr);
        this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    }

    start() {
        if (document.documentElement.dataset.perfMode === 'eco') {
            this.pause();
            return;
        }
        if (this.rafId) return;
        this.lastTime = performance.now();
        const loop = (currentTime) => {
            if (document.documentElement.dataset.perfMode === 'eco') {
                this.pause();
                return;
            }
            const dt = Math.min((currentTime - this.lastTime) / 1000, 0.1);
            this.lastTime = currentTime;

            if (this.active) {
                this.update(currentTime, dt);
                this.draw();
                this.rafId = requestAnimationFrame(loop);
            } else {
                this.rafId = 0;
                this.ctx.clearRect(0, 0, this.width, this.height);
            }
        };
        this.rafId = requestAnimationFrame(loop);
    }

    pause() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
            this.rafId = 0;
        }
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    setActive(shouldBeActive, persist = true) {
        if (shouldBeActive && document.documentElement.dataset.perfMode === 'eco') {
            this.pause();
            if (meteorShowerToggle) {
                meteorShowerToggle.setAttribute('aria-pressed', 'false');
            }
            return;
        }
        this.active = shouldBeActive;
        const root = document.documentElement;
        root.dataset.meteorShower = shouldBeActive ? 'true' : 'false';
        this.canvas.hidden = !shouldBeActive;

        if (meteorShowerToggle) {
            meteorShowerToggle.setAttribute('aria-pressed', String(shouldBeActive));
        }

        if (backgroundEffectStatus) {
            backgroundEffectStatus.textContent = shouldBeActive
                ? 'Meteor shower active (tap anywhere to summon)'
                : 'Meteor shower disabled';
        }

        if (persist) {
            try {
                localStorage.setItem(meteorStorageKey, shouldBeActive ? 'true' : 'false');
            } catch {}
        }

        if (shouldBeActive) {
            this.lastTime = performance.now();
            this.nextSpawn = this.lastTime + 600;
            this.start();
            this.scheduleNextCosmicEvent();
        } else {
            this.pause();
            this.meteors = [];
            this.sparks = [];
            this.embers = [];
            this.shockwaves = [];
            this.flashes = [];
            if (this.ctx) {
                this.ctx.clearRect(0, 0, this.width, this.height);
            }
            if (this.cosmicEventTimeout) {
                clearTimeout(this.cosmicEventTimeout);
                this.cosmicEventTimeout = 0;
            }
            this.hideCosmicEventNotification();
        }
    }

    spawnMeteor(options = {}) {
        const maxMeteors = this.isMobile ? 6 : 18;
        if (this.meteors.length >= maxMeteors) return;

        const isBolide = !!options.isBolide;
        const angle = options.angle ?? (Math.PI / 180 * (35 + Math.random() * 18));
        const defaultSpeed = isBolide 
            ? (this.isMobile ? 1100 : 1350) 
            : (this.isMobile ? 800 + Math.random() * 450 : 950 + Math.random() * 650);
        const speed = options.speed ?? defaultSpeed;
        const defaultLength = isBolide 
            ? (this.isMobile ? 220 : 290) 
            : (this.isMobile ? 100 + Math.random() * 90 : 130 + Math.random() * 140);
        const length = options.length ?? defaultLength;
        const thickness = options.thickness ?? (isBolide ? (this.isMobile ? 3.6 : 4.5) : (this.isMobile ? 1.4 : 1.6) + Math.random() * 1.1);

        let x = options.x;
        let y = options.y;
        if (x === undefined || y === undefined) {
            if (Math.random() < 0.65) {
                x = Math.random() * (this.width * 0.95);
                y = -40;
            } else {
                x = -40;
                y = Math.random() * (this.height * 0.45);
            }
        }

        const maxLife = options.maxLife ?? (isBolide ? 1.25 : 0.75 + Math.random() * 0.55);
        const canCollide = options.canCollide !== undefined ? options.canCollide : (isBolide || Math.random() < 0.55);

        this.meteors.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            speed,
            length,
            thickness,
            age: 0,
            maxLife,
            target: options.target || null,
            canCollide,
            isBolide,
            sparkTimer: 0,
            colTimer: 0
        });
    }

    summonMeteor(targetX, targetY, makeBurstAtTarget = true) {
        const maxMeteors = this.isMobile ? 5 : 20;
        if (this.meteors.length >= maxMeteors) return;

        const angle = Math.PI / 180 * (38 + Math.random() * 10);
        const distance = (this.isMobile ? 280 : 380) + Math.random() * 180;
        const startX = targetX - Math.cos(angle) * distance;
        const startY = targetY - Math.sin(angle) * distance;
        const speed = (this.isMobile ? 1050 : 1250) + Math.random() * 350;
        const timeToTarget = distance / speed;

        this.spawnMeteor({
            x: startX,
            y: startY,
            angle,
            speed,
            length: this.isMobile ? 140 : 190,
            thickness: this.isMobile ? 2.2 : 2.6,
            maxLife: timeToTarget + 0.35,
            canCollide: true,
            target: makeBurstAtTarget ? { x: targetX, y: targetY, reached: false } : null
        });

        this.createExplosion(targetX, targetY, null, { isBolide: false });
    }

    triggerFlurry(count = 6, isEvent = false) {
        if (!this.active) {
            this.setActive(true, true);
        }
        const actualCount = this.isMobile ? Math.min(count, 3) : count;
        const interval = this.isMobile ? 250 : 190;
        for (let i = 0; i < actualCount; i++) {
            setTimeout(() => {
                if (this.active) {
                    const isBolide = isEvent && i === Math.floor(actualCount / 2);
                    this.spawnMeteor({
                        x: Math.random() * (this.width * 0.75),
                        y: -30 - Math.random() * 50,
                        speed: this.isMobile ? 800 + Math.random() * 450 : 1050 + Math.random() * 650,
                        length: this.isMobile ? 100 + Math.random() * 90 : 140 + Math.random() * 130,
                        canCollide: Math.random() < 0.65,
                        isBolide
                    });
                }
            }, i * interval + Math.random() * 50);
        }
    }

    createExplosion(x, y, targetBox = null, meteor = null) {
        const isBolide = !!meteor?.isBolide;
        const accent = this.getThemeAccent();

        // 1. Expanding Shockwave Ring
        const maxShockwaves = this.isMobile ? 2 : 5;
        if (this.shockwaves.length < maxShockwaves) {
            this.shockwaves.push({
                x,
                y,
                radius: 6,
                maxRadius: this.isMobile ? (isBolide ? 48 : 34) : (isBolide ? 85 : 55),
                speed: this.isMobile ? (isBolide ? 200 : 160) : (isBolide ? 280 : 220),
                alpha: 1,
                decay: isBolide ? 1.8 : 2.4,
                color: accent,
                lineWidth: this.isMobile ? (isBolide ? 3 : 2) : (isBolide ? 4.5 : 3)
            });
        }

        // 2. Central Plasma Flash
        const maxFlashes = this.isMobile ? 2 : 4;
        if (this.flashes.length < maxFlashes) {
            this.flashes.push({
                x,
                y,
                radius: this.isMobile ? (isBolide ? 36 : 24) : (isBolide ? 70 : 42),
                alpha: 1,
                decay: isBolide ? 3.8 : 5.2,
                color: [255, 255, 255]
            });
        }

        // 3. Stardust Sparks Burst
        const sparkCount = this.isMobile 
            ? (isBolide ? 12 : (targetBox ? 7 : 4))
            : (isBolide ? 38 : (targetBox ? 26 : 14));
        const maxSpeed = this.isMobile ? (isBolide ? 170 : 130) : (isBolide ? 260 : 190);
        const sparkLimit = this.isMobile ? 40 : 170;
        for (let i = 0; i < sparkCount; i++) {
            if (this.sparks.length >= sparkLimit) break;
            const angle = Math.random() * Math.PI * 2;
            const spd = (Math.random() * 0.8 + 0.2) * maxSpeed;
            this.sparks.push({
                x,
                y,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd,
                size: Math.random() * 2.0 + 1.0,
                alpha: 1,
                decay: Math.random() * 0.05 + 0.03,
                color: Math.random() < 0.35 ? [255, 255, 255] : accent
            });
        }

        // 4. Trigger UI Element Impact Shake & Fiery Burning Effect
        if (targetBox) {
            targetBox.classList.remove('meteor-impacted');
            requestAnimationFrame(() => {
                targetBox.classList.add('meteor-impacted');
            });

            // Apply fiery burning aura
            targetBox.classList.add('meteor-burning');

            // Spawn floating fire embers rising from the hit element
            const emberCount = this.isMobile ? (isBolide ? 8 : 4) : (isBolide ? 35 : 22);
            this.spawnBurningEmbers(x, y, targetBox, emberCount);

            setTimeout(() => {
                targetBox.classList.remove('meteor-impacted');
            }, 500);

            // Secondary crackling puff of embers (desktop only)
            if (!this.isMobile) {
                setTimeout(() => {
                    if (this.active) {
                        this.spawnBurningEmbers(x, y - 8, targetBox, 8);
                    }
                }, 800);
            }

            // Extinguish burning effect after 2.0s on mobile, 2.4s on desktop
            setTimeout(() => {
                targetBox.classList.remove('meteor-burning');
            }, this.isMobile ? 2000 : 2400);
        }
    }

    spawnBurningEmbers(x, y, targetBox = null, count = 22) {
        const emberLimit = this.isMobile ? 24 : 130;
        if (this.embers.length >= emberLimit) return;
        const actualCount = this.isMobile ? Math.min(count, 8) : count;
        const rect = targetBox ? targetBox.getBoundingClientRect() : null;

        for (let i = 0; i < actualCount; i++) {
            let startX = x + (Math.random() - 0.5) * 45;
            let startY = y + (Math.random() - 0.5) * 25;

            if (rect) {
                startX = Math.max(rect.left + 6, Math.min(rect.right - 6, startX));
                startY = Math.max(rect.top + 6, Math.min(rect.bottom - 6, startY));
            }

            const maxLife = 1.2 + Math.random() * 0.8;
            this.embers.push({
                x: startX,
                y: startY,
                vx: (Math.random() - 0.5) * 40,
                vy: -(Math.random() * 75 + 35),
                size: Math.random() * 2.4 + 1.0,
                alpha: 1,
                age: 0,
                maxLife,
                decay: 1 / maxLife,
                flutterSpeed: 3 + Math.random() * 5,
                color: [255, 230, 110]
            });
        }
    }

    /*==================== Random Cosmic Events ====================*/
    scheduleNextCosmicEvent(customDelay = null) {
        if (this.cosmicEventTimeout) {
            clearTimeout(this.cosmicEventTimeout);
            this.cosmicEventTimeout = 0;
        }
        if (document.documentElement.dataset.perfMode === 'eco') {
            return;
        }
        // Truly rare event timing: repeats every 4 to 8 minutes
        const delay = customDelay !== null ? customDelay : 240000 + Math.random() * 240000;
        this.cosmicEventTimeout = setTimeout(() => {
            if (document.documentElement.dataset.perfMode === 'eco') return;
            if (this.active && !document.hidden) {
                this.triggerRandomCosmicEvent();
            }
            this.scheduleNextCosmicEvent();
        }, delay);
    }

    triggerRandomCosmicEvent() {
        if (this.isCosmicEventActive) return;
        this.isCosmicEventActive = true;

        const events = [
            {
                title: 'Perseid Meteor Storm',
                desc: 'Intense cosmic debris cluster entering the atmosphere',
                count: this.isMobile ? 8 : 22,
                waves: this.isMobile ? 2 : 3,
                bolide: false
            },
            {
                title: 'Geminids Stardust Surge',
                desc: 'Ionized stardust wave blazing across local space sector',
                count: this.isMobile ? 6 : 18,
                waves: 2,
                bolide: false
            },
            {
                title: 'Superbolide Fireball Event',
                desc: 'Rare giant cosmic fireball detected on collision trajectory!',
                count: this.isMobile ? 4 : 15,
                waves: 2,
                bolide: true
            }
        ];

        const chosenEvent = events[Math.floor(Math.random() * events.length)];
        this.showCosmicEventNotification(chosenEvent);

        for (let wave = 0; wave < chosenEvent.waves; wave++) {
            setTimeout(() => {
                if (this.active) {
                    this.triggerFlurry(Math.round(chosenEvent.count / chosenEvent.waves), chosenEvent.bolide);
                }
            }, wave * 1400);
        }

        setTimeout(() => {
            this.isCosmicEventActive = false;
        }, 5500);
    }

    showCosmicEventNotification(event) {
        if (!meteorEventToast) return;
        if (toastEventTitle) toastEventTitle.textContent = event.title;
        if (toastEventDesc) toastEventDesc.textContent = event.desc;

        meteorEventToast.setAttribute('aria-hidden', 'false');
        meteorEventToast.classList.add('show');

        if (toastProgressBar) {
            toastProgressBar.style.transition = 'none';
            toastProgressBar.style.transform = 'scaleX(1)';
            void toastProgressBar.offsetWidth;
            toastProgressBar.style.transition = 'transform 5s linear';
            toastProgressBar.style.transform = 'scaleX(0)';
        }

        if (this.toastTimeout) {
            clearTimeout(this.toastTimeout);
        }
        this.toastTimeout = setTimeout(() => {
            this.hideCosmicEventNotification();
        }, 5200);
    }

    hideCosmicEventNotification() {
        if (!meteorEventToast) return;
        meteorEventToast.classList.remove('show');
        meteorEventToast.setAttribute('aria-hidden', 'true');
        if (this.toastTimeout) {
            clearTimeout(this.toastTimeout);
            this.toastTimeout = 0;
        }
    }

    update(currentTime, dt) {
        if (currentTime >= this.nextSpawn) {
            this.spawnMeteor();
            if (Math.random() < 0.22) {
                setTimeout(() => {
                    if (this.active) this.spawnMeteor();
                }, 180 + Math.random() * 140);
            }
            this.nextSpawn = currentTime + this.getRandomDelay();
        }

        const accent = this.getThemeAccent();

        // 1. Update Meteors & Collision Detection
        for (let i = this.meteors.length - 1; i >= 0; i--) {
            const m = this.meteors[i];
            m.age += dt;

            if (this.pointer.active) {
                const dx = this.pointer.x - m.x;
                const dy = this.pointer.y - m.y;
                const dist = Math.hypot(dx, dy);
                if (dist > 20 && dist < 140) {
                    const pull = (1 - dist / 140) * 160 * dt;
                    m.vx += (dx / dist) * pull;
                    m.vy += (dy / dist) * pull;
                }
            }

            m.x += m.vx * dt;
            m.y += m.vy * dt;

            if (m.target && !m.target.reached) {
                const distToTarget = Math.hypot(m.x - m.target.x, m.y - m.target.y);
                if (distToTarget < 35 || m.age >= m.maxLife * 0.65) {
                    m.target.reached = true;
                    this.createExplosion(m.target.x, m.target.y, null, m);
                    this.meteors.splice(i, 1);
                    continue;
                }
            }

            // Real-time Collision Detection with UI text / cards / buttons / boxes
            m.colTimer = (m.colTimer || 0) + dt;
            const colInterval = this.isMobile ? 0.08 : 0.035;
            const canCheckCollision = m.canCollide && m.colTimer >= colInterval && (!this.isMobile || i < 2);
            if (canCheckCollision && m.age > 0.08 && m.x > 10 && m.x < this.width - 10 && m.y > 65 && m.y < this.height - 10) {
                m.colTimer = 0;
                const hitEl = document.elementFromPoint(m.x, m.y);
                if (hitEl && !hitEl.closest('.header, .background-menu, .meteor-event-toast, #meteor-canvas, #background-video')) {
                    const targetBox = hitEl.closest(
                        '.stat-card, .btn, .hero-name, .hero-greeting, .hero-role, .heading, .section-tag, ' +
                        '.about-img-card, .about-card-badge, .highlight-item, .service-card, .services-box, ' +
                        '.portfolio-card, .portfolio-box, .certificate-card, .cert-filter-btn, .skill-card, .skill-box, .floating-chip, ' +
                        '.chip-top, .chip-bottom, .social-media a, h1, h2, h3, h4, ' +
                        '.hero-desc, .about-content p, .home-img, .contact-card, .hero-badge, .feedback-modal'
                    );
                    if (targetBox) {
                        this.createExplosion(m.x, m.y, targetBox, m);
                        this.meteors.splice(i, 1);
                        continue;
                    }
                }
            }

            m.sparkTimer += dt;
            const sparkInterval = this.isMobile ? (m.isBolide ? 0.045 : 0.075) : (m.isBolide ? 0.02 : 0.035);
            const sparkLimit = this.isMobile ? 32 : 150;
            if (m.sparkTimer >= sparkInterval && this.sparks.length < sparkLimit) {
                m.sparkTimer = 0;
                const dir = Math.atan2(m.vy, m.vx);
                const sparkDist = Math.random() * (m.length * 0.45);
                this.sparks.push({
                    x: m.x - Math.cos(dir) * sparkDist + (Math.random() - 0.5) * 4,
                    y: m.y - Math.sin(dir) * sparkDist + (Math.random() - 0.5) * 4,
                    vx: -Math.cos(dir) * (m.speed * 0.05) + (Math.random() - 0.5) * 20,
                    vy: -Math.sin(dir) * (m.speed * 0.05) + (Math.random() - 0.5) * 20,
                    size: m.isBolide ? (this.isMobile ? 1.8 : 2.2) : (this.isMobile ? 1.2 : 1.6),
                    alpha: 0.95,
                    decay: Math.random() * 0.05 + 0.035,
                    color: Math.random() < 0.35 ? [255, 255, 255] : accent
                });
            }

            const isOffScreen = m.x > this.width + m.length + 50 || m.y > this.height + m.length + 50;
            if (m.age >= m.maxLife || isOffScreen) {
                if (Math.random() < 0.4 && !isOffScreen) {
                    this.createExplosion(m.x, m.y, null, m);
                }
                this.meteors.splice(i, 1);
            }
        }

        // 2. Update Sparks
        for (let j = this.sparks.length - 1; j >= 0; j--) {
            const s = this.sparks[j];
            s.x += s.vx * dt;
            s.y += s.vy * dt;
            s.vx *= 0.97;
            s.vy *= 0.97;
            s.alpha -= s.decay;

            if (s.alpha <= 0) {
                this.sparks.splice(j, 1);
            }
        }

        // 3. Update Shockwaves
        for (let k = this.shockwaves.length - 1; k >= 0; k--) {
            const sw = this.shockwaves[k];
            sw.radius += sw.speed * dt;
            sw.alpha -= sw.decay * dt;
            if (sw.alpha <= 0 || sw.radius >= sw.maxRadius) {
                this.shockwaves.splice(k, 1);
            }
        }

        // 4. Update Flashes
        for (let f = this.flashes.length - 1; f >= 0; f--) {
            const fl = this.flashes[f];
            fl.alpha -= fl.decay * dt;
            if (fl.alpha <= 0) {
                this.flashes.splice(f, 1);
            }
        }

        // 5. Update Burning Fire Embers
        for (let e = this.embers.length - 1; e >= 0; e--) {
            const ember = this.embers[e];
            ember.age += dt;
            ember.x += (ember.vx + Math.sin(ember.age * ember.flutterSpeed) * 35) * dt;
            ember.y += ember.vy * dt;
            ember.vy *= 0.985;
            ember.alpha -= ember.decay * dt;

            const progress = ember.age / ember.maxLife;
            const isLight = document.documentElement.dataset.scheme === 'light' && !document.documentElement.dataset.backgroundEffect;
            if (isLight) {
                if (progress < 0.25) {
                    ember.color = [234, 88, 12];
                } else if (progress < 0.65) {
                    ember.color = [220, 38, 38];
                } else {
                    ember.color = [153, 27, 27];
                }
            } else {
                if (progress < 0.25) {
                    ember.color = [255, 230, 110];
                } else if (progress < 0.65) {
                    ember.color = [255, 100, 15];
                } else {
                    ember.color = [220, 35, 5];
                }
            }

            if (ember.alpha <= 0 || ember.age >= ember.maxLife) {
                this.embers.splice(e, 1);
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        const accent = this.getThemeAccent();
        const isLight = document.documentElement.dataset.scheme === 'light' && !document.documentElement.dataset.backgroundEffect;

        // 1. Draw Sparks
        for (let i = 0; i < this.sparks.length; i++) {
            const s = this.sparks[i];
            let [r, g, b] = s.color;
            if (isLight && r > 240 && g > 240 && b > 240) {
                [r, g, b] = [accent[0], accent[1], accent[2]];
            }
            this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.max(s.alpha, 0)})`;
            this.ctx.beginPath();
            this.ctx.arc(s.x, s.y, isLight ? s.size * 1.15 : s.size, 0, Math.PI * 2);
            this.ctx.fill();
        }

        // 2. Draw Shockwaves
        for (let i = 0; i < this.shockwaves.length; i++) {
            const sw = this.shockwaves[i];
            const [r, g, b] = sw.color;
            this.ctx.beginPath();
            this.ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
            const swAlpha = isLight ? Math.min(1, sw.alpha * 1.25) : sw.alpha;
            this.ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${Math.max(swAlpha, 0)})`;
            const baseWidth = isLight ? sw.lineWidth * 1.4 : sw.lineWidth;
            this.ctx.lineWidth = Math.max(0.7, baseWidth * (1 - sw.radius / sw.maxRadius));
            this.ctx.stroke();
        }

        // 3. Draw Flashes
        for (let i = 0; i < this.flashes.length; i++) {
            const fl = this.flashes[i];
            const flashGrad = this.ctx.createRadialGradient(fl.x, fl.y, 0, fl.x, fl.y, fl.radius);
            if (isLight) {
                flashGrad.addColorStop(0, `rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, ${Math.max(fl.alpha * 0.45, 0)})`);
                flashGrad.addColorStop(0.4, `rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, ${Math.max(fl.alpha * 0.2, 0)})`);
                flashGrad.addColorStop(1, `rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, 0)`);
            } else {
                flashGrad.addColorStop(0, `rgba(255, 255, 255, ${Math.max(fl.alpha, 0)})`);
                flashGrad.addColorStop(0.35, `rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, ${Math.max(fl.alpha * 0.75, 0)})`);
                flashGrad.addColorStop(1, `rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, 0)`);
            }
            this.ctx.fillStyle = flashGrad;
            this.ctx.beginPath();
            this.ctx.arc(fl.x, fl.y, fl.radius, 0, Math.PI * 2);
            this.ctx.fill();
        }

        // 3.5. Draw Burning Fire Embers
        for (let i = 0; i < this.embers.length; i++) {
            const ember = this.embers[i];
            const [r, g, b] = ember.color;
            this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.max(ember.alpha, 0)})`;
            this.ctx.beginPath();
            this.ctx.arc(ember.x, ember.y, isLight ? ember.size * 1.1 : ember.size, 0, Math.PI * 2);
            this.ctx.fill();

            if (!this.isMobile && ember.alpha > 0.3) {
                const auraColor = isLight ? `rgba(234, 88, 12, ${ember.alpha * 0.35})` : `rgba(255, 80, 0, ${ember.alpha * 0.3})`;
                this.ctx.fillStyle = auraColor;
                this.ctx.beginPath();
                this.ctx.arc(ember.x, ember.y, ember.size * 2.2, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }

        // 4. Draw Meteors
        for (let i = 0; i < this.meteors.length; i++) {
            const m = this.meteors[i];
            const progress = m.age / m.maxLife;

            let alpha = 1;
            if (progress < 0.15) {
                alpha = progress / 0.15;
            } else if (progress > 0.75) {
                alpha = Math.max(0, (1 - progress) / 0.25);
            }

            const dir = Math.atan2(m.vy, m.vx);
            const tailX = m.x - Math.cos(dir) * m.length;
            const tailY = m.y - Math.sin(dir) * m.length;

            const grad = this.ctx.createLinearGradient(m.x, m.y, tailX, tailY);
            if (isLight) {
                grad.addColorStop(0, `rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, ${alpha * 0.98})`);
                grad.addColorStop(0.12, `rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, ${alpha * 0.85})`);
                grad.addColorStop(0.5, `rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, ${alpha * 0.4})`);
                grad.addColorStop(1, `rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, 0)`);
            } else {
                grad.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
                grad.addColorStop(0.08, `rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, ${alpha * 0.95})`);
                grad.addColorStop(0.4, `rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, ${alpha * 0.4})`);
                grad.addColorStop(1, `rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, 0)`);
            }

            this.ctx.beginPath();
            this.ctx.moveTo(tailX, tailY);
            this.ctx.lineTo(m.x, m.y);
            this.ctx.strokeStyle = grad;
            this.ctx.lineWidth = isLight ? m.thickness * 1.3 : m.thickness;
            this.ctx.lineCap = 'round';
            this.ctx.stroke();

            const headRadius = isLight ? m.thickness * 4.2 : m.thickness * 3.8;
            const headGlow = this.ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, headRadius);
            if (isLight) {
                headGlow.addColorStop(0, `rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, ${alpha})`);
                headGlow.addColorStop(0.4, `rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, ${alpha * 0.55})`);
                headGlow.addColorStop(1, `rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, 0)`);
            } else {
                headGlow.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
                headGlow.addColorStop(0.35, `rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, ${alpha * 0.85})`);
                headGlow.addColorStop(1, `rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, 0)`);
            }

            this.ctx.fillStyle = headGlow;
            this.ctx.beginPath();
            this.ctx.arc(m.x, m.y, headRadius, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
}

meteorShower = meteorCanvas ? new MeteorShower(meteorCanvas) : null;

if (meteorShowerToggle && meteorShower) {
    meteorShowerToggle.setAttribute('aria-pressed', String(meteorShower.active && document.documentElement.dataset.perfMode !== 'eco'));
    meteorShowerToggle.addEventListener('click', (e) => {
        if (document.documentElement.dataset.perfMode === 'eco') {
            e.preventDefault();
            e.stopPropagation();
            showEcoMeteorNotice();
            backgroundMenu.open = true;
            return;
        }
        meteorShower.setActive(!meteorShower.active, true);
        if (meteorShower.active) {
            recommendDarkMode('Meteor trails are recommended in dark mode for a clearer night-sky effect.');
        }
        backgroundMenu.open = true;
    });
}

if (heroMeteorBtn && meteorShower) {
    let wishClickCount = 0;
    let requiredWishClicks = Math.floor(Math.random() * 4) + 4; // 4 to 7 clicks required randomly
    let lastWishClickTime = 0;
    let wishResetTimer = 0;

    const handleWishAction = (e) => {
        if (document.documentElement.dataset.perfMode === 'eco' || document.documentElement.dataset.scheme === 'light') return;
        if (!meteorShower.active) {
            meteorShower.setActive(true, true);
        }
        const now = Date.now();
        if (now - lastWishClickTime < 280) return; // Prevent spam-clicking within 280ms
        lastWishClickTime = now;

        // Reset click progress if idle for more than 14 seconds
        clearTimeout(wishResetTimer);
        wishResetTimer = setTimeout(() => {
            wishClickCount = 0;
            requiredWishClicks = Math.floor(Math.random() * 4) + 4;
        }, 14000);

        // Visual feedback on the wish button badge
        heroMeteorBtn.classList.remove('wish-pulsing');
        void heroMeteorBtn.offsetWidth;
        heroMeteorBtn.classList.add('wish-pulsing');
        setTimeout(() => heroMeteorBtn.classList.remove('wish-pulsing'), 400);

        // Every click shoots a single graceful wishing meteor across the dark sky
        meteorShower.spawnMeteor({
            x: Math.random() * (window.innerWidth * 0.7),
            y: -20 - Math.random() * 30,
            speed: 1250 + Math.random() * 500,
            length: 150 + Math.random() * 120,
            canCollide: false
        });

        wishClickCount++;

        // Random chance once the minimum required clicks are satisfied
        const hasReachedClicks = wishClickCount >= requiredWishClicks;
        const cosmicLuck = Math.random() < 0.55;

        if (hasReachedClicks && (cosmicLuck || wishClickCount >= requiredWishClicks + 3)) {
            // A rare astronomical alignment! Cosmic event triggered!
            meteorShower.triggerRandomCosmicEvent();
            wishClickCount = 0;
            requiredWishClicks = Math.floor(Math.random() * 5) + 5; // next time 5 to 9 clicks
            clearTimeout(wishResetTimer);
        }
    };

    heroMeteorBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleWishAction(e);
    });

    heroMeteorBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleWishAction(e);
        }
    });
}

if (toastCloseBtn && meteorShower) {
    toastCloseBtn.addEventListener('click', () => {
        meteorShower.hideCosmicEventNotification();
    });
}

/*==================== Services Rainbow Icon Toggle ====================*/
const servicesRainbowToggle = document.getElementById('services-rainbow');
const servicesRainbowStorageKey = 'services-rainbow-icons';

if (servicesRainbowToggle) {
    let rainbowEnabled = document.documentElement.dataset.serviceIcons === 'rainbow';
    try {
        rainbowEnabled = rainbowEnabled || localStorage.getItem(servicesRainbowStorageKey) === 'true';
    } catch {}

    servicesRainbowToggle.checked = rainbowEnabled;
    if (rainbowEnabled) document.documentElement.dataset.serviceIcons = 'rainbow';

    servicesRainbowToggle.addEventListener('change', () => {
        if (servicesRainbowToggle.checked) {
            document.documentElement.dataset.serviceIcons = 'rainbow';
            try {
                localStorage.setItem(servicesRainbowStorageKey, 'true');
            } catch {}
        } else {
            delete document.documentElement.dataset.serviceIcons;
            try {
                localStorage.removeItem(servicesRainbowStorageKey);
            } catch {}
        }
    });
}

/*==================== Scroll Sections Active Link ====================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                const activeEl = document.querySelector('header nav a[href*=' + id + ']');
                if (activeEl) activeEl.classList.add('active');
            });
        };
    });

    /*==================== Sticky Navbar ====================*/
    let header = document.querySelector('header');
    if (header) header.classList.toggle('sticky', window.scrollY > 100);

    /*==================== Remove Toggle Icon and Navbar when click navbar link (scroll) ====================*/
    if (navbar && navbar.classList.contains('active')) setMobileMenuOpen(false);
};

/*==================== Scroll Reveal ====================*/
// Protected ScrollReveal
try { if (typeof ScrollReveal !== 'undefined') ScrollReveal({ 
    distance: '60px',
    duration: 1800,
    delay: 150,
    reset: false
});

if (typeof ScrollReveal !== 'undefined') { ScrollReveal().reveal('.hero-badge, .hero-greeting, .home-content h1, .hero-role, .hero-desc, .hero-btn-group, .heading, .section-tag', { origin: 'top', interval: 80 });
ScrollReveal().reveal('.home-img-wrapper, .hero-stats, .skills-container, .services-container, .portfolio-card, .cert-controls, .certificates-container, .contact-wrapper', { origin: 'bottom', interval: 100 });
ScrollReveal().reveal('.about-img-wrapper', { origin: 'left' });
ScrollReveal().reveal('.about-content', { origin: 'right' }); } } catch (e) {}

/*==================== Typed JS ====================*/
try { if (typeof Typed !== 'undefined' && document.querySelector('.multiple-text')) { window.typedInstance = new Typed('.multiple-text', {
    strings: ['Backend Developer', 'Web Developer', 'Robotics & IoT Enthusiast', 'AI Explorer'],
    typeSpeed: 65,
    backSpeed: 45,
    backDelay: 1500,
    loop: true,
    contentType: 'null'
}); } else { window.typedInstance = null; } } catch (e) { window.typedInstance = null; }

/*==================== Read More / Read Less (About Me) ====================*/
const readMoreBtn = document.getElementById('read-more-btn');
const moreText = document.querySelector('.more-text');

if (readMoreBtn && moreText) {
    readMoreBtn.addEventListener('click', function(e) {
        e.preventDefault();

        const isVisible = moreText.classList.contains('visible');
        if (isVisible) {
            moreText.classList.remove('visible');
            readMoreBtn.textContent = 'Read More';
        } else {
            moreText.classList.add('visible');
            readMoreBtn.textContent = 'Read Less';
        }
    });
}

/*==================== Feedback Confirmation Popup ====================*/
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const phoneInput = document.getElementById('contact-phone');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');
    const formStatus = document.getElementById('contact-form-status');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const phonePattern = /^[+]?[\d\s()-]{7,18}$/;

    const setFieldError = (input, errorMsg) => {
        if (!input) return;
        const wrap = input.closest('.input-field');
        const errId = input.getAttribute('aria-describedby');
        const errEl = errId ? document.getElementById(errId) : null;
        if (errorMsg) {
            if (wrap) wrap.classList.add('has-error');
            input.setAttribute('aria-invalid', 'true');
            if (errEl) errEl.textContent = errorMsg;
        } else {
            if (wrap) wrap.classList.remove('has-error');
            input.removeAttribute('aria-invalid');
            if (errEl) errEl.textContent = '';
        }
    };

    const validateSingleField = (input) => {
        if (!input) return '';
        const val = input.value.trim();
        if (input === nameInput) {
            if (!val) return 'Please enter your full name.';
            if (val.length < 2) return 'Name must be at least 2 characters long.';
        } else if (input === emailInput) {
            if (!val) return 'Please enter your email address.';
            if (!emailPattern.test(val)) return 'Please enter a valid email address (example: name@domain.com).';
        } else if (input === phoneInput) {
            if (val && !phonePattern.test(val)) return 'Please enter a valid phone number (7-18 digits) or leave it blank.';
        } else if (input === subjectInput) {
            if (val && val.length < 3) return 'Subject must be at least 3 characters or left blank.';
        } else if (input === messageInput) {
            if (!val) return 'Please write your message before sending.';
            if (val.length < 10) return 'Message must be at least 10 characters long.';
        }
        return '';
    };

    const clearAllFormErrors = () => {
        [nameInput, emailInput, phoneInput, subjectInput, messageInput].forEach((input) => setFieldError(input, ''));
        if (formStatus) {
            formStatus.hidden = true;
            formStatus.textContent = '';
        }
    };

    [nameInput, emailInput, phoneInput, subjectInput, messageInput].forEach((input) => {
        if (!input) return;
        input.addEventListener('input', () => {
            if (input.getAttribute('aria-invalid') === 'true') {
                setFieldError(input, validateSingleField(input));
            }
            if (formStatus && !formStatus.hidden) {
                formStatus.hidden = true;
                formStatus.textContent = '';
            }
        });
        input.addEventListener('blur', () => {
            if (input.value.trim() !== '') {
                setFieldError(input, validateSingleField(input));
            }
        });
    });

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const fields = [nameInput, emailInput, phoneInput, subjectInput, messageInput];
        let firstInvalid = null;
        let errorCount = 0;

        fields.forEach((input) => {
            const msg = validateSingleField(input);
            setFieldError(input, msg);
            if (msg) {
                errorCount++;
                if (!firstInvalid) firstInvalid = input;
            }
        });

        if (errorCount > 0) {
            if (formStatus) {
                formStatus.hidden = false;
                formStatus.textContent = `Please fix ${errorCount} highlighted field${errorCount > 1 ? 's' : ''} before submitting.`;
            }
            if (firstInvalid) firstInvalid.focus();
            return;
        }

        if (formStatus) {
            formStatus.hidden = true;
            formStatus.textContent = '';
        }

        const returnFocus = document.activeElement;
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'feedback-modal-backdrop';

        const modalBox = document.createElement('section');
        modalBox.className = 'feedback-modal';
        modalBox.setAttribute('role', 'dialog');
        modalBox.setAttribute('aria-modal', 'true');
        modalBox.setAttribute('aria-labelledby', 'feedback-modal-title');

        const confetti = document.createElement('div');
        confetti.className = 'feedback-confetti';
        confetti.setAttribute('aria-hidden', 'true');

        const themeStyles = getComputedStyle(document.documentElement);
        const confettiColors = [
            themeStyles.getPropertyValue('--main-color').trim(),
            themeStyles.getPropertyValue('--confetti-alt-color').trim(),
            themeStyles.getPropertyValue('--text-color').trim()
        ];
        for (let index = 0; index < 28; index++) {
            const piece = document.createElement('span');
            const angle = Math.random() * Math.PI * 2;
            const distance = 60 + Math.random() * 100;

            piece.className = 'feedback-confetti-piece';
            piece.style.setProperty('--confetti-x', `${Math.cos(angle) * distance}px`);
            piece.style.setProperty('--confetti-y', `${Math.sin(angle) * distance}px`);
            piece.style.setProperty('--confetti-rotation', `${Math.random() * 720 - 360}deg`);
            piece.style.setProperty('--confetti-color', confettiColors[index % confettiColors.length]);
            piece.style.setProperty('--confetti-delay', `${Math.random() * 0.12}s`);
            confetti.appendChild(piece);
        }

        const successMark = document.createElement('div');
        successMark.className = 'feedback-modal-mark';
        successMark.setAttribute('aria-hidden', 'true');

        const checkIcon = document.createElement('i');
        checkIcon.className = 'bx bx-check';
        successMark.appendChild(checkIcon);

        const modalTitle = document.createElement('h2');
        modalTitle.id = 'feedback-modal-title';
        modalTitle.textContent = 'Thank you!';

        const modalText = document.createElement('p');
        modalText.className = 'feedback-modal-message';
        modalText.textContent = 'Your message has been sent successfully.';

        const modalActions = document.createElement('div');
        modalActions.className = 'feedback-modal-actions';

        const actionHint = document.createElement('p');
        actionHint.textContent = 'Select OK to close this message.';

        const modalBtn = document.createElement('button');
        modalBtn.type = 'button';
        modalBtn.className = 'feedback-modal-button';
        modalBtn.textContent = 'OK';

        const closeModal = () => {
            modalOverlay.remove();
            window.removeEventListener('keydown', handleKeydown);
            contactForm.reset();
            clearAllFormErrors();
            returnFocus?.focus();
        };

        const handleKeydown = (keyEvent) => {
            if (keyEvent.key === 'Escape') {
                closeModal();
            }
        };

        modalBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (clickEvent) => {
            if (clickEvent.target === modalOverlay) {
                closeModal();
            }
        });
        window.addEventListener('keydown', handleKeydown);

        modalActions.append(actionHint, modalBtn);
        modalBox.append(confetti, successMark, modalTitle, modalText, modalActions);
        modalOverlay.appendChild(modalBox);
        document.body.appendChild(modalOverlay);
        modalBtn.focus();
    });
}

/*==================== Contact Email Copy Action ====================*/
const copyEmailBtn = document.getElementById('copy-email-btn');

if (copyEmailBtn) {
    let copyResetTimer = 0;

    const fallbackCopyText = (text) => {
        const helper = document.createElement('textarea');
        helper.value = text;
        helper.setAttribute('readonly', '');
        helper.style.position = 'fixed';
        helper.style.opacity = '0';
        helper.style.pointerEvents = 'none';
        document.body.appendChild(helper);
        helper.select();
        let ok = false;
        try {
            ok = document.execCommand('copy');
        } catch {}
        helper.remove();
        return ok;
    };

    const showCopiedState = (success) => {
        const icon = copyEmailBtn.querySelector('i');
        const label = copyEmailBtn.querySelector('span');
        if (copyResetTimer) clearTimeout(copyResetTimer);

        if (success) {
            copyEmailBtn.classList.add('is-copied');
            if (icon) icon.className = 'bx bx-check';
            if (label) label.textContent = 'Copied!';
        } else {
            if (label) label.textContent = 'Copy Failed';
        }

        copyResetTimer = setTimeout(() => {
            copyEmailBtn.classList.remove('is-copied');
            if (icon) icon.className = 'bx bx-copy';
            if (label) label.textContent = 'Copy Email';
        }, 2200);
    };

    copyEmailBtn.addEventListener('click', async () => {
        const email = copyEmailBtn.dataset.copyEmail || 'dafafairuzrahman@gmail.com';
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(email);
                showCopiedState(true);
            } else {
                showCopiedState(fallbackCopyText(email));
            }
        } catch {
            showCopiedState(fallbackCopyText(email));
        }
    });
}

/*==================== Astronomical Star-Chart Blueprint / Constellations (Light Mode) ====================*/
class ConstellationStarChart {
    constructor(canvas) {
        if (!canvas) return;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        if (!this.ctx) return;

        this.stars = [];
        this.rafId = 0;
        this.isMobile = this.checkIsMobileOrEco();
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.dpr = this.isMobile ? Math.min(window.devicePixelRatio || 1, 1.0) : Math.min(window.devicePixelRatio || 1, 1.75);
        this.lastTime = performance.now();
        this.active = false;
        this.pointer = { x: -1000, y: -1000, active: false };

        this.init();
    }

    getThemeAccent() {
        try {
            const root = document.documentElement;
            const style = getComputedStyle(root);
            const rgbStr = style.getPropertyValue('--accent-rgb').trim();
            if (rgbStr) {
                const parts = rgbStr.split(',').map(s => parseInt(s.trim(), 10));
                if (parts.length === 3 && parts.every(n => !isNaN(n))) {
                    return parts;
                }
            }
        } catch {}
        return [0, 229, 255];
    }

    checkIsMobileOrEco() {
        return window.innerWidth < 768 || ('ontouchstart' in window && window.innerWidth < 1024) || document.documentElement.dataset.perfMode === 'eco';
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize(), { passive: true });

        window.addEventListener('pointermove', (e) => {
            if (!this.active || document.body.classList.contains('lightbox-open')) return;
            this.pointer.x = e.clientX;
            this.pointer.y = e.clientY;
            this.pointer.active = true;
        }, { passive: true });

        window.addEventListener('pointerleave', () => {
            this.pointer.active = false;
        });

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                if (this.rafId) {
                    cancelAnimationFrame(this.rafId);
                    this.rafId = 0;
                }
            } else if (this.active && document.documentElement.dataset.scheme === 'light') {
                this.lastTime = performance.now();
                this.start();
            }
        });
    }

    resize() {
        this.isMobile = this.checkIsMobileOrEco();
        this.dpr = this.isMobile ? Math.min(window.devicePixelRatio || 1, 1.0) : Math.min(window.devicePixelRatio || 1, 1.75);
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = Math.round(this.width * this.dpr);
        this.canvas.height = Math.round(this.height * this.dpr);
        this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

        this.initStars();
        if (this.active) {
            this.draw();
        }
    }

    initStars() {
        this.stars = [];
        const area = this.width * this.height;
        const minStars = this.isMobile ? 14 : 30;
        const maxStars = this.isMobile ? 22 : 80;
        const count = Math.max(minStars, Math.min(maxStars, Math.floor(area / (this.isMobile ? 26000 : 20800))));
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        for (let i = 0; i < count; i++) {
            const isAnchor = Math.random() < (this.isMobile ? 0.15 : 0.2);
            const speed = reducedMotion ? 0 : (this.isMobile ? 5 + Math.random() * 8 : 7 + Math.random() * 12);
            const angle = Math.random() * Math.PI * 2;
            this.stars.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                radius: isAnchor ? 2.8 + Math.random() * 0.7 : 1.5 + Math.random() * 0.9,
                baseAlpha: isAnchor ? 0.75 + Math.random() * 0.2 : 0.4 + Math.random() * 0.35,
                twinkleSpeed: 1.2 + Math.random() * 2.2,
                twinklePhase: Math.random() * Math.PI * 2,
                isAnchor,
                reticleRadius: isAnchor ? 8.0 + Math.random() * 3.0 : 0
            });
        }
    }

    start() {
        if (document.documentElement.dataset.perfMode === 'eco') {
            this.stop();
            return;
        }
        this.active = true;
        if (this.rafId) return;
        this.lastTime = performance.now();

        const loop = (currentTime) => {
            if (!this.active || document.documentElement.dataset.scheme !== 'light' || document.documentElement.dataset.perfMode === 'eco') {
                this.stop();
                return;
            }

            const dt = Math.min((currentTime - this.lastTime) / 1000, 0.1);
            this.lastTime = currentTime;

            this.update(dt);
            this.draw(currentTime);

            this.rafId = requestAnimationFrame(loop);
        };

        this.rafId = requestAnimationFrame(loop);
    }

    stop() {
        this.active = false;
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
            this.rafId = 0;
        }
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.width, this.height);
        }
    }

    update(dt) {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reducedMotion) return;

        const pad = 24;
        for (let i = 0; i < this.stars.length; i++) {
            const s = this.stars[i];
            s.x += s.vx * dt;
            s.y += s.vy * dt;

            if (s.x < -pad) s.x = this.width + pad;
            else if (s.x > this.width + pad) s.x = -pad;

            if (s.y < -pad) s.y = this.height + pad;
            else if (s.y > this.height + pad) s.y = -pad;
        }
    }

    draw(currentTime = performance.now()) {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.width, this.height);
        const accent = this.getThemeAccent();
        const t = currentTime / 1000;
        const maxLinkDist = this.isMobile ? 110 : 125;
        const maxLinkDistSq = maxLinkDist * maxLinkDist;
        const pointerDist = 155;
        const pointerDistSq = pointerDist * pointerDist;

        // 1. Celestial Constellation Links (Batched into unified stroke paths)
        const regularLines = [];
        const anchorLines = [];

        for (let i = 0; i < this.stars.length; i++) {
            const s1 = this.stars[i];
            for (let j = i + 1; j < this.stars.length; j++) {
                const s2 = this.stars[j];
                const dx = s1.x - s2.x;
                const dy = s1.y - s2.y;
                const distSq = dx * dx + dy * dy;

                if (distSq < maxLinkDistSq) {
                    if (s1.isAnchor || s2.isAnchor) {
                        anchorLines.push(s1.x, s1.y, s2.x, s2.y);
                    } else {
                        regularLines.push(s1.x, s1.y, s2.x, s2.y);
                    }
                }
            }
        }

        // Draw regular celestial links in 1 GPU stroke call
        if (regularLines.length > 0) {
            this.ctx.beginPath();
            this.ctx.lineWidth = 0.85;
            this.ctx.strokeStyle = 'rgba(51, 65, 85, 0.18)';
            for (let k = 0; k < regularLines.length; k += 4) {
                this.ctx.moveTo(regularLines[k], regularLines[k + 1]);
                this.ctx.lineTo(regularLines[k + 2], regularLines[k + 3]);
            }
            this.ctx.stroke();
        }

        // Draw anchor links in 1 GPU stroke call
        if (anchorLines.length > 0) {
            this.ctx.beginPath();
            this.ctx.lineWidth = 1.0;
            this.ctx.strokeStyle = `rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, 0.28)`;
            for (let k = 0; k < anchorLines.length; k += 4) {
                this.ctx.moveTo(anchorLines[k], anchorLines[k + 1]);
                this.ctx.lineTo(anchorLines[k + 2], anchorLines[k + 3]);
            }
            this.ctx.stroke();
        }

        // 2. Interactive Cursor Constellation Lines & Telescope Focal Reticle
        if (this.pointer.active && this.pointer.x >= 0 && this.pointer.y >= 0) {
            this.ctx.beginPath();
            this.ctx.lineWidth = 1.0;
            this.ctx.strokeStyle = `rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, 0.42)`;
            for (let i = 0; i < this.stars.length; i++) {
                const s = this.stars[i];
                const dx = s.x - this.pointer.x;
                const dy = s.y - this.pointer.y;
                const distSq = dx * dx + dy * dy;

                if (distSq < pointerDistSq) {
                    this.ctx.moveTo(s.x, s.y);
                    this.ctx.lineTo(this.pointer.x, this.pointer.y);
                }
            }
            this.ctx.stroke();

            // Telescope reticle ring on cursor
            const curRadius = 16;
            this.ctx.beginPath();
            this.ctx.strokeStyle = `rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, 0.42)`;
            this.ctx.lineWidth = 1.0;
            this.ctx.arc(this.pointer.x, this.pointer.y, curRadius, 0, Math.PI * 2);
            this.ctx.stroke();

            // Reticle crosshair ticks
            const tickLen = 5;
            this.ctx.beginPath();
            this.ctx.moveTo(this.pointer.x, this.pointer.y - curRadius - tickLen);
            this.ctx.lineTo(this.pointer.x, this.pointer.y - curRadius + tickLen);
            this.ctx.moveTo(this.pointer.x, this.pointer.y + curRadius - tickLen);
            this.ctx.lineTo(this.pointer.x, this.pointer.y + curRadius + tickLen);
            this.ctx.moveTo(this.pointer.x - curRadius - tickLen, this.pointer.y);
            this.ctx.lineTo(this.pointer.x - curRadius + tickLen, this.pointer.y);
            this.ctx.moveTo(this.pointer.x + curRadius - tickLen, this.pointer.y);
            this.ctx.lineTo(this.pointer.x + curRadius + tickLen, this.pointer.y);
            this.ctx.stroke();

            // Cursor focal pin
            this.ctx.fillStyle = `rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, 0.75)`;
            this.ctx.beginPath();
            this.ctx.arc(this.pointer.x, this.pointer.y, 2.2, 0, Math.PI * 2);
            this.ctx.fill();
        }

        // 3. Draw Regular Stars in 1 Batched fill call
        this.ctx.beginPath();
        this.ctx.fillStyle = 'rgba(30, 41, 59, 0.65)';
        for (let i = 0; i < this.stars.length; i++) {
            const s = this.stars[i];
            if (!s.isAnchor) {
                this.ctx.moveTo(s.x + s.radius, s.y);
                this.ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
            }
        }
        this.ctx.fill();

        // 4. Draw Major Anchor Stars with Specialized Observatory Reticles
        for (let i = 0; i < this.stars.length; i++) {
            const s = this.stars[i];
            if (!s.isAnchor) continue;

            const twinkle = 0.75 + 0.25 * Math.sin(t * s.twinkleSpeed + s.twinklePhase);
            const currentAlpha = Math.min(1, Math.max(0.1, s.baseAlpha * twinkle));
            const reticleRad = s.reticleRadius + 0.5 * Math.sin(t * 1.5 + s.twinklePhase);

            // Observatory coordinate circle
            this.ctx.strokeStyle = `rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, ${currentAlpha * 0.52})`;
            this.ctx.lineWidth = 0.95;
            this.ctx.beginPath();
            this.ctx.arc(s.x, s.y, reticleRad, 0, Math.PI * 2);
            this.ctx.stroke();

            // Crosshair ticks (+)
            const tick = 3.6;
            this.ctx.beginPath();
            this.ctx.moveTo(s.x, s.y - reticleRad - tick);
            this.ctx.lineTo(s.x, s.y - reticleRad + 1);
            this.ctx.moveTo(s.x, s.y + reticleRad - 1);
            this.ctx.lineTo(s.x, s.y + reticleRad + tick);
            this.ctx.moveTo(s.x - reticleRad - tick, s.y);
            this.ctx.lineTo(s.x - reticleRad + 1, s.y);
            this.ctx.moveTo(s.x + reticleRad - 1, s.y);
            this.ctx.lineTo(s.x + reticleRad + tick, s.y);
            this.ctx.stroke();

            // Star core accent glow
            this.ctx.fillStyle = `rgba(${accent[0]}, ${accent[1]}, ${accent[2]}, ${currentAlpha * 0.88})`;
            this.ctx.beginPath();
            this.ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
            this.ctx.fill();

            // Deep star core pin
            this.ctx.fillStyle = `rgba(15, 23, 42, ${currentAlpha * 0.95})`;
            this.ctx.beginPath();
            this.ctx.arc(s.x, s.y, s.radius * 0.5, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
}

constellationChart = constellationCanvas ? new ConstellationStarChart(constellationCanvas) : null;
if (constellationChart && document.documentElement.dataset.scheme === 'light' && document.documentElement.dataset.perfMode !== 'eco') {
    constellationChart.start();
}

/*==================== PCB Trace Reveal (Robotics & IoT card) ====================*/
const pcbTrace = document.querySelector('.pcb-trace');

if (pcbTrace) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isEcoMode = document.documentElement.dataset.perfMode === 'eco';

    if (!prefersReducedMotion && !isEcoMode && 'IntersectionObserver' in window) {
        pcbTrace.classList.add('pcb-armed');

        const pcbObserver = new IntersectionObserver((entries, observer) => {
            if (entries.some(entry => entry.isIntersecting)) {
                pcbTrace.classList.add('is-live');
                observer.disconnect();
            }
        }, { threshold: 0.6 });

        pcbObserver.observe(pcbTrace);
    }
}


/*==================== Portfolio Project Lightbox Modal (Tahap 2) ====================*/
let isPortfolioLightboxInitialized = false;
function initPortfolioLightbox() {
    if (isPortfolioLightboxInitialized) return;
    const lightbox = document.getElementById('portfolio-lightbox');
    if (!lightbox) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initPortfolioLightbox, { once: true });
        }
        return;
    }

    const backdrop = document.getElementById('lightbox-backdrop');
    const closeBtn = document.getElementById('lightbox-close-btn');
    const prevBtn = document.getElementById('lightbox-arrow-prev');
    const nextBtn = document.getElementById('lightbox-arrow-next');
    const imgEl = document.getElementById('lightbox-image');
    const loaderEl = document.getElementById('lightbox-loader');
    const counterEl = document.getElementById('lightbox-counter');
    const categoryEl = document.getElementById('lightbox-category');
    const titleEl = document.getElementById('lightbox-title');
    const tagsContainer = document.getElementById('lightbox-tags');
    const descEl = document.getElementById('lightbox-desc');
    const lightboxStage = document.getElementById('lightbox-stage');
    const mediaWrap = document.getElementById('lightbox-media-wrap');
    const zoomInBtn = document.getElementById('lightbox-zoom-in');
    const zoomOutBtn = document.getElementById('lightbox-zoom-out');
    const zoomResetBtn = document.getElementById('lightbox-zoom-reset');
    const zoomLevelBadge = document.getElementById('lightbox-zoom-level');
    const fullscreenBtn = document.getElementById('lightbox-fullscreen-btn');
    const hdLink = document.getElementById('lightbox-hd-link');
    const verifyLink = document.getElementById('lightbox-verify-link');
    const toolbarDivider = document.getElementById('lightbox-toolbar-divider');
    const toolbarModeSwitch = document.getElementById('lightbox-toolbar-mode-switch');
    const footerModeToggle = document.getElementById('lightbox-mode-toggle-footer');
    const shellEl = lightbox.querySelector('.lightbox-shell');
    const cards = Array.from(document.querySelectorAll('.portfolio-card'));
    const certCards = Array.from(document.querySelectorAll('.certificate-card'));

    if (cards.length === 0 && certCards.length === 0) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initPortfolioLightbox, { once: true });
        }
        return;
    }

    isPortfolioLightboxInitialized = true;
    let activeGallery = 'portfolio';
    let currentIndex = 0;
    let lastActiveElement = null;

    // Zoom & Pan Engine state
    let zoomScale = 1.0;
    let panX = 0;
    let panY = 0;
    const MIN_ZOOM = 1.0;
    const MAX_ZOOM = 4.0;
    const ZOOM_STEP = 0.35;

    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragPanStartX = 0;
    let dragPanStartY = 0;

    // Collect project data from DOM
    const projects = cards.map((card, idx) => {
        const catBadge = card.querySelector('.portfolio-category-badge');
        const h4 = card.querySelector('.portfolio-body h3, .portfolio-body h4');
        const p = card.querySelector('.portfolio-body p');
        const tagSpans = card.querySelectorAll('.project-tags span');
        const img = card.querySelector('.portfolio-image-wrap img');

        const normalImg = card.dataset.normalImg || card.dataset.fullImg || (img ? img.getAttribute('src') : '');
        const ecoImg = card.dataset.ecoImg || card.dataset.fallbackImg || normalImg;
        const previewHd = card.dataset.previewHd || card.dataset.hdImg || card.dataset.fullImg || normalImg;
        const previewEco = card.dataset.previewEco || ecoImg || normalImg;
        const hdSvg = card.dataset.hdSvg || card.dataset.hdImg || '';
        const hdImg = card.dataset.hdImg || '';
        const fullImg = card.dataset.fullImg || normalImg;
        const fallbackImg = card.dataset.fallbackImg || ecoImg;
        const primaryImg = previewHd || fullImg;

        const tags = Array.from(tagSpans).map(span => span.textContent.trim());

        return {
            gallery: 'portfolio',
            index: idx,
            category: catBadge ? catBadge.textContent.trim() : 'Project',
            titleHTML: h4 ? h4.innerHTML : 'Project Title',
            titleText: h4 ? h4.textContent.trim() : 'Project Title',
            desc: p ? p.textContent.trim() : '',
            normalImg: normalImg,
            ecoImg: ecoImg,
            previewHd: previewHd,
            previewEco: previewEco,
            hdSvg: hdSvg,
            hdImg: hdImg,
            primaryImg: primaryImg,
            fullImg: fullImg,
            fallbackImg: fallbackImg,
            alt: img ? img.getAttribute('alt') || 'Project Preview' : 'Project Preview',
            tags: tags
        };
    });

    // Collect verified certificate data from DOM
    const certificates = certCards.map((card, idx) => {
        const catBadge = card.querySelector('.certificate-category-badge');
        const h4 = card.querySelector('.certificate-body h3, .certificate-body h4');
        const img = card.querySelector('.certificate-image-wrap img');
        const certId = card.dataset.certId || '';
        const issuer = card.dataset.certIssuer || 'Sololearn';
        const issuedDate = card.dataset.certDate || '';
        const pdfUrl = card.dataset.pdfUrl || '';
        const verifyUrl = card.dataset.verifyUrl || '';
        const normalImg = card.dataset.normalImg || (img ? img.getAttribute('src') : '');
        const previewHd = card.dataset.previewHd || normalImg;
        const previewEco = card.dataset.previewEco || normalImg;
        const customDesc = card.dataset.certDesc || `Verified completion certificate issued by ${issuer} on ${issuedDate} (Credential ID: ${certId}).`;

        return {
            gallery: 'certificate',
            cardEl: card,
            index: idx,
            category: catBadge ? catBadge.textContent.trim() : 'Certificate',
            titleHTML: h4 ? h4.innerHTML : 'Certificate',
            titleText: h4 ? h4.textContent.trim() : 'Certificate',
            desc: customDesc,
            normalImg: normalImg,
            ecoImg: normalImg,
            previewHd: previewHd,
            previewEco: previewEco,
            pdfUrl: pdfUrl,
            verifyUrl: verifyUrl,
            certId: certId,
            issuer: issuer,
            issuedDate: issuedDate,
            alt: img ? img.getAttribute('alt') || 'Certificate Preview' : 'Certificate Preview',
            tags: [issuer, issuedDate, certId ? `ID: ${certId}` : ''].filter(Boolean)
        };
    });

    const updateTransform = (animate = true) => {
        if (!imgEl) return;

        if (zoomScale <= 1.0) {
            zoomScale = 1.0;
            panX = 0;
            panY = 0;
            if (lightboxStage) lightboxStage.classList.remove('is-zoomed');
        } else {
            if (lightboxStage) lightboxStage.classList.add('is-zoomed');

            // Bounded panning so image doesn't fly off screen
            if (mediaWrap) {
                const wrapRect = mediaWrap.getBoundingClientRect();
                const maxPanX = Math.max(0, (wrapRect.width * (zoomScale - 1)) / 2 + 80);
                const maxPanY = Math.max(0, (wrapRect.height * (zoomScale - 1)) / 2 + 80);
                panX = Math.max(-maxPanX, Math.min(maxPanX, panX));
                panY = Math.max(-maxPanY, Math.min(maxPanY, panY));
            }
        }

        if (!animate) {
            imgEl.classList.add('no-transition');
        } else {
            imgEl.classList.remove('no-transition');
        }

        if (zoomScale === 1.0 && panX === 0 && panY === 0) {
            imgEl.style.transform = '';
        } else {
            imgEl.style.transform = `translate3d(${panX}px, ${panY}px, 0px) scale(${zoomScale})`;
        }

        if (zoomLevelBadge) {
            zoomLevelBadge.textContent = `${Math.round(zoomScale * 100)}%`;
        }
    };

    const setZoom = (newScale, focalX, focalY) => {
        const clampedScale = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, +newScale.toFixed(2)));
        if (focalX !== undefined && focalY !== undefined && clampedScale !== zoomScale && zoomScale > 0) {
            const factor = clampedScale / zoomScale;
            panX = focalX - factor * (focalX - panX);
            panY = focalY - factor * (focalY - panY);
        } else if (clampedScale === 1.0) {
            panX = 0;
            panY = 0;
        }
        zoomScale = clampedScale;
        updateTransform(true);
    };

    const zoomIn = () => {
        setZoom(Math.min(MAX_ZOOM, +(zoomScale + ZOOM_STEP).toFixed(2)));
    };

    const zoomOut = () => {
        setZoom(Math.max(MIN_ZOOM, +(zoomScale - ZOOM_STEP).toFixed(2)));
    };

    const resetZoom = () => {
        zoomScale = 1.0;
        panX = 0;
        panY = 0;
        updateTransform(true);
    };

    // Active preview mode: 'raster' (upscale HD photo/image) or 'svg' (interactive/animated vector)
    let currentViewMode = 'raster';

    // Outside background web pause manager to eliminate lag when lightbox is active
    const bgPauseState = {
        meteorShower: false,
        constellationChart: false,
        backgroundVideo: false,
        typed: false
    };

    const pauseOutsideWeb = () => {
        document.body.classList.add('lightbox-open');
        document.documentElement.dataset.lightboxActive = 'true';

        // 1. Meteor shower animation loop & cosmic events
        if (typeof meteorShower !== 'undefined' && meteorShower && meteorShower.active) {
            bgPauseState.meteorShower = true;
            try {
                meteorShower.pause();
                if (meteorShower.cosmicEventTimeout) {
                    clearTimeout(meteorShower.cosmicEventTimeout);
                    meteorShower.cosmicEventTimeout = 0;
                }
                if (typeof meteorShower.hideCosmicEventNotification === 'function') {
                    meteorShower.hideCosmicEventNotification();
                }
            } catch (e) {}
        }

        // 2. Constellation star chart animation loop
        if (typeof constellationChart !== 'undefined' && constellationChart && constellationChart.active) {
            bgPauseState.constellationChart = true;
            try { constellationChart.stop(); } catch (e) {}
        }

        // 3. Background video playback
        if (typeof backgroundVideo !== 'undefined' && backgroundVideo && !backgroundVideo.paused && !backgroundVideo.hidden) {
            bgPauseState.backgroundVideo = true;
            try { backgroundVideo.pause(); } catch (e) {}
        }

        // 4. Typed.js typing animation
        if (window.typedInstance && typeof window.typedInstance.stop === 'function') {
            bgPauseState.typed = true;
            try { window.typedInstance.stop(); } catch (e) {}
        }
    };

    const resumeOutsideWeb = () => {
        document.body.classList.remove('lightbox-open');
        delete document.documentElement.dataset.lightboxActive;

        const isEco = document.documentElement.dataset.perfMode === 'eco';

        // 1. Resume meteor shower (only when not in Eco mode)
        if (bgPauseState.meteorShower) {
            bgPauseState.meteorShower = false;
            if (!isEco && typeof meteorShower !== 'undefined' && meteorShower && meteorShower.active) {
                try {
                    meteorShower.lastTime = performance.now();
                    meteorShower.start();
                    if (typeof meteorShower.scheduleNextCosmicEvent === 'function') {
                        meteorShower.scheduleNextCosmicEvent();
                    }
                } catch (e) {}
            }
        }

        // 2. Resume constellation chart (only when not in Eco mode)
        if (bgPauseState.constellationChart) {
            bgPauseState.constellationChart = false;
            if (!isEco && typeof constellationChart !== 'undefined' && constellationChart && document.documentElement.dataset.scheme === 'light') {
                try { constellationChart.start(); } catch (e) {}
            }
        }

        // 3. Resume background video (only when not in Eco mode)
        if (bgPauseState.backgroundVideo) {
            bgPauseState.backgroundVideo = false;
            if (!isEco && typeof backgroundVideo !== 'undefined' && backgroundVideo && !backgroundVideo.hidden) {
                try { backgroundVideo.play().catch(() => {}); } catch (e) {}
            }
        }

        // 4. Resume Typed.js
        if (bgPauseState.typed) {
            bgPauseState.typed = false;
            if (window.typedInstance && typeof window.typedInstance.start === 'function') {
                try { window.typedInstance.start(); } catch (e) {}
            }
        }
    };

    const updateModeUI = (mode) => {
        const modeBtns = lightbox.querySelectorAll('[data-mode]');
        modeBtns.forEach(btn => {
            const isActive = btn.getAttribute('data-mode') === mode;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-checked', String(isActive));
        });
    };

    let currentMediaRequestId = 0;

    const getActiveList = () => (activeGallery === 'certificate' ? certificates : projects);

    const getNavigableIndices = () => {
        if (activeGallery !== 'certificate') {
            return projects.map((_, idx) => idx);
        }
        const visible = certificates
            .filter((item) => item.cardEl && !item.cardEl.classList.contains('is-filtered-out') && !item.cardEl.hidden)
            .map((item) => item.index);
        return visible.length > 0 ? visible : certificates.map((_, idx) => idx);
    };

    const syncLightboxGalleryControls = (isCert) => {
        if (toolbarDivider) toolbarDivider.hidden = isCert;
        if (toolbarModeSwitch) toolbarModeSwitch.hidden = isCert;
        if (footerModeToggle) footerModeToggle.hidden = isCert;
    };

    const applyCurrentProjectMedia = (resetScale = false) => {
        const list = getActiveList();
        const proj = list[currentIndex];
        if (!proj || !imgEl) return;

        if (resetScale) {
            resetZoom();
        }

        const requestId = ++currentMediaRequestId;
        const isEco = document.documentElement.dataset.perfMode === 'eco';
        let targetSrc = '';

        if (activeGallery === 'certificate') {
            targetSrc = isEco
                ? (proj.previewEco || proj.normalImg)
                : (proj.previewHd || proj.normalImg);

            if (hdLink) {
                hdLink.href = proj.pdfUrl || targetSrc;
                hdLink.removeAttribute('download');
                hdLink.title = 'Open original certificate PDF in new tab';
                const labelSpan = hdLink.querySelector('span');
                if (labelSpan) labelSpan.textContent = 'Open Original PDF';
            }
            if (verifyLink) {
                if (proj.verifyUrl) {
                    verifyLink.href = proj.verifyUrl;
                    verifyLink.hidden = false;
                    verifyLink.title = `Verify ${proj.titleText} (${proj.certId}) on ${proj.issuer || 'Issuer'}`;
                } else {
                    verifyLink.hidden = true;
                }
            }
        } else {
            // Portfolio Project:
            // - Khusus Project 4 (images7) & Project 7 (image10):
            //   * Mode Normal preview: memanggil versi HD upscale (images/images7_HD.jpg / images/image10_HD.jpg)
            //   * Mode Efisien ON dan preview: memanggil versi original (images/images7_orig.jpg / images/image10_orig.jpg)
            // - Proyek lainnya (1, 2, 3, 5, 6, 8): SELALU memanggil versi HD upscale (previewHd) saat preview!
            if (currentViewMode === 'svg') {
                targetSrc = proj.hdSvg || proj.hdImg || proj.previewHd;
            } else {
                const isSpecialProject = (proj.index === 3 || proj.index === 6 || /images7|image10/i.test(proj.normalImg || ''));
                if (isSpecialProject) {
                    targetSrc = isEco
                        ? (proj.previewEco || proj.normalImg || (proj.index === 3 ? 'images/images7_orig.jpg' : 'images/image10_orig.jpg'))
                        : (proj.previewHd || proj.hdImg || (proj.index === 3 ? 'images/images7_HD.jpg' : 'images/image10_HD.jpg'));
                } else {
                    targetSrc = isEco
                        ? (proj.previewEco || proj.normalImg || proj.ecoImg)
                        : (proj.previewHd || proj.hdImg || proj.fullImg || proj.normalImg);
                }
            }

            if (hdLink) {
                hdLink.href = targetSrc;
                hdLink.removeAttribute('download');
                hdLink.title = currentViewMode === 'svg'
                    ? 'Buka file vektor SVG animasi terpisah di tab baru'
                    : `Buka file resolusi penuh terpisah di tab baru (${targetSrc})`;
                const labelSpan = hdLink.querySelector('span');
                if (labelSpan) labelSpan.textContent = 'Buka File Tab Baru';
            }
            if (verifyLink) {
                verifyLink.hidden = true;
            }
        }

        console.log(`[Lightbox:${activeGallery}] Item ${currentIndex + 1} (${proj.titleText}) -> Loading: ${targetSrc} | Eco: ${isEco}`);

        imgEl.src = targetSrc;
        imgEl.alt = proj.alt;
        imgEl.classList.add('loading');
        if (loaderEl) loaderEl.classList.add('active');

        const newImg = new Image();
        newImg.src = targetSrc;

        newImg.onload = () => {
            if (requestId !== currentMediaRequestId) return;
            imgEl.src = targetSrc;
            imgEl.alt = proj.alt;
            imgEl.classList.remove('loading');
            if (loaderEl) loaderEl.classList.remove('active');
            updateTransform(!resetScale);
        };

        newImg.onerror = () => {
            if (requestId !== currentMediaRequestId) return;
            console.warn('[Lightbox] Failed to load:', targetSrc);
            const fallback = (activeGallery === 'portfolio' && currentViewMode === 'svg')
                ? (proj.previewHd || proj.normalImg)
                : (proj.normalImg || proj.ecoImg);
            if (fallback && fallback !== targetSrc) {
                imgEl.src = fallback;
                imgEl.alt = proj.alt;
            }
            imgEl.classList.remove('loading');
            if (loaderEl) loaderEl.classList.remove('active');
            updateTransform(!resetScale);
        };

        if (newImg.complete) {
            if (requestId === currentMediaRequestId) {
                imgEl.classList.remove('loading');
                if (loaderEl) loaderEl.classList.remove('active');
                updateTransform(!resetScale);
            }
        }
    };

    const setViewMode = (mode) => {
        if (activeGallery !== 'portfolio') return;
        if (mode !== 'svg' && mode !== 'raster') return;
        currentViewMode = mode;
        updateModeUI(mode);
        applyCurrentProjectMedia(false); // Keeps zoom level and pan coordinates!
    };

    const renderProject = (idx, gallery = activeGallery) => {
        activeGallery = gallery === 'certificate' ? 'certificate' : 'portfolio';
        const list = getActiveList();
        const proj = list[idx];
        if (!proj) return;

        currentIndex = idx;
        const isCert = activeGallery === 'certificate';
        syncLightboxGalleryControls(isCert);

        const navList = getNavigableIndices();
        const navPos = navList.indexOf(idx);
        const displayPos = navPos >= 0 ? navPos + 1 : idx + 1;
        const displayTotal = isCert ? navList.length : list.length;

        if (counterEl) {
            counterEl.textContent = isCert
                ? `Certificate ${displayPos} of ${displayTotal}`
                : `Project ${idx + 1} of ${list.length}`;
        }
        if (categoryEl) categoryEl.textContent = proj.category;
        if (titleEl) titleEl.innerHTML = proj.titleHTML;
        if (descEl) descEl.textContent = proj.desc;

        if (tagsContainer) {
            tagsContainer.innerHTML = '';
            const tagList = Array.isArray(proj.tags) ? proj.tags : [];
            tagList.forEach(tag => {
                const span = document.createElement('span');
                span.className = 'lightbox-tag-pill';
                span.textContent = tag;
                tagsContainer.appendChild(span);
            });
        }

        if (!isCert) updateModeUI(currentViewMode);
        applyCurrentProjectMedia(true);
    };

    const openLightbox = (idx, triggerElement, gallery = 'portfolio') => {
        const targetGallery = gallery === 'certificate' ? 'certificate' : 'portfolio';
        if (lightbox.classList.contains('active') && activeGallery === targetGallery && currentIndex === idx) return;
        try {
            lastActiveElement = triggerElement || document.activeElement;
            pauseOutsideWeb();
            lightbox.classList.add('active');
            lightbox.setAttribute('aria-hidden', 'false');
            renderProject(idx, targetGallery);
            if (closeBtn) closeBtn.focus();
        } catch (err) {
            console.error('Error opening lightbox:', err);
            pauseOutsideWeb();
            lightbox.classList.add('active');
            lightbox.setAttribute('aria-hidden', 'false');
        }
    };

    const openCertificateLightbox = (idx, triggerElement) => {
        openLightbox(idx, triggerElement, 'certificate');
    };

    const closeLightbox = () => {
        if (!lightbox.classList.contains('active')) return;

        resetZoom();
        if (shellEl) shellEl.classList.remove('stage-expanded');
        if (fullscreenBtn) {
            const icon = fullscreenBtn.querySelector('i');
            if (icon) icon.className = 'bx bx-fullscreen';
        }

        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');

        if (imgEl) {
            imgEl.src = '';
        }

        const isEco = document.documentElement.dataset.perfMode === 'eco';
        updatePortfolioCardsImageSource(isEco);
        resumeOutsideWeb();

        if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
            try {
                lastActiveElement.focus();
            } catch {}
        }
    };

    const nextProject = () => {
        const navList = getNavigableIndices();
        if (!navList.length) return;
        const pos = navList.indexOf(currentIndex);
        const nextIdx = pos >= 0 ? navList[(pos + 1) % navList.length] : navList[0];
        renderProject(nextIdx, activeGallery);
    };

    const prevProject = () => {
        const navList = getNavigableIndices();
        if (!navList.length) return;
        const pos = navList.indexOf(currentIndex);
        const prevIdx = pos >= 0 ? navList[(pos - 1 + navList.length) % navList.length] : navList[0];
        renderProject(prevIdx, activeGallery);
    };

    // Direct click listeners for certificate cards, buttons & zoom hints
    certCards.forEach((card, idx) => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.btn-certificate-view, a, button')) return;
            e.preventDefault();
            openCertificateLightbox(idx, card);
        });
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                if (e.target.closest('.btn-certificate-view, a, button')) return;
                e.preventDefault();
                openCertificateLightbox(idx, card);
            }
        });
    });

    document.querySelectorAll('.btn-certificate-view').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const openAttr = btn.getAttribute('data-cert-open');
            const card = btn.closest('.certificate-card');
            const cardAttr = card ? card.getAttribute('data-cert-index') : null;
            const idx = parseInt(openAttr !== null ? openAttr : cardAttr, 10);
            if (!isNaN(idx) && idx >= 0 && idx < certificates.length) {
                openCertificateLightbox(idx, btn);
            }
        });
    });

    document.querySelectorAll('.certificate-zoom-hint').forEach((hint) => {
        hint.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const card = hint.closest('.certificate-card');
            const idxAttr = hint.getAttribute('data-cert-open') || (card ? card.getAttribute('data-cert-index') : null);
            const idx = parseInt(idxAttr, 10);
            if (!isNaN(idx) && idx >= 0 && idx < certificates.length) {
                openCertificateLightbox(idx, hint);
            }
        });
    });

    const toggleFullscreen = () => {
        if (!shellEl) return;
        shellEl.classList.toggle('stage-expanded');
        if (fullscreenBtn) {
            const icon = fullscreenBtn.querySelector('i');
            if (icon) {
                if (shellEl.classList.contains('stage-expanded')) {
                    icon.className = 'bx bx-exit-fullscreen';
                    fullscreenBtn.setAttribute('title', 'Kembalikan Ukuran Stage');
                } else {
                    icon.className = 'bx bx-fullscreen';
                    fullscreenBtn.setAttribute('title', 'Perluas Panggung Gambar');
                }
            }
        }
    };

    // Direct click listeners for all Preview Project buttons
    document.querySelectorAll('.btn-portfolio-view').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const openAttr = btn.getAttribute('data-project-open');
            const card = btn.closest('.portfolio-card');
            const cardAttr = card ? card.getAttribute('data-project-index') : null;
            const idx = parseInt(openAttr !== null ? openAttr : cardAttr, 10);
            if (!isNaN(idx) && idx >= 0 && idx < projects.length) {
                openLightbox(idx, btn);
            }
        });
    });

    // Direct click listeners for all portfolio cards and keyboard navigation
    cards.forEach((card, idx) => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.btn-portfolio-view, a, button')) return;
            e.preventDefault();
            openLightbox(idx, card);
        });
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                if (e.target.closest('.btn-portfolio-view, a, button')) return;
                e.preventDefault();
                openLightbox(idx, card);
            }
        });
    });

    // Direct click listeners for image zoom hints
    document.querySelectorAll('.portfolio-zoom-hint').forEach((hint) => {
        hint.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const card = hint.closest('.portfolio-card');
            const idxAttr = hint.getAttribute('data-project-open') || (card ? card.getAttribute('data-project-index') : null);
            const idx = parseInt(idxAttr, 10);
            if (!isNaN(idx) && idx >= 0 && idx < projects.length) {
                openLightbox(idx, hint);
            }
        });
    });

    // Direct click listeners for all format switchers (Raster vs SVG Boost)
    document.querySelectorAll('#portfolio-lightbox [data-mode]').forEach((modeBtn) => {
        modeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const mode = modeBtn.getAttribute('data-mode');
            if (mode) setViewMode(mode);
        });
    });

    // Control buttons
    if (closeBtn) closeBtn.addEventListener('click', (e) => { e.preventDefault(); closeLightbox(); });
    if (backdrop) backdrop.addEventListener('click', (e) => { e.preventDefault(); closeLightbox(); });
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.preventDefault(); prevProject(); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.preventDefault(); nextProject(); });

    // Zoom toolbar controls
    if (zoomInBtn) zoomInBtn.addEventListener('click', (e) => { e.preventDefault(); zoomIn(); });
    if (zoomOutBtn) zoomOutBtn.addEventListener('click', (e) => { e.preventDefault(); zoomOut(); });
    if (zoomResetBtn) zoomResetBtn.addEventListener('click', (e) => { e.preventDefault(); resetZoom(); });
    if (fullscreenBtn) fullscreenBtn.addEventListener('click', (e) => { e.preventDefault(); toggleFullscreen(); });

    // Double-click on image to toggle zoom
    if (imgEl) {
        imgEl.addEventListener('dblclick', (e) => {
            e.preventDefault();
            if (zoomScale > 1.0) {
                resetZoom();
            } else {
                if (mediaWrap) {
                    const rect = mediaWrap.getBoundingClientRect();
                    const mouseX = e.clientX - (rect.left + rect.width / 2);
                    const mouseY = e.clientY - (rect.top + rect.height / 2);
                    setZoom(2.2, mouseX, mouseY);
                } else {
                    setZoom(2.2);
                }
            }
        });
    }

    // Mouse wheel zoom inside stage
    if (lightboxStage) {
        lightboxStage.addEventListener('wheel', (e) => {
            e.preventDefault();
            const rect = mediaWrap ? mediaWrap.getBoundingClientRect() : lightboxStage.getBoundingClientRect();
            const mouseX = e.clientX - (rect.left + rect.width / 2);
            const mouseY = e.clientY - (rect.top + rect.height / 2);

            if (e.deltaY < 0) {
                // Zoom in
                setZoom(Math.min(MAX_ZOOM, +(zoomScale + 0.25).toFixed(2)), mouseX, mouseY);
            } else {
                // Zoom out
                setZoom(Math.max(MIN_ZOOM, +(zoomScale - 0.25).toFixed(2)), mouseX, mouseY);
            }
        }, { passive: false });
    }

    // Drag-to-pan Pointer events (mouse & touch) when zoomed
    if (mediaWrap) {
        mediaWrap.addEventListener('pointerdown', (e) => {
            if (zoomScale <= 1.0) return;
            if (e.button !== 0) return; // Left mouse button or touch only

            isDragging = true;
            dragStartX = e.clientX;
            dragStartY = e.clientY;
            dragPanStartX = panX;
            dragPanStartY = panY;

            try { mediaWrap.setPointerCapture(e.pointerId); } catch {}
            if (lightboxStage) lightboxStage.classList.add('is-dragging');
            if (imgEl) imgEl.classList.add('no-transition');
            e.preventDefault();
        });

        mediaWrap.addEventListener('pointermove', (e) => {
            if (!isDragging) return;
            const dx = e.clientX - dragStartX;
            const dy = e.clientY - dragStartY;
            panX = dragPanStartX + dx;
            panY = dragPanStartY + dy;
            updateTransform(false);
        });

        const stopDragging = (e) => {
            if (!isDragging) return;
            isDragging = false;
            if (lightboxStage) lightboxStage.classList.remove('is-dragging');
            if (imgEl) imgEl.classList.remove('no-transition');
            try { mediaWrap.releasePointerCapture(e.pointerId); } catch {}
            updateTransform(true);
        };

        mediaWrap.addEventListener('pointerup', stopDragging);
        mediaWrap.addEventListener('pointercancel', stopDragging);
    }

    // Global Event Delegation for all portfolio buttons & lightbox controls
    document.addEventListener('click', (e) => {
        // 1. Lightbox close button
        const closeClicked = e.target.closest('#lightbox-close-btn, .lightbox-close-btn');
        if (closeClicked) {
            e.preventDefault();
            closeLightbox();
            return;
        }

        // 2. Lightbox backdrop
        if (e.target.id === 'lightbox-backdrop' || e.target.classList.contains('lightbox-backdrop')) {
            e.preventDefault();
            closeLightbox();
            return;
        }

        // 3. Navigation Arrows
        const prevClicked = e.target.closest('#lightbox-arrow-prev, .lightbox-arrow-prev');
        if (prevClicked) {
            e.preventDefault();
            prevProject();
            return;
        }

        const nextClicked = e.target.closest('#lightbox-arrow-next, .lightbox-arrow-next');
        if (nextClicked) {
            e.preventDefault();
            nextProject();
            return;
        }

        // 4. Zoom toolbar controls
        if (e.target.closest('#lightbox-zoom-in')) {
            e.preventDefault();
            zoomIn();
            return;
        }
        if (e.target.closest('#lightbox-zoom-out')) {
            e.preventDefault();
            zoomOut();
            return;
        }
        if (e.target.closest('#lightbox-zoom-reset')) {
            e.preventDefault();
            resetZoom();
            return;
        }
        if (e.target.closest('#lightbox-fullscreen-btn')) {
            e.preventDefault();
            toggleFullscreen();
            return;
        }

        // 5. Format Switcher button (PNG / Asli vs SVG Animasi)
        const modeBtn = e.target.closest('[data-mode]');
        if (modeBtn && lightbox.contains(modeBtn)) {
            e.preventDefault();
            const mode = modeBtn.getAttribute('data-mode');
            if (mode) setViewMode(mode);
            return;
        }

        // 6. Portfolio Card / Action Button / Preview Overlay
        const openTrigger = e.target.closest('[data-project-open], .btn-portfolio-view, .portfolio-zoom-hint, .portfolio-card');
        if (openTrigger) {
            const card = openTrigger.closest('.portfolio-card') || openTrigger;
            const indexAttr = openTrigger.getAttribute('data-project-open') || card.getAttribute('data-project-index');
            const idx = parseInt(indexAttr, 10);
            if (!isNaN(idx) && idx >= 0 && idx < projects.length) {
                e.preventDefault();
                openLightbox(idx, openTrigger, 'portfolio');
                return;
            }
        }

        // 7. Certificate Card / Action Button / Preview Overlay
        if (!e.target.closest('.cert-action-link')) {
            const certTrigger = e.target.closest('[data-cert-open], .btn-certificate-view, .certificate-zoom-hint, .certificate-card');
            if (certTrigger) {
                const card = certTrigger.closest('.certificate-card') || certTrigger;
                const indexAttr = certTrigger.getAttribute('data-cert-open') || card.getAttribute('data-cert-index');
                const idx = parseInt(indexAttr, 10);
                if (!isNaN(idx) && idx >= 0 && idx < certificates.length) {
                    e.preventDefault();
                    openCertificateLightbox(idx, certTrigger);
                    return;
                }
            }
        }
    });

    // Global programmatic access & engine handle
    window.__portfolioLightboxEngine = {
        open: openLightbox,
        openCertificate: openCertificateLightbox,
        close: closeLightbox,
        next: nextProject,
        prev: prevProject,
        zoomIn: zoomIn,
        zoomOut: zoomOut,
        zoomReset: resetZoom,
        toggleFullscreen: toggleFullscreen,
        setMode: setViewMode,
        getMode: () => currentViewMode,
        refreshMedia: () => applyCurrentProjectMedia(false)
    };
    window.openPortfolioLightbox = openLightbox;
    window.openCertificateLightbox = openCertificateLightbox;
    window.closePortfolioLightbox = closeLightbox;
    window.openPortfolio = openLightbox;
    window.setLightboxMode = setViewMode;
    window.getLightboxMode = () => currentViewMode;
    window.refreshPortfolioLightbox = () => applyCurrentProjectMedia(false);
    window.lightboxNext = nextProject;
    window.lightboxPrev = prevProject;
    window.lightboxZoomIn = zoomIn;
    window.lightboxZoomOut = zoomOut;
    window.lightboxZoomReset = resetZoom;
    window.lightboxToggleFullscreen = toggleFullscreen;

    // Process any request that was queued before lightbox initialization completed
    if (window.__portfolioPendingOpen && typeof window.__portfolioPendingOpen.idx === 'number') {
        const pending = window.__portfolioPendingOpen;
        window.__portfolioPendingOpen = null;
        openLightbox(pending.idx, pending.triggerEl, pending.gallery || 'portfolio');
    }

    if (window.__portfolioPendingMode && (window.__portfolioPendingMode === 'svg' || window.__portfolioPendingMode === 'raster')) {
        const pendingMode = window.__portfolioPendingMode;
        window.__portfolioPendingMode = null;
        setViewMode(pendingMode);
    }

    // Keyboard navigation (ESC, ArrowLeft, ArrowRight, +, -, 0)
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
            e.preventDefault();
            closeLightbox();
        } else if (e.key === 'ArrowRight' && zoomScale <= 1.0) {
            e.preventDefault();
            nextProject();
        } else if (e.key === 'ArrowLeft' && zoomScale <= 1.0) {
            e.preventDefault();
            prevProject();
        } else if (e.key === '+' || e.key === '=') {
            e.preventDefault();
            zoomIn();
        } else if (e.key === '-' || e.key === '_') {
            e.preventDefault();
            zoomOut();
        } else if (e.key === '0') {
            e.preventDefault();
            resetZoom();
        } else if ((e.key === 'v' || e.key === 'V') && activeGallery === 'portfolio') {
            e.preventDefault();
            setViewMode(currentViewMode === 'svg' ? 'raster' : 'svg');
        }
    });

    // Mobile touch swipe gestures (only active when not zoomed in)
    let touchStartX = 0;
    let touchStartY = 0;

    lightbox.addEventListener('touchstart', (e) => {
        if (zoomScale > 1.0) return; // Allow smooth panning on touch when zoomed
        if (e.touches.length === 1) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        if (zoomScale > 1.0) return;
        if (e.changedTouches.length === 1) {
            const diffX = e.changedTouches[0].clientX - touchStartX;
            const diffY = e.changedTouches[0].clientY - touchStartY;

            // Horizontal swipe with minimum distance & lower vertical variance
            if (Math.abs(diffX) > 50 && Math.abs(diffY) < 70) {
                if (diffX < 0) {
                    nextProject();
                } else {
                    prevProject();
                }
            }
        }
    }, { passive: true });
}

function initCertificateFilters() {
    const filterButtons = Array.from(document.querySelectorAll('.cert-filter-btn[data-cert-filter]'));
    const certCards = Array.from(document.querySelectorAll('.certificate-card[data-cert-category]'));
    const countStatus = document.getElementById('cert-count-status');
    if (!filterButtons.length || !certCards.length) return;

    const applyFilter = (category) => {
        let visibleCount = 0;
        certCards.forEach((card) => {
            const matches = category === 'all' || card.dataset.certCategory === category;
            card.classList.toggle('is-filtered-out', !matches);
            card.hidden = !matches;
            if (matches) {
                visibleCount++;
            }
        });

        filterButtons.forEach((btn) => {
            const isActive = btn.dataset.certFilter === category;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', String(isActive));
        });

        if (countStatus) {
            countStatus.textContent = `Showing ${visibleCount} of ${certCards.length} verified credentials`;
        }
    };

    filterButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            applyFilter(btn.dataset.certFilter || 'all');
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initPortfolioLightbox();
        initCertificateFilters();
    }, { once: true });
} else {
    initPortfolioLightbox();
    initCertificateFilters();
}
