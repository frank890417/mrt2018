<template lang="pug">
.page.page-index.color.blue
  section.section-hero
    .container-fluid
      .row
        .col-sm-8
          img.floatInUp.animated(src="http://taipeisoundscape.com/img/scene_door.svg")
        .col-sm-4.col-content
          img.logo(src="/static/img/Logo.svg")
          h3.color.red {{ $t('index.engtitle') }}
          h1.title
            span {{ $t('index.title') }}
          h4 {{ $t('index.subtitle') }}
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
  .section-hero
    .col-content
      display: flex
      flex-direction: column
      // align-items: center
      // justify-content: center
      padding-top: 20vh
    .logo
      width: 300px
      margin-bottom: 50px

    .btns
      margin-top: 40px
      .btn
        margin: 5px
</style>
