export class SoundMaker {
    /**
     * Creates a SoundMaker class that is able to play basic game sounds.
     * @param {String} lang, language of the sounds.
     */
    constructor(lang) {
        this._loadAudioFiles(lang)
    }
    /**
     * Load the sound files.
     * @param {String} lang, language of the sounds.
     */
    _loadAudioFiles(lang) {
        this._yay = new Audio(require('./../assets/sounds/yay.mp3'))
        this._thud = new Audio(require('./../assets/sounds/thud.wav'))
        // TODO: load hotter and warmer sounds according to language
    }
    /**
     * Plays a sound with a delay.
     * @param {Audio} audio, HTML5 Audio object that should be played.
     * @param {Number} delayMs optional, time of the delay in milliseconds.
     */
    _playSound(audio, delayMs) {
        if (delayMs) { // play sound with delay
            setTimeout(() => audio.play(), delayMs)
        } else { // play immediately, don't put into event loop
            audio.play()
        }
    }
    /**
     * Plays a thud sound with delay, if provided.
     * @param {Number} delayMs optional, time of the delay in milliseconds.
     */
    playThud(delayMs) {
        this._playSound(this._thud, delayMs)
    }
    /**
     * Plays yay sound with delay, if provided.
     * @param {Number} delayMs optional, time of the delay in milliseconds.
     */
    playYay(delayMs) {
        this._playSound(this._yay, delayMs)
    }
}