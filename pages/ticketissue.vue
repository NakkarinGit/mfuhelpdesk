<template>
    <v-container ma-0 pa-0 style="display: flex; justify-content: center;">
        
            <v-card flat outlined class="pa-4" style="height: 740px; width: 380px; border-radius: 15px;">

                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <button style="color: rgb(247, 53, 53);" @click="deleteticket(ticketcard.tkid)">Cancel</button>
                    <button style="color: rgb(53, 115, 247);" @click="openlink(ticketcard.tkid)">Status</button>
                </div>
                <v-divider style="margin-bottom: 25px;"></v-divider>
                <h3 style="padding-bottom: 10px;">{{ issue.issuename }} Issue </h3>
                <p>Descprition: {{ ticketcard.ticketdetail }}</p>
                <p>Location: lamduan 1</p>
                <p>Contact: {{ user.phone }} </p>
                <p>Name: {{ user.gname }}</p>
                <p>ID: {{ user.userid }}</p>
                <p>Date: {{ ticketcard.startdate }}</p>
                <p>Photo: {{ pic }}</p>
                
                <v-divider></v-divider>


            </v-card>
        
    </v-container>
</template>

<script>
import CryptoJS from 'crypto-js';
import util from "@/utils";
import { VBtn } from 'vuetify/lib';
import Vue from "vue"
import VueSimpleAlert from "vue-simple-alert";
import { ref } from 'vue';

Vue.use(VueSimpleAlert);


export default {
    async created() {
        const id = this.$route.query.id;
        const loading = ref(false)
        console.log("---ticket id ---");
        console.log(id);

        //load ticket
        const res = await this.$axios.get(this.$store.state.api_url + "/tickets/" + id);
        this.ticketcard = await res.data.data[0];
        this.isid = await res.data.data[0].isid;
        console.log("------ticket------");
        console.log(this.ticketcard);
        console.log(this.isid)
        const Isid = this.isid



        //load issue
        const res3 = await this.$axios.get(this.$store.state.api_url + "/issues/" + Isid);
        this.issue = await res3.data.data[0];
        console.log("------issue------");
        console.log(this.issue);


        //load User
        let user = await util.loadUser(this);
        this.user = user;

        //set nav
        this.$store.commit("settitle", "Report");
        this.$store.commit("setshowback", true);

        //check photo is emtry or not.
        const pic = this.ticketcard.picpath;
        console.log(pic)
        if(pic===null || pic===""){
            this.pic=("-")
        }
        else{
            this.pic = this.ticketcard.picpath;
        }




        //load status tracking
        // const res2 = await this.$axios.get(this.$store.state.api_url + "/tickettracking");
        // this.statustracking = await res2.data.data;
        // console.log("------tickettracking------");
        // console.log(this.statustracking);
    },


    methods: {
        openlink(id) {
            console.log("---link---")
            console.log(id)
            this.$router.push("/maintracking?id=" + id);
        },

        deleteticket(tkid) {
            console.log("---tkid---")
            console.log(tkid);
            this.$confirm("Are you sure?").then(() => {
                if(confirm){
                    this.$axios.delete(this.$store.state.api_url + "/tickets/" + tkid);
                }
                this.$router.push("/tracking")   
            });
            

        },
    },


    name: "AddToHomeScreen",
    data: () => ({
        user: {},
        ticketcard: "",
        tkid: "",
        pic:"",
        issue:"",
    }),
    components: { VBtn }
};
</script>


