<template lang="pug">
.menu(:class="{open: menuState}")
  router-link.staticLogo(to="/", @click="setMenuState(false)" ,
                        :style="logoStyle")
    img(src="/static/img/Logo.svg")
  .hambergur(@click="setMenuState(!menuState)")
    .icon-bar(:style="bgStyle", 
                      v-for="i in 2")
  transition(name="slice")
    .bgcuts( v-if="menuState")
      .col
      .col
  transition(name="menu")
    .fullPage(v-show="menuState")
      .langsel
        .option(@click="switchLang('en')",:class="{active: this.$i18n.locale=='en'}") EN
        .option(@click="switchLang('zh')",:class="{active: this.$i18n.locale=='zh'}") 中
      canvas.full
      //- video(src="http://taipeisoundscape.com/video/indexbgv_lower.mp4" muted autoplay loop)
      .row.row-page
        .col-sm-2
        .col-menu.col-sm-10
          .container.container-menu
            //- .row.row-search
              .col-sm-12
                input(placeholder="搜尋雜學校", v-model="tempSearchKeyword")
                
                div.clearInput(@click="searchKeyword=''")
                  i.fas.fa-search(v-show="searchKeyword==''")
                  i.fas.fa-times(v-show="searchKeyword!=''")
                
                              
              .col-sm-12
                .tags.scrollX
                  .tag(v-for="tag in tags", @click="searchKeyword=tag") {{tag}}
            .row( @click="setMenuState(false)" )
              router-link.col-sm-6(to="/about")
                .rect
                h1 {{ $t('nav.plan.title') }}
                //- img.logo(src="/static/img/NavIcon1.svg")
                h2 {{ $t('nav.plan.eng') }}
                p.nav-short-description(v-html="$t('nav.plan.content')")
              router-link.col-sm-6(to="/explore")
                //- img.logo(src="/static/img/NavIcon2.svg")
                .rect
                h1  {{ $t('nav.explore.title') }}
                h2 {{ $t('nav.explore.eng') }}
                p.nav-short-description(v-html="$t('nav.explore.content')") 繁忙的台北街頭，乘載著川流不息的人們，<br>而你，是否曾側耳傾聽那些美妙的旋律？
            
            .row(@click="setMenuState(false)" )
              router-link.col-sm-6(to="/playground")
                //- img.logo(src="/static/img/NavIcon3.svg")
                .rect
                h1  {{ $t('nav.playground.title') }}
                h2.nav-expo {{ $t('nav.playground.eng') }}
                p.nav-short-description(v-html="$t('nav.playground.content')") 在你心中，台北的「聲音」，<br>又是什麼樣子的?
              router-link.col-sm-6(to="/rules")
                //- img.logo(src="/static/img/NavIcon4.svg")
                .rect
                h1  {{ $t('nav.register.title') }}
                h2.nav-base {{ $t('nav.register.eng') }}
                p.nav-short-description(v-html="$t('nav.register.content')") 結合文化在地性、捷運站體空間，<br>創作出屬於台北的特色音樂。

            //- div.row(v-if="searchKeyword!=''" 
            //-         @click="setMenuState(false)").scrollY
            //-   newsbox.col-lg-4.col-md-6.col-sm-12(v-for="post in filteredPost", 
            //-                   :post = "post" ,
            //-                    :target="postTarget(post)",
            //-                    :key="post.title",
            //-                   :tag="post.tag"
        //- .col-member.col-sm-3
        //-   auth_panel
</template>

