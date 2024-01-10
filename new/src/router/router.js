$(document).ready(() => {
  const router = () => {
    let route = window.location.hash.substr(2);
    if (route == "") route = "main";
    $.get("pages/" + route + ".html", (data) => {
      $(".app").html(data);
    });
  };

  $(window).on("hashchange", router);
  router();
});
