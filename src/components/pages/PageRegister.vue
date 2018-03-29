<template lang="pug">
  .page.page-register.color.red
    section.sectionHero
      .container
        router-link.btn-back(to="/rules") 
            i.fa.fa-undo
            span Back
        .row
          .col-sm-3
            h3.title-eng.color.white {{ $t('register.engtitle') }}
            h1.title  {{ $t('register.title') }}
            p(v-html=" $t('register.description') ")
            //- a.btn.white(href="", target="_blank") 
              i.fa.fa-file
              span &nbsp;&nbsp;
            br
            a.btn.white(:href="$t('register.agreement_file_link')", target="_blank") 
              i.fa.fa-file
              span &nbsp;&nbsp; {{ $t('register.agreement_file') }}
            //- pre {{registData}}
          .col-sm-9.col-form
            
            ul.navTab
              li(@click="toFormPart(0)",:class="{active: formPart==0}") 1. 個人資料
              li(@click="toFormPart(1)",:class="{active: formPart==1}") 2. 創作論述
              li(@click="toFormPart(2)",:class="{active: formPart==2}") 3. 上傳作品
              li(@click="toFormPart(3)",:class="{active: formPart==3}") 4. 上傳同意書

            el-form(label-width="100px", label-position="left", action="http://api.taipeisoundscape.com/registwork2018", method="post",enctype="multipart/form-data")
              .container(v-show="formPart==0")
                .row
                  .col-sm-12
                    label {{ $t('register.s1.label_count') }}:
                    span
                      .btn(@click="creator_count_change(-1)") -
                      span.number {{registData.personCount}}
                      input(type="hidden",name="creator_count", v-model="registData.personCount")
                      .btn(@click="creator_count_change(1)") +
                    hr
                .row(v-for="(p,pid) in parseInt(registData.personCount)")
                  .col-sm-2
                    h4 創作人{{pid+1}}.<br> {{registData.person[pid].name}}
                  .col-sm-10
                    el-form-item(:label="$t('register.s1.label_name')", placeholder="")  
                      el-input(v-model="registData.person[pid].name", :name="'creator_'+pid+'_name'" required)
                    el-form-item(:label="$t('register.s1.label_gender')")  
                      el-radio(v-model="registData.person[pid].gender" label="男", :name="'creator_'+pid+'_gender'") {{ $t("register.s1.label_male") }}
                      el-radio(v-model="registData.person[pid].gender" label="女", :name="'creator_'+pid+'_gender'") {{ $t("register.s1.label_female") }}
                      el-radio(v-model="registData.person[pid].gender" label="不公開", :name="'creator_'+pid+'_gender'") {{ $t("register.s1.label_hidden") }}
                    el-form-item(:label="$t('register.s1.label_age')")  
                      el-input(v-model="registData.person[pid].age",
                                placeholder="未滿18歲需填寫法定監護人同意書",
                                :name="'creator_'+pid+'_age'",
                                type="number" required)
                    el-form-item(:label="$t('register.s1.label_birthday')")  
                      el-date-picker(v-model="registData.person[pid].birthday",
                                :name="'creator_'+pid+'_birthday'" required)
                    el-form-item(:label="$t('register.s1.label_tel')")   
                      el-input(v-model="registData.person[pid].phone", 
                                placeholder="09xx-xxx-xxx / 02-xxxx-xxxx",
                                :name="'creator_'+pid+'_phone'" required)
                    el-form-item(:label="$t('register.s1.label_mail')")  
                      el-input(v-model="registData.person[pid].mail", placeholder="yourmail@example.com",
                                :name="'creator_'+pid+'_mail'" required)
                    el-form-item(:label="$t('register.s1.label_address')")  
                      el-input(v-model="registData.person[pid].address", placeholder="e.g. 台北市",
                                :name="'creator_'+pid+'_address'" required)
                    el-form-item(:label="$t('register.s1.label_workshop')")  
                      label {{ $t("register.s1.label_workshop_ask") }} &nbsp;&nbsp;&nbsp;
                      el-radio(v-model="registData.person[pid].attend_workshop", :label="true",
                                :name="'creator_'+pid+'_attend_workshop'" required) {{ $t("register.s1.label_workshop_yes") }}
                      el-radio(v-model="registData.person[pid].attend_workshop", :label="false",
                                :name="'creator_'+pid+'_attend_workshop'" required) {{ $t("register.s1.label_workshop_no") }}
                  .col-sm-12
                    hr
                .btn.btn-default.btn-next.red.float-right(@click="nextStep") {{ $t("register.btn_prev") }}

              .container(v-show="formPart==1")
                .row
                  .col-sm-12
                    p 從本次選定之 10 個捷運站內挑選 1 至 3 個捷運站進行該捷運站的人文、地理的特性認知及相對應的音樂創作方向論述
                div.row(v-for="(c,cid) in parseInt(registData.conceptCount)")
                  .col-sm-12
                    el-form-item(:label="'站體'+ (cid+1)")  
                      el-select(v-model="registData.concepts[cid].target", placeholder="請選擇站體",:name="'concept_'+cid+'_target'" required)
                        el-option(v-for="op in stationsOptions"
                                  :value="op" ) {{op}}
                    el-form-item(label="論述", v-if="registData.concepts[cid].target")  
                      el-input(v-model="registData.concepts[cid].content",:name="'concept_'+cid+'_content'"
                                type="textarea", placeholder="100字內", rows=5 required)
                    hr
                .btn.btn-default.btn-next.red(@click="prevStep") {{ $t("register.btn_next") }}
                .btn.btn-default.btn-next.red.float-right(@click="nextStep") {{ $t("register.btn_prev") }}

              .container(v-show="formPart==2")
                .row
                  .col-sm-12
                    ul
                      li 繳交作品可為環境音樂提案作品、演奏演唱、配樂或其他音樂創作或改做作品。曲風、形式、配器不限,需註明原創或改做作品。
                      li 提供針對本次徵選之十站站體音樂 demo 者享有加分鼓勵(評分項目之音樂提案 10%)。
                      li 1-3 首作品(至多 3 首),每首⻑度不超過 5 分鐘。
                      li 以 MP3、192kbps 以上、stereo 規格上傳。
                      li 檔案大小勿超過 10MB。
                .row(v-for="(w,wid) in parseInt(registData.workCount)")
                  .col-sm-2
                    h4 作品{{wid+1}}.
                  .col-sm-10
                    el-form-item(label="作品名稱")  
                      el-input(v-model="registData.works[wid].name",:name="'work_'+wid+'_name'")
                    el-form-item(label="作品說明")  
                      el-input(v-model="registData.works[wid].content",:name="'work_'+wid+'_content'",type="textarea")
                    el-form-item(label="上傳作品")  
                      input(type="file",:name="'work_'+wid+'_file'" required)
                  .col-sm-12
                    hr

                .btn.btn-default.btn-next.red(@click="prevStep") {{ $t("register.btn_next") }}
                .btn.btn-default.btn-next.red.float-right(@click="nextStep") {{ $t("register.btn_prev") }}


              .container(v-show="formPart==3")
                .row
                  .col-sm-12
                    p 上傳同意書
                    el-form-item(v-for="(p,pid) in parseInt(registData.personCount)",
                                  :label="'同意書'+pid+' '+registData.person[pid].name" 
                                  label-width="200px")  
                      input(type="file",:name="'creator_'+pid+'_agreement_file'" required)
                    hr
                    span 我已確認作品與資訊無誤 
                      el-checkbox
                    button.btn.red.btn-send(type="submit") 送出報名資料



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
        workCount: 3,
        person: [{},{},{},{},{},{},{},{},{},{}],
        concepts: [{},{},{},{}],
        works: [{},{},{}]
      }
    }
  },
  mounted(){

  },
  computed:{
    // ...mapState(['stations']),
    stations(){
      return this.$t("stations")
    },
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
    prevStep(){
      this.formPart=(this.formPart-1)
    },
    sendData(){
      this.$message("傳送資料！")
      console.log($("form").serialize())
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
      border-bottom: solid 10px rgba(white,0.4) 
      flex: 1
      text-align: center
      margin-right: 10px
      cursor: pointer
      font-size: 20px
      font-weight: 600
      +trans
      opacity: 0.6
      &:last-child
        margin-right: 0
      &:hover
        border-bottom: solid 10px rgba(white,0.6)
        opacity: 0.8
      &.active
        border-bottom: solid 10px rgba(white,1)
        opacity: 1
  .el-form
    background-color: $colorWhite
    color: black
    padding: 50px 0px
  .el-select,.el-input,.el-textarea
    width: 100%
  .number
    margin: 10px
    font-size: 20px
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
