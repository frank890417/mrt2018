<template lang="pug">
  .page.page-test.color.white
    section.sectionHero
      .container-fluid
        .row
          .col-sm-4
            h4.musicBar
            h1 {{ station.title }}
            p(v-html="station.description")
          .col-sm-8
            img(src="http://taipeisoundscape.com/img/scene_door.svg")


</template>

<script>
import {mapState,mapMutations,mapActions} from 'vuex'
import $ from 'jquery'
export default {
  data(){
    return {

    }
  },
  mounted(){

  },
  computed:{
    ...mapState(['stations']),
    station(){
      return this.stations.find(o=>o.name=="南港站")
    }
  },
  methods:{

  }
}
</script>

<style lang="sass">
@import "../../assets/_mixins.sass"

</style>
