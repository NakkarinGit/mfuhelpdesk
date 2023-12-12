<template>
  <v-container fluid ma-0 pa-0>
    <!-- normal user -->
    <div v-if="show1">
      <v-row dense>
        <v-col v-for="card in deptcard" :key="card.title" :cols="card.flex" xs="12" sm="4" md="3" lg="2" xl="2">
          <v-card @click="openlink(card.link)" flat outlined
            style="height:180px;border-radius: 20px; text-align: center;align-items: center;">
            <v-img :src="card.img" style="margin:auto;margin-top:15px;" height="90px" width="90px">
            </v-img>
            <div style="padding-top:0.3em;color:rgb(31, 31, 31)">{{ card.title }}</div>
            <div style="font-size: 0.8em;color: rgb(88, 86, 86);"> {{ card.subtitle }}</div>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- admin -->
    <div v-if="show2">
      <v-row dense>
        <v-col v-for="card in admincard" :key="admincard.title" :cols="card.flex" xs="12" sm="4" md="3" lg="2" xl="2">
          <v-card @click="openlink(card.link)" flat outlined
            style="height:180px;border-radius: 20px; text-align: center;align-items: center;">
            <v-img :src="card.img" style="margin:auto;margin-top:30px;" height="90px" width="90px">
            </v-img>
            <div style="padding-top:0.3em;color:rgb(31, 31, 31)">{{ card.title }}</div>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- ground admin -->
    <div v-if="show3">
      <v-row dense>
        <v-col v-for="card in groundadmincard" :key="groundadmincard.title" :cols="card.flex" xs="12" sm="4" md="3" lg="2" xl="2">
          <v-card @click="openlink(card.link)" flat outlined
            style="height:180px;border-radius: 20px; text-align: center;align-items: center;">
            <v-img :src="card.img" style="margin:auto;margin-top:30px;" height="90px" width="90px">
            </v-img>
            <div style="padding-top:0.3em;color:rgb(31, 31, 31)">{{ card.title }}</div>
          </v-card>
        </v-col>
      </v-row>
    </div>
    
    <!-- subset -->
    <v-card flat outline
        style="border:1px solid rgba(236, 234, 234, 0.71); padding:0.5em; margin-top: 0.5em;border-radius: 20px;background-color: rgba(237, 234, 234, 0.277);">
        <v-row dense>
          <v-col v-for="card in cards" :key="card.title" :cols="card.flex" xs="12" sm="4" md="3" lg="2" xl="2">
            <v-card @click="openlink(card.link)" flat outlined
              style="height:120px;border-radius: 20px; text-align: center;align-items: center;">
              <v-img :src="card.img" style="margin:auto;margin-top:15px;" height="60px" width="60px">
              </v-img>
              <div style="padding-top:0.3em;color:rgb(31, 31, 31)">{{ card.title }}</div>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
  </v-container>
</template>

<script>
import CryptoJS from 'crypto-js';
import util from "@/utils";


