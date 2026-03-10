document.addEventListener('DOMContentLoaded', () => {
/* =========================
   SELECTORS / CONFIG
========================= */
const images = document.querySelectorAll('.p-gallery img, .imageProcess img');

/* =========================
   CREATE LIGHTBOX ELEMENTS
========================= */
const overlay = document.createElement('div');
overlay.className = 'lightbox';

overlay.innerHTML = `
    <div class="lightbox-dimmer"></div>
    <button class="lightbox-close">&times;</button>
    <img class="lightbox-img">
`;

document.body.appendChild(overlay);

const lightboxImg = overlay.querySelector('.lightbox-img');
const closeBtn = overlay.querySelector('.lightbox-close');

/* =========================
   STYLE
========================= */
const style = document.createElement('style');
style.textContent = `

.lightbox{
    position:fixed;
    inset:0;
    display:none;
    z-index:999;
}

.lightbox-dimmer{
    position:absolute;
    inset:0;
    background:#b5790188;
    backdrop-filter:blur(10px);
}

.lightbox-img{
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%) scale(1);
    max-width:90vw;
    max-height:90vh;
    cursor:grab;
    transition:transform .08s ease-out;
    box-shadow:0 10px 40px rgba(0,0,0,.4);
}

.lightbox-close{
    position:absolute;
    top:20px;
    right:20px;
    width:40px;
    height:40px;
    border:none;
    border-radius:50%;
    font-size:26px;
    background:white;
    cursor:pointer;
}

`;
document.head.appendChild(style);

/* =========================
   ZOOM / DRAG VARIABLES
========================= */
let scale = 1;
let posX = 0;
let posY = 0;

let startX = 0;
let startY = 0;
let dragging = false;

/* =========================
   FUNCTIONS
========================= */
function updateTransform(){
    lightboxImg.style.transform =
        `translate(calc(-50% + ${posX}px), calc(-50% + ${posY}px)) scale(${scale})`;
}

function openLightbox(src){

    scale = 1;
    posX = 0;
    posY = 0;

    lightboxImg.src = src;
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';

    updateTransform();
}

function closeLightbox(){
    overlay.style.display = 'none';
    document.body.style.overflow = '';
}

/* =========================
   IMAGE CLICK -> OPEN
========================= */
images.forEach(img=>{
    img.addEventListener('click',()=>{
        openLightbox(img.src);
    });
});

/* =========================
   CLOSE EVENTS
========================= */
overlay.addEventListener('click',(e)=>{
    if(e.target.classList.contains('lightbox-dimmer')){
        closeLightbox();
    }
});

closeBtn.addEventListener('click',closeLightbox);

document.addEventListener('keydown',e=>{
    if(e.key === "Escape") closeLightbox();
});

/* =========================
   MOUSE WHEEL ZOOM
========================= */
overlay.addEventListener('wheel',e=>{

    e.preventDefault();

    const zoomSpeed = 0.1;

    if(e.deltaY < 0){
        scale += zoomSpeed;
    }else{
        scale -= zoomSpeed;
    }

    scale = Math.min(Math.max(1,scale),6);

    updateTransform();

},{passive:false});

/* =========================
   DRAG TO PAN
========================= */
lightboxImg.addEventListener('mousedown',e=>{
    dragging = true;
    startX = e.clientX - posX;
    startY = e.clientY - posY;
    lightboxImg.style.cursor = "grabbing";
});

document.addEventListener('mousemove',e=>{

    if(!dragging) return;

    posX = e.clientX - startX;
    posY = e.clientY - startY;

    updateTransform();

});

document.addEventListener('mouseup',()=>{
    dragging = false;
    lightboxImg.style.cursor = "grab";
});

/* =========================
   MOBILE PINCH ZOOM
======================== */
let startDist = 0;

overlay.addEventListener('touchstart',e=>{

    if(e.touches.length === 2){

        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;

        startDist = Math.sqrt(dx*dx + dy*dy);
    }

});

overlay.addEventListener('touchmove',e=>{

    if(e.touches.length === 2){

        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;

        const newDist = Math.sqrt(dx*dx + dy*dy);

        scale *= newDist/startDist;

        scale = Math.min(Math.max(1,scale),6);

        startDist = newDist;

        updateTransform();
    }

});

});
// document.addEventListener('DOMContentLoaded', function() {
//     const galleryImages = document.querySelectorAll('.p-gallery img, .imageProcess img');
    
