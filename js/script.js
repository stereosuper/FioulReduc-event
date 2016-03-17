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

// Positionner les popup sans transform
function posiPopup(){
	$(".popup").each(function(index){
		if($(window).width()<=767){
			TweenMax.set($(this), {"margin-top": "0px", "margin-left": "0px"});
			TweenMax.set($(this), {className:"+=no-transform"});
		}else{
			TweenMax.set($(this), {"margin-top": -($(this).outerHeight())/2+"px", "margin-left": -($(this).outerWidth())/2+"px"});
			TweenMax.set($(this), {className:"+=no-transform"});
		}
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
			// Sur mobile on fait un scroll jusqu'au popup
			if($(window).width()<=767){
				$('html, body').stop().animate( { scrollTop: selectedPopup.offset().top }, 800 );
			}
		}
		posiPopup();
		return false;
	});
	// Clic sur le bouton pour fermer le popup
	$(".btn-close-popup").click(function(){
		$(this).parents(".wrapper-popup").removeClass("open");
		return false;
	});
	// Vérifier la Quantité de fioul entrée
	var elem = $("#quantite");
	elem.data('oldVal', elem.val());
	elem.bind("propertychange change click keyup input paste", function(event){
		// Si il y a un changement dans l'input
		if (elem.data('oldVal') != elem.val()) {
			// Mise à jour de l'input
			elem.data('oldVal', elem.val());
			// Test de la valeur de l'input
			if(elem.val()>=500){
				$(this)[0].setCustomValidity('');
			}else{
				$(this)[0].setCustomValidity('Minimum 500 litres');
			}
		}
	});
});

$(window).load(function() {
	// Positionnement des popup
	posiPopup();
});

$(window).resize(function(){
	$(".content-etape").attr("style","");
	$("#etapes-event >li.open").removeClass("open");
	$("#etapes-event >li").first().addClass("open");
	// Positionnement des popup
	posiPopup();
});