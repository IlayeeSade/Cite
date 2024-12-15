document.addEventListener('DOMContentLoaded', () => {
    const datePicker = flatpickr("#date-picker", {
        dateFormat: "m.d.y",
        defaultDate: new Date(),
        maxDate: new Date()
    });

    const articlesContainer = document.getElementById('articles');
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('.subject-section');
    const articleModal = document.getElementById('articleModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalSummary = document.getElementById('modalSummary');
    const closeModal = document.querySelector('.close-modal');

    // Close modal when clicking the close button
    closeModal.addEventListener('click', () => {
        articleModal.style.display = 'none';
    });

    // Close modal when clicking outside
    articleModal.addEventListener('click', (e) => {
        if (e.target === articleModal) {
            articleModal.style.display = 'none';
        }
    });

    // Navigation handling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active-nav', 'bg-black', 'text-white'));
            
            // Add active class to clicked link
            e.target.classList.add('active-nav');

            // Hide all sections
            sections.forEach(section => section.style.display = 'none');
            
            // Show selected section
            const sectionToShow = document.getElementById(e.target.dataset.subject);
            if (sectionToShow) sectionToShow.style.display = 'grid';

            // Hide articles grid when not on home
            articlesContainer.style.display = e.target.dataset.subject === 'home' ? 'grid' : 'none';
        });
    });

    function loadArticles(date) {
        const articles = {
            "12.13.24": [
                {
                    title: "Tech Innovations of 2024",
                    summary: "A look at groundbreaking technologies this year.",
                    category: "computer-science"
                },
                {
                    title: "Climate Change Progress",
                    summary: "Global efforts and challenges in environmental sustainability.",
                    category: "world-politics"
                },
                {
                    title: "AI in Healthcare",
                    summary: "How artificial intelligence is transforming medical treatments.",
                    category: "ai"
                },
                {
                    title: "Space Exploration Milestones",
                    summary: "Recent achievements in interstellar research.",
                    category: "computer-science"
                }
            ]
        };

        // Clear previous articles
        sections.forEach(section => section.innerHTML = '');
        articlesContainer.innerHTML = '';

        const dateArticles = articles[date] || [];
        dateArticles.forEach(article => {
            const articleElement = document.createElement('div');
            articleElement.className = 'bg-gray-900 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow cursor-pointer';
            articleElement.innerHTML = `
                <h2 class="text-xl font-semibold text-white mb-2">${article.title}</h2>
                <p class="text-gray-400 mb-4">${article.summary}</p>
            `;
            
            // Add click event to show modal
            articleElement.addEventListener('click', () => {
                modalTitle.textContent = article.title;
                modalSummary.textContent = article.summary;
                articleModal.style.display = 'flex';
            });
            
            // Add to articles container and category section
            articlesContainer.appendChild(articleElement.cloneNode(true));
            
            const categorySection = document.getElementById(article.category);
            if (categorySection) {
                categorySection.appendChild(articleElement);
            }
        });
    }

    // Load articles for current date by default
    const currentDate = `${(new Date().getMonth() + 1).toString().padStart(2, '0')}.${new Date().getDate().toString().padStart(2, '0')}.${new Date().getFullYear().toString().slice(-2)}`;
    loadArticles(currentDate);

    datePicker.config.onChange.push((selectedDates, dateStr) => {
        loadArticles(dateStr);
    });
});