<!--

if (self!=top)
{
top.location.href=self.location.href;
}

///////

$.fn.animateBG = function(x, y, speed, def) {
    var pos = this.css('background-position').split(' ');
    this.x = 0,
    this.y = def;
    $.Animation( this, {
        x: x,
        y: y
      }, { 
        duration: speed
      }).progress(function(e) {
          this.css('background-position', e.tweens[0].now+'px '+e.tweens[1].now+'px');
    });
    return this;
}

$(document).ready(function(){
						   
$(".general-fade").hide();
$("html, body").animate({scrollTop:0}, "slow");

$(window).resize(function (){						
if($("button.collapse").css("display") == "none"){
done = 0
$(".header2 ul.main-list").show();
}
if($("button.collapse").css("display") == "block"){
if(done == 0){
done = 1;
$(".header2 ul.main-list").hide();
}
}
});

////////////////////////////////////////////////////
$(".header-wrapper ul.main-list li").hover(function(){
if($("button.collapse").css("display") == "none"){												  
$(this).children("a.main-link").addClass("current2");
$(this).children("ul").slideToggle();
}
},function(){
if($("button.collapse").css("display") == "none"){
$(this).children("a.main-link").removeClass("current2");
$(this).children("ul").hide();
}
});

////////////////////////////////////////////////////
$(".header-wrapper ul.main-list li").click(function(){
if($("button.collapse").css("display") == "block"){	
$(".header-wrapper ul.main-list li").not($(this)).children("a.current2").removeClass("current2");
$(this).children("a.main-link").toggleClass("current2");
$(".header-wrapper ul.main-list li").not($(this)).children("ul").hide("slow");
$(this).children("ul").slideToggle();
}
});

////////////////////////////////////////////////////
$(".header2 .collapse").click(function(){
$(".header2 ul.main-list").slideToggle();
});

///////////////////////////////////////////////////
$(".search-link").click(function(){
$(".search-form-guide").slideToggle();
});

///////////////////////////////////////////////////

    //smoothscroll
    $('a.nav_top').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
		
        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });

//Zoom effect
$('.item-picture img').hover(function() {
	$(this).addClass('transition');
}, function() {
	$(this).removeClass('transition');
});
/////////////////////////////////////

});

function comma_separator(x) {
return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function my_confirm(conf_title,conf_text,conf_link){
swal({
  title: conf_title,
  text: conf_text,
  type: "warning",
  showCancelButton: true,
  confirmButtonColor: "#DD6B55",
  confirmButtonText: "Yes",
  closeOnConfirm: false
},
function(isConfirm){
  if (isConfirm) {
location.href = conf_link;
  } else {
return false;
  }
});
}

//////////////////////////////////////////////

/////////////////////////////////////////
function get_search(what, url){
$.post(url, {search_item : what}, function(data){ 
if(data == 1){
document.getElementById(del_result).outerHTML = "";
}
 }).error(function() { 
alert("An error occured!");
document.getElementById(del_loader).style.display = "none";
 });	
}

//Fly in effect
var timer = 0;
function recheck() {
    var window_top = $(this).scrollTop();
    var window_height = $(this).height();
    var view_port_s = window_top;
    var view_port_e = window_top + window_height;
     
    if ( timer ) {
      clearTimeout( timer );
    }
     
    $('.fly').each(function(){
      var block = $(this);
      var block_top = block.offset().top;
      var block_height = block.height();
       
      if ( block_top < view_port_e ) {
        timer = setTimeout(function(){
          block.addClass('show-block');
        },100);      
      } else {
        timer = setTimeout(function(){
          block.removeClass('show-block');
        },100);         
      }
    });
}
 
$(function(){
  $(window).scroll(function(){
    recheck();
  });
   
  $(window).resize(function(){
     recheck();  
  });

  recheck();
});
///////////////////////////////////////
		
//-->