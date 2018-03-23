<template lang="pug">
  .page.page-test.color.white
    //- section.sectionHero
    //-   .container
    //-     .row
    section.sectionStyle
      .container
        .row
          .col-sm-6
            h3.title-eng {{ $t('explore.title_eng')  }}
            h1.title {{ $t('explore.title')  }}
            p(v-html="$t('explore.description')")
          router-link.animated.fadeIn.col-sm-3(v-for = "(station,sid) in stations",
                    :to="'/explore/station/'+sid")
            img(src="http://taipeisoundscape.com/img/scene_door.svg")
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

</style>
