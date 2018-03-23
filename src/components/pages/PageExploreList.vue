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
          router-link.animated.fadeIn.col-sm-3(v-for = "i in 20",
                    :to="'/explore/station'")
            img(src="http://taipeisoundscape.com/img/scene_door.svg")
            h4 捷運xxxx站
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

  },
  methods:{

  }
}
</script>

<style lang="sass">
@import "../../assets/_mixins.sass"

</style>
