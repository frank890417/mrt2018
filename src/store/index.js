import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import moduleLoading from './modules/loading.js'
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    loading: moduleLoading,
  },
  state: {
    menuState: false,
    mobile: window.innerWidth < 1200,
    searchKeyword: "",
    bgColor: "#0B0E2A",
    colors: {
      blue: "#0B0E2A",
      red: "#CE2834",
      white: "#F9F8F7"
    },
    lines: [
      {
        name: "文湖線",
        bgcolor: "#BA8B2E",
        color: "white"
      },
      {
        name: "淡水信義線",
        bgcolor: "#D41433",
        color: "white"
      },
      {
        name: "松山新店線",
        bgcolor: "#0C8155",
        color: "white"
      },
      {
        name: "中和新蘆線",
        bgcolor: "#E8AF29",
        color: "black"
      },
      {
        name: "板南線",
        bgcolor: "#1568B2",
        color: "white"
      }
    ],
    stations: [
      {
        // path: ,
        eng_name: "Nangang Station",
        name: "南港站",
        description: `1885年引進茶樹種植，為臺灣包種茶發源地的南港，成為臺北市重要農業地帶之一。而後為振興經濟成為工業區的南港，吸引了許多工廠遷入帶來了繁榮。
現今持續投入的重點建設，如高鐵南港站、南港金融園區、南港展覽館以及未來華語流行音樂的重要地標「北部流行音樂中心」，勢必為南港站帶來更多元的發展。`,
        keywords: "懷舊、改變、交會",
        audition: true,
        img: "/static/img/stations/南港站.svg",
        line: ["板南線"]
      },
      {
        eng_name: "Ximen Station",
        name: "⻄⾨站",
        description: `日治時期的西門町為台北府城西門外的荒郊野外，日本人決定仿效東京淺草區，在此設立休閒商業區。如今西門為台北市西區最重要且國際化程度最高的消費商圈，成為青少年次文化的代表、國際觀光背包客造訪之地。`,
        keywords: "年輕、潮流、多元",
        audition: true,
        img: "/static/img/stations/西門站.svg",
        line: ["板南線","松山新店線"]
      },
      {
        eng_name: "Beimen Station",
        name: "北⾨站",
        description: `臺北府城的北門，為清代城門建築，是早期城內通往大稻埕一帶的主要孔道。現為臺北府城五大城門中唯一保持建城原貌者，也是臺北市區僅存不多的清代建築之一。 
而歷經時代的演變過程、承載無數人民回憶的北門，讓現今車水馬龍的臺北中心，擁有一個能穿梭時空走著不同步調的風景。`,
        keywords: "懷舊、封存、寧靜",
        audition: true,
        img: "/static/img/stations/北門站.svg",
        line: ["松山新店線"]
      },
      {
        eng_name: "Zhongshan Station",
        eng_name: "Chiang Kai-Shek Memorial Hall station",
        name: "中⼭站",
        description: `日治時期的中山北路，為高官貴人所居住的高級住宅區；國民政府時期，因連接士林官邸成為國外大使拜訪的必經之地，同為許多國家領事館的設立點。
過去同為時尚指標聚集地的中山，現今以五金零件街、黑手業為主的赤峰街，與當代藝術館齊力推動藝術家來此進行創作後，成為近來台北最新文創熱點。`,
        keywords: "手工、風格、融合",
        audition: true,
        img: "/static/img/stations/中山站.svg",
        line: ["淡水信義線","松山新店線"]
      },
      {
        eng_name: "Yuanshan Station",
        name: "圓⼭站",
        description: `圓山遺址為全台灣最珍貴的史前遺址之一，也是罕見的多文化層遺址。貝塚為該遺址與圓山文化的最大特色，種類多半屬於半淡半鹹水性的貝類，驗證了圓山時期的臺北湖為一鹹淡水交雜湖泊。
充滿自然文化氣息的圓山，加入了花博公園，成為了家庭、親子與外國旅客的必經景點，為史前遺跡增添了不少新的活力。`,
        keywords: "自然、遺跡、探索",
        audition: true,
        img: "/static/img/stations/圓山站.svg",
        line: ["淡水信義線"]
      },
      {
        eng_name: "Taipei 101 Station",
        name: "台北101站",
        description: `台北重要地標「台北101」曾擁有世界第一高樓之紀錄，目前為世界第五高樓以及環太平洋地震帶最高摩天大廈，並於大樓內擁有全球第二大的阻尼器。
台北101內除為辦公大樓外，也設有一般民眾能進出的購物中心、餐廳、室內外觀景台，每年跨年倒數更於建築物外實施全球首見新年煙火表演，成為國台北的首要旅遊景點`,
        keywords: "地標、紀錄、國際",
        audition: true,
        img: "/static/img/stations/101.svg",
        line: ["淡水信義線"]
      },
      {
        eng_name: "Jiannan Rd. Station",
        name: "劍南路站",
        description: `台北目前最古老的廟宇劍潭古寺，又名劍潭寺、觀音寺，於台北境內擁有約370年歷史。寺旁碑林園園內也保有不少舊石碑，最古老則為咸豐二年(西元1852)的「奉憲示禁碑」。 歷經時代演變確保有者歷史記憶的建築與文物，讓不少旅人為此而踏上旅程，想親自目睹存載這歷史記憶風情的古老寺廟。`,
        keywords: "幽靜、古老、韻味",
        audition: true,
        img: "/static/img/stations/美麗華.svg",
        line: ["文湖線"]
      },
      {
        eng_name: "Dahu Park Station",
        name: "⼤湖公園站",
        description: `為台北市最大的大型湖泊之一，因白鷺成群又稱白鷺湖，興建於1979年（民國六十八年），採中國園林式設計。
公園內設施除休憩、環湖步道及野餐空間等外，也設置了室內外游泳池及健身房，成為炎炎夏日民眾消暑及健身聖地。`,
        keywords: "遊樂、消暑",
        audition: true,
        img: "/static/img/stations/大湖公園站.svg",
        line: ["文湖線"]
      },
      {
        eng_name: "Xingtian Temple Station",
        name: "⾏天宮站",
        description: `行天宮是大臺北地區的信仰重鎮，主神為關聖帝君(恩主公)，許多民眾皆會來此敬拜恩主公，又稱恩主公廟、臺北關帝廟或臺北武廟，是臺灣知名的關帝廟。
台灣的廟宇賦予著傳統藝術及台灣民間習俗文化，而知名的關帝廟不只供信仰的民眾前來敬拜，也成了不同信仰及外國旅客認識台灣文化的重要景點。`,
        keywords: "文化、習俗、虔誠",
        audition: true,
        img: "/static/img/stations/行天宮.svg",
        line: ["中和新蘆線"]
      },
      {
        eng_name: "Daqiaotou Station",
        name: "⼤橋頭站",
        description: `為米食文化發源處的大橋頭一帶，早期又稱作草埔仔、四坎仔，由於鄰近淡水河，地勢平坦、土壤肥沃，因此自古盛產稻米，居民便用此研發出各項米食產品。
而迪化街商圈則為台灣南北貨、茶葉、中藥和布匹的批發貨集散地，更是台灣農曆新年採購必去的年貨大街。`,
        keywords: "文化、生產、起源",
        audition: true,
        img: "/static/img/stations/大橋頭站.svg",
        line: ["中和新蘆線"]
       
      },
      {
        eng_name: "Songshan Airport",
        name: "捷運松山機場站",
        description: `從日治時期的軍用機場、光復後空軍接管改為民航用途、民國 60 年航站大廈落成啟用，是東南亞首屈一指的國際機場<br><br>
民國 68 年改為國內機場，到後來成為小三通機場，松山機場見證了台灣政治與經濟發展的各個階段與變化，承載著許多人離鄉背井、經商或求學等重要的記憶。 `,
        keywords: "希望、轉變、輕快",
        audition: false,
        img: "/static/img/stations/scene_airport.svg",
        line: ["松山新店線"]

      },
      {
        eng_name: "Taipei Arena",
        name: "捷運台北小巨蛋",
        description: `台北小巨蛋的前身是市立棒球場，曾舉辦過多場大型國際比賽，而現在是一座多功能體育館，主要為體育活動盛事及大型演唱會場地，為提升台北市健康形象和國際化的重要地標。

附近的複合式商圈是民眾假日休憩娛樂的好去處，是台北市充滿熱情活力的中心區域。 
`,
        keywords: "活力、熱情",
        audition: false,
        img: "/static/img/stations/scene_egg.svg",
        line: ["松山新店線"]

      },
      {
        eng_name: "Longshan Temple",
        name: "捷運龍山寺站",
        description: `艋岬是台北市開發最早的地方，也就是現在的「萬華」，而「龍山寺」是當地居 民信仰、活動、集會和指揮的中心，保佑著一批又一批渡海來台的先民能夠平安順利，富有早期居民打拚、奮鬥的文化歷史。

龍山寺擁有獨一無二的雕塑，平時香火鼎盛，附近的懷舊氣氛更讓龍山寺成為台北著名的觀光景點。 `,
        keywords: "傳統（復古）、熱鬧",
        audition: false,
        img: "/static/img/stations/scene_temple.svg",
        line: ["板南線"]

      },
      {
        eng_name: "Xiangshan Station",
        name: "捷運象山站",
        description: `象山站為台北捷運信義線—淡水線的延伸段，全線長 7.9 公里，座落於台北市信義區，是台北市的後山。

除了是城市人群繁忙中的休憩園地外，更是許多人眺望台北市夜景與繁華信義區的重要景點。`,
        keywords: "舒適、自在、生態",
        audition: false,
        img: "/static/img/stations/scene_mountain.svg",
        line: ["淡水信義線"]

      },
      {
        eng_name: "Dongman Station",
        name: "捷運東門站",
        description: `歷經清治時期、日治時期、戰後時期，東門市場與戰後官兵及眷屬們生活上的點點滴滴。而掌管飲食的官夫人們對於美食的挑嘴，讓東門市場的美食不但具有色、香、味，更有著濃濃的家鄉味。

蜿蜒的小巷弄內隱藏著道地小吃，是名人、美食家的口袋名單，也因為這樣東門市場成為許多人眼中階級色彩濃厚的「貴族市場」。`,
        keywords: "歷史情懷、特色美食",
        audition: false,
        img: "/static/img/stations/scene_door.svg",
        line: ["中和新蘆線","淡水信義線"]

      },
    ]
  },
  mutations: {
    setMenuState(state, value) {
      window.jf_menu_loaded = true
      if (value == true && !window.jf_menu_loaded) {

        _jf.flush();
      }
      state.menuState = value
    },
    setBgColor(state,value){
      state.bgColor = state.colors[value]
    }
  },
  actions: {
    openSearch(context, value) {
      context.state.searchKeyword = value
      context.commit("setMenuState", true)
    }
  }
})
export default store