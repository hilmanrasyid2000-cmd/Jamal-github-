/**
 * PORTOFOLIO HILMAN RASYID KAIZAN - JAVASCRIPT
 * SMA NEGERI 70 JAKARTA
 * Features: Smooth Navigation Scroll, ScrollSpy, Intersection Observer, 2048 Game Engine, Contact Handling
 */

document.addEventListener('DOMContentLoaded', () => {
    /* =========================================================
       1. MOBILE SIDEBAR TOGGLE
       ========================================================= */
    const mobileToggle = document.getElementById('mobileToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const navLinks = document.querySelectorAll('.nav-link');

    function toggleSidebar() {
        sidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('active');
        
        const icon = mobileToggle.querySelector('i');
        if (sidebar.classList.contains('open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    }

    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleSidebar);
    }
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }

    /* =========================================================
       2. SMOOTH SCROLL NAVIGATION WITH PRECISE OFFSET
       ========================================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            
            const targetElem = document.querySelector(targetId);
            if (targetElem) {
                e.preventDefault();
                
                targetElem.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile sidebar if open
                if (window.innerWidth <= 768) {
                    closeSidebar();
                }
            }
        });
    });

    /* =========================================================
       3. SCROLLSPY (ACTIVE LINK ON SCROLL)
       ========================================================= */
    const sections = document.querySelectorAll('section[id]');
    
    function scrollSpy() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 140;
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector(`.sidebar-nav a[href*="${sectionId}"]`);

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
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
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('in-view'));
    }

    /* =========================================================
       5. 2048 GAME ENGINE
       ========================================================= */
    class Game2048 {
        constructor() {
            this.size = 4;
            this.board = [];
            this.score = 0;
            this.bestScore = parseInt(localStorage.getItem('game2048_bestScore') || '0', 10);
            this.won = false;
            this.over = false;

            this.gridElement = document.getElementById('gameGrid');
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
            this.board = Array(this.size).fill(null).map(() => Array(this.size).fill(0));
            this.score = 0;
            this.won = false;
            this.over = false;
            this.updateScoreDisplay();
            this.hideMessage();
            
            // Add 2 initial tiles
            this.addRandomTile();
            this.addRandomTile();
            this.render();
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

        addRandomTile() {
            const emptyCells = [];
            for (let r = 0; r < this.size; r++) {
                for (let c = 0; c < this.size; c++) {
                    if (this.board[r][c] === 0) {
                        emptyCells.push({ r, c });
                    }
                }
            }

            if (emptyCells.length > 0) {
                const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
                this.board[randomCell.r][randomCell.c] = Math.random() < 0.9 ? 2 : 4;
            }
        }

        render() {
            const existingTiles = this.gridElement.querySelectorAll('.tile');
            existingTiles.forEach(t => t.remove());

            const containerWidth = this.gridElement.clientWidth || 310;
            const gap = 8;
            const cellSize = (containerWidth - (gap * (this.size - 1))) / this.size;

            for (let r = 0; r < this.size; r++) {
                for (let c = 0; c < this.size; c++) {
                    const value = this.board[r][c];
                    if (value > 0) {
                        const tile = document.createElement('div');
                        tile.className = `tile tile-${value}`;
                        tile.style.width = `${cellSize}px`;
                        tile.style.height = `${cellSize}px`;
                        tile.style.transform = `translate(${c * (cellSize + gap)}px, ${r * (cellSize + gap)}px)`;

                        const inner = document.createElement('div');
                        inner.className = 'tile-inner';
                        inner.textContent = value;
                        tile.appendChild(inner);

                        this.gridElement.appendChild(tile);
                    }
                }
            }
        }

        move(direction) {
            if (this.over) return;

            let moved = false;
            const previousBoard = JSON.stringify(this.board);

            if (direction === 0) moved = this.moveUp();
            else if (direction === 1) moved = this.moveRight();
            else if (direction === 2) moved = this.moveDown();
            else if (direction === 3) moved = this.moveLeft();

            if (JSON.stringify(this.board) !== previousBoard) {
                this.addRandomTile();
                this.render();
                this.updateScoreDisplay();

                if (this.checkWin() && !this.won) {
                    this.won = true;
                    this.showMessage('Selamat! Anda Mencapai 2048!');
                } else if (this.checkGameOver()) {
                    this.over = true;
                    this.showMessage('Game Over! Coba lagi!');
                }
            }
        }

        slide(row) {
            let arr = row.filter(val => val !== 0);
            for (let i = 0; i < arr.length - 1; i++) {
                if (arr[i] === arr[i + 1]) {
                    arr[i] *= 2;
                    this.score += arr[i];
                    arr[i + 1] = 0;
                }
            }
            arr = arr.filter(val => val !== 0);
            while (arr.length < this.size) {
                arr.push(0);
            }
            return arr;
        }

        moveLeft() {
            for (let r = 0; r < this.size; r++) {
                this.board[r] = this.slide(this.board[r]);
            }
        }

        moveRight() {
            for (let r = 0; r < this.size; r++) {
                let reversed = this.board[r].slice().reverse();
                reversed = this.slide(reversed);
                this.board[r] = reversed.reverse();
            }
        }

        moveUp() {
            for (let c = 0; c < this.size; c++) {
                let col = [this.board[0][c], this.board[1][c], this.board[2][c], this.board[3][c]];
                col = this.slide(col);
                for (let r = 0; r < this.size; r++) {
                    this.board[r][c] = col[r];
                }
            }
        }

        moveDown() {
            for (let c = 0; c < this.size; c++) {
                let col = [this.board[3][c], this.board[2][c], this.board[1][c], this.board[0][c]];
                col = this.slide(col);
                for (let r = 0; r < this.size; r++) {
                    this.board[3 - r][c] = col[r];
                }
            }
        }

        checkWin() {
            for (let r = 0; r < this.size; r++) {
                for (let c = 0; c < this.size; c++) {
                    if (this.board[r][c] === 2048) return true;
                }
            }
            return false;
        }

        checkGameOver() {
            for (let r = 0; r < this.size; r++) {
                for (let c = 0; c < this.size; c++) {
                    if (this.board[r][c] === 0) return false;
                }
            }
            for (let r = 0; r < this.size; r++) {
                for (let c = 0; c < this.size; c++) {
                    if (c < this.size - 1 && this.board[r][c] === this.board[r][c + 1]) return false;
                    if (r < this.size - 1 && this.board[r][c] === this.board[r + 1][c]) return false;
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
                this.messageElement.classList.remove('game-over', 'game-won');
            }
        }

        setupEventListeners() {
            window.addEventListener('keydown', (e) => {
                if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
                    const gameSection = document.getElementById('game');
                    if (gameSection) {
                        const rect = gameSection.getBoundingClientRect();
                        if (rect.top < window.innerHeight && rect.bottom > 0) {
                            e.preventDefault();
                        }
                    }
                }

                switch (e.code) {
                    case 'ArrowUp':
                    case 'KeyW':
                        this.move(0);
                        break;
                    case 'ArrowRight':
                    case 'KeyD':
                        this.move(1);
                        break;
                    case 'ArrowDown':
                    case 'KeyS':
                        this.move(2);
                        break;
                    case 'ArrowLeft':
                    case 'KeyA':
                        this.move(3);
                        break;
                }
            });

            // Touch Swipe controls
            let touchStartX = 0;
            let touchStartY = 0;

            if (this.boardContainer) {
                this.boardContainer.addEventListener('touchstart', (e) => {
                    touchStartX = e.touches[0].clientX;
                    touchStartY = e.touches[0].clientY;
                }, { passive: true });

                this.boardContainer.addEventListener('touchend', (e) => {
                    if (!touchStartX || !touchStartY) return;

                    const touchEndX = e.changedTouches[0].clientX;
                    const touchEndY = e.changedTouches[0].clientY;

                    const dx = touchEndX - touchStartX;
                    const dy = touchEndY - touchStartY;

                    if (Math.abs(dx) > Math.abs(dy)) {
                        if (Math.abs(dx) > 30) {
                            if (dx > 0) this.move(1);
                            else this.move(3);
                        }
                    } else {
                        if (Math.abs(dy) > 30) {
                            if (dy > 0) this.move(2);
                            else this.move(0);
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
                this.render();
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
});
