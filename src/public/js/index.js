// Load socket.io client.
var socket = io();


// Load iframe tag.

var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';

var fistScriptTag = document.getElementsByTagName('script')[0];
fistScriptTag.parentNode.insertBefore(tag, fistScriptTag);

// Create the player.

var player;

function onYouTubeIframeAPIReady(){

    player = new YT.Player('player', {

        height: '560',
        width: '1040',
        videoId: '30MN4Mk2sQY',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
        playerVars: {
            'controls': 0,
            'disablekb': 1,
            'modestbranding': 1,
            'rel': 0,
            'showinfo': 0
        }

    });

}


// This function runs when the video is playing.

function onPlayerReady(event){
    progressBarLoop();
}

// This function listen the events on the video.

function onPlayerStateChange(event){

    if(event.data == 1) console.log('Play!')
    if(event.data == 2) console.log('Pause!')

}

// Buttons listeners.

var playButton = document.getElementById('play');
var pauseButton = document.getElementById('pause');

playButton.addEventListener('click', () =>{

    player.playVideo();
    socket.emit('playerEvent', 'play');

});

pauseButton.addEventListener('click', () =>{

    player.pauseVideo();
    socket.emit('playerEvent', 'pause');


});


// Progress bar.

function progressBarLoop(){

    var progressBar = $('.progressBar');
    var square = $('#square');

    progressBar.click(function(event){

        var divOffset = $(this).offset();
        let currentTime = (event.pageX - divOffset.left)/765*player.getDuration();
        socket.emit('playerEvent', currentTime);

    });

    setInterval(function(){
        
        if(player == null || progressBar == null){
            return;
        }

        var fraction = player.getCurrentTime()/player.getDuration()*100;
        square.css('left', fraction.toString() + '%')

    }, 200)

}