//     // Create overlay elements
//     const overlay = document.createElement('div');
//     overlay.className = 'fullscreen-overlay';
    
//     const dimmer = document.createElement('div');
//     dimmer.className = 'overlay-dimmer';
    
//     const imageContainer = document.createElement('div');
//     imageContainer.className = 'image-container';
    
//     const closeButton = document.createElement('button');
//     closeButton.className = 'close-button';
//     closeButton.innerHTML = '&times;';
//     closeButton.setAttribute('aria-label', 'Close fullscreen');
    
//     // Assemble overlay
//     imageContainer.appendChild(closeButton);
//     overlay.appendChild(dimmer);
//     overlay.appendChild(imageContainer);
//     document.body.appendChild(overlay);
    
//     // Style the overlay (can also be placed in CSS)
//     const style = document.createElement('style');
//     style.textContent = `
//         .fullscreen-overlay {
//             position: fixed;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             z-index: 3;
//             display: none;
//         }
        
//         .overlay-dimmer {
//             position: absolute;
//             top: 0;
//             left: 0;
//             width: 100%;
//             height: 100%;
//             background-color: #b5790188;
//             backdrop-filter: blur(10px);
//         }
        
//         .image-container {
//             position: absolute;
//             top: 50%;
//             left: 50%;
//             transform: translate(-50%, -50%);
//         }
        
//         .image-container img {
//             width: auto;
//             height: auto;
//             max-width: 90vw;
//             max-height: 90vh;
//             object-fit: contain;
//             box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
//             border-radius: 4px;
//         }
        
//         .close-button {
//             position: absolute;
//             top: -40px;
//             right: -40px;
//             background: rgba(255, 255, 255, 0.9);
//             border: none;
//             border-radius: 50%;
//             width: 40px;
//             height: 40px;
//             font-size: 24px;
//             cursor: pointer;
//             color: #333;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             transition: all 0.2s ease;
//             z-index: 4;
//         }
        
//         .close-button:hover {
//             background: white;
//             transform: scale(1.1);
//         }
        
//         @media (max-width: 768px) {
//             .close-button {
//                 top: 10px;
//                 right: 10px;
//                 width: 36px;
//                 height: 36px;
//                 font-size: 20px;
//             }
//         }
//     `;
//     document.head.appendChild(style);
    
//     // Click handler for gallery images
//     galleryImages.forEach(function(img) {
//         img.addEventListener('click', function() {
//             // Clone the clicked image
//             const clonedImg = this.cloneNode(true);
//             clonedImg.style.width = 'auto';
//             clonedImg.style.height = 'auto';
            
//             // Clear previous image and add new one
//             imageContainer.innerHTML = '';
//             imageContainer.appendChild(clonedImg);
//             imageContainer.appendChild(closeButton);
            
//             // Show overlay
//             overlay.style.display = 'block';
//             document.body.style.overflow = 'hidden'; // Prevent scrolling
            
//             // Set focus for accessibility
//             setTimeout(() => {
//                 const closeBtn = overlay.querySelector('.close-button');
//                 if (closeBtn) closeBtn.focus();
//             }, 100);
//         });
//     });
    
//     // Close overlay when clicking dimmer or close button
//     overlay.addEventListener('click', function(e) {
//         if (e.target.classList.contains('overlay-dimmer') || 
//             e.target.classList.contains('close-button') ||
//             e.target.closest('.close-button')) {
//             closeOverlay();
//         }
//     });
    
//     // Close with Escape key
//     document.addEventListener('keydown', function(e) {
//         if (e.key === 'Escape' && overlay.style.display === 'block') {
//             closeOverlay();
//         }
//     });
    
//     function closeOverlay() {
//         overlay.style.display = 'none';
//         document.body.style.overflow = '';
//     }
// });