$(document).ready(() => {
  // 슬라이더 영역
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

  // content 영역 //
  const contents = [
    {
      $prevBtn: $(".content1-con > .title-box > .nav-box > .prev"),
      $nextBtn: $(".content1-con > .title-box > .nav-box > .next"),
      $contentCon: $(".content1-con > .hidden > .card-con"),
      translate: 16.9,
      translateXs: 0,
      translateIdx: 0,
    },
    {
      $prevBtn: $(".content2-con > .title-box > .nav-box > .prev"),
      $nextBtn: $(".content2-con > .title-box > .nav-box > .next"),
      $contentCon: $(".content2-con > .hidden > .card-con"),
      translate: 20.3,
      translateXs: 0,
      translateIdx: 0,
    },
    {
      $prevBtn: $(".content4-con > .title-box > .nav-box > .prev"),
      $nextBtn: $(".content4-con > .title-box > .nav-box > .next"),
      $contentCon: $(".content4-con > .hidden > .card-con"),
      translate: 16.9,
      translateXs: 0,
      translateIdx: 0,
    },
  ];

  contents.forEach((content, index) => {
    let isDragging = false;
    let startX = 0;
    let initialTranslateXs = 0;

    const contentBtnStyleUpdate = () => {
      if (content.translateIdx <= 0) {
        content.$prevBtn.addClass("disabled");
      } else if (content.translateIdx >= 2) {
        content.$nextBtn.addClass("disabled");
      } else {
        content.$prevBtn.removeClass("disabled");
        content.$nextBtn.removeClass("disabled");
      }
    };

    content.$prevBtn.click(() => {
      if (content.translateIdx > 0) {
        content.translateXs -= content.translate;
        content.translateIdx--;
        content.$contentCon.css("transform", `translateX(-${content.translateXs}%)`);
      }
      contentBtnStyleUpdate();
    });

    content.$nextBtn.click(() => {
      if (content.translateIdx < 2) {
        content.translateXs += content.translate;
        content.translateIdx++;
        content.$contentCon.css("transform", `translateX(-${content.translateXs}%)`);
      }
      contentBtnStyleUpdate();
    });

    contentBtnStyleUpdate();

    if (index === 1) {
      content.$contentCon.on("touchstart", (e) => {
        startPoint = e.touches[0].pageX;
      });
      content.$contentCon.on("touchend", (e) => {
        endPoint = e.changedTouches[0].pageX;
        if (startPoint < endPoint && content.translateIdx > 0) {
          content.translateXs -= 20;
          content.translateIdx--;
          circleStyleUpdate();
          content.$contentCon.css("transform", `translateX(-${content.translateXs}%)`);
        } else if (startPoint > endPoint && content.translateIdx < 4) {
          content.translateXs += 20;
          content.translateIdx++;
          circleStyleUpdate();
          content.$contentCon.css("transform", `translateX(-${content.translateXs}%)`);
        }
      });
    } else {
      content.$contentCon.on("touchstart", function (e) {
        isDragging = true;
        startX = e.originalEvent.touches[0].clientX;
        initialTranslateXs = content.translateXs;
      });

      content.$contentCon.on("touchmove", function (e) {
        if (isDragging) {
          const currentX = e.originalEvent.touches[0].clientX;
          const dx = currentX - startX;
          const percentageChange = (dx / $(this).width()) * 100;
          content.translateXs = initialTranslateXs + percentageChange;

          if (content.translateXs > 0) content.translateXs = 0;
          if (content.translateXs < -84) content.translateXs = -84;

          content.$contentCon.css("transform", `translateX(${content.translateXs}%)`);
        }
      });

      content.$contentCon.on("touchend", function () {
        isDragging = false;
      });
    }
  });

  // content2 바텀 영역
  const $botBtn = $(".content2-con > .hidden > .bot-btn");

  for (let i = 0; i < 5; i++) {
    $botBtn.append(`<div class="circle"></div>`);
  }

  const $circle = $(".content2-con > .hidden > .bot-btn > .circle");
  const circleStyleUpdate = () => {
    let idx = contents[1].translateIdx;
    $circle
      .css({
        border: "solid 1px " + (idx !== 0 && idx !== 4 ? "black" : "white"),
      })
      .each(function (index) {
        $(this).css({
          backgroundColor: idx === index ? (idx !== 0 && idx !== 4 ? "black" : "white") : "",
        });
      });
  };

  circleStyleUpdate();
});
