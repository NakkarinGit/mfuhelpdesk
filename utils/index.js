import CryptoJS from 'crypto-js';

const loadUser = async (owner) => { //owner = this
    var cuser = await localStorage.getItem("startuser");
    let decode = decodeURIComponent(cuser);
    var user = await aesDencrypt(decode, owner.$store.state.helpdeskaeskey);
    console.log("---load user ---")
    console.log(user)
    var puser = {};
    if (!user) {
        // owner.$router.push("/user/login");
        location.href="https://start.mfu.ac.th"
    } else {
        console.log("---found- user ----")
        puser = await JSON.parse(user);
        // puser.maskid = puser.hashid.slice(0, 4) + "****" + puser.hashid.slice(-4);

        owner.$store.commit("updateuser", puser);
        // this.user =  this.$store.state.user;
    }
    return puser;
}

const aesEncrypt = (txt,key) => {
    return CryptoJS.AES.encrypt(txt, key).toString();
}

const aesDencrypt = (txt,key) => {
    const bytes = CryptoJS.AES.decrypt(txt, key);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}

export default {
    loadUser,
    aesEncrypt,
    aesDencrypt,
};