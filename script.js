// DOM Elements
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');
const sizeChartModal = document.getElementById('sizeChartModal');
const closeModal = document.querySelector('.close');
const newsletterForm = document.querySelector('.newsletter-form');
const cartCount = document.querySelector('.cart-count');
const searchToggle = document.querySelector('.search-toggle');

// Mobile Menu Toggle
if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Size Chart Modal Functions
function openSizeChart() {
    if (sizeChartModal) {
        sizeChartModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeSizeChart() {
    if (sizeChartModal) {
        sizeChartModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking the X
if (closeModal) {
    closeModal.addEventListener('click', closeSizeChart);
}

// Close modal when clicking outside
if (sizeChartModal) {
    sizeChartModal.addEventListener('click', (e) => {
        if (e.target === sizeChartModal) {
            closeSizeChart();
        }
    });
}

// Newsletter Form
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;

        if (email) {
            showNotification('Thank you for subscribing! 🎉', 'success');
            e.target.reset();
        }
    });
}

// Cart Functionality
// Cart Items Array
let cartItemsArr = [];

function addToCart(product) {
    cartItemsArr.push(product);
    updateCartCount();
    showNotification('Item added to cart! 🛍️', 'success');
}

function updateCartCount() {
    if (cartCount) {
        cartCount.textContent = cartItemsArr.length;
    }
}

// Search Toggle
if (searchToggle) {
    searchToggle.addEventListener('click', () => {
        const existingSearchBar = document.querySelector('.search-bar');
        if (existingSearchBar) {
            existingSearchBar.classList.toggle('active');
        } else {
            createSearchBar();
        }
    });
}

function createSearchBar() {
    const searchBar = document.createElement('div');
    searchBar.className = 'search-bar active';
    searchBar.innerHTML = `
        <div class="search-container">
            <input type="text" placeholder="Search for products..." class="search-input">
            <button class="search-btn"><i class="fas fa-search"></i></button>
            <button class="search-close"><i class="fas fa-times"></i></button>
        </div>
    `;

    document.querySelector('.header').appendChild(searchBar);

    // Add event listeners for the new search bar
    const searchClose = searchBar.querySelector('.search-close');
    const searchBtn = searchBar.querySelector('.search-btn');
    const searchInput = searchBar.querySelector('.search-input');

    searchClose.addEventListener('click', () => {
        searchBar.remove();
    });

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Focus on input
    setTimeout(() => searchInput.focus(), 100);
}

function performSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput && searchInput.value.trim()) {
        showNotification(`Searching for: "${searchInput.value}" 🔍`, 'info');
        // Here you would typically implement actual search functionality
        setTimeout(() => {
            showNotification('Search feature coming soon! 🚀', 'info');
        }, 1000);
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

    document.body.appendChild(notification);

    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        zIndex: '9999',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        minWidth: '280px',
        maxWidth: '400px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        animation: 'slideInRight 0.4s ease',
        fontSize: '14px',
        fontWeight: '500'
    });

    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#4CAF50';
            break;
        case 'error':
            notification.style.backgroundColor = '#f44336';
            break;
        case 'info':
        default:
            notification.style.backgroundColor = '#2196F3';
            break;
    }

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    Object.assign(closeBtn.style, {
        background: 'none',
        border: 'none',
        color: 'white',
        fontSize: '20px',
        cursor: 'pointer',
        marginLeft: 'auto',
        padding: '0 5px'
    });

    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 4000);
}

