

document.addEventListener('DOMContentLoaded', function() {
    flatpickr("#date-display", {
        dateFormat: "Y-m-d",
        onChange: function(selectedDates, dateStr, instance) {
            document.getElementById('date-display').textContent = dateStr;
        }
    });
});

function showTab(tabId, element) {
    // Hide all tab contents
    var tabContents = document.getElementsByClassName('tab-content');
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }

    // Remove active class from all tab buttons
    var tabButtons = document.getElementsByClassName('tab-button');
    for (var i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }

    // Show the selected tab content and add active class to the button
    document.getElementById(tabId).classList.add('active');
    element.classList.add('active');
}

//Slider carusaoul Content

function changeDate(delta) {
    var dateDisplay = document.getElementById('date-display');
    var currentDate = new Date(dateDisplay.textContent);
    currentDate.setDate(currentDate.getDate() + delta);
    dateDisplay.textContent = currentDate.toISOString().split('T')[0];
}

function showDatePicker() {
    document.getElementById('date-display')._flatpickr.open();
}

// const prevButton = document.querySelector('.carousel-control-prev');
// const nextButton = document.querySelector('.carousel-control-next');
// const carouselInner = document.querySelector('.carousel-inner');
// const carouselItems = document.querySelectorAll('.carousel-item');

// let currentIndex = 0;

// function updateCarousel() {
//     const offset = -currentIndex * 100;
//     carouselInner.style.transform = `translateX(${offset}%)`;
// }

// prevButton.addEventListener('click', (event) => {
//     event.preventDefault();
//     currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
//     updateCarousel();
// });

// nextButton.addEventListener('click', (event) => {
//     event.preventDefault();
//     currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
//     updateCarousel();
// });

document.addEventListener('DOMContentLoaded', function() {
    const prevButton = document.querySelector('.carousel-control-prev');
    const nextButton = document.querySelector('.carousel-control-next');
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselItems = document.querySelectorAll('.carousel-item');

    if (!prevButton || !nextButton || !carouselInner || carouselItems.length === 0) {
        console.error('Carousel elements not found');
        return;
    }

    let currentIndex = 0;
    const totalItems = carouselItems.length;
    const slideInterval = 3000; // Slide every 3 seconds

    function updateCarousel() {
        carouselItems.forEach((item, index) => {
            item.classList.remove('prev', 'active', 'next');
            if (index === currentIndex) {
                item.classList.add('active');
            } else if (index === (currentIndex - 1 + totalItems) % totalItems) {
                item.classList.add('prev');
            } else if (index === (currentIndex + 1) % totalItems) {
                item.classList.add('next');
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex < totalItems - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalItems - 1;
        updateCarousel();
    }

    prevButton.addEventListener('click', (event) => {
        event.preventDefault();
        prevSlide();
    });

    nextButton.addEventListener('click', (event) => {
        event.preventDefault();
        nextSlide();
    });

    setInterval(nextSlide, slideInterval);

    updateCarousel(); // Initial update
});

