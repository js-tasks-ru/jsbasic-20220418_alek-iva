import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    let spans = ''
    this.value = value
    this.steps = steps
    
    for (let i = 0; i < steps; i++) {
      spans += '<span></span>'
    }

    this.elem = createElement(`
          <div class="slider">
          <div class="slider__thumb">
            <span class="slider__value">0</span>
          </div>
          <div class="slider__progress"></div>
          <div class="slider__steps">${spans}
          </div>
          </div>
    `)
    
    this.thumb = this.elem.querySelector('.slider__thumb');
    this.progress = this.elem.querySelector('.slider__progress');


    this.elem.addEventListener('click',(e) => {
      let sliderPosition = (e.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;
      let value = Math.round(sliderPosition * (steps - 1));
      this.value = value;
      this.elem.querySelector('.slider__value').textContent = this.value;
      this.setActiveStep();
    })

    this.thumb.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      this.elem.classList.add('slider_dragging')
      
      document.addEventListener('pointermove', this.moveThumb)
      document.addEventListener('pointerup', this.stopMove)
    })
  
    this.setActiveStep();

  }

  setActiveStep = () => {
    let activeStep = this.elem.querySelector('.slider__step-active');
    
    if (activeStep !== null) {
      activeStep.classList.remove('slider__step-active');
    }
    this.elem.querySelector('.slider__steps').children[this.value].classList.add('slider__step-active');

    this.thumb.style.left = `${(this.value/(this.steps-1))*100}%`;
    this.progress.style.width = `${(this.value/(this.steps-1))*100}%`;
    
    let click = new CustomEvent("slider-change", {
      detail: this.value,
      bubbles: true
    });
    this.elem.dispatchEvent(click);
  }

  moveThumb = (e) => { 
    e.preventDefault();
      let sliderPosition = (e.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;
      let resultPercent;
      
      if (sliderPosition < 0) resultPercent = 0;
      else if (sliderPosition > 1) resultPercent = 1;
      else resultPercent = sliderPosition 
      
      this.thumb.style.left = `${resultPercent * 100}%`;
      this.progress.style.width = `${resultPercent * 100}%`;

      let value = Math.round(resultPercent * (this.steps - 1));
      this.value = value;
      this.elem.querySelector('.slider__value').textContent = this.value;
  }

  stopMove = () => {
    this.setActiveStep();
    this.elem.classList.remove('slider_dragging');
    document.removeEventListener('pointermove', this.moveThumb);
    document.removeEventListener('pointerup', this.stopMove);
  }
}
