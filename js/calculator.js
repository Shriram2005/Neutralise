function goToNextStep(step) {
    console.log(`Navigating to step: ${step}`);
    document.querySelectorAll('.form-section').forEach((el) => el.classList.add('hidden'));
    const stepElement = document.getElementById(`step-${step}`);
    console.log(stepElement); // Log the step element
    if (stepElement) {
        stepElement.classList.remove('hidden');
        updatePageNumber(step);
    } else {
        console.error(`Step ${step} not found`);
    }
}

function goToPreviousStep(step) {
    console.log(`Going back to step: ${step}`);
    document.querySelectorAll('.form-section').forEach((el) => el.classList.add('hidden'));
    document.getElementById(`step-${step}`).classList.remove('hidden');
    updatePageNumber(step);
}

function updatePageNumber(step) {
    document.getElementById('page-number').innerText = `Page ${step} of 3`;
}

// Initialize the first step
document.addEventListener('DOMContentLoaded', () => {
    goToNextStep(1); // Ensure this starts at step 1
});

function showModal(type) {
    const modalTitle = document.getElementById('modal-title');
    const modalImages = document.getElementById('modal-images');

    modalTitle.innerText = `${type} Images`;
    modalImages.innerHTML = `
        <img src="/contents/calculator/1000000686.jpg" alt="${type} Image 1" style="width: 100%; height: auto;">
        <img src="/contents/calculator/1000000686.jpg" alt="${type} Image 2" style="width: 100%; height: auto;">
        <img src="/contents/calculator/1000000686.jpg" alt="${type} Image 3" style="width: 100%; height: auto;">
        <img src="/contents/calculator/1000000686.jpg" alt="${type} Image 4" style="width: 100%; height: auto;">
    `;

    document.getElementById('modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}

// Ensure the modal is hidden on page load
document.addEventListener('DOMContentLoaded', () => {
    closeModal();
});

function generateRandomPercentage() {
    // Generate a random percentage between 10 and 100
    const randomPercentage = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
    
    // Display the random percentage in the text area
    document.getElementById('random-percentage').value = `${randomPercentage}%`;
    
    // Optionally, you can also show a modal with different images based on the context
    showModal('Random Percentage', randomPercentage);
}

function showModal(type, percentage) {
    const modalTitle = document.getElementById('modal-title');
    const modalImages = document.getElementById('modal-images');

    modalTitle.innerText = `${type} Images`;
    
    // Change images based on the percentage or type
    modalImages.innerHTML = `
        <img src="/contents/calculator/image1.jpg" alt="${type} Image 1" style="width: 100%; height: auto;">
        <img src="/contents/calculator/image2.jpg" alt="${type} Image 2" style="width: 100%; height: auto;">
        <img src="/contents/calculator/image3.jpg" alt="${type} Image 3" style="width: 100%; height: auto;">
        <img src="/contents/calculator/image4.jpg" alt="${type} Image 4" style="width: 100%; height: auto;">
    `;

    document.getElementById('modal').classList.remove('hidden');
}