// Product Quick View Modal
function createQuickViewModal() {
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.style.display = 'none';
    modal.innerHTML = `
        <div class="quick-view-content">
            <span class="quick-view-close">&times;</span>
            <div class="quick-view-body">
                <div class="quick-view-image">
                    <img src="" alt="Product" class="main-quick-img">
                    <div class="quick-thumbnails"></div>
                </div>
                <div class="quick-view-info">
                    <h3 class="product-title"></h3>
                    <p class="product-desc" style="margin: 8px 0 0 0; color: #666; font-size: 15px; display: none;"></p>
                    <p class="product-price"></p>
                    <div class="size-selector">
                        <label>📍 Shila Apartment, Mahalaxmi nagar, New Narsala Road, Opposite Process Hall, Nagpur.</label>
                    </div>
                    <button class="add-to-cart-btn">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

// Initialize quick view modal
let quickViewModal = null;
// Example product images data (extend as needed)
const productImages = {
    'Shade of Elegance': [
        'images/15.jpg',
        'images/16.jpg',
        'images/17.jpg'   
    ],
    'Chaniyacholi With Dupatta': [
        'images/12.jpg',
        'images/13.jpg',
        'images/14.jpg'
    ],
    'GlowRatri': [
        'images/18.jpg',
        'images/19.jpg',
        'images/20.jpg',
        'images/21.jpg'
    ],
    'Yellow Chaniyacholi': [
        'images/22.jpg',
        'images/23.jpg',
        'images/24.jpg',
        'images/25.jpg'
    ],
    'Multicolored Choli' : [
        'images/26.jpg',
        'images/27.jpg',
        'images/28.jpg'
    ],
    'Purple Lehenga': [
        'images/29.jpg',
        'images/30.jpg',
        'images/31.jpg'
    ],

     // Add more Kurtisproducts and their images as needed
    'Red Short Kurti': [
        'Kurtis/32.jpg',
        'Kurtis/33.jpg',
        'Kurtis/34.jpg',
        'Kurtis/35.jpg'
    ],
    'Blue Short Kurti': [
        'Kurtis/36.jpg',
        'Kurtis/37.jpg',
        'Kurtis/38.jpg'
    ],
    'Celebrate The Season In Elegance': [
        'Kurtis/39.jpg',
        'Kurtis/40.jpg',
    ],
    'Trendy Red Short Kurti': [
        'Kurtis/41.jpg',
        'Kurtis/42.jpg',
        'Kurtis/44.jpg'
    ]

};

// Quick view functionality
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('quick-view')) {
        e.preventDefault();

        if (!quickViewModal) {
            quickViewModal = createQuickViewModal();
        }

        // Get product info from the clicked product card
        const productCard = e.target.closest('.product-card');
        const img = productCard.querySelector('img');
        const title = productCard.querySelector('h3').textContent;
        const price = productCard.querySelector('.price').textContent;

        // Get images for this product
        const images = productImages[title] || [img.src];

        // Populate modal main image
        const mainImg = quickViewModal.querySelector('.main-quick-img');
        mainImg.src = images[0];
        mainImg.setAttribute('data-index', '0');

        // Populate thumbnails
        const thumbsDiv = quickViewModal.querySelector('.quick-thumbnails');
        thumbsDiv.innerHTML = '';
        images.forEach((src, idx) => {
            const thumb = document.createElement('img');
            thumb.src = src;
            thumb.className = 'quick-thumb';
            thumb.style.width = '60px';
            thumb.style.height = '80px';
            thumb.style.objectFit = 'cover';
            thumb.style.margin = '0 6px';
            thumb.style.cursor = 'pointer';
            if (idx === 0) thumb.style.border = '2px solid #ff6b6b';
            thumb.onclick = () => {
                mainImg.src = src;
                mainImg.setAttribute('data-index', idx);
                // Highlight selected
                thumbsDiv.querySelectorAll('img').forEach(t => t.style.border = 'none');
                thumb.style.border = '2px solid #ff6b6b';
            };
            thumbsDiv.appendChild(thumb);
        });

        quickViewModal.querySelector('.product-title').textContent = title;
        quickViewModal.querySelector('.product-price').textContent = price;
        // Show product description if available
        const descEl = quickViewModal.querySelector('.product-desc');
        let desc = '';
        switch (title) {
            case 'Shade of Elegance':
                desc = '✨A swirl of tradition with a shade of elegance 🖤<br>DM to book your festive favourite!!!';
                break;
            case 'Chaniyacholi With Dupatta':
                desc = '✨GlowRatri- Black Chaniyacholi with pink dupatta 🖤<br>DM to book your festive favourite!!!';
                break;
            case 'GlowRatri':
                desc = '“GlowRatri”- Navy blue Navratri lehenga set🌸🪷✨<br>“A perfect blend of tradition and glamour for Garba nights 💃🏻 <br>DM to book your festive favourite!!!';
                break;
            case 'Yellow Chaniyacholi':
                desc = 'Bright yellow chaniyacholi ensemble, lightweight and comfortable for dance nights 💃🏻<br>DM to book your festive favourite!!!';
                break;
            case 'Multicolored Choli':
                desc = '✨Multicolored choli set with playful patterns, perfect for making a statement.<br>DM to book your festive favourite!!!';
                break;
            case 'Purple Lehenga':
                desc = 'Purple Navratri Lehenga set 💜 Perfect blend of tradition and glamour for garba nights 💫.<br>DM to book your festive favourite!!!';
                break;
            case 'Red Short Kurti':
                desc = ' “Desi look with perfect fit”- Red halter neck short kurti ❤️.<br>DM to book your festive favourite!!!';
                break;
            case 'Blue Short Kurti':
                desc = '🌀Perfect mix of tradition and everyday boho vibes-the Boho bandhani blue short kurti.<br>DM to book your festive favourite!!!';
                break;
            case 'Celebrate The Season In Elegance':
                desc = '🦢Seasonal kurti with elegant design, perfect for festive gatherings.<br>DM to book your festive favourite!!!';
                break;
            case 'Trendy Red Short Kurti':
                desc = '✨Festivals are bright when your outfit shines too.<br>DM to book your festive favourite!!!';
                break;
            case 'Coming Soon...':
                desc = 'Stay tuned for our upcoming collection!!!✨';
                break;
            default:
                desc = '';
        }
        if (desc) {
            descEl.innerHTML = desc;
            descEl.style.display = 'block';
        } else {
            descEl.style.display = 'none';
        }

        // Hide Add to Cart button for Coming Soon...
        const addToCartBtn = quickViewModal.querySelector('.add-to-cart-btn');
        if (title.trim().toLowerCase() === 'coming soon...') {
            addToCartBtn.style.display = 'none';
        } else {
            addToCartBtn.style.display = '';
            addToCartBtn.onclick = () => {
                const product = {
                    title: title,
                    price: price,
                    image: images[0]
                };
                addToCart(product);
                closeQuickView();
            };
        }

        // Show modal
        quickViewModal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Close modal functionality
        const closeBtn = quickViewModal.querySelector('.quick-view-close');
        closeBtn.onclick = closeQuickView;

        quickViewModal.onclick = (e) => {
            if (e.target === quickViewModal) {
                closeQuickView();
            }
        };
    }
});

function closeQuickView() {
    if (quickViewModal) {
        quickViewModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header Scroll Effect
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        if (header) header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        if (header) header.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Lazy Loading for Images (if needed for future enhancement)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        }
    });
}, observerOptions);

// Observe all images with data-src attribute
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Category item click functionality
document.addEventListener('click', (e) => {
    const categoryItem = e.target.closest('.category-item');
    if (categoryItem) {
        const categoryName = categoryItem.querySelector('h3').textContent;
        showNotification(`Browsing ${categoryName}... 👗`, 'info');
    }
});

// Account icon click
document.addEventListener('click', (e) => {
    if (e.target.closest('.account')) {
        showNotification('Account features coming soon! 👤', 'info');
    }
});


// Cart Modal
function createCartModal() {
    let modal = document.getElementById('cartModal');
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'cartModal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.5)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '3000';

    let cartHtml = '';
    if (cartItemsArr.length > 0) {
        cartHtml += `<ul style="list-style:none;padding:0;max-height:300px;overflow-y:auto;">`;
        cartItemsArr.forEach(item => {
            cartHtml += `
                <li style="display:flex;align-items:center;gap:16px;margin-bottom:18px;">
                    <img src="${item.image}" alt="${item.title}" style="width:60px;height:80px;object-fit:cover;border-radius:6px;box-shadow:0 2px 8px #0001;">
                    <div>
                        <div style="font-weight:600;font-size:1.1rem;">${item.title}</div>
                        <div style="color:#ff6b6b;font-weight:500;">${item.price}</div>
                    </div>
                </li>
            `;
        });
        cartHtml += `</ul>`;
    } else {
        cartHtml = '<p>Your cart is empty.</p>';
    }

    modal.innerHTML = `
        <div style="background: #fff; border-radius: 12px; min-width: 320px; max-width: 90vw; padding: 32px 24px 24px 24px; box-shadow: 0 8px 32px rgba(0,0,0,0.18); position: relative;">
            <button id="closeCartModal" style="position: absolute; top: 12px; right: 16px; background: none; border: none; font-size: 28px; color: #888; cursor: pointer;">&times;</button>
            <h2 style="margin-bottom: 18px; font-size: 1.5rem; color: #ff6b6b;">Your Cart</h2>
            <div id="cartModalContent" style="font-size: 1.1rem; color: #333;">
                ${cartHtml}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    // Close logic
    modal.querySelector('#closeCartModal').onclick = () => { modal.remove(); document.body.style.overflow = 'auto'; };
    modal.onclick = (e) => { if (e.target === modal) { modal.remove(); document.body.style.overflow = 'auto'; } };
    return modal;
}

