<template lang='pug'>
.page.page-playground.red
  .container
    .row
      .col-sm-3
          .page_title
              h3.title-eng {{ $t('playground.title_eng')  }}
              h1.title {{ $t('playground.title')  }}
          p(v-html="$t('playground.description')")
          hr
          div.volume_sliders.container-fluid
            .row
              .col-2
                <!-- h4 {{volume_melody}} -->
                img.pg_icon(src="/static/img/icon_pg_melody.svg")
              .col-10
                input(type="range" v-model="volume_melody" min="0" max="100")
            .row
              .col-2
                <!-- h4 {{volume_beat}} -->
                img.pg_icon(src="/static/img/icon_pg_beats.svg")
              .col-10
                input(type="range" v-model="volume_beat" min="0" max="100")
            .row
              .col-2
                <!-- h4 {{volume_env}} -->
                img.pg_icon(src="/static/img/icon_pg_env.svg")
              .col-10
                input(type="range" v-model="volume_env" min="0" max="100")
          .row
            .btn_container.col-4(v-if='!playing')
              h5 播放
              .pg_btn(@click='play')
                img(src="/static/img/icon_btn_play.svg")

            .btn_container.col-4(v-if='playing')
              h5 停止
              .pg_btn(@click='stop')
                img(src="/static/img/icon_btn_pause.svg")


            .btn_container.col-4
              h5 隨機
              .pg_btn(@click="shuffle")
                img(src="/static/img/icon_btn_shuffle.svg")

            //- .btn_container.col-xs-4
              h5 分享
              .pg_btn(@click="share_work")
                img(src="img/icon_btn_share.svg")

      .col-sm-9
        .row
          //隱藏的選單
          .col-4
            h4.col_title 
              .vc 旋律
              .reddot(:style="getball(volume_melody)")
            h3 {{ (locale=="en")?music.melody[select.melody].name_eng:music.melody[select.melody].name_cht }}
              img.pg_icon(src="/static/img/icon_pg_melody_red.svg")
              
            select.pg_select.form-control(v-model='select.melody')
              option(v-for='(m,id) in music.melody' v-bind:value='id') {{(locale=="en")?m.name_eng:m.name_cht}} 
          .col-4
            h4.col_title 
              .vc 節奏
              .reddot(:style="getball(volume_beat)")
            h3 {{ (locale=="en")?music.beat[select.beat].name_eng:music.beat[select.beat].name_cht }}
              img.pg_icon(src="/static/img/icon_pg_beats_red.svg")
              
            select.pg_select.form-control(v-model='select.beat')
              option(v-for='(m,id) in music.beat' v-bind:value='id') {{(locale=="en")?m.name_eng:m.name_cht}} 
          .col-4
            h4.col_title 
              .vc 環境音
              .reddot(:style="getball(volume_env)")
            h3 {{ (locale=="en")?music.env[select.env].name_eng:music.env[select.env].name_cht }}
              img.pg_icon(src="/static/img/icon_pg_env_red.svg")
              
            select.pg_select.form-control(v-model='select.env')
              option(v-for='(m,id) in music.env' v-bind:value='id') {{(locale=="en")?m.name_eng:m.name_cht}} 
        //- .row
          .col-xs-12.hidden-sm-up.xs_switcher
            .col-xs-4.xs_switch(:class="xs_part==1?'red':''" @click="xs_part=1") 旋律
            .col-xs-4.xs_switch(:class="xs_part==2?'red':''" @click="xs_part=2") 和弦
            .col-xs-4.xs_switch(:class="xs_part==3?'red':''" @click="xs_part=3") 環境音
        
        .row
          //項目清單
          .col-sm-4.col-xs-12(v-show="!xs_mode || (xs_mode && xs_part==1)")
            ul
              li(v-for='(m,id) in music.melody' v-bind:value='id' @click='set("melody",id)' v-bind:class="(select.melody==id)?'red':''") {{(locale=="en")?m.name_eng:m.name_cht}} 
          .col-sm-4.col-xs-12(v-show="!xs_mode || (xs_mode && xs_part==2)")
            ul
              li(v-for='(m,id) in music.beat' v-bind:value='id' @click='set("beat",id)' v-bind:class="(select.beat==id)?'red':''") {{(locale=="en")?m.name_eng:m.name_cht}} 
          .col-sm-4.col-xs-12(v-show="!xs_mode || (xs_mode && xs_part==3)")
            ul
              li(v-for='(m,id) in music.env' v-bind:value='id' @click='set("env",id)' v-bind:class="(select.env==id)?'red':''") {{(locale=="en")?m.name_eng:m.name_cht}} 

        .row.pg_audio_player
          .col-sm-12
            h3 聲音播放
          .col-sm-4
            audio.pg1.form-control(controls loop)
              source(:src='res_url+"1旋律/旋律中/"+music.melody[select.melody].file')
          .col-sm-4
            audio.pg2.form-control(controls loop)
              source(:src='res_url+"2節奏/節奏中/"+music.beat[select.beat].file')
          .col-sm-4
            audio.pg3.form-control(controls loop)
              source(:src='res_url+"3環境音/環境中/"+music.env[select.env].file')
