<template lang="pug">
.page.page-index.color.blue
  section.section-hero
    .container-fluid
      .row
        .col-sm-12.col-logo
          SvgInline.floatInUp.animated.big-logo(src="/static/img/logo_blue.svg")
    .container
      .row
        .col-sm-12.col-content
          .row
            .col-md-6.col-sm-12
              //- img.logo(src="/static/img/Logo.svg")
              h3.color.red.musicBar {{ $t('index.engtitle') }}
              h1.title
                span {{ $t('index.title') }}
              h3.sub {{ $t('index.subtitle') }}
              h2 2018/3/31-5/15
            .col-md-6.col-sm-12
              .btns
                .btn-lang.btn.red(@click="switchLang('en')") English 
                br
                .btn-lang.btn.red(@click="switchLang('zh')") 中文版
              div.btns
                router-link.btn.color.white(to="/about") {{ $t('nav.plan.title') }}
                router-link.btn.color.white(to="/explore") {{ $t('nav.explore.title') }}
                br
                router-link.btn.color.white(to="/playground") {{ $t('nav.playground.title') }}
                router-link.btn.color.white(to="/rules") {{ $t('nav.register.title') }}
            

</template>

<script>

import {mapState,mapMutations, mapActions, mapGetters} from 'vuex'
import $ from 'jquery'
import Tone from 'tone'
export default {
  mounted(){
    setTimeout(function(){
      var aa = ["C4","E4","A4","C5","D4","F4","G4","B4","C5","G4","E4","C4","E4","A4","C5","D4","C4","E4","A4","C5","D4","F4","G4","B4","C5","G4","E4","C4","E4","A4","C5","D4",]
      $("path").each(function(pid,id){
        $(this).attr("data-id",pid)
      })
      $("path").mouseenter(function(obj,i){
          let _this = this
          $(this).addClass("active")
          setTimeout(function(){
            $(_this).removeClass("active")

          },0)
          let toneid = parseInt($(this).attr("data-id"))
          console.log(toneid)
          //create a synth and connect it to the master output (your speakers)
          var synth = new Tone.PolySynth().toMaster();
          synth.volume.value=-20

          //play a middle 'C' for the duration of an 8th note
          synth.triggerAttackRelease(aa[toneid], "16n");

        })
        $("path").click(function(obj,i){
          let _this = this
          $(this).addClass("active")
          setTimeout(function(){
            $(_this).removeClass("active")

          },0)
          let toneid = parseInt($(this).attr("data-id"))
          console.log(toneid)
          //create a synth and connect it to the master output (your speakers)
          var synth = new Tone.PolySynth().toMaster();
          synth.volume.value=-40

          //play a middle 'C' for the duration of an 8th note
          synth.triggerAttackRelease(aa[toneid], "16n");

        })
    },800)
  },
  methods:{
    
  }
}
</script>

<style lang="sass">
@import "../../assets/_mixins.sass"
.page-index
  // background-image: url(/static/img/bg1.svg)
  background-size: cover
  background-position: 0 100%
  overflow: hidden
  min-height: 100vh
  @keyframes movinga
    0%,100%
      transform: translateY(8px)
    50%
      transform: translateY(-8px)

  svg

    path
      cursor: pointer
      animation: movinga 10s infinite 
      transition: 0.5s
      border: solid 1px rgba(white,0)
      box-shadow: 0px 0px 20px rgba(#4e60ff,0.3)
      @for $i from 1 through 100
        &:nth-child(#{$i})
          animation-delay: #{ -$i * 0.4 }s
      &:active,&.active
        opacity: 0
        transition: 0s
        stroke: white
        
  .col-logo
    display: flex
    justify-content: center
    align-items: center
    padding-left: 5vw
    padding-right: 5vw
    &>*
      width: 100%
  .btns
    display: flex
    flex-wrap: wrap
    .btn
      font-size: 1,5rem
    .btn.white
      background-color: transparent
      color: white

      &:hover
        &:before
          transform: translateY(-10px)
          background-color: $colorRed

      &:before
        content: ''
        display: inline-block
        +size(5px,20px)
        background-color: white
        margin-right: 10px
        border-radius: 50px
        +trans
        


  .btn-lang
    
  .title
    font-size: 2.6rem
    margin-top: 0px
    margin-bottom: -10px
    +rwd_sm
      line-height: 1.2


  .big-logo svg
    width: 100%
  h3.sub
    opacity: 0.6
    font-size: 1.4rem
  .section-hero
    .col-content
      display: flex
      flex-direction: column
      // align-items: center
      // justify-content: center
      padding-top: 5vh
    .logo
      // width: 100%
      width: 350px
      margin-bottom: 40px

    .btns
      margin-top: 40px
      .btn
        margin: 5px
</style>
