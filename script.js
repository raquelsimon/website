import { animate, scroll } from "https://esm.run/framer-motion@11";

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();


    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuIcon = mobileMenuButton.querySelector('i');
    const navLinksMobile = document.querySelectorAll('#mobile-menu a');

    mobileMenuButton.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.toggle('hidden');
        mobileMenuIcon.setAttribute('data-lucide', isHidden ? 'menu' : 'x');
        lucide.createIcons();
    });

    navLinksMobile.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuIcon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });


    const header = document.getElementById('main-header');
    const navLinksDesktop = header.querySelectorAll('nav.hidden a');
    const headerIcon = header.querySelector('#mobile-menu-button i');

    const updateHeaderStyle = () => {
        if (window.scrollY > 50) {
            header.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-md', 'text-text-dark');
            header.classList.remove('text-white');
        } else {
            header.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-md', 'text-text-dark');
            header.classList.add('text-white');
        }
    };
    
    window.addEventListener('scroll', updateHeaderStyle);
    updateHeaderStyle();



    const sections = document.querySelectorAll('section[id]');
    const allNavLinks = document.querySelectorAll('header nav a');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        let activeId = '';
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activeId = entry.target.getAttribute('id');
            }
        });

        allNavLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${activeId}`) {
                link.classList.add('active');
            }
        });

    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    const animatedElements = document.querySelectorAll('.animated-section');
    
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });


    const slider = document.querySelector('.testimonial-slider');
    if (slider) {
        const testimonials = slider.querySelectorAll('.testimonial-item');
        let currentTestimonial = 0;

        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.classList.add('hidden', 'opacity-0');
                if (i === index) {
                    testimonial.classList.remove('hidden');
                    setTimeout(() => testimonial.classList.remove('opacity-0'), 50);
                }
            });
        }

        function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }
        
        if (testimonials.length > 1) {
            showTestimonial(0);
            setInterval(nextTestimonial, 7000);
        } else if (testimonials.length === 1) {
            showTestimonial(0);
        }
    }
});
