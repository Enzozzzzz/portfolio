// Gestion du thème
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

function toggleTheme() {
    if (themeToggle.checked) {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

themeToggle.addEventListener('change', toggleTheme);

function checkSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        themeToggle.checked = true;
        body.setAttribute('data-theme', 'dark');
    } else {
        themeToggle.checked = false;
        body.setAttribute('data-theme', 'light');
    }
}

document.addEventListener('DOMContentLoaded', checkSavedTheme);


// Gestion du formulaire de contact
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const status = document.getElementById('form-status');
    
    status.textContent = 'Envoi en cours...';
    status.style.color = 'var(--color-12)';
    
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            status.textContent = 'Message envoyé avec succès !';
            status.style.color = 'var(--color-9)';
            form.reset();
        } else {
            throw new Error('Erreur lors de l\'envoi');
        }
    })
    .catch(error => {
        status.textContent = 'Une erreur est survenue. Veuillez réessayer.';
        status.style.color = 'var(--color-10)';
        console.error('Error:', error);
    });
});



// Effet de défilement fluide pour le lien "scroll-down"
document.querySelector('.scroll-down').addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Effet de défilement fluide pour les liens de navigation
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

//home // 
window.addEventListener('scroll', () => {
    const homeSection = document.getElementById('home');
    const homeHeight = homeSection.offsetHeight;
    
    // Cacher la vidéo quand on scroll hors de la section Home
    if (window.scrollY > homeHeight) {
        homeSection.style.overflow = 'visible';
    } else {
        homeSection.style.overflow = 'hidden';
    }
});


document.querySelectorAll('.mes-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--y', `${e.clientY - rect.top}px`);
    });
});


// Animation pour la section Équipe

const teamCards = document.querySelectorAll('.team-card');

teamCards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
});

const teamObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    },
    { threshold: 0.1 }
);

teamCards.forEach(card => teamObserver.observe(card));

document.querySelectorAll('.team-card').forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    teamObserver.observe(card);
});

// Ajouter la section "Mon Parcours" à l'observateur d'intersection
const parcoursSection = document.getElementById('parcours');
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.remove('hidden');
            } else {
                entry.target.classList.add('hidden');
                entry.target.classList.remove('visible');
            }
        });
    },
    {
        threshold: 0.1, 
    }
);

observer.observe(parcoursSection);

// Gestion du formulaire de contact
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Merci pour votre message ! Je vous répondrai dès que possible.');
    this.reset();
});

// Effet de parallaxe pour la section Home
window.addEventListener('scroll', () => {
    const homeSection = document.getElementById('home');
    const scrollPosition = window.scrollY;
    homeSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`; 
});

// Effet de transition lors du défilement
const sections = document.querySelectorAll('section');

const observerParc = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.remove('hidden');
            } else {
                entry.target.classList.add('hidden');
                entry.target.classList.remove('visible');
            }
        });
    },
    {
        threshold: 0.1, 
    }
);

sections.forEach((section) => {
    observerParc.observe(section);
});

// Ajouter la section "Stage" à l'observateur d'intersection
const stageSection = document.getElementById('stage');
const observerStage = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.remove('hidden');
            } else {
                entry.target.classList.add('hidden');
                entry.target.classList.remove('visible');
            }
        });
    },
    {
        threshold: 0.1, // Déclenche l'effet lorsque 10% de la section est visible
    }
);

observerStage.observe(stageSection);



// Gestion de la barre de navigation sticky
const navbar = document.getElementById('navbar');
const homeSection = document.getElementById('home');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 100) {
        navbar.style.backgroundColor = 'var(--color-3)'; // Couleur du thème
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'transparent';
        navbar.style.boxShadow = 'none';
    }
});


function checkSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        themeToggle.checked = true;
        body.setAttribute('data-theme', 'dark');
    } else {
        themeToggle.checked = false;
        body.setAttribute('data-theme', 'light');
    }
}

themeToggle.addEventListener('change', toggleTheme);
document.addEventListener('DOMContentLoaded', checkSavedTheme);



// Animations au défilement
const createObserver = (options, callback, classNames) => {
    return new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                classNames.forEach(className => entry.target.classList.add(className));
            } else if (options.reset) {
                classNames.forEach(className => entry.target.classList.remove(className));
            }
        });
    }, options);
};

// Configuration des observateurs
const observers = {
    teamCards: createObserver(
        { threshold: 0.15 },
        null,
        ['visible']
    ),
    
    explorerBoxes: createObserver(
        { threshold: 0.2, rootMargin: '0px 0px -50px 0px' },
        (entry, index) => {
            entry.target.style.transitionDelay = `${index * 0.15}s`;
        },
        ['visible']
    ),

    genericCards: createObserver(
        { threshold: 0.15, reset: true },
        null,
        ['active']
    )
};

// Application des observateurs
document.querySelectorAll('.team-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    observers.teamCards.observe(card);
});

document.querySelectorAll('.explorer-box').forEach((box, index) => {
    box.style.opacity = '0';
    box.style.transform = 'translateY(50px) rotateX(15deg)';
    observers.explorerBoxes.observe(box);
});

document.querySelectorAll('.data-card, .artenay-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    observers.genericCards.observe(card);
});

// Interactions dynamiques
document.querySelectorAll('.explorer-box').forEach(box => {
    box.addEventListener('mousemove', (e) => {
        const rect = box.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width/2) / 20;
        const y = (e.clientY - rect.top - rect.height/2) / 20;
        
        box.style.transform = `
            translateZ(20px)
            rotateX(${-y}deg)
            rotateY(${x}deg)
            scale(1.05)
        `;
    });

    box.addEventListener('mouseleave', () => {
        box.style.transform = 'translateZ(0) rotateX(0) rotateY(0) scale(1)';
    });
});

// Navigation fluide
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Barre de navigation sticky
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('sticky', window.scrollY > 100);
});

// Ajout des animations pour les cartes de défis techniques
document.querySelectorAll('.challenge-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transitionDelay = `${index * 0.2}s`;
    setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 500 + index * 200);
});

// Effet de halo au survol des cartes
document.querySelectorAll('.challenge-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--y', `${e.clientY - rect.top}px`);
    });
});

// Initialisation finale
window.addEventListener('load', () => {
    initParticles();
    
    // Pré-chargement des animations
    setTimeout(() => {
        document.body.classList.add('animations-loaded');
    }, 500);
});