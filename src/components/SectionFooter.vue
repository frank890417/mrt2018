<template lang="pug">
.section-footer
  .container
    .row
      .col-md-2.col-sm-12
        .colname {{ $t('footer.sponsor') }}
        br
        a.data(href='https://www.culture.gov.taipei/', target='_blank', title='前往網站')
          img(src='http://api.taipeisoundscape.com/img/icon_company_1.svg', alt='')
      .col-md-2.col-sm-12
        .colname  {{ $t('footer.co_organizer') }}
        br
        a.data(href='https://www.culture.gov.taipei/', target='_blank', title='前往網站')
          img(src='http://api.taipeisoundscape.com/img/icon_company_1a.svg', alt='')
      .col-md-3.col-sm-12
        .colname  {{ $t('footer.implementer') }}
        br
        a.data(href='http://www.harvestmusician.com/', target='_blank', title='前往網站')
          img(src='http://api.taipeisoundscape.com/img/icon_company_2.svg', alt='')
        br
        span(v-html="$t('footer.contact.label')")
        //- br
        //- span
        //-   | 音樂、聲音製作: 
        //-   a(href='https://www.facebook.com/profile.php?id=1674474496', target='_blank', style='color: black') 沈宣萱
      .col-md-3.col-sm-12
        .colname  {{ $t('footer.cooperative_firm') }}
        br
        a.data(href='http://www.megaforce.tw/', target='_blank', title='前往網站')
          img(src='http://api.taipeisoundscape.com/img/icon_company_3.svg', alt='')
        span(style="white-space: nowrap;") {{ $t('footer.company.union' ) }}
        br
        a.data(href='http://www.mcu.org.tw/', target='_blank', title='前往網站' )
          img(src='http://api.taipeisoundscape.com/img/icon_company_4.png', alt='')
        span(style="white-space: nowrap;")              {{ $t('footer.company.mega' ) }}
      .col-md-2.col-sm-12
        .colname  {{ $t('footer.label_website') }}
        br
        a.data(href='http://monoame.com/', target='_blank', title='前往網站')
          img(src='http://api.taipeisoundscape.com/img/icon_company_5.svg', alt='')
        span(style="white-space: nowrap;")              {{  $t('footer.company.mono' ) }}

</template>

<script>
export default {

}
</script>

<style lang="sass">
@import "../assets/_mixins.sass"

.section-footer
  background-color: #fff
  padding: 50px
  text-align: left
  padding-top: 50px
  padding-bottom: 50px
  .colname 
     margin-top: 40px
     font-weight: 600
     font-size: 1.1rem
  img
    height: 50px
    max-width: 100%
  +rwd_sm
    padding: 20px
</style>
