document.addEventListener('DOMContentLoaded', function () {
    // Function to get query parameters from URL
    function getQueryParams() {
        const params = {};
        const queryString = window.location.search.substring(1);
        const regex = /([^&=]+)=([^&]*)/g;
        let match;
        while (match = regex.exec(queryString)) {
            params[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
        }
        return params;
    }

    const params = getQueryParams();
    const productId = params['id'];

    // Fetch the product data
    if (productId) {
        fetchProductData(productId).then(product => {
            updateProductDetails(product);
            updateProductGallery(product);
            updateProductTabs(product);

            // Add event listener to "Add to Cart" button
            const addToCartButton = document.getElementById('add-to-cart-btn');
            addToCartButton.addEventListener('click', function() {
                addToCart(product.id, product.name, product.price, product.mainImage);
            });
        });
    } else {
        console.error('Product ID not found in URL');
    }

    // Handle tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');

            // Remove 'active' class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add 'active' class to clicked button and corresponding pane
            button.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });

    // Handle quantity buttons
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    const quantityInput = document.getElementById('product-quantity');

    minusBtn.addEventListener('click', () => updateQuantity(-1));
    plusBtn.addEventListener('click', () => updateQuantity(1));

    function updateQuantity(change) {
        let newValue = parseInt(quantityInput.value) + change;
        if (newValue >= 1 && newValue <= 99) {
            quantityInput.value = newValue;
        }
    }

    // Handle size options
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
        option.addEventListener('click', () => {
            sizeOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
        });
    });
});

function updateProductDetails(product) {
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-title').textContent = product.name;
    document.getElementById('product-price').textContent = `₹${product.price.toFixed(2)}`;
    document.getElementById('product-short-description').textContent = product.shortDescription;
    document.querySelector('.product-sku').textContent = `SKU: ${product.sku}`;
    // Update other product details as needed
}

function updateProductGallery(product) {
    document.getElementById('main-product-image').src = product.mainImage;

    const thumbnailsContainer = document.querySelector('.gallery-thumbnails');
    thumbnailsContainer.innerHTML = ''; // Clear existing thumbnails
    product.images.forEach(image => {
        const img = document.createElement('img');
        img.src = image;
        img.alt = product.name;
        img.addEventListener('click', () => {
            document.getElementById('main-product-image').src = image;
        });
        thumbnailsContainer.appendChild(img);
    });
}

function updateProductTabs(product) {
    document.getElementById('full-description').textContent = product.fullDescription;

    const ingredientsList = document.getElementById('ingredients-list');
    ingredientsList.innerHTML = ''; // Clear existing ingredients
    product.ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
    });

    const usageInstructions = document.getElementById('usage-instructions');
    usageInstructions.innerHTML = ''; // Clear existing instructions
    product.howToUse.forEach(instruction => {
        const li = document.createElement('li');
        li.textContent = instruction;
        usageInstructions.appendChild(li);
    });

    const reviewsList = document.getElementById('reviews-list');
    reviewsList.innerHTML = ''; // Clear existing reviews
    product.reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');
        reviewElement.innerHTML = `
            <h3>${review.author}</h3>
            <p>${review.content}</p>
            <p>Rating: ${review.rating}/5</p>
        `;
        reviewsList.appendChild(reviewElement);
    });
}

