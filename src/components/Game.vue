<template>
    <div id="game" v-if="ready" @click="hit" @mousemove="setSpoonPos">
        <img id="spoon" class="spoon" :src="require('./../assets/spoon.png')">

        <div class="message success">
            <h2>Ding Ding Ding! 🙌</h2>
        </div>
        <div class="message colder">
            <h2>Kälter! ⛄</h2>
        </div>
        <div class="message hotter">
            <h2>Wärmer! 🤗 </h2>
        </div>
        <div class="message pot">
            <h2>Der Topf wird wieder versteckt! 🥘 </h2>
        </div>
        <div class="message hide">
            <h2>Oh nein, der Topf ist versteckt! Du musst ihn finden! 🥘 </h2>
        </div>
    </div>
</template>

<script>
import { TimelineLite } from 'gsap'
export default {
    name: 'game',
    data () {
        return {
            ready: false, // Is game ready?
            windowWidth: null, // Global window width
            windowHeight: null, // Global window height
            potX: null, // pot X coordinate
            potY: null, // pot Y coordinate
            potSize: 50, // pot size - make it bigger to play easier
            hitX: null, // last hit X coordinate
            hitY: null, // last hit Y coordinate
        }
    },
    mounted () {
        // Add Resize Listener
        window.addEventListener('resize', this.initWindow)

        // if window is smaller (mobile), make the target smaller
        if (window.innerWidth < 768) {
            this.potSize = 30
        }

        // First Time Window Initiation
        this.initWindow()
    },
    methods: {
        hit: function (event) {
            // Init Animation Timeline
            let tlSpoon = new TimelineLite()
            let tlMessage = new TimelineLite()
            
            // Actual Hit Coordinates
            let actualHitX = event.clientX
            let actualHitY = event.clientY

            // Actual distance to pot
            let distanceX = Math.abs(this.potX - actualHitX)
            let distanceY = Math.abs(this.potY - actualHitY)
            let sumDistance = distanceX + distanceY

            // Old distance to pot (last hit)
            let oldDistanceX = Math.abs(this.potX - this.hitX)
            let oldDistanceY = Math.abs(this.potY - this.hitY)
            let sumOldDistance = oldDistanceX + oldDistanceY

            // Log actual Hit
            console.log(actualHitX, actualHitY)

            // Check if actual Hit is hitting the pot
            if (distanceX < this.potSize && distanceY < this.potSize) {
                tlMessage.to('.success', 0.1, {opacity: 1})
                tlMessage.to('.success', 0.1, {opacity: 0}, '+=2')
                tlMessage.to('.pot', 0.1, {opacity: 1})
                tlMessage.to('.pot', 0.1, {opacity: 0}, '+=2')
                console.log('Success!')

                // Hide pot again
                this.initPot()
            } else {
                // If wrong, check for colder or hotter
                if (sumDistance < sumOldDistance) {
                    tlMessage.to('.hotter', 0.1, {opacity: 1})
                    tlMessage.to('.hotter', 0.1, {opacity: 0}, '+=0.5')
                    console.log('Hotter')
                } else {
                    tlMessage.to('.colder', 0.1, {opacity: 1})
                    tlMessage.to('.colder', 0.1, {opacity: 0}, '+=0.5')
                    console.log('Colder')
                }
            }

            // Set global last hit for comparing with next hit
            this.hitX = actualHitX
            this.hitY = actualHitY

            // Hitting Animation
            tlSpoon.to('#spoon', 0.3, {rotationZ: 45, ease: Power0.easeOut})
            tlSpoon.to('#spoon', 0.5, {rotationZ: 0, ease: Elastic.easeOut})
        },
        initWindow: function () {

            // Set window and window dimensions, tell application about being ready
            this.ready = true
            this.windowWidth = window.innerWidth
            this.windowHeight = window.innerHeight

            // Hide the pot
            this.initPot()
        },
        initPot: function () {
            // Hide the pot randomly
            this.potX = this.getRandomInt(0, this.windowWidth) - (this.potSize / 2)
            this.potY = this.getRandomInt(0, this.windowHeight) - (this.potSize / 2)

            console.log("Pot got hid at " + this.potX + " " + this.potY)
        },
        setSpoonPos: function (event) {
            // Spoon Cursor
            let tl = new TimelineLite()
            tl.to('#spoon', 0.15, {x: event.clientX, y: event.clientY})
        },
        getRandomInt: function (min, max) {
            // Helping function for getting random numbers in a specific range
            min = Math.ceil(min)
            max = Math.floor(max)
            return Math.floor(Math.random() * (max - min + 1)) + min
        }
    }
}
</script>
