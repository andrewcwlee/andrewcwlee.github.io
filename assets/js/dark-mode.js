// Dark mode functionality
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlElement = document.documentElement;
    const moonIcon = '<i class="fas fa-moon"></i>';
    const sunIcon = '<i class="fas fa-sun"></i>';
    
    // Check for saved user preference, if any
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('bg-light');
            updateIcon('dark');
        } else {
            document.body.classList.remove('dark-mode');
            updateIcon('light');
        }
    }
    
    darkModeToggle.addEventListener('click', function() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        const newTheme = isDarkMode ? 'light' : 'dark';
        
        if (newTheme === 'dark') {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('bg-light');
        } else {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('bg-light');
        }
        
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
        updateVisitMap(newTheme);
    });
    
    function updateIcon(theme) {
        darkModeToggle.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
    }
    
    function updateVisitMap(theme) {
        const mapContainer = document.getElementById('visit-map-container');
        if (!mapContainer) return;
        
        // Remove existing map
        mapContainer.innerHTML = '';
        
        // Set map colors based on theme
        const backgroundColor = theme === 'dark' ? '2b3035' : 'ffffff';
        const textColor = theme === 'dark' ? 'ffffff' : '000000';
        
        // Create new script element
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.id = 'clustrmaps';
        script.src = `//cdn.clustrmaps.com/map_v2.js?cl=${backgroundColor}&w=202&t=n&d=IbiNUhNalM4PBjb93MoMMraA1Cy2-aBGzlu1qAwManA&co=579ac9&ct=${textColor}&cmo=3acc3a&cmn=ff5353`;
        
        // Append to container
        mapContainer.appendChild(script);
    }
    
    // Detect system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        const newTheme = event.matches ? 'dark' : 'light';
        // Only apply if the user hasn't manually set a preference
        if (!localStorage.getItem('theme')) {
            if (newTheme === 'dark') {
                document.body.classList.add('dark-mode');
                document.body.classList.remove('bg-light');
            } else {
                document.body.classList.remove('dark-mode');
                document.body.classList.add('bg-light');
            }
            updateIcon(newTheme);
            updateVisitMap(newTheme);
        }
    });
    
    // Initial system preference check (if no saved preference)
    if (!localStorage.getItem('theme')) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = prefersDark ? 'dark' : 'light';
        if (initialTheme === 'dark') {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('bg-light');
        }
        updateIcon(initialTheme);
    }
    
    // Initialize visit map
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    updateVisitMap(currentTheme);
});