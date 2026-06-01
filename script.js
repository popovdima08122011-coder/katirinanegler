// ========== ЛЕТАЮЩИЕ ФОТКИ ==========
const floatingImages = document.querySelectorAll('.float-img');
const imgData = [];

function initFloating() {
    const header = document.querySelector('.header');
    if (!header) return;
    const maxX = header.clientWidth - 100;
    const maxY = header.clientHeight - 130;

    floatingImages.forEach((img, idx) => {
        let x = Math.random() * maxX;
        let y = Math.random() * maxY;
        let speedX = (Math.random() * 0.5 + 0.2) * (Math.random() > 0.5 ? 1 : -1);
        let speedY = (Math.random() * 0.5 + 0.2) * (Math.random() > 0.5 ? 1 : -1);

        img.style.position = 'absolute';
        img.style.left = x + 'px';
        img.style.top = y + 'px';

        imgData[idx] = { speedX, speedY, hover: false };

        img.addEventListener('mouseenter', () => { imgData[idx].hover = true; });
        img.addEventListener('mouseleave', () => { imgData[idx].hover = false; });
    });
}

function animateFloating() {
    const header = document.querySelector('.header');
    if (!header) return;
    const maxX = header.clientWidth - 100;
    const maxY = header.clientHeight - 130;

    floatingImages.forEach((img, idx) => {
        const d = imgData[idx];
        if (!d || d.hover) return;

        let left = parseFloat(img.style.left);
        let top = parseFloat(img.style.top);
        if (isNaN(left)) return;

        let newLeft = left + d.speedX;
        let newTop = top + d.speedY;

        if (newLeft > maxX) { newLeft = maxX; d.speedX = -d.speedX; }
        if (newLeft < 10) { newLeft = 10; d.speedX = -d.speedX; }
        if (newTop > maxY) { newTop = maxY; d.speedY = -d.speedY; }
        if (newTop < 10) { newTop = 10; d.speedY = -d.speedY; }

        img.style.left = newLeft + 'px';
        img.style.top = newTop + 'px';
    });
    requestAnimationFrame(animateFloating);
}

window.addEventListener('resize', () => {
    const header = document.querySelector('.header');
    if (!header) return;
    const maxX = header.clientWidth - 100;
    const maxY = header.clientHeight - 130;
    floatingImages.forEach((img) => {
        let left = parseFloat(img.style.left);
        let top = parseFloat(img.style.top);
        if (left > maxX) img.style.left = maxX + 'px';
        if (top > maxY) img.style.top = maxY + 'px';
        if (left < 10) img.style.left = '10px';
        if (top < 10) img.style.top = '10px';
    });
});

initFloating();
animateFloating();

// ========== ОТКРЫТИЕ ФОТО (ПОРТФОЛИО + ЖЕНЩИНА) ==========
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = document.querySelector('.close');

// Все фото, которые должны открываться
const allOpenable = document.querySelectorAll('.portfolio-click, .img-sait');

allOpenable.forEach(img => {
    img.addEventListener('click', (e) => {
        e.stopPropagation();
        if (modal && modalImg) {
            modal.style.display = 'flex';
            modalImg.src = img.src;
        }
    });
});

// Закрытие
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        if (modal) modal.style.display = 'none';
    });
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}