<template lang="pug">
.page.page-index.color.blue
  section.section-hero
    .container-fluid
      .row
        .col-sm-8
          SvgInline.floatInUp.animated(src="/static/img/stations/scene_door.svg")
        .col-sm-4.col-content
          SvgInline.logo(src="/static/img/Logo.svg")
          h3.color.red {{ $t('index.engtitle') }}
          h1.title
            span {{ $t('index.title') }}
          h3.sub {{ $t('index.subtitle') }}
          h2 2018/3/31-5/15
          div.btns
            router-link.btn.color.white(to="/about") 關於
            router-link.btn.color.white(to="/explore") 場景探索
            br
            router-link.btn.color.white(to="/playground") 即興創作
            router-link.btn.color.white(to="/rules") 規則與報名
            

</template>

<script>

export default {

}
</script>

<style lang="sass">
@import "../../assets/_mixins.sass"
.page-index
  // background-image: url(/static/img/bg1.svg)
  background-size: cover
  background-position: 0 100%
  overflow: hidden
  height: 100vh
  .title
    font-size: 3rem
    margin-top: 0px
    margin-bottom: -10px


  .sub
    opacity: 0.7
  .section-hero
    .col-content
      display: flex
      flex-direction: column
      // align-items: center
      // justify-content: center
      padding-top: 20vh
    .logo
      width: 250px
      margin-bottom: 40px

    .btns
      margin-top: 40px
      .btn
        margin: 5px
</style>
