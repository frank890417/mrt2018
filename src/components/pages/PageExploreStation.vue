<template lang="pug">
  .page.page-explore-station.color.white
    section.sectionHero
      .container-fluid
        router-link.btn-prev(v-if="stationDelta(-1)" :to="stationDelta(-1)")
        router-link.btn-next(v-if="stationDelta(1)" :to="stationDelta(1)")
        .row
          .col-lg-5.col-md-12.col-content
            router-link.btn-back(to="/explore") 返回列表
            br
            div(:key="station.name")
              .ovh
                .line.animated.slideInLeft {{ station.line[0] }}
              h4.musicBar.animated.fadeIn {{ station.eng_name }}
              h1.animated.fadeIn {{ station.name }}
              h5.animated.fadeIn {{ station.keywords }}
              br
              p.animated.fadeIn(v-html="lineToBr(station.description)")
          .col-lg-7.col-md-12.col-scene.animated.fadeIn(:key="station.name")
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
    border-top: 20px solid transparent
    border-bottom: 20px solid transparent
    border-left-color: $colorRed
    border-right-color: $colorRed
    &:hover
      border-left-color: lighten($colorRed,15)
      border-right-color: lighten($colorRed,15)
  .btn-prev
    left: 50px
    border-right: 20px solid
  .btn-next
    right: 50px
    border-left: 20px solid
  .line
    padding: 5px 10px
    background-color: $colorRed
    color: white
    margin-top: 150px
    margin-bottom: 20px
    display: inline-block
  .col-content
    padding-left: 10vw
    box-sizing: border-box
  .col-scene
    min-height: 100vh
    display: flex
    justify-content: center
    align-items: center
    [data-name="hidden"]
      display: none
    svg
      width: 120vmin
      max-width: 100%

  img
    width: 100%
    max-width: 115vmin
    position: absolute
    right: 0
    bottom: -5vmin

  +rwd_sm
    height: auto
</style>

