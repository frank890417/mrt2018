<template lang="pug">
  .page.page-scene-list.color.white
    //- section.sectionHero
    //-   .container
    //-     .row
    section.sectionStyle
      .container
        .row
          .col-sm-4
            h3.title-eng {{ $t('explore.title_eng')  }}
            h1.title {{ $t('explore.title')  }}
            p(v-html="$t('explore.description')")
          router-link.animated.fadeIn.col-sm-4.col-station(
                    v-for = "(station,sid) in stations",
                    :to="'/explore/station/'+sid")
            .station-cover.animated
              img(:src="station.img")
            h3.color.black {{ station.name }}
            p {{ station.keywords}}
            .tag(v-if="station.audition" ) 徵選中
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
    ...mapState(['stations'])
  },
  methods:{

  }
}
</script>

<style lang="sass">
@import "../../assets/_mixins.sass"
.page-scene-list
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
