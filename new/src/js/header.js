// $(document).ready(() => {
//   const $header = $("header");
//   const $logo = $("header > a > img");
//   const $menuSpan = $("header > .menu-con > .title-box > a");
//   const $menu = $("header > .menu-con, nav");
//   const $nav = $("header > nav");
//   const $subMenuSpan = $("header > nav > .sub-menu-con > .sub-menu-box > a");
//   const $langBox = $("header > .right-box > .lang-box");
//   const $langIcon = $("header > .right-box > .lang-box > img");
//   const $kr = $(".kr");
//   const $hr = $(".hr");
//   const $en = $(".en");

//   let isMobile = $(window).width() < 1007;
//   let lang = "KR";
//   let scrollCheck;
//   let webMenuOpenCheck = false;
//   let isHeaderHover = false;

//   const langSpan = (val, hoverCheck) => {
//     if (hoverCheck) {
//       return lang === val ? { color: "black", opacity: 1 } : { color: "black", opacity: 0.5 };
//     } else {
//       return lang === val ? { color: "white", opacity: 1 } : { color: "#fff", opacity: 0.5 };
//     }
//   };

//   const styleUpdate = (state, hoverCheck) => {
//     if (state) {
//     } else {
//       const bgColor = hoverCheck ? "white" : "transparent";
//       const logoSrc = hoverCheck ? "./images/logo/logo_color.png" : "./images/logo/logo_black.png";
//       const menuColor = hoverCheck ? "black" : "white";
//       const langImg = hoverCheck ? "./images/icon/lang_icon2.png" : "./images/icon/lang_icon.png";
//       const langBorder = hoverCheck ? "solid 1px #eee" : "solid 1px #fff";
//       const hrColor = hoverCheck ? { color: "#111", opacity: 0.1 } : { color: "#fff", opacity: 0.1 };

//       $logo.attr("src", logoSrc);
//       $header.css("backgroundColor", bgColor);
//       $menuSpan.css("color", menuColor);
//       $langBox.css("border", langBorder);
//       $kr.css(langSpan("KR", hoverCheck));
//       $en.css(langSpan("EN", hoverCheck));
//       $hr.css(hrColor);
//       $langIcon.attr("src", langImg);
//     }
//   };

//   const checkWidth = () => {
//     let windowSize = $(window).width();
//     let currentIsMobile = windowSize < 1007;

//     if (currentIsMobile !== isMobile) {
//       isMobile = currentIsMobile;

//       if (isMobile) {
//         // 모바일 로직 적용
//         styleUpdate(isMobile);
//       } else {
//         // 웹 로직 적용
//         styleUpdate(isMobile);
//       }
//     }
//   };

//   $(window).scroll(() => {
//     scrollCheck = scrollY > 100;
//     if (webMenuOpenCheck) {
//       return;
//     }

//     if (scrollCheck) {
//       styleUpdate(isMobile, true);
//     } else {
//       styleUpdate(isMobile, false);
//     }
//   });

//   $menu.hover(
//     () => {
//       webMenuOpenCheck = true;
//       $nav.stop().slideDown().css("display", "grid");
//     },
//     () => {
//       webMenuOpenCheck = false;
//       $nav.stop().slideUp();
//     }
//   );

//   $kr.click(() => {
//     lang = "KR";
//     styleUpdate(isMobile, true);
//   });

//   $en.click(() => {
//     lang = "EN";
//     styleUpdate(isMobile, true);
//   });

//   $menuSpan.hover(
//     function () {
//       $(this).css("color", "#F26933");
//     },
//     function () {
//       $(this).css("color", "black");
//     }
//   );

//   $subMenuSpan.hover(
//     function () {
//       $(this).css({ color: "#F26933", textDecoration: "underline" });
//     },
//     function () {
//       $(this).css({ color: "black", textDecoration: "none" });
//     }
//   );

//   $header.hover(
//     () => {
//       isHeaderHover = true;
//       if (!isMobile && !scrollCheck) {
//         styleUpdate(isMobile, true);
//       }
//     },
//     () => {
//       isHeaderHover = false;
//       if (!isMobile && !scrollCheck) {
//         styleUpdate(isMobile, false);
//       }
//       styleUpdate(isMobile, false);
//     }
//   );

//   styleUpdate(isMobile, false);
//   checkWidth();
//   $(window).resize(checkWidth);
// });

