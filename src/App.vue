<template>
  <div id="app">
    <!-- Game Component -->
    <game />
  </div>
</template>

<script>
import Game from './components/Game.vue'
export default {
  components: {
    Game
  }
}
</script>


<style lang="sass">
// Sass Variables
$black: #000000
$white: #ffffff
$green: #8bc34a
$blue: #2196f3
$red: #f44336
$yellow: #ffc107

// Reset unnecessary borders, paddings and margins
*
  margin: 0
  padding: 0
  border: 0

// Make fonts smooth again
html
  -webkit-font-smoothing: antialiased

// Base body styling
body
  font-size: 18px
  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif
  color: $white
  background: $black

// Message container - hotter, colder, success, hide message
.message
  font-size: 3rem
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
  display: flex
  align-items: center
  justify-content: center
  font-weight: 900
  text-align: center
  opacity: 0

// Game container
#game
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    cursor: none // hide cursor!

// Spoon cursor opject
.spoon
    position: absolute
    top: -35px
    left: -35px
    width: 50px
    height: 50px
    transform-origin: 100px 100px 0
    z-index: 9999

// Message classes
.hotter
  color: $red
.colder
  color: $blue
.success
  background: $green
  color: $white
.pot, .hide
  color: $yellow
</style>
