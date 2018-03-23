<template lang="pug">
  .page.page-about.color.blue
    section.sectionHero
      .container
        .row
          .col-sm-5
            h3.title-eng Taipei Sounds 
            h1.title {{ $t('about.title')  }}
            p(v-html="$t('about.description')")
          .col-sm-7
            p(v-html="$t('about.content') ")

    h1.decor Taipei soundscope
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
.page-about
  overflow: hidden
  h1.decor
    font-size: 300px
    font-weight: normal
    position: absolute
    bottom: 0px
    left: 0
    opacity: 0.1
    line-height: 1.1
</style>
