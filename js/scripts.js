// js/scripts.js
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({ duration: 800, once: true });

    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Modal Handling
    const productModal = document.getElementById('product-modal');
    const orderModal = document.getElementById('order-modal');
    const closes = document.querySelectorAll('.close');

    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.product + '-details';
            document.querySelectorAll('.product-details').forEach(detail => {
                detail.style.display = detail.id === productId ? 'flex' : 'none';
            });
            productModal.style.display = 'flex';
        });
    });

    document.querySelectorAll('.order-now').forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.dataset.product;
            const size = button.parentElement.querySelector('input[name="size"]:checked').value;
            document.getElementById('form-product').value = productName;
            document.querySelector('#order-modal select[name="size"]').value = size;
            productModal.style.display = 'none';
            orderModal.style.display = 'flex';
        });
    });

    closes.forEach(close => {
        close.addEventListener('click', () => {
            productModal.style.display = 'none';
            orderModal.style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === productModal) productModal.style.display = 'none';
        if (e.target === orderModal) orderModal.style.display = 'none';
    });
});