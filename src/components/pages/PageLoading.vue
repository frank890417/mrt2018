<template lang="pug">
.page.page-loading
  SvgInline.logo(src="/static/img/Logo.svg")
  br
  h4 Use headphones for the best experience.
  //- h1 Taipei Soundscape Program
  //- h4 MRT Station Ambient Music Competition
  
</template>

<script>
export default {

}
</script>

<style lang="sass">
@import "../../assets/_mixins.sass"

.page-loading
  display: flex
  justify-content: center
  align-items: center
  background-color: $colorBlue
  position: fixed
  left: 0
  top: 0
  width: 100%
  height: 100%
  z-index: 1000
  position: fixed
  color: white
  flex-direction: column
  img
    width: 40vw
    max-width: 120px
  @keyframes opani
    0%,100%
      opacity: 0
    30%,70%
      opacity: 1
  svg
    g#Page-1 > g,g#Page-1 > path
      @for $i from 1 through 20
        animation: opani 5s #{$i*1s } infinite
        
</style>
