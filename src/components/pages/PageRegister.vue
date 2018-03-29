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
              li(@click="toFormPart(0)",:class="{active: formPart==0}") 1. {{  $t('register.stage1') }}
              li(@click="toFormPart(1)",:class="{active: formPart==1}") 2. {{  $t('register.stage2') }}
              li(@click="toFormPart(2)",:class="{active: formPart==2}") 3. {{  $t('register.stage3') }}
              li(@click="toFormPart(3)",:class="{active: formPart==3}") 4. {{  $t('register.stage4') }}

            el-form#regist_form(label-width="100px", label-position="left", action="http://api.taipeisoundscape.com/registwork2018", method="post",enctype="multipart/form-data")
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
                    h4 {{ $t('register.s1.label_creator') }} {{pid+1}}.<br> {{registData.person[pid].name}}
                  .col-sm-10
                    el-form-item(:label="$t('register.s1.label_name')", placeholder="")  
                      el-input(v-model="registData.person[pid].name", :name="'creator_'+pid+'_name'" :data-require="$t('register.s1.label_name')")
                    el-form-item(:label="$t('register.s1.label_gender')")  
                      el-radio(v-model="registData.person[pid].gender" label="男", :name="'creator_'+pid+'_gender'") {{ $t("register.s1.label_male") }}
                      el-radio(v-model="registData.person[pid].gender" label="女", :name="'creator_'+pid+'_gender'") {{ $t("register.s1.label_female") }}
                      el-radio(v-model="registData.person[pid].gender" label="不公開", :name="'creator_'+pid+'_gender'") {{ $t("register.s1.label_hidden") }}
                    el-form-item(:label="$t('register.s1.label_age')")  
                      el-input(v-model="registData.person[pid].age",
                                :placeholder="$t('register.s1.label_under')",
                                :name="'creator_'+pid+'_age'",
                                :data-require="$t('register.s1.label_age')"
                                type="number")
                    el-form-item(:label="$t('register.s1.label_birthday')")  
                      el-date-picker(v-model="registData.person[pid].birthday",
                                :name="'creator_'+pid+'_birthday'" :data-require="$t('register.s1.label_birthday')")
                    el-form-item(:label="$t('register.s1.label_tel')")   
                      el-input(v-model="registData.person[pid].phone", 
                                placeholder="09xx-xxx-xxx / 02-xxxx-xxxx",
                                :name="'creator_'+pid+'_phone'" :data-require="$t('register.s1.label_tel')")
                    el-form-item(:label="$t('register.s1.label_mail')")  
                      el-input(v-model="registData.person[pid].mail", placeholder="yourmail@example.com",
                                :name="'creator_'+pid+'_mail'" :data-require="$t('register.s1.label_mail')")
                    el-form-item(:label="$t('register.s1.label_address')")  
                      el-input(v-model="registData.person[pid].address", placeholder="e.g. 台北市 / Taipei City",
                                :name="'creator_'+pid+'_address'" :data-require="$t('register.s1.label_address')")
                    el-form-item(:label="$t('register.s1.label_workshop')")  
                      label {{ $t("register.s1.label_workshop_ask") }} &nbsp;&nbsp;&nbsp;
                      el-radio(v-model="registData.person[pid].attend_workshop", :label="true",
                                :name="'creator_'+pid+'_attend_workshop'") {{ $t("register.s1.label_workshop_yes") }}
                      el-radio(v-model="registData.person[pid].attend_workshop", :label="false",
                                :name="'creator_'+pid+'_attend_workshop'") {{ $t("register.s1.label_workshop_no") }}
                  .col-sm-12
                    hr
                .btn.btn-default.btn-next.red.float-right(@click="nextStep") {{ $t("register.btn_prev") }}

              .container(v-show="formPart==1")
                .row
                  .col-sm-12
                    p {{ $t("register.s2.description") }}
                div.row(v-for="(c,cid) in parseInt(registData.conceptCount)")
                  .col-sm-12
                    el-form-item(:label="$t('register.s2.label_station')+ (cid+1)")  
                      el-select(v-model="registData.concepts[cid].target", 
                        :placeholder="$t('register.s2.label_select')",
                        :name="'concept_'+cid+'_target'" 
                        :data-require="$t('register.s2.label_station')+ (cid+1)",)
                        el-option(v-for="op in stations"
                                  :value="op.name" ) {{op.name}}
                    el-form-item(:label="$t('register.s2.label_content')", v-if="registData.concepts[cid].target")  
                      el-input(v-model="registData.concepts[cid].content",:name="'concept_'+cid+'_content'"
                                type="textarea", :placeholder="$t('register.s2.label_content_max')"
                                , rows=5 :data-require="$t('register.s2.label_station')")
                    hr
                .btn.btn-default.btn-next.red(@click="prevStep") {{ $t("register.btn_prev") }}
                .btn.btn-default.btn-next.red.float-right(@click="nextStep") {{ $t("register.btn_next") }}

              .container(v-show="formPart==2")
                .row
                  .col-sm-12
                    p(v-html="$t('register.memo')")
                .row(v-for="(w,wid) in parseInt(registData.workCount)")
                  .col-sm-2
                    h4 {{ $t('register.s3.label_work') }} {{wid+1}}.
                  .col-sm-10
                    el-form-item(:label="$t('register.s3.label_name')")  
                      el-input(v-model="registData.works[wid].name",:name="'work_'+wid+'_name'")
                    el-form-item(:label="$t('register.s3.label_description')")  
                      el-input(v-model="registData.works[wid].content",:name="'work_'+wid+'_content'",type="textarea")
                    el-form-item(:label="$t('register.s3.label_upload')",v-if="wid==0")  
                      input(type="file",:name="'work_'+wid+'_file'" :data-require ="$t('register.s3.label_upload')",data-requiretype="mp3")
                    el-form-item(:label="$t('register.s3.label_upload')",v-else)  
                      input(type="file",:name="'work_'+wid+'_file'",data-requiretype="mp3")
                  .col-sm-12
                    hr

                .btn.btn-default.btn-next.red(@click="prevStep") {{ $t("register.btn_next") }}
                .btn.btn-default.btn-next.red.float-right(@click="nextStep") {{ $t("register.btn_prev") }}


              .container(v-show="formPart==3")
                .row
                  .col-sm-12
                    p {{ $t('register.s4.label_upload') }}
                    el-form-item(v-for="(p,pid) in parseInt(registData.personCount)",
                                  :label="$t('register.s4.label_agreement')+(pid+1)+' '+registData.person[pid].name" 
                                  label-width="200px")  
                      input(type="file",:name="'creator_'+(pid+1)+'_agreement_file'" 
                        :data-require="$t('register.s4.label_agreement')+(pid+1)+' '+registData.person[pid].name +$t('register.s4.label_upload') ", data-requiretype="pdf")
                    hr
                    span {{ $t('register.s4.label_confirm')  }}
                      el-checkbox
                    p.error_msg(v-html="error_msg")
                    .btn.red.btn-send(@click="check_and_submit") {{ $t('register.s4.label_send') }}



