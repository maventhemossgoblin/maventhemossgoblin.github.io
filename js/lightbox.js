document.addEventListener('DOMContentLoaded', function() {
    const galleryImages = document.querySelectorAll('.p-gallery img, .imageProcess img');
    
    // Create overlay elements
    const overlay = document.createElement('div');
    overlay.className = 'fullscreen-overlay';
    
    const dimmer = document.createElement('div');
    dimmer.className = 'overlay-dimmer';
    
    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.innerHTML = '&times;';
    closeButton.setAttribute('aria-label', 'Close fullscreen');
    
    // Assemble overlay
    imageContainer.appendChild(closeButton);
    overlay.appendChild(dimmer);
    overlay.appendChild(imageContainer);
    document.body.appendChild(overlay);
    
    // Style the overlay (can also be placed in CSS)
    const style = document.createElement('style');
    style.textContent = `
        .fullscreen-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 3;
            display: none;
        }
        
        .overlay-dimmer {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #b5790188;
            backdrop-filter: blur(10px);
        }
        
        .image-container {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            max-width: 90vw;
            max-height: 90vh;
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .image-container img {
            max-width: 100%;
            max-height: 100%;
            width: auto;
            height: auto;
            object-fit: contain;
            box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
            border-radius: 4px;
        }
        
        .close-button {
            position: absolute;
            top: -40px;
            right: -40px;
            background: rgba(255, 255, 255, 0.9);
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 24px;
            cursor: pointer;
            color: #333;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            z-index: 4;
        }
        
        .close-button:hover {
            background: white;
            transform: scale(1.1);
        }
        
        @media (max-width: 768px) {
            .close-button {
                top: 10px;
                right: 10px;
                width: 36px;
                height: 36px;
                font-size: 20px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Click handler for gallery images
    galleryImages.forEach(function(img) {
        img.addEventListener('click', function() {
            // Clone the clicked image
            const clonedImg = this.cloneNode(true);
            clonedImg.style.width = 'auto';
            clonedImg.style.height = 'auto';
            
            // Clear previous image and add new one
            imageContainer.innerHTML = '';
            imageContainer.appendChild(clonedImg);
            imageContainer.appendChild(closeButton.cloneNode(true));
            
            // Show overlay
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            
            // Set focus for accessibility
            setTimeout(() => {
                const closeBtn = overlay.querySelector('.close-button');
                if (closeBtn) closeBtn.focus();
            }, 100);
        });
    });
    
    // Close overlay when clicking dimmer or close button
    overlay.addEventListener('click', function(e) {
        if (e.target.classList.contains('overlay-dimmer') || 
            e.target.classList.contains('close-button') ||
            e.target.closest('.close-button')) {
            closeOverlay();
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.style.display === 'block') {
            closeOverlay();
        }
    });
    
    function closeOverlay() {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }
});