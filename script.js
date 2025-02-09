// Three.js Arka Plan Animasyonu
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Kalp şekli oluşturma
const heartShape = new THREE.Shape();
const x = 0, y = 0;
heartShape.moveTo(x + 5, y + 5);
heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

const geometry = new THREE.ShapeGeometry(heartShape);
const material = new THREE.MeshBasicMaterial({ 
    color: 0xff6b6b,
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide 
});

const hearts = [];
for (let i = 0; i < 50; i++) {
    const heart = new THREE.Mesh(geometry, material.clone());
    heart.position.set(
        Math.random() * 100 - 50,
        Math.random() * 100 - 50,
        Math.random() * 100 - 50
    );
    heart.rotation.x = Math.random() * Math.PI;
    heart.rotation.y = Math.random() * Math.PI;
    heart.scale.set(0.2, 0.2, 0.2);
    hearts.push(heart);
    scene.add(heart);
}

camera.position.z = 30;

// Animasyon döngüsü
function animate() {
    requestAnimationFrame(animate);
    hearts.forEach(heart => {
        heart.rotation.x += 0.01;
        heart.rotation.y += 0.01;
        heart.position.y += Math.sin(Date.now() * 0.001) * 0.02;
    });
    renderer.render(scene, camera);
}
animate();

// Particle.js Konfigürasyonu
particlesJS('particles', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: ["#ff6b6b", "#ff8787", "#ffa8a8", "#ffc9c9"] },
        shape: {
            type: ["circle", "heart"],
            stroke: { width: 0 },
        },
        opacity: {
            value: 0.6,
            random: true,
            animation: { enable: true, speed: 1, minimumValue: 0.1, sync: false }
        },
        size: {
            value: 6,
            random: true,
            animation: { enable: true, speed: 4, minimumValue: 0.3, sync: false }
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            outMode: "out",
            bounce: false,
            attract: { enable: true, rotateX: 600, rotateY: 1200 }
        }
    },
    interactivity: {
        detectsOn: "canvas",
        events: {
            onHover: { enable: true, mode: "bubble" },
            onClick: { enable: true, mode: "push" },
            resize: true
        },
        modes: {
            bubble: {
                distance: 150,
                size: 8,
                duration: 2,
                opacity: 0.8,
                speed: 3
            },
            push: { particles_nb: 4 }
        }
    },
    retina_detect: true
});

// Sparkles oluşturma
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.top = Math.random() * 100 + 'vh';
    document.getElementById('sparkles').appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 1500);
}
setInterval(createSparkle, 50);

// Mesaj gösterme fonksiyonu
function showMessage() {
    const messages = [
        "💝 Kalbimin tek sahibi sensin!",
        "💑 Seninle her anım bir mucize!",
        "💖 Seni sonsuza dek seveceğim!",
        "💕 Hayatımın anlamısın!",
        "❤️ Sen benim her şeyimsin!",
        "💘 Seninle geçen her an paha biçilemez!",
        "💓 Aşkım sonsuza kadar sürecek!"
    ];
    
    const container = document.createElement('div');
    container.className = 'fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md animate__animated animate__fadeIn';
    
    const messageBox = document.createElement('div');
    messageBox.className = 'relative glass-effect p-12 rounded-[2rem] shadow-2xl max-w-md w-full mx-4 animate__animated animate__zoomIn';
    messageBox.innerHTML = `
        <div class="absolute -inset-1 bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 rounded-[2rem] opacity-20 blur-lg"></div>
        <div class="absolute -inset-2 bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 rounded-[2rem] opacity-10 animate-pulse"></div>
        <div class="relative z-10">
            <div class="text-6xl text-center mb-4 animate__animated animate__bounceIn">💌</div>
            <div class="overflow-hidden">
                <p class="text-3xl text-red-500 text-center font-great mb-8 neon-text leading-relaxed animate__animated animate__slideInUp">
                    ${messages[Math.floor(Math.random() * messages.length)]}
                </p>
            </div>
            <div class="flex flex-col gap-3">
                <button class="w-full bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 text-white py-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-poppins text-lg relative overflow-hidden group">
                    <span class="absolute inset-0 bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
                    <span class="relative">Kapat</span>
                </button>
            </div>
        </div>
    `;
    
    container.appendChild(messageBox);
    document.body.appendChild(container);
    
    // Event listener'ları düzeltme
    const closeModal = () => {
        container.classList.add('animate__fadeOut');
        messageBox.classList.add('animate__zoomOut');
        setTimeout(() => container.remove(), 500);
    };

    container.addEventListener('click', (e) => {
        if (e.target === container) {
            closeModal();
        }
    });
    
    messageBox.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
    });
}

