$(function () {
	sizeMessages(true);
});

var onMessage = now.onMessage = function (message, author) {

	$('#content').prepend('<div class="message"><div class="title">' + message + '</div><div class="author">' + author + '</div></div>');
	$('#content').css('margin-top', -8);
	sizeMessages();

}

function sizeMessages(firstRun) {
	
	var speed;
	
	if (firstRun) {
		speed = 0;
	} else {
		speed = 1000;
	}
	
	$('#content').animate({
		marginTop: 180
	}, speed);

	$('.message').each(function(i){

		var size = 90 / (i+1);

		$(this).children('.title').animate({
			fontSize: size + 'px',
			lineHeight: (size + 20) + 'px'
		}, speed);
		
		if (i > 10) {
			$(this).remove();
		}

	});

}