<script>
import {mapState,mapMutations, mapActions, mapGetters} from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      menuState: state=>state.menuState,
      posts: state => state.post.posts,
      searchKeyword: state=>state.searchKeyword
    }),
    filteredPost(){
      return this.posts.map(o=>({...o,tag: "ZA EXPO"})).filter(o=>JSON.stringify(o).indexOf(this.searchKeyword)!=-1)
    },
    bgStyle(){
      if (!this.menuState){
        return {'background-color': this.$store.state.colors[this.$route.meta.navColor]}
      }else{
        return {'background-color': this.$store.state.colors.red}
      }

    },
    logoStyle(){
      return {
        opacity: (this.$route.path=="/" || this.$route.path=="/register")?0:1,
        'pointer-events': (this.$route.path=="/" || this.$route.path=="/register")?"none":"",
        filter: (this.$route.meta.bgColor=="white")?"brightness(0.6)":""
      }
    }
  },
  methods: {
    ...mapMutations(['setMenuState','setSearchKeyword']),
    ...mapActions({
      register: 'auth/register',
      login: 'auth/login',
      logout: 'auth/logout',
      loginFacebook: "auth/loginFacebook",
      authInit: "auth/init"
    }),
    ...mapGetters({
      getUserPhoto: 'auth/getUserPhoto',
      isAdmin: 'auth/isAdmin'
    }),
    postTarget(post){
      // if (this.$route.meta.type=="expo"){
        return `/expo/${post.year}/blog/${post.id}`
      // }

      // if (this.$route.meta.type=="news"){
      //   return `/news/${post.id}`
      // }
    }
  },
  mounted(){
    // this.authInit()
    this.$nextTick(()=>{
      var canvas = document.querySelector("canvas")
      var ctx = canvas.getContext("2d")
      var time=0
      var ww=window.innerWidth
      var wh=window.innerHeight
      canvas.width = ww
      canvas.height = wh
  
      function drawWave(args){
        let color = args.color || "rgba(0,0,0,0.2)"
        let amp = args.amp || 100
        let freq = args.freq || 100
        let timefreq = args.timefreq || 50

        ctx.beginPath()
        ctx.moveTo(0,wh/2)
        for(var i=0;i<ww;i++){
          let y = amp*Math.sin(i/freq+time/timefreq)
          ctx.lineTo(i,y)
        }
        ctx.strokeStyle=color
        ctx.stroke()
      }

      function render(){
        ctx.clearRect(0,0,ww,wh)
        time++
        // console.log(time)
        ctx.save()
        ctx.translate(0,wh/2)
          drawWave({
            color: "rgba(0,0,0,0.1)",
            freq: 50,
            timegfreq: 50,
            amp: 100
          })
          drawWave({
            color: "rgba(0,0,0,0.15)",
            freq: 100,
            timegfreq: 30,
            amp: 50
          })
          drawWave({
            color: "rgba(0,0,0,0.05)",
            freq: 500,
            timegfreq: 30,
            amp: 200
          })
        ctx.restore()
        requestAnimationFrame(render)
        
      }
      requestAnimationFrame(render)

    })
  },
  watch: {
    tempSearchKeyword(){
      this.setSearchKeyword(this.tempSearchKeyword)
    },
    searchKeyword(){
      if (this.tempSearchKeyword!=this.searchKeyword){
        this.tempSearchKeyword=this.searchKeyword
      }
    }
  }
}
</script>

<style lang="sass">
@import "../assets/_mixins.sass"
$speed_cb: cubic-bezier(.04,.6,.42,1) 
.langsel
  position: fixed
  color: $colorRed
  font-size: 30px
  right: 110px
  top: 40px
  display: flex
  cursor: pointer
  z-index: 500
  .option
    margin-left: 20px
    font-weight: 800
    opacity: 0.4
    &.active
      opacity: 1
.staticLogo
  position: absolute
  left: 30px
  top: 30px
  z-index: 400
  width: 50px
  +trans
.hambergur
  +size(72px)
  position: fixed
  right: 20px
  top: 20px
  // background-color: black
  padding: 10px
  cursor: pointer
  z-index: 350
  &:hover .iconbar
    @keyframes ani
      0%
        height: 40px
      50%
        height: 0px
      100%
        height: 40px
    animation-speed-curve: $speed_cb
    animation: ani 1s both 1
  
.icon-bar
  width: 10px
  height: 40px
  // margin: 8px 0px
  position: absolute
  left: 50%
  top: 50%
  border-radius: 50px
  transform: translate(-50%,-50%)
  background-color: $colorWhite
  transform-origin: center center
  transition: 0.5s
  &:nth-child(1)
    left: 35%
  &:nth-child(2)
    left: 65%
    top: 50px


//transition effect
.bgcuts
  position: fixed
  width: 100%
  height: 100%
  left: 0
  top: 0
  display: flex
  overflow: hidden
  z-index: 200
  
  .col
    flex: 1
    top: 0%
    height: 100%
    transition: 1s
    transition-speed-curve: $speed_cb
    background-color: $colorWhite
    border-right: solid 1px rgba(white,0.05)
    position: relative
    // &:before
    //   content: ''
    //   display: block
    //   position: absolute
    //   background-color: #fff
    //   width: 100%
    //   height: 0



.slice-enter-active
  transition: 1s

.slice-enter,.slice-leave-to
  .col:nth-child(2n)
    top: -100%
  .col:nth-child(2n+1)
    top: 100%
.slice-leave-active,.slice-leave
  transition: 1s 0s
  .col  
    transition: 1s 0s
.slice-enter-to,.slice-leave-active
  .col
    top: 0%


// .menu-enter-active,.menu-leave-active
  // transition: 0.5s
.menu-enter-active
  transition: 0.5s 1.5s
