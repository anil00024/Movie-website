// StreamFlix - Complete JavaScript Implementation
class StreamFlix {
    constructor() {
        this.currentSection = 'home';
        this.currentMovie = null;
        this.watchlist = JSON.parse(localStorage.getItem('streamflix_watchlist') || '[]');
        this.theme = localStorage.getItem('streamflix_theme') || 'dark';
        this.searchTimeout = null;
        this.isPlaying = false;
        this.isMuted = false;
        this.currentFilter = 'all';
        
        // Sample data for movies and series
        this.movies = [
            {
                id: 1,
                title: "The Dark Knight",
                year: 2008,
                duration: "2h 32m",
                rating: "⭐ 7.2/10",
                genre: ["Action", "Crime", "Drama"],
                category: "action",
                poster: "The Dark Knight.webp",
                description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
                trailer: "1.mp4",
                cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine", "Maggie Gyllenhaal", "Gary Oldman"],
                trending: false,
                views: 1250000
            },
            {
                id: 2,
                title: "Avengers: Endgame",
                year: 2019,
                duration: "3h 1m",
                rating: "⭐ 8.4/10",
                genre: ["Action", "Adventure", "Sci-Fi"],
                category: "action",
                poster: "avengers.jpeg",
                description: "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
                trailer: "5.mp4",
                cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo", "Chris Hemsworth", "Scarlett Johansson", "Jeremy Renner", "Don Cheadle"],
                trending: true,
                views: 2000000
            },
            {
                id: 3,
                title: "Pushpa: The Rule",
                year: 2021,
                duration: "3h 21m",
                rating: "⭐ 8.0/10",
                genre: ["Action", "Drama"],
                category: "action",
                poster: "pushpa.webp",
                description: "Pushpa is a coolie who rises in the world of red sandalwood smuggling.",
                trailer: "2.mp4",
                cast: ["Allu Arjun", "Rashmika Mandanna", "Fahadh Faasil", "Jagapathi Babu", "Prakash Raj"],
                trending: true,
                views: 980000
            },
            {
                id: 4,
                title: "Interstellar",
                year: 2014,
                duration: "2h 49m",
                rating: "⭐ 8.6/10",
                genre: ["Adventure", "Drama", "Sci-Fi"],
                category: "action",
                poster: "interstellar.webp",
                description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
                trailer: "5.mp4",
                cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
                trending: false,
                views: 1500000
            },
            {
                id: 5,
                title: "RRR",
                year: 2009,
                duration: "1h 40m",
                rating: "⭐ 7.0/10",
                genre: ["Action","Drama"],
                category: "Drama",
                poster: "rrr.jpg",
                description: "Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing.",
                trailer: "4.mp4",
                cast: ["Bradley Cooper", "Ed Helms", "Zach Galifianakis"],
                trending: true,
                views: 750000
            },
            {
                id: 6,
                title: "Bahubali 2: The Conclusion",
                year: 2017,
                duration: "2h 38m",
                rating: "⭐ 8.0/10",
                genre: ["Action", "Drama"],
                category: "action",
                poster: "wp5121808.jpg",
                description: "A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence.",
                trailer: "3.mp4",
                cast: ["Prabhas", "Rana Daggubati", "Anushka Shetty", "Tamannaah Bhatia"],
                trending: false,
                views: 800000
            },
            {
                id: 7,
                title: "Forrest Gump",
                year: 1994,
                duration: "2h 22m",
                rating: "⭐ 8.8/10",
                genre: ["Drama", "Romance"],
                category: "drama",
                poster: "tom.webp",
                description: "The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
                trailer: "5.mp4",
                cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
                trending: false,
                views: 1200000

            },
            {
                id: 8,
                title: "Kalki 2898-AD",
                year: 2024,
                duration: "2h 30m",
                rating: "⭐ 7.5/10",
                genre: ["Drama", "History","Sci-Fi"],
                category: "action",
                poster: "Kalki.jpg",
                description: "In a dystopian future, a group of rebels fight against a totalitarian regime.",
                trailer: "6.mp4",
                cast: ["prabhas", "Deepika Padukone", "Amitabh Bachchan", "Disha Patani"],
                trending: true,
                views: 1000000
            },
            {
                id: 9,
                title: "The Shawshank Redemption",
                year: 1994,
                duration: "2h 22m",
                rating: "⭐ 9.3/10",
                genre: ["Drama"],
                category: "drama",
                poster: "the.jpg",
                description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
                trailer: "5.mp4",
                cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
                trending: false,
                views: 1500000
            },
            {
                id: 10,
                title: "Avatar: The Way of Water",
                year: 2022,
                duration: "2h 55m",
                rating: "⭐ 9.2/10",
                genre: ["Action", "Adventure", "Sci-Fi"],
                category: "action",
                poster: "avatar.webp",
                description: "Jake Sully and Neytiri have formed a family and are doing everything to stay together. However, they must leave their home and explore the regions of Pandora.",
                trailer: "5.mp4",
                cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
                trending: true,
                views: 2000000
                
            },
            {
                id: 11,
                title: "Ghost rider",
                year: 1998,
                duration: "2h 4m",
                rating: "⭐ 7.0/10",
                genre: ["Action", "Adventure", "Fantasy"],
                category: "action",
                poster: "gost.jpeg",
                description: "A motorcycle stuntman makes a deal with the devil to save his dying girlfriend.",
                trailer: "5.mp4",
                cast: ["Nicolas Cage", "Eva Mendes", "Sam Elliott"],
                trending: false,
                views: 1800000
            },
            {
                id: 12,
                title: "Final Destination",
                year: 2025,
                duration: "1h 38m",
                rating: "⭐ 7.0/10",
                genre: ["Horror", "Thriller"],
                category: "horror",
                poster: "final.avif",
                description: "A group of friends must confront their worst fears when they find themselves trapped in a haunted house.",
                trailer: "6.mp4",
                cast: ["Devon Sawa", "Ali Larter", "Kerr Smith"],
                trending: false,
                views: 1700000
            },
            {
                id: 13,
                title: "The Lord of the Rings: The Return of the King",
                year: 2003,
                duration: "3h 21m",
                rating: "⭐ 8.9/10",
                genre: ["Action", "Adventure", "Drama"],
                category: "action",
                poster: "load.jpeg",
                description: "Gandalf and Aragorn lead the World of Men against Sauron and his army.",
                trailer: "3.mp4",
                cast: ["Elijah Wood", "Viggo Mortensen", "Ian McKellen"],
                trending: false,
                views: 2500000
            },
            {
                id: 14,
                title: "Smile",
                year: 2011,
                duration: "2h 1m",
                rating: "⭐ 7.5/10",
                genre: ["horror", "Drama"],
                category: "horror",
                poster: "smile.webp",
                description: "A woman with a dark secret becomes the target of a malevolent entity after witnessing a traumatic event.",
                trailer: "4.mp4",
                cast: ["Sosie Bacon", "Jessie T. Usher", "Kyle Gallner"],
                trending: false,
                views: 1400000

            },
            {
                id: 15,
                title: "DOLITTLE",
                year: 2020,
                duration: "1h 58m",
                rating: "⭐ 5.6/10",
                genre: ["Adventure", "Comedy", "Family"],
                category: "comedy",
                poster: "dolittle.jpeg",
                description: "A physician discovers that he can talk to animals and sets off on an adventure to find a legendary island.",
                trailer: "2.mp4",
                cast: ["Jodie Foster", "Anthony Hopkins", "Lawrence A. Bonney"],
                trending: false,
                views: 1300000
            },
            {
                id: 16,
                title: "The Lion King",
                year: 2019,
                duration: "1h 28m",
                rating: "⭐ 8.5/10",
                genre: ["Animation", "Adventure", "Drama"],
                category: "animation",
                poster: "lion.webp",
                description: "Lion prince Simba flees his kingdom after the death of his father, Mufasa. But with the help of friends, he returns as an adult to reclaim his throne.",
                trailer: "8.mp4",
                cast: ["Matthew Broderick", "James Earl Jones", "Jeremy Irons"],
                trending: false,
                views: 1600000

            },
            {
                id: 17,
                title: "Hulk",
                year: 2003,
                duration: "2h 18m",
                rating: "⭐ 7.1/10",
                genre: ["Drama"],
                category: "action",
                poster: "hulk.webp",
                description: "Bruce Banner, a genetics researcher with a tragic past, suffers an accident that causes him to transform into a raging green monster when he gets angry.",
                trailer: "5.mp4",
                cast: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"],
                trending: false,
                views: 1100000
            },
            {
                id: 18,
                title: "Tom and Jerry",
                year: 2021,
                duration: "1h 41m",
                rating: "⭐ 5.2/10",
                genre: ["Animation", "Comedy"],
                category: "animation",
                poster: "tom and jerry.jpg",
                description: "Tom and Jerry are back in a new animated/live-action hybrid film, where they wreak havoc in a fancy New York hotel.",
                trailer: "7.mp4",
                cast: ["Christian Bale", "Tom Hardy", "Anne Hathaway"],
                trending: true,
                views: 300000
            }
        ];

        this.series = [
            {
                id: 101,
                title: "Loki",
                year: 2008,
                duration: "2 Seasons",
                rating: "⭐ 8.4/10",
                genre: ["Sci-Fi", "Action", "Time Travel"],
                category: "drama",
                poster: "loki.jpg",
                description: "The God of Mischief, Loki, steps out of his brother's shadow to embark on his own adventures.",
                trailer: "1.mp4",
                cast: ["Tom Hiddleston", "Owen Wilson", "Gugu Mbatha-Raw", "Wunmi Mosaku", "Tara Strong"],
                trending: true,
                views: 2100000
            },
            {
                id: 102,
                title: "Mirzapur",
                year: 2018,
                duration: "9 Seasons",
                rating: "⭐ 8.4/10",
                genre: ["Action", "Crime", "Drama"],
                category: "action",
                poster: "mirzapur.webp",
                description: "A shocking incident in the small town of Mirzapur sets off a chain of events that leads to a power struggle between two families.",
                trailer: "2.mp4",
                cast: ["Ali Fazal", "Vikrant Massey", "Shweta Tripathi", "Divyendu Sharma", "Pankaj Tripathi"],
                trending: false,
                views: 2000000

            },
            {
                id: 103,
                title: "Money Heist",
                year: 2017,
                duration: "1 Seasons",
                rating: "⭐ 8.3/10",
                genre: ["Action", "Drama"],
                category: "action",
                poster: "mh.jpg",
                description: "To carry out the biggest heist in history, a mysterious mastermind called 'The Professor' recruits a band of eight robbers who have a single characteristic: a criminal record.",
                trailer: "4.mp4",
                cast: ["Álvaro Morte", "Úrsula Corberó", "Itziar Ituño", "Pedro Alonso", "Alba Flores"],
                trending: true,
                views: 1800000
            },
            {
                id: 104,
                title: "Squid Game",
                year: 2024,
                duration: "2 Seasons",
                rating: "⭐ 9.3/10",
                genre: ["Drama", "Mystery", "Thriller"],
                category: "thriller",
                poster: "squid game.jpg",
                description: "A deadly competition ensues as players risk their lives in children's games for a tempting prize.",
                trailer: "6.mp4",
                cast: ["Lee Jung-jae", "Park Hae-soo", "Wi Ha-jun", "Jung Ho-yeon", "O Yeong-su"],
                trending: true,
                views: 24000000
            },
            {
                id: 105,
                title: "Game of Thrones",
                year: 2011,
                duration: "6 Seasons",
                rating: "⭐ 9.3/10",
                genre: ["Action", "Adventure", "Drama"],
                category: "fantasy",
                poster: "gh.jpg",
                description: "Nine noble families fight for control over the mythical land of Westeros, while an ancient enemy returns after being dormant for millennia.",
                trailer: "3.mp4",
                cast: ["Emilia Clarke", "Kit Harington", "Peter Dinklage", "Lena Headey", "Nikolaj Coster-Waldau"],
                trending: true,
                views: 2300000
            },
            {
                id: 106,
                title: "Breaking Bad",
                year: 2014,
                duration: "3 Seasons",
                rating: "⭐ 9.5/10",
                genre: ["Crime", "Drama", "Mystery"],
                category: "thriller",
                poster: "bb.jpeg",
                description: "Seasonal anthology series in which police investigations unearth the personal and professional secrets of those involved.",
                trailer: "7.mp4",
                cast: ["Matthew McConaughey", "Woody Harrelson", "Mahershala Ali"],
                trending: false,
                views: 1800000
            },
            {
                id: 107,
                title: "Scam 1992: The Harshad Mehta Story",
                year: 2020,
                duration: "1 Season",
                rating: "⭐ 9.3/10",
                genre: ["Drama", "Fantasy", "Horror"],
                category: "horror",
                poster: "1992.jpeg",
                description: "A young girl with supernatural abilities helps her friends uncover a series of mysteries in their small town.",
                trailer: "8.mp4",
                cast: ["Winona Ryder", "David Harbour", "Millie Bobby Brown"],
                trending: false,
                views: 2500000
            },
            {
                id: 108,
                title: "Sacred Games",
                year: 2018,
                duration: "2 Seasons",
                rating: "⭐ 8.3/10",
                genre: ["Action", "Crime", "Drama"],
                category: "action",
                poster: "games.jpg",
                description: "A police officer in Mumbai uncovers a web of crime and corruption that leads to a powerful gangster.",
                trailer: "6.mp4",
                cast: ["Saif Ali Khan", "Nawazuddin Siddiqui", "Radhika Apte"],
                trending: false,
                views: 2200000
            },  
            {
                id: 109,
                title: "The Mandalorian",
                year: 2019,
                duration: "2 Seasons",
                rating: "TV-14",
                genre: ["Action", "Adventure", "Fantasy"],
                category: "action",
                poster: "star.webp",
                description: "A lone bounty hunter navigates the outer reaches of the galaxy, far from the authority of the New Republic.",
                trailer: "2.mp4",
                cast: ["Pedro Pascal", "Gina Carano", "Carl Weathers"],
                trending: false,
                views: 2700000
            },
            {
                id: 110,
                title: "The Witcher",
                year: 2019,
                duration: "2 Seasons",
                rating: "TV-MA",
                genre: ["Action", "Adventure", "Drama"],
                category: "action",
                poster: "wit.jpeg",
                description: "Geralt of Rivia, a monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
                trailer: "3.mp4",
                cast: ["Henry Cavill", "Freya Allan", "Anya Chalotra"],
                trending: false,
                views: 2800000
            }
           
        ];

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.applyTheme();
        this.renderMovies();
        this.renderSeries();
        this.renderTrending();
        this.renderWatchlist();
        this.renderProfile();
        this.setupSearch();
        this.setupVideoPlayer();
        this.handleResponsive();
    }

