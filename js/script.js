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

// Fonction pour l'affichage du compte à rebours
function decompteur(){
	$(".decompteur-event").countdown({
		until: new Date(2016, 04, 25), 
		compact: true,
		layout: "<span class='digit-group'><span class='digit'>{d10}</span><span class='digit'>{d1}</span><span class='legend'>jours</span></span>:<span class='digit-group'><span class='digit'>{h10}</span><span class='digit'>{h1}</span><span class='legend'>heures</span></span>:<span class='digit-group'><span class='digit'>{m10}</span><span class='digit'>{m1}</span><span class='legend'>min</span></span>:<span class='digit-group'><span class='digit'>{s10}</span><span class='digit'>{s1}</span><span class='legend'>sec</span></span>",
		padZeroes: true
	});
}

$(function(){
	compteur();
	decompteur();
	$("#etapes-event >li").mouseenter(function() {
		$("#etapes-event").removeClass("etape-1-active etape-2-active etape-3-active etape-4-active").addClass($(this).attr("class")+"-active");
	});
});

$(window).resize(function(){
	
});