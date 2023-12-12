<template>
    <v-container>
        <!-- head title and button -->
        <div style="display: flex; justify-content: space-between;">
            <p>Department Admin</p>
            <!-- add dept admin -->
            <v-row justify="end">
                <v-dialog v-model="dialog" persistent max-width="600px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" fab icon small v-bind="attrs" v-on="on">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="text-h5" bold>New Admin</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="Name" v-model="name" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field label="Phone number" v-model="phone" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field label="Email" v-model="email" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field label="Line ID" v-model="lineid" required></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="6">
                                        <v-select :items="['general', 'building', 'cits', 'cas', 'mlii', 'stic']"
                                            label="Department" v-model="deptid" required></v-select>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialog = false">
                                Close
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="newdeptadmin(), dialog = false">
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
        </div>
        <!-- dept admin -->
        <v-card v-for="depts in dept" :key="dept.deptid"
            style="padding-top: 10px; padding-left: 10px; padding-right: 10px; margin-bottom: 10px; border-radius: 15px;">
            <v-card v-for="staff in staffs" :key="staffs.ssid" v-if="depts.deptid == staff.deptid && staff.issues == null"
                flat>
                <div style="display: flex; justify-content: space-between; ">
                    <div style="display: flex; ">
                        <div style="height: 50px; width: 50px; padding-right:10px ;">
                            <v-img :src="depts.img"></v-img>
                        </div>
                        <div>
                            <h3>{{ staff.name }}</h3>
                            <p>{{ depts.deptname }} Issue</p>
                            <!-- profile -->
                            <v-dialog v-model="deptprofile" max-width="500px">
                                <v-card>
                                    <v-card-title class="text-h5 grey lighten-2">
                                        Profile
                                    </v-card-title>
                                    <v-card-text>
                                        <v-avatar class="ma-3" color="indigo" size="100"><v-img :src="depts.img"></v-img></v-avatar>
                                        <p>Name: {{ staff.name }}</p>
                                        <p>Email: {{ staff.email }}</p>
                                        <p>Comtact: {{ staff.phone }}</p>
                                        <p>Line ID: {{ staff.lineid }}</p>
                                        <v-divider></v-divider>
                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                            <p>Stop</p>
                                            <v-switch small></v-switch>
                                        </div>
                                        <v-divider></v-divider>
                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                            <p>Transfer</p>
                                            <v-btn fab icon><v-icon>mdi-chevron-right</v-icon></v-btn>
                                        </div>
                                        <v-divider></v-divider>
                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                            <p style="color: red;">delete</p>
                                            <v-btn @click="dt(staff.ssid)" fab icon><v-icon>mdi-chevron-right</v-icon></v-btn>
                                        </div>
                                        <v-divider></v-divider>

                                        <small class="grey--text"></small>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>

                                        <v-btn text color="primary" @click="deptprofile = false">
                                            close
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </div>
                    </div>
                    <div>
                        <v-btn fab icon bottom large @click="staffid(staff.ssid), deptprofile = !deptprofile">
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                    </div>
                </div>
            </v-card>
        </v-card>
        <!-- Subhead title and button -->
        <div style="display: flex; justify-content: space-between;">
            <p>Ground Admin</p>
            <!-- add admin -->
            <v-row justify="end">
                <v-dialog v-model="dialog2" persistent max-width="600px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" fab icon small v-bind="attrs" v-on="on">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="text-h5" bold>New Admin</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="Name" v-model="name" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field label="Phone number" v-model="phone" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field label="Email" v-model="email" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field label="Line ID" v-model="lineid" required></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="6">
                                        <v-select :items="['general', 'building', 'cits', 'cas', 'mlii', 'stic']"
                                            label="Department" v-model="deptid" required></v-select>
                                    </v-col>

                                    <v-col cols="12" sm="6">
                                        <v-select
                                            :items="['noise', 'smell', 'gabage', 'water', 'electricity', 'wifi', 'internet', 'computer', 'speaker', 'projector', 'microphone', 'lms', 'mdl', 'exam', 'chemical', 'tools',]"
                                            label="Issue" v-model="issues" required></v-select>
                                    </v-col>

                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialog2 = false">
                                Close
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="newgroundadmin(), dialog2 = false">
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
        </div>
        <!-- Ground admin -->
        <v-card v-for="depts in dept" :key="dept.deptid"
            style="margin-bottom: 10px; padding: 10px 10px; border-radius: 15px;">
            <v-card v-for="issues in issue" :key="issue.isid" v-if="depts.deptid == issues.deptid" flat>
                <v-card v-for="staff in staffs" :key="staffs.ssid"
                    v-if="depts.deptid == staff.deptid && staff.issues == issues.isid" flat>
                    <div style="display: flex; justify-content: space-between; ">
                        <div style="display: flex;">
                            <div style="height: 40px; width: 40px; margin-right: 10px;">
                                <v-img :src="issues.img"></v-img>
                            </div>
                            <div>
                                <h3>{{ staff.name }}</h3>
                                <p>{{ issues.issuename }}</p>
                            </div>
                        </div>
                        <div>
                            <v-btn fab icon bottom large @click="staffid(staff.ssid), profile = !profile">
                                <v-icon>mdi-chevron-right</v-icon>
                            </v-btn>
                            <!-- profile -->
                            <v-dialog v-model="profile" max-width="500px">
                                <v-card>
                                    <v-card-title class="text-h5 grey lighten-2">
                                        Profile
                                    </v-card-title>
                                    <v-card-text>
                                        <v-avatar class="ma-3" color="indigo" size="100"><v-img :src="issues.img"></v-img></v-avatar>
                                        <p>Name: {{ staff.name }}</p>
                                        <p>Email: {{ staff.email }}</p>
                                        <p>Comtact: {{ staff.phone }}</p>
                                        <p>Line ID: {{ staff.lineid }}</p>
                                        <v-divider></v-divider>
                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                            <p>Stop</p>
                                            <v-switch small></v-switch>
                                        </div>
                                        <v-divider></v-divider>
                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                            <p>Transfer</p>
                                            <v-btn fab icon><v-icon>mdi-chevron-right</v-icon></v-btn>
                                        </div>
                                        <v-divider></v-divider>
                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                            <p style="color: red;">delete</p>
                                            <v-btn @click="dt(staff.ssid)" fab icon><v-icon>mdi-chevron-right</v-icon></v-btn>
                                        </div>
                                        <v-divider></v-divider>

                                        <small class="grey--text"></small>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>

                                        <v-btn text color="primary" @click="profile = false">
                                            close
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>

                        </div>
                    </div>
                </v-card>
            </v-card>
        </v-card>


    </v-container>
