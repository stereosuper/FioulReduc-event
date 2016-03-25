// Variables
var i,
	myScroll,
	spritesTab,
	spritesCape = new TimelineMax({repeat: -1}),
	spritesGlow = new TimelineMax({repeat: -1});

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
	myScroll = $(document).scrollTop();
	// Positionnement du btn close popup
	if($(window).width()<=767){
		var topPopup = $(".wrapper-popup").offset().top;
		if (myScroll>topPopup){
			TweenMax.set($(".btn-close-popup"), {className:"+=fixed"});
		}else{
			TweenMax.set($(".btn-close-popup"), {className:"-=fixed"});
		}
	}

	requestAnimFrame(scrollPage);
}

// Fonction d'animation de sprites
function animSprites(sprite, timelineName, frameWidth, frameHeight, numCols, numRows){
	i = 0;
	var steppedEase = new SteppedEase(numCols-1);
	for(i; i<numRows; i++){
	    timelineName.add(TweenMax.fromTo(sprite, 0.2, {backgroundPosition: '0 -'+(frameHeight*i)+'px'}, {backgroundPosition: '-'+(frameWidth*(numCols-1))+'px -'+(frameHeight*i)+'px', ease: steppedEase}));
	}
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

function posiSprites(){
	animSprites($("#glow"), spritesGlow, 635, 200, 5, 5);
	if($(window).width()>767){
		animSprites($("#cape"), spritesCape, 96, 58, 2, 3);
	}else if($(window).width()>530){
		animSprites($("#cape"), spritesCape, 72, 44, 2, 3);
	}else if($(window).width()>374){
		animSprites($("#cape"), spritesCape, 52, 31, 2, 3);
	}else{
		animSprites($("#cape"), spritesCape, 44, 27, 2, 3);
	}
}

// Animation de l'illustration
function illus(){
	posiSprites();
	//animation d'intro
	var tl = new TimelineMax({});
	tl.set($("#ensemble-crew"), {opacity:0,bottom:"70%"})
		.from($("#prix"), 1.5, {scale:0.1, alpha:0,ease:Elastic.easeInOut})
		.insert(
			TweenMax.to($("#ensemble-crew"), 0.7, {delay:1.7,alpha:1, bottom:"11%",ease:Back.easeOut}),
			TweenMax.to($("#prix"), 0.7, {delay:1.7,scaleX:1,scaleY:1, bottom:"7%", ease:Back.easeOut}),
			TweenMax.to($("#ombre-prix"), 0.3, {delay:2.2,opacity:1}),
			TweenMax.to($("#ombre-socle"), 0.2, { delay:1.7, className:"+=first-step"})
	);
}

$(function(){
	compteur();
	decompteur();
	scrollPage();
	illus();
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
		}else{
			$(".content-etape", oldOpen).slideToggle(300);
			oldOpen.removeClass("open");
		}
		return false;
	});

	// Form //
	$(".radio").click(function(){
		if(!$(this).hasClass("active")){
			var fieldsetParent = $(this).parent("fieldset");
			$(".radio.active", fieldsetParent).removeClass("active");
			$(this).addClass("active");
		}
	});

	// Popup //
	
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
	// Fermeture du popup au clic en dehors du popup
	$(document).mouseup(function (e) {
		if($(window).width()>767){
		    var popup = $(".wrapper-popup.open .popup");
		    if (!popup.is(e.target) && popup.has(e.target).length == 0) {
		        $(".wrapper-popup.open").removeClass("open");
		    }
		}
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

	// Clipboard
	new Clipboard('.btn-clipboard');

	// Ajout d'une ligne d'invition par email
	$(document).delegate('#partage-email .btn-plus', 'click', function(){
	    $("#partage-email ul").append('<li><input type="email" placeholder="Saisir l\'email de votre choix"><button class="btn-plus"></button></li>');
	    posiPopup();
	    return false;
	});

	// Clic sur le bouton "Partager par email"
	$("#btn-partage-email").click(function(){
		$(this).closest(".popup").addClass("email-open");
		posiPopup();
		return false;
	});
	$("#btn-close-partage-email").click(function(){
		$(this).closest(".popup").removeClass("email-open");
		posiPopup();
		return false;
	});
});

