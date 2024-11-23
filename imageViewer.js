// Image click functionality
document.addEventListener('DOMContentLoaded', function() {
    const propertiesGrid = document.getElementById('properties-grid');
    const vehiclesGrid = document.getElementById('vehicles-grid');

    // Image click handler
    function handleImageClick(e) {
        if (e.target.classList.contains('listing-image')) {
            const modal = document.createElement('div');
            modal.className = 'fullscreen-modal';
            
            const img = document.createElement('img');
            img.src = e.target.src;
            img.className = 'fullscreen-image';
            
            // Add zoom functionality
            let scale = 1;
            let panning = false;
            let pointX = 0;
            let pointY = 0;
            let start = { x: 0, y: 0 };

            img.addEventListener('mousedown', (e) => {
                e.preventDefault();
                start = { x: e.clientX - pointX, y: e.clientY - pointY };
                panning = true;
            });

            img.addEventListener('mousemove', (e) => {
                e.preventDefault();
                if (!panning) return;
                pointX = (e.clientX - start.x);
                pointY = (e.clientY - start.y);
                img.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
            });

            img.addEventListener('mouseup', () => {
                panning = false;
            });

            // Add zoom on double click
            img.addEventListener('dblclick', (e) => {
                e.preventDefault();
                scale = scale === 1 ? 2 : 1;
                img.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
            });

            modal.appendChild(img);
            document.body.appendChild(modal);
            modal.style.display = 'block';

            // Close on click outside image
            modal.onclick = function(e) {
                if (e.target === modal) {
                    modal.remove();
                }
            };

            // Close on escape key
            document.addEventListener('keydown', function closeModal(e) {
                if (e.key === 'Escape') {
                    modal.remove();
                    document.removeEventListener('keydown', closeModal);
                }
            });

            // Add touch support
            let touchStart = { x: 0, y: 0 };
            img.addEventListener('touchstart', (e) => {
                const touch = e.touches[0];
                touchStart.x = touch.clientX - pointX;
                touchStart.y = touch.clientY - pointY;
                panning = true;
            });

            img.addEventListener('touchmove', (e) => {
                if (!panning) return;
                const touch = e.touches[0];
                pointX = touch.clientX - touchStart.x;
                pointY = touch.clientY - touchStart.y;
                img.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
            });

            img.addEventListener('touchend', () => {
                panning = false;
            });
        }
    }

    // Add click listeners to grids
    if (propertiesGrid) {
        propertiesGrid.addEventListener('click', handleImageClick);
    }
    if (vehiclesGrid) {
        vehiclesGrid.addEventListener('click', handleImageClick);
    }
});
