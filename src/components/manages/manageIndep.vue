<template lang="pug">
  .page.page-manage-indep.color.white
    section.sectionHero
      .container
        .row
          .col-sm-12
            h1.title 報名資料 - # {{ $route.params.id }}

        .row
          .col-sm-12
            ul.breadcrumb
              li.breadcrumb-item 
                router-link(to="/manage") 報名資料
              li.breadcrumb-item 檢視報名資料

    section.sectionStyle
      .container
        //- pre(v-html="nowdata")
        .row
          .col-sm-4
            table.table.table-default(v-for="creator in creators")
              thead
                th 欄位
                th 內容
              tbody
                tr(v-for="(d,key) in creator", v-if='translateData(d,key,translate_c) ')
                  td {{ translateData(d,key,translate_c).key }}
                  td(v-html="translateData(d,key,translate_c).data")
          .col-sm-8
            table.table.table-default
              thead
                th(style="width: 150px") 欄位
                th 內容
              tbody
                tr(v-for="(d,key ) in nowdata", v-if='translateData(d,key,translate_all) ')
                  td {{ translateData(d,key,translate_all).key }}
                  td(v-html="translateData(d,key,translate_all).data")

            // el-table(:data="nowdata")
            //   el-table-column(prop="id",label="#",width=50)
            //   //- el-table-column(prop="creator_count",label="人數",width=40)
            //   el-table-column(prop="creators",label="創作者",width=200)
            //   el-table-column(prop="is18",label="是否18",width=80)
            //   el-table-column(prop="works",label="作品",width=250)
            //     template(slot-scope="scope")
            //       p(v-html="scope.row.works")
            //   el-table-column(prop="created_at",label="報名時間",width=140)
            //   el-table-column(prop="updated_at",label="更新時間",width=140)
            //   el-table-column(prop="detail",label="詳細資料")
            //     template(slot-scope="scope")
            //       router-link.btn.red(:to="'/manage/'+scope.row.id") 檢視資料


</template>

<script>
import {mapState,mapMutations,mapActions} from 'vuex'
import $ from 'jquery'
import axios from 'axios'
export default {
  data(){
    return {
      registlist: [],
      translate_c: `id,-;
        register_id,-;
        rank,創作順序;
        age,年紀;
        name,姓名;
        phone,電話;
        mail,信箱;
        address,地址;
        attend_workshop,參加工作坊;
        agreement_file,同意書;
        created_at,-;
        updated_at,-;
        birthday,生日;
        
        `.split(";").map(o=>o.trim().split(",")),
    translate_all: `id,-;
        uuid,-;
        register_id,報名序號;
        creator_count,創作者數量;
        concept_0_target,創作論述站體1;
        concept_0_content,創作論述內容1;
        concept_1_target,創作論述站體2;
        concept_1_content,創作論述內容2;
        concept_2_target,創作論述站體3;
        concept_2_content,創作論述內容3;
        work_0_name,作品名稱1;
        work_0_file,作品檔案1;
        work_0_content,作品說明1;
        work_1_name,作品名稱2;
        work_1_file,作品檔案2;
        work_1_content,作品說明2;
        work_2_name,作品名稱3;
        work_2_file,作品檔案3;
        work_2_content,作品說明3;
        creators,-;
        creators_all,創作者清單;
        mail,信箱;
        address,地址;
        attend_workshop,參加工作坊;
        agreement_file,同意書;
        created_at,-;
        updated_at,-;`.split(";").map(o=>o.trim().split(","))
    }
  },
  mounted(){

    
    // axios.get('http://metro2017.test/api/regist2018/all').then(res=>{
      
    axios.get('http://api.taipeisoundscape.com/regist2018/all',{params: { token: this.token} }).then(res=>{
      console.log(res.data)
      this.registlist=res.data
    })
  },
  computed:{
    ...mapState(['token']),
    nowdata(){
      return this.use_registlist.find(o=>o.id==this.$route.params.id)
    },
    creators(){
      return (( this.nowdata && this.nowdata.creators ) || [] ).map(o=>{
        let url = "http://api.taipeisoundscape.com/registwork/file"+o.agreement_file
        let html = "<a href='"+url+"' target='_blank'>同意書</a>"
        return {
          ...o,
          agreement_file: html
        }
      })

    },
    // creators_all(){
      // return this.creators.reduce((all,creator)=>all+(all!=''?"、":'')+creator.name,"")
    // },
    use_registlist(){

      let resultList= this.registlist.map(o=>({
        ...o ,
        creators_all: o.creators.reduce((all,creator)=>all+(all!=''?"、":'')+creator.name,""),
        is18: (o.creators[0] && o.creators[0].age)>18,
        // works: [
        //   {
        //     id: 0,
        //     name: o.work_0_name,
        //     content: o.work_0_content,
        //     file: o.work_0_file
        //   },{
        //     id: 1,
        //     name: o.work_1_name,
        //     content: o.work_1_content,
        //     file: o.work_1_file
        //   },{
        //     id: 2,
        //     name: o.work_2_name,
        //     content: o.work_2_content,
        //     file: o.work_2_file
        //   }
          
        // ].filter(o=>o.name)
        //   .map(o=>{
        //     let url = "http://api.taipeisoundscape.com/registwork/file"+o.file
        //     let html = "<a href='"+url+"' target='_blank'>"+o.name+"</a><audio controls src='"+url+"' download></audio>"
        //     return html
        //   }).join('<br>')
      }))

      resultList.forEach(result=>{
        console.log(result)
        Object.keys(result).forEach(key=>{

          // console.log(key)
          if (key.indexOf("work")!=-1 && key.indexOf("file")!=-1  ){
              let url = "http://api.taipeisoundscape.com/registwork/file"+result[key]
              let html = "<audio controls src='"+url+"' download></audio>"
             console.log(html)
             if (result[key]!=""){
               result[key]=html

             }
          }
          if (key.indexOf("agree")!=-1 && key.indexOf("file")!=-1  ){
              let url = "http://api.taipeisoundscape.com/registwork/file"+result[key]
              let html = "<a href='"+url+"' target='_blank'>下載</a>"
             console.log(html)
              result[key]=html
          }
        })


      })
      
      return resultList
    }
  },
  methods:{
    translateData(data,key,dict){
      let d = dict.find(o=>o[0]==key);
      if (d && d[1]){
        if (d[1]=="-"){
          return null
        }
        console.log(d)
        return {
          data,
          key: d[1]
        }
      }
      return {
        data,key
      }
    }
  }
}
</script>

<style lang="sass">
@import "../../assets/_mixins.sass"
.page-manage-list
  audio
    width: 100%
</style>
