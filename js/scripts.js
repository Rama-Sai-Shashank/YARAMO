
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
        if (e.target === orderModal) productModal.style.display = 'none';
    });

    // Razorpay integration
    const razorpayButton = document.createElement('button');
    razorpayButton.id = 'rzp-button';
    razorpayButton.className = 'btn';
    razorpayButton.textContent = 'Pay with Razorpay';
    document.querySelector('#order-modal form').appendChild(razorpayButton);

    razorpayButton.addEventListener('click', function (e) {
        const options = {
            key: 'rzp_test_xxxx12345678', // Replace with your Razorpay Test Key ID
            amount: 50000, // ₹500.00 in paise
            currency: 'INR',
            name: 'YARAMO',
            description: 'Test Transaction',
            image: 'images/logo.png',
            handler: function (response) {
                alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
            },
            prefill: {
                name: document.querySelector('input[name="name"]').value || 'Customer Name',
                email: 'customer@example.com',
                contact: document.querySelector('input[name="mobile"]').value || '9999999999'
            },
            theme: {
                color: '#e74c3c'
            }
        };
        const rzp = new Razorpay(options);
        rzp.open();
        e.preventDefault();
    });
});
