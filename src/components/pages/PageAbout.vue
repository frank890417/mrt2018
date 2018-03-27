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

    h1.decor {{testtext}}
</template>

<script>
import {mapState,mapMutations,mapActions} from 'vuex'
import $ from 'jquery'
export default {
  data(){
    return {
      testtext: "Taipei soundscope",
      showtext: ""
    }
  },
  mounted(){
    // setInterval(()=>{ this.generateShowtext() } ,500)
  },
  computed:{
    testtext(){
      
    }
  },
  methods:{
    generateShowtext(){
      let temp = ""
      this.testtext.split("").forEach(t=>{
        if (Math.random()<0.2){
          temp+="-"
        }else{
          temp+=t
        }
      })
      this.showtext=temp
    }
  }
}
</script>

<style lang="sass">
@import "../../assets/_mixins.sass"
.page-about
  overflow: hidden
  background-image: url(/static/img/bg2.svg)
  background-size: 100% auto
  background-position: 0 500px
  h1.decor
    font-size: 300px
    font-weight: 700
    position: absolute
    bottom: 0px
    left: 0
    // opacity: 0.1
    white-space: nowrap
    line-height: 1.1
</style>