    setupEventListeners() {
        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.currentTarget.getAttribute('data-section');
                this.navigateToSection(section);
            });
        });

        // Mobile menu toggle
        const mobileToggle = document.getElementById('mobileMenuToggle');
        const mobileNav = document.getElementById('mobileNav');
        mobileToggle?.addEventListener('click', () => {
            const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
            mobileToggle.setAttribute('aria-expanded', !isExpanded);
            mobileNav.style.display = isExpanded ? 'none' : 'flex';
        });

        // Theme toggle
        document.getElementById('themeToggle')?.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        const voiceBtn = document.getElementById('voiceBtn');

        searchInput?.addEventListener('input', (e) => {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => {
                this.performSearch(e.target.value);
            }, 300);
        });

        searchBtn?.addEventListener('click', () => {
            this.performSearch(searchInput.value);
        });

        voiceBtn?.addEventListener('click', () => {
            this.startVoiceSearch();
        });

        // Filter buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                this.handleFilterClick(e.target);
            }
            if (e.target.classList.contains('tab-btn')) {
                this.handleTabClick(e.target);
            }
            if (e.target.classList.contains('category-card')) {
                this.openCategoryModal(e.target.getAttribute('data-category'));
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.handleResponsive();
        });

        // Close modals on outside click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('search-overlay') || 
                e.target.classList.contains('category-modal') ||
                e.target.classList.contains('movie-player')) {
                this.closeAllModals();
            }
        });
    }

    navigateToSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;
        }

        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            }
        });

        // Close mobile menu
        const mobileNav = document.getElementById('mobileNav');
        const mobileToggle = document.getElementById('mobileMenuToggle');
        if (mobileNav && window.innerWidth <= 768) {
            mobileNav.style.display = 'none';
            mobileToggle?.setAttribute('aria-expanded', 'false');
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    renderMovies(filter = 'all') {
        const moviesGrid = document.getElementById('moviesGrid');
        if (!moviesGrid) return;

        const filteredMovies = filter === 'all' 
            ? this.movies 
            : this.movies.filter(movie => movie.category === filter);

        moviesGrid.innerHTML = filteredMovies.map(movie => `
            <div class="movie-card" data-id="${movie.id}" role="gridcell" tabindex="0">
                <div class="movie-poster">
                    <img src="${movie.poster}" alt="${movie.title} poster" loading="lazy">
                    <div class="movie-overlay">
                        <button class="play-btn" onclick="streamflix.playMovie(${movie.id})" aria-label="Play ${movie.title}">
                            <span aria-hidden="true">▶️</span>
                        </button>
                        <button class="watchlist-btn ${this.isInWatchlist(movie.id) ? 'active' : ''}" 
                                onclick="streamflix.toggleWatchlist(${movie.id})" 
                                aria-label="${this.isInWatchlist(movie.id) ? 'Remove from' : 'Add to'} watchlist">
                            <span aria-hidden="true">❤️</span>
                        </button>
                    </div>
                </div>
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <p>${movie.year} • ${movie.duration}</p>
                    <div class="movie-rating">${movie.rating}</div>
                </div>
            </div>
        `).join('');

        // Add click listeners to movie cards
        moviesGrid.querySelectorAll('.movie-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('button')) {
                    const movieId = parseInt(card.getAttribute('data-id'));
                    this.showMovieDetails(movieId);
                }
            });

            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const movieId = parseInt(card.getAttribute('data-id'));
                    this.showMovieDetails(movieId);
                }
            });
        });
    }

    renderSeries(filter = 'all') {
        const seriesGrid = document.getElementById('seriesGrid');
        if (!seriesGrid) return;

        const filteredSeries = filter === 'all' 
            ? this.series 
            : this.series.filter(series => series.category === filter);

        seriesGrid.innerHTML = filteredSeries.map(series => `
            <div class="movie-card" data-id="${series.id}" role="gridcell" tabindex="0">
                <div class="movie-poster">
                    <img src="${series.poster}" alt="${series.title} poster" loading="lazy">
                    <div class="movie-overlay">
                        <button class="play-btn" onclick="streamflix.playMovie(${series.id}, true)" aria-label="Play ${series.title}">
                            <span aria-hidden="true">▶️</span>
                        </button>
                        <button class="watchlist-btn ${this.isInWatchlist(series.id) ? 'active' : ''}" 
                                onclick="streamflix.toggleWatchlist(${series.id}, true)" 
                                aria-label="${this.isInWatchlist(series.id) ? 'Remove from' : 'Add to'} watchlist">
                            <span aria-hidden="true">❤️</span>
                        </button>
                    </div>
                </div>
                <div class="movie-info">
                    <h3>${series.title}</h3>
                    <p>${series.year} • ${series.duration}</p>
                    <div class="movie-rating">${series.rating}</div>
                </div>
            </div>
        `).join('');

        // Add click listeners to series cards
        seriesGrid.querySelectorAll('.movie-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('button')) {
                    const seriesId = parseInt(card.getAttribute('data-id'));
                    this.showMovieDetails(seriesId, true);
                }
            });
        });
    }





  renderTrending() {
    const trendingGrid = document.getElementById('trendingGrid');
    if (!trendingGrid) {
        console.error('Trending grid element not found');
        return;
    }

    // Simple check for data existence
    if (!this.movies && !this.series) {
        trendingGrid.innerHTML = '<div class="no-content">No trending content available</div>';
        return;
    }

    // Combine movies and series arrays safely
    const allContent = [];
    if (this.movies && Array.isArray(this.movies)) {
        allContent.push(...this.movies);
    }
    if (this.series && Array.isArray(this.series)) {
        allContent.push(...this.series);
    }

    // Filter trending items with better validation
    const trendingContent = allContent
        .filter(item => item && item.trending && item.title && item.id) // Ensure required fields exist
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 20); // Limit to top 20 for performance

    if (trendingContent.length === 0) {
        trendingGrid.innerHTML = '<div class="no-content">No trending content found</div>';
        return;
    }

    // Generate HTML with improved error handling
    trendingGrid.innerHTML = trendingContent.map((item, index) => {
        const isSeriesType = this.determineContentType(item);
        const formattedViews = this.safeFormatViews(item.views);
        const genreText = this.safeFormatGenre(item.genre);
        
        return `
            <div class="trending-item" 
                 data-id="${item.id}" 
                 data-type="${isSeriesType ? 'series' : 'movie'}"
                 data-title="${this.escapeHtml(item.title)}"
                 role="button" 
                 tabindex="0"
                 style="cursor: pointer;">
                <div class="trending-rank">#${index + 1}</div>
                <div class="trending-poster">
                    <img src="${this.getValidPosterUrl(item.poster)}" 
                         alt="${this.escapeHtml(item.title)} poster" 
                         loading="lazy"
                         onerror="this.src='${this.getDefaultPosterUrl()}'; this.onerror=null;"
                         style="width: 100%; height: 100%; object-fit: cover; pointer-events: none;">
                </div>
                <div class="trending-info" style="pointer-events: none;">
                    <h4 title="${this.escapeHtml(item.title)}">${this.truncateTitle(item.title, 30)}</h4>
                    <p class="trending-meta">${item.year || ''} ${genreText ? '• ' + genreText : ''}</p>
                    <div class="trending-views" title="${item.views || 0} views">${formattedViews} views</div>
                    ${item.rating ? `<div class="trending-rating">★ ${item.rating}</div>` : ''}
                </div>
                <button class="trending-play-btn" 
                        data-id="${item.id}"
                        data-type="${isSeriesType ? 'series' : 'movie'}"
                        aria-label="Play ${this.escapeHtml(item.title)}"
                        type="button"
                        style="cursor: pointer; z-index: 10; position: relative;">
                    <span aria-hidden="true">▶</span>
                </button>
            </div>
        `;
    }).join('');

    // Add click event listeners after DOM is updated
    setTimeout(() => this.addTrendingEventListeners(), 0);
}

