$(function () {
	sizeMessages(true);
});

function onMessage(message, author) {

	$('#content').prepend('<div class="message"><div class="title">' + message + '</div><div class="author">' + author + '</div></div>');
	$('#content').css('margin-top', -8);
	sizeMessages();
	var track = soundManager.getSoundById('alert');
	track.play();
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

soundManager.url = "swf/";

soundManager.onready(function() {
	soundManager.createSound({
	  id: 'alert',
	  url: 'audio/alert.mp3',
	  autoLoad: true,
	  autoPlay: false,
	  volume: 50
	});
});
