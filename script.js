document.addEventListener('DOMContentLoaded', () => {
    const details = document.querySelectorAll('details');
    
    details.forEach(detail => {
        detail.addEventListener('toggle', () => {
            detail.classList.toggle('expanded');
        });
    });
});