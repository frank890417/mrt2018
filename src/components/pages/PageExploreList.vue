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
            img(:src="station.img")
            h3.color.black {{ station.name }}
            p {{ station.keywords}}
            .tag(:v-if="station.audition") 徵選中
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
    &:hover
      img
        top: -20px
  h3,p
    +trans
  a:hover
    color: inherit
    text-decoration: none
    h3,p


  img
    position: relative
    top: 0
    +trans
  .tag
    position: absolute
    right: 0
    top: 0
    background-color: $colorRed
    color: white
    padding: 5px
</style>
