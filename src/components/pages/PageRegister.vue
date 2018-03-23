<template lang="pug">
  .page.page-test.color.red
    section.sectionHero
      .container
        .row
          .col-sm-12
            h1.title 報名表單
            p(v-html=" $t('register.description') ")
    section.sectionStyle
      .container
        .row
          .col-sm-4
            p 
         

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
