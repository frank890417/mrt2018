<template lang="pug">
  .page.page-rules.color.white
    section.sectionHero
      .container
        .row
          .col-sm-12
            h3.title-eng {{ $t('rules.title_eng') }}
            h1.title  {{ $t('rules.title') }}
    section.sectionStyle
      div(v-html=" $t('rules.content') ")
      //- .container
      //- div(v-html="rules.content")
      //- .container
        .row
          .col-md-6.col-sm-12
            h2 1.徵件資訊
            ol
              li 本次活動將選出 10 組創作者，入選者必須參與由主辦單位舉辦之聲音地景工作坊，在充分了解環境音樂的設計歷程後，完成指定之捷運站體音樂創作。
              li 十個目標站體：南港站、⻄門站、北門站、中山站、圓山站、台北 101 站、劍南路站、大湖公園站、行天宮站、大橋頭站。
              li 徵件報名期間：2018 年 3 月 31 日至 2018 年 5 月 15 日17：00 截止。
              li 入選名單公佈：2018 年 6 月 5 日 中午 12：00 於活動網站公佈入選名單。
          .col-md-6.col-sm-12
            h2 2.報名資格
            ol
              li 不限國籍，海內外音樂創作人均可參加報名。
              li 可以「個人」或「團體(不限人數)」方式報名，惟團體報名須載明主要創作人。
              li 每位創作人(包含主要創作人及共同創作人)皆須提交「徵選同意書」之數位檔案予承辦單位，入選後提交正本，以作為原創作品確認程序。若未能提出本款文件者，視同放棄晉級資格，評審團將依遞補程序處理。
              li 未滿 18 歲之徵選者，須提交「法定監護人同意書」之檔案予承辦單位。
              li 入選者需完整參與聲音地景工作坊與完成正式站體環境音樂創作。
          .col-md-12.col-sm-12
            h2 3.報名方式
            ol
              li 前往活動網站 www.taipeisoundscape.com 報名，下載同意書並詳讀相關資料。
              li 捷運站體環境音樂創作論述：從本次選定之 10 個捷運站內挑選 1 至 3 個捷運站進行該捷運站的人文、地理的特性認知及相對應的音樂創作方向論述(每站 100 字內)
              li 提交音樂作品：
                ul
                  li 可為環境音樂提案作品、演奏演唱、配樂或其他音樂創作或改做作品。曲風、形式、配器不限，需註明原創或改做作品。
                  li 1-3 首作品(至多 3 首)，每首⻑度不超過 5 分鐘。
                  li 以 MP3、192kbps 以上、stereo 規格上傳。
                  li 檔案大小勿超過 10MB。
                  li 提供針對本次徵選之十站站體音樂 demo 者享有加分鼓勵(評分項目音樂提案 10%)
              li 報名需提供
                ul
                  li 「徵選同意書」(pdf 檔或影像檔)
                  li 「站體音樂創作論述」
                  li 「音樂作品」
                p 備妥上述資料並上傳至網站報名頁面，報名成功將收到電子郵件回覆報名審查確認通知，若未收到報名確認信函，可利用E-mail( info@taipeisoundscape.com )或電話(洽 02-2765-2969 李小姐)與活動窗口聯繫。
          .col-md-6.col-sm-12
            h2 4.獎勵方式
            ol
              li 獎勵方式
                ul
                  li 正選名額：以 10 名(組)為原則，每名(組)可獲得新台幣三萬五千元以茲鼓勵。
                  li 備選名額：以 3 名(組)為原則，可一同參與聲音地景工作坊，若正選創作者因故無法出席工作坊或無法參與後續站體環境音樂創作，將可替補為正選名額(依備選名次)。
                  li 正選優勝者得與專業製作人重新製作作品(含製作方向討論、於強力錄音室重新混音等)，成品經捷運站體實地測試後將於站內播放。
              li 聲音地景工作坊
                p 為便入選創作者了解「臺北聲音地景計畫」理念與探索何謂環境音樂，將邀請專家學者及歷屆創作人分享相關案例及經驗，並走訪捷運站，實際感受站體空間及氛圍，以利進行後續的創作。
                ul
                  li 日期：2018 年 6 月 15日(五)-2018 年 6 月 17 日(日)
                  li 地點：台北市音樂美中心(台北市信義區光復南路 133 號共創合作社南 5)
          .col-md-6.col-sm-12
            h2 5.評審方式
            ol
              li 邀請音樂創作、錄音工程、配樂等相關領域之專業人士擔任評審。試後將於站內播放。
              li 評分項目與比例：
                ul
                  li 音樂創作能力(50%)：作曲、編曲、混音、錄音等專業技術評分
                  li 站體環境音樂創作論述(40%)：依照徵選者所提交針對 10 個捷運站選出 1-3 個站體的文字敘述，判斷其規劃使用之配器、對於站體環境音樂的理解，以及音樂創作方向與捷運站的人文、地理特性關之聯性與呈現方式是否可行進行評分。
                  li 音樂提案(10%)：針對本次 10 個站之站體環境音樂先行製作 demo 者，享有本項目之加分
          .col-md-12.col-sm-12
            h2 6.注意事項
            ol
              li 徵選者可以個人或團體(聯合創作)方式徵選。團體徵選(聯合創作)每位創作者皆需登錄資料，並標註主要創作人，即為此徵選作品之聯絡人(建議以著作權擁有比例較高者擔任)。
              li 徵選者保證於本次活動所留存之資料為正確且真實之個人資料，包含但不限於姓名、國籍、年齡、聯絡電話及電子信箱等。若徵選者所留存資料有任何不實，主辦單位有權取消其徵選資格。
              li 徵選者若對本辦法有任何問題，需於徵選截止前三日透過網站以電子郵件方式向活動窗口提出。經入選名單公佈後，應服從評審評分結果。
              li 經主辦單位及評審認定徵選作品未依活動辦法之指定條件及格式進行報名時，該徵選作 品視同不符合徵選資格。
              li 依中華⺠國稅法規定，獎金價值超過新台幣 1，001 元(含)以上時，須由承辦單位於年終開立扣繳憑單;獎金價值超過新台幣20，000 元(含)以上時，得獎者需負擔贈品價值 10%之稅金，由主辦單位代收，且於年終時寄發該所得扣繳憑單，由得獎者憑此申報年度綜合所得稅。
          .col-md-12.col-sm-12
            br
            br
            br
          .col-md-6.offset-md-3.col-sm-12.text-center
            h4 本活動事項如有疑義或其他未盡事宜，主辦單位保留隨時修改本活動辦法及解釋之權利，詳細資訊參見附件徵件辦法。  
            br
            router-link.btn.red(to="/register") 前往報名

          //- .col-sm-6
          //-   h4.musicBar 
          //-   h2  {{ $t('rules.p1Title') }}
          //-   ol
          //-     li(v-for="item in textToList($t('rules.p1'))" 
          //-        v-html="item")
          //- .col-sm-6
          //-   h4.musicBar
          //-   h2  {{ $t('rules.p2Title') }}
          //-   ol
          //-     li(v-for="item in textToList($t('rules.p2'))" 
          //-        v-html="item")
          //- .col-sm-8
          //-   h4.musicBar
          //-   h2  {{ $t('rules.p3Title') }}
          //-   ol
          //-     li(v-for="item in textToList($t('rules.p3'))" 
          //-        v-html="item")
      .container
        .row
          .col-sm-12.text-center
            router-link.btn.red(to="/register") {{ $t('rules.register') }}
         

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
    textToList(text){
      return (""+text).replace(/[0-9]\.[\t\n]{0,3}/g,"").split("\n").filter(o=>o)
    }
  }
}
</script>

<style lang="sass">
@import "../../assets/_mixins.sass"
.page-rules
  h2
    margin-top: 40px
    font-size: 1.5em
    &:after
      display: block
      content: ''
      +size(50px,8px)
      background-color: $colorRed
      margin-top: 10px
      margin-bottom: 20px

  
</style>
