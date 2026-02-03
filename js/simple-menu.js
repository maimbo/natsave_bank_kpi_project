// Simple Menu Toggle Script
document.addEventListener('DOMContentLoaded', function () {
    // Initialize menu state
    const menuToggles = document.querySelectorAll('.nav-link[data-menu]');

    menuToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();

            const menuKey = this.getAttribute('data-menu');
            const subMenu = this.nextElementSibling;
            const icon = this.querySelector('.menu-chevron');

            if (subMenu && subMenu.classList.contains('sub-menu')) {
                // Toggle visibility
                const isExpanded = subMenu.style.display === 'block';
                subMenu.style.display = isExpanded ? 'none' : 'block';

                // Update chevron icon
                if (icon) {
                    icon.setAttribute('data-lucide', isExpanded ? 'chevron-right' : 'chevron-down');
                    if (window.lucide) lucide.createIcons();
                }
            }
        });
    });

    // Auto-expand menu based on current page
    const currentPath = window.location.pathname;
    const activeLink = document.querySelector(`.sub-link[href*="${currentPath.split('/').pop()}"]`);

    if (activeLink) {
        // Add active class to the link
        activeLink.classList.add('active');

        // Find and expand parent menu
        const parentMenu = activeLink.closest('.sub-menu');
        if (parentMenu) {
            parentMenu.style.display = 'block';
            const parentToggle = parentMenu.previousElementSibling;
            if (parentToggle) {
                parentToggle.classList.add('active');
                const chevron = parentToggle.querySelector('.menu-chevron');
                if (chevron) {
                    chevron.setAttribute('data-lucide', 'chevron-down');
                }
            }
        }
    }

    // Initialize Lucide icons
    if (window.lucide) lucide.createIcons();
});
