// Carousel functionality for both carousels
function setupCarousel(carouselSelector, dotSelector, prevSelector, nextSelector, section) {
  const carouselInner = document.querySelector(carouselSelector);
  const items = carouselInner.querySelectorAll('.carousel-item');
  let dots;
  const prevBtn = document.querySelector(prevSelector);
  const nextBtn = document.querySelector(nextSelector);

  let currentIndex = 0;
  const totalItems = items.length;

  function goToSlide(index) {
    document.querySelector(`.indicators-${section}`).innerHTML = 
    window.innerWidth > 1200 ? 
    `
      <span class="${section}-dot dot active" data-index="0"></span>
      <span class="${section}-dot dot" data-index="1"></span>
      <span class="${section}-dot dot" data-index="2"></span>
    ` :
    `
      <span class="${section}-dot dot active" data-index="0"></span>
      <span class="${section}-dot dot" data-index="1"></span>
      <span class="${section}-dot dot" data-index="2"></span>
      <span class="${section}-dot dot" data-index="3"></span>
      <span class="${section}-dot dot" data-index="4"></span>
      <span class="${section}-dot dot" data-index="5"></span>
    `
    ;
    currentIndex = (index + totalItems) % totalItems; // Circular indexing
    carouselInner.style.transform = `translateX(-${window.innerWidth > 1200 ? currentIndex * 50: currentIndex * 100}%)`;

    // Update active dot
    dots = document.querySelectorAll(dotSelector);
    addDotListener(dots);
    dots.forEach(dot => dot.classList.remove('active'));
    dots[window.innerWidth > 1200 ? currentIndex/2 : currentIndex].classList.add('active');
  }

  function nextSlide() {
    goToSlide(window.innerWidth > 1200 ? currentIndex + 2 : currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(window.innerWidth > 1200 ? currentIndex - 2 : currentIndex - 1);
  }

  function startAutoSlide() {
    return setInterval(nextSlide, 3000); // Auto slide every 3 seconds
  }

  let autoSlideInterval = startAutoSlide();

  if(nextBtn){
    nextBtn.addEventListener('click', () => {
      clearInterval(autoSlideInterval);
      nextSlide();
      autoSlideInterval = startAutoSlide();
    });
  }
  if(prevBtn){
    prevBtn.addEventListener('click', () => {
      clearInterval(autoSlideInterval);
      prevSlide();
      autoSlideInterval = startAutoSlide();
    });
  }
  
  function addDotListener(dots){
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        goToSlide(index);
        autoSlideInterval = startAutoSlide();
      });
    });
  }

  goToSlide(currentIndex);
}

// Set up both carousels
setupCarousel('.carousel-cv', '.cv-dot', '.carousel-cv .prev-btn', '.carousel-cv .next-btn', 'cv');
setupCarousel('.carousel-wcu', '.wcu-dot', '.carousel-wcu .prev-btn', '.carousel-wcu .next-btn', 'wcu');
