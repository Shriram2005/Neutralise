function goToNextStep(step) {
    console.log(`Navigating to step: ${step}`);
    document.querySelectorAll('.form-section').forEach((el) => el.classList.add('hidden'));
    document.getElementById(`step-${step}`).classList.remove('hidden');
    updatePageNumber(step);
}

function goToPreviousStep(step) {
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
        <img src="image1.jpg" alt="${type} Image 1" style="width: 100%; height: auto;">
        <img src="image2.jpg" alt="${type} Image 2" style="width: 100%; height: auto;">
        <img src="image3.jpg" alt="${type} Image 3" style="width: 100%; height: auto;">
        <img src="image4.jpg" alt="${type} Image 4" style="width: 100%; height: auto;">
        <img src="image5.jpg" alt="${type} Image 5" style="width: 100%; height: auto;">
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