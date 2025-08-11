// Back to top button functionality
const backToTop = document.getElementById("backToTop");
const mainContent = document.querySelector(".main-content");

mainContent.addEventListener("scroll", () => {
  if (mainContent.scrollTop > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  mainContent.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Navigation functionality
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    const progressBar = document.getElementById('progressBar');
    const searchInput = document.getElementById('searchInput');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update active nav link
                navLinks.forEach(nl => nl.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });


    // Progress bar functionality
    function updateProgressBar() {
        const mainContent = document.querySelector('.main-content');
        const scrollTop = mainContent.scrollTop;
        const scrollHeight = mainContent.scrollHeight - mainContent.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;

        progressBar.style.width = scrollPercentage + '%';
    }

    // Update active navigation based on scroll position
    function updateActiveNav() {
        const mainContent = document.querySelector('.main-content');
        const scrollTop = mainContent.scrollTop + 100; // Offset for better UX

        let activeSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                activeSection = section.id;
            }
        });

        // Update navigation
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + activeSection) {
                link.classList.add('active');
            }
        });
    }

    // Listen for scroll events
    document.querySelector('.main-content').addEventListener('scroll', function () {
        updateProgressBar();
        updateActiveNav();
    });

    // Search functionality
    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        const allContent = document.querySelectorAll('.content-section');

        allContent.forEach(section => {
            const text = section.textContent.toLowerCase();
            const isVisible = text.includes(searchTerm) || searchTerm === '';

            section.style.display = isVisible ? 'block' : 'none';
        });

        // If searching, remove fade-in animation to show results immediately
        if (searchTerm) {
            allContent.forEach(section => section.classList.remove('fade-in'));
        } else {
            allContent.forEach(section => section.classList.add('fade-in'));
        }
    });

    // Add fade-in animation to sections as they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Initialize progress bar and navigation
    updateProgressBar();
    updateActiveNav();

    // Add interactive hover effects for cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add interactive effects for feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px) rotate(1deg)';
            this.style.boxShadow = '0 10px 20px rgba(44, 82, 130, 0.15)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) rotate(0deg)';
            this.style.boxShadow = 'none';
        });
    });

    // Add pulse effect to step numbers
    document.querySelectorAll('.step-number').forEach(step => {
        step.addEventListener('mouseenter', function () {
            this.style.animation = 'pulse 0.6s ease-in-out';
        });

        step.addEventListener('animationend', function () {
            this.style.animation = '';
        });
    });

    // Add smooth reveal animation for workflow steps
    const workflowSteps = document.querySelectorAll('.workflow-step');
    workflowSteps.forEach((step, index) => {
        step.style.animationDelay = `${index * 0.1}s`;
        step.classList.add('fade-in');
    });

    // Add typing effect for highlighted text
    document.querySelectorAll('.highlight').forEach(highlight => {
        const originalText = highlight.textContent;
        highlight.textContent = '';

        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                highlight.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };

        // Start typing when element comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeWriter, 500);
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(highlight);
    });
});

// Add CSS animation for pulse effect
const style = document.createElement('style');
style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
        `;
document.head.appendChild(style);


