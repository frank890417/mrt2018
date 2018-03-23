<template lang="pug">
  .page.page-test.color.white
    section.sectionHero
      .container
        .row
          .col-sm-12
            h1.title 競賽辦法
    section.sectionStyle
      .container
        .row
          .col-sm-6
            h3  {{ $t('rules.p1Title') }}
            ol
              li(v-for="item in textToList($t('rules.p1'))" 
                 v-html="item")
          .col-sm-6
            h3  {{ $t('rules.p2Title') }}
            ol
              li(v-for="item in textToList($t('rules.p2'))" 
                 v-html="item")
          .col-sm-8
            h3  {{ $t('rules.p3Title') }}
            ol
              li(v-for="item in textToList($t('rules.p3'))" 
                 v-html="item")
          .col-sm-4
            router-link.btn.red(to="/register") 前往報名
         

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
    textToList(text){
      return (""+text).replace(/[0-9]\.[\t\n]{0,3}/g,"").split("\n").filter(o=>o)
    }
  }
}
</script>

<style lang="sass">
@import "../../assets/_mixins.sass"

</style>