</template>

<script>
import {mapState,mapMutations,mapActions} from 'vuex'
import $ from 'jquery'
export default {
  data(){
    return {
      formPart: 0,
      error_msg: "",
      registData: {
        personCount: 1,
        conceptCount: 3,
        workCount: 3,
        person: [{},{},{},{},{},{},{},{},{},{}],
        concepts: [{},{},{},{}],
        works: [{},{},{}],
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
    // sendData(){
    //   this.$message("send data")
    //   console.log($("form").serialize())
    // },
    check_and_submit: function(){
      var check=true;
      this.error_msg="";
      var vobj=this;
      $("[data-require]").each(function(index,obj){
        if ($(obj).val()=="" && $(obj).children("input").val()=="" ){
          vobj.error_msg+=$(obj).attr("data-require")+" 需填寫<br>";
          check=false;
        }
        if ($(obj).attr("type")=="file"){
            if (($(obj).val().split(".").slice(-1)+"").toLowerCase()!= $(obj).attr("data-requiretype")){
              vobj.error_msg+=$(obj).attr("data-require")+" 檔案格式錯誤! 需為"+$(obj).attr("data-requiretype")+"<br>";
              check=false;
            }
        }
      });
      

      if (this.error_msg!=""){
        this.error_msg="[資料不完整]<br>"+this.error_msg;
      }
      console.log(this.error_msg);
      if (check){
        $("#regist_form").submit();
        $(".submit_regist_form_btn").text("傳送中...");
      }else{
        $(".submit_regist_form_btn").text("請確認後重新送出");
      }
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
  .error_msg
    color: $colorRed
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
