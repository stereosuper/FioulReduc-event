function scrollPage(){requestAnimFrame(scrollPage)}function compteur(){var e=5347,s=5302,a=new Odometer({el:$(".compteur-participants")[0],theme:"train-station",value:s,format:""});a.render(),setInterval(function(){e>=s&&a.update(s++)},3e3)}function decompteur(){$(".decompteur-event").countdown({until:new Date(2016,4,25),compact:!0,layout:"<span class='digit-group'><span class='digit'>{d10}</span><span class='digit'>{d1}</span><span class='legend'>jours</span></span>:<span class='digit-group'><span class='digit'>{h10}</span><span class='digit'>{h1}</span><span class='legend'>heures</span></span>:<span class='digit-group'><span class='digit'>{m10}</span><span class='digit'>{m1}</span><span class='legend'>min</span></span>:<span class='digit-group'><span class='digit'>{s10}</span><span class='digit'>{s1}</span><span class='legend'>sec</span></span>",padZeroes:!0})}window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}(),$(function(){compteur(),decompteur(),$("#etapes-event >li").mouseenter(function(){$("#etapes-event").removeClass("etape-1-active etape-2-active etape-3-active etape-4-active").addClass($(this).attr("class")+"-active")})}),$(window).resize(function(){});