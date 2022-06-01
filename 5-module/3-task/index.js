function initCarousel() {
  const buttonLeft = document.querySelector(".carousel__arrow_left");
  const buttonRight = document.querySelector(".carousel__arrow_right");
  const carousel = document.querySelector(".carousel__inner");
  const width = carousel.offsetWidth;
  let carouselPosition = 0

  buttonLeft.style.display = "none"

  function carouselDirection (direction) {
    if (direction == 'left') {
      buttonRight.style.display = ""
      carouselPosition -=1
      carousel.style.transform = `translateX(-${width*carouselPosition}px)`;
      if (carouselPosition == 0) buttonLeft.style.display = "none"
    } 
    else {
      buttonLeft.style.display = ""
      carouselPosition +=1
      carousel.style.transform = `translateX(-${width*carouselPosition}px)`;
      if (carouselPosition == 3) buttonRight.style.display = "none"
    }
  }

  buttonRight.addEventListener("click", function(){carouselDirection("right")})
  buttonLeft.addEventListener("click", function(){carouselDirection("left")})
  
}