// This function should fetch the product data
function fetchProductData(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        return Promise.resolve(product);
    } else {
        return Promise.reject('Product not found');
    }
}
// add more /all products here
const products = [
    {
        id: '1',
        name: 'Tulsi Wheat Grass Body Soap',
        price: 700,
        sku: 'NH001',
        shortDescription: 'A powerful, all-natural cream designed to soothe and heal various skin conditions.',
        fullDescription: 'Our Natural Healing Cream is crafted with care using only the finest organic ingredients. It deeply moisturizes your skin, providing relief from various skin conditions and promoting overall skin health.',
        mainImage: './contents/products/Tulsi-Wheat-Grass-Soap.jpg',
        images: [
            './contents/Shop/Tulsi-Soap1.JPG',
            './contents/Shop/Tulsi-Soap2.JPG',
            './contents/Shop/Tulsi-Soap3.JPG'
        ],
        ingredients: [
            'Organic Aloe Vera',
            'Shea Butter',
            'Coconut Oil',
            'Vitamin E',
            'Lavender Essential Oil'
        ],
        howToUse: [
            'Cleanse the affected area thoroughly',
            'Apply a small amount of cream to the skin',
            'Gently massage until fully absorbed',
            'Use twice daily or as recommended by your healthcare professional'
        ],
        reviews: [
            { author: 'John D.', content: 'Great product! My skin feels amazing.', rating: 5 },
            { author: 'Sarah M.', content: 'I love the natural ingredients. Will buy again.', rating: 4 }
        ]
    },
    {
        id: '2',
        name: 'Wheat Grass Hair Shampoo',
        price: 400,
        sku: 'OF001',
        shortDescription: 'A rejuvenating serum that hydrates and revitalizes your skin.',
        fullDescription: 'Our Organic Face Serum is formulated with natural ingredients to provide deep hydration and rejuvenation. It helps to reduce fine lines and improve skin texture.',
        mainImage: './contents/products/Wheat-Grass-Hair-Shampoo.jpg',
        images: [
            './contents/Shop/Wheat-Shampoo1.JPG',
            './contents/Shop/Wheat-Shampoo2.JPG',
            './contents/Shop/Wheat-Shampoo3.JPG'
        ],
        ingredients: [
            'Hyaluronic Acid',
            'Vitamin C',
            'Green Tea Extract',
            'Jojoba Oil',
            'Rosehip Oil'
        ],
        howToUse: [
            'Cleanse your face thoroughly',
            'Apply a few drops of serum to your face and neck',
            'Gently massage until fully absorbed',
            'Use daily for best results'
        ],
        reviews: [
            { author: 'Emily R.', content: 'My skin feels so hydrated and smooth!', rating: 5 },
            { author: 'Michael B.', content: 'Excellent product, highly recommend.', rating: 4 }
        ]
    },
    {
        id: '3',
        name: 'Avocado WheatGrass FaceWash',
        price: 500,
        sku: 'NH002',
        shortDescription: 'A powerful, all-natural cream designed to soothe and heal various skin conditions.',
        fullDescription: 'Our Natural Healing Cream is crafted with care using only the finest organic ingredients. It deeply moisturizes your skin, providing relief from various skin conditions and promoting overall skin health.',
        mainImage: './contents/products/Avocado-Wheat-Grass-Facewash.jpg',
        images: [
            './contents/Shop/Avocado-Facewash1.JPG',
            './contents/Shop/Avocado-Facewash2.JPG',
            './contents/Shop/Avocado-Facewash3.JPG'
        ],
        ingredients: [
            'Organic Aloe Vera',
            'Shea Butter',
            'Coconut Oil',
            'Vitamin E',
            'Lavender Essential Oil'
        ],
        howToUse: [
            'Cleanse the affected area thoroughly',
            'Apply a small amount of cream to the skin',
            'Gently massage until fully absorbed',
            'Use twice daily or as recommended by your healthcare professional'
        ],
        reviews: [
            { author: 'John D.', content: 'Great product! My skin feels amazing.', rating: 5 },
            { author: 'Sarah M.', content: 'I love the natural ingredients. Will buy again.', rating: 4 }
        ]
    },
    {
        id: '4',
        name: 'Wheat Grass Moisturiser Cream',
        price: 500,
        sku: 'OF002',
        shortDescription: 'A rejuvenating serum that hydrates and revitalizes your skin.',
        fullDescription: 'Our Organic Face Serum is formulated with natural ingredients to provide deep hydration and rejuvenation. It helps to reduce fine lines and improve skin texture.',
        mainImage: './contents/products/Wheat-Grass-Moisturiser.jpg',
        images: [
            './contents/Shop/moisturiser1.JPG',
            './contents/Shop/moisturiser2.JPG',
            './contents/Shop/moisturiser3.JPG'
        ],
        ingredients: [
            'Hyaluronic Acid',
            'Vitamin C',
            'Green Tea Extract',
            'Jojoba Oil',
            'Rosehip Oil'
        ],
        howToUse: [
            'Cleanse your face thoroughly',
            'Apply a few drops of serum to your face and neck',
            'Gently massage until fully absorbed',
            'Use daily for best results'
        ],
        reviews: [
            { author: 'Emily R.', content: 'My skin feels so hydrated and smooth!', rating: 5 },
            { author: 'Michael B.', content: 'Excellent product, highly recommend.', rating: 4 }
        ]
    },
    {
        id: '5',
        name: 'Papaya Body Soap',
        price: 500,
        sku: 'NH003',
        shortDescription: 'A powerful, all-natural cream designed to soothe and heal various skin conditions.',
        fullDescription: 'Our Natural Healing Cream is crafted with care using only the finest organic ingredients. It deeply moisturizes your skin, providing relief from various skin conditions and promoting overall skin health.',
        mainImage: './contents/products/Papaya-Soap.jpg',
        images: [
            './contents/Shop/papaya-soap1.JPG',
            './contents/Shop/papaya-soap2.JPG',
            './contents/Shop/papaya-soap3.JPG'
        ],
        ingredients: [
            'Organic Aloe Vera',
            'Shea Butter',
            'Coconut Oil',
            'Vitamin E',
            'Lavender Essential Oil'
        ],
        howToUse: [
            'Cleanse the affected area thoroughly',
            'Apply a small amount of cream to the skin',
            'Gently massage until fully absorbed',
            'Use twice daily or as recommended by your healthcare professional'
        ],
        reviews: [
            { author: 'John D.', content: 'Great product! My skin feels amazing.', rating: 5 },
            { author: 'Sarah M.', content: 'I love the natural ingredients. Will buy again.', rating: 4 }
        ]
    },
    {
        id: '6',
        name: 'Wheat Grass Powder',
        price: 600,
        sku: 'OF003',
        shortDescription: 'A rejuvenating serum that hydrates and revitalizes your skin.',
        fullDescription: 'Our Organic Face Serum is formulated with natural ingredients to provide deep hydration and rejuvenation. It helps to reduce fine lines and improve skin texture.',
        mainImage: './contents/products/Wheat-Grass-Powder.jpg',
        images: [
            './contents/Shop/wheat-powder1.JPG',
            './contents/Shop/wheat-powder2.JPG',
            './contents/Shop/wheat-powder3.JPG'
        ],
        ingredients: [
            'Hyaluronic Acid',
            'Vitamin C',
            'Green Tea Extract',
            'Jojoba Oil',
            'Rosehip Oil'
        ],
        howToUse: [
            'Cleanse your face thoroughly',
            'Apply a few drops of serum to your face and neck',
            'Gently massage until fully absorbed',
            'Use daily for best results'
        ],
        reviews: [
            { author: 'Emily R.', content: 'My skin feels so hydrated and smooth!', rating: 5 },
            { author: 'Michael B.', content: 'Excellent product, highly recommend.', rating: 4 }
        ]
    },
    
    {
        id: '7',
        name: 'Wheat Grass Soap',
        price: 700,
        sku: 'OF004',
        shortDescription: 'A rejuvenating serum that hydrates and revitalizes your skin.',
        fullDescription: 'Our Organic Face Serum is formulated with natural ingredients to provide deep hydration and rejuvenation. It helps to reduce fine lines and improve skin texture.',
        mainImage: './contents/products/Wheat-Grass-Soap.jpg',
        images: [
            './contents/Shop/wheat-soap1.JPG',
            './contents/Shop/wheat-soap2.JPG',
            './contents/Shop/wheat-soap3.JPG'
        ],
        ingredients: [
            'Hyaluronic Acid',
            'Vitamin C',
            'Green Tea Extract',
            'Jojoba Oil',
            'Rosehip Oil'
        ],
        howToUse: [
            'Cleanse your face thoroughly',
            'Apply a few drops of serum to your face and neck',
            'Gently massage until fully absorbed',
            'Use daily for best results'
        ],
        reviews: [
            { author: 'Emily R.', content: 'My skin feels so hydrated and smooth!', rating: 5 },
            { author: 'Michael B.', content: 'Excellent product, highly recommend.', rating: 4 }
        ]
    },
    {
        id: '8',
        name: 'Total Skin Combo',
        price: 2200,
        sku: 'NH005',
        shortDescription: 'A powerful, all-natural cream designed to soothe and heal various skin conditions.',
        fullDescription: 'Our Natural Healing Cream is crafted with care using only the finest organic ingredients. It deeply moisturizes your skin, providing relief from various skin conditions and promoting overall skin health.',
        mainImage: './contents/products/Total-Skin-Combo.jpg',
        images: [
            './contents/Shop/Total-Skin-Combo1.JPG',
            './contents/Shop/Total-Skin-Combo1.JPG',
            './contents/Shop/Total-Skin-Combo1.JPG'
        ],
        ingredients: [
            'Organic Aloe Vera',
            'Shea Butter',
            'Coconut Oil',
            'Vitamin E',
            'Lavender Essential Oil'
        ],
        howToUse: [
            'Cleanse the affected area thoroughly',
            'Apply a small amount of cream to the skin',
            'Gently massage until fully absorbed',
            'Use twice daily or as recommended by your healthcare professional'
        ],
        reviews: [
            { author: 'John D.', content: 'Great product! My skin feels amazing.', rating: 5 },
            { author: 'Sarah M.', content: 'I love the natural ingredients. Will buy again.', rating: 4 }
        ]
    },
    {
        id: '9',
        name: 'All In One Combo',
        price: 2700,
        sku: 'OF005',
        shortDescription: 'A rejuvenating serum that hydrates and revitalizes your skin.',
        fullDescription: 'Our Organic Face Serum is formulated with natural ingredients to provide deep hydration and rejuvenation. It helps to reduce fine lines and improve skin texture.',
        mainImage: './contents/products/All-In-One-Combo.jpg',
        images: [
            './contents/Shop/All-In-One-Combo1.JPG',
            './contents/Shop/All-In-One-Combo1.JPG',
            './contents/Shop/All-In-One-Combo1.JPG'
        ],
        ingredients: [
            'Hyaluronic Acid',
            'Vitamin C',
            'Green Tea Extract',
            'Jojoba Oil',
            'Rosehip Oil'
        ],
        howToUse: [
            'Cleanse your face thoroughly',
            'Apply a few drops of serum to your face and neck',
            'Gently massage until fully absorbed',
            'Use daily for best results'
        ],
        reviews: [
            { author: 'Emily R.', content: 'My skin feels so hydrated and smooth!', rating: 5 },
            { author: 'Michael B.', content: 'Excellent product, highly recommend.', rating: 4 }
        ]
    },
    {
        id: '10',
        name: 'DarkSpot / Pigmentation Combo',
        price: 1800,
        sku: 'NH006',
        shortDescription: 'A powerful, all-natural cream designed to soothe and heal various skin conditions.',
        fullDescription: 'Our Natural Healing Cream is crafted with care using only the finest organic ingredients. It deeply moisturizes your skin, providing relief from various skin conditions and promoting overall skin health.',
        mainImage: './contents/products/Darkspots-Combo.jpg',
        images: [
            './contents/Shop/Darkspots-Combo1.JPG',
            './contents/Shop/Darkspots-Combo1.JPG',
            './contents/Shop/Darkspots-Combo1.JPG'
        ],
        ingredients: [
            'Organic Aloe Vera',
            'Shea Butter',
            'Coconut Oil',
            'Vitamin E',
            'Lavender Essential Oil'
        ],
        howToUse: [
            'Cleanse the affected area thoroughly',
            'Apply a small amount of cream to the skin',
            'Gently massage until fully absorbed',
            'Use twice daily or as recommended by your healthcare professional'
        ],
        reviews: [
            { author: 'John D.', content: 'Great product! My skin feels amazing.', rating: 5 },
            { author: 'Sarah M.', content: 'I love the natural ingredients. Will buy again.', rating: 4 }
        ]
    }
    
];
