let songs = [];
let currentSong = {};
let currentIndex = 0;
let suffled = false;
let repeat = false;

let player = document.getElementById('player');

$.getJSON('songs.json').done(function (data) {
    songs = data;

    let songsOutput = '';

    if (songs.length > 0) {
        for (let i = 0; i < songs.length; i++) {

            songsOutput += `
        <div class="music-item" >
            <div class="music-cover">
                <img src="${songs[i].cover}" alt="">
                <div class="icon-play" data-index="${i}">
                        <i class="fa fa-play fa-2x"></i>
                </div>
            </div>
            <h2 class="music-title">${songs[i].title}</h2>
            <p class="music-artist">${songs[i].artist}</p>
        </div>`;
        }
        $('.music-grid').html(songsOutput);

        currentSong = songs[0];
        currentIndex = 0;
        player.src = currentSong.src;

    }
}).fail(function (err) {
    console.log(err.statusText);
});

function play() {
    changeCover();
    player.play();
}

function pause() {
    player.pause();

}
function prev() {
    if (currentIndex > 0) {
        if (!suffled) {
            currentIndex -= 1;
        } else {
            currentIndex = Math.floor(Math.random() * songs.length);
        }
        currentSong = songs[currentIndex];
        player.src = currentSong.src;
        play();
        togglePlayPauseIcon();
    }
}

function next() {
    if (currentIndex < songs.length - 1) {
        if (!suffled) {
            currentIndex += 1;
        } else {
            currentIndex = Math.floor(Math.random() * ((songs.length - 1) - 0 + 1) + 0);

        }
        currentSong = songs[currentIndex];
        player.src = currentSong.src;
        play();
        togglePlayPauseIcon();
    }
}

function suffle() {
    suffled = !suffled;
    $('#random').toggleClass('active');
}
function loop() {
    $('#repeat').toggleClass('active');
    repeat = !repeat;
}
function isPlaying() {
    return !player.paused;
}

$(player).on('ended', function () {
    if (!repeat) {
        next();
    } else {
        player.currentTime = 0;
        play();
    }
});
function changeCover() {
    $('.songs-cover').children('img')[0].src = currentSong.cover;
    $('.songs-title').text(currentSong.title);
    $('.songs-artist').text(currentSong.artist);
}

function togglePlayPauseIcon() {
    if (isPlaying()) {
        console.log('isplaying')
        let playIcon = $('#play').children('.fa')[0];
        $(playIcon).removeClass('fa-play').addClass('fa-pause');
        $('.player-container').addClass('show');
        $('.music-item').each(function (index, musicElement) {
            if (currentIndex == index) {
                $(musicElement).addClass('playing');
                $(musicElement).find('.fa').removeClass('fa-play').addClass('fa-pause');
            } else {
                $(musicElement).removeClass('playing');
                $(musicElement).find('.fa').removeClass('fa-pause').addClass('fa-play');
            }
        });
    } else {
        console.log('ispaused');
        let playIcon = $('#play').children('.fa')[0];
        $(playIcon).removeClass('fa-pause').addClass('fa-play');

        $('.music-item').each(function (index, musicElement) {
            if (currentIndex == index) {
                $(musicElement).find('.fa').removeClass('fa-pause').addClass('fa-play');
            }
        });
    }
}

function initPlayer() {
    let duration = calculateTotalTime(player.duration);
    $('.duration').text(duration);
    let currentTime = calculateCurrentTime(player.currentTime);
    $('.currentTime').text(currentTime);

    let progressBar = document.getElementById('seekbar');
    if (player.duration) {
        progressBar.value = (player.currentTime / player.duration);
    }
}

function calculateCurrentTime(currentTime) {
    var s = parseInt(currentTime % 60);
    var m = parseInt((currentTime / 60) % 60);
    if (s < 10) {
        return m + ':0' + s;
    } else {
        return m + ':' + s;
    }
}
function calculateTotalTime(duration) {
    if (duration) {
        let minute = Math.floor(duration / 60);
        let second = Math.floor(duration - minute * 60);
        return minute + ':' + second;
    }
}

function seek(event) {
    console.log(event.offsetX, event.offsetWidth);
    // 
    // console.log(p);
    // player.currentTime = p * player.duration;
    // document.getElementById('seekbar').value = p / 100;
}

$('#seekbar').click(function (event) {
    let percent = event.offsetX / $(this).outerWidth();
    player.currentTime = player.duration * percent;
});

// $('.volume').click(function () {
//     if ($(this).children('.fa').hasClass('fa-volume-up')) {
//         player.volume = 0;
//         $(this).children('.fa').removeClass('fa-volume-up').addClass('fa-volume-off');
//     } else {
//         $(this).children('.fa').removeClass('fa-volume-off').addClass('fa-volume-up');
//         player.volume = 1;
//     }
// });

$('#volume').change(function(e) {
    let volume = $(this).val();
    if(volume == 0) {
        console.log($(this).parentsUntil('.volume'));
        $(this).parent().prev().removeClass('fa-volume-up fa-volume-down').addClass('fa-volume-mute');
    } 
    if(volume > 0 && volume < 50) {
        $(this).parent().prev().removeClass('fa-volume-mute fa-volume-up').addClass('fa-volume-down');
    }

    if(volume >= 50) {
        $(this).parent().prev().removeClass('fa-volume-mute fa-volume-down').addClass('fa-volume-up');
    }

    player.volume = volume / 100;
});

$('body').on('click', '.icon-play', function () {
    if (+$(this).data('index') != currentIndex) {
        currentIndex = +$(this).data('index');
        currentSong = songs[currentIndex];
        player.src = currentSong.src;
    }

    if (isPlaying()) {
        pause();
        togglePlayPauseIcon();
    } else {
        play();
        togglePlayPauseIcon();
    }

});

$('#play').click(function () {
    if (isPlaying()) {
        pause();
        togglePlayPauseIcon();
    } else {
        play();
        togglePlayPauseIcon();
    }
});

$('#next').click(function () {
    next();
});

$('#prev').click(function () {
    prev();
});

$('#random').click(function () {
    suffle();
});

$('#repeat').click(function () {
    loop();
});
