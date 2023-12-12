<template>
    <v-container class="ma-0 pa-0">
      <v-layout column justify-center align-center>
        <v-card flat outlined class="pa-5" width="500">
          <v-list>
            <v-list-item>
              <v-list-item-avatar size="100">
                <img :src="user.picture" />
              </v-list-item-avatar>
  
              <v-list-item-content>
                <v-list-item-title class="ma-2 font-weight-bold">{{
                  user.gname
                }}</v-list-item-title>
                 
                <v-list-item-subtitle class="ma-2 font-weight-bold">{{
                  user.email
                }}</v-list-item-subtitle>
                 <v-list-item-subtitle class="ma-2 font-weight-bold">{{
                  user.phone
                }}</v-list-item-subtitle>
              </v-list-item-content>
  
            </v-list-item>
          </v-list>

          <v-card-text>
            <v-row class="shrink">
              <v-col  class="pa-1" cols="4">Name:</v-col>
              <v-col  class="pa-1" cols="8">{{ user.name }}</v-col>
            </v-row>
            <v-row class="shrink">
              <v-col class="pa-1" cols="4">Department:</v-col>
              <v-col class="pa-1" cols="8">{{ user.dept }}</v-col>
            </v-row>
            <v-row class="shrink">
              <v-col  class="pa-1" cols="4">Position:</v-col>
              <v-col  class="pa-1" cols="8">{{ user.position }}</v-col>
            </v-row>

          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="logout()" class="primary">Logout</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-layout>
    </v-container>
  </template>
  <script>
//   import { QRCanvas } from "qrcanvas-vue";
  import util from "@/utils";
  
//   const mfulogo = new Image();
//   mfulogo.src = "/mfu_logo2.png";
  export default {

    data() {
      return {
        user: {},
        vcard:"",
      };
    },
  
    async created() {

        this.$store.commit("settitle", "User Profile");
        this.$store.commit("setshowback", true);
        this.user = await util.loadUser(this);
        console.log(this.user)

  
    },
    methods: {
      genCode(codestr, qr) {
        var code = codestr;
        // console.log("---- gencode -----")
        
        var obj = { data: code,logo: mfulogo };
        //   var obj = { data: code, };
        // console.log(obj)
        return obj;
      },
      logout() {
        this.$store.commit("updateuser", {});
  
        localStorage.removeItem("startuser");
        location.href="https://start.mfu.ac.th"

      },
      onUpdated() {
        // this.getLastedId();
        console.log("updated");
      },
    },
  };
  </script>
  <style scoped>
  .error {
    font-weight: bold;
    color: red;
  }
  </style>