document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section-header');
    
    sections.forEach(section => {
        section.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            const content = document.getElementById(`section-${sectionId}`);
            
            if (content.classList.contains('active')) {
                content.classList.remove('active');
                content.style.maxHeight = '0';
            } else {
                // Open this section without closing others
                content.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // Function to update progress
    function updateProgress(sectionId) {
        const section = document.querySelector(`[data-section="${sectionId}"]`);
        const lessons = document.querySelectorAll(`#section-${sectionId} .lesson`);
        const completedLessons = document.querySelectorAll(`#section-${sectionId} .lesson input:checked`);
        const progressSpan = section.querySelector('.progress');
        
        progressSpan.textContent = `${completedLessons.length}/${lessons.length}`;
    }

    // Add event listeners to checkboxes
    const checkboxes = document.querySelectorAll('.lesson input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const sectionId = this.closest('.section-content').id.split('-')[1];
            updateProgress(sectionId);
        });
    });

    // Initial progress update
    for (let i = 1; i <= 6; i++) {
        updateProgress(i);
    }

    // Open the fourth section by default
    document.querySelector('[data-section="4"]').click();

    // Toggle dark mode
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark');
        });
    }
});

const body = document.querySelector("body"),
    sidebar = body.querySelector(".sidebar"),
    toggle = body.querySelector(".toggle"),
    modeSwitch = body.querySelector(".toggle-switch"),
    modeText = body.querySelector(".mode-text");

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});

modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        modeText.innerText = "Light Mode";
    } else {
        modeText.innerText = "Dark Mode";
    }
});