// Helper method to determine content type safely
determineContentType(item) {
    try {
        if (this.isSeriesType && typeof this.isSeriesType === 'function') {
            return this.isSeriesType(item);
        }
        // Fallback logic - you can adjust this based on your data structure
        return item.type === 'series' || item.seasons || item.episodes || item.id > 100;
    } catch (error) {
        console.warn('Error determining content type:', error);
        return false; // Default to movie
    }
}

// Safe formatting methods
safeFormatViews(views) {
    try {
        if (this.formatViews && typeof this.formatViews === 'function') {
            return this.formatViews(views);
        }
        return this.defaultFormatViews(views || 0);
    } catch (error) {
        console.warn('Error formatting views:', error);
        return '0';
    }
}

safeFormatGenre(genre) {
    try {
        if (Array.isArray(genre)) {
            return genre.join(', ');
        }
        return genre || '';
    } catch (error) {
        console.warn('Error formatting genre:', error);
        return '';
    }
}

defaultFormatViews(views) {
    if (!views || isNaN(views)) return '0';
    if (views >= 1000000) return (views / 1000000).toFixed(1) + 'M';
    if (views >= 1000) return (views / 1000).toFixed(1) + 'K';
    return views.toString();
}

escapeHtml(text) {
    if (!text) return '';
    try {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    } catch (error) {
        console.warn('Error escaping HTML:', error);
        return String(text).replace(/[&<>"']/g, '');
    }
}

truncateTitle(title, maxLength) {
    if (!title) return '';
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
}

getValidPosterUrl(poster) {
    if (!poster) return this.getDefaultPosterUrl();
    // Basic URL validation
    try {
        if (poster.endsWith('.jpg') || poster.endsWith('.jpeg') || poster.endsWith('.png') || poster.endsWith('.webp') || poster.endsWith('.avif')) {
            return poster;
        }
        return this.getDefaultPosterUrl();
    } catch (error) {
        return this.getDefaultPosterUrl();
    }
}

getDefaultPosterUrl() {
    return this.defaultPosterUrl || '/assets/default-poster.jpg';
}

// MAIN PLAY FUNCTION - Simplified and more reliable
playContent(id, contentType, title = '') {
    console.log(`🎬 Playing content: ID=${id}, Type=${contentType}, Title=${title}`);
    
    if (!id) {
        console.error('❌ No content ID provided');
        return false;
    }

    try {
        // Convert contentType to boolean for isSeries
        const isSeries = contentType === 'series';
        
        // Method 1: Try the most common pattern first
        if (window.playMovie && typeof window.playMovie === 'function') {
            console.log('✅ Using window.playMovie');
            window.playMovie(id, isSeries);
            return true;
        }

        // Method 2: Try streamflix object
        if (window.streamflix && window.streamflix.playMovie && typeof window.streamflix.playMovie === 'function') {
            console.log('✅ Using window.streamflix.playMovie');
            window.streamflix.playMovie(id, isSeries);
            return true;
        }

        // Method 3: Try global playMovie function
        if (typeof playMovie !== 'undefined' && typeof playMovie === 'function') {
            console.log('✅ Using global playMovie');
            playMovie(id, isSeries);
            return true;
        }

        // Method 4: Try alternative function names
        const alternativeFunctions = [
            'startVideo', 'playVideo', 'loadVideo', 'openPlayer', 
            'showVideo', 'initPlayer', 'startPlayer'
        ];
        
        for (const funcName of alternativeFunctions) {
            if (window[funcName] && typeof window[funcName] === 'function') {
                console.log(`✅ Using window.${funcName}`);
                window[funcName](id, isSeries);
                return true;
            }
        }

        // Method 5: Try to find existing play functionality in the page
        const existingPlayer = this.findExistingPlayer(id);
        if (existingPlayer) {
            console.log('✅ Using existing player');
            existingPlayer.click();
            return true;
        }

        // Method 6: Dispatch custom events
        console.log('📢 Dispatching custom events');
        this.dispatchPlayEvents(id, isSeries, title);
        
        // Method 7: Try to redirect to a play page (common pattern)
        if (this.tryRedirectToPlayer) {
            this.tryRedirectToPlayer(id, isSeries);
            return true;
        }

        // If nothing worked, show user-friendly message
        console.warn('⚠️ No play method found, but no error thrown');
        this.showPlayMessage(title || `Content ID ${id}`);
        return false;

    } catch (error) {
        console.error('❌ Error in playContent:', error);
        this.showPlayMessage(title || `Content ID ${id}`, true);
        return false;
    }
}

// Helper to find existing player buttons
findExistingPlayer(id) {
    const selectors = [
        `[data-id="${id}"][onclick*="play" i]`,
        `[data-id="${id}"] .play-btn`,
        `[data-id="${id}"] .play-button`,
        `#play-${id}`,
        `.play-content[data-id="${id}"]`
    ];
    
    for (const selector of selectors) {
        const element = document.querySelector(selector);
        if (element) {
            console.log(`Found existing player with selector: ${selector}`);
            return element;
        }
    }
    return null;
}

// Dispatch multiple custom events
dispatchPlayEvents(id, isSeries, title) {
    const events = [
        { name: 'playContent', detail: { id, isSeries, title, type: isSeries ? 'series' : 'movie' } },
        { name: 'video:play', detail: { id, isSeries, title } },
        { name: 'content:play', detail: { id, isSeries, title } },
        { name: 'player:start', detail: { id, isSeries, title } }
    ];
    
    events.forEach(eventConfig => {
        try {
            const event = new CustomEvent(eventConfig.name, { 
                detail: eventConfig.detail,
                bubbles: true,
                cancelable: true
            });
            document.dispatchEvent(event);
            window.dispatchEvent(event);
        } catch (error) {
            console.warn(`Failed to dispatch ${eventConfig.name}:`, error);
        }
    });
}

// User-friendly message instead of errors
showPlayMessage(title, isError = false) {
    const message = isError 
        ? `Unable to play "${title}". Please try refreshing the page.`
        : `Attempting to play "${title}"...`;
    
    // Try multiple notification methods
    if (window.showNotification) {
        window.showNotification(message, isError ? 'error' : 'info');
    } else if (window.toast) {
        window.toast(message);
    } else {
        // Create a non-intrusive notification
        this.createNotification(message, isError);
    }
}

// Create a simple notification
createNotification(message, isError = false) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed; 
        top: 20px; 
        right: 20px; 
        z-index: 10000;
        background: ${isError ? '#ff6b6b' : '#4CAF50'}; 
        color: white; 
        padding: 12px 20px;
        border-radius: 8px; 
        font-family: Arial, sans-serif;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, isError ? 5000 : 3000);
}

