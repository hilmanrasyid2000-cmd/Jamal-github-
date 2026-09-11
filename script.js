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
       5. 2048 GAME ENGINE (FLUID HARDWARE-ACCELERATED MOTION)
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
                const gap = 8;
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
                const gap = 8;
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
});
