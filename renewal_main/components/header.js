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
        $("header .main-menu-con").removeAttr("style");
      }
    }
  });

  const updateHeaderStyle = (state, active) => {
    const headerLogoSrc = state ? "./images/logo_color.png" : "./images/logo_black.png";
    const headerRightHr = state ? { color: "black", opacity: 0.1 } : { color: "#fff", opacity: 0.1 };
    const headerRightLangSrc = state ? "./images/lang_icon2.png" : "./images/lang_icon.png";
    const headerRightBorder = state ? "solid 1px rgba(0, 0, 0, 0.2)" : "solid 1px white";
    const headerMenuIconSrc = active
      ? "./images/close_icon.png"
      : state
      ? "./images/menu_black.png"
      : "./images/menu_color.png";
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

    const langSpan = (val) => {
      if (state) {
        if (lang === val) {
          return { color: "black", opacity: 1 };
        } else {
          return { color: "black", opacity: 0.5 };
        }
      } else {
        if (lang === val) {
          return { color: "white", opacity: 1 };
        } else {
          return { color: "#fff", opacity: 0.5 };
        }
      }
    };

    if (!isMobile) {
      $("header .right-box > div > .kr").css(langSpan("KR"));
      $("header .right-box > div > .en").css(langSpan("EN"));
    }

    $("header").css("backgroundColor", headerBgColor);
    $("header .logo-box > img").attr("src", headerLogoSrc);
    $("header .main-menu-con .menu-box a").css("color", headerMenu);
    $("header .right-box > div > .hr").css(headerRightHr);
    $("header .right-box > div > img").attr("src", headerRightLangSrc);
    $("header .right-box > div").css("border", headerRightBorder);
    $("header .right-box > img ").attr("src", headerMenuIconSrc);

    $("header .right-box > div > .mb-lang-span").html(`<span>${lang}</span>`);
    $("header .right-box > div > .mb-lang-span").css("color", mbHeaderRightSpan);
  };

  $("header .right-box > img").click(() => {
    mbMenuOpenCheck = !mbMenuOpenCheck;
    if (mbMenuOpenCheck) {
      updateHeaderStyle(true, true);
      $("body").addClass("no-scroll");
      $("header .main-menu-con").stop().slideDown();
    } else {
      if (scrollCheck) {
        updateHeaderStyle(true);
      } else {
        updateHeaderStyle(false);
      }
      $("body").removeClass("no-scroll");
      $("header .main-menu-con").stop().slideUp();
    }
  });

  $("header .main-menu-con .menu-box a").hover(
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

  $("header .main-menu-con, nav").hover(
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
        $(this).find("img").attr("src", "./images/up_icon.png");

        // 서브 메뉴를 숨긴 상태에서 추가하고
        selectedSubMenu.hide();
        $(this).parent(".menu-box").append(selectedSubMenu);

        // 슬라이드 다운 효과를 적용
        selectedSubMenu.slideDown();
      } else {
        // 서브 메뉴가 이미 존재한다면 슬라이드 업 효과를 적용하여 제거
        $(this).find("img").attr("src", "./images/down_icon.png");
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
