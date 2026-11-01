// Industrial Trolley

document.addEventListener("DOMContentLoaded", function () {

  // Get all product cards
  const productCards = document.querySelectorAll(".product-card");

  // Lightbox elements
  const lightbox = document.getElementById("imageLightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxCounter = document.getElementById("lightboxCounter");

  const closeButton = document.getElementById("lightboxClose");
  const prevButton = document.getElementById("lightboxPrev");
  const nextButton = document.getElementById("lightboxNext");

  // Current image index
  let currentIndex = 0;

  let previousFocus = null;

  // Get product details from cards
  const products = Array.from(productCards).map(card => ({
    image: card.dataset.image,
    title: card.dataset.title
  }));


  // Open Lightbox
  function openLightbox(index) {

    currentIndex = index;

    previousFocus = document.activeElement;

    showImage();

    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    closeButton.focus();

  }


  // Show Current Image
  function showImage() {

    const product = products[currentIndex];

    lightboxImage.src = product.image;
    lightboxImage.alt = product.title;

    lightboxTitle.textContent = product.title;

    lightboxCounter.textContent =
      `${currentIndex + 1} / ${products.length}`;

  }


  // Next Image
  function nextImage() {

    currentIndex++;

    if (currentIndex >= products.length) {
      currentIndex = 0;
    }

    showImage();

  }


  // Previous Image
  function prevImage() {

    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = products.length - 1;
    }

    showImage();

  }


  // Close Lightbox
  function closeLightbox() {

    lightbox.classList.remove("active");

    lightbox.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    if (previousFocus) {
      previousFocus.focus();
    }

  }


  // Product card click
  productCards.forEach((card, index) => {

    card.addEventListener("click", function () {

      openLightbox(index);

    });

  });


  // Next button
  nextButton.addEventListener("click", nextImage);


  // Previous button
  prevButton.addEventListener("click", prevImage);


  // Close button
  closeButton.addEventListener("click", closeLightbox);


  // Close on background click
  lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {
      closeLightbox();
    }

  });


  // Keyboard controls
  document.addEventListener("keydown", function (event) {

    if (!lightbox.classList.contains("active")) {
      return;
    }

    if (event.key === "ArrowRight") {
      nextImage();
    }

    if (event.key === "ArrowLeft") {
      prevImage();
    }

    if (event.key === "Escape") {
      closeLightbox();
    }

  });


  // Mobile swipe functionality

  let touchStartX = 0;
  let touchEndX = 0;

  lightbox.addEventListener("touchstart", function (event) {

    touchStartX = event.changedTouches[0].screenX;

  }, { passive: true });


  lightbox.addEventListener("touchend", function (event) {

    touchEndX = event.changedTouches[0].screenX;

    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) < 50) {
      return;
    }

    if (swipeDistance < 0) {
      nextImage();
    } else {
      prevImage();
    }

  }, { passive: true });

});