document.addEventListener('click', (e) => {
    if (e.target.closest('.cart')) {
        createCartModal();
        document.body.style.overflow = 'hidden';
    }
});

// Add animation styles to document
const animationStyles = `
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .header {
        transition: transform 0.3s ease;
    }

    .quick-view-modal {
        position: fixed;
        z-index: 2000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.6);
        backdrop-filter: blur(2px);
    }
`;

// Add styles to head
const styleElement = document.createElement('style');
styleElement.textContent = animationStyles;
document.head.appendChild(styleElement);

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎉 Shobh website loaded successfully!');

    // Initialize cart count
    updateCartCount();

    // Add loading animation to products
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Add loading animation to categories
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 150);
    });

    // Welcome message
    setTimeout(() => {
        showNotification('Welcome to Shobh by Sejal!✨Discover our latest collection', 'info');
    }, 1500);
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Press 'S' to open search
    if (e.key === 's' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        if (searchToggle) searchToggle.click();
    }

    // Press 'Escape' to close modals
    if (e.key === 'Escape') {
        closeSizeChart();
        closeQuickView();
    }
});

// ===== MOBILE TOUCH COMPATIBILITY ADDITIONS ONLY =====

// Add touch event support to existing mobile menu toggle
if (mobileMenuToggle && nav) {
    // Add touch support to existing click handler
    mobileMenuToggle.addEventListener('touchend', (e) => {
        e.preventDefault();
        // Trigger the existing click functionality
        mobileMenuToggle.click();
    });
}

