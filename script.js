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
                // Previous articles remain the same
            ],
            "12.18.24": [
                // Technology Articles
                {
                    title: "Quantum Computing Breakthrough: Beyond Classical Limits",
                    summary: "Significant advancements in quantum computing hardware and algorithms, potentially enabling general-purpose quantum computers earlier than anticipated.",
                    category: "computer-science",
                    source: "MIT Technology Review"
                },
                {
                    title: "AI Generative Tools Reshape Tech Landscape",
                    summary: "Hundreds of millions now interact with generative AI tools like ChatGPT, compelling major tech companies to invest heavily in AI development.",
                    category: "ai",
                    source: "MIT Technology Review"
                },
                {
                    title: "Advanced Collaborative Workplace Frameworks Emerge",
                    summary: "Integration of AI, AR, VR, IoT, and networked systems to enhance productivity and decision-making in modern workplaces.",
                    category: "computer-science",
                    source: "DocuWare Tech Trends 2024"
                },
                // Environmental Articles
                {
                    title: "Climate Crisis: Planetary Tipping Points",
                    summary: "Escalating environmental planetary crises with increasing global impacts from human activities, threatening ecosystem stability.",
                    category: "world-politics",
                    source: "UNEP Report"
                },
                {
                    title: "Biodiversity Under Siege: Global Ecosystem Threats",
                    summary: "Critical challenges including deforestation, plastic pollution, and rapid ecosystem degradation threatening global biodiversity.",
                    category: "world-politics",
                    source: "Earth.Org"
                },
                {
                    title: "Ocean CO2 Absorption: Marine Ecosystems in Peril",
                    summary: "Increasing pressure on oceans to absorb CO2 is causing significant stress to marine ecosystems, including coral reefs.",
                    category: "world-politics",
                    source: "TerraPass Environmental Report"
                },
                // Political Articles
                {
                    title: "Global Democratic Discontent Rises",
                    summary: "Across 31 nations, a median of 54% of adults express dissatisfaction with democratic processes, indicating growing political tension.",
                    category: "world-politics",
                    source: "Pew Research Center"
                },
                {
                    title: "2024: The Year of Global Elections",
                    summary: "Record 65 countries holding elections in 2024, representing the largest election year in global history with potential for political disruption.",
                    category: "world-politics",
                    source: "International SOS"
                },
                {
                    title: "Geopolitical Risk Landscape Transforms",
                    summary: "Complex global political environment emerges with multiple potential international tension points and shifting power dynamics.",
                    category: "world-politics",
                    source: "EY Global Insights"
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
                <span class="text-sm text-gray-500">${article.source}</span>
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