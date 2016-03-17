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
	// Survol des étapes
	$("#etapes-event >li").mouseenter(function() {
		$("#etapes-event").removeClass("etape-1-active etape-2-active etape-3-active etape-4-active");
		if($(this).hasClass("etape-1")){
			$("#etapes-event").addClass("etape-1-active");
		}else if($(this).hasClass("etape-2")){
			$("#etapes-event").addClass("etape-2-active");
		}else if($(this).hasClass("etape-3")){
			$("#etapes-event").addClass("etape-3-active");
		}else if($(this).hasClass("etape-4")){
			$("#etapes-event").addClass("etape-4-active");
		}
	});

	// Clic sur les étapes
	$(".title-etape").click(function(){
		var oldOpen = $("#etapes-event >li.open");
		if(!($(this).parent(".etape").hasClass("open"))){
			// Fermeture de l'ancien
			$(".content-etape", oldOpen).slideToggle(300);
			oldOpen.removeClass("open");
			// Ouverture du cliqué
			var newOpen = $(this).parent(".etape");
			$(".content-etape", newOpen).slideToggle(300);
			newOpen.addClass("open");
		}
		return false;
	});

	// Form
	$(".radio").click(function(){
		if(!$(this).hasClass("active")){
			var fieldsetParent = $(this).parent("fieldset");
			$(".radio.active", fieldsetParent).removeClass("active");
			$(this).addClass("active");
		}
	});

	// Popup
	// Ouverture popup
	$(".has-popup").click(function(){
		var contentDataPopup = $(this).data('ref-popup');
		var selectedPopup = $(".wrapper-popup[data-popup='"+contentDataPopup+"']");
		if(!selectedPopup.hasClass("open")){
			$(".wrapper-popup").removeClass("open");
			selectedPopup.addClass("open");
		}
		//posiPopup();
		return false;
	});
	// Clic sur le bouton pour fermer le popup
	$(".btn-close-popup").click(function(){
		$(this).parents(".wrapper-popup").removeClass("open");
		return false;
	});
});

$(window).resize(function(){
	$(".content-etape").attr("style","");
	$("#etapes-event >li.open").removeClass("open");
	$("#etapes-event >li").first().addClass("open");
});