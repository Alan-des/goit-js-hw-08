import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const elements = {
    iframe: document.querySelector('iframe'),
    LOCAL_STORAGE_KEY:"videoplayer-current-time"
}


const player = new Player(elements.iframe);

const onPlay = throttle(function({seconds}) {
    localStorage.setItem(elements.LOCAL_STORAGE_KEY, seconds)
}, 1000);

player.on('timeupdate', (onPlay));

player.setCurrentTime(localStorage.getItem(elements.LOCAL_STORAGE_KEY)).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});