$(window).load(function() {
	// Positionnement des popup
	posiPopup();
});

var h = $(window).height(), w = $(window).width();
$(window).resize(function(){
	// Positionnement des popup
	posiPopup();
	var nh = $(window).height(), nw = $(window).width();
	if (nw != w){
		$(".content-etape").attr("style","");
		$("#etapes-event >li.open").removeClass("open");
		$("#etapes-event >li").first().addClass("open");
		spritesCape.clear();
		posiSprites();
	}
	h = nh; w = nw;
});

$(document).on("scroll", function(){
	myScroll = $(document).scrollTop();
	if(myScroll<19){
		$("#prix").removeClass("break");
		TweenMax.to($("#prix"), 0.3, {bottom:"7%", scaleX:"1", scaleY:"1"});
		TweenMax.to($("#ombre-prix"), 0.2, {scaleX:"1"});
		TweenMax.to($("#ensemble-crew"), 1, { bottom:"11%", ease: Elastic.easeOut.config(2, 0.5) });
		TweenMax.to($("#ombre-socle"), 0.2, { className:"+=first-step"});
		TweenMax.to($("#ombre-socle"), 0.2, { className:"-=second-step"});
		TweenMax.to($("#ombre-socle"), 0.2, { className:"-=third-step"});
	}else if(myScroll>=20 && myScroll<59){
		$("#prix").addClass("break");
		TweenMax.to($("#prix"), 0.3, {bottom:"7%", scaleX:"1", scaleY:"1"});
		TweenMax.to($("#ombre-prix"), 0.2, {scaleX:"1"});
		TweenMax.fromTo($("#ensemble-crew"), 0.3, {bottom:"10%"}, {bottom:"11%",ease: Elastic.easeOut.config(2, 0.5)});
		TweenMax.to($("#ombre-socle"), 0.2, { className:"+=first-step"});
		TweenMax.to($("#ombre-socle"), 0.2, { className:"-=second-step"});
		TweenMax.to($("#ombre-socle"), 0.2, { className:"-=third-step"});
	}else if(myScroll>= 60 && myScroll<249){
		TweenMax.to($("#prix"), 0.3, {bottom:"5%", scaleX:"0.95", scaleY:"0.75"});
		TweenMax.to($("#ombre-prix"), 0.2, {scaleX:"0.95"});
		TweenMax.to($("#ensemble-crew"), 1, { bottom:"7%", ease: Elastic.easeOut.config(2, 0.5) });
		$("#prix").addClass("break");
		TweenMax.to($("#ombre-socle"), 0.2, { className:"-=first-step"});
		TweenMax.to($("#ombre-socle"), 0.2, { className:"+=second-step"});
		TweenMax.to($("#ombre-socle"), 0.2, { className:"-=third-step"});
	}else if (myScroll>= 250 && myScroll<600){
		$("#prix").addClass("break");
		TweenMax.to($("#prix"), 0.6, { bottom:"3%", scaleX:"0.9" ,scaleY:"0.4", ease: Elastic.easeOut.config(2, 0.5) });
		TweenMax.to($("#ombre-prix"), 0.2, {scaleX:"0.9"});
		TweenMax.to($("#ensemble-crew"), 1, { bottom:"3%", ease: Elastic.easeOut });
		TweenMax.to($("#ombre-socle"), 0.2, { className:"-=first-step"});
		TweenMax.to($("#ombre-socle"), 0.2, { className:"-=second-step"});
		TweenMax.to($("#ombre-socle"), 0.2, { className:"+=third-step"});
	}
});
