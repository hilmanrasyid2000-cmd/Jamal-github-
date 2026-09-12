/**
 * PORTOFOLIO HILMAN RASYID KAIZAN - JAVASCRIPT
 * SMA NEGERI 70 JAKARTA
 * Features: Smooth Navigation Scroll, ScrollSpy, Intersection Observer, 2048 Game Engine, Contact Handling
 */

document.addEventListener('DOMContentLoaded', () => {
    /* =========================================================
       1. TOP BAR MENU TOGGLE & DRAWER
       ========================================================= */
    const menuToggle = document.getElementById('menuToggle');
    const topMenuDrawer = document.getElementById('topMenuDrawer');
    const menuOverlay = document.getElementById('menuOverlay');
    const navLinks = document.querySelectorAll('.nav-link');

    function toggleMenu() {
        if (!topMenuDrawer) return;
        const isOpen = topMenuDrawer.classList.toggle('open');
        if (menuOverlay) menuOverlay.classList.toggle('active', isOpen);
        if (menuToggle) {
            menuToggle.classList.toggle('open', isOpen);
            menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            const icon = menuToggle.querySelector('.menu-btn-icon i');
            if (icon) {
                if (isOpen) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        }
    }

    function closeMenu() {
        if (!topMenuDrawer) return;
        topMenuDrawer.classList.remove('open');
        if (menuOverlay) menuOverlay.classList.remove('active');
        if (menuToggle) {
            menuToggle.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
            const icon = menuToggle.querySelector('.menu-btn-icon i');
            if (icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        }
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }

    // Close on Escape key press
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });

    /* =========================================================
       2. SEAMLESS SPA NAVIGATION & VIEW TRANSITIONS API
       ========================================================= */
    const topNavbar = document.getElementById('topNavbar');

    function getNavOffset() {
        return (topNavbar ? topNavbar.offsetHeight : 68) + 8;
    }

    // Dynamic re-initialization of page components after View Transition
    function reinitPageFeatures() {
        // Re-observe reveal elements
        const newReveals = document.querySelectorAll('.reveal:not(.in-view)');
        if ('IntersectionObserver' in window && newReveals.length > 0) {
            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                root: null,
                threshold: 0.1,
                rootMargin: '0px 0px -40px 0px'
            });
            newReveals.forEach(el => revealObserver.observe(el));
        } else {
            newReveals.forEach(el => el.classList.add('in-view'));
        }

        // Re-init carousel if present
        if (typeof initHeroCarousel === 'function') {
            initHeroCarousel();
        }

        // Re-init research modal if present
        if (typeof initResearchModal === 'function') {
            initResearchModal();
        }

        // Re-init 3D gallery carousel if present
        if (typeof initGalleryCarousel3D === 'function') {
            initGalleryCarousel3D();
        }

        // Re-init classical audio player if present
        if (typeof initClassicalAudioPlayer === 'function') {
            initClassicalAudioPlayer();
        }

        // Update active nav link
        scrollSpy();
    }

    // Cross-page navigation using View Transitions API
    async function navigateWithViewTransition(url, pushState = true) {
        closeMenu();

        if (!document.startViewTransition) {
            // Fallback for browsers without View Transitions API
            window.location.href = url;
            return;
        }

        const transition = document.startViewTransition(async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    window.location.href = url;
                    return;
                }
                const html = await response.text();
                const parser = new DOMParser();
                const newDoc = parser.parseFromString(html, 'text/html');

                // Update document title
                document.title = newDoc.title;

                // Update main content smoothly in-place
                const currentMain = document.querySelector('main.main') || document.querySelector('main');
                const newMain = newDoc.querySelector('main.main') || newDoc.querySelector('main');
                if (currentMain && newMain) {
                    currentMain.innerHTML = newMain.innerHTML;
                }

                if (pushState) {
                    history.pushState({}, '', url);
                }

                // Handle anchor or top scroll
                const urlObj = new URL(url, window.location.origin);
                if (urlObj.hash) {
                    const target = document.querySelector(urlObj.hash);
                    if (target) {
                        window.scrollTo({ top: target.offsetTop - getNavOffset(), behavior: 'instant' });
                    }
                } else {
                    window.scrollTo({ top: 0, behavior: 'instant' });
                }

                reinitPageFeatures();
            } catch (err) {
                console.warn('View Transition fetch failed, navigating traditionally:', err);
                window.location.href = url;
            }
        });

        try {
            await transition.finished;
        } catch (e) {
            // Ignored
        }
    }

    // Unified Link Interceptor (Smooth In-Page Scrolling + Cross-Page View Transition)
    document.addEventListener('click', (e) => {
        const anchor = e.target.closest('a');
        if (!anchor) return;

        const href = anchor.getAttribute('href');
        if (!href || href === '#' || href.startsWith('javascript:')) return;
        if (anchor.getAttribute('target') === '_blank') return;
        if (href.startsWith('mailto:') || href.startsWith('tel:')) return;

        // 1. In-Page Smooth Scroll Navigation (e.g. #home, #about, #experience)
        if (href.startsWith('#')) {
            const targetElem = document.querySelector(href);
            if (targetElem) {
                e.preventDefault();
                closeMenu();

                const headerOffset = getNavOffset();
                const elementPosition = targetElem.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                try {
                    history.pushState(null, '', href);
                } catch (err) {
                    // Ignored
                }

                // Subtle ambient focus pulse on target
                targetElem.classList.remove('highlight-pulse');
                void targetElem.offsetWidth; // Force reflow
                targetElem.classList.add('highlight-pulse');
                setTimeout(() => {
                    targetElem.classList.remove('highlight-pulse');
                }, 2400);
            }
            return;
        }

        // 2. Cross-Page Same-Origin View Transition
        try {
            const url = new URL(href, window.location.href);
            if (url.origin === window.location.origin) {
                // Same path with hash
                if (url.pathname === window.location.pathname) {
                    if (url.hash) {
                        const targetElem = document.querySelector(url.hash);
                        if (targetElem) {
                            e.preventDefault();
                            closeMenu();
                            const offsetPosition = targetElem.getBoundingClientRect().top + window.pageYOffset - getNavOffset();
                            window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                            });
                            history.pushState(null, '', url.hash);
                            return;
                        }
                    }
                } else {
                    // Different page -> trigger View Transition
                    e.preventDefault();
                    navigateWithViewTransition(url.href);
                }
            }
        } catch (err) {
            // Default browser action
        }
    });

    // Handle browser Back/Forward with View Transitions
    window.addEventListener('popstate', () => {
        if (document.startViewTransition) {
            navigateWithViewTransition(window.location.href, false);
        }
    });

    /* =========================================================
       3. SCROLLSPY (ACTIVE LINK ON SCROLL - DESKTOP & MOBILE)
       ========================================================= */
    const sections = document.querySelectorAll('section[id]');

    function scrollSpy() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const navOffset = getNavOffset() + 40;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - navOffset;
            const sectionId = current.getAttribute('id');
            const correspondingLinks = document.querySelectorAll(`a.nav-link[href="#${sectionId}"]`);

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                correspondingLinks.forEach(link => link.classList.add('active'));
            }
        });
    }
    window.addEventListener('scroll', scrollSpy, { passive: true });
    scrollSpy(); // Initial check

    /* =========================================================
       4. INTERSECTION OBSERVER FOR FLUID SECTION REVEAL
       ========================================================= */
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('in-view'));
    }

    /* =========================================================
       5. HERO SHOWCASE CAROUSEL (NETFLIX-STYLE AUTO-SLIDER)
       ========================================================= */
    function initHeroCarousel() {
        const carouselWrapper = document.getElementById('heroCarousel');
        const viewport = document.getElementById('carouselViewport');
        const track = document.getElementById('carouselTrack');
        const prevBtn = document.getElementById('carouselPrev');
        const nextBtn = document.getElementById('carouselNext');
        const counterEl = document.getElementById('carouselCurrent');
        const indicators = document.querySelectorAll('.carousel-indicators .indicator-bar');

        if (!carouselWrapper || !viewport || !track) return;

        const originalSlides = Array.from(track.querySelectorAll('.hero-carousel-slide'));
        const totalOriginal = originalSlides.length;
        if (totalOriginal === 0) return;

        // Infinite loop clones: Prepend clone of last, append clone of first
        const cloneFirst = originalSlides[0].cloneNode(true);
        cloneFirst.classList.add('slide-clone');
        const cloneLast = originalSlides[totalOriginal - 1].cloneNode(true);
        cloneLast.classList.add('slide-clone');

        track.appendChild(cloneFirst);
        track.insertBefore(cloneLast, track.firstChild);

        // Internal index: 1 corresponds to original slide 0
        let currentIndex = 1;
        let isTransitioning = false;
        let autoPlayTimer = null;
        const autoPlayDelay = 2800; // 2.8 seconds loop (within 2.5 - 3s)

        // Initial setup without animation
        track.style.transition = 'none';
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        void track.offsetWidth; // Force reflow

        function getRealIndex(index) {
            if (index === 0) return totalOriginal - 1;
            if (index === totalOriginal + 1) return 0;
            return index - 1;
        }

        function updateUI(realIndex) {
            if (counterEl) {
                counterEl.textContent = (realIndex + 1).toString();
            }

            indicators.forEach((ind, idx) => {
                const isActive = idx === realIndex;
                ind.classList.toggle('active', isActive);
                ind.setAttribute('aria-selected', isActive ? 'true' : 'false');

                // Reset and restart CSS fill animation on active indicator
                if (isActive) {
                    const fill = ind.querySelector('.indicator-fill');
                    if (fill) {
                        fill.style.animation = 'none';
                        void fill.offsetWidth; // Force reflow
                        fill.style.animation = '';
                    }
                }
            });
        }

        function moveToSlide(index, withTransition = true) {
            if (withTransition) {
                track.style.transition = 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)';
            } else {
                track.style.transition = 'none';
            }
            currentIndex = index;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;

            const realIndex = getRealIndex(currentIndex);
            updateUI(realIndex);
        }

        function nextSlide() {
            if (isTransitioning) return;
            isTransitioning = true;
            moveToSlide(currentIndex + 1, true);
        }

        function prevSlide() {
            if (isTransitioning) return;
            isTransitioning = true;
            moveToSlide(currentIndex - 1, true);
        }

        // Transition End listener for seamless infinite wrapping
        track.addEventListener('transitionend', () => {
            isTransitioning = false;

            if (currentIndex === totalOriginal + 1) {
                // Slid forward into clone of first slide -> snap seamlessly to real first slide
                track.style.transition = 'none';
                currentIndex = 1;
                track.style.transform = `translateX(-${currentIndex * 100}%)`;
                void track.offsetWidth; // Force reflow
            } else if (currentIndex === 0) {
                // Slid backward into clone of last slide -> snap seamlessly to real last slide
                track.style.transition = 'none';
                currentIndex = totalOriginal;
                track.style.transform = `translateX(-${currentIndex * 100}%)`;
                void track.offsetWidth; // Force reflow
            }
        });

        // Autoplay Management
        function startAutoPlay() {
            stopAutoPlay();
            carouselWrapper.classList.remove('paused');
            autoPlayTimer = setInterval(() => {
                nextSlide();
            }, autoPlayDelay);
        }

        function pauseAutoPlay() {
            carouselWrapper.classList.add('paused');
            stopAutoPlay();
        }

        function stopAutoPlay() {
            if (autoPlayTimer) {
                clearInterval(autoPlayTimer);
                autoPlayTimer = null;
            }
        }

        function resetAutoPlay() {
            stopAutoPlay();
            startAutoPlay();
        }

        // Arrow Controls
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetAutoPlay();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetAutoPlay();
            });
        }

        // Indicators Click
        indicators.forEach((ind) => {
            ind.addEventListener('click', () => {
                const targetSlide = parseInt(ind.getAttribute('data-slide'), 10);
                if (!isNaN(targetSlide) && !isTransitioning) {
                    isTransitioning = true;
                    moveToSlide(targetSlide + 1, true);
                    resetAutoPlay();
                }
            });
        });

        // Pause on Hover (PC)
        carouselWrapper.addEventListener('mouseenter', pauseAutoPlay);
        carouselWrapper.addEventListener('mouseleave', startAutoPlay);

        // Touch Swipe Handling (Mobile / HP)
        let touchStartX = 0;
        let touchStartY = 0;
        let isSwiping = false;
        let hasSwiped = false;

        viewport.addEventListener('touchstart', (e) => {
            pauseAutoPlay();
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            isSwiping = false;
            hasSwiped = false;
        }, { passive: true });

        viewport.addEventListener('touchmove', (e) => {
            const diffX = e.touches[0].clientX - touchStartX;
            const diffY = e.touches[0].clientY - touchStartY;
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
                isSwiping = true;
            }
        }, { passive: true });

        viewport.addEventListener('touchend', (e) => {
            if (isSwiping) {
                const touchEndX = e.changedTouches[0].clientX;
                const diffX = touchEndX - touchStartX;
                if (diffX < -38) {
                    hasSwiped = true;
                    nextSlide();
                    resetAutoPlay();
                } else if (diffX > 38) {
                    hasSwiped = true;
                    prevSlide();
                    resetAutoPlay();
                }
            }
            startAutoPlay();
            setTimeout(() => {
                hasSwiped = false;
                isSwiping = false;
            }, 60);
        }, { passive: true });

        // Prevent link click when swiping on touch screens
        track.querySelectorAll('.carousel-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (hasSwiped) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
        });

        // Visibility Change (pause when tab is in background)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAutoPlay();
            } else {
                startAutoPlay();
            }
        });

        // Start Initial AutoPlay
        updateUI(0);
        startAutoPlay();
    }

    initHeroCarousel();

    /* =========================================================
       6. RESEARCH TIMELINE MODALS (ISIF 2024 & OPSI 2025)
       ========================================================= */
    function initResearchModal() {
        const modalConfigs = [
            {
                openBtnId: 'openIsifModal',
                modalId: 'isifModal',
                closeBtnId: 'closeIsifModal',
                dismissBtnId: 'dismissIsifModal'
            },
            {
                openBtnId: 'openOpsiModal',
                modalId: 'opsiModal',
                closeBtnId: 'closeOpsiModal',
                dismissBtnId: 'dismissOpsiModal'
            },
            {
                openBtnId: 'openLautBerceritaModal',
                modalId: 'lautBerceritaModal',
                closeBtnId: 'closeLautBerceritaModal',
                dismissBtnId: 'dismissLautBerceritaModal'
            }
        ];

        modalConfigs.forEach(cfg => {
            const openBtn = document.getElementById(cfg.openBtnId);
            const modal = document.getElementById(cfg.modalId);
            const closeBtn = document.getElementById(cfg.closeBtnId);
            const dismissBtn = document.getElementById(cfg.dismissBtnId);

            if (!modal) return;

            function openModal() {
                modal.classList.add('active');
                modal.setAttribute('aria-hidden', 'false');
                document.body.classList.add('modal-open');

                // Focus on close button for accessible keyboard navigation
                if (closeBtn) {
                    setTimeout(() => closeBtn.focus(), 60);
                }
            }

            function closeModal() {
                modal.classList.remove('active');
                modal.setAttribute('aria-hidden', 'true');
                document.body.classList.remove('modal-open');

                // Restore focus to trigger button
                if (openBtn) {
                    openBtn.focus();
                }
            }

            if (openBtn) {
                openBtn.onclick = (e) => {
                    e.preventDefault();
                    openModal();
                };
                openBtn.onkeydown = (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openModal();
                    }
                };
            }

            if (closeBtn) {
                closeBtn.onclick = (e) => {
                    e.preventDefault();
                    closeModal();
                };
            }

            if (dismissBtn) {
                dismissBtn.onclick = (e) => {
                    e.preventDefault();
                    closeModal();
                };
            }

            // Click outside container (on backdrop) to dismiss
            modal.onclick = (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            };

            // Escape key dismiss handler
            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('active')) {
                    closeModal();
                }
            });
        });
    }

    initResearchModal();

    /* =========================================================
       7. 2048 GAME ENGINE (FLUID HARDWARE-ACCELERATED MOTION)
       ========================================================= */
    class Tile {
        constructor(x, y, value) {
            this.x = x;
            this.y = y;
            this.value = value || 2;
            this.previousPosition = null;
            this.mergedInto = null;
            this.isNew = false;
            this.isMerged = false;
            this.element = null;
            this.id = Tile.idCounter++;
        }

        savePosition() {
            this.previousPosition = { x: this.x, y: this.y };
        }

        updatePosition(x, y) {
            this.x = x;
            this.y = y;
        }
    }
    Tile.idCounter = 0;

    class Game2048 {
        constructor() {
            this.size = 4;
            this.grid = [];
            this.tiles = [];
            this.score = 0;
            this.bestScore = parseInt(localStorage.getItem('game2048_bestScore') || '0', 10);
            this.won = false;
            this.wonReported = false;
            this.over = false;
            this.isMoving = false;

            this.gridElement = document.getElementById('gameGrid');
            this.tileContainer = document.getElementById('tileContainer') || this.gridElement;
            this.boardContainer = document.getElementById('gameBoardContainer');
            this.scoreElement = document.getElementById('currentScore');
            this.bestScoreElement = document.getElementById('bestScore');
            this.messageElement = document.getElementById('gameMessage');
            this.messageText = document.getElementById('gameMessageText');
            this.newGameBtn = document.getElementById('newGameBtn');
            this.retryBtn = document.getElementById('retryBtn');

            if (!this.gridElement) return;

            this.init();
        }

        init() {
            this.updateBestScoreDisplay();
            this.setupEventListeners();
            this.startNewGame();
        }

        startNewGame() {
            if (this.tiles) {
                this.tiles.forEach(tile => {
                    if (tile.element && tile.element.parentNode) {
                        tile.element.remove();
                    }
                });
            }
            this.tiles = [];
            this.grid = Array(this.size).fill(null).map(() => Array(this.size).fill(null));
            this.score = 0;
            this.won = false;
            this.wonReported = false;
            this.over = false;
            this.isMoving = false;

            this.updateScoreDisplay();
            this.hideMessage();

            this.addRandomTile();
            this.addRandomTile();
            this.actuate();
        }

        updateScoreDisplay() {
            if (this.scoreElement) this.scoreElement.textContent = this.score;
            if (this.score > this.bestScore) {
                this.bestScore = this.score;
                localStorage.setItem('game2048_bestScore', this.bestScore.toString());
                this.updateBestScoreDisplay();
            }
        }

        updateBestScoreDisplay() {
            if (this.bestScoreElement) this.bestScoreElement.textContent = this.bestScore;
        }

        showScoreAddition(amount) {
            if (!this.scoreElement || amount <= 0) return;
            const scorePill = this.scoreElement.closest('.score-pill');
            if (!scorePill) return;

            const addition = document.createElement('span');
            addition.className = 'score-addition';
            addition.textContent = `+${amount}`;
            scorePill.appendChild(addition);

            setTimeout(() => {
                if (addition.parentNode) addition.remove();
            }, 650);
        }

        availableCells() {
            const cells = [];
            for (let x = 0; x < this.size; x++) {
                for (let y = 0; y < this.size; y++) {
                    if (!this.grid[x][y]) {
                        cells.push({ x, y });
                    }
                }
            }
            return cells;
        }

        addRandomTile() {
            const cells = this.availableCells();
            if (cells.length > 0) {
                const c = cells[Math.floor(Math.random() * cells.length)];
                const tile = new Tile(c.x, c.y, Math.random() < 0.9 ? 2 : 4);
                tile.isNew = true;
                this.grid[c.x][c.y] = tile;
                this.tiles.push(tile);
            }
        }

        withinBounds(x, y) {
            return x >= 0 && x < this.size && y >= 0 && y < this.size;
        }

        findFarthestPosition(cell, vector) {
            let previous;
            let next = { x: cell.x, y: cell.y };
            do {
                previous = next;
                next = { x: previous.x + vector.x, y: previous.y + vector.y };
            } while (this.withinBounds(next.x, next.y) && !this.grid[next.x][next.y]);

            return {
                farthest: previous,
                next: next
            };
        }

        move(direction) {
            if (this.over || this.isMoving) return;

            // 0: Up (y: -1), 1: Right (x: 1), 2: Down (y: 1), 3: Left (x: -1)
            const vectors = [
                { x: 0, y: -1 },
                { x: 1, y: 0 },
                { x: 0, y: 1 },
                { x: -1, y: 0 }
            ];
            const vector = vectors[direction];

            const traversals = {
                x: [0, 1, 2, 3],
                y: [0, 1, 2, 3]
            };
            if (vector.x === 1) traversals.x.reverse();
            if (vector.y === 1) traversals.y.reverse();

            // Prepare tiles: clear previous flags & record old positions
            this.tiles.forEach(tile => {
                tile.mergedInto = null;
                tile.isNew = false;
                tile.isMerged = false;
                tile.savePosition();
            });

            let moved = false;
            let scoreGain = 0;

            traversals.x.forEach(x => {
                traversals.y.forEach(y => {
                    const tile = this.grid[x][y];
                    if (tile) {
                        const positions = this.findFarthestPosition({ x, y }, vector);
                        const nextTile = this.withinBounds(positions.next.x, positions.next.y)
                            ? this.grid[positions.next.x][positions.next.y]
                            : null;

                        if (nextTile && nextTile.value === tile.value && !nextTile.mergedInto) {
                            const merged = new Tile(positions.next.x, positions.next.y, tile.value * 2);
                            merged.isMerged = true;

                            tile.mergedInto = merged;
                            nextTile.mergedInto = merged;

                            // Update grid
                            this.grid[x][y] = null;
                            this.grid[positions.next.x][positions.next.y] = merged;
                            this.tiles.push(merged);

                            tile.updatePosition(positions.next.x, positions.next.y);

                            this.score += merged.value;
                            scoreGain += merged.value;

                            if (merged.value === 2048) {
                                this.won = true;
                            }
                            moved = true;
                        } else {
                            this.grid[x][y] = null;
                            this.grid[positions.farthest.x][positions.farthest.y] = tile;
                            tile.updatePosition(positions.farthest.x, positions.farthest.y);

                            if (x !== positions.farthest.x || y !== positions.farthest.y) {
                                moved = true;
                            }
                        }
                    }
                });
            });

            if (moved) {
                this.isMoving = true;
                this.addRandomTile();

                if (scoreGain > 0) {
                    this.showScoreAddition(scoreGain);
                    this.updateScoreDisplay();
                }

                this.actuate();

                setTimeout(() => {
                    this.isMoving = false;
                }, 110);

                if (this.won && !this.wonReported) {
                    this.wonReported = true;
                    setTimeout(() => this.showMessage('Selamat! Anda Mencapai 2048!'), 260);
                } else if (this.checkGameOver()) {
                    this.over = true;
                    setTimeout(() => this.showMessage('Game Over! Coba lagi!'), 260);
                }
            }
        }

        actuate() {
            window.requestAnimationFrame(() => {
                const containerWidth = this.gridElement.clientWidth || 320;
                const gap = parseFloat(window.getComputedStyle(this.gridElement).gap) || 8;
                const cellSize = (containerWidth - (gap * (this.size - 1))) / this.size;

                this.tiles.forEach(tile => {
                    const targetX = tile.x * (cellSize + gap);
                    const targetY = tile.y * (cellSize + gap);

                    if (tile.mergedInto) {
                        // Sliding into target tile to merge
                        if (tile.element) {
                            tile.element.style.transform = `translate(${targetX}px, ${targetY}px)`;
                            tile.element.style.zIndex = '5';
                        }
                    } else if (!tile.element) {
                        // New tile or newly merged tile
                        const tileElem = document.createElement('div');
                        const valueClass = tile.value > 2048 ? 'tile-super' : `tile-${tile.value}`;
                        tileElem.className = `tile ${valueClass}`;
                        tileElem.style.width = `${cellSize}px`;
                        tileElem.style.height = `${cellSize}px`;

                        const inner = document.createElement('div');
                        inner.className = 'tile-inner';
                        inner.textContent = tile.value;
                        tileElem.appendChild(inner);

                        if (tile.isMerged) {
                            tileElem.style.transform = `translate(${targetX}px, ${targetY}px)`;
                            tileElem.classList.add('tile-merged');
                            tileElem.style.zIndex = '20';
                            this.tileContainer.appendChild(tileElem);
                            tile.element = tileElem;
                        } else if (tile.previousPosition) {
                            const prevX = tile.previousPosition.x * (cellSize + gap);
                            const prevY = tile.previousPosition.y * (cellSize + gap);
                            tileElem.style.transform = `translate(${prevX}px, ${prevY}px)`;
                            this.tileContainer.appendChild(tileElem);
                            tile.element = tileElem;

                            window.requestAnimationFrame(() => {
                                tileElem.style.transform = `translate(${targetX}px, ${targetY}px)`;
                            });
                        } else {
                            tileElem.style.transform = `translate(${targetX}px, ${targetY}px)`;
                            tileElem.classList.add('tile-new');
                            this.tileContainer.appendChild(tileElem);
                            tile.element = tileElem;
                        }
                    } else {
                        // Tile already exists: glide to new position smoothly
                        tile.element.style.width = `${cellSize}px`;
                        tile.element.style.height = `${cellSize}px`;
                        tile.element.style.zIndex = '10';
                        tile.element.style.transform = `translate(${targetX}px, ${targetY}px)`;

                        const valueClass = tile.value > 2048 ? 'tile-super' : `tile-${tile.value}`;
                        tile.element.className = `tile ${valueClass}`;
                        const inner = tile.element.querySelector('.tile-inner');
                        if (inner) inner.textContent = tile.value;
                    }
                });

                // Clean up merged component tiles after glide animation completes
                setTimeout(() => {
                    const activeTiles = [];
                    this.tiles.forEach(tile => {
                        if (tile.mergedInto) {
                            if (tile.element && tile.element.parentNode) {
                                tile.element.remove();
                            }
                        } else {
                            if (tile.element) {
                                tile.element.classList.remove('tile-new', 'tile-merged');
                            }
                            activeTiles.push(tile);
                        }
                    });
                    this.tiles = activeTiles;
                }, 130);
            });
        }

        checkGameOver() {
            if (this.availableCells().length > 0) return false;

            // Check if any adjacent cell has matching value
            for (let x = 0; x < this.size; x++) {
                for (let y = 0; y < this.size; y++) {
                    const tile = this.grid[x][y];
                    if (!tile) return false;

                    if (x < this.size - 1) {
                        const right = this.grid[x + 1][y];
                        if (right && right.value === tile.value) return false;
                    }
                    if (y < this.size - 1) {
                        const down = this.grid[x][y + 1];
                        if (down && down.value === tile.value) return false;
                    }
                }
            }
            return true;
        }

        showMessage(text) {
            if (this.messageElement && this.messageText) {
                this.messageText.textContent = text;
                this.messageElement.classList.add('game-over');
            }
        }

        hideMessage() {
            if (this.messageElement) {
                this.messageElement.classList.remove('game-over');
            }
        }

        setupEventListeners() {
            window.addEventListener('keydown', (e) => {
                const keys = {
                    'ArrowUp': 0, 'KeyW': 0,
                    'ArrowRight': 1, 'KeyD': 1,
                    'ArrowDown': 2, 'KeyS': 2,
                    'ArrowLeft': 3, 'KeyA': 3
                };

                if (keys[e.code] !== undefined) {
                    const gameSection = document.getElementById('game');
                    if (gameSection) {
                        const rect = gameSection.getBoundingClientRect();
                        if (rect.top < window.innerHeight && rect.bottom > 0) {
                            e.preventDefault();
                        }
                    }
                    this.move(keys[e.code]);
                }
            });

            // Touch Swipe controls
            let touchStartX = 0;
            let touchStartY = 0;

            if (this.boardContainer) {
                this.boardContainer.addEventListener('touchstart', (e) => {
                    if (e.touches.length > 1) return;
                    touchStartX = e.touches[0].clientX;
                    touchStartY = e.touches[0].clientY;
                }, { passive: true });

                this.boardContainer.addEventListener('touchmove', (e) => {
                    e.preventDefault();
                }, { passive: false });

                this.boardContainer.addEventListener('touchend', (e) => {
                    if (!touchStartX || !touchStartY || e.changedTouches.length === 0) return;

                    const touchEndX = e.changedTouches[0].clientX;
                    const touchEndY = e.changedTouches[0].clientY;

                    const dx = touchEndX - touchStartX;
                    const dy = touchEndY - touchStartY;

                    if (Math.max(Math.abs(dx), Math.abs(dy)) > 25) {
                        if (Math.abs(dx) > Math.abs(dy)) {
                            this.move(dx > 0 ? 1 : 3);
                        } else {
                            this.move(dy > 0 ? 2 : 0);
                        }
                    }
                }, { passive: true });
            }

            if (this.newGameBtn) {
                this.newGameBtn.addEventListener('click', () => this.startNewGame());
            }
            if (this.retryBtn) {
                this.retryBtn.addEventListener('click', () => this.startNewGame());
            }

            window.addEventListener('resize', () => {
                const containerWidth = this.gridElement.clientWidth || 320;
                const gap = parseFloat(window.getComputedStyle(this.gridElement).gap) || 8;
                const cellSize = (containerWidth - (gap * (this.size - 1))) / this.size;

                this.tiles.forEach(tile => {
                    if (tile.element) {
                        tile.element.style.transition = 'none';
                        tile.element.style.width = `${cellSize}px`;
                        tile.element.style.height = `${cellSize}px`;
                        const px = tile.x * (cellSize + gap);
                        const py = tile.y * (cellSize + gap);
                        tile.element.style.transform = `translate(${px}px, ${py}px)`;
                        setTimeout(() => {
                            if (tile.element) tile.element.style.transition = '';
                        }, 50);
                    }
                });
            });
        }
    }

    // Initialize 2048 Game
    const game = new Game2048();

    /* =========================================================
       6. CONTACT FORM & EMAIL HANDLER
       ========================================================= */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            const mailtoUrl = `mailto:hilmanrasyid2000@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nama: ${name}\n\nPesan:\n${message}`)}`;
            window.location.href = mailtoUrl;

            alert(`Terima kasih, ${name}! Email korespondensi telah disiapkan untuk dikirim ke hilmanrasyid2000@gmail.com.`);
            contactForm.reset();
        });
    }

    /* =========================================================
       7. 3D GALLERY CAROUSEL (PAUSE ONLY ON CLICK / TOUCH)
       ========================================================= */
    function initGalleryCarousel3D() {
        const ring = document.getElementById('carouselRing');
        if (!ring) return;

        const cards = ring.querySelectorAll('.carousel-3d-card');

        cards.forEach(card => {
            // Click or tap card to toggle pause
            card.addEventListener('click', (e) => {
                e.stopPropagation();
                const isAlreadySelected = card.classList.contains('selected');

                if (isAlreadySelected) {
                    // Clicking the currently paused card again resumes rotation
                    ring.classList.remove('is-paused');
                    card.classList.remove('selected');
                } else {
                    // Pause carousel on this card
                    ring.classList.add('is-paused');
                    cards.forEach(c => c.classList.remove('selected'));
                    card.classList.add('selected');
                }
            });

            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });

        // Resume when clicking outside any card
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.carousel-3d-card') && ring.classList.contains('is-paused')) {
                ring.classList.remove('is-paused');
                cards.forEach(c => c.classList.remove('selected'));
            }
        });
    }

    initGalleryCarousel3D();

    /* =========================================================
       8. CLASSICAL MUSIC AUDIO PLAYER & MINI CONTROLLER (JEAN SIBELIUS)
       ========================================================= */
    function initClassicalAudioPlayer() {
        const spotlightCard = document.getElementById('classicalSpotlight');
        if (!spotlightCard) return;

        let audio = document.getElementById('classicalAudio');
        if (!audio) {
            audio = new Audio();
            audio.id = 'classicalAudio';
            audio.preload = 'metadata';
            spotlightCard.appendChild(audio);
        }

        const badgeBtn = document.getElementById('spotlightAudioBadge');
        const badgeText = document.getElementById('audioBadgeText');
        const miniPlayer = document.getElementById('classicalMiniPlayer');
        const miniPlayBtn = document.getElementById('miniPlayerPlayBtn');
        const miniPlayIcon = document.getElementById('miniPlayIcon');
        const currentTimeDisplay = document.getElementById('audioCurrentTime');
        const durationDisplay = document.getElementById('audioTotalDuration');
        const seekbar = document.getElementById('audioSeekbar');

        // List of candidate relative audio paths to verify and fallback
        const candidatePaths = [
            './classic.mp3',
            './audio/classic.mp3',
            'classic.mp3',
            'audio/classic.mp3',
            'classic.mp3.mp3'
        ];
        let currentCandidateIdx = 0;
        let isSeeking = false;

        // Set initial source if not set
        if (!audio.getAttribute('src')) {
            audio.setAttribute('src', candidatePaths[0]);
        }

        function formatTime(seconds) {
            if (isNaN(seconds) || seconds === Infinity || seconds < 0) return '0:00';
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        }

        function updateDuration() {
            if (audio.duration && !isNaN(audio.duration) && audio.duration > 0) {
                if (durationDisplay) durationDisplay.textContent = formatTime(audio.duration);
                if (seekbar) {
                    seekbar.max = audio.duration.toFixed(2);
                }
            }
        }

        function updateUI(isPlaying) {
            if (isPlaying) {
                spotlightCard.classList.add('playing');
                spotlightCard.classList.add('has-played');
                spotlightCard.setAttribute('aria-pressed', 'true');
                if (badgeText) badgeText.textContent = 'Jeda Audio';
                if (miniPlayIcon) {
                    miniPlayIcon.classList.remove('fa-play');
                    miniPlayIcon.classList.add('fa-pause');
                }
            } else {
                spotlightCard.classList.remove('playing');
                spotlightCard.setAttribute('aria-pressed', 'false');
                if (badgeText) badgeText.textContent = 'Putar Audio';
                if (miniPlayIcon) {
                    miniPlayIcon.classList.remove('fa-pause');
                    miniPlayIcon.classList.add('fa-play');
                }
            }
        }

        function tryNextCandidate() {
            if (currentCandidateIdx < candidatePaths.length - 1) {
                currentCandidateIdx++;
                const nextPath = candidatePaths[currentCandidateIdx];
                console.warn(`[Audio Player] Mencoba fallback path berikutnya: "${nextPath}"`);
                audio.src = nextPath;
                audio.load();
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            console.log(`[Audio Player] Berhasil memutar via fallback: "${nextPath}"`);
                            updateUI(true);
                        })
                        .catch(err => {
                            console.error(`[Audio Player] Gagal memutar fallback "${nextPath}":`, err);
                            tryNextCandidate();
                        });
                }
            } else {
                console.error('[Audio Player] Semua kandidat path audio telah dicoba dan tidak ada yang berhasil dimuat. Pastikan file "classic.mp3" ada di root atau subfolder ./audio/.');
                updateUI(false);
            }
        }

        function toggleAudio() {
            if (!audio) return;

            if (audio.paused) {
                audio.volume = 1.0;
                audio.muted = false;
                spotlightCard.classList.add('has-played');
                console.log(`[Audio Player] Mencoba memutar audio: "${audio.currentSrc || audio.src}" (Volume: ${audio.volume}, Muted: ${audio.muted})`);
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            console.log('[Audio Player] Audio berhasil diputar.');
                            updateUI(true);
                        })
                        .catch(err => {
                            console.error('[Audio Player] Play error:', err);
                            tryNextCandidate();
                        });
                } else {
                    updateUI(true);
                }
            } else {
                audio.pause();
                console.log('[Audio Player] Audio dijeda.');
                updateUI(false);
            }
        }

        // Card Click (ignore if clicking inside mini-player or badge)
        spotlightCard.onclick = (e) => {
            if (e.target.closest('.classical-mini-player') || e.target.closest('#spotlightAudioBadge')) {
                return;
            }
            toggleAudio();
        };

        // Badge Button Click
        if (badgeBtn) {
            badgeBtn.onclick = (e) => {
                e.stopPropagation();
                toggleAudio();
            };
        }

        // Mini Player Play/Pause Button
        if (miniPlayBtn) {
            miniPlayBtn.onclick = (e) => {
                e.stopPropagation();
                toggleAudio();
            };
        }

        // Volume / Mute Toggle Button
        const volBtn = document.getElementById('miniPlayerVolBtn');
        const volIcon = document.getElementById('volIcon');
        if (volBtn) {
            volBtn.onclick = (e) => {
                e.stopPropagation();
                audio.muted = !audio.muted;
                if (audio.muted) {
                    volBtn.classList.add('muted');
                    if (volIcon) {
                        volIcon.classList.remove('fa-volume-high');
                        volIcon.classList.add('fa-volume-xmark');
                    }
                    console.log('[Audio Player] Suara dimatikan (Muted).');
                } else {
                    audio.volume = 1.0;
                    volBtn.classList.remove('muted');
                    if (volIcon) {
                        volIcon.classList.remove('fa-volume-xmark');
                        volIcon.classList.add('fa-volume-high');
                    }
                    console.log('[Audio Player] Suara aktif (Unmuted, volume 100%).');
                }
            };
        }

        // Keyboard Access on Card
        spotlightCard.onkeydown = (e) => {
            if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest('.classical-mini-player')) {
                e.preventDefault();
                toggleAudio();
            }
        };

        // Audio Events
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('durationchange', updateDuration);
        audio.addEventListener('canplay', updateDuration);

        audio.addEventListener('timeupdate', () => {
            if (!isSeeking && audio.duration) {
                const current = audio.currentTime || 0;
                if (currentTimeDisplay) currentTimeDisplay.textContent = formatTime(current);
                if (seekbar) {
                    seekbar.value = current;
                    const progressPercent = (current / audio.duration) * 100;
                    seekbar.style.setProperty('--progress', `${progressPercent}%`);
                }
            }
        });

        audio.addEventListener('ended', () => {
            console.log('[Audio Player] Pemutaran selesai.');
            updateUI(false);
            audio.currentTime = 0;
            if (seekbar) {
                seekbar.value = 0;
                seekbar.style.setProperty('--progress', '0%');
            }
            if (currentTimeDisplay) currentTimeDisplay.textContent = '0:00';
        });

        audio.addEventListener('error', (e) => {
            const err = audio.error;
            console.error(`[Audio Player] Error event fired pada path "${audio.currentSrc || audio.src}":`, err);
            tryNextCandidate();
        });

        // Seekbar Interactions
        if (seekbar) {
            seekbar.addEventListener('input', (e) => {
                e.stopPropagation();
                isSeeking = true;
                const seekVal = parseFloat(seekbar.value);
                if (currentTimeDisplay) currentTimeDisplay.textContent = formatTime(seekVal);
                if (audio.duration) {
                    const progressPercent = (seekVal / audio.duration) * 100;
                    seekbar.style.setProperty('--progress', `${progressPercent}%`);
                }
            });

            seekbar.addEventListener('change', (e) => {
                e.stopPropagation();
                const seekVal = parseFloat(seekbar.value);
                audio.currentTime = seekVal;
                isSeeking = false;
                console.log(`[Audio Player] Seek audio ke detik: ${seekVal.toFixed(1)}`);
            });

            seekbar.addEventListener('click', (e) => e.stopPropagation());
            seekbar.addEventListener('mousedown', (e) => e.stopPropagation());
            seekbar.addEventListener('touchstart', (e) => e.stopPropagation(), { passive: true });
        }
    }

    initClassicalAudioPlayer();
});
