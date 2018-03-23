<template lang="pug">
  .page.color.blue
    section.sectionHero
      .container-fluid
        .row
          .col-sm-6
            img(src="http://taipeisoundscape.com/img/scene_door.svg")
          .col-sm-6.align-items-center
            h3.color.red {{ $t('index.engtitle') }}
            h1.title
              span {{ $t('index.title') }}
            h4 {{ $t('index.subtitle') }}
            .buttons
            .btn.color.white 關於
            .btn.color.white 關於
            .btn.color.white 關於
            .btn.color.white 關於

            

</template>

<script>

export default {

}
</script>

<style lang="sass">
@import "../../assets/_mixins.sass"

</style>
