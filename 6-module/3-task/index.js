import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    let elemInnerHtml = ''

    this.slides.forEach(slide => {
      elemInnerHtml += `
         <div class="carousel__slide" data-id="${slide.id}">
           <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
           <div class="carousel__caption">
             <span class="carousel__price">€${slide.price.toFixed(2)}</span>
             <div class="carousel__title">${slide.name}</div>
             <button type="button" class="carousel__button">
               <img src="/assets/images/icons/plus-icon.svg" alt="icon">
             </button>
           </div>
         </div>
      `});

    this.elem = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
          ${elemInnerHtml}
        </div>
      </div>
    `);

    const carouselSlide = this.elem.querySelectorAll(".carousel__slide");

    this.slides.forEach( (slide, i) => {
      const button = carouselSlide[i].querySelector(".carousel__button");

      button.addEventListener("click", () => {
        let event = new CustomEvent("product-add", {
          detail: slide.id,
          bubbles: true
        })

        this.elem.dispatchEvent(event);
      })
    })

    this.buttonLeft = this.elem.querySelector(".carousel__arrow_left");
    this.buttonRight = this.elem.querySelector(".carousel__arrow_right");
    this.carouselPosition = 0

    this.buttonLeft.style.display = "none"

    this.buttonRight.addEventListener("click", () =>{this.carouselDirection("right")})
    this.buttonLeft.addEventListener("click", () => { this.carouselDirection("left")})
  
  }

  carouselDirection (direction) {
  const carousel = this.elem.querySelector(".carousel__inner");
  const width = carousel.offsetWidth;
    if (direction == 'left') {
      this.buttonRight.style.display = ""
      this.carouselPosition -=1
      carousel.style.transform = `translateX(-${width*this.carouselPosition}px)`;
      if (this.carouselPosition == 1) this.buttonLeft.style.display = "none"
    } 
    else {
      this.buttonLeft.style.display = ""
      this.carouselPosition +=1
      carousel.style.transform = `translateX(-${width*this.carouselPosition}px)`;
      if (!this.carouselPosition < this.slides.length) this.buttonRight.style.display = "none"
    }
  }
}
