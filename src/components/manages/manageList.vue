<template lang="pug">
  .page.page-manage-list.color.white
    section.sectionHero
      .container
        .row
          .col-sm-12
            h1.title 管理報名清單
    section.sectionStyle
      .container(v-if='!getDataError')
        .row
          .col-sm-12
            VueLazyTable(:table_data="use_registlist", :hide_table="true",dataTitle="所有報名資料")
        .row
          .col-sm-12
            h5 共有 {{ use_registlist.length }} 件報名資料
            el-table(:data="use_registlist")
              el-table-column(prop="countId",label="#",width=50)
              el-table-column(prop="id",label="序號",width=50)
              //- el-table-column(prop="creator_count",label="人數",width=40)
              el-table-column(prop="creators",label="創作者",width=200)
              //- el-table-column(prop="is18",label="是否18",width=80)
              el-table-column(prop="works",label="作品",width=250)
                template(slot-scope="scope")
                  p(v-html="scope.row.works")
              el-table-column(prop="created_at",label="報名時間",width=140)
              el-table-column(prop="updated_at",label="更新時間",width=140)
              el-table-column(prop="detail",label="詳細資料")
                template(slot-scope="scope")
                  router-link.btn.red(:to="'/manage/'+scope.row.id") 檢視資料
        .row
          .col-sm-12
            br
            br
            br
            h3 報名人資料匯出
            VueLazyTable(:table_data="creatorlist", :hide_table="true",dataTitle="報名人資料")
      .container(v-else)
        .row
          .col-sm-12
            h3 請輸入管理用密碼：
            el-input(v-model="temptoken")
            .btn.red(@click="reloadData") 確認
            //- a.btn.red(href="http://api.taipeisoundscape.com/login", target="_blank") 前往登入


</template>

<script>
import {mapState,mapMutations,mapActions} from 'vuex'
import $ from 'jquery'
import axios from 'axios'
import VueLazyTable from '../vue_lazy_table'
export default {
  data(){
    return {
      registlist: [],
      creatorlist: [],
      getDataError: false,
      temptoken: ""
    }
  },
  mounted(){
    // axios.get('http://metro2017.test/api/regist2018/all').then(res=>{
    this.loadData()
  },
  computed:{
    ...mapState(['token']),
    use_registlist(){ 
      return this.registlist.map( (o,oid)=>{
        let creatorsname = o.creators.reduce((all,creator)=>all+(all!=''?"、":'')+creator.name,"")
        let data = {
          countId: oid+1,
          ...o ,
          is18:  (o.creators[0] && o.creators[0].age>18),
          
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
              let html = "<a style='display: block' href='"+url+"' target='_blank'>"+o.name+"</a><audio controls src='"+url+"' download></audio>"
              return html
            }).join('<br>')
            
        }
        data['creators'] = creatorsname
        return data
      })
    }
  },
  methods:{
    ...mapMutations(['setToken']),
    loadData(){
      axios.get('http://api.taipeisoundscape.com/regist2018/all',{params: { token: this.token} }).then(res=>{
        console.log(res.data)
        this.$set(this,"registlist",res.data)
        // this.registlist=res.data
        this.getDataError=false
      }).catch(res=>{
        this.getDataError=true
      })

      axios.get('http://api.taipeisoundscape.com/creators2018/all',{params: { token: this.token} }).then(res=>{
        console.log(res.data)
        this.$set(this,"creatorlist",res.data)
      }).catch(res=>{
      })
    },
    reloadData(){
      this.setToken(this.temptoken)
      this.loadData()
    }

  },
  components: {
    VueLazyTable
  }
}
</script>

<style lang="sass">
@import "../../assets/_mixins.sass"
.page-manage-list
  audio
    width: 100%
</style>
