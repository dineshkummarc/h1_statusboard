$(function () {
	sizeMessages();
});

var onMessage = now.onMessage = function (message, author) {

	$('#content').prepend('<div class="message"><div class="title">' + message + '</div><div class="author">' + author + '</div></div>');
	$('#content').css('margin-top', -138);
	sizeMessages();

}

function sizeMessages() {
	
	$('#content').animate({
		marginTop: 50
	}, 2000);

	$('.message').each(function(i){

		var size = 90 / (i+1);

		$(this).children('.title').animate({
			fontSize: size + 'px',
			lineHeight: (size + 20) + 'px'
		}, 2000);
		
		if (i > 10) {
			$(this).remove();
		}

	});

}
