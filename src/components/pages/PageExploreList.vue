<template lang="pug">
  .page.page-scene-list.color.white
    //- section.sectionHero
    //-   .container
    //-     .row
    section.sectionStyle
      .container-fluid
        .row
          .col-lg-3.col-md-12.col-text
            h3.title-eng {{ $t('explore.title_eng')  }}
            h1.title {{ $t('explore.title')  }}
            p(v-html="$t('explore.description')")
            //- .btn.red 第一期
            //- .btn.red 第二期
            //- .btn.red 第三期
            //- .btn.red 典藏
            //- .btn.red 徵選中
          .col-lg-9.col-md-12.col-map
            
            SvgInline.animated.map(:src="'/static/img/map.svg'")

          //- router-link.animated.fadeIn.col-sm-4.col-station(
          //-           v-for = "(station,sid) in stations",
          //-           :to="'/explore/station/'+sid")
          //-   .station-cover.animated
          //-     img(:src="station.img")
          //-   h3.color.black {{ station.name }}
          //-   p {{ station.keywords}}
          //-   .tag(v-if="station.audition" ) {{ $t('explore.requiring')  }}
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
    let _this = this
    function station_goto(){
      let target =  $(this).attr("id").replace(/\r/g,"").replace(/\s/g,"").replace(/\</g,"").replace(/\>/g,"")
      // let station = _this.stations.find(st=>st.station_key==target)
      let sid = -1
      // console.log(station)
      _this.stations.forEach( (st,stid)=>{
         if(st.station_key==target){
           sid = stid
         }
      })
      _this.$router.push( '/explore/station/'+ sid)
    }
    $( ".col-map" ).on( "tap", "g[id*='station']",station_goto);
    $( ".col-map" ).on( "click", "g[id*='station']",station_goto);

    
    // $( ".col-map" ).on( "mouseenter", "g[data-name*='station']",station);
    // $( ".col-map" ).on( "mouseleave", "g[data-name*='station']",station);
  
  },
  computed:{
    stations(){
      return this.$t("stations")
    },
    // ...mapState(['stations'])
  },
  methods:{

  }
}
</script>

<style lang="sass">
@import "../../assets/_mixins.sass"
.page-scene-list
  background: linear-gradient(45deg,transparent 0%,transparent 15%,#efefef 19% ,#efefef 20%,transparent 21%),linear-gradient(-45deg,transparent 0%,transparent 15%,#efefef 19% ,#efefef 20%,transparent 21%)
  background-size: 50px
  .col-text
    // background-color: $colorRed
    // color: white
    padding-left: 100px
    padding-top: 100px
    // padding: 30px
    height: 450px
    +rwd_sm
      padding: 50px
      height: 350px
  .title-eng
    &:before
    color: #fff
  .map
    mix-blend-mode: multiply
    transform: scale(1)
    width: 100vmin
    overflow: hidden
    margin-left: -2.5%
    margin-top: -10%
    circle
      r: 7
      animation: rr 1s linear
      stroke-width: 4px
      cursor: pointer
      &:hover
        fill: red
        r: 9
    path
      stroke-dasharray: 800
      stroke-dashoffset: 800
      animation: dash 4s linear both
    @keyframes dash
      to 
        stroke-dashoffset: 0
    @keyframes rr
      from
        r: 0
      to 
        r: 7
  
  .col-map
    display: flex
    justify-content: center
    align-items: center
    +rwd_sm
      padding: 0
  .col-station
    padding: 10px
    +trans
    box-sizing: border-box
    background-color: rgba(white,0.2)
    &:hover
      background-color: rgba(white,0.5)
      box-shadow: 0px 0px 20px rgba(black,0.1)
      img
        top: -20px
  h3,p
    +trans
  a:hover
    color: inherit
    text-decoration: none
    h3,p
    
  .station-cover
    display: flex
    justify-content: center
    align-items: center
    height: 400px

  img
    position: relative
    top: 0
    width: 100%
    +trans
  .tag
    position: absolute
    right: 0
    top: 0
    background-color: $colorRed
    color: white
    padding: 5px
</style>