</template>

<script>
import $ from 'jquery'
  export default {
    props: ['is_in_playground'],
    data(){
      return {
        locale: "zh",
        // lang: window.data_storage.lang.page_impromptu,
        description: `松山機場的廣播、小巨蛋的演唱會、龍山寺的擲筊、象山的101、東門的市場，在你心中，台北的「聲音」，又是什麼樣子的?<br>選取不同的旋律、節奏、聲音，<br>組合出你想像中的，捷運站體音樂。`,
        music: {
          melody: [
            {name_cht: "可愛的" , name_eng: "Unknownly" , file: "可愛的.mp3"},
            {name_cht: "宇宙的" , name_eng: "Vastly" , file: "宇宙的.mp3"},
            {name_cht: "勇敢的" , name_eng: "Unknownly" , file: "勇敢的.mp3"},
            {name_cht: "鬼靈精怪的" , name_eng: "Unknownly" , file: "鬼靈精怪的.mp3"},
            {name_cht: "雀躍的" , name_eng: "Unknownly" , file: "雀躍的.mp3"},
            {name_cht: "陽光的" , name_eng: "Unknownly" , file: "陽光的.mp3"},
            {name_cht: "懷疑的" , name_eng: "Unknownly" , file: "懷疑的.mp3"},

            {name_cht: "中國風的" , name_eng: "Chinese style" , file: "傳統的.mp3"},
            {name_cht: "穩重的" , name_eng: "Steadily" , file: "穩重的.mp3"},
            {name_cht: "輕快的" , name_eng: "Lively" , file: "輕快的.mp3"},
            {name_cht: "蠢蠢欲動的" , name_eng: "Ready to start wriggling" , file: "蠢蠢欲動的.mp3"},
            {name_cht: "迷幻的" , name_eng: "Psychedelicly" , file: "迷幻的.mp3"},
            {name_cht: "小心翼翼的" , name_eng: "Carefully" , file: "小心翼翼的.mp3"},
            {name_cht: "愜意的" , name_eng: "Relaxingly" , file: "愜意的.mp3"},
            {name_cht: "輕巧的" , name_eng: "Lightly" , file: "輕巧的.mp3"},
            // {name_cht: "宇宙的" , name_eng: "Vastly" , file: "宇宙的.mp3"},
            {name_cht: "未知的" , name_eng: "Unknownly" , file: "未知的.mp3"},
          ],
          beat: [
            {name_cht: "小跑步在" , name_eng: "unknownly" , file: "小跑步在.mp3"},
            {name_cht: "行進在" , name_eng: "unknownly" , file: "行進在.mp3"},
            {name_cht: "扭動在" , name_eng: "unknownly" , file: "扭動在.mp3"},
            {name_cht: "拍手在" , name_eng: "unknownly" , file: "拍手在.mp3"},
            {name_cht: "律動在" , name_eng: "unknownly" , file: "律動在.mp3"},
            {name_cht: "穿梭在" , name_eng: "unknownly" , file: "穿梭在.mp3"},
            {name_cht: "漫遊在" , name_eng: "unknownly" , file: "漫遊在.mp3"},

            {name_cht: "奔跑在" , name_eng: "unknownly" , file: "奔跑在.mp3"},
            {name_cht: "跳舞在" , name_eng: "dance at" , file: "跳舞在.mp3"},
            {name_cht: "步行在" , name_eng: "walk at" , file: "步行在.mp3"},
            {name_cht: "大步走在" , name_eng: "stride at" , file: "大步走在.mp3"},
            {name_cht: "搖擺在" , name_eng: "shake at" , file: "搖擺在.mp3"},
            {name_cht: "玩樂在" , name_eng: "have fun at" , file: "玩樂在.mp3"},
            {name_cht: "練習在" , name_eng: "practice at" , file: "練習在.mp3"},
            {name_cht: "踏步在" , name_eng: "step at" , file: "踏步在.mp3"},
            {name_cht: "加速在" , name_eng: "accelerate at" , file: "加速在.mp3"},
            {name_cht: "散步在" , name_eng: "stroll at" , file: "散步在.mp3"}
          ],
          env: [
            {name_cht:"三民書局翻書",name_eng: "",file: "三民書局翻書.mp3"},
            {name_cht:"大安森林公園打籃球",name_eng: "",file: "大安森林公園打籃球.mp3"},
            {name_cht:"大安森林公園賞鴨子",name_eng: "",file: "大安森林公園賞鴨子.mp3"},
            {name_cht:"大湖公園賞湖水",name_eng: "",file: "大湖公園賞湖水.mp3"},
            {name_cht:"小碧潭賞鳥",name_eng: "",file: "小碧潭賞鳥.mp3"},
            {name_cht:"中山站使用螺絲電鑽",name_eng: "",file: "中山站使用螺絲電鑽.mp3"},
            {name_cht:"中山國中站喊報告",name_eng: "",file: "中山國中站喊報告.mp3"},
            {name_cht:"中正紀念堂拍照",name_eng: "",file: "中正紀念堂拍照.mp3"},
            {name_cht:"中正紀念堂看鴿子飛翔",name_eng: "",file: "中正紀念堂看鴿子飛翔.mp3"},
            {name_cht:"北門郵局寄信",name_eng: "",file: "北門郵局寄信.mp3"},
            {name_cht:"台北101跨年倒數",name_eng: "",file: "台北101跨年倒數.mp3"},
            {name_cht:"行天宮拜拜",name_eng: "",file: "行天宮拜拜.mp3"},
            {name_cht:"西門町刺青",name_eng: "",file: "西門町刺青.mp3"},
            {name_cht:"西門町舉行活動",name_eng: "",file: "西門町舉行活動.mp3"},
            {name_cht:"南港站刷票",name_eng: "",file: "南港站刷票.mp3"},
            {name_cht:"美麗華看電影",name_eng: "",file: "美麗華看電影.mp3"},
            {name_cht:"迪化街買年貨",name_eng: "",file: "迪化街買年貨.mp3"},
            {name_cht:"淡水買花枝",name_eng: "",file: "淡水買花枝.mp3"},
            {name_cht:"圓山花博公園嬉戲",name_eng: "",file: "圓山花博公園嬉戲.mp3"},
          
            {name_cht: "小巨蛋販售螢光棒" , name_eng: "Taipei Arena selling fluorescent lights" , file: "小巨蛋站賣螢光燈.mp3"},
            {name_cht: "小巨蛋入場處" , name_eng: "entrance of Taipei Arena" , file: "小巨蛋站六點半進場.mp3"},
            {name_cht: "松山機場拉行李" , name_eng: "Songshan Airport pulling the luggage" , file: "松山機場站推行李.mp3"},
            {name_cht: "松山機場廣播" , name_eng: "Songshan Airport listening to the broadcast" , file: "松山機場站廣播.mp3"},
            {name_cht: "松山機場看飛機起飛" , name_eng: "Songshan Airport watching planes" , file: "松山機場站搭飛機.mp3"},
            {name_cht: "龍山寺擲筊" , name_eng: "Longshan Temple casting moon blocks" , file: "龍山寺站擲筊.mp3"},
            {name_cht: "龍山寺抽籤" , name_eng: "Longshan Temple drawing lots" , file: "龍山寺站抽籤.mp3"},
            {name_cht: "龍山寺叫賣" , name_eng: "Longshan Temple selling" , file: "龍山寺站叫賣.mp3"},
            {name_cht: "東門站吃蔥抓餅" , name_eng: "Dongmen station to eat Flaky scallion pancake" , file: "東門站吃蔥抓餅.mp3"},
            {name_cht: "東門站吃把哺冰" , name_eng: "Dongmen station to have ice cream" , file: "東門站地下人行道賣冰.mp3"},
            {name_cht: "象山踩踏樹葉" , name_eng: "Xiangshan steping on the fallen leaves" , file: "象山站踩踏樹葉.mp3"},
            {name_cht: "象山爬山與喘息" , name_eng: "Xiangshan going hiking and breathing" , file: "象山站爬山與喘息.mp3"},
            {name_cht: "象山結伴爬山" , name_eng: "Xiangshan going hiking with friends" , file: "象山站結伴爬山.mp3"}
          ]
        },
        share_text: [
          "小巨蛋螢光燈便宜賣 他用「我想跟你講秘密」的模樣，親切純樸地聲聲叫賣，一點一點建構出舞台下方那片閃爍搖曳的星空。",
          "小巨蛋六點半進場 好不容易找到自己的座位，你環視小巨蛋內嗡嗡嚷嚷的人群，知道你們都為了支持那個對象而聚集在一起，人與人之間的緊密其實也很簡單。",
          "松山機場站行李推車 推車上的行李隨著你前進的腳步一跳一跳的，好像你開始旅程或踏上歸途時，心臟總會撲通撲通隱隱悸動。",
          "松山機場站廣播 突然之間你被廣播的聲音拉回現實，有點手忙腳亂地找出登機證，一字一句地對著票面上旅行的起始。",
          "松山機場站飛機起飛 你在路上望著飛機逐漸沒入雲端，或在機窗邊凝視城市緩緩沉落，遠行的聲音在那刻讓空氣都顯得濃郁。",
          "龍山寺站此起彼落擲茭  你將祈願不重不輕落到地上，寄託在神明的一顰一笑之間，工作、愛情、學業，你與你的願望一起越摔越堅實。",
          "龍山寺站抽籤  你學他們在籤筒上摸了一圈又一圈，但你知道你想抽出的不是未來的方向，而是掌握自己人生的勇氣與力量。",
          "龍山寺站小販叫賣  一貫穿梭於香腸、金紙、水果、糖葫蘆攤之間的縫隙，正暗讚自己身手矯健心思堅定，結果還是多帶了一張刮刮樂才離開。",
          "東門站蔥抓餅  煎脆的鬆軟麵皮、逐漸聚實的蛋液、一圈提味的醬油、一片消軟的起士，怎麼每次經過這裡都好餓。",
          "東門站地下人行道把哺  你想起那一台機車兩個保麗龍箱就能讓你追著跑的夏日午後，老闆問「汽水還是梅子？」，史上最簡單的人生難題。",
          "象山站踩踏樹葉 腳起腳落之間，似乎也踩碎了蓄積在柏油與水泥路面的挫折和煩惱，你感受到陽光暫留於鼻頭的溫度，以及樹葉在耳畔的溫柔窸窣。",
          "象山站爬山腳步與喘息  每次都想著「為什麼要來爬山累死自己」，但每次站上巨石眺望台北市容，還是會心滿意足地想要再來一次。",
          "象山站多人腳步聲  好像大家都有這個默契，有空時就來這邊走走，遠眺這座城市的高低起伏，想想自己在這裡生根打拼的初衷。",
        ],
        select: {
          melody: 0,
          beat: 0,
          env: 0
        },
        res_url: "/static/audio/互動音樂/",
        status: {
          melody: false,
          beat: false,
          env: false
        },
        volume_melody: 100,
        volume_beat: 75,
        volume_env: 100,
        timer: null,
        playing: false,
        xs_part: 1,
        xs_mode: $(window).width()<768,
        sync_interval: null,

      };
    },
    watch:{
      select: function(){
        this.reload();
        // ga('send', 'event', 'MusicPlayground', 'Select',  this.select.melody+"," +this.select.beat+"," +this.select.env);
      },
      volume_melody: function(){
        $("audio.pg1")[0].volume=1.0*this.volume_melody/100.0;
        console.log($("audio.pg1")[0]);
      },
      volume_beat: function(){
        $("audio.pg2")[0].volume=1.0*this.volume_beat/100.0;
      },
      volume_env: function(){
        $("audio.pg3")[0].volume=1.0*this.volume_env/100.0;
      },
      is_in_playground: function(){
        if (!this.is_in_playground){
          this.stop();
        }
      }
    },
    methods: {
      sync: function(){

        $("audio.pg1")[0].currentTime
        =$("audio.pg2")[0].currentTime
        =$("audio.pg3")[0].currentTime;

        console.log("sync");
      },
      play: function(){
        // ga('send', 'event', 'MusicPlayground', 'Play', '');

        this.stop();
        this.playing=true;
        var _this=this;
        
        $("audio.pg1")[0].addEventListener('canplaythrough', function(){
          _this.status.melody=true;
          // console.log("1 ok");
        }, false);
        $("audio.pg2")[0].addEventListener('canplaythrough', function(){
          _this.status.beat=true;
          // console.log("2 ok");
        }, false);
        $("audio.pg3")[0].addEventListener('canplaythrough', function(){
          _this.status.env=true;
          // console.log("3 ok");
        }, false);
        
        this.timer=setInterval(function(){
          if (_this.status.melody && _this.status.beat && _this.status.env){
            console.log("play")
              $("audio.pg1")[0].play();
              $("audio.pg2")[0].play();
              $("audio.pg3")[0].play();
              this.playing=true;
              clearInterval(_this.timer);
              // this.sync_interval= setInterval(function(){
              //    vobj.sync();
              // },8000);

          }
        },100);

      },stop: function(){
        $("audio.pg1")[0].pause();
        $("audio.pg2")[0].pause();
        $("audio.pg3")[0].pause();
        
        $("audio.pg1")[0].currentTime=0;
        $("audio.pg2")[0].currentTime=0;
        $("audio.pg3")[0].currentTime=0;
        this.playing=false;
        // clearInterval(this.sync_interval);
      },
      shuffle: function(){
        this.select.melody= parseInt(Math.random()*this.music.melody.length);
        this.select.beat= parseInt(Math.random()*this.music.beat.length);
        this.select.env= parseInt(Math.random()*this.music.env.length);
        this.reload();
        // ga('send', 'event', 'MusicPlayground', 'Shuffle', '');
      },
      reload: function(){
        this.stop();

        this.status.melody=false;
        this.status.beat=false;
        this.status.env=false;
        
        $("audio.pg1")[0].load();
        $("audio.pg2")[0].load();
        $("audio.pg3")[0].load();
        
        this.play();
        
      },set: function(name,id){
        this.select[name]=id;
        this.reload();
      },getball: function(size){
        return {
          width: 2*Math.sqrt(size)+'px',
          height: 2*Math.sqrt(size)+'px'
        };
      },share_work: function(){
        var share_url= 'https://www.facebook.com/dialog/feed?'+
            'app_id=267788137005626'+
            '&display=popup'+
            '&title=在捷運地景音樂，我用'+this.music.env[this.select.env].name_cht+'的聲音創作'+
            '&caption=臺北聲音地景計畫 「捷運站體環境音樂」徵選活動'+
            '&picture='+"/static/img/og.jpg"+
            '&description='+ this.share_text[this.select.env] +
            '&link='+"/static"+
            '&redirect_uri=/static';
        window.open(share_url);
        ga('send', 'event', 'MusicPlayground', 'Share', 'Share by FB');
      }
    },
    mounted: function(){
        // this.shuffle();
        var vobj=this;
        $("audio.pg1")[0].load();
        $("audio.pg2")[0].load();
        $("audio.pg3")[0].load();


        $(".pg_select").change(function(){
          vobj.reload();
        });
        $("audio.pg1").on("ended", vobj.sync);
        
    }
  }
