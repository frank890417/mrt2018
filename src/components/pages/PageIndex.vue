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
              h3.color.red {{ $t('index.engtitle') }}
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
export default {
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
  .btn-lang
    
  .title
    font-size: 2.6rem
    margin-top: 0px
    margin-bottom: -10px


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
      padding-top: 10vh
    .logo
      // width: 100%
      width: 350px
      margin-bottom: 40px

    .btns
      margin-top: 40px
      .btn
        margin: 5px
</style>
