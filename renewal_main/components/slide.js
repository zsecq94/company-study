$(document).ready(() => {
  const totalSeconds = 6;
  let remainingSeconds = totalSeconds;
  let timeLinearWidth = 0;
  let slidePage = 1;

  const updateSlideStart = () => {
    $(".slide-number-text").html(`<span>0${slidePage}</span>`);
  };

  const updateProgressBar = () => {
    if (timeLinearWidth >= 100) {
      timeLinearWidth = 100;
    } else {
      timeLinearWidth += 0.207;
    }
    $(".timebar").css("width", timeLinearWidth + "%");
  };

  const slideTransition = () => {
    $(".slider:first").fadeOut(1000).next().fadeIn(100).end().appendTo(".slide");
  };

  const resetValues = () => {
    timeLinearWidth = 0;
    remainingSeconds = totalSeconds;
    $(".timebar").css("width", "0%");
  };

  const slideInterval = () => {
    remainingSeconds--;
    if (remainingSeconds < 0) {
      slidePage = slidePage < 5 ? slidePage + 1 : 1;
      updateSlideStart();
      resetValues();
      slideTransition();
    }
  };

  let timeLinearInterval = setInterval(updateProgressBar, 14);
  let sliderInterval = setInterval(slideInterval, 1000);

  $(".slider:gt(0)").hide();
  updateSlideStart();

  const prevSlide = () => {
    let current = $(".slider:visible");
    let last = $(".slider:last");

    current.fadeOut(1000);
    last.hide().prependTo(".slide").fadeIn(100);
    if (slidePage <= 1) {
      slidePage = 5;
    } else {
      slidePage--;
    }

    updateSlideStart();
    timeLinearWidth = 0;
    remainingSeconds = totalSeconds;
    clearInterval(sliderInterval);
    clearInterval(timeLinearInterval);
    sliderInterval = setInterval(slideInterval, 1000);
    timeLinearInterval = setInterval(updateProgressBar, 14);
  };

  const nextSlide = () => {
    slideTransition();
    if (slidePage >= 5) {
      slidePage = 1;
    } else {
      slidePage++;
    }
    updateSlideStart();
    timeLinearWidth = 0;
    remainingSeconds = totalSeconds;
    clearInterval(sliderInterval);
    clearInterval(timeLinearInterval);
    sliderInterval = setInterval(slideInterval, 1000);
    timeLinearInterval = setInterval(updateProgressBar, 14);
  };

  $(".prev").click(prevSlide);
  $(".next").click(nextSlide);
});