// IMPROVED EVENT LISTENERS
addTrendingEventListeners() {
    const trendingGrid = document.getElementById('trendingGrid');
    if (!trendingGrid) {
        console.warn('Trending grid not found for event listeners');
        return;
    }

    // Remove existing listeners
    if (this.trendingClickHandler) {
        trendingGrid.removeEventListener('click', this.trendingClickHandler);
    }
    
    // Create the click handler
    this.trendingClickHandler = (event) => {
        // Prevent any default behaviors
        event.preventDefault();
        event.stopPropagation();
        
        const clickedElement = event.target;
        const trendingItem = clickedElement.closest('.trending-item');
        
        if (!trendingItem) {
            return; // Click wasn't on a trending item
        }

        // Get data from the trending item
        const id = trendingItem.dataset.id;
        const contentType = trendingItem.dataset.type;
        const title = trendingItem.dataset.title;
        
        if (!id) {
            console.warn('No ID found on trending item');
            return;
        }

        console.log(`🎯 Trending item clicked: ${title} (ID: ${id}, Type: ${contentType})`);
        
        // Play the content
        this.playContent(id, contentType, title);
    };
    
    // Add the event listener
    trendingGrid.addEventListener('click', this.trendingClickHandler);
    
    // Add keyboard support
    this.trendingKeyHandler = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            const trendingItem = event.target.closest('.trending-item');
            if (trendingItem) {
                event.preventDefault();
                event.stopPropagation();
                
                const id = trendingItem.dataset.id;
                const contentType = trendingItem.dataset.type;
                const title = trendingItem.dataset.title;
                
                this.playContent(id, contentType, title);
            }
        }
    };
    
    trendingGrid.addEventListener('keydown', this.trendingKeyHandler);
    
    console.log('✅ Trending event listeners added successfully');
}

