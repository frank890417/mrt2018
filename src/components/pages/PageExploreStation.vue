<template lang="pug">
  .page.page-explore-station.color.white
    section.sectionHero
      .container-fluid
        .row
          .col-sm-4.col-content
            router-link(to="/explore") 返回
            h4.musicBar {{ station.eng_name }}
            h1 {{ station.name }}
            h5 {{ station.keywords }}
            p(v-html="station.description")
          .col-sm-8
            img.floatInUp.animated(src="http://taipeisoundscape.com/img/scene_door.svg")


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
      return this.stations[this.$route.params.station_id]
    }
  },
  methods:{

  }
}
</script>

<style lang="sass">
@import "../../assets/_mixins.sass"
.page-explore-station
  height: 100vh
  overflow: hidden
  h4
    margin-top: 200px
  .col-content
    padding: 30px
    box-sizing: border-box
  +rwd_sm
    height: auto
</style>

