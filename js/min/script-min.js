function scrollPage(){if(myScroll=$(document).scrollTop(),$(window).width()<=767){var e=$(".wrapper-popup").offset().top;myScroll>e?TweenMax.set($(".btn-close-popup"),{className:"+=fixed"}):TweenMax.set($(".btn-close-popup"),{className:"-=fixed"})}requestAnimFrame(scrollPage)}function compteur(){var e=5347,a=5302,t=new Odometer({el:$(".compteur-participants")[0],theme:"train-station",value:a,format:""});t.render(),setInterval(function(){e>=a&&t.update(a++)},3e3)}function decompteur(){$(".decompteur-event").countdown({until:new Date(2016,4,25),compact:!0,layout:"<span class='digit-group'><span class='digit'>{d10}</span><span class='digit'>{d1}</span><span class='legend'>jours</span></span>:<span class='digit-group'><span class='digit'>{h10}</span><span class='digit'>{h1}</span><span class='legend'>heures</span></span>:<span class='digit-group'><span class='digit'>{m10}</span><span class='digit'>{m1}</span><span class='legend'>min</span></span>:<span class='digit-group'><span class='digit'>{s10}</span><span class='digit'>{s1}</span><span class='legend'>sec</span></span>",padZeroes:!0})}function posiPopup(){$(".popup").each(function(e){$(window).width()<=767?(TweenMax.set($(this),{"margin-top":"0px","margin-left":"0px"}),TweenMax.set($(this),{className:"+=no-transform"})):(TweenMax.set($(this),{"margin-top":-$(this).outerHeight()/2+"px","margin-left":-$(this).outerWidth()/2+"px"}),TweenMax.set($(this),{className:"+=no-transform"}))})}window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}(),$(function(){compteur(),decompteur(),scrollPage(),$("#etapes-event >li").mouseenter(function(){$("#etapes-event").removeClass("etape-1-active etape-2-active etape-3-active etape-4-active"),$(this).hasClass("etape-1")?$("#etapes-event").addClass("etape-1-active"):$(this).hasClass("etape-2")?$("#etapes-event").addClass("etape-2-active"):$(this).hasClass("etape-3")?$("#etapes-event").addClass("etape-3-active"):$(this).hasClass("etape-4")&&$("#etapes-event").addClass("etape-4-active")}),$(".title-etape").click(function(){var e=$("#etapes-event >li.open");if($(this).parent(".etape").hasClass("open"))$(".content-etape",e).slideToggle(300),e.removeClass("open");else{$(".content-etape",e).slideToggle(300),e.removeClass("open");var a=$(this).parent(".etape");$(".content-etape",a).slideToggle(300),a.addClass("open")}return!1}),$(".radio").click(function(){if(!$(this).hasClass("active")){var e=$(this).parent("fieldset");$(".radio.active",e).removeClass("active"),$(this).addClass("active")}}),$(".has-popup").click(function(){var e=$(this).data("ref-popup"),a=$(".wrapper-popup[data-popup='"+e+"']");return a.hasClass("open")||($(".wrapper-popup").removeClass("open"),a.addClass("open"),$(window).width()<=767&&$("html, body").stop().animate({scrollTop:a.offset().top},800)),posiPopup(),!1}),$(".btn-close-popup").click(function(){return $(this).parents(".wrapper-popup").removeClass("open"),!1});var e=$("#quantite");e.data("oldVal",e.val()),e.bind("propertychange change click keyup input paste",function(a){e.data("oldVal")!=e.val()&&(e.data("oldVal",e.val()),$(this)[0].setCustomValidity(e.val()>=500?"":"Minimum 500 litres"))}),new Clipboard(".btn-clipboard")}),$(window).load(function(){posiPopup()});var h=$(window).height(),w=$(window).width();$(window).resize(function(){posiPopup();var e=$(window).height(),a=$(window).width();a!=w&&($(".content-etape").attr("style",""),$("#etapes-event >li.open").removeClass("open"),$("#etapes-event >li").first().addClass("open")),h=e,w=a});