</script>

<style lang="sass">
@import "../../assets/_mixins.sass"


//-------------------------------------------------------------------------
//page_playfround
.page-playground

  .bg
    position: absolute
    left: -10px
    top: 0px
    height: 100%
    +ab_center
  .bg2
    +ab_center
    position: absolute
    width: 140%
    mix-blend-mode: darken
    opacity: 0.25
  
  select
    display: none

  .btn_container
    text-align: center
    h5
      color: $colorRed
      @media screen and (min-width: $break_md)
        white-space: nowrap
  ul
    list-style: none
    padding: 0px
    margin-top: 40px
    height: 60vh
    overflow-y: scroll
    
    @media screen and (max-width: $break_sm)
      margin-top: 0px
    li
      padding: 5px
      padding-top: 10px
      padding-bottom: 10px
      padding-left: 10px
      border: solid 2px $colorRed
      position: relative
      font-weight: bold
      font-size: 14px
      cursor: pointer

      &:before,&:after
        content: ""
        display: block

        background-color: $colorRed
        +size(6px,12px)
        border-radius: 0px 6px 6px 0px
        +ab_center
      
      &:before
        left: 0
      &:after
        left: initial
        right: -2px
        border-radius: 6px 0px 0px 6px

      &.red
        background-color: $colorRed
        color: $colorWhite
        &:before,&:after
          background-color: $colorWhite
  
  .xs_switcher
    margin-top: 20px
  .xs_switch
    border: solid 2px $colorRed
    cursor: pointer
    text-align: center
    background-color: transparent
    transition: 0.5s
    padding: 10px 0px
    &.red
      background-color: $colorRed
      color: $colorWhite

  .pg_audio_player
    display: none
  .pg_btn
    cursor pointer
    background-color: $colorRed
    display: inline-block
    border-radius: 50%
    position: relative
    cursor: pointer
    +size(50px,50px)
    img
      width: 30px
      +ab_center
      z-index: 5
    &:before
      display: block
      content: ""
      position: absolute
      border-radius: 50%
      +size(60px,60px)
      +ab_center
      border: solid 1px $colorRed
      z-index: 1
      transition: 0.5s

    &:hover
      // background-color: $colorWhite
      &:before
        +size(70px,70px)

  .btn_container
    display: inline-block
    margin-top: 30px
  
  h3
    
    margin-top: 15px
    .pg_icon
      display: none
    @media screen and (min-width: $break_sm)
      white-space: nowrap
      display: inline-block


  h4.col_title
    display: flex
    align-items: center
    height: 30px
    margin-bottom: 0px
    margin-top: 30px

  .vc
    display: inline-block
  //音量大小球球
  .reddot
    background-color: $colorRed
    display: inline-block
    margin-left: 10px
    border-radius: 50%

  //svg icon
  .pg_icon
    width: 50px
  //slider
  .volume_sliders
    background-color: $colorRed
    color: $colorWhite
    // padding: 10px
    .row
      padding: 0px 20px
    h4
      margin: 0
      font-size: 20px
    input
      position: absolute
      top: 50%
      width: 90%

      +ab_center
    .col-xs-2
      padding: 0
      height: 50px
    .col-xs-10
      height: 50px


  input[type=range]
    -webkit-appearance: none /* Hides the slider so that custom slider can be made */
    width: 90% /* Specific width is required for Firefox. */
    background: transparent /* Otherwise white in Chrome */



  input[type=range]::-webkit-slider-thumb
    -webkit-appearance: none


  input[type=range]:focus
    outline: none /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */


  input[type=range]::-ms-track
    width: 100%
    cursor: pointer

    /* Hides the slider so custom styles can be added */
    background: transparent 
    border-color: transparent
    color: transparent

  input[type=range]::-webkit-slider-thumb
    -webkit-appearance: none
    border: 2px solid $colorRed
    +size(15px,15px)
    border-radius: 50%
    background: #ffffff
    cursor: pointer
    margin-top: -7.5px /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
    // box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d /* Add cool effects to your sliders! */

  input[type=range]::-webkit-slider-runnable-track
    width: 100%
    height: 3px
    cursor: pointer
    background: $colorWhite
    border-radius: 1.3px


  .col-xs-10
    position: relative
    input
      width: 100%
</style>