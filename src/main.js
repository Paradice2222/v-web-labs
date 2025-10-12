
const CART_KEY = 'cartItems';
const LIKES_KEY = 'likedItems';

document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    const likedItems = JSON.parse(localStorage.getItem(LIKES_KEY)) || [];

    const cartCount = document.getElementById('cartCount');
    const favoritesCount = document.getElementById('favoritesCount');
    const searchInput = document.getElementById('searchInput');
    const productSections = [document.getElementById('hoodies'), document.getElementById('shorts')];

    function updateCounters() {
        cartCount.textContent = cartItems.length;
        favoritesCount.textContent = likedItems.length;
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        const productId = button.dataset.id;
        if (cartItems.includes(productId)) {
            button.textContent = 'В корзине';
            button.classList.add('added');
        }
    });

    document.querySelectorAll('.like-button').forEach(button => {
        const productId = button.closest('.product-card').dataset.id;
        if (likedItems.includes(productId)) {
            button.classList.add('liked');
        }
    });

    // Корзина
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.id;
            if (button.textContent === 'В корзину') {
                button.textContent = 'В корзине';
                button.classList.add('added');
                cartItems.push(productId);
            } else {
                button.textContent = 'В корзину';
                button.classList.remove('added');
                const index = cartItems.indexOf(productId);
                if (index > -1) cartItems.splice(index, 1);
            }
            localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
            updateCounters();
        });
    });

    // Избранное
    document.querySelectorAll('.like-button').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.closest('.product-card').dataset.id;
            button.classList.toggle('liked');
            const index = likedItems.indexOf(productId);
            if (index === -1) {
                likedItems.push(productId);
            } else {
                likedItems.splice(index, 1);
            }
            localStorage.setItem(LIKES_KEY, JSON.stringify(likedItems));
            updateCounters();
        });
    });

    // Поиск
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        productSections.forEach(section => {
            section.querySelectorAll('.product-card').forEach(card => {
                const title = card.querySelector('.product-title').textContent.toLowerCase();
                if (searchTerm === '' || title.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Кнопка "Домой"
    const homeButton = document.querySelector('.home-button');
    if (homeButton) {
        homeButton.addEventListener('click', () => {
            window.location.reload();
        });
    }

    // Инициализация счетчиков
    updateCounters();
});