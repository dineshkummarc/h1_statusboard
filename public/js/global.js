$(function () {
	sizeMessages(true, null);
});

var onMessage = function (message, author)
{
	addMessage(message, author);
	var track = soundManager.getSoundById('alert');
	track.play();
};

var onRecording = function (url, author)
{
	addMessage('New voice message', author, 3);
	soundManager.createSound({
		id: 'incomingRecording' + Math.random(),
		url: url + '.mp3',
		autoLoad: true,
		autoPlay: true,
		volume: 100
	});
};

function addMessage (message, author, type)
{
	$('#content').prepend('<div class="message"><div class="title">' + message + '</div><div class="author">' + author.slice(0,3) + ' ' + author.slice(3,6) + ' ' + author.slice(6,10) + '</div></div>');
	$('#content').css('margin-top', -8);
	//$('#content').css('margin-top', ($('#content').css("margin-top")).replace("px", "") - 188);
	var messageType = type;
	if (message.indexOf('!') > 0) {
		messageType = 1;
	} else	if (message.indexOf('?') > 0) {
		messageType = 2;
	}
	sizeMessages(false, messageType);	
}

// Make sure we have Now.js loaded before we try to play with it
if (typeof now != "undefined") {
  now.onMessage = onMessage;
  now.onRecording = onRecording;
}

function sizeMessages(firstRun, messageType)
{
	
	var speed;
	
	if (firstRun) {
		speed = 0;
	} else {
		speed = 1000;
	}
	
	$('#content').animate({
		marginTop: 180
	}, speed, 'easeOutCubic');

	$('.message').each(function(i) {

		var size = 90 / (i + 1);
		
		$(this).stop().animate({
			opacity: 1 / (i + 1)
		}, speed);
		
		$(this).children('.title').animate({
			fontSize: size + 'px',
			lineHeight: (size + 20) + 'px'
		}, speed, 'easeOutCubic');
		
		if (i == 0)
		{
			switch (messageType) {
				case 1:
					$(this).children('.title').css('color', '#fffcc6');
					$(this).children('.title').effect("pulsate", {
						times: 2
					}, speed);
				break;
				case 2:
					$(this).children('.title').css('font-style', 'italic');
				break;
				case 3:
					$(this).children('.title').css('font-style', 'bold');
				break;
				default:
				break;
			}
		}
		else if (i > 10)
		{
			$(this).remove();
		}

	});
	
}

soundManager.url = "swf/";

soundManager.onready(function()
{
	soundManager.createSound({
		id: 'alert',
		url: 'audio/alert.mp3',
		autoLoad: true,
		autoPlay: false,
		volume: 50
	});
});
