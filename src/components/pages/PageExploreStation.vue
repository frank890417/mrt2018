<template lang="pug">
  .page.page-explore-station.color.white
    section.sectionHero
      .container-fluid
        router-link.btn-prev(v-if="stationDelta(-1)" :to="stationDelta(-1)") 前一站
        router-link.btn-next(v-if="stationDelta(1)" :to="stationDelta(1)") 後一站
        .row
          .col-sm-4.col-content
            router-link(to="/explore") 返回
            br
            .line {{ station.line[0] }}
            .ovh
              h4.musicBar.animated.slideInUp {{ station.eng_name }}
            .ovh
              h1.animated.slideInUp {{ station.name }}
            .ovh
              h5.animated.slideInUp {{ station.keywords }}
            p.animated.fadeIn(v-html="station.description")
          .col-sm-8.col-scene
            SvgInline.floatInUp.animated(:src="station.img")


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
  methods:{
    stationDelta(delta){
      let target=parseInt(this.$route.params.station_id)+delta
      if (this.stations[target]){
        return '/explore/station/'+target
      }
      return null
    }
  },
  computed:{
    ...mapState(['stations']),
    station(){
      return this.stations[this.$route.params.station_id]
    }
  },
}
</script>

<style lang="sass">
@import "../../assets/_mixins.sass"
.page-explore-station
  height: 100vh
  overflow: hidden
  .btn-prev,.btn-next
    position: absolute
    top: 50%
    cursor: pointer
    z-index: 5
  .btn-prev
    left: 50px
  .btn-next
    right: 50px
  .line
    padding: 5px 10px
    background-color: $colorRed
    color: white
    margin-top: 150px
    margin-bottom: 50px
    display: inline-block
  .col-content
    padding-left: 10vw
    box-sizing: border-box
  .col-scene
    min-height: 100vh
    [data-name="hidden"]
      display: none
    svg
      width: 120vmin

  img
    width: 100%
    max-width: 115vmin
    position: absolute
    right: 0
    bottom: -5vmin

  +rwd_sm
    height: auto
</style>

