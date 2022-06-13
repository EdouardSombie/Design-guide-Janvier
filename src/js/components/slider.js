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
	.attr('currentImage', '0');
}

function next(btn){
	var slider = $(btn).closest('.slider');
	var currentImage = slider.attr('currentImage') != undefined ? slider.attr('currentImage') : 0;
	slider.attr('currentImage', Number(currentImage) + 1);
	slide(slider);
}


function prev(btn){
	var slider = $(btn).closest('.slider');
	var currentImage = slider.attr('currentImage') != undefined ? slider.attr('currentImage') : 0;
	slider.attr('currentImage', Number(currentImage) - 1);
	slide(slider);
}

function slide(slider){
	var currentImage = slider.attr('currentImage') != undefined ? slider.attr('currentImage') : 0;
	var container = slider.children('.slides-container');
	var leftValue = currentImage * (-100) + '%';
	container.css('left', leftValue);
}







