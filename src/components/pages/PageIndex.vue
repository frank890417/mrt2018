<template lang="pug">
.page.page-index.color.blue
  section.section-hero
    .container-fluid
      .row
        .col-sm-8.col-content
          img(src="http://taipeisoundscape.com/img/scene_door.svg")
        .col-sm-4
          img.logo(src="/static/img/Logo.svg")
          h3.color.red {{ $t('index.engtitle') }}
          h1.title
            span {{ $t('index.title') }}
          h4 {{ $t('index.subtitle') }}
          .btn-group
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
  background-image: url(/static/img/bg1.svg)
  background-size: cover
  background-position: 0 100%
  .section-hero
    .col-content
      display: flex
      flex-direction: column
      // align-items: center
      // justify-content: center

    .logo
      width: 200px
      margin-bottom: 50px
    .btn-group
      margin-top: 50px
      .btn
</style>
