// Session timeout duration (30 minutes)
const SESSION_TIMEOUT = 30 * 60 * 1000;
let sessionTimer;
let warningShown = false;

// Gallery state
let currentGalleryIndex = 0;
let galleryImages = [];

// Function to start session timer
function startSessionTimer() {
    clearTimeout(sessionTimer);
    warningShown = false;
    sessionTimer = setTimeout(checkSession, SESSION_TIMEOUT - 60000); // Warning 1 minute before timeout
}

// Function to check session
function checkSession() {
    if (!warningShown) {
        showTimeoutWarning();
        warningShown = true;
        setTimeout(logout, 60000); // Logout after 1 minute warning
    }
}

// Function to show timeout warning
function showTimeoutWarning() {
    const warning = document.createElement('div');
    warning.className = 'timeout-warning';
    warning.innerHTML = 'Your session will expire in 1 minute. Click anywhere to stay logged in.';
    document.body.appendChild(warning);
    
    // Remove warning and reset session on any user interaction
    document.addEventListener('click', resetSession);
    document.addEventListener('keypress', resetSession);
    document.addEventListener('mousemove', resetSession);
}

// Function to reset session
function resetSession() {
    const warning = document.querySelector('.timeout-warning');
    if (warning) {
        warning.remove();
    }
    document.removeEventListener('click', resetSession);
    document.removeEventListener('keypress', resetSession);
    document.removeEventListener('mousemove', resetSession);
    startSessionTimer();
}

// Function to logout
function logout() {
    const dashboard = document.querySelector('.admin-dashboard');
    if (dashboard) {
        dashboard.remove();
    }
    alert('Your session has expired. Please log in again.');
    location.reload();
}

// Gallery functions
function showGallery(images, startIndex) {
    galleryImages = images;
    currentGalleryIndex = startIndex;

    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <span class="gallery-close">&times;</span>
        <span class="gallery-nav gallery-prev">&lt;</span>
        <span class="gallery-nav gallery-next">&gt;</span>
        <img src="${images[startIndex]}" alt="Gallery image">
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';

    // Event listeners for gallery controls
    const closeBtn = modal.querySelector('.gallery-close');
    const prevBtn = modal.querySelector('.gallery-prev');
    const nextBtn = modal.querySelector('.gallery-next');

    closeBtn.onclick = () => modal.remove();
    prevBtn.onclick = () => navigateGallery(-1);
    nextBtn.onclick = () => navigateGallery(1);

    // Close on outside click
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };

    // Keyboard navigation
    document.addEventListener('keydown', handleGalleryKeys);
}

function navigateGallery(direction) {
    currentGalleryIndex = (currentGalleryIndex + direction + galleryImages.length) % galleryImages.length;
    const modal = document.querySelector('.gallery-modal');
    if (modal) {
        const img = modal.querySelector('img');
        img.src = galleryImages[currentGalleryIndex];
    }
}

function handleGalleryKeys(e) {
    if (e.key === 'Escape') {
        const modal = document.querySelector('.gallery-modal');
        if (modal) modal.remove();
    } else if (e.key === 'ArrowLeft') {
        navigateGallery(-1);
    } else if (e.key === 'ArrowRight') {
        navigateGallery(1);
    }
}

// Export functions
window.showGallery = showGallery;
window.startSessionTimer = startSessionTimer;
