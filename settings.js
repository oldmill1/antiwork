document.addEventListener('DOMContentLoaded', function() {
    const sunEmoji = document.getElementById('sun-emoji');
    if (sunEmoji) {
        sunEmoji.addEventListener('click', function() {
            console.log('SUN clicked! Bright and shining!');
        });
    }
});
