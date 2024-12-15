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
            "12.15.24": [
                // AI Articles
                {
                    title: "Sutskever's NeurIPS Bombshell: The End of Pre-Training",
                    summary: "OpenAI cofounder Ilya Sutskever argues current AI training methods have reached a data limit, signaling a potential paradigm shift in machine learning approaches.",
                    category: "ai"
                },
                {
                    title: "AI in Healthcare: 2024 Innovation Landscape",
                    summary: "Generative AI transforms healthcare with advanced EHR data processing, personalized treatment strategies, and breakthrough diagnostic tools.",
                    category: "ai"
                },
                {
                    title: "Ethical AI: Balancing Innovation and Responsibility",
                    summary: "Experts discuss critical challenges in developing responsible AI systems that prioritize safety, transparency, and human-centric design.",
                    category: "ai"
                },
                // Computer Science Articles
                {
                    title: "Quantum Computing's Leap Forward",
                    summary: "Recent breakthroughs in quantum error correction bring practical quantum computing closer to reality, with potential revolutionary impacts.",
                    category: "computer-science"
                },
                {
                    title: "Open Source AI: Democratizing Technology",
                    summary: "The growing movement towards open-source AI models challenges big tech's dominance and promotes collaborative innovation.",
                    category: "computer-science"
                },
                {
                    title: "Cybersecurity in the AI Era",
                    summary: "New AI-powered defense mechanisms are reshaping how organizations protect against increasingly sophisticated cyber threats.",
                    category: "computer-science"
                },
                // World Politics Articles
                {
                    title: "Global Democracy at a Crossroads",
                    summary: "2024 elections reveal critical challenges of misinformation, polarization, and youth political engagement worldwide.",
                    category: "world-politics"
                },
                {
                    title: "The Rise of the Global South",
                    summary: "Emerging economies are reshaping international trade and political dynamics, challenging traditional Western-centric models.",
                    category: "world-politics"
                },
                {
                    title: "Climate Crisis: Geopolitical Tensions Escalate",
                    summary: "Increasing global risks from climate change are intensifying international conflicts and driving urgent diplomatic negotiations.",
                    category: "world-politics"
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