$(function () {
	sizeMessages();
});

function onMessage(message, author) {

	$('#content').prepend('<div class="message">' + message + '</div>');
	sizeMessages();

}

function sizeMessages() {

	$('.message').each(function(i){

		var size = 90 / (i+1);

		$(this).css({
			'font-size' : size + 'px',
			'line-height' : (size + 50) + 'px'
		});

	});

}
