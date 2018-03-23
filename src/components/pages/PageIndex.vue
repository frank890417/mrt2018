<template lang="pug">
.page.page-index.color.blue
  section.section-hero
    .container-fluid
      .row
        .col-sm-6.col-content
          img(src="http://taipeisoundscape.com/img/scene_door.svg")
        .col-sm-6
          img.logo(src="/static/img/Logo.svg")
          h3.color.red {{ $t('index.engtitle') }}
          h1.title
            span {{ $t('index.title') }}
          h4 {{ $t('index.subtitle') }}
          .btn-group
            .btn.color.white 關於
            .btn.color.white 場景探索
            br
            .btn.color.white 即興創作
            .btn.color.white 規則與報名
            

</template>

<script>

export default {

}
</script>

<style lang="sass">
@import "../../assets/_mixins.sass"
.page-index
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