// Optional: Method to try redirect-based playing (common in some apps)
tryRedirectToPlayer(id, isSeries) {
    try {
        const playUrl = isSeries ? `/series/${id}` : `/movie/${id}`;
        console.log(`Trying to redirect to: ${playUrl}`);
        
        // Try hash-based routing first
        if (window.location.hash !== undefined) {
            window.location.hash = `#/play/${isSeries ? 'series' : 'movie'}/${id}`;
            return true;
        }
        
        // Try pushState-based routing
        if (window.history && window.history.pushState) {
            window.history.pushState({}, '', playUrl);
            // Trigger a custom route change event
            window.dispatchEvent(new PopStateEvent('popstate'));
            return true;
        }
        
        return false;
    } catch (error) {
        console.warn('Redirect method failed:', error);
        return false;
    }
}

// Cleanup method (call this when component is destroyed)
destroy() {
    const trendingGrid = document.getElementById('trendingGrid');
    if (trendingGrid) {
        if (this.trendingClickHandler) {
            trendingGrid.removeEventListener('click', this.trendingClickHandler);
        }
        if (this.trendingKeyHandler) {
            trendingGrid.removeEventListener('keydown', this.trendingKeyHandler);
        }
    }
}







    renderWatchlist() {
        const watchlistContent = document.getElementById('watchlistContent');
        if (!watchlistContent) return;

        if (this.watchlist.length === 0) {
            watchlistContent.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon" aria-hidden="true">❤️</div>
                    <h3>Your watchlist is empty</h3>
                    <p>Add movies and series to your watchlist to watch them later</p>
                    <button class="btn-primary" onclick="streamflix.navigateToSection('movies')">Browse Movies</button>
                </div>
            `;
            return;
        }

        const watchlistItems = this.watchlist.map(id => {
            const isSeries = id > 100;
            return isSeries 
                ? this.series.find(s => s.id === id)
                : this.movies.find(m => m.id === id);
        }).filter(Boolean);

        watchlistContent.innerHTML = `
            <div class="watchlist-grid">
                ${watchlistItems.map(item => `
                    <div class="watchlist-item" data-id="${item.id}">
                        <div class="watchlist-poster">
                            <img src="${item.poster}" alt="${item.title} poster" loading="lazy">
                            <button class="remove-btn" onclick="streamflix.removeFromWatchlist(${item.id})" aria-label="Remove ${item.title} from watchlist">
                                <span aria-hidden="true">✕</span>
                            </button>
                        </div>
                        <div class="watchlist-info">
                            <h4>${item.title}</h4>
                            <p>${item.year} • ${item.genre.join(', ')}</p>
                            <button class="btn-primary" onclick="streamflix.playMovie(${item.id}, ${item.id > 100})" aria-label="Play ${item.title}">
                                <span aria-hidden="true">▶️</span> Watch Now
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderProfile() {
        const profileStats = document.getElementById('profileStats');
        if (!profileStats) return;

        const stats = {
            watchedMovies: Math.floor(Math.random() * 50) + 20,
            watchedSeries: Math.floor(Math.random() * 15) + 5,
            totalHours: Math.floor(Math.random() * 200) + 100,
            favoriteGenre: 'Action'
        };

        profileStats.innerHTML = `
            <div class="stat-card">
                <div class="stat-number">${stats.watchedMovies}</div>
                <div class="stat-label">Movies Watched</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${stats.watchedSeries}</div>
                <div class="stat-label">Series Watched</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${stats.totalHours}h</div>
                <div class="stat-label">Total Watch Time</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${stats.favoriteGenre}</div>
                <div class="stat-label">Favorite Genre</div>
            </div>
        `;
    }

    playMovie(id, isSeries = false) {
        const content = isSeries 
            ? this.series.find(s => s.id === id)
            : this.movies.find(m => m.id === id);

        if (!content) return;

        this.currentMovie = content;
        this.showMoviePlayer();
    }

    showMoviePlayer() {
        const player = document.getElementById('moviePlayer');
        const video = document.getElementById('videoPlayer');
        const overlay = document.getElementById('videoOverlay');
        const loader = document.getElementById('videoLoader');

        if (!player || !video || !this.currentMovie) return;

        // Update player UI
        document.getElementById('playerTitle').textContent = this.currentMovie.title;
        document.getElementById('movieTitle').textContent = this.currentMovie.title;
        document.getElementById('movieYear').textContent = this.currentMovie.year;
        document.getElementById('movieDuration').textContent = this.currentMovie.duration;
        document.getElementById('movieRating').textContent = this.currentMovie.rating;
        document.getElementById('movieGenre').textContent = this.currentMovie.genre.join(', ');
        document.getElementById('movieDescription').textContent = this.currentMovie.description;

        // Update cast
        const castList = document.getElementById('castList');
        if (castList) {
            castList.innerHTML = this.currentMovie.cast.map(actor => `
                <div class="cast-member" role="listitem">
                    <div class="cast-avatar" aria-hidden="true">👤</div>
                    <div class="cast-name">${actor}</div>
                </div>
            `).join('');
        }

        // Show loader
        loader.style.display = 'flex';
        
        // Set video source and poster
        video.src = this.currentMovie.trailer;
        video.poster = this.currentMovie.poster;

        // Show player
        player.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Handle video load
        video.addEventListener('loadeddata', () => {
            loader.style.display = 'none';
            overlay.style.display = 'flex';
        });

        video.addEventListener('play', () => {
            overlay.style.display = 'none';
            this.isPlaying = true;
        });

        video.addEventListener('pause', () => {
            overlay.style.display = 'flex';
            this.isPlaying = false;
        });

        // Generate recommendations
        this.generateRecommendations();
    }

    closePlayer() {
        const player = document.getElementById('moviePlayer');
        const video = document.getElementById('videoPlayer');
        
        if (player && video) {
            player.style.display = 'none';
            video.pause();
            video.src = '';
            document.body.style.overflow = 'auto';
            this.currentMovie = null;
            this.isPlaying = false;
        }
    }

    setupVideoPlayer() {
        const video = document.getElementById('videoPlayer');
        if (!video) return;

        // Video event listeners
        video.addEventListener('ended', () => {
            this.showToast('Video finished playing');
            document.getElementById('videoOverlay').style.display = 'flex';
        });
    }

    togglePlay() {
        const video = document.getElementById('videoPlayer');
        if (!video) return;

        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }

    toggleMute() {
        const video = document.getElementById('videoPlayer');
        if (!video) return;

        video.muted = !video.muted;
        this.isMuted = video.muted;
        this.showToast(video.muted ? 'Muted' : 'Unmuted');
    }

    toggleFullscreen() {
        const video = document.getElementById('videoPlayer');
        if (!video) return;

        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            video.requestFullscreen().catch(err => {
                console.error('Error attempting to enable fullscreen:', err);
            });
        }
    }

    shareMovie(movieId) {
        if (!movieId || !this.currentMovie) return;

        if (navigator.share) {
            navigator.share({
                title: this.currentMovie.title,
                text: `Check out ${this.currentMovie.title} on StreamFlix!`,
                url: window.location.href
            });
        } else {
            // Fallback - copy to clipboard
            const url = `${window.location.origin}?movie=${movieId}`;
            navigator.clipboard.writeText(url).then(() => {
                this.showToast('Movie link copied to clipboard!');
            });
        }
    }

    performSearch(query) {
        if (!query.trim()) {
            this.closeSearchOverlay();
            return;
        }

        const searchResults = [...this.movies, ...this.series]
            .filter(item => 
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.genre.some(g => g.toLowerCase().includes(query.toLowerCase())) ||
                item.cast.some(c => c.toLowerCase().includes(query.toLowerCase()))
            );

        this.showSearchResults(searchResults, query);
    }

    showSearchResults(results, query) {
        const overlay = document.getElementById('searchOverlay');
        const resultsContainer = document.getElementById('searchResults');

        if (!overlay || !resultsContainer) return;

        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <div class="no-results-icon" aria-hidden="true">🔍</div>
                    <h3>No results found</h3>
                    <p>Try searching for something else</p>
                </div>
            `;
        } else {
            resultsContainer.innerHTML = `
                <div class="search-results-header">
                    <h4>Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"</h4>
                </div>
                <div class="search-results-grid">
                    ${results.map(item => `
                        <div class="search-result-item" data-id="${item.id}" onclick="streamflix.playMovie(${item.id}, ${item.id > 100})">
                            <img src="${item.poster}" alt="${item.title} poster" loading="lazy">
                            <div class="search-result-info">
                                <h5>${item.title}</h5>
                                <p>${item.year} • ${item.genre.join(', ')}</p>
                                <div class="search-result-rating">${item.rating}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        overlay.style.display = 'flex';
    }

    closeSearchOverlay() {
        const overlay = document.getElementById('searchOverlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    }

    startVoiceSearch() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            this.showToast('Voice search not supported in this browser', 'error');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            this.showToast('Listening... Speak now');
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            document.getElementById('searchInput').value = transcript;
            this.performSearch(transcript);
        };

        recognition.onerror = (event) => {
            this.showToast('Voice search error: ' + event.error, 'error');
        };

        recognition.start();
    }

    toggleWatchlist(id, isSeries = false) {
        const index = this.watchlist.indexOf(id);
        
        if (index > -1) {
            this.watchlist.splice(index, 1);
            this.showToast('Removed from watchlist');
        } else {
            this.watchlist.push(id);
            this.showToast('Added to watchlist');
        }

        localStorage.setItem('streamflix_watchlist', JSON.stringify(this.watchlist));
        
        // Update UI
        this.renderWatchlist();
        this.renderMovies(this.currentFilter);
        this.renderSeries(this.currentFilter);
    }

    removeFromWatchlist(id) {
        this.toggleWatchlist(id);
    }

    clearWatchlist() {
        if (this.watchlist.length === 0) return;

        if (confirm('Are you sure you want to clear your entire watchlist?')) {
            this.watchlist = [];
            localStorage.setItem('streamflix_watchlist', JSON.stringify(this.watchlist));
            this.renderWatchlist();
            this.showToast('Watchlist cleared');
        }
    }

    isInWatchlist(id) {
        return this.watchlist.includes(id);
    }

    handleFilterClick(button) {
        const section = button.closest('.section').id;
        const filter = button.getAttribute('data-filter');

        // Update active filter
        button.parentElement.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });
        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');

        this.currentFilter = filter;

        // Render filtered content
        if (section === 'movies') {
            this.renderMovies(filter);
        } else if (section === 'series') {
            this.renderSeries(filter);
        }
    }

    handleTabClick(button) {
        const tabContainer = button.parentElement;
        const tab = button.getAttribute('data-tab');

        // Update active tab
        tabContainer.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });
        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');

        // Show corresponding tab content
        const tabContent = tabContainer.nextElementSibling;
        tabContent.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        
        const targetPane = tabContent.querySelector(`[data-tab="${tab}"]`);
        if (targetPane) {
            targetPane.classList.add('active');
        }
    }

    openCategoryModal(category) {
        const modal = document.getElementById('categoryModal');
        const title = document.getElementById('categoryTitle');
        const content = document.getElementById('categoryContent');

        if (!modal || !title || !content) return;

        // Filter content by category
        const categoryContent = [...this.movies, ...this.series]
            .filter(item => item.category === category);

        title.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        
        content.innerHTML = `
            <div class="category-grid">
                ${categoryContent.map(item => `
                    <div class="category-item" onclick="streamflix.playMovie(${item.id}, ${item.id > 100})">
                        <img src="${item.poster}" alt="${item.title} poster" loading="lazy">
                        <div class="category-item-info">
                            <h4>${item.title}</h4>
                            <p>${item.year} • ${item.rating}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        modal.style.display = 'flex';
    }

    closeCategoryModal() {
        const modal = document.getElementById('categoryModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    closeAllModals() {
        this.closeSearchOverlay();
        this.closeCategoryModal();
        this.closePlayer();
    }

    toggleTheme() {
        const body = document.body;
        const themeToggle = document.getElementById('themeToggle');
        
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            this.theme = 'light';
            if (themeToggle) {
                themeToggle.innerHTML = '<span aria-hidden="true">🌙</span>';
            }
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            this.theme = 'dark';
            if (themeToggle) {
                themeToggle.innerHTML = '<span aria-hidden="true">☀️</span>';
            }
        }

        localStorage.setItem('streamflix_theme', this.theme);
        this.showToast(`Switched to ${this.theme} theme`);
    }

    applyTheme() {
        const body = document.body;
        const themeToggle = document.getElementById('themeToggle');
        
        if (this.theme === 'light') {
            body.classList.add('light-theme');
            body.classList.remove('dark-theme');
            if (themeToggle) {
                themeToggle.innerHTML = '<span aria-hidden="true">🌙</span>';
            }
        } else {
            body.classList.add('dark-theme');
            body.classList.remove('light-theme');
            if (themeToggle) {
                themeToggle.innerHTML = '<span aria-hidden="true">☀️</span>';
            }
        }
    }

    setupSearch() {
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) return;

        // Enhanced search with debouncing
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();
            
            if (query.length === 0) {
                this.closeSearchOverlay();
                return;
            }

            searchTimeout = setTimeout(() => {
                this.performSearch(query);
            }, 300);
        });

        // Handle Enter key
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.performSearch(e.target.value);
            }
        });
    }

    handleKeyboard(e) {
        // Global keyboard shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'k':
                case 'f':
                    e.preventDefault();
                    document.getElementById('searchInput')?.focus();
                    break;
            }
        }

        // Escape key to close modals
        if (e.key === 'Escape') {
            this.closeAllModals();
        }

        // Space to play/pause (when video player is open)
        if (e.key === ' ' && this.currentMovie && !e.target.matches('input, textarea')) {
            e.preventDefault();
            this.togglePlay();
        }

        // Arrow keys for navigation
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const focusedElement = document.activeElement;
            if (focusedElement && focusedElement.classList.contains('movie-card')) {
                const cards = Array.from(document.querySelectorAll('.movie-card'));
                const currentIndex = cards.indexOf(focusedElement);
                let nextIndex;

                if (e.key === 'ArrowRight') {
                    nextIndex = (currentIndex + 1) % cards.length;
                } else {
                    nextIndex = (currentIndex - 1 + cards.length) % cards.length;
                }

                cards[nextIndex]?.focus();
                e.preventDefault();
            }
        }
    }

    handleResponsive() {
        const width = window.innerWidth;
        const mobileNav = document.getElementById('mobileNav');
        const mobileToggle = document.getElementById('mobileMenuToggle');

        // Close mobile menu on desktop
        if (width > 768 && mobileNav) {
            mobileNav.style.display = 'none';
            mobileToggle?.setAttribute('aria-expanded', 'false');
        }

        // Adjust grid layouts based on screen size
        this.adjustGridLayouts();
    }

    adjustGridLayouts() {
        const grids = document.querySelectorAll('.movies-grid, .trending-grid');
        const width = window.innerWidth;

        grids.forEach(grid => {
            if (width <= 480) {
                grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
            } else if (width <= 768) {
                grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
            } else if (width <= 1024) {
                grid.style.gridTemplateColumns = 'repeat(4, 1fr)';
            } else {
                grid.style.gridTemplateColumns = 'repeat(5, 1fr)';
            }
        });
    }

    generateRecommendations() {
    const recommendations = document.getElementById('recommendations');
    if (!recommendations || !this.currentMovie) return;

    // Safe array handling
    const allContent = [];
    if (this.movies) allContent.push(...this.movies);
    if (this.series) allContent.push(...this.series);

    // Get similar movies based on genre with better error handling
    const similar = allContent
        .filter(item => 
            item && 
            item.id !== this.currentMovie.id &&
            item.genre && 
            this.currentMovie.genre &&
            item.genre.some(g => this.currentMovie.genre.includes(g))
        )
        .slice(0, 4);

    if (similar.length === 0) {
        recommendations.innerHTML = '';
        return;
    }

    recommendations.innerHTML = `
        <h4>Recommended for You</h4>
        <div class="recommendations-grid">
            ${similar.map(item => `
                <div class="recommendation-item" onclick="streamflix.playMovie(${item.id}, ${item.id > 100})" style="cursor: pointer;">
                    <div class="recommendation-poster">
                        <img src="${item.poster || ''}" 
                             alt="${item.title || ''} poster" 
                             loading="lazy"
                             style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <div class="recommendation-info">
                        <h5>${item.title || 'Untitled'}</h5>
                        <p>${item.year || ''}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Add this CSS to your stylesheet to control image sizes:
/*
.recommendations-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 15px;
}

.recommendation-item {
    cursor: pointer;
    transition: transform 0.3s ease;
}

.recommendation-item:hover {
    transform: scale(1.05);
}

.recommendation-poster {
    width: 100%;
    height: 280px;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 10px;
}

.recommendation-info h5 {
    margin: 0 0 5px 0;
    font-size: 16px;
    font-weight: 600;
}

.recommendation-info p {
    margin: 0;
    opacity: 0.7;
    font-size: 14px;
}

@media (max-width: 768px) {
    .recommendations-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
    }
    
    .recommendation-poster {
        height: 240px;
    }
}
*/
    
    showMovieDetails(id, isSeries = false) {
        const content = isSeries 
            ? this.series.find(s => s.id === id)
            : this.movies.find(m => m.id === id);

        if (!content) return;

        // For now, just play the movie
        // In a real app, you might show a detailed modal first
        this.playMovie(id, isSeries);
    }

    showToast(message, type = 'success') {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon" aria-hidden="true">
                    ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
                </span>
                <span class="toast-message">${message}</span>
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()" aria-label="Close notification">
                <span aria-hidden="true">✕</span>
            </button>
        `;

        container.appendChild(toast);

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 3000);

        // Animate in
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
    }

    formatViews(views) {
        if (views >= 1000000) {
            return (views / 1000000).toFixed(1) + 'M';
        } else if (views >= 1000) {
            return (views / 1000).toFixed(1) + 'K';
        }
        return views.toString();
    }

    // Utility methods for touch gestures on mobile
    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
    }

    handleTouchMove(e) {
        if (!this.touchStartX || !this.touchStartY) return;

        const touchEndX = e.touches[0].clientX;
        const touchEndY = e.touches[0].clientY;
        const deltaX = this.touchStartX - touchEndX;
        const deltaY = this.touchStartY - touchEndY;

        // Horizontal swipe
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                // Swipe left - next section
                this.navigateNext();
            } else {
                // Swipe right - previous section
                this.navigatePrevious();
            }
        }

        this.touchStartX = null;
        this.touchStartY = null;
    }

    navigateNext() {
        const sections = ['home', 'movies', 'series', 'trending', 'watchlist', 'profile'];
        const currentIndex = sections.indexOf(this.currentSection);
        const nextIndex = (currentIndex + 1) % sections.length;
        this.navigateToSection(sections[nextIndex]);
    }

    navigatePrevious() {
        const sections = ['home', 'movies', 'series', 'trending', 'watchlist', 'profile'];
        const currentIndex = sections.indexOf(this.currentSection);
        const prevIndex = (currentIndex - 1 + sections.length) % sections.length;
        this.navigateToSection(sections[prevIndex]);
    }

    // PWA support
    initPWA() {
        // Register service worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered:', registration);
                })
                .catch(error => {
                    console.log('SW registration failed:', error);
                });
        }

        // Handle install prompt
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallPrompt();
        });
    }

    showInstallPrompt() {
        // Show install button or banner
        const installBtn = document.createElement('button');
        installBtn.textContent = 'Install StreamFlix';
        installBtn.className = 'install-btn';
        installBtn.onclick = () => this.installApp();
        
        document.body.appendChild(installBtn);
    }

    installApp() {
        if (this.deferredPrompt) {
            this.deferredPrompt.prompt();
            this.deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    this.showToast('App installed successfully!');
                }
                this.deferredPrompt = null;
            });
        }
    }

    // Performance monitoring
    measurePerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const loadTime = performance.now();
                console.log(`StreamFlix loaded in ${loadTime.toFixed(2)}ms`);
            });
        }
    }

    // Initialize error handling
    initErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('Global error:', e);
            this.showToast('Something went wrong. Please refresh the page.', 'error');
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e);
            this.showToast('Network error. Please check your connection.', 'error');
        });
    }

    // Clean up and destroy
    destroy() {
        // Remove event listeners
        window.removeEventListener('resize', this.handleResponsive);
        document.removeEventListener('keydown', this.handleKeyboard);
        
        // Clear timeouts
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }

        // Stop any playing video
        const video = document.getElementById('videoPlayer');
        if (video) {
            video.pause();
            video.src = '';
        }
    }
}

// Initialize StreamFlix when DOM is loaded
let streamflix;

document.addEventListener('DOMContentLoaded', () => {
    streamflix = new StreamFlix();
    
    // Add touch support for mobile
    document.addEventListener('touchstart', (e) => {
        streamflix.handleTouchStart(e);
    });
    
    document.addEventListener('touchmove', (e) => {
        streamflix.handleTouchMove(e);
    });

    // Initialize PWA features
    streamflix.initPWA();
    streamflix.measurePerformance();
    streamflix.initErrorHandling();
});

// Handle browser back/forward buttons
window.addEventListener('popstate', (e) => {
    if (e.state && e.state.section) {
        streamflix.navigateToSection(e.state.section);
    }
});

// Add to window for global access
window.streamflix = streamflix;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StreamFlix;
}