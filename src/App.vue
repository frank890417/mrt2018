<template lang="pug">
#app( :style="bgStyle" )
  //- .testroute
    span 測試用
    router-link.ml-5(:to="r" v-for="r in testRoutes") 
      span.color.white {{r}}
  transition(name="fade" , mode="out-in")
    pageLoading(v-if="loading")
  .all_pages_area
    transition(name="page" , mode="out-in")
      router-view(:key="$route.path")
  FullMenu
  SectionFooter
</template>


<script>
import {mapState,mapMutations,mapActions} from 'vuex'
import $ from 'jquery'
export default {
  data(){
    return {
      testRoutes: ["/","/about","/explore","/explore/station","/playground","/rules","/register"]
    }
  },
  computed:{
    ...mapState({
      loading: (state)=>state.loading.loading,
      bgColor: "bgColor"
    }),
    bgStyle(){
      return {'background-color': this.bgColor}
    }
  },
  name: 'App'
}
</script>

<style lang="sass">



@import "./assets/_mixins.sass"
@import url(https://fonts.googleapis.com/earlyaccess/notosanstc.css)
@import url(https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,500,600,700)
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css)
// @import "../node_modules/animate-sass/animate"


.testroute
  position: fixed
  top: 0
  left: 0
  z-index: 100
  background-color: $colorBlue
  color: white

html,body
  margin: 0
  width: 100%
  background-color: $colorBlue
  font-size: 15px
  overflow-x: hidden
  color: #333

#app
  font-family: 'Roboto Condensed', 'Noto Sans TC','Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  background-color: $colorBlue
  
.ovh
  overflow: hidden

.container
  max-width: 1440px
  padding-left: 5vw
  padding-right: 5vw

.all_pages_area
  min-height: 100vh
  &:before
    content: ""
    display: block
    +ab_full
    left: 0
    top: 0
    opacity: 0.2
    pointer-events: none
    mix-blend-mode: multiply
    background-image: url("/static/img/paper-compressor.jpg")
    background-size: cover

.fade-enter-active, .fade-leave-active 
  transition: opacity .3s

.fade-enter, .fade-leave-to
  opacity: 0

.page-enter-active, .page-leave-active 
  transition: opacity .3s

.page-enter, .page-leave-to
  opacity: 0



$page_trans_time: 0.4s


.page-enter-active,.page-leave-active
  transition: $page_trans_time
  transition-timing-function: ease-in
  position: relative
  // min-height: 100vh
  .placeholder_body
    height: 100vh
    transition-delay: 0.5s
  footer
    margin-top: 100vh
  // opacity: 0
  // &:before
  //   transition: $page_trans_time
  //   display: block
  //   content: ""
  //   width: 100%
  //   background-color: white
  //   height: 100vh
  //   position: fixed
  //   z-index: 10000
  //   left: 0
  //   top: 100vh
  //   transition-timing-function: ease-in
    // box-shadow: 0px 20px white
  &:after
    display: block
    content: ""
    opacity: 0
    transition: $page_trans_time
    height: 100vh
    position: fixed
    +size(100%)
    z-index: 1
    left: 0
    width: 100%
    top: 0
    background-color: $colorBlue

.page-enter-active
  opacity: 1
  transition-timing-function: ease-out
  &:before
    top: 0
    transition-timing-function: ease-out
    // box-shadow: 0px 20px white
    content: ""
    display: block
    background-color: #fff
.page-enter
  opacity: 0
  // top: 30px
  &:after
    opacity: 1
.page-enter-to
  opacity: 1
  // top: 0px
  &:before
    // top: -100vh
  &:after
    opacity: 0
.page-leave
  opacity: 1
  // top: 0px
  &:after
    opacity: 0
.page-leave-to
  opacity: 0
  // top: -30px

  &:before 
    top: 0
  &:after
    opacity: 1




.musicBar
  &:after
    display: inline-block
    content: ""
    width: 80px
    height: 8px
    margin-left: 10px
    border-bottom: solid 2px $colorRed
    background-image: linear-gradient(90deg, transparent 0%, transparent 50% , $colorRed 50%)
    background-size: cover
    
a
  color: $colorRed
h1,h2,h3,h4,h5,h6,p,li,span
  letter-spacing: 0.05rem
  line-height: 2
  &.color
    &.red
      color: $colorRed
    &.white
      color: $colorWhite
    &.black
      color: #222
  &.small
    font-size: 0.6em
    
h1
  font-size: 2.8rem
  font-weight: 700
  line-height: 1.4
h2
  font-size: 2rem
  font-weight: 500
  line-height: 1.4
h3
  font-size: 1.6rem
  font-weight: 500
  line-height: 1.4
h4
  font-size: 1.2rem
  font-weight: 500
  line-height: 1.4
h5
  font-size: 1rem
  font-weight: 500
  line-height: 1.4
p,li
  font-size: 1rem
  line-height: 2
  font-weight: 500
  opacity: 0.9

.page
  text-align: left
  padding-top: 100px
  min-height: 100vh
  padding-bottom: 100px
  &.color.blue
    background-color: $colorBlue
    color: $colorWhite
    .title-eng
      color: $colorRed
  &.color.red
    background-color: $colorRed
    color: $colorWhite
  &.color.white
    background-color: $colorWhite
    color: #333
    .title-eng
      color: $colorRed
  .title
    font-size: 2.5em
  .title-eng
    color: $colorRed
    font-size: 1.5em
    white-space: nowrap
    font-weight: 600
    

.btn
  border-radius: 200px
  padding: 5px 20px
  letter-spacing: 1px
  text-align: center
  &.white
    background-color: white
    color: $colorBlue
    &:hover
      background-color: #eee
      &:active
        background-color: #ddd
  &.grey
    background-color: #eee
    color: #222
    &:hover
      background-color: #ddd
      &:active
        background-color: #ccc
  &.red
    background-color: $colorRed
    color: $colorWhite
    &:hover
      background-color: lighten($colorRed,5)
      &:active
        background-color: darken($colorRed,5)



  background-color: #eee

$speed_cb: cubic-bezier(.04,.6,.42,1) 
.animated
  animation-speed-curve: ease-in-out
  animation-duration: 1.5s
@keyframes floatInUp
  0%
    opacity: 0
    transform: translateY(100px)
  100%
    opacity: 1
    transform: translateY(0px)
.floatInUp
  animation-name: floatInUp
  
</style>
