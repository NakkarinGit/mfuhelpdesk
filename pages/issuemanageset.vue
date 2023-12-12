<template>
    <v-container>
        <v-card v-for="depts in dept" :key="dept.deptid" class="pa-3"
            style=" margin-bottom: 10px; border-radius: 15px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <div style="height: 70px; width: 70px;">
                    <v-img :src="depts.img"></v-img>
                </div>
                <div>
                    <div style="display: flex; justify-content: end;">
                        <h3>{{ depts.deptname }} Issue</h3>
                    </div>
                    <p>{{ depts.subtitle }} etc.</p>
                </div>
            </div>
            <div class="line2"></div>
            <div>
                <v-card flat>
                    <v-btn text>Adjust</v-btn>
                </v-card>
            </div>
            <div class="line2"></div>
            <div>
                <v-card flat style="color: red;">
                    <v-btn @click="dt2(depts.deptid)" text color="red">Delete</v-btn>
                </v-card>
            </div>
        </v-card>
        <!-- Sub Issues -->
        <div style="display: flex; justify-content: space-between;">
            <p>Sub Issues</p>
            <!-- add issue -->
            <v-row justify="end">
                <v-dialog v-model="dialog" persistent max-width="600px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" fab icon small v-bind="attrs" v-on="on">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="text-h5" bold>New Issue</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field label="Issue Name" v-model="issuename" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field label="Issue ID" v-model="isid" required></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialog = false">
                                Close
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="newissue(), dialog = false">
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
        </div>

        <v-card v-for="depts in dept" :key="dept.deptid" flat style="background-color: rgba(238, 238, 238);">
            <v-card v-for="issues in issue" :key="issue.isid" v-if="depts.deptid == issues.deptid"
                style="margin-bottom: 10px; padding: 10px 10px; border-radius: 15px; display: flex; justify-content: space-between; align-items: center;">
                <div style="">
                    <div style="display: flex;">
                        <div style="height: 40px; width: 40px; margin-right: 10px;">
                            <v-img :src="issues.img"></v-img>
                        </div>
                        <div>
                            <h4>{{ issues.issuename }}</h4>
                            <p>{{ issues.description }}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <v-btn fab icon bottom large @click="subissue = !subissue">
                        <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                    <!-- profile -->
                    <v-dialog v-model="subissue" max-width="500px" >
                        <v-card >
                            <v-card-title class="text-h5 grey lighten-2" >
                                Sub Issue
                            </v-card-title>
                            <v-card-text>
                                <v-avatar class="ma-3" color="indigo" size="100"><v-img :src="issues.img"></v-img>  </v-avatar>
                                <p>{{ issues.issuename }} </p>
                                <p>{{ issues.description }}</p>
                                <v-divider></v-divider>
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <p>Adjust</p>
                                    <v-btn fab icon><v-icon>mdi-chevron-right</v-icon></v-btn>
                                </div>
                                <v-divider></v-divider>
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <p style="color: red;">delete</p>
                                    <v-btn @click="dt(issues.isid)" fab icon><v-icon>mdi-chevron-right</v-icon></v-btn>
                                </div>
                                <v-divider></v-divider>

                                <small class="grey--text"></small>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>

                                <v-btn text color="primary" @click="subissue = false,reload()">
                                    close
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </div>

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
        this.deptid = await res2.data.data[0].deptid;
        console.log(this.deptid)

        //load User
        let user = await util.loadUser(this);
        this.user = user;



    },
    methods: {

        openlink(link) {
            console.log(link)
            this.$router.push("/ticketissue");
        },
        dt(id) {
            console.log(id)
            this.$confirm("Are you sure?").then(() => {
                
                if(confirm){
                    this.$axios.delete(this.$store.state.api_url + "/issues/" + id);
                    // location.reload();
                }
                   
            });
        },
        
        dt2(id) {
            console.log(id)
            this.$confirm("Are you sure?").then(() => {
                if(confirm){
                    this.$axios.delete(this.$store.state.api_url + "/departments/" + id);
                    this.$router.push("/issuesmanagement") 
                }  
            });
        },
        reload(){
            location.reload();
        },
        async newissue() {
            const formdata = {
                "isid": this.isid,
                "deptid": this.deptid,
                "issuename": this.issuename,
                "description": "Report "+this.deptid+" Issue",
                "sla": "3",
                "link": "/reportissue?id="+this.isid+"&group="+this.deptid,
                "img": "",
                "flex": "6",
            }
            console.log(formdata)
            //send form to database
            const res = await this.$axios.post(this.$store.state.api_url + "/issues/", formdata);
            console.log(res)
            this.$alert("Report Sended");
            location.reload();
        
        },
        //Hide Original Upload Photo Button
        chooseFiles() {
            document.getElementById("fileUpload").click()
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
        subissue:"",
        dialog:"",

        //add issue form
        isid:"",
        deptid:"",
        issuename:"",
        description:"",
        sla:"",
        link:"",
        img:"",
        flex:"",

        


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