// Add touch support to existing modal close
if (closeModal) {
    closeModal.addEventListener('touchend', (e) => {
        e.preventDefault();
        closeSizeChart();
    });
}

// Add touch support to search toggle
if (searchToggle) {
    searchToggle.addEventListener('touchend', (e) => {
        e.preventDefault();
        searchToggle.click();
    });
}

// Improve touch experience for mobile gestures
let touchStartY = 0;
document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const touchDiff = touchStartY - touchEndY;

    // Detect swipe gestures for mobile navigation
    if (Math.abs(touchDiff) > 50) {
        // Close mobile menu on swipe up/down when open
        if (nav && nav.classList.contains('active') && Math.abs(touchDiff) > 100) {
            nav.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    }
}, { passive: true });

// Add touch support for all quick-view buttons
document.addEventListener('DOMContentLoaded', function() {
    // Add touch events to any existing quick-view buttons
    const quickViewButtons = document.querySelectorAll('.quick-view');
    quickViewButtons.forEach(button => {
        button.addEventListener('touchend', (e) => {
            e.preventDefault();
            button.click();
        });
    });

    // Add touch events to any existing cart toggles
    const cartToggle = document.querySelector('.cart-toggle');
    if (cartToggle) {
        cartToggle.addEventListener('touchend', (e) => {
            e.preventDefault();
            cartToggle.click();
        });
    }

    // Add touch events to wishlist toggle
    const wishlistToggle = document.querySelector('.wishlist-toggle');
    if (wishlistToggle) {
        wishlistToggle.addEventListener('touchend', (e) => {
            e.preventDefault();
            wishlistToggle.click();
        });
    }
});

// Prevent zoom on double tap for better mobile experience
document.addEventListener('touchend', function(e) {
    const now = (new Date()).getTime();
    if (now - lastTouch <= 300) {
        e.preventDefault();
    }
    lastTouch = now;
}, false);
let lastTouch = 0;

// Add loading states for better mobile feedback
function showMobileLoading() {
    if (typeof showNotification === 'function') {
        showNotification('Loading...', 'info');
    }
}

// Network status awareness for mobile users
if ('navigator' in window && 'onLine' in navigator) {
    window.addEventListener('online', () => {
        if (typeof showNotification === 'function') {
            showNotification('Connection restored', 'success');
        }
    });

    window.addEventListener('offline', () => {
        if (typeof showNotification === 'function') {
            showNotification('No internet connection', 'warning');
        }
    });
}

// Improve form submission for mobile
if (newsletterForm) {
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    if (emailInput) {
        // Better mobile keyboard
        emailInput.setAttribute('autocomplete', 'email');
        emailInput.setAttribute('inputmode', 'email');
    }
}

// Add smooth scrolling for mobile anchor links
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

console.log('Mobile touch compatibility features loaded successfully!');
