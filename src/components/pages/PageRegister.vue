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
          .col-sm-9.col-form
            
            ul.navTab
              li(@click="toFormPart(0)",:class="{active: formPart==0}") 1. 個人資料
              li(@click="toFormPart(1)",:class="{active: formPart==1}")  2. 創作論述
              li(@click="toFormPart(2)",:class="{active: formPart==2}")  3. 上傳作品
              li(@click="toFormPart(3)",:class="{active: formPart==3}")  4. 上傳同意書

            el-form(label-width="100px")
              .container(v-if="formPart==0")
                .btn(@click="creator_count_change(-1)") -
                el-form-item(label="創作者人數")  
                  el-input(v-model="registData.personCount",  type="number")
                .btn(@click="creator_count_change(1)") +
                hr
                div.row(v-for="(p,pid) in parseInt(registData.personCount)")
                  .col-sm-2
                    h4 創作人{{pid+1}}. {{registData.person[pid].name}}
                  .col-sm-10
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
                .btn.btn-default.btn-next.grey(@click="nextStep") 下一步

              .container(v-if="formPart==1")
                div(v-for="(c,cid) in parseInt(registData.conceptCount)")
                el-form-item(label="站體")  
                  el-select(v-model="registData.concepts[cid].target")
                el-form-item(label="論述", v-if="registData.concepts[cid].target")  
                  el-input(v-model="registData.concepts[cid].content")
                .btn.btn-default.btn-next.grey(@click="nextStep") 下一步

              .container(v-if="formPart==2")
                p 提交音樂作品，可為環境音樂提案作品、演奏演唱、配樂或其他音樂創作作品。<br>提供針對本次徵選之十站站體音樂demo 者享有加分鼓勵（評選標準中之音樂提案10%）
                el-form-item(label="上傳作品1")  
                  el-input(v-model="registData.works[0]")
                el-form-item(label="上傳作品2")  
                  el-input(v-model="registData.works[1]")
                el-form-item(label="上傳作品3")  
                  el-input(v-model="registData.works[2]")
                el-form-item(label="作品名稱")  
                  el-input(v-model="registData.works[0].name")
                el-form-item(label="作品說明")  
                  el-input(v-model="registData.works[0].content")
                p(v-html="$t('memo') ")
                .btn.btn-default.btn-next.grey(@click="nextStep") 下一步


              .container(v-if="formPart==3")
                p 上傳同意書
                el-form-item(label="同意書-名字" 
                              v-for="(p,pid) in parseInt(registData.personCount)")  
                  el-input(v-model="registData.person[pid].file")
                hr
                span 我已確認作品與資訊無誤 
                  el-checkbox
                .btn.red.btn-send(@click="sendData") 送出報名資料



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
        concepts: [{},{},{},{}],
        works: [{},{},{}]
      }
    }
  },
  mounted(){

  },
  computed:{

  },
  methods:{
    creator_count_change(delta){
        if (this.registData.personCount>=1 && delta>0){
            this.registData.personCount+=delta;
        }else if (this.registData.personCount>1 && delta<0){
            this.registData.personCount+=delta;
        }
    },
    toFormPart(value){
      this.formPart=value
    },
    nextStep(){
      this.formPart=(this.formPart+1)
    },
    sendData(){
      this.$message("傳送資料！")
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
      font-size: 20px
      font-weight: 600
      &.active,&:hover
        border-bottom: solid 8px rgba(white,1)
  .el-form
    background-color: $colorWhite
    color: black
    padding: 50px 20px
  .col-form
    margin-top: 50px
  .btn-send
    display: block
    width: 100%
</style>
