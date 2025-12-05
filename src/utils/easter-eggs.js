// Easter Eggs Utility
// Enable hidden features triggered by specific key combinations or interactions

class EasterEggs {
    constructor() {
        this.konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        this.konamiIndex = 0;
        this.matrixActive = false;
        this.discoActive = false;
        this.logoClickCount = 0;
        this.logoClickTimer = null;
        this.typed = '';

        this.init();
    }

    init() {
        // Listen for keyboard events
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
    }

    handleKeyDown(e) {
        // Konami Code detection
        if (e.key === this.konamiCode[this.konamiIndex]) {
            this.konamiIndex++;
            if (this.konamiIndex === this.konamiCode.length) {
                this.activateKonamiCode();
                this.konamiIndex = 0;
            }
        } else {
            this.konamiIndex = 0;
        }

        // Matrix mode - type "MATRIX"
        this.typed += e.key.toUpperCase();
        if (this.typed.length > 10) {
            this.typed = this.typed.slice(-10);
        }

        if (this.typed.includes('MATRIX') && !this.matrixActive) {
            this.activateMatrix();
            this.typed = '';
        }

        if (this.typed.includes('EXIT') && this.matrixActive) {
            this.deactivateMatrix();
            this.typed = '';
        }

        // Debug mode
        if (e.key.toLowerCase() === 'd' && e.ctrlKey) {
            this.toggleDebugMode();
        }
    }

    activateKonamiCode() {
        console.log('🎮 KONAMI CODE ACTIVATED! GOD MODE ENABLED');

        // Glitch effect
        document.body.classList.add('konami-active');

        // Create celebration overlay
        const overlay = document.createElement('div');
        overlay.className = 'konami-overlay';
        overlay.innerHTML = `
      <div class="konami-content">
        <h1>🎮 GOD MODE ACTIVATED 🎮</h1>
        <p>You found the secret!</p>
      </div>
    `;
        document.body.appendChild(overlay);

        // Add particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'konami-particle';
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.animationDelay = Math.random() * 2 + 's';
            particle.style.backgroundColor = ['#00f0ff', '#ff0080', '#b026ff', '#39ff14'][Math.floor(Math.random() * 4)];
            overlay.appendChild(particle);
        }

        setTimeout(() => {
            overlay.remove();
            document.body.classList.remove('konami-active');
        }, 5000);
    }

    activateMatrix() {
        console.log('🟢 MATRIX MODE ACTIVATED');
        this.matrixActive = true;

        const matrix = document.createElement('div');
        matrix.id = 'matrix-rain';
        matrix.className = 'matrix-overlay';
        document.body.appendChild(matrix);

        // Create rain columns
        const columns = Math.floor(window.innerWidth / 20);
        for (let i = 0; i < columns; i++) {
            const column = document.createElement('div');
            column.className = 'matrix-column';
            column.style.left = i * 20 + 'px';
            column.style.animationDuration = 2 + Math.random() * 3 + 's';
            column.style.animationDelay = Math.random() * 2 + 's';
            column.textContent = this.generateMatrixString();
            matrix.appendChild(column);
        }

        setTimeout(() => {
            if (this.matrixActive) {
                this.deactivateMatrix();
            }
        }, 10000);
    }

    deactivateMatrix() {
        this.matrixActive = false;
        const matrix = document.getElementById('matrix-rain');
        if (matrix) {
            matrix.remove();
        }
    }

    generateMatrixString() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
        let result = '';
        for (let i = 0; i < 30; i++) {
            result += chars[Math.floor(Math.random() * chars.length)] + '\n';
        }
        return result;
    }

    toggleDebugMode() {
        const existing = document.getElementById('debug-panel');
        if (existing) {
            existing.remove();
            return;
        }

        const panel = document.createElement('div');
        panel.id = 'debug-panel';
        panel.className = 'debug-panel';
        panel.innerHTML = `
      <h4>🔧 Debug Mode</h4>
      <div id="debug-stats">
        <p>FPS: <span id="fps">--</span></p>
        <p>Scroll: <span id="scroll-pos">--</span></p>
        <p>Resolution: ${window.innerWidth}x${window.innerHeight}</p>
        <p>Device: ${navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop'}</p>
      </div>
    `;
        document.body.appendChild(panel);

        // FPS counter
        let lastTime = performance.now();
        let frameCount = 0;

        const updateFPS = () => {
            frameCount++;
            const now = performance.now();

            if (now - lastTime >= 1000) {
                const fps = Math.round(frameCount * 1000 / (now - lastTime));
                const fpsEl = document.getElementById('fps');
                if (fpsEl) fpsEl.textContent = fps;

                frameCount = 0;
                lastTime = now;
            }

            const scrollEl = document.getElementById('scroll-pos');
            if (scrollEl) scrollEl.textContent = Math.round(window.scrollY);

            if (document.getElementById('debug-panel')) {
                requestAnimationFrame(updateFPS);
            }
        };

        requestAnimationFrame(updateFPS);
    }

    handleLogoClick() {
        this.logoClickCount++;
        clearTimeout(this.logoClickTimer);

        this.logoClickTimer = setTimeout(() => {
            this.logoClickCount = 0;
        }, 500);

        if (this.logoClickCount >= 10) {
            this.activateDiscoMode();
            this.logoClickCount = 0;
        }
    }

    activateDiscoMode() {
        console.log('🕺 DISCO MODE ACTIVATED');
        document.body.classList.add('disco-mode');

        setTimeout(() => {
            document.body.classList.remove('disco-mode');
        }, 10000);
    }
}

// Initialize easter eggs
const easterEggs = new EasterEggs();

export default easterEggs;

// Add required CSS dynamically
const style = document.createElement('style');
style.textContent = `
  .konami-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.9);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: konamiIn 0.5s ease;
  }

  @keyframes konamiIn {
    from { opacity: 0; transform: scale(0.5); }
    to { opacity: 1; transform: scale(1); }
  }

  .konami-content {
    text-align: center;
  }

  .konami-content h1 {
    font-size: 3rem;
    background: linear-gradient(90deg, #00f0ff, #ff0080, #b026ff, #39ff14);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: rainbow 2s linear infinite;
    background-size: 400% 400%;
  }

  @keyframes rainbow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .konami-particle {
    position: fixed;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    animation: particleFall 3s linear forwards;
    top: -10px;
  }

  @keyframes particleFall {
    to { transform: translateY(100vh); opacity: 0; }
  }

  .matrix-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.9);
    z-index: 9999;
    overflow: hidden;
    pointer-events: none;
  }

  .matrix-column {
    position: absolute;
    top: -100%;
    color: #39ff14;
    font-family: monospace;
    font-size: 16px;
    white-space: pre;
    animation: matrixFall 5s linear infinite;
    text-shadow: 0 0 10px #39ff14;
  }

  @keyframes matrixFall {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }

  .debug-panel {
    position: fixed;
    top: 100px;
    right: 20px;
    background: rgba(0, 0, 0, 0.9);
    border: 1px solid #00f0ff;
    border-radius: 8px;
    padding: 1rem;
    z-index: 9999;
    font-family: monospace;
    font-size: 12px;
    color: #00f0ff;
  }

  .debug-panel h4 {
    margin: 0 0 0.5rem 0;
  }

  .debug-panel p {
    margin: 0.25rem 0;
  }

  .disco-mode * {
    animation: discoColors 0.5s linear infinite !important;
  }

  @keyframes discoColors {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
`;
document.head.appendChild(style);
