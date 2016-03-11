window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame   || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame    || 
			window.oRequestAnimationFrame      || 
			window.msRequestAnimationFrame     || 
			function(callback){ window.setTimeout(callback, 1000/60); };
})();


// Request anim frame
function scrollPage(){
	requestAnimFrame(scrollPage);
}

// Fonction pour animer le compteur
function compteur(){
	// valeur max compteur
	var valeurMaxCompteur = 5347;
	// valeur compteur init
	var valeurCompteur = 5302;
    var compteur = new Odometer({
    	el: $('.compteur-participants')[0], 
    	theme: 'train-station', value: valeurCompteur,
    	format: ''
    });
    compteur.render();

    setInterval(function(){
    	if (valeurCompteur <= valeurMaxCompteur) {
    		compteur.update(valeurCompteur++);	
    	}
    }, 3000);
}

$(function(){
	compteur();
	$("#etapes-event >li").mouseenter(function() {
		$("#etapes-event").removeClass("etape-1-active etape-2-active etape-3-active etape-4-active").addClass($(this).attr("class")+"-active");
	});
});

$(window).resize(function(){
	
});