$(document).ready(() => {
  let mbMenuOpenCheck = false;
  let webMenuOpenCheck = false;
  let scrollCheck = false;
  let isHeaderHover = false;
  let lang = "KR";

  let isMobile = $(window).width() < 1007;

  $(window).resize(function () {
    let wasMobile = isMobile;
    isMobile = $(window).width() < 1007;
    if (wasMobile != isMobile) {
      if (!isMobile) {
        $(".menu-box").children(".sub-menu-box").remove();
      }
      if (scrollCheck) {
        updateHeaderStyle(true);
      } else {
        updateHeaderStyle(false);
      }
      if (!isMobile) {
        $("header .menu-con").removeAttr("style");
      }
    }
  });

  const langSpan = (val, state) => {
    if (state) {
      return lang === val ? { color: "black", opacity: 1 } : { color: "black", opacity: 0.5 };
    } else {
      return lang === val ? { color: "white", opacity: 1 } : { color: "#fff", opacity: 0.5 };
    }
  };

  const updateHeaderStyle = (state, active) => {
    const headerLogoSrc = state ? "./images/logo/logo_color.png" : "./images/logo/logo_black.png";
    const headerRightHr = state ? { color: "black", opacity: 0.1 } : { color: "#fff", opacity: 0.1 };
    const headerRightLangSrc = state ? "./images/icon/lang_icon2.png" : "./images/icon/lang_icon.png";
    const headerRightBorder = state ? "solid 1px rgba(0, 0, 0, 0.2)" : "solid 1px white";
    const headerMenuIconSrc = active
      ? "./images/icon/close_icon.png"
      : state
      ? "./images/icon/menu_black.png"
      : "./images/icon/menu_color.png";
    let headerMenu;
    let headerBgColor;
    let mbHeaderRightSpan = state ? "black" : "white";

    if (isMobile) {
      headerMenu = "black";
      headerBgColor = state ? "rgba(255, 255, 255, 0.9)" : "transparent";
    } else {
      headerBgColor = state ? "white" : "transparent";
      headerMenu = state ? "black" : "white";
    }

    if (active) {
      headerBgColor = "white";
    }

    if (!isMobile) {
      $("header .right-box > .lang-box > .kr").css(langSpan("KR", state));
      $("header .right-box > .lang-box > .en").css(langSpan("EN", state));
    }

    $("header").css("backgroundColor", headerBgColor);
    $("header > a > img").attr("src", headerLogoSrc);
    $("header > .menu-con > .title-box > a").css("color", headerMenu);
    $("header > .right-box > .lang-box > .hr").css(headerRightHr);
    $("header > .right-box > .lang-box > img").attr("src", headerRightLangSrc);
    $("header > .right-box > .lang-box").css("border", headerRightBorder);
    $("header > .right-box > img ").attr("src", headerMenuIconSrc);

    $("header .right-box > .lang-box > .mb-lang-span").html(`<span>${lang}</span>`);
    $("header .right-box > .lang-box > .mb-lang-span").css("color", mbHeaderRightSpan);
  };

  $("header > .right-box > img").click(() => {
    mbMenuOpenCheck = !mbMenuOpenCheck;
    if (mbMenuOpenCheck) {
      updateHeaderStyle(true, true);
      $("body").addClass("no-scroll");
      $("header .menu-con").stop().slideDown();
    } else {
      if (scrollCheck) {
        updateHeaderStyle(true);
      } else {
        updateHeaderStyle(false);
      }
      $("body").removeClass("no-scroll");
      $("header .menu-con").stop().slideUp();
    }
  });

  $("header .menu-con .menu-box a").hover(
    function () {
      if (!isMobile) {
        $(this).css("color", "orange");
      }
    },
    function () {
      if (!isMobile) {
        $(this).css("color", "black");
      }
    }
  );

  $("header .right-box > div").click(() => {
    if (isMobile) {
      lang = lang === "KR" ? "EN" : "KR";
      if (mbMenuOpenCheck) {
        updateHeaderStyle(true, true);
      } else {
        updateHeaderStyle(scrollCheck);
      }
    }
  });

  $("header .right-box > div > .kr").click(() => {
    if (!isMobile) {
      lang = "KR";
      updateHeaderStyle(true);
    }
  });
  $("header .right-box > div > .en").click(() => {
    if (!isMobile) {
      lang = "EN";
      updateHeaderStyle(true);
    }
  });

  $("header").hover(
    () => {
      isHeaderHover = true;
      if (!isMobile && !scrollCheck) {
        updateHeaderStyle(true);
      }
    },
    () => {
      isHeaderHover = false;
      if (!isMobile && !scrollCheck) {
        updateHeaderStyle(false);
      }
    }
  );

  $("header .menu-con, nav").hover(
    () => {
      if (!isMobile) {
        $("nav").stop().slideDown().css("display", "grid");
      }
    },
    () => {
      if (!isMobile) {
        $("nav").stop().slideUp();
      }
    }
  );

  $("nav .sub-menu-con .sub-menu-box a").hover(
    function () {
      $(this).css({
        color: "#F26933",
        textDecoration: "underline 1px #F26933",
      });
    },
    function () {
      $(this).css({
        color: "black",
        textDecoration: "none",
      });
    }
  );

  $(".menu-title-box").click(function () {
    if (isMobile) {
      let index = $(this).parent(".menu-box").index();
      let selectedSubMenu = $(".sub-menu-con .sub-menu-box").eq(index).clone();
      selectedSubMenu.find("a").css({
        "font-size": "16px",
        "font-weight": "500",
      });

      if (!$(this).parent(".menu-box").has(".sub-menu-box").length) {
        $(this).find("img").attr("src", "./images/icon/up_icon.png");

        // 서브 메뉴를 숨긴 상태에서 추가하고
        selectedSubMenu.hide();
        $(this).parent(".menu-box").append(selectedSubMenu);

        // 슬라이드 다운 효과를 적용
        selectedSubMenu.slideDown();
      } else {
        // 서브 메뉴가 이미 존재한다면 슬라이드 업 효과를 적용하여 제거
        $(this).find("img").attr("src", "./images/icon/down_icon.png");
        $(this)
          .parent(".menu-box")
          .find(".sub-menu-box")
          .slideUp(function () {
            $(this).remove();
          });
      }
    }
  });

  $(window).scroll(() => {
    scrollCheck = scrollY > 100;
    if (webMenuOpenCheck || mbMenuOpenCheck) {
      return;
    }

    if (scrollCheck) {
      updateHeaderStyle(true);
      return;
    }

    if (isMobile) {
      updateHeaderStyle(false);
    } else {
      updateHeaderStyle(isHeaderHover);
    }
  });

  updateHeaderStyle(false);
});
