var intervals = {};

function sliderInit(element){
	var container = $('<div/>')
	.addClass('slides-container');

	element.children('img').each(function(){
		container.append($(this).addClass('slide'));
	})

	var btnNext = $('<button>Next</button>').click(function(e){
		next(e.target);
	});

	var btnPrev = $('<button>Prev</button>').click(function(e){
		prev(e.target);
	});

	var navigation = $('<nav/>')
	.append(btnPrev)
	.append(btnNext);

	element
	.html(container)
	.addClass('slider')
	.append(navigation)
	.attr('currentImage', '0')
	.attr('id','slider' + $('.slider').length);

	autoPlay(element);
}

function next(btn){
	var slider = $(btn).closest('.slider');
	var currentImage = slider.attr('currentImage') != undefined ? slider.attr('currentImage') : 0;
	slider.attr('currentImage', Number(currentImage) + 1);
	slide(slider);
	autoPlay(slider)
}


function prev(btn){
	var slider = $(btn).closest('.slider');
	var currentImage = slider.attr('currentImage') != undefined ? slider.attr('currentImage') : 0;
	slider.attr('currentImage', Number(currentImage) - 1);
	slide(slider);
	autoPlay(slider)
}

function slide(slider){

	disableNav(slider);

	var currentImage = slider.attr('currentImage') != undefined ? slider.attr('currentImage') : 0;
	var container = slider.children('.slides-container');
	
	// Si on dépasse la dernière image
	if(currentImage >= container.children('.slide').length){
		// créer un clone de la première image
		var clone = container.children('.slide:first-child').clone();
		// ajouter le clone au bandeau
		container.append(clone);
		// écouter la fin de la transition
		container.on('transitionend', function(){

			// Supprimer l'ecouteur pour qu'il ne joue qu'une fois 
			$(this).off('transitionend');

			// enlever la transition sur le bandeau
			container.css('transition', 'none');

			// rembobiner le bandeau vers l'image 1
			slider.attr('currentImage', 0);
			slide(slider);

			// supprimer le clone
			clone.remove();

			// remettre la transition sur le bandeau après un timeout
			setTimeout(function(){
				container.css('transition', 'left 1s');
			}, 100);
			
		})
	}

	// Si on va avant la première image
	if(currentImage <= -1){
		// créer un clone de la dernière image
		var clone = container.children('.slide:last-child').clone();

		// ajouter le clone avant la première image
		container.prepend(clone);
		clone.css({
			position: 'absolute',
			top: 0,
			left: 0,
			transform: 'translateX(-100%)'
		});

		// écouter la fin de la transition
		container.on('transitionend', function(){
			$(this).off('transitionend');

			// enlever la transition
			container.css('transition', 'none');

			// rembobiner vers la dernière image
			let lastIndex = container.children('.slide').length - 1 -1
			slider.attr('currentImage', lastIndex);
			slide(slider);
			clone.remove();

			// remettre la transition
			setTimeout(function(){
				container.css('transition', 'left 1s');
			},10);
		})
	}

	// ajouter un ecouteur de fin de transition pour rétablir la nav
	container.on('transitionend',function(){
		container.off('transitionend');
		enableNav(slider);
	});

	var leftValue = currentImage * (-100) + '%';
	container.css('left', leftValue);
}


function enableNav(slider){
	slider.find('button').removeAttr('disabled');
}


function disableNav(slider){
	slider.find('button').attr('disabled','disabled');
}

function autoPlay(slider){
	const idSlider = slider.attr('id');

	// Suppression de l'intervalle s'il existe
	if(undefined != intervals[idSlider]){
		let interval = intervals[idSlider];
		clearInterval(interval);
	}

	// Créer un intervalle pour le slider
	var interval = setInterval(function(){
		next(slider);
	}, 4000);

	intervals[idSlider] = interval;
}





