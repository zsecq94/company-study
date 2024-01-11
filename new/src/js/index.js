$(document).ready(() => {
  const $header = $("header");
  const $logo = $("header > a > img");
  const $menu = $("header > .menu-con > .menu-box > .title-box > a");
  const $hr = $(".hr");
  const $kr = $(".kr");
  const $en = $(".en");
  const $langIcon = $("header > .right-box > .lang-box > img");
  const $langBox = $("header > .right-box > .lang-box");
  const $menuIcon = $("header > .right-box > img ");
  const $mbLangSpan = $("header > .right-box > .lang-box > .mb-lang-span");
  const $menuCon = $("header .menu-con");

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
        $("header > .menu-con").removeAttr("style");
      }
    }
  });

  const langSpan = (val, state) => {
    if (state) {
      return lang === val ? { color: "black", opacity: 1 } : { color: "black", opacity: 0.5 };
    } else {
      return lang === val ? { color: "#fff", opacity: 1 } : { color: "#fff", opacity: 0.5 };
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
      $(".kr").css(langSpan("KR", state));
      $(".en").css(langSpan("EN", state));
    }

    $header.css("backgroundColor", headerBgColor);
    $logo.attr("src", headerLogoSrc);
    $menu.css("color", headerMenu);
    $hr.css(headerRightHr);
    $langIcon.attr("src", headerRightLangSrc);
    $langBox.css("border", headerRightBorder);
    $menuIcon.attr("src", headerMenuIconSrc);

    $mbLangSpan.html(`<span>${lang}</span>`);
    $mbLangSpan.css("color", mbHeaderRightSpan);
  };

  $menuIcon.click(() => {
    mbMenuOpenCheck = !mbMenuOpenCheck;
    if (mbMenuOpenCheck) {
      updateHeaderStyle(true, true);
      $("body").addClass("no-scroll");
      $menuCon.stop().slideDown();
    } else {
      if (scrollCheck) {
        updateHeaderStyle(true);
      } else {
        updateHeaderStyle(false);
      }
      $("body").removeClass("no-scroll");
      $menuCon.stop().slideUp();
    }
  });

  $menu.hover(
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

  $langBox.click(() => {
    if (isMobile) {
      lang = lang === "KR" ? "EN" : "KR";
      if (mbMenuOpenCheck) {
        updateHeaderStyle(true, true);
      } else {
        updateHeaderStyle(scrollCheck);
      }
    }
  });

  $kr.click(() => {
    if (!isMobile) {
      lang = "KR";
      updateHeaderStyle(true);
    }
  });
  $en.click(() => {
    if (!isMobile) {
      lang = "EN";
      updateHeaderStyle(true);
    }
  });

  $header.hover(
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

  $(".title-box").click(function () {
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
