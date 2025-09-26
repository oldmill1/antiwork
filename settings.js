document.addEventListener('DOMContentLoaded', function() {
    const sunEmoji = document.getElementById('sun-emoji');
    if (sunEmoji) {
        sunEmoji.addEventListener('click', function() {
            console.log('🪷 Lotus emoji clicked! Peaceful and serene!');
        });
    }
});
