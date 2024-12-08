document.addEventListener('DOMContentLoaded', function () {
    // Carousel Class to handle each carousel instance
    class Carousel {
        constructor(carouselElement) {
            this.carousel = carouselElement;
            this.interval = parseInt(this.carousel.getAttribute('data-interval')) || 4000; // Default to 4000ms
            this.currentSlide = 0;
            this.slides = this.carousel.querySelectorAll('.u-carousel-inner .u-carousel-item');
            this.totalSlides = this.slides.length;
            this.indicators = this.carousel.querySelectorAll('.u-carousel-indicators li');
            this.prevButton = this.carousel.querySelector('[data-u-slide="prev"]');
            this.nextButton = this.carousel.querySelector('[data-u-slide="next"]');
            this.timer = null;

            this.init();
        }

        init() {
            // Show the first slide
            this.showSlide(this.currentSlide);

            // Start automatic sliding
            this.startAutoSlide();

            // Event listeners for navigation buttons
            if (this.prevButton) {
                this.prevButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.prevSlide();
                    this.resetAutoSlide();
                });
            }

            if (this.nextButton) {
                this.nextButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.nextSlide();
                    this.resetAutoSlide();
                });
            }

            // Event listeners for indicators
            this.indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showSlide(index);
                    this.resetAutoSlide();
                });
            });

            // Optional: Pause on mouse hover
            this.carousel.addEventListener('mouseenter', () => {
                this.stopAutoSlide();
            });

            this.carousel.addEventListener('mouseleave', () => {
                this.startAutoSlide();
            });
        }

        showSlide(index) {
            // Handle out-of-range indices
            if (index >= this.totalSlides) {
                this.currentSlide = 0;
            } else if (index < 0) {
                this.currentSlide = this.totalSlides - 1;
            } else {
                this.currentSlide = index;
            }

            // Hide all slides and remove active class from indicators
            this.slides.forEach(slide => {
                slide.classList.remove('u-active');
            });

            this.indicators.forEach(indicator => {
                indicator.classList.remove('u-active');
            });

            // Show the active slide and activate the corresponding indicator
            this.slides[this.currentSlide].classList.add('u-active');
            if (this.indicators[this.currentSlide]) {
                this.indicators[this.currentSlide].classList.add('u-active');
            }
        }

        nextSlide() {
            this.showSlide(this.currentSlide + 1);
        }

        prevSlide() {
            this.showSlide(this.currentSlide - 1);
        }

        startAutoSlide() {
            this.timer = setInterval(() => {
                this.nextSlide();
            }, this.interval);
        }

        stopAutoSlide() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        }

        resetAutoSlide() {
            this.stopAutoSlide();
            this.startAutoSlide();
        }
    }

    // Initialize all carousels on the page
    const carousels = document.querySelectorAll('.u-carousel');
    carousels.forEach(carouselElement => {
        new Carousel(carouselElement);
    });
});