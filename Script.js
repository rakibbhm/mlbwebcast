document.addEventListener('DOMContentLoaded', function() {
    flatpickr("#date-display", {
        dateFormat: "d-m-Y",
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



var $imagesCarousel = jQuery('.carouselOfImages').flickity({
    accessibility: false,
    autoPlay: false,
    pauseAutoPlayOnHover: false,
    cellAlign: 'center',
    contain: false,
    draggable: true,
    friction: 0.4,
    initialIndex: 0,
    lazyLoad: false,
    percentPosition: true,
    prevNextButtons: false,
    pageDots: false,
    resize: true,
    rightToLeft: false,
    setGallerySize: true,
    watchCSS: false,
    wrapAround: true,
});

function resizeCells() {
    var flkty = $imagesCarousel.data('flickity');
    var $current = flkty.selectedIndex;
    var $length = flkty.cells.length;
    
    jQuery('.carouselOfImages .carouselImage').removeClass("nextToSelectedLeft nextToSelectedRight nextToSelectedLeft2 nextToSelectedRight2");

    jQuery('.carouselOfImages .carouselImage').eq(($current - 1 + $length) % $length).addClass("nextToSelectedLeft");
    jQuery('.carouselOfImages .carouselImage').eq(($current - 2 + $length) % $length).addClass("nextToSelectedLeft2");

    jQuery('.carouselOfImages .carouselImage').eq(($current + 1) % $length).addClass("nextToSelectedRight");
    jQuery('.carouselOfImages .carouselImage').eq(($current + 2) % $length).addClass("nextToSelectedRight2");
}

resizeCells();

$imagesCarousel.on('select.flickity', function() {
    resizeCells();
});

var autoPlayInterval;
function startAutoPlay(direction, speed) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(function() {
        if (direction === 'left') {
            $imagesCarousel.flickity('previous');
        } else if (direction === 'right') {
            $imagesCarousel.flickity('next');
        }
    }, speed);
}

// HOVER FUNCTIONS
jQuery('.carouselImage').bind("mouseover", function() {
    if (this.className.includes('nextToSelectedLeft')) {
        startAutoPlay('left', 2000); // Slow speed
    } else if (this.className.includes('nextToSelectedLeft2')) {
        startAutoPlay('left', 1000); // Fast speed
    } else if (this.className.includes('nextToSelectedRight')) {
        startAutoPlay('right', 2000); // Slow speed
    } else if (this.className.includes('nextToSelectedRight2')) {
        startAutoPlay('right', 1000); // Fast speed
    }
});

jQuery('.carouselImage').bind("mouseout", function() {
    clearInterval(autoPlayInterval);
});