</template>
  
<script>
import CryptoJS from 'crypto-js';
import util from "@/utils";
import Vue from "vue"
import VueSimpleAlert from "vue-simple-alert";
import { ref } from 'vue';

Vue.use(VueSimpleAlert);


export default {

    async created() {
        const id = this.$route.query.id;
        console.log("---- id ----")
        console.log(id)


        this.$store.commit("settitle", (id) + " issue");
        this.$store.commit("setshowback", true);

        //load Issue Card
        const res = await this.$axios.get(this.$store.state.api_url + "/issues");
        this.issue = await res.data.data;
        console.log("---- issue ----")
        console.log(this.issue)

        //load Dept Card
        const res2 = await this.$axios.get(this.$store.state.api_url + "/departments/" + id);
        this.dept = await res2.data.data;
        console.log("---- dept ----")
        console.log(this.dept)

        //load service staff
        const res3 = await this.$axios.get(this.$store.state.api_url + "/servicestaff");
        this.staffs = await res3.data.data;
        console.log("---- staffs ----")
        console.log(this.staffs)

        //load User
        let user = await util.loadUser(this);
        this.user = user;



    },
    methods: {

        async staffid(id) {
            const res4 = await this.$axios.get(this.$store.state.api_url + "/servicestaff/" + id);
            this.staffp = await res4.data.data;
            console.log(this.staffp)
        },

        openlink(link) {
            console.log(link)
            this.$router.push("/ticketissue");
        },
        dt(id) {
            console.log(id)
            this.$confirm("Are you sure?").then(() => {
                if(confirm){
                    this.$axios.delete(this.$store.state.api_url + "/servicestaff/" + id);
                }
                this.$router.push("/tracking")   
            });
            
        },
        //Hide Original Upload Photo Button
        chooseFiles() {
            document.getElementById("fileUpload").click()
        },

        async newdeptadmin() {
            const formdata = {
                "name": this.name,
                "role": "deptadmin",
                "phone": this.phone,
                "email": this.email,
                "lineid": this.lineid,
                "deptid": this.deptid,
            }
            console.log(formdata)
            //load Issue Card
            const res = await this.$axios.post(this.$store.state.api_url + "/servicestaff/", formdata);
            console.log(res)
            this.$alert("Report Sended");
        },
        async newgroundadmin() {
            const formdata = {
                "name": this.name,
                "role": "groundadmin",
                "phone": this.phone,
                "email": this.email,
                "lineid": this.lineid,
                "deptid": this.deptid,
                "issues": this.issues,
            }
            console.log(formdata)
            //load Issue Card
            const res = await this.$axios.post(this.$store.state.api_url + "/servicestaff/", formdata);
            console.log(res)
            this.$alert("Report Sended");
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
        issue: {},
        dept: {},
        user: {},
        errors: [],
        issuedesc: "",
        file: "",
        staffs: "",
        dialog: "",
        dialog2: "",
        groundadminset: "",
        profile: "",
        staff: "",
        deptprofile: "",
        delete:"",

        // new admin form
        name: "",
        role: "",
        phone: "",
        email: "",
        lineid: "",
        deptid: "",
        issues: "",



        formissue: {
            "tkid": "2",
            "isid": "1",
            "ssid": "1",
            "userid": "1",
            "ticketdetail": "Test ticket",
            "currentstatus": "open",
            "startdate": "2023-10-20",
            "enddate": "2023-10-22",
            "satscore": "1"
        },


    }),
};
</script>

<style scoped>
.inputfield {
    width: 100%;
    background-color: white;
    border-radius: 15px;
    margin-bottom: 10px;
    padding: 5px 10px;

}

.headbtn {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;

}

p {
    margin-bottom: 10px;
}

.pa-4 {
    width: 390spx;
    height: 740px;
    border-radius: 15px;
    border-style: none;

}

.line2 {
    width: 100%;
    height: 1px;
    background-color: rgb(217, 217, 217);
    border-radius: 2px;
    margin-bottom: 5px;
}
</style>