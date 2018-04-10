<template lang="pug">
  .page.page-explore-station.color.white
    section.sectionHero
      .container-fluid
        router-link.btn-prev(v-if="stationDelta(-1)" :to="stationDelta(-1)")
        router-link.btn-next(v-if="stationDelta(1)" :to="stationDelta(1)")
        .row
          .col-lg-5.col-md-12.col-content
            router-link.btn-back(to="/explore") 
              i.fa.fa-undo
              span Back
            br
            div(:key="station.name")
              .ovh
                .line.animated.slideInLeft(v-for="line in station.line", 
                      :style="{'background-color': getLine(line).bgcolor,'color': getLine(line).color}") {{getLine(line).name}}
              h4.musicBar.animated.fadeIn {{ idtext }} | {{ station.eng_name }}
              h1.animated.fadeIn {{ station.name }}
              h5.animated.fadeIn {{ station.keywords }}
              br
              p.animated.fadeIn(v-html="lineToBr(station.description)")
              .btn.red(@click="togglePlay") 
                i.fa.fa-play(v-if="!playingDemo") &nbsp;
                i.fa.fa-pause(v-else) &nbsp;
                span 播放作品
                span  ({{ station.demo_author }})
              .audiodemo(v-if="station.demo")
                audio#demoaudio( :src="station.demo")
              audio#demoenvir(src="/static/audio/捷運站內環境音.mp3" autoplay)

              
          .col-lg-7.col-md-12.col-scene
            div.animated.fadeIn(:key="station.name")
              SvgInline.floatInUp.animated.scene.showing(:src="station.img")


</template>n

