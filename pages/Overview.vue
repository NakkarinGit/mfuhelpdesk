<template>
    <v-container>
        <v-card v-if="show" v-for="deptcards in deptcard" :key="deptcard.deptid" 
            style="padding-top: 10px; padding-left: 5px; margin-bottom: 10px; border-radius: 10px;">
            <div style="display: flex;">
                <div style="width: 30px; height: 30px; padding-right: 5px;">
                    <v-img :src="deptcards.img"></v-img>
                </div>

                <h4>{{ deptcards.deptname }} Issues</h4>
            </div>
            <div class="line2"></div>
            <v-card v-for="issues in issue" :key="issue.isid" v-if="deptcards.deptid == issues.deptid"
                @click="openlink(issues.isid)" flat>
                <div style="display: flex;">
                    <div style="width: 30px; height: 30px; padding-right: 5px;">
                        <v-img :src="issues.img"></v-img>
                    </div>
                    <p>{{ issues.issuename }}</p>

                </div>
            </v-card>
        </v-card>

        <v-card  v-for="deptcards in deptcard" :key="deptcard.deptid" v-if="!show && deptcards.deptid==user.dept"
            style="padding-top: 10px; padding-left: 5px; margin-bottom: 10px; border-radius: 10px;">
            <div style="display: flex;">
                <div style="width: 30px; height: 30px; padding-right: 5px;">
                    <v-img :src="deptcards.img"></v-img>
                </div>

                <h4>{{ deptcards.deptname }} Issues</h4>
            </div>
            <div class="line2"></div>
            <v-card v-for="issues in issue" :key="issue.isid" v-if="deptcards.deptid == issues.deptid"
                @click="openlink(issues.isid)" flat>
                <div style="display: flex;">
                    <div style="width: 30px; height: 30px; padding-right: 5px;">
                        <v-img :src="issues.img"></v-img>
                    </div>
                    <p>{{ issues.issuename }}</p>

                </div>
            </v-card>
        </v-card>

    </v-container>
</template>

<script>
import CryptoJS from 'crypto-js';
import util from "@/utils";




export default {

    async created() {
        this.$store.commit("settitle", "Report Overview");
        this.$store.commit("setshowback", true);


        //load ticket
        const res = await this.$axios.get(this.$store.state.api_url + "/tickets");
        this.ticket = await res.data.data;
        console.log("------ticket------")
        console.log(this.ticket)

        //load Dept Card
        const res2 = await this.$axios.get(this.$store.state.api_url + "/departments");
        this.deptcard = await res2.data.data;
        console.log("------deptcard------")
        console.log(this.deptcard)

        //load issue Card
        const res3 = await this.$axios.get(this.$store.state.api_url + "/issues");
        this.issue = await res3.data.data;
        console.log("------issue------")
        console.log(this.issue)


        //load User
        let user = await util.loadUser(this);
        this.user = user;

         //check user position and toggle show component
         if (user.role === "reporter") {
                console.log("reporter")
                this.show = (false)
            } else if (user.role === "superadmin") {
                this.show = (true)
                console.log(user.role)
            } else if (user.role === "deptadmin") {
                this.show = (false)
                console.log(user.role)
                const dept = user.dept
                console.log(dept)
            } else if (user.role === "groudadmin") {
                this.show = (false)
                console.log(user.role)
                const dept = user.dept
                console.log(dept)
            } else {
                this.show = (false)
                console.log(user.role + " unknown")
            }

        

        

           



        



    },
    methods: {



        openlink(id) {
            console.log("---link---")
            console.log(id)
            this.$router.push("/overviewset?id=" + id);

        },
        async updatestatus() {
            const updatetrackstatus = {
                "ttid": "4",
                "tkid": "3",
                "ssid": "3",
                "sqno": "3",
                "tkstatus": "waiting",
                "update_date": "2-12-23",
                "imageid": "2",
            }

            const res = await this.$axios.put(this.$store.state.api_url + "/tickettracking/", tickettrackingdata)
            console.log(res)






        },



    },
    name: "AddToHomeScreen",
    data: () => ({
        user: {},
        ticket: "",
        deptcard: "",
        issue: "",
        show:"",

        ticketcard: [
            { group: "general", id: "noise", title: "Noise", img: "/icons/sub/noise.png", flex: 6 }
        ],
        filtercard: [

        ],
        ticketcard: [

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


}

</script>

<style scoped>
.frontcard {
    text-align: center;
    width: 120px;

}

.frontcard img {
    height: 60px;
    width: 60px;
    margin-top: 20px;
}

.frontcard h4 {
    font-weight: bold;

}

.line {
    width: 1px;
    height: 140px;
    background-color: rgb(217, 217, 217);
    border-radius: 2px;
}

.line2 {
    width: 100%;
    height: 1px;
    background-color: rgb(217, 217, 217);
    border-radius: 2px;
    margin-bottom: 5px;
}

.endcard {
    margin-left: 10px;
    width: 160px;
    /* margin-top: 10px;
        margin-bottom: 10px; */
}

.endcard p {
    /* padding-top: 3px;
        padding-bottom: 3px; */
    font-size: 10px;



}
</style>