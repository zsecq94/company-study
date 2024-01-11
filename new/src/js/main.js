$(document).ready(() => {
  // $(".slide:gt(0)").hide();
  const $timeSpan = $(".slide-con > .slide-bot-box > .timer-box > .cur");
  const $timerLine = $(".slide-con > .slide-bot-box > .timer-box > .timer-line > .time");
  const $prevBtn = $(".slide-con > .slide-bot-box > .nav-box > .prev");
  const $nextBtn = $(".slide-con > .slide-bot-box > .nav-box > .next");

  let timeLineWidth = 0;
  let currentPage = 1;

  const currentTime = () => {
    timeLineWidth += 0.175;
    if (timeLineWidth > 100) {
      timeLineWidth = 100;
    }
    $timerLine.css({
      width: timeLineWidth + "%",
    });
  };

  $timeSpan.html(`0${currentPage}`);

  const nextSlide = () => {
    currentPage = currentPage === 5 ? 1 : (currentPage += 1);
    $timeSpan.html(`0${currentPage}`);
    timeLineWidth = 0;
    $(".slide:first").fadeOut(1000).next().fadeIn(100).end().appendTo(".slides");
  };

  const prevSlide = () => {
    currentPage = currentPage === 1 ? 5 : (currentPage -= 1);
    $timeSpan.html(`0${currentPage}`);
    let current = $(".slide:visible");
    let last = $(".slide:last");

    current.fadeOut(1000);
    last.hide().prependTo(".slides").fadeIn(100);
  };

  $prevBtn.click(() => {
    clearInterval(interval);
    prevSlide();
    timeLineWidth = 0;
    interval = setInterval(nextSlide, 6000);
  });

  $nextBtn.click(() => {
    clearInterval(interval);
    nextSlide();
    timeLineWidth = 0;
    interval = setInterval(nextSlide, 6000);
  });

  setInterval(currentTime, 10);
  let interval = setInterval(nextSlide, 6000);
});
