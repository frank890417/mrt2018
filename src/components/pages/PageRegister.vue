<template lang="pug">
  .page.page-register.color.red
    section.sectionHero
      .container
        .row
          .col-sm-3
            h3.color.white {{ $t('register.engtitle') }}
            h1.title  {{ $t('register.title') }}
            p(v-html=" $t('register.description') ")
            pre {{registData}}
          .col-sm-9
            
            ul.navTab
              li(@click="toFormPart(0)") 1. 個人資料
              li(@click="toFormPart(1)")  2. 創作論述
              li(@click="toFormPart(2)")  3. 上傳作品
              li(@click="toFormPart(3)")  4. 上傳同意書

            el-form.form(label-width="50px")
              .container(v-if="formPart==0")
                el-input(v-model="registData.personCount",  type="number")
                hr
                div(v-for="(p,pid) in registData.personCount")
                  h4 創作人{{pid+1}}. {{registData.person[pid].name}}
                  el-form-item(label="姓名")  
                    el-input(v-model="registData.person[pid].name")
                  el-form-item(label="性別")  
                    el-input(v-model="registData.person[pid].gender")
                  el-form-item(label="年齡")  
                    el-input(v-model="registData.person[pid].age",
                              type="number")
                  el-form-item(label="電話")  
                    el-input(v-model="registData.person[pid].phone")
                  el-form-item(label="信箱")  
                    el-input(v-model="registData.person[pid].email")

              .container(v-if="formPart==1")
                div(v-for="(c,cid) in registData.conceptCount")
                el-form-item(label="站體")  
                  el-select(v-model="registData.concepts[cid].target")
                el-form-item(label="論述", v-if="registData.concepts[cid].target")  
                  el-input(v-model="registData.concepts[cid].content")


</template>

<script>
import {mapState,mapMutations,mapActions} from 'vuex'
import $ from 'jquery'
export default {
  data(){
    return {
      formPart: 0,
      registData: {
        personCount: 1,
        conceptCount: 3,
        person: [{},{},{},{},{},{},{},{},{},{}],
        concepts: [{},{},{},{}]
      }
    }
  },
  mounted(){

  },
  computed:{

  },
  methods:{
    toFormPart(value){
      this.formPart=value
    }
  }
}
</script>

<style lang="sass">
@import "../../assets/_mixins.sass"
.page-register
  background-image: url(/static/img/map-01.svg)
  background-size: contain
  background-position: center center
  background-repeat: no-repeat
  background-attachment: fixed

  .navTab
    display: flex
    justify-content: center
    align-items: center
    list-style: none
    
    li
      border-bottom: solid 8px rgba(white,0.5) 
      flex: 1
      text-align: center
      margin: 10px
      cursor: pointer
      &.active,&:hover
        border-bottom: solid 8px rgba(white,1)
  .form
    background-color: $colorWhite
    color: black
    padding: 50px

</style>
