$(document).ready(function(){"use strict";document.getElementById("copyrightYear").innerHTML=(new Date).getFullYear(),$(".widget-slider").slick({dots:!1,infinite:!0,speed:300,slidesToShow:1,slidesToScroll:1,arrows:!0,autoplay:!0,responsive:[{breakpoint:992,settings:{slidesToShow:1,slidesToScroll:1}},{breakpoint:768,settings:{slidesToShow:1,slidesToScroll:1}}]}),$(window).on("scroll",function(){$(window).scrollTop()?$("nav").addClass("nav-bg"):$("nav").removeClass("nav-bg")})});
const templateContent = document.querySelector('.template').innerHTML;

document.querySelectorAll('.editable_image').forEach((image) => {

  image.addEventListener('click', function () {
    const input = document.createElement('input'); 
    input.type = 'file';
    input.accept = 'image/*';

    input.click();

    input.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
          image.src = e.target.result;
        };

        reader.readAsDataURL(file); 
      }
});
});
});