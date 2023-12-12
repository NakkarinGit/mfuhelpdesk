<template>
    <v-container fluid ma-0 pa-0 class="fixedContainer ">
        <!-- reporter -->
        <div v-show="show1">
            <v-card v-if="tickets.userid == user.userid" v-for="tickets in ticket" :key="tickets.tkid" @click="openlink(tickets.tkid)" flat outlined class="pa-4"
                style="margin-bottom: 5px; border-radius: 15px; display: flex;
        justify-content: space-around;
        align-items: center;">
                <div class="frontcard">
                    <v-img v-for="issues in issue" :key="issue.isid" v-if="issues.isid == tickets.isid" :src="issues.img"
                        style=" ">
                    </v-img>
                    <h3>{{ tickets.isid }} issue</h3>
                </div>
                <div class="line"></div>
                <div class="endcard">
                    <p>Descprition: {{ tickets.ticketdetail }}</p>
                    <p>Name: {{ user.gname }}</p>
                    <p>ID: {{ user.userid }}</p>
                    <p>Date: {{ tickets.startdate }}</p>
                </div>
            </v-card>
        </div>

        <!-- super admin -->
        <div v-show="show2">
            <v-card v-for="deptcards in deptcard" :key="deptcard.deptid"
                style="padding-top: 10px; padding-left: 5px; margin-bottom: 10px; border-radius: 10px;">
                <div style="display: flex; justify-content: space-between;">
                    <div style="display:flex;">
                        <div style="display: flex; width: 30px; height: 30px; padding-right: 5px;">
                            <v-img :src="deptcards.img"></v-img>
                        </div>
                        <div>
                            <h4>{{ deptcards.deptname }} Issues</h4>
                        </div>
                    </div>
                    <div style="display: flex;">
                        <h4 style="color: red;">Cancel</h4>&nbsp;&nbsp;&nbsp;
                        <h4 style="color: green;">finish</h4>&nbsp;&nbsp;
                    </div>
                </div>

                <v-divider style="margin-bottom:10px ;"></v-divider>
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
        </div>  

        <!-- admin -->
        <div v-show="show3">
            <v-card v-if="deptcards.deptid === user.dept" v-for="deptcards in deptcard" :key="deptcard.deptid"
                style="padding-top: 10px; padding-left: 5px; margin-bottom: 10px; border-radius: 10px;">
                <div style="display: flex; justify-content: space-between;">
                    <div style="display:flex;">
                        <div style="display: flex; width: 30px; height: 30px; padding-right: 5px;">
                            <v-img :src="deptcards.img"></v-img>
                        </div>
                        <div>
                            <h4>{{ deptcards.deptname }} Issues</h4>
                        </div>
                    </div>
                    <div style="display: flex;">
                        <h4 style="color: red;">Cancel</h4>&nbsp;&nbsp;&nbsp;
                        <h4 style="color: green;">finish</h4>&nbsp;&nbsp;
                    </div>
                </div>

                <v-divider style="margin-bottom:10px ;"></v-divider>
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
        </div>


    </v-container>
</template>

<script>
import CryptoJS from 'crypto-js';
import util from "@/utils";




export default {

    async created() {
        this.$store.commit("settitle", "History");
        this.$store.commit("setshowback", true);


        //load ticket
        const res = await this.$axios.get(this.$store.state.api_url + "/tickets");
        this.ticket = await res.data.data;
        console.log("------ticket------")
        console.log(this.ticket)

        //load issues
        const res2 = await this.$axios.get(this.$store.state.api_url + "/issues");
        this.issue = await res2.data.data;
        console.log("------issues------")
        console.log(this.issue)

        //load Dept Card
        const res3 = await this.$axios.get(this.$store.state.api_url + "/departments");
        this.deptcard = await res3.data.data;
        console.log("------deptcard------")
        console.log(this.deptcard)

        //load User
        let user = await util.loadUser(this);
        this.user = user;

        //check user position and toggle show component
        if (user.role === "superadmin") {
            this.show1 = (false)
            this.show2 = (true)
            this.show3 = (false)
            console.log(user.role)
        } else if (user.role === "deptadmin") {
            this.show1 = (false)
            this.show2 = (false)
            this.show3 = (true)
            console.log(user.role)
        } else if (user.role === "groudadmin") {
            this.show1 = (false)
            this.show2 = (false)
            this.show3 = (true)
            console.log(user.role)
        } else {
            this.show1 = (true)
            this.show2 = (false)
            this.show3 = (false)
            console.log(" reporter ")
        }

    },
    methods: {



        openlink(id) {
            console.log("---link---")
            console.log(id)
            this.$router.push("/ticketissue?id=" + id);

        }



    },
    name: "AddToHomeScreen",
    data: () => ({
        user: {},
        ticket: "",
        issue: "",
        show: "false",
        deptcard: "",
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