<script>
import {mapState,mapMutations,mapActions} from 'vuex'
import $ from 'jquery'
export default {
   data: function(){
        return {
          // stations: window.data_storage.stations,
          viewing: 0,
          // img:[
          //   "img/scene_airport.svg",
          //   "img/scene_egg.svg",
          //   "img/scene_temple.svg",
          //   "img/scene_mountain.svg",
          //   "img/scene_door.svg"
          // ],
          svgdata: ["11","22","33","44","55"],
          lang: "zh",
          no_change_time: 0,
          playind_sound: false,
          playingDemo: false
        }
      },
  mounted: function(){
    this.playingDemo=false
        var vobj=this;
        // vobj.delta(parseInt(Math.random()*50));

        //如果超過5秒動作自動切換
        // setInterval(function(){
        //   if (!vobj.playind_sound){
        //     vobj.no_change_time++;
        //   }else{
        //     vobj.no_change_time=0;
        //   }
        //   if ((vobj.no_change_time)>5){
        //     vobj.delta(1);
        //   }
        // },1000);

        

        //按左右鍵切換
        // $(document).keydown(function(e){
        //     if (e.keyCode == 37) { 
        //        vobj.stationDelta(-1);
        //        return false;
        //     }
        //     if (e.keyCode == 39) { 
        //        vobj.stationDelta(1);
        //        return false;
        //     }
        // });
        // for(var i=0;i<this.img.length;i++){
        //   (function(temp){
        //     $.get(vobj.img[temp], function(res){
        //         Vue.set(vobj.svgdata,temp,res);
        //         // console.log(res);
        //         // window.test=res;
        //     }, 'text');

        //   })(i);
        // }

        var play_list = {

          //南港00
          trigger_find_road: "06南港站/南港站_問路_5s.mp3",
          trigger_skate: "06南港站/南港站_玩滑板_10s.mp3",
          trigger_buy_tickets: "06南港站/南港站_購票投錢_4s.mp3",
          trigger_tap_the_card: "06南港站/南港站_刷票出口與廣播_13s.mp3",


          trigger_watch_red_house: "01西門站/西門站_群眾喊聲？_7s.mp3",
          trigger_motherchild_buyticket: "01西門站/西門站_買電影票_7s.mp3",
          trigger_foreign_take_picture: "01西門站/西門站_外國旅客_8s.mp3",


          trigger_drilling: "03中山站/中山站_螺絲電鑽_6s.mp3",
          trigger_fixing: "03中山站/中山站_機車修理器具碰撞_4s.mp3",
          trigger_chatting: "03中山站/中山站_文創商店店員對話_7s.mp3",
          trigger_receipt: "03中山站/中山站_文創商店印發票_14s.mp3",

          trigger_bus_moving: "04圓山站/圓山站_公車進站_17s.mp3",
          trigger_teacher: "04圓山站/圓山站_師生玩耍_8s.mp3",
          trigger_children_playing: "04圓山站/圓山站_小孩嬉戲_7s.mp3",
          trigger_buy_tickets: "04圓山站/圓山站_轉運站購票_3s.mp3",


          trigger_move: "05台北101/台北101站_鼎泰豐廣播_39s.mp3",
          trigger_firework: "05台北101/台北101_跨年倒數放煙火_18s.mp3",
          trigger_take_photos: "05台北101/台北101站_美食街遊客環境音_30s.mp3",
          trigger_gathering: "05台北101/台北101站_遊客集合_12s.mp3",



          trigger_move: "09劍南路站/劍南路站_美麗華遊戲區_12s.mp3",
          trigger_fountain: "09劍南路站/劍南路站_美麗華噴水池_16s.mp3",
          trigger_film_advocacy: "09劍南路站/劍南路站_美麗華影聽進場宣告_10s.mp3",
          trigger_speaker: "09劍南路站/劍南路站_美麗華影聽廣播_14s.mp3",


          trigger_instruction: "08行天宮站/行天宮站_講示_13s.mp3",
          trigger_noise: "08行天宮站/行天宮站_松江市場_13s.mp3",
          trigger_fortune_telling: "08行天宮站/行天宮站_算命街_5s.mp3",
          trigger_wash_hand: "08行天宮站/行天宮站_行天宮洗手_5s.mp3",


          trigger_rubbing: "07大橋頭站/大橋頭站_迪化街拓印_8s.mp3",
          trigger_sieve_rice: "07大橋頭站/大橋頭站_迪化街篩米聲_2s.mp3",
          trigger_nuts_store: "07大橋頭站/大橋頭站_迪化街賣堅果_11s.mp3",
          trigger_wooden_furniture: "07大橋頭站/大橋頭站_迪化街木傢俱店_27s.mp3",


          trigger_woman_package: "02北門站/北門站_行李箱_10s.mp3",
          trigger_man_child_mail: "02北門站/北門站_郵局叫號_10s.mp3",
          trigger_sell_cloth: "02北門站/北門站_布店_4s.mp3",

          trigger_radio: "松山機場/登機廣播＿32s.mp3",
          trigger_package: "松山機場/行李推車2_13s.mp3",
          trigger_package_2: "松山機場/行李手推車＿17s_693.mp3",
          trigger_airplane: "松山機場/飛機飛越天空＿15s.mp3",
          trigger_man_goodbye: "松山機場/親子賞飛機＿17s.mp3",

          trigger_women_lucky: "龍山寺/此起彼落擲筊聲_5s.mp3",
          trigger_temple_fire: "龍山寺/誦經聲1_18s.mp3",
          trigger_man_lucky: "龍山寺/抽籤_6s.mp3",
          trigger_watching_poem: "龍山寺/解籤_9s.mp3",

          trigger_icecream: "東門/地下人行道吧哺聲_7s.mp3",
          trigger_cookie: "東門/蔥抓餅_20s.mp3",
          trigger_door_man: "東門/東門市場內米粉湯_23s.mp3",
          trigger_man_watching_door: "東門/鼎泰豐廣播_23s.mp3",

          trigger_tree_child: "象山/踩踏樹葉_10s.mp3",
          trigger_man_stone: "象山/外國人爬山嬉笑_23s.mp3",
          trigger_mountain_building: "象山/韓國人爬山腳步聲_30s.mp3",
          trigger_insect: "象山/蟲鳴2_12s.mp3",
          trigger_road: "象山/多人腳步聲_8s.mp3",

          trigger_peoples: "台北小巨蛋/六點半進場_7s.mp3",
          trigger_sell_light: "台北小巨蛋/螢光燈販賣_11s.mp3",
          trigger_sell: "台北小巨蛋/商品販賣部_14s.mp3",
          trigger_egg_bus: "台北小巨蛋/交通指揮與車聲_19s.mp3 ",


          trigger_lots_child: "10大湖公園站/大湖公園_小朋友嬉戲_13s.mp3",
          trigger_duck: "10大湖公園站/大湖公園_大鴨子叫_14s.mp3",
          trigger_boat: "10大湖公園站/大湖公園_湖水聲_9s.mp3",



          trigger_water: "淡水站/淡水站_河水聲_12s.mp3",
          trigger_vendor: "淡水站/淡水站_麻糬攤販_9s.mp3",
          trigger_vendor_friedsquid_: "淡水站/淡水站_叫賣聲_4s.mp3",
          trigger_foreigners: "淡水站/淡水站_外國遊客聲_11s.mp3",
          trigger_claw_machine: "淡水站/淡水站_遊戲店廣播_9s.mp3",

          trigger_take_photos: "中正紀念堂/中正紀念堂站_拍照數數_5s.mp3",
          trigger_pigeons: "中正紀念堂/中正紀念堂站_鴿子群體飛翔_7s.mp3",
          trigger_checking_ticket: "中正紀念堂/中正紀念堂站_戲劇院驗票_13s.mp3",
          trigger_dance: "中正紀念堂/中正紀念堂站_高中生練舞_10s.mp3",

          trigger_roadsound: "中山國中站/中山國中站_馬路聲_7s.mp3",
          trigger_flipping_book: "中山國中站/中山國中站_三民書局翻書_7s.mp3",
          trigger_bell_ring: "中山國中站/中山國中站_鐘聲_13s.mp3",


          trigger_playing_basketball: "大安森林公園站/大安森林公園_打籃球_10s.mp3",
          trigger_daan_duck: "大安森林公園站/大安森林公園_池塘鴨子叫_10s.mp3",
          trigger_bird_singing: "大安森林公園站/大安森林公園_鳥叫聲_8s.mp3",
          trigger_raining: "大安森林公園站/大安森林公園_雨聲_3s.mp3",



          trigger_grass: "小碧潭站/小碧潭站_風吹動草聲_7s.mp3",
          trigger_jogging: "小碧潭站_車流聲_12s.mp3小碧潭站_跑步聲_4s.mp3",
          trigger_ride_bicycle: "小碧潭站_車流聲_12s.mp3小碧潭站_腳踏車聲_4s.mp3",
          trigger_cars: "小碧潭站_車流聲_12s.mp3小碧潭站_車流聲_12s.mp3"


        };

        var player=new Audio();
        player.loop=true;
        var last_source=";"
        var fadetime=100;
        var target_volume=1.00;

        setInterval(function(){
          if (player.volume>target_volume && player.volume>0.1){
            player.volume-=Math.abs(0.05);
          }else if (player.volume<target_volume && player.volume<1){
            player.volume+=Math.abs(0.05);
          }
        },10);


        function trigger_sound(evt) {
          let target =  $(this).attr("data-name").replace(/\r/g,"").replace(/\s/g,"").replace(/\</g,"").replace(/\>/g,"").replace(/\(/g,"_").replace(/\)/g,"_")
          console.log(target)

          vobj.no_change_time=0;
          vobj.playind_sound=true;
          var new_source="";
          console.log(evt);

          if (play_list[target]){
            new_source="/static/audio/"+play_list[target];
            // ga('send', 'event', 'SceneExplore', 'Trigger', target );


          }else{
            new_source='';
          }
          
          console.log( "---------\nAudio_Trigger: "+target );
          // console.log( $( this ) );
          console.log("Playing: "+ play_list[target]);


          if (new_source!=last_source){
            player.src=new_source;
            
            player.currentTime=0;
            last_source=player.src;
            target_volume=1;
            player.volume=1;
          }
          if (player.paused){
            player.play();
            target_volume=1;
            player.volume=1;
          }
        }

        function pause_sound(){
          if (!player.paused){
            player.pause();
            vobj.playind_sound=false;
          }
        }

        window.mountAction = function(){
          // var ga_global=ga;
          $( ".col-scene" ).on( "mouseenter", "g[data-name*='<trigger']",trigger_sound);
          $( ".col-scene" ).on( "mouseleave", "g[data-name*='<trigger']",pause_sound);
  
          $( ".col-scene" ).on( "tap", "g[data-name*='<trigger']",trigger_sound);
          $( ".col-scene" ).on( "click", "g[data-name*='<trigger']",trigger_sound);
          $( ".col-scene" ).on( "mouseenter", "g[data-name*='trigger']",trigger_sound);
          $( ".col-scene" ).on( "mouseleave", "g[data-name*='trigger']",pause_sound);
  
          $( ".col-scene" ).on( "tap", "g[data-name*='trigger']",trigger_sound);
          $( ".col-scene" ).on( "click", "g[data-name*='trigger']",trigger_sound);

        }
        window.mountAction()

      },
  methods:{
    stationDelta(delta){
      setTimeout(function(){

        window.mountAction()
      },300)

      let target=parseInt(this.$route.params.station_id)+delta
      if (this.stations[target]){
        return '/explore/station/'+target
      }
      return null

      
    },
    //取得對應路線資料（還有翻譯）

    getLine(name){
      return this.lines.find(l=>l.name==name || l.eng==name)
    },
    togglePlay(){
      if (!this.playingDemo){
        this.playingDemo=true
        $("#demoaudio")[0].currentTime=0
        $("#demoaudio")[0].play()
      }else{
        this.playingDemo=false
        $("#demoaudio")[0].currentTime=0
        $("#demoaudio")[0].pause()

      }
    }
  },
  computed:{
    // ...mapState(['lines']),
    stations(){
      return this.$t("stations")
    },
    lines(){
      return this.$t("lines")
    },
    station(){
      console.log()
      return this.stations[this.$route.params.station_id]
      // return this.stations[this.$route.params.station_id]
    },
    idtext (){
      let tid = parseInt(this.$route.params.station_id) +1
      if (tid<10){
        return "0"+tid
      }else{
        return ""+tid
      }
    }
  },
  watch: {
    station(){

      this.playingDemo=false
    }
  }

}
</script>

