<template>
    <v-container fluid ma-0 pa-0>
        <v-form fast-fail @submit.prevent>
            <v-card flat outlined class="pa-4" style=" background-color: rgb(247, 247, 247);">
                <div class="headbtn">
                    <h3>New Report </h3>
                    <button type="submit" block class="mt-2" @click="sendreport()"
                        style="color: rgb(53, 115, 247);">Send</button>
                </div>
                <p>Descprition</p>
                <textarea placeholder="Issue Description" outlined v-model="issuedesc" label="Issue Detail"
                    class="inputfield" ></textarea>
                <p>Photo</p>
                <div style="background-color: white; border-radius: 15px; ">
                    <v-file-input label="Upload photo..." variant="filled" style="margin-left: -15px;" background-color="white" prepend-icon="none" v-model="uploadpicture" accept="image/png, image/jpeg, image/bmp"></v-file-input>
                </div>
                
                
                
                




            </v-card>


        </v-form>
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
        const issue = this.$route.query.title;
        const id = this.$route.query.id;
        const group = this.$route.query.group
        console.log(issue + " ," + id + " , " + group)
        console.log(id)


        this.$store.commit("settitle", (id) + " issue");
        this.$store.commit("setshowback", true);

        //load Issue Card
        const res = await this.$axios.get(this.$store.state.api_url + "/issues/" + id);
        this.issue = await res.data.data[0];
        console.log("---- issue ----")
        console.log(this.issue)

        //load Dept Card
        const res2 = await this.$axios.get(this.$store.state.api_url + "/departments/" + this.issue.deptid);
        this.dept = await res2.data.data[0];
        console.log("---- dept ----")
        console.log(this.dept)

        //load User
        let user = await util.loadUser(this);
        this.user = user;

        

        //current date
        // const current = new Date();
        // const date = `${current.getDate()}-${current.getMonth()+1}-${current.getFullYear()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;
        // console.log("---date---")
        // console.log(date)

        

    },
    methods: {

        openlink(link) {
            console.log(link)
            this.$router.push("/ticketissue");
        },

        //Hide Original Upload Photo Button
        chooseFiles() {
            document.getElementById("fileUpload").click()
        },

        async sendreport() {
            // validate if the description is empty or not.
            if (this.issuedesc === '' || this.issuedesc === null || this.issuedesc.length === 0) {
                this.$alert("Please fill in the blanks.");
            }
            else {
            var picpath="";
            if (this.uploadpicture) {
                var timestamp = new Date().getTime();
                const file = this.uploadpicture;
                const filename = timestamp + "-" + this.issue.isid + "_" + this.user.userid + "_" + this.fileext[file.type];
                //upload thumbnail file
                // const tfile = await this.resizeFile(file, 400, 320);
                // const tpicpath = await this.uploadPicture(tfile, "thumb_" + filename);
                //upload reduce size file
                const rfile = await this.resizeFile(file, 1024, 800);
                picpath = await this.uploadPicture(rfile, filename);


                // this.postbody.picturepath = picpath;
            }

            console.log("=== user ====")
            console.log(this.user)
            
            
            const formdata = {
                "isid": this.issue.isid,
                "ssid": "",
                "userid": this.user.userid,
                "ticketdetail": this.issuedesc,
                "currentstatus": "waiting",
                "startdate": "2023-10-22",
                "enddate": "2023-10-22",
                "satscore": 0,
                "picpath": picpath,
                
            }
            console.log(formdata)
            const res = await this.$axios.post(this.$store.state.api_url + "/tickets/", formdata);
            console.log("---formdata---")
            console.log(res)
            this.tkid= await res.data.data.insertId;
            console.log(this.tkid)
            
            const tickettrackingdata = {
                "tkid":this.tkid,
                "ssid":"1",
                "sqno":"1",
                "tkstatus":"2",
                "update_date":"2023-10-22",
                
                
            }
            console.log(tickettrackingdata)
            const res2 = await this.$axios.post(this.$store.state.api_url + "/tickettracking/",tickettrackingdata)
            console.log(res2)

            // update ttid to ticket table
            this.ttid= await res2.data.data.insertId;
            console.log(this.ttid)

            const updatettidtotickettable = {
                "ttid":this.ttid,
            }
            console.log(updatettidtotickettable)
            const res3 = await this.$axios.put(this.$store.state.api_url + "/tickets/"+this.tkid,updatettidtotickettable)
            console.log(res3)



            }
        },
        async uploadPicture(fileupload, filename) {

            const file = fileupload;
            const data = new FormData();
            // console.log(file);

            // console.log(file.name);
            data.append("photo", file);
            data.append("filename", filename);
            var config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            };
            const res = await this.$axios.post(this.$store.state.api_url + "/upload", data, config);
            // console.log(res)
            return filename;
        },
        async resizeFile(file, w, h) {

            const reader = new FileReader();

            // Wait for the data url to be loaded from the file
            const dataURL = await new Promise((resolve) => {
                reader.onload = (e) => resolve(e.target.result);
                reader.readAsDataURL(file);
            });

            const img = new Image();
            await new Promise((resolve) => {
                img.onload = resolve;
                img.setAttribute("crossorigin", "anonymous");
                img.src = dataURL;
            });
            // Resize the image with a canvas
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            // This is an addition to keep the aspect ratio of the image so it won't get distorted
            // See : https://stackoverflow.com/q/3971841/12594730
            const [maxWidth, maxHeight] = [w, h];
            const [imgWidth, imgHeight] = [img.naturalWidth, img.naturalHeight];
            const ratio = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);

            canvas.width = imgWidth * ratio;
            canvas.height = imgHeight * ratio;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const image = canvas.toDataURL("image/jpeg", 0.9);
            const rfile = this.dataURItoBlob(image);
            return rfile;
            console.log(rfile);
        },
        dataURItoBlob(dataURI) {
            // convert base64/URLEncoded data component to raw binary data held in a string
            var byteString;
            if (dataURI.split(",")[0].indexOf("base64") >= 0)
                byteString = atob(dataURI.split(",")[1]);
            else byteString = unescape(dataURI.split(",")[1]);
            // separate out the mime component
            var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
            // write the bytes of the string to a typed array
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ia], { type: mimeString });
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
        uploadpicture: "",
        date:"",
        fileext: {
            "image/png": ".png",
            "image/jpeg": ".jpg",
            "image/bmp": ".bmp",
            "video/mp4": ".mp4",
            "video/quicktime": ".mp4"
        },
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
        tickettrackingdata: {
                "ttid":"",
                "tkid": "",
                "ssid":"",
                "sqno":"",
                "tkstatus":"",
                "update_date":"",
                
            }


    }),
};
</script>

