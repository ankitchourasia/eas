$(window).on('resize', function () {
  var navbarHeaderHeight = $("#navbarHeader").innerHeight();
  var horizontalNavBarHeight = $("#horizontalNavBar").innerHeight();
  // $("#verticalNavBar").height(vheight - navbarHeaderHeight - horizontalNavBarHeight);
  // $("#mainContent").height(vheight - navbarHeaderHeight - horizontalNavBarHeight);
  document.documentElement.style.setProperty('--header-navbar-height', navbarHeaderHeight + 'px');
  document.documentElement.style.setProperty('--horizontal-navbar-height', horizontalNavBarHeight + 'px');
});

$(document).ready(function () {
  // var vheight = $(window).innerHeight();
  var navbarHeaderHeight = $("#navbarHeader").innerHeight();
  var horizontalNavBarHeight = $("#horizontalNavBar").innerHeight();
  // $("#verticalNavBar").height(vheight - navbarHeaderHeight - horizontalNavBarHeight);
  // $("#mainContent").height(vheight - navbarHeaderHeight - horizontalNavBarHeight);
  document.documentElement.style.setProperty('--header-navbar-height', navbarHeaderHeight + 'px');
  document.documentElement.style.setProperty('--horizontal-navbar-height', horizontalNavBarHeight + 'px');
});