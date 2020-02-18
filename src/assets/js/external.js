$(document).ready(function () {
  console.log("hello-1");    
    $('#sidebarCollapse').on('click', function () {
      console.log("hello-2");
        $('#sidebar').toggleClass('active');
    });
});

$(document).ready(function () {
  console.log("Lazy loading script");
  var vheight = $(window).innerHeight();
  var navbarHeaderHeight = $("#navbarHeader").innerHeight();
  var horizontalNavBarHeight = $("#horizontalNavBar").innerHeight();
  console.log(vheight, navbarHeaderHeight, horizontalNavBarHeight);
  // $("#verticalNavBar").height(vheight - navbarHeaderHeight - horizontalNavBarHeight);
  // $("#mainContent").height(vheight - navbarHeaderHeight - horizontalNavBarHeight);
});