// Initialize Feather Icons
feather.replace();

// Fade in elements on scroll
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOnScroll = () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
        }
    });
};

// Smooth scrolling for anchor links
const setupSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// Mobile menu functionality - Final robust version
const setupMobileMenu = () => {
    console.log('Setting up mobile menu');
    
    // Remove any existing mobile menu to prevent duplicates
    const existingMenu = document.getElementById('universal-mobile-menu');
    if (existingMenu) {
        existingMenu.remove();
    }
    
    // Find or create hamburger button
    let mobileMenuButton = document.querySelector('nav button[class*="md:hidden"]');
    if (!mobileMenuButton) {
        mobileMenuButton = document.querySelector('nav button');
    }
    if (!mobileMenuButton) {
        // Create a button if we can't find one
        console.log('Creating mobile menu button');
        const navContainer = document.querySelector('nav .container');
        if (navContainer) {
            mobileMenuButton = document.createElement('button');
            mobileMenuButton.className = 'md:hidden p-2 group';
            mobileMenuButton.innerHTML = `
                <div class="w-6 h-5 flex flex-col justify-between items-end">
                    <span class="block w-6 h-0.5 bg-charcoal transition-all duration-300 group-hover:bg-sage"></span>
                    <span class="block w-5 h-0.5 bg-charcoal transition-all duration-300 delay-100 group-hover:bg-sage"></span>
                    <span class="block w-4 h-0.5 bg-charcoal transition-all duration-300 delay-200 group-hover:bg-sage"></span>
                </div>
            `;
            navContainer.appendChild(mobileMenuButton);
        }
    }
    
    console.log('Mobile menu button:', mobileMenuButton);
    
    // Create our universal mobile menu container
    const mobileMenuContainer = document.createElement('div');
    mobileMenuContainer.id = 'universal-mobile-menu';
    mobileMenuContainer.className = 'fixed inset-0 bg-black/50 z-50 hidden';
    
    // Create menu content panel
    const mobileMenuContent = document.createElement('div');
    mobileMenuContent.className = 'absolute top-0 right-0 h-full w-64 bg-white shadow-lg transform translate-x-full transition-transform duration-300 ease-in-out';
    
    // Create close button
    const closeButton = document.createElement('button');
    closeButton.className = 'absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 z-10';
    closeButton.innerHTML = '<i data-feather="x" class="w-5 h-5"></i>';
    
    // Create navigation links container
    const navLinksContainer = document.createElement('div');
    navLinksContainer.className = 'flex flex-col p-6 pt-16 space-y-6';
    
    // Create main navigation links
    const mainLinks = [
        { text: 'Home', href: 'index.html' },
        { text: 'Portfolio', href: 'index.html#work', isGroup: true },
        { text: 'About', href: 'index.html#about' },
        { text: 'Contact', href: 'index.html#contact' }
    ];
    
    // Add portfolio submenu links
    const portfolioLinks = [
        { text: 'Juicyyaap', href: 'juicyyaap.html' },
        { text: 'On The Pass', href: 'onthepass.html' }
    ];
    
    // Add links to the container
    mainLinks.forEach(link => {
        if (link.isGroup && link.text === 'Portfolio') {
            // Create portfolio dropdown
            const portfolioGroup = document.createElement('div');
            portfolioGroup.className = 'space-y-2';
            
            const portfolioButton = document.createElement('button');
            portfolioButton.className = 'flex items-center justify-between w-full text-left text-sm uppercase tracking-wider hover:text-sage transition-colors duration-300';
            portfolioButton.innerHTML = `
                <span>${link.text}</span>
                <i data-feather="chevron-down" class="w-3 h-3 transform transition-transform duration-300"></i>
            `;
            
            // Create submenu container
            const submenuContainer = document.createElement('div');
            submenuContainer.className = 'pl-4 space-y-3 hidden';
            
            // Add submenu links
            portfolioLinks.forEach(subLink => {
                const a = document.createElement('a');
                a.href = subLink.href;
                a.className = 'block text-sm uppercase tracking-wider hover:text-sage transition-colors duration-300';
                a.textContent = subLink.text;
                
                a.addEventListener('click', () => {
                    setTimeout(() => {
                        closeMobileMenu();
                    }, 100);
                });
                
                submenuContainer.appendChild(a);
            });
            
            // Toggle submenu on click
            portfolioButton.addEventListener('click', (e) => {
                e.stopPropagation();
                const icon = portfolioButton.querySelector('i');
                submenuContainer.classList.toggle('hidden');
                icon.classList.toggle('rotate-180');
            });
            
            portfolioGroup.appendChild(portfolioButton);
            portfolioGroup.appendChild(submenuContainer);
            navLinksContainer.appendChild(portfolioGroup);
        } else {
            // Regular navigation link
            const a = document.createElement('a');
            a.href = link.href;
            a.className = 'text-sm uppercase tracking-wider hover:text-sage transition-colors duration-300';
            a.textContent = link.text;
            
            a.addEventListener('click', () => {
                setTimeout(() => {
                    closeMobileMenu();
                }, 100);
            });
            
            navLinksContainer.appendChild(a);
        }
    });
    
    // Assemble the menu
    mobileMenuContent.appendChild(closeButton);
    mobileMenuContent.appendChild(navLinksContainer);
    mobileMenuContainer.appendChild(mobileMenuContent);
    document.body.appendChild(mobileMenuContainer);
    
    // Initialize feather icons
    try {
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    } catch (error) {
        console.log('Feather icons not available');
    }
    
    // Menu toggle functions
    const openMobileMenu = () => {
        mobileMenuContainer.classList.remove('hidden');
        // Force repaint for smooth animation
        void mobileMenuContainer.offsetWidth;
        setTimeout(() => {
            mobileMenuContent.classList.remove('translate-x-full');
        }, 10);
    };
    
    const closeMobileMenu = () => {
        mobileMenuContent.classList.add('translate-x-full');
        setTimeout(() => {
            mobileMenuContainer.classList.add('hidden');
        }, 300);
    };
    
    // Add event listeners with proper error handling
    if (mobileMenuButton) {
        // Remove any existing event listeners
        const newButton = mobileMenuButton.cloneNode(true);
        if (mobileMenuButton.parentNode) {
            mobileMenuButton.parentNode.replaceChild(newButton, mobileMenuButton);
            mobileMenuButton = newButton;
        }
        
        mobileMenuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            openMobileMenu();
        });
    }
    
    closeButton.addEventListener('click', closeMobileMenu);
    
    // Close when clicking outside
    mobileMenuContainer.addEventListener('click', (e) => {
        if (e.target === mobileMenuContainer) {
            closeMobileMenu();
        }
    });
    
    console.log('Mobile menu setup complete');
};

// Event listeners
window.addEventListener('load', () => {
    fadeInOnScroll();
    setupSmoothScrolling();
    setupMobileMenu();
});
window.addEventListener('scroll', fadeInOnScroll);