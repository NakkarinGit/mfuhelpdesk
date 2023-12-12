<template>
    <v-container fluid ma-0 pa-0>
        <!-- <div>{{ this.$route.query.id }}</div> -->
        <v-row dense>
            <v-col v-for="card in filtercard" :key="card.title" :cols="card.flex" xs="12" sm="4" md="3" lg="2" xl="2">
                <v-card @click="openlink(card.link, card.title)" flat outlined
                    style="height:180px;border-radius: 20px; text-align: center;align-items: center;">
                    <!-- <a :href="covidlink(card.link)"  style="text-decoration: none, color:black; align-items: center; text-align:center"> -->
                    <v-img :src="card.img" style="margin:auto;margin-top:15px;" height="90px" width="90px">
                    </v-img>
                    <div style="padding-top:0.3em;color:rgb(31, 31, 31)">{{ card.issuename }}</div>
                    <div style="font-size: 0.8em;color: rgb(88, 86, 86);"> {{ card.description }}</div>
                    <!-- </a> -->
                </v-card>
            </v-col>
        </v-row>

        <v-card flat outline
            style="border:1px solid rgba(236, 234, 234, 0.71); padding:0.5em; margin-top: 0.5em;border-radius: 20px;background-color: rgba(237, 234, 234, 0.277);">
            <!-- <v-card-title>User Menu::</v-card-title> -->
            <v-row dense>
                <v-col v-for="card in cards" :key="card.title" :cols="card.flex" xs="12" sm="4" md="3" lg="2" xl="2">
                    <v-card flat outlined style="height:120px;border-radius: 20px; text-align: center;align-items: center;">
                        <!-- <a :href="covidlink(card.link)"  style="text-decoration: none, color:black; align-items: center; text-align:center"> -->
                        <v-img :src="card.img" style="margin:auto;margin-top:15px;" height="60px" width="60px">
                        </v-img>
                        <div style="padding-top:0.3em;color:rgb(31, 31, 31)">{{ card.title }}</div>
                        <!-- <div style="font-size: 0.8em;color: rgb(88, 86, 86);"> {{ card.subtitle }}</div> -->
                        <!-- </a> -->
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
        <div>
            <button v-if="deferredPrompt" ref="addBtn" class="add-button" @click="clickCallback">
                Add
            </button>
        </div>
    </v-container>
</template>
  
<script>
import CryptoJS from 'crypto-js';

export default {
    async created() {
        var issue = this.$route.query.title;
        const id = this.$route.query.id;
        
        //load Issue Card
        const res = await this.$axios.get(this.$store.state.api_url + "/issues");
        this.issuecard = await res.data.data;
        console.log("---- issue ----")
        console.log(this.issuecard)


        this.filtercard = this.issuecard.filter((issue) => {
            return issue.deptid == id;
        })
        this.$store.commit("settitle", issue);
        this.$store.commit("setshowback", true);


    },
    methods: {

        openlink(link, title) {
            console.log(link + "&title=" + title)
            this.$router.push(link + "&title=" + title);
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
        cards:"",
        issuecard: [
            { group: "general", id: "noise", title: "Noise", img: "/icons/sub/noise.png", flex: 6 }
        ],
        filtercard: [

        ],
        issuecard: [

            {
                group: "general",
                id: "noise",
                title: "Noise",
                subtitle: "Report General Issue",
                link: "/reportissue?id=noise&group=general",
                img: "/icons/sub/noise.png",
                flex: 6,
            },
            {
                group: "general",
                id: "smell",
                title: "Bad Smell",
                subtitle: "Report General Issue",
                link: "/reportissue?id=smell&group=general",
                img: "/icons/sub/smell.png",
                flex: 6,
            },
            {
                group: "general",
                id: "gabage",
                title: "Gabage",
                subtitle: "Report General Issue",
                link: "/reportissue?id=gabage&group=general",
                img: "/icons/sub/garbage-truck.png",
                flex: 6,
            },
            {
                group: "building",
                id: "water",
                title: "Water",
                subtitle: "Report Building Issue",
                link: "/reportissue?id=water&group=building",
                img: "/icons/sub/water.png",
                flex: 6,
            },
            {
                group: "building",
                id: "electricity",
                title: "Electricity",
                subtitle: "Report Building Issue",
                link: "/reportissue?id=electricity&group=building",
                img: "/icons/sub/plug.png",
                flex: 6,
            },

            {
                group: "building",
                id: "structure",
                title: "Structure",
                subtitle: "Report Building Issue",
                link: "/reportissue?id=structure&group=building",
                img: "/icons/sub/couch.png",
                flex: 6,
            },

            {
                group: "cits",
                id: "wifi",
                title: "WiFi",
                subtitle: "Report IT Issue",
                link: "/reportissue?id=wifi&group=cits",
                img: "/icons/sub/wifi.png",
                flex: 6,
            },

            {
                group: "cits",
                id: "internet",
                title: "Internet",
                subtitle: "Report IT Issue",
                link: "/reportissue?id=wifi&group=cits",
                img: "/icons/sub/world.png",
                flex: 6,
            },
            {
                group: "cits",
                id: "computer",
                title: "Computer",
                subtitle: "Report IT Issue",
                link: "/reportissue?id=coputer&group=cits",
                img: "/icons/sub/virus-warning.png",
                flex: 6,
            },

            {
                group: "cas",
                id: "speaker",
                title: "Speaker",
                subtitle: "Report Audio Issue",
                link: "/reportissue?id=speaker&group=cas",
                img: "/icons/sub/music.png",
                flex: 6,
            },
            {
                group: "cas",
                id: "projector",
                title: "Projector",
                subtitle: "Report Audio Issue",
                link: "/reportissue?id=projector&group=cas",
                img: "/icons/sub/projector.png",
                flex: 6,
            },
            {
                group: "cas",
                id: "mice",
                title: "Mice",
                subtitle: "Report Audio Issue",
                link: "/reportissue?id=mice&group=cas",
                img: "/icons/sub/mic.png",
                flex: 6,
            },

            {
                group: "mlii",
                id: "lms",
                title: "LMS",
                subtitle: "Report LMS Issue",
                link: "/reportissue?id=lms&group=mlii",
                img: "/icons/sub/online_lms.png",
                flex: 6,
            },
            {
                group: "mlii",
                id: "mdl",
                title: "MDL",
                subtitle: "Report LMS Issue",
                link: "/reportissue?id=mdl&group=mlii",
                img: "/icons/sub/inquiry.png",
                flex: 6,
            },
            {
                group: "mlii",
                id: "exam",
                title: "Online Exam",
                subtitle: "Report LMS Issue",
                link: "/reportissue?id=exam&group=mlii",
                img: "/icons/sub/exam.png",
                flex: 6,
            },
            {
                group: "stic",
                id: "chemical",
                title: "Chemical",
                subtitle: "Report Sci Lab Issue",
                link: "/reportissue?id=chemical&group=stic",
                img: "/icons/sub/chemicals.png",
                flex: 6,
            },

            {
                group: "stic",
                id: "tools",
                title: "Lab Tools",
                subtitle: "Report Sci Lab Issue",
                link: "/reportissue?id=tools&group=stic",
                img: "/icons/sub/chemistry.png",
                flex: 6,
            },
        ],
    }),
};
</script>