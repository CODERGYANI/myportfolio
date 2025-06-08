document.addEventListener('DOMContentLoaded', () => {
  const points = document.querySelectorAll('.timeline-point');
  const cards = document.querySelectorAll('.education-card');


console.log('Found points:', points.length);
console.log('Found cards:', cards.length);

  let currentIndex = 0;
  const slideInterval = 4000; // time in ms between slides (4 seconds)

  function showSlide(index) {
    points.forEach(p => p.classList.remove('active'));
    cards.forEach(c => c.classList.remove('active'));

    points[index].classList.add('active');
    cards[index].classList.add('active');
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % points.length;
    showSlide(currentIndex);
  }

  // Initialize first slide
  showSlide(currentIndex);

  // Auto-slide every 4 seconds
  setInterval(nextSlide, slideInterval);

  // Optional: add click event on points to manually jump to that slide
  points.forEach((point, idx) => {
    point.addEventListener('click', () => {
      currentIndex = idx;
      showSlide(currentIndex);
    });
  });


});