// Sürpriz modal
function showSurprise() {
    const surprise = document.createElement('div');
    surprise.className = 'fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md animate__animated animate__fadeIn';
    
    const content = document.createElement('div');
    content.className = 'relative glass-effect p-12 rounded-[2rem] shadow-2xl max-w-2xl w-full mx-4 animate__animated animate__zoomIn';
    content.innerHTML = `
        <div class="absolute -inset-1 bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 rounded-[2rem] opacity-20 blur-lg"></div>
        <div class="absolute -inset-2 bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 rounded-[2rem] opacity-10 animate-pulse"></div>
        <div class="relative z-10">
            <div class="text-6xl text-center mb-4 animate__animated animate__bounceIn">🎁</div>
            <h3 class="text-4xl font-great text-red-500 mb-4 neon-text text-center animate__animated animate__slideInDown">Sürpriz!</h3>
            <p class="text-2xl text-gray-700 mb-8 font-dancing text-center animate__animated animate__fadeIn animate__delay-1s">
                Seni Çok Seviyorum! 💝
            </p>
            
            <div class="grid grid-cols-2 gap-6 mb-8">
                <div class="group relative overflow-hidden rounded-2xl animate__animated animate__zoomIn animate__delay-1s">
                    <div class="absolute inset-0 bg-gradient-to-br from-red-400 to-pink-500 opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
                    <div class="absolute inset-0 bg-white/30 backdrop-blur-sm opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
                    <div class="relative bg-white/20 p-10 rounded-2xl transform group-hover:scale-110 transition-all duration-500 text-5xl flex items-center justify-center">
                        <span class="transform group-hover:rotate-12 transition-transform duration-500">🎁</span>
                    </div>
                </div>
                <div class="group relative overflow-hidden rounded-2xl animate__animated animate__zoomIn animate__delay-2s">
                    <div class="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-500 opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
                    <div class="absolute inset-0 bg-white/30 backdrop-blur-sm opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
                    <div class="relative bg-white/20 p-10 rounded-2xl transform group-hover:scale-110 transition-all duration-500 text-5xl flex items-center justify-center">
                        <span class="transform group-hover:rotate-12 transition-transform duration-500">💝</span>
                    </div>
                </div>
                <div class="group relative overflow-hidden rounded-2xl animate__animated animate__zoomIn animate__delay-3s">
                    <div class="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
                    <div class="absolute inset-0 bg-white/30 backdrop-blur-sm opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
                    <div class="relative bg-white/20 p-10 rounded-2xl transform group-hover:scale-110 transition-all duration-500 text-5xl flex items-center justify-center">
                        <span class="transform group-hover:rotate-12 transition-transform duration-500">💖</span>
                    </div>
                </div>
                <div class="group relative overflow-hidden rounded-2xl animate__animated animate__zoomIn animate__delay-4s">
                    <div class="absolute inset-0 bg-gradient-to-br from-red-400 to-purple-500 opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
                    <div class="absolute inset-0 bg-white/30 backdrop-blur-sm opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
                    <div class="relative bg-white/20 p-10 rounded-2xl transform group-hover:scale-110 transition-all duration-500 text-5xl flex items-center justify-center">
                        <span class="transform group-hover:rotate-12 transition-transform duration-500">💕</span>
                    </div>
                </div>
            </div>
            
            <button class="w-full bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 text-white py-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-poppins text-lg relative overflow-hidden group animate__animated animate__fadeInUp animate__delay-5s">
                <span class="absolute inset-0 bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
                <span class="relative">Kapat</span>
            </button>
        </div>
    `;
    
    surprise.appendChild(content);
    document.body.appendChild(surprise);
    
    // Event listener'ları düzeltme
    const closeModal = () => {
        surprise.classList.add('animate__fadeOut');
        content.classList.add('animate__zoomOut');
        setTimeout(() => surprise.remove(), 500);
    };

    surprise.addEventListener('click', (e) => {
        if (e.target === surprise) {
            closeModal();
        }
    });
    
    content.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
    });

    // Her bir kartın üzerine gelindiğinde konfeti efekti
    const cards = content.querySelectorAll('.group');
    cards.forEach(card => {
        card.addEventListener('mouseenter', createConfetti);
    });
}

// Konfeti efekti
function createConfetti(event) {
    const colors = ['#ff6b6b', '#ff8787', '#ffa8a8', '#ffc9c9', '#ffb8d9', '#fcc2d7'];
    const shapes = ['❤️', '💖', '💝', '💕', '✨', '⭐'];
    
    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.innerHTML = shapes[Math.floor(Math.random() * shapes.length)];
        confetti.style.position = 'absolute';
        confetti.style.left = event.pageX + 'px';
        confetti.style.top = event.pageY + 'px';
        confetti.style.fontSize = Math.random() * 15 + 10 + 'px';
        confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.pointerEvents = 'none';
        confetti.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        confetti.style.zIndex = '1000';
        document.body.appendChild(confetti);

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 150 + 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        requestAnimationFrame(() => {
            confetti.style.transform = `translate(${tx}px, ${ty}px) rotate(${Math.random() * 720}deg)`;
            confetti.style.opacity = '0';
        });

        setTimeout(() => confetti.remove(), 1000);
    }
}

// Event Listeners
document.getElementById('showMessage').addEventListener('click', showMessage);
document.getElementById('showGallery').addEventListener('click', showSurprise);

// Kalp hover efekti
const heart = document.getElementById('heart');
heart.addEventListener('mouseover', function() {
    this.classList.add('animate__animated', 'animate__heartBeat');
    createHeartBurst(event);
});

heart.addEventListener('mouseout', function() {
    this.classList.remove('animate__animated', 'animate__heartBeat');
});

// Kalp patlama efekti
function createHeartBurst(event) {
    const colors = ['#ff6b6b', '#ff8787', '#ffa8a8', '#ffc9c9'];
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.left = event.pageX + 'px';
        heart.style.top = event.pageY + 'px';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        heart.style.pointerEvents = 'none';
        heart.style.transition = 'all 1s ease-out';
        heart.style.zIndex = '1000';
        document.body.appendChild(heart);

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 100 + 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        requestAnimationFrame(() => {
            heart.style.transform = `translate(${tx}px, ${ty}px) rotate(${Math.random() * 360}deg)`;
            heart.style.opacity = '0';
        });

        setTimeout(() => heart.remove(), 1000);
    }
} 