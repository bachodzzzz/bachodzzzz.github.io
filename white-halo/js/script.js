document.addEventListener('DOMContentLoaded', () => {
    // Loader Logic
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 500);
        }, 1000); // Fake load time for "Premium" feel
    }

    // Example: Lazy Loading Observer
    const images = document.querySelectorAll('img[data-src]');
    const imageOptions = {
        threshold: 0,
        rootMargin: "0px 0px 50px 0px"
    };

    const imgObserver = new IntersectionObserver((entries, imgObserver) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const src = entry.target.getAttribute('data-src');
            if (!src) return;
            entry.target.src = src;
            entry.target.removeAttribute('data-src');
            imgObserver.unobserve(entry.target);
        });
    }, imageOptions);

    images.forEach(image => {
        imgObserver.observe(image);
    });
});
