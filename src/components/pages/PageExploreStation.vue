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
              span 返回列表
            br
            div(:key="station.name")
              .ovh
                .line.animated.slideInLeft {{ station.line[0] }}
              h4.musicBar.animated.fadeIn 0{{ $route.params.station_id }} | {{ station.eng_name }}
              h1.animated.fadeIn {{ station.name }}
              h5.animated.fadeIn {{ station.keywords }}
              br
              p.animated.fadeIn(v-html="lineToBr(station.description)")
          .col-lg-7.col-md-12.col-scene
            div.animated.fadeIn(:key="station.name")
              SvgInline.floatInUp.animated.scene(:src="station.img")


</template>

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
          playind_sound: false
        }
      },
  mounted: function(){
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


          trigger_drilling: "03中山站/中山站_螺絲電鑽_6s.mp3",
          trigger_fixing: "03中山站/中山站_機車修理器具碰撞_4s.mp3",
          trigger_chatting: "03中山站/中山站_文創商店店員對話_7s.mp3",


          trigger_bus_moving: "04圓山站/圓山站_公車進站_17s.mp3",
          trigger_teacher: "04圓山站/圓山站_師生玩耍_8s.mp3",
          trigger_children_playing: "04圓山站/圓山站_小孩嬉戲_7s.mp3",
          trigger_buy_tickets: "04圓山站/圓山站_轉運站購票_3s.mp3",


          trigger_move: "05台北101/台北101站_鼎泰豐廣播_39s.mp3",
          trigger_firework: "05台北101/台北101_跨年倒數放煙火_18s.mp3",
          trigger_take_photos: "05台北101/台北101站_美食街遊客環境音_30s.mp3",
          trigger_gathering: "05台北101/台北101站_遊客集合_12s.mp3",




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
          trigger_egg_bus: "台北小巨蛋/交通指揮與車聲_19s.mp3 "

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
          let target =  $(this).attr("data-name").replace(/\r/g,"").replace(/\s/g,"").replace(/\</g,"").replace(/\>/g,"")
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

      
    }
  },
  computed:{
    ...mapState(['stations']),
    station(){
      return this.stations[this.$route.params.station_id]
    }
  },
}
</script>

<style lang="sass">
@import "../../assets/_mixins.sass"
.page-explore-station
  height: 100vh
  overflow: hidden
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
  .btn-next
    right: 50px
    border-left: 20px solid
  .line
    padding: 5px 10px
    background-color: $colorRed
    color: white
    margin-top: 150px
    margin-bottom: 20px
    display: inline-block
  .col-content
    padding-left: 10vw
    box-sizing: border-box
  .col-scene
    min-height: 100vh
    display: flex
    justify-content: center
    align-items: center
    svg
      width: 120vmin
      max-width: 100%

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
    overflow: hidden
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
</style>

