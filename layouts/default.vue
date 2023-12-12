<template>
  <v-app dark style="background-color: rgba(238, 238, 238); ">
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" color="grey" style="color: white" fixed app>
      <v-list>
        <v-list-item style="color: white" v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon style="color: white">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="color: white">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" color="rgba(238, 238, 238)"
      style="box-shadow: none; color: black;  " fixed app class="nav">
      <v-app-bar-nav-icon v-show="!$store.state.showback" style="color: black" @click.stop="drawer = !drawer" />
      <v-btn v-show="$store.state.showback" icon style="color: black; width: 40px; padding-right: 10px" @click="back">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title> {{ $store.state.pagetitle }}</v-toolbar-title>
      <v-spacer />

      <v-btn icon style="color: black; padding-right: 30px" @click.stop="rightDrawer = !rightDrawer">
        HELP
        <v-icon>mdi-share</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container >
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-spacer></v-spacer>
      <v-card color="#8c1515" style="color: white">
        <v-card-title> MFU.HELPDESK v{{ $store.state.version }}</v-card-title>
        <v-card-text>
          <p style="color: white">Last Update: {{ $store.state.updatedate }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn small color="success" @click="updateversion()"
            >Tab for Update Version</v-btn
          >
          <v-spacer />
        </v-card-actions>
      </v-card>
      <v-layout class="pa-0 ma-0" wrap justify-center>
        <v-flex>
          <v-img
            style="margin-top: 10px; padding: 10px"
            src="/qrcode.jpg"
            class="white--text align-end"
          >
          </v-img>
        </v-flex>
        <hr />

        <v-flex class="mt-4 justify-center pl-3">
          <h3>View Manual Instruction:</h3>
          <v-btn
            class="mt-2 justify-center"
            color="primary"
            target="_blank"
            :href="$store.state.userguide"
          >
            <v-icon color="rgba(255,255,255,1)">book</v-icon> User Guide
          </v-btn>
        </v-flex>

        <v-flex sttyle="text-align:center" class="pl-3">
          <br />

          <h3>Chat to Admin:</h3>
          <v-btn
            class="mt-2"
            color="success"
            target="_blank"
            :href="fblink('fb.mfu.cits')"
          >
            <v-icon color="rgba(255,255,255,1)">mdi-message</v-icon> Online
            Support
          </v-btn>
        </v-flex>
      </v-layout>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
// import util from "@/utils";

export default {
  data() {
    return {
      isLogin: false,
      clipped: false,
      bottomNav: 0,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-home",
          title: "Home",
          to: "/",
        },

      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "MFU.Helpdesk",
      showback: false,
    };
  },
  methods: {
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
    fblink(pageid) {
      var str = "";
      if (this.isMobile()) {
        str = "https://m.me/" + pageid;
      } else {
        str = "https://facebook.com/messages/t/" + pageid;
      }

      return str;
    },

    logout() {
      this.$store.commit("updateuser", {});

      localStorage.removeItem("startuser");
      this.$router.push("/user/login");
      this.$auth.logout();
      console.log("---- Logout -----");
      // console.log(this.$store.state.user);
    },
    back() {
      console.log("--->back");
      this.$router.go(-1);
    },
    updateversion() {
      location.reload();
    },
  },

  async created() {
    console.log(this.$store.state.pagetitle);
    this.title = this.$store.state.pagetitle;
    this.showback = this.$store.state.showback;
    this.user = this.$store.state.user;

  },
};
</script>
<style scoped>  

</style>
