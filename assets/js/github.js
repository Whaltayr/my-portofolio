// assets/js/github.js

const username = 'whaltayr'; // <--- CHANGE THIS TO YOUR GITHUB USERNAME
const repoGrid = document.getElementById('repo-grid');

// Language Color Mapping (Add more if needed)
const languageColors = {
    "JavaScript": "#f1e05a",
    "HTML": "#e34c26",
    "CSS": "#563d7c",
    "Dart": "#00B4AB",
    "Flutter": "#02569B",
    "SCSS": "#c6538c",
    "Vue": "#41b883",
    "TypeScript": "#2b7489"
};

async function fetchRepos() {
    try {
        // Fetch public repos, sorted by most recently updated
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
        
        if (!response.ok) throw new Error('Failed to load repositories');
        
        const repos = await response.json();
        
        // Clear loading text
        repoGrid.innerHTML = '';

        // Filter out forks if you want only your code (optional)
        // const myRepos = repos.filter(repo => !repo.fork); 
        
        // Loop through repos and create cards
        repos.forEach(repo => {
            createRepoCard(repo);
        });

        // Trigger GSAP Animation
        animateCards();

    } catch (error) {
        repoGrid.innerHTML = `<p style="color:red; text-align:center;">Error loading projects. Please check GitHub API limit.</p>`;
        console.error(error);
    }
}

function createRepoCard(repo) {
    // Determine language color
    const langColor = languageColors[repo.language] || "#888"; // Default grey
    const langName = repo.language || "Code";

    const card = document.createElement('div');
    card.classList.add('repo-card');

    card.innerHTML = `
        <div class="repo-top">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <a href="${repo.html_url}" target="_blank" class="repo-name">
                    <i class="fa-regular fa-folder-open"></i> ${repo.name}
                </a>
                <a href="${repo.html_url}" target="_blank" style="color:#666;"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
            </div>
            <p class="repo-desc">${repo.description || "No description provided."}</p>
        </div>
        <div class="repo-stats">
            <span>
                <span class="language-dot" style="background-color: ${langColor};"></span>
                ${langName}
            </span>
            <span><i class="fa-regular fa-star"></i> ${repo.stargazers_count}</span>
            <span><i class="fa-solid fa-code-branch"></i> ${repo.forks_count}</span>
        </div>
    `;

    repoGrid.appendChild(card);
}

function animateCards() {
    gsap.from(".repo-card", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
    });
}

// Run the function
fetchRepos();