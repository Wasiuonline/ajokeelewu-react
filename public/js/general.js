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

});	