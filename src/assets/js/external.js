$(document).ready(function () {
  console.log("hello-1");    
    $('#sidebarCollapse').on('click', function () {
      console.log("hello-2");
        $('#sidebar').toggleClass('active');
    });

});