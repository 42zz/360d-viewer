document.addEventListener('DOMContentLoaded', () => {
    const viewer = document.getElementById('viewer');
    const images = viewer.querySelectorAll('img');
    let currentIndex = 0;
    let startX;
    let isDragging = false;

    // 画像のプリロード
    function preloadImages() {
        images.forEach(img => {
            const src = img.getAttribute('src');
            const preloadImg = new Image();
            preloadImg.src = src;
        });
    }

    preloadImages();

    viewer.addEventListener('mousedown', startDrag);
    viewer.addEventListener('mousemove', drag);
    viewer.addEventListener('mouseup', endDrag);
    viewer.addEventListener('mouseleave', endDrag);

    viewer.addEventListener('touchstart', startDrag);
    viewer.addEventListener('touchmove', drag);
    viewer.addEventListener('touchend', endDrag);

    function startDrag(e) {
        isDragging = true;
        startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        e.preventDefault();
    }

    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        const diff = currentX - startX;
        
        if (Math.abs(diff) > 5) { // 感度を上げる
            const direction = diff > 0 ? -1 : 1;
            rotateImage(direction);
            startX = currentX;
        }
    }

    function endDrag(e) {
        isDragging = false;
        e.preventDefault();
    }

    function rotateImage(direction) {
        const nextIndex = (currentIndex + direction + images.length) % images.length;
        images[nextIndex].classList.add('active');
        images[currentIndex].classList.remove('active');
        currentIndex = nextIndex;
    }
});