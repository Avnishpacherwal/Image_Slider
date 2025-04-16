var nextBtn = document.querySelector('.next'), // "Next" button
    prevBtn = document.querySelector('.prev'), // "Previous" button
    carousel = document.querySelector('.carousel'), // Carousel container
    list = document.querySelector('.list'), // All carousel items
    runningTime = document.querySelector('.timeRunning'); // Time progress bar

let timeRunning = 3000; // How long the slide animation effect lasts
let timeAutoNext = 5000; // Automatically switching to next slide

// Add click event listeners to all navigation links inside the header
document.querySelectorAll('header nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent the default link behavior

        // Remove 'home-active' class from all links to reset the active state
        document.querySelectorAll('header nav a').forEach(a => {
            a.classList.remove('home-active');
        });

        // Add 'home-active' class to the clicked link to mark it as active
        e.target.classList.add('home-active');
    });
});

nextBtn.onclick = function() {
    showSlider('next'); // Move to next slide on click
}

prevBtn.onclick = function() {
    showSlider('prev'); // Move to previous slide on click
}

// Auto-switch setup

let runTimeOut; // Timeout to remove animation class
let runNextAuto = setTimeout(() => {
    nextBtn.click(); // Automatically trigger next button click
}, timeAutoNext);

// Function to reset progress bar animation

function resetTimeAnimation() {
    runningTime.style.animation = 'none'; // Remove current animation
    runningTime.offsetHeight; // Trigger reflow
    runningTime.style.animation = 'runningTime 5s linear 1 forwards'; // Restart animation
}

// Function to switch slides

function showSlider(type) {
    let sliderItems = list.querySelectorAll('.item');
    if (type === 'next') {
        list.appendChild(sliderItems[0]); // Move first item to the end
    } else {
        list.prepend(sliderItems[sliderItems.length - 1]);
    }
    
    // Clear any previous timeout for animation cleanup

    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carousel.classList.remove('next', 'prev');
    }, timeRunning);

    // Restart auto-next timer
    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        nextBtn.click(); // Auto trigger next again
    }, timeAutoNext);
    resetTimeAnimation(); // Restart the progress bar animation
}

// Start initial progress bar animation on load

resetTimeAnimation();