.menu-leave-active
  transition: 0.5s 0.5s
.menu-enter-to,.menu-leave-to
  opacity: 1
  top: 0
.menu-enter,.menu-leave-active
  opacity: 0
  top: 100vh

.menu
  position: fixed
  left: 0
  top: 0
  z-index: 10
  +trans
  canvas.full
    position: absolute
    left: 0
    top: 0
    width: 100%
  input
    border: none
    outline: none
    width: 100%
    background-color: transparent
    padding: 5px 10px
    border-bottom: solid 1px rgba(#131116,0.2)
    margin-bottom: 10px


  &.open
    .hambergur
      .icon-bar
        background-color: #fff

      .icon-bar:nth-child(1)
        top: 50%
        transform: translate(-50%,-50%) rotate(45deg)
      .icon-bar:nth-child(2)
        top: 50%
        transform: translate(-50%,-50%) rotate(-45deg)

.fullPage
  position: fixed
  width: 100%
  height: 100%
  top: 0
  left: 0
  background-color: white
  z-index: 280
  box-sizing: border-box
  text-align: left
  +trans
  a
    display: inline-block
    color: inherit
    text-decoration: none
    
  h1
    color: $colorBlue
    text-shadow: 0px 0px 0px 10px black
  h2
    margin-bottom: 20px
    text-transform: Uppercase
    color: $colorBlue
  p
    color: $colorBlue

  .rect
    +size(10px,20px)
    background-color: $colorRed
    margin-bottom: 20px
    +trans

  a:hover
    .rect
      +size(100px,20px)
      transition-speed-curve: $speed_cb
  video
  //   mix-blend-mode: lighten
    opacity: 0.1
    position: absolute
    left: 0
    top: 0
  .row-page

    height: 100%
    display: flex
    justify-content: center
    align-items: center
    color: white
    
    z-index: 100
    +rwd_md
      overflow-y: auto
  // .col-menu
  //   height: 100vh
  //   display: flex
  //   justify-content: center
  //   align-items: center
  //   height: 100%
  // .col-menu
  //   padding: 50px 60px
  //   padding-left: 100px
  //   box-sizing: border-box
  //   .container
  //     margin-top: 20px
  //     +rwd_md
  //       margin-top: 0
  //       padding-top: 0
  //   +rwd_md
  //     padding-right: 20px



  +rwd_md
    width: 100vw
    overflow-y: auto
    height: auto
    .nav-short-description
      display: none
    h2
      margin-top: 10px
      margin-bottom: 30px
      font-size: 24px
    .col-menu
      padding: 20px 60px
      padding-right: 20px
    .container-menu
      overflow-y: auto
      height: 100vh
      margin-bottom: 100px
      .row
        flex-shrink: 0
    .row-search
      width: 100%

  .col-member
    background-color: #eee
    padding: 40px
    box-sizing: border-box
    display: flex
    justify-content: center
    align-items: center
    .card
      text-align: center
      display: flex
      justify-content: center
      width: 100%
      box-sizing: border-box
      flex-direction: column
      .card-loading
        position: absolute
        width: 100%
        height: 100%
        background-color: rgba(#eee,0.6)
        // opacity: 0.5
        left: 0
        top: 0

      .top
        display: flex
        justify-content: center
        flex-direction: column
        align-items: center
        margin-bottom: 3px
        background-color: white
        padding: 25px
        padding-bottom: 0
        .name
          font-size: 18px
      .bottom
        background-color: white
        padding: 25px
      .photo
        width: 100px
        height: 100px
        margin-top: 55px
        margin-bottom: 40px
        background-color: black
        background-position: center center
        background-repeat: no-repeat
        background-size: 80% auto
  .row-search
    flex-shrink: 0
    padding-bottom: 20px
    .fa-search,.fa-times
      // position: absolute
      // right: 30px
      font-size: 28px

    .clearInput
      position: absolute
      font-size: 20px
      top: calc( 50% - 10px)
      right: 30px
      transform: translateY(-50%)
      cursor: pointer
      transition: 0.5s
      transform-origin: center center
      &:hover
        font-size: 25px
      
    input
      font-size: 24px
    .tags
      display: none
      +rwd_lg
        display: flex

      .tag
        white-space: nowrap
        margin: 10px
        background-color: #eee
        padding: 5px 10px
        cursor: pointer
        &:hover
          background-color: #ddd
  .container-menu
    // display: flex
    flex-direction: column
    height: 100%
    // max-width: 1300px
    justify-content: center
    align-items: center
    .row
      margin-top: 100px
      margin-bottom: 100px


.infos
  list-style: none
  margin-bottom: 30px
  padding: 0


</style>
