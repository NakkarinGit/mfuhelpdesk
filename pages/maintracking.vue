<template>
    <v-container>
        <v-card style="height: 740px; border-radius: 10px; " class="pa-4">
            <h3 style="margin-bottom: 10px;">{{ ticket.isid }} Issue</h3>
            <img :src="issue.img">
            <!-- Stepper -->
            <v-stepper v-model="e6" vertical outlined elevation="0"
                style="padding-bottom: 5px; margin-bottom: 10px; border-radius: 10px;">
                <v-stepper-step :complete="e6 > 1" step="1">
                    Waiting
                    <small>for staff to recieve the report.</small>
                </v-stepper-step>

                <v-stepper-content step="1">
                    <div style="display: flex; justify-content: end;"></div>
                </v-stepper-content>

                <v-stepper-step :complete="e6 > 2" step="2">
                    Information Recieved
                    <small>prepare for check up</small>
                </v-stepper-step>

                <v-stepper-content step="2">
                    <div style="display: flex; justify-content: end;">
                        <v-btn color="primary" v-show="show" @click="e6 = 3; updatetrackstatus('3')">
                            Update
                        </v-btn>
                    </div>
                </v-stepper-content>

                <v-stepper-step :complete="e6 > 3" step="3">
                    On Process
                    <small>we looking on your problem.</small>
                </v-stepper-step>

                <v-stepper-content step="3">
                    <div style="display: flex; justify-content: end;">
                        <v-btn color="primary" v-show="show" @click="e6 = 4; updatetrackstatus('4')">
                            Update
                        </v-btn>
                    </div>
                </v-stepper-content>

                <v-stepper-step :complete="e6 > 4" step="4">
                    Finish
                </v-stepper-step>

                <v-stepper-content step="4">
                    <div style="display: flex; justify-content: end;">
                        <v-btn style="margin-bottom: 5px;" color="primary" v-show="show" @click="e6 = 5; updatetrackstatus('5')">
                            Finish
                        </v-btn>
                    </div>
                </v-stepper-content>
            </v-stepper>

        </v-card>
    </v-container>
</template>

<script>
import CryptoJS from 'crypto-js';
import util from "@/utils";
import { VBtn } from 'vuetify/lib';



export default {
    async created() {
        const id = this.$route.query.id;
        console.log("---ticket id ---");
        console.log(id);

        //load ticket
        const res = await this.$axios.get(this.$store.state.api_url + "/tickets/" + id);
        this.ticket = await res.data.data[0];
        this.isid = await res.data.data[0].isid;
        this.ttid = await res.data.data[0].ttid;
        console.log("------ticket------");
        console.log(this.ticket);
        console.log(this.isid)
        console.log(this.ttid)
        



        //load issue
        const res3 = await this.$axios.get(this.$store.state.api_url + "/issues/" + this.isid);
        this.issue = await res3.data.data[0];
        console.log("------issue------");
        console.log(this.issue);
        
        //load tickettracking
        const res2 = await this.$axios.get(this.$store.state.api_url + "/tickettracking/" + this.ttid);
        this.tracks = await res2.data.data[0];
        this.status= await res2.data.data[0].tkstatus
        console.log("---ticket tracking---")
        console.log(this.tracks)
        console.log(this.status)
        this.e6= this.status

        //load User
        let user = await util.loadUser(this);
        this.user = user;
        this.$store.commit("settitle", "MFU.HELPDESK");
        this.$store.commit("setshowback", true);

        //check user position and toggle show component
        if (user.role === "reporter") {
            console.log("reporter")
            this.show = (false)
        } else {
            this.show = (true)
        }


    },
    methods: {

        async updatetrackstatus(status) {
            const st = {
                "tkstatus": status
            }
            const res4 = await this.$axios.put(this.$store.state.api_url + "/tickettracking/" + this.ttid, st);
            console.log(res4)
        },

        test(text) {
            console.log(text)
        },

    },
    name: "AddToHomeScreen",
    data: () => ({
        user: {},
        ticket: "",
        isid: "",
        Isid: "",
        issue: "",
        e6: "",
        tracks: "",
        show: "false",
        items: [
            { title: 'Waiting' },
            { title: 'Information Recieved' },
            { title: 'On Process' },
            { title: 'Finish' },
        ],

    }),
    components: { VBtn }
};
</script>

<style scoped>
img {
    width: 90px;
    height: 90px;
    margin-left: 20px;
    margin-bottom: 15px;
}
</style>



