<template lang="pug">
.section-footer
  .container
    .row
      .col-sm-2
        .colname 主辦單位
        br
        a.data(href='https://www.culture.gov.taipei/', target='_blank', title='前往網站')
          img(src='http://api.taipeisoundscape.com/img/icon_company_1.svg', alt='')
      .col-sm-2
        .colname 協辦單位
        br
        a.data(href='https://www.culture.gov.taipei/', target='_blank', title='前往網站')
          img(src='http://api.taipeisoundscape.com/img/icon_company_1a.svg', alt='')
      .col-sm-3
        .colname 承辦單位
        br
        a.data(href='http://www.harvestmusician.com/', target='_blank', title='前往網站')
          img(src='http://api.taipeisoundscape.com/img/icon_company_2.svg', alt='')
        br
        span  聯繫: +886-2-2765-2969
        br
        span
          | 音樂、聲音製作: 
          a(href='https://www.facebook.com/profile.php?id=1674474496', target='_blank', style='color: black') 沈宣萱
      .col-sm-3
        .colname 合作廠商
        br
        a.data(href='http://www.mcu.org.tw/', target='_blank', title='前往網站')
          img(src='http://api.taipeisoundscape.com/img/icon_company_4.png', alt='')
        div(style="display: inline-block") 台北市音樂創作職業工會
        br
        a.data(href='http://www.megaforce.tw/', target='_blank', title='前往網站')
          img(src='http://api.taipeisoundscape.com/img/icon_company_3.svg', alt='')
        |               強力錄音室
      .col-sm-2
        .colname 網站製作
        br
        a.data(href='http://monoame.com/', target='_blank', title='前往網站')
          img(src='http://api.taipeisoundscape.com/img/icon_company_5.svg', alt='')
        |               墨雨設計

</template>

<script>
export default {

}
</script>

<style lang="sass">
.section-footer
  background-color: #fff
  padding: 50px
  text-align: left
  img
    height: 50px
</style>
