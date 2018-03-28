<template lang="pug">
  .page.page-manage-indep.color.white
    section.sectionHero
      .container
        .row
          .col-sm-12
            h1.title 報名資料 - # {{ $route.params.id }} - {{ nowdata.creators_all }}
    section.sectionStyle
      .container
        //- pre(v-html="nowdata")
        .row
          .col-sm-4
            table.table.table-default(v-for="creator in nowdata.creators")
              thead
                th 欄位
                th 內容
              tbody
                tr(v-for="(d,key) in creator")
                  td {{key}}
                  td(v-html="d")
          .col-sm-8
            table.table.table-default
              thead
                th 欄位
                th 內容
              tbody
                tr(v-for="(d,key) in nowdata")
                  td {{key}}
                  td(v-html="d")

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
        rank:創作順序;
        age,年紀;
        name,姓名;
        phone,電話;
        mail,信箱;
        address,地址;
        attend_workshop,參加工作坊;
        agreement_file,同意書;
        created_at,-;
        updated_at,-;`.split(";").map(o=>o.split(","))
    }
  },
  mounted(){

    
    // axios.get('http://metro2017.test/api/regist2018/all').then(res=>{
      
    axios.get('http://api.taipeisoundscape.com/api/regist2018/all').then(res=>{
      console.log(res.data)
      this.registlist=res.data
    })
  },
  computed:{
    nowdata(){
      return this.use_registlist.find(o=>o.id==this.$route.params.id)
    },
    use_registlist(){

      return this.registlist.map(o=>({
        ...o ,
        creators_all: o.creators.reduce((all,creator)=>all+(all!=''?"、":'')+creator.name,""),
        is18: (o.creators[0] && o.creators[0].age)>18,
        works: [
          {
            id: 0,
            name: o.work_0_name,
            content: o.work_0_content,
            file: o.work_0_file
          },{
            id: 1,
            name: o.work_1_name,
            content: o.work_1_content,
            file: o.work_1_file
          },{
            id: 2,
            name: o.work_2_name,
            content: o.work_2_content,
            file: o.work_2_file
          }
          
        ].filter(o=>o.name)
          .map(o=>{
            let url = "http://api.taipeisoundscape.com/registwork/file"+o.file
            let html = "<a href='"+url+"' target='_blank'>"+o.name+"</a><audio controls src='"+url+"' download></audio>"
            return html
          }).join('<br>')
      }))
    }
  },
  methods:{
    translateData(data,key,dict){
      let d = dict.find(o=>o[0]==key);
      if (d[1]!="-"){
        return d[1]
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