<style lang="sass">
@import "../../assets/_mixins.sass"
.page-explore-station
  height: 100vh
  overflow: hidden
  +rwd_sm
    padding-bottom: 0
    padding-top: 60px
    margin-bottom: 30px
  .btn-prev,.btn-next
    position: absolute
    top: 50%
    cursor: pointer
    z-index: 5
    border-top: 20px solid transparent
    border-bottom: 20px solid transparent
    border-left-color: $colorRed
    border-right-color: $colorRed
    &:hover
      border-left-color: lighten($colorRed,15)
      border-right-color: lighten($colorRed,15)
    +rwd_sm
      top: 70%
  // .btn-back
  //   background-color: #fff
  //   padding: 10px 20px
  //   letter-spacing: 0.2em
  //   padding-left: 100px 
  //   color: #222
  //   // position: fixed
  //   position: absolute
  //   left: 0px
  //   top: 20px
  //   font-size: 1.4em
  //   cursor: pointer
  //   box-shadox: 0px 0px 10px rgba(black,0.1)
  //   &:hover
  //     background-color: #fafafa
  //     text-decoration: none
  //   i
  //     margin-right: 10px

  .btn-prev
    left: 50px
    border-right: 20px solid
    +rwd_sm
      left: 10px
  .btn-next
    right: 50px
    border-left: 20px solid
    +rwd_sm
      right: 10px

  .line
    padding: 5px 10px
    background-color: $colorRed
    color: white
    margin-top: 15vh
    margin-bottom: 20px
    display: inline-block
    margin-right: 10px
  .col-content
    padding-left: 10vw
    box-sizing: border-box
    +rwd_sm
      padding-left: 15px


  .col-scene
    min-height: 100vh
    display: flex
    justify-content: center
    align-items: center
    overflow: show
    +rwd_sm
      min-height: 50vh
    svg
      width: 125vmin
      max-width: 110%

  img
    width: 100%
    max-width: 115vmin
    position: absolute
    right: 0
    bottom: -5vmin

  +rwd_sm
    height: auto



  // @media screen and (min-width: $break_sm)
  //   height: 100vh
  // @media screen and (max-width: $break_sm)
  //   min-height: 145vh

  .bg 
    +ab_center
    position: absolute
    height: 130%
    mix-blend-mode: darken
    opacity: 0.25


  .scene_title
    display: inline-block
    color: $colorRed
    padding: 5px 10px
    position: relative
    h1
      font-size: 25px
    h4
      font-size: 17px

  h1,h4
    margin: 0
  h1
    margin-top: 10px
  h4
    font-weight: 500


  .explore_decoration_text
    font-weight: 500
    letter-spacing: 20px
    font-size: 20px
    color: $colorRed

    @media screen and (max-width: $break_sm)
      display: none


  .btn_next,.btn_pre
    width: 0px
    height: 0px
    box-sizing: initial
    cursor: pointer
    display: inline-block

    +ab_center
    z_index: 10
    +rwd_sm
      top: 70%
    // background-color: $colorRed

  .btn_next
    border-top: 12px solid transparent
    border-bottom: 12px solid transparent
    
    border-left: 12px solid $colorRed
    left: initial
    right: 12px
  .btn_pre
    border-top: 12px solid transparent
    border-bottom: 12px solid transparent
    
    border-right: 12px solid $colorRed
    left: 12px

  .col-sm-4
    // padding-bottom: 30px
  .col-sm-8
    height: 50vh

    @media screen and (max-width: $break_sm)
      height: 60vh

  .top_part
    vertical-align: middle
    position: relative
    width: 100%
    padding-left: 30px
    margin-top: 8%
  h2
    width: 400px

  .surfing_dots
    .dot
      +size(10px,10px)
      border-radius: 50%
      border: solid 2px $colorRed
      display: inline-block
      margin-right: 10px
      transition: 0.5s
      cursor: pointer
      &.red
        background-color: $colorRed
      
  .scene_desciption
    // padding-right: 20px
    margin-right: -10px
    margin-top: 10px

  .scene
    // width: 110%
    // +ab_center
    // top: initial
    // left: initial
    // bottom: -25vh
    // right: -7vw
    // transform: none
    // -webkit-pointer-events: none
    // overflow: hidden
    overflow: visible
    // max-height: 0px
    // transition: opacity 0.5s, max-height 0s 1.1s

    @media screen and (max-width: $break_sm)
      top: 10px
    

    g[data-name=island_1],g[data-name=island_2],g[data-name=island_3],
      transition: opacity 0.5s
      opacity: 0

    g[data-name=island_1]
      transition: 0.5s 0s
      transform: translate(0px,10px)
    g[data-name=island_2]
      transition: 0.5s 0s
      transform: translate(0px,10px)
    g[data-name=island_3]
      transition: 0.5s 0s
      transform: translate(0px,10px)


    &.showing
      g[data-name=island_1],g[data-name=island_2],g[data-name=island_3],
        opacity: 1
      g[data-name=island_1]
        transition: 0.5s 0.3s
        transform: translate(0px,0px)
      g[data-name=island_2]
        transition: 0.5s 0.45s
        transform: translate(0px,0px)
      g[data-name=island_3]
        transition: 0.5s 0.6s
        transform: translate(0px,0px)

      -webkit-pointer-events: initial
      z-index: 10
      // display: block
      max-height: 10000px
      transition: opacity 0.5s, max-height 0s 0s


    @keyframes moveing
      0%.100%
        transform: translateY(0px)
      50%
        transform: translateY(10px)

    @keyframes sign_wake
      0%
        transform: rotate(0deg)
      80%
        transform: rotate(0deg)
      85%
        transform: rotate(5deg)
      90%
        transform: rotate(-2deg)
      95%
        transform: rotate(1deg)
      100%
        transform: rotate(0deg)

    //驚嘆號閃爍
    g[data-name=sign]
      transform-origin: center bottom
      animation: sign_wake 3s infinite


  g[data-name*='<trigger']
    cursor: pointer
    &:hover
      animation: moveing 2s infinite
      


    g[data-name*=trigger]
      cursor: pointer

      &:hover
        g[data-name=sign]
          animation: flash 1s infinite


  
    g[data-name=island_1],g[data-name=island_2],g[data-name=island_3],
      transition: opacity 0.5s
      opacity: 0

    g[data-name=island_1]
      transition: 0.5s 0s
      transform: translate(0px,10px)
    g[data-name=island_2]
      transition: 0.5s 0s
      transform: translate(0px,10px)
    g[data-name=island_3]
      transition: 0.5s 0s
      transform: translate(0px,10px)


    &.showing
      g[data-name=island_1],g[data-name=island_2],g[data-name=island_3],
        opacity: 1
      g[data-name=island_1]
        transition: 0.5s 0.3s
        transform: translate(0px,0px)
      g[data-name=island_2]
        transition: 0.5s 0.45s
        transform: translate(0px,0px)
      g[data-name=island_3]
        transition: 0.5s 0.6s
        transform: translate(0px,0px)

      -webkit-pointer-events: initial
      z-index: 10
      // display: block
      max-height: 10000px
      transition: opacity 0.5s, max-height 0s 0s



    @keyframes sign_wake
      0%
        transform: rotate(0deg)
      80%
        transform: rotate(0deg)
      85%
        transform: rotate(10deg)
      90%
        transform: rotate(-6deg)
      95%
        transform: rotate(3deg)
      100%
        transform: rotate(0deg)

    //驚嘆號閃爍
    g[data-name=sign]
      transform-origin: center bottom
      animation: sign_wake 3s infinite


    g[data-name*=trigger]
      cursor: pointer

      &:hover
        g[data-name=sign]
          animation: flash 1s infinite
  
  //--------------------------------------------------------------------
  //松山機場-動畫
  //--------------------------------------------------------------------

  @mixin shake($angle)
    @keyframes shake_#{$angle}
      0%
        transform: rotate(0deg)
      50%
        transform: rotate($angle)
      80%
        transform: rotate(-$angle)
      100%
        transform: rotate(0deg)

  @mixin translate($biasx,$biasy)
    @keyframes trans_#{$biasx}_#{$biasy}
      0%
        transform: translate(0px,0px)
      30%
        transform: translate($biasx,$biasy)
      70%
        transform: translate($biasx,$biasy)
      100%
        transform: translate(0px,0px)

  +shake(4deg)
  +translate(-3px,4px)
  +translate(3px,-4px)

  //松山機場-廣播

  g[data-name=trigger_radio]
    &:hover
      g[data-name=recorder]
        transform-origin: center bottom
        animation: 'shake_4deg' 2s infinite
      g[data-name=women]
        transform-origin: center center
        animation: 'trans_-3px_4px' 10s infinite
      g[data-name=paper1]
        transform-origin: center center
        animation: 'trans_3px_-4px' 20s infinite
      g[data-name=paper2]
        transform-origin: center center
        animation: 'trans_3px_-4px' 20s 1s infinite


  +translate(3px,3px)
  //松山機場-行李(中)

  g[data-name=trigger_package]
    &:hover
      g[data-name=package_upper]
        animation: 'trans_3px_3px' 2s infinite
      g[data-name=package_lower]
        animation: 'trans_3px_3px' 2s -0.9s infinite

  +translate(0px,-3px)

  //松山機場-行李(下)
  g[data-name=trigger_package_2]
    &:hover
      g[data-name=package_white]
        animation: 'trans_0px_-3px' 2s infinite
      g[data-name=package_red]
        animation: 'trans_0px_-3px' 2s -0.9s infinite



  +translate(8px,8px)
  //松山機場-飛機

  g[data-name=trigger_airplane]
    &:hover
      g[data-name=airplane]
        animation: 'trans_8px_8px' 2s infinite


  rect[data-name=hidden]
    opacity: 0 
    fill: transparent

  //松山機場-人揮手
  g[data-name=trigger_man_goodbye]
    &:hover
      path[data-name=hand]
        transform-origin: left center
        animation: 'shake_30deg' 4s infinite

      g[data-name=child]
        transform-origin: center bottom
        animation: 2s 'trans_0px_-3px' 1s infinite
  //--------------------------------------------------------------------
  //龍山寺-動畫
  //--------------------------------------------------------------------
  
  +translate(-5px,6px)
  +shake(30deg)
  +shake(2deg)

  
  //龍山寺 把杯
  g[data-name=trigger_man_lucky]
    &:hover
      g[data-name=lucky_box]
        animation: airplane_moving 2s infinite

  g[data-name=trigger_women_lucky]
    &:hover
      g[data-name=women_upper]
        animation: 'shake_4deg' 5s 1
        transform-origin: center bottom
      g[data-name=lucky_left]
        animation: 'shake_30deg' 2s infinite
        transform-origin: center center
      g[data-name=lucky_right]
        animation: 'shake_30deg' 2s 0.5s infinite
        transform-origin: center center


  @keyframes opacity
    0%
      opacity: 0
    60%
      opacity: 1
    80%
      opacity: 1
    100%
      opacity: 0

  //抽籤

  g[data-name=trigger_man_lucky]
    g[data-name=dialog]
      opacity: 0

    &:hover
      g[data-name=man_hand]
        transform-origin: left center
        animation: 'shake_4deg' 5s infinite

      g[data-name=luckybox]
        transform-origin: center bottom
        animation: 'shake_4deg' 2s infinite

      g[data-name=luckybar]
        transform-origin: center center
        animation: 'shake_2deg' 1s infinite

      g[data-name=luckybar]:nth-child(1)
        animation-delay: -0.3s
      g[data-name=luckybar]:nth-child(2)
        animation-delay: -0.6s
      g[data-name=luckybar]:nth-child(3)
        animation-delay: -0.7s
      g[data-name=luckybar]:nth-child(4)
        animation-delay: -0.9s
      g[data-name=luckybar]:nth-child(5)
        animation-delay: -1.1s

      g[data-name=dialog]
        transform-origin: center center
        animation: 'opacity' 1s 3s 1 both



  //抽籤

  g[data-name=trigger_watching_poem]

    &:hover
      g[data-name=word]
        animation: opacity 1s 0s infinite both
      @for $i from 1 through 8
        g[data-name=word]:nth-child(#{$i})
          animation-delay: $i*0.5s

        

  @keyframes scale_fire
    0%
      transform: scaleY(1)
    50%
      transform: scaleY(1.1)
    100%
      transform: scaleY(1)

  //香爐
  g[data-name=trigger_temple_fire]
    &:hover
      g[data-name=stick_big]
        transform-origin: center bottom
        animation: scale_fire 4s 0s infinite both

      g[data-name=stick_small]
        transform-origin: center bottom
        animation: scale_fire 2s 0s infinite both

      @for $i from 1 through 20
        g[data-name=stick_small]:nth-child(#{$i})軌跡
          animation-delay: random()*-2s

  //----------
  //東門

  +translate(6px,3px)

  g[data-name=trigger_icecream]
    g[data-name=babu]
      transform-origin: center center
    &:hover
      g[data-name=hand]
        transform-origin: left center
        animation: 2s shake_4deg infinite
      g[data-name=babu]
        animation: 1s shake_4deg infinite
      g[data-name=icecream]
        transform-origin: center bottom
        animation: 4s shake_4deg infinite
      g[data-name=cover]
        animation: 4s "trans_6px_3px" 1s infinite


  

  @keyframes bake_cookie
    0%
    40%
      transform: rotate(5deg)
    50%
      transform: rotate(-10deg)
    70%
      transform: rotate(-12deg)
    90%
      transform: rotate(-10deg)
    100%
      transform: rotate(5deg)

  @keyframes bake_cookie_locus
    1%
      opacity: 0
    2%
      opacity: 1
    10%
      opacity: 1
    11%
      opacity: 0
    100%
      opacity: 0

  @keyframes now_cookie
    0%
      opacity: 1
    49%
      opacity: 1
    50%
      opacity: 0
    90%
      opacity: 0
    91%
      opacity: 1



  g[data-name=trigger_cookie]
    &:hover
      g[data-name=man_upper]
        transform-origin: center bottom
        animation: 2s shake_4deg -1.5s infinite

      g[data-name=now_cookie]
        animation: 2s now_cookie 0s infinite both
      g[data-name=cookie1]
        animation: 2s bake_cookie_locus -1s infinite both
      g[data-name=cookie2]
        animation: 2s bake_cookie_locus -0.8s infinite both
      g[data-name=cookie3]
        animation: 2s bake_cookie_locus -0.6s infinite both
      path[data-name=cookie4]
        animation: 2s bake_cookie_locus -0.4s infinite both

      g[data-name=hand]
        transform-origin: left center
        animation: 2s bake_cookie infinite
      g[data-name=child]
        transform-origin: center bottom
        animation: 2s 'trans_0px_-3px' 1s infinite
      g[data-name=mother]
        transform-origin: center bottom
        animation: 4s shake_4deg 1s infinite
  


  // g[data-name=throw_r]
  //   transform-origin: center center
  //   animation: throwing 1s infinite


  @keyframes throwing
    0%
      transform: translateY(0px)
    50%
      transform: translateY(0px) rotate(45deg)
    100%
      transform: translateY(0px)


  +translate(5px,0px)

  //----------
  //小巨蛋兒
  // +shake(6deg)
  //hand      
  +translate(6px,0px)
  g[data-name=trigger_peoples]
    &:hover
      g[data-name=people1]
        animation: 2.5s "trans_6px_0px" -1.5s infinite
      g[data-name=people2]
        animation: 1.5s "trans_6px_0px" -0.5s infinite
      g[data-name=people3]
        animation: 3s "trans_6px_0px" -1s infinite
      g[data-name=people4]
        animation: 2.4s "trans_6px_0px" -2s infinite

  g[data-name=trigger_sell_light]
    &:hover
      g[data-name=hand]
        transform-origin: left center
        animation: 2s shake_4deg -1.5s infinite

  +translate(-10px,5px)
  //hand      
  g[data-name=trigger_egg_bus]
    &:hover
      g[data-name=bus]
        animation: 5s "trans_-10px_5px" 0s infinite


</style>

