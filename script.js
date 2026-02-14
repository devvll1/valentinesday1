// Envelope opening
window.addEventListener('load', () => {
    const envelope = document.getElementById('envelopeOverlay');
    
    envelope.addEventListener('click', () => {
        envelope.classList.add('open');
        setTimeout(() => {
            envelope.style.display = 'none';
        }, 800);
    });
});

let currentImageIndex = 0;
const images = ['duck', 'duck1', 'duck2', 'duck3', 'fern1', 'fern2', 'fern3'];

function createHearts() {
    showImageSequence();
}

function showImageSequence() {
    const imageContainer = document.createElement('div');
    imageContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.5);
    `;
    
    const img = document.createElement('img');
    img.src = `img/${images[currentImageIndex]}.jpg`;
    img.style.cssText = `
        max-width: 70vw;
        max-height: 70vh;
        width: auto;
        height: auto;
        object-fit: contain;
        animation: fadeInOut 2s ease-in-out forwards;
        border-radius: 20px;
        box-shadow: 0 15px 50px rgba(255, 20, 147, 0.4);
    `;
    
    imageContainer.appendChild(img);
    document.body.appendChild(imageContainer);
    
    setTimeout(() => {
        // Check if this is the last image (fern3) before removing
        if (currentImageIndex === images.length - 1) {
            // Start falling effects while last image is visible
            triggerFallingEffects();
            
            // Remove container after falling effects complete
            setTimeout(() => {
                imageContainer.remove();
                currentImageIndex = 0;
            }, 4500);
        } else {
            imageContainer.remove();
            currentImageIndex++;
            setTimeout(() => showImageSequence(), 300);
        }
    }, 2000);
}

function triggerFallingEffects() {
    // Create falling ducks, purple flowers, and hearts
    const duration = 8000; // 4 seconds of falling effects
    const startTime = Date.now();
    
    const fallingItems = [
        { emoji: '🦆', color: 'black' },          // Falling ducks
        { emoji: '🌺', color: '#9932cc' },        // Purple flowers
        { emoji: '💜', color: '#9932cc' },        // Purple hearts
        { emoji: '❤️', color: '#ff1493' }         // Regular hearts
    ];
    
    function createFallingItem() {
        if (Date.now() - startTime > duration) return;
        
        const container = document.querySelector('.container');
        const item = document.createElement('div');
        
        const selectedItem = fallingItems[Math.floor(Math.random() * fallingItems.length)];
        item.textContent = selectedItem.emoji;
        item.style.position = 'absolute';
        item.style.left = Math.random() * 100 + '%';
        item.style.top = '-50px';
        item.style.fontSize = (Math.random() * 2 + 1.5) + 'em';
        item.style.pointerEvents = 'none';
        item.style.zIndex = '1500';
        item.style.userSelect = 'none';
        
        container.appendChild(item);
        
        let top = -50;
        const speed = Math.random() * 2 + 1.5;
        const xMovement = (Math.random() - 0.5) * 150;
        
        const animate = setInterval(() => {
            top += speed;
            const progress = top / 700;
            const xPos = xMovement * progress;
            
            item.style.opacity = Math.max(0, 1 - progress);
            item.style.transform = `translateY(${top}px) translateX(${xPos}px) rotate(${progress * 180}deg)`;
            
            if (top > 700) {
                clearInterval(animate);
                item.remove();
            }
        }, 30);
        
        setTimeout(createFallingItem, 100);
    }
    
    createFallingItem();
}

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
    }
`;
document.head.appendChild(style);

// Create automatic floating hearts on load
window.addEventListener('load', () => {
    setInterval(() => {
        const floatingHeartsContainer = document.querySelector('.floating-hearts');
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = Math.random() * 100 + '%';
        floatingHeartsContainer.appendChild(heart);
        
        setTimeout(() => heart.remove(), 4000);
    }, 500);
});