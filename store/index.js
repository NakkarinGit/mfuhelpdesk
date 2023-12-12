const URL = "https://helpdesk.mfu.ac.th/apis";

export const state = () => ({
    api_url: URL,
    version: '1.0',
    updatedate: '2023-10-08 08:00',
    pagetitle:'MFU.HELPDESK',
    showback: false,
    year:2566,
    sem: 1,

    userguide: "https://drive.google.com/file/d/1B26sdSqwpgTyiN4KvAlVIAfC5VgCOWW6/view?usp=sharing",
    trackdata: {},
    history:[],
    todayhistory:[],
    user:{
    },
    helpdeskaeskey:"773845BLEISDwe8Adsf0AA",
    iv:"waajfilsfjaajklfj",
  })
  export const mutations = {
    settitle(state,title){
      state.pagetitle=title;
    },
    setshowback(state,backstatus){
      state.showback=backstatus;
    },
    increment(state) {
      state.counter++
    },
    updatetrack(state,track){
        state.trackdata=track;
        // state.history.push(track);
    },
    updateuser(state,user){
        state.user=user;
    }

  }