export default {
  async created() {
    this.$store.commit("settitle", "MFU.HELPDESK");
    this.$store.commit("setshowback", false);



    //load Dept Card
    const res = await this.$axios.get(this.$store.state.api_url + "/departments");
    this.deptcard = await res.data.data;
    console.log(this.deptcard)



    var startEncryptStr = this.$route.query.startdata;
    if (startEncryptStr) {
      let decode = decodeURIComponent(startEncryptStr);
      let userData = await this.helpdeskDecrypt(decode)
      console.log(userData)
      let data = JSON.parse(userData)

      localStorage.setItem("startuser", startEncryptStr);
      console.log(data)

      //check user role and adjust ui component
      if(data.role === "superadmin"){
        this.show1 = (false)
        this.show2 = (true)
        this.show3 = (false)
        console.log(data.role)
      }else if(data.role === "deptadmin"){
        this.show1 = (false)
        this.show2 = (true)
        this.show3 = (false)
        console.log(data.role)
      }else if(data.role === "groudadmin"){
        this.show1 = (false)
        this.show2 = (false)
        this.show3 = (true)
        console.log(data.role)
      }else{
        this.show1 = (true)
        this.show2 = (false)
        this.show3 = (false)
        console.log(" reporter ")
      }
      
      

    } else {
      let user = await util.loadUser(this);
      console.log("----init load user ----")
      console.log(user)
    }


  },
  methods: {

    openlink(link) {
      console.log(link)
      this.$router.push(link);
    },

    helpdeskDecrypt(txt) {
      if (!txt) {
        return ''
      }
      let encrypt = CryptoJS.AES.decrypt(txt, this.$store.state.helpdeskaeskey);
      let data = encrypt.toString(CryptoJS.enc.Utf8);
      return data;
    },
    getPosition() {
      return new Promise(function (resolve, reject) {
        var options = {};
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });
    },
  },


  name: "AddToHomeScreen",
  data: () => ({
    deferredPrompt: null,
    refnatid: "",
    refname: "",
    qname: "",
    qemail: "",
    quserid: "",
    deptcard: [],
    show1: "",
    show2:"",
    show3:"",
    covidcards: [

      {
        id: "general",
        title: "General Issues",
        subtitle: "Noise, Smell, Garbage",
        link: "/submenu?id=general&title=General Issue",

        phone: "",
        web: "",
        img: "/icons/main/main01_general.png",

        flex: 6,
      },
      {
        id: "building",
        title: "Building",
        subtitle: "Water, Electricity, Structure",
        link: "/submenu?id=building&title=Building",
        web: "",
        phone: "",
        fb: "",
        img: "/icons/main/main02_buildings.png",
        flex: 6,
      },

      {
        id: "it",
        title: "IT Issues",
        subtitle: "WiFi, Internet, Computer",
        link: "/submenu?id=cits&title=IT Issues",
        web: "",
        phone: "",
        fb: "",
        img: "/icons/main/main03_cits.png",
        flex: 6,
      },

      {
        id: "cas",
        title: "Audio Issues",
        subtitle: "Speaker, Projector, Mice",
        link: "/submenu?id=cas&title=Audio Issues",
        web: "",
        phone: "",
        fb: "",
        img: "/icons/main/main04_cas.png",
        flex: 6,
      },
      {
        id: "mlii",
        title: "LMS Issues",
        subtitle: "LMS, MDL, Online",
        link: "/submenu?id=mlii&title=LMS Issues",
        web: "",
        phone: "",
        fb: "",
        img: "/icons/main/main05_mlii.png",
        flex: 6,
      },
      {
        id: "stic",
        title: "Sci Lab Issues",
        subtitle: "Microscope, Tube, Science Tool",
        link: "/submenu?id=stic&title=Sci Lab Issues",
        web: "",
        phone: "",
        fb: "",
        img: "/icons/main/main06_stic.png",
        flex: 6,
      },

    ],

    cards: [

      {
        title: "History",
        subtitle: "Report History",
        link: "/history",
        web: "",
        phone: "",
        fb: "",
        img: "/icons/main/main07_history.png",
        flex: 4,
      },

      {
        title: "Tracking",
        subtitle: "Report History",
        link: "/tracking",
        web: "",
        phone: "",
        fb: "",
        img: "/icons/main/main08_traking.png",
        flex: 4,
      },
      {
        title: "Profile",
        subtitle: "Report History",
        link: "/profile",
        web: "",
        phone: "",
        fb: "",
        img: "/icons/main/main09_profile.png",
        flex: 4,
      },

    ],
    admincard: [

      {
        id: "overview",
        title: "Report Overview",
        subtitle: "",
        link: "/Overview",

        phone: "",
        web: "",
        img: "/icons/admin/overview.png",

        flex: 6,
      },
      {
        id: "history",
        title: "History",
        subtitle: "",
        link: "/history",
        web: "",
        phone: "",
        fb: "",
        img: "/icons/admin/history blue.png",
        flex: 6,
      },

      {
        id: "adminmanage",
        title: "Admin Management",
        subtitle: "",
        link: "/adminmanagement",
        web: "",
        phone: "",
        fb: "",
        img: "/icons/admin/admin management.png",
        flex: 6,
      },

      {
        id: "dashboard",
        title: "Dashboard",
        subtitle: "",
        link: "/dashboard",
        web: "",
        phone: "",
        fb: "",
        img: "/icons/admin/dashboard.png",
        flex: 6,
      },
      {
        id: "issuemanage",
        title: "Issues Management",
        subtitle: "",
        link: "/issuesmanagement",
        web: "",
        phone: "",
        fb: "",
        img: "/icons/admin/bullet-points.png",
        flex: 6,
      },
    ],
    groundadmincard: [

      {
        id: "overview",
        title: "Report Overview",
        subtitle: "",
        link: "/Overview",

        phone: "",
        web: "",
        img: "/icons/admin/overview.png",

        flex: 6,
      },
      {
        id: "history",
        title: "History",
        subtitle: "",
        link: "/history",
        web: "",
        phone: "",
        fb: "",
        img: "/icons/admin/history blue.png",
        flex: 6,
      },
      {
        id: "dashboard",
        title: "Dashboard",
        subtitle: "",
        link: "/dashboard",
        web: "",
        phone: "",
        fb: "",
        img: "/icons/admin/dashboard.png",
        flex: 6,
      },
    ],
  }),
};
</script>