<style scoped>
.inputfield {
    width: 100%;
    height: 150px;
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
</style>

<!-- <template>
    <v-container fluid ma-0 pa-0>
        <v-form fast-fail @submit.prevent>
            <v-card flat outlined class="pa-4" style=" background-color: rgb(247, 247, 247);">
                <div class="headbtn">
                    <h3>New Report </h3>
                    <button type="submit" block class="mt-2" @click="sendreport()"
                        style="color: rgb(53, 115, 247);">Send</button>
                </div>
                <p>Descprition</p>
                <textarea placeholder="Issue Description" outlined v-model="issuedesc" label="Issue Detail"
                    class="inputfield" ></textarea>
                <p>Location</p>
                <input placeholder="Room, Building..." class="inputfield" />
                <p>Photo</p>
                <div style="background-color: white; border-radius: 15px; ">
                    <v-file-input label="Upload photo..." variant="filled" style="margin-left: -15px;" background-color="white" prepend-icon="none" v-model="uploadpicture" accept="image/png, image/jpeg, image/bmp"></v-file-input>
                </div>
                
                
                




            </v-card>


        </v-form>
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
        const issue = this.$route.query.title;
        const id = this.$route.query.id;
        const group = this.$route.query.group
        console.log(issue + " ," + id + " , " + group)
        console.log(id)


        this.$store.commit("settitle", (id) + " issue");
        this.$store.commit("setshowback", true);

        //load Issue Card
        const res = await this.$axios.get(this.$store.state.api_url + "/issues/" + id);
        this.issue = await res.data.data[0];
        console.log("---- issue ----")
        console.log(this.issue)

        //load Dept Card
        const res2 = await this.$axios.get(this.$store.state.api_url + "/departments/" + this.issue.deptid);
        this.dept = await res2.data.data[0];
        console.log("---- dept ----")
        console.log(this.dept)

        //load User
        let user = await util.loadUser(this);
        this.user = user;



    },
    methods: {

        openlink(link) {
            console.log(link)
            this.$router.push("/ticketissue");
        },
        async sendreport() {
            // validate if the description is empty or not.
            if (this.issuedesc === '' || this.issuedesc === null || this.issuedesc.length === 0) {
                this.$alert("Please fill in the blanks.");
            }
            else {
                const formdata = {
                    "isid": this.issue.isid,
                    "ssid": "",
                    "userid": this.user.userid,
                    "ticketdetail": this.issuedesc,
                    "currentstatus": "open",
                    "startdate": "2023-10-20",
                    "enddate": "2023-10-22",
                    "satscore": 0,
                    
                
                }

                console.log(formdata)
                //load Issue Card
                const res = await this.$axios.post(this.$store.state.api_url + "/tickets/", formdata);
                console.log(res)
                this.$alert("Report Sended");


            }


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
</style> -->