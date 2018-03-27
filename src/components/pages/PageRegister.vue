<template lang="pug">
  .page.page-register.color.red
    section.sectionHero
      .container
        .row
          .col-sm-3
            h3.title-eng.color.white {{ $t('register.engtitle') }}
            h1.title  {{ $t('register.title') }}
            p(v-html=" $t('register.description') ")
            //- pre {{registData}}
          .col-sm-9.col-form
            
            ul.navTab
              li(@click="toFormPart(0)",:class="{active: formPart==0}") 1. 個人資料
              li(@click="toFormPart(1)",:class="{active: formPart==1}")  2. 創作論述
              li(@click="toFormPart(2)",:class="{active: formPart==2}")  3. 上傳作品
              li(@click="toFormPart(3)",:class="{active: formPart==3}")  4. 上傳同意書

            el-form(label-width="100px")
              .container(v-if="formPart==0")
                .btn(@click="creator_count_change(-1)") -
                label 創作者人數
                el-form-item  
                  el-input(v-model="registData.personCount",  type="number")
                .btn(@click="creator_count_change(1)") +
                hr
                .row(v-for="(p,pid) in parseInt(registData.personCount)")
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
                    el-form-item(label="居住城市")  
                      el-input(v-model="registData.person[pid].city")
                    el-form-item(label="確定可參加 3 天工作坊?")  
                      el-radio(v-model="registData.person[pid].attend", :value="true")
                      el-radio(v-model="registData.person[pid].attend", :value="false")
                  .col-sm-12
                    hr
                .btn.btn-default.btn-next.red(@click="nextStep") 下一步

              .container(v-if="formPart==1")
                p 從本次選定之 10 個捷運站內挑選 1 至 3 個捷運站進行該捷運站的人文、地理的特性認知及相對應的音樂創作方向論述
                div(v-for="(c,cid) in parseInt(registData.conceptCount)")
                  el-form-item(:label="'站體'+ (cid+1)")  
                    el-select(v-model="registData.concepts[cid].target")
                      el-option(v-for="op in stationsOptions"
                                :value="op" ) {{op}}
                  el-form-item(label="論述", v-if="registData.concepts[cid].target")  
                    el-input(v-model="registData.concepts[cid].content",
                              type="textarea", placeholder="100字內")
                  hr
                .btn.btn-default.btn-next.red(@click="nextStep") 下一步

              .container(v-if="formPart==2")
                ul
                  li 繳交作品可為環境音樂提案作品、演奏演唱、配樂或其他音樂創作或改做作品。曲風、形式、配器不限,需註明原創或改做作品。
                  li 提供針對本次徵選之十站站體音樂 demo 者享有加分鼓勵(評分項目之音樂提案 10%)。
                  li 1-3 首作品(至多 3 首),每首⻑度不超過 5 分鐘。
                  li 以 MP3、192kbps 以上、stereo 規格上傳。
                  li 檔案大小勿超過 10MB。
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
                hr
                .btn.btn-default.btn-next.red(@click="nextStep") 下一步


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
    ...mapState(['stations']),
    stationsOptions(){
      return this.stations.map(s=>s.name)
    }
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
  // background-image: url(/static/img/ma p-01.svg)
  background-size: contain
  background-position: center center
  background-repeat: no-repeat
  background-attachment: fixed
  .el-form-item
    margin-bottom: 10px
  .navTab
    display: flex
    justify-content: center
    align-items: center
    list-style: none
    padding: 0
    
    li
      border-bottom: solid 8px rgba(white,0.5) 
      flex: 1
      text-align: center
      margin-right: 10px
      cursor: pointer
      font-size: 20px
      font-weight: 600
      &:last-child
        margin-right: 0
      &.active,&:hover
        border-bottom: solid 8px rgba(white,1)
  .el-form
    background-color: $colorWhite
    color: black
    padding: 50px 0px
  .el-select,.el-input,.el-textarea
    width: 100%
  input,textarea
    border: solid 2px #666
    width: 100%
    background-color: transparent
    &:focus
      border: solid 2px $colorRed

  .col-form
    margin-top: 50px
  .btn-send
    display: block
    width: 100%
</style>
