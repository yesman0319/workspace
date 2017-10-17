/**
 * Created by shaojinkun on 2017/4/25.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types.js'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        alert:{
            alertHidden:false,
            errText:'',
            isIndex:false,
            imgStatus:true,
            back:false
        },
        forgetChange:{
            forgetHidden:false,
            publicTitle:""
        },
        userStatyPage:{
            pageName:''
        },
        addressStatus:{
            isShow:false
        },
        confirmAlert:{
            alertHidden:false,
            text:'',
            isVoucher:'',
            isWallet:'',
            voucherChange:false
        },
        wallet:{
            status:false,
            addBankCard:false,
            detailReload:false
        }
    },
    mutations : {
        [types.ALERT_CHANGE](state,payload){
            state.alert.alertHidden = payload.status;
            state.alert.errText = payload.errText;
            state.alert.isIndex = payload.isIndex;
            state.alert.imgStatus = payload.imgStatus;
            state.alert.back = payload.back;
        },
        [types.FORGETPAGE_CHANGE](state,payload){
            state.forgetChange.forgetHidden = payload.status;
            state.forgetChange.publicTitle = payload.title;
        },
        [types.USERUSINGPAGE_CHANGE](state,payload){
            state.userStatyPage.pageName = payload.pageName;
        },
        [types.ADDRESS_CHANGE](state,payload){
            state.addressStatus.isShow = payload;
        },
        [types.CONFIRMALERT_CHANGE](state,payload){
            state.confirmAlert.alertHidden = payload.status;
            state.confirmAlert.text = payload.text;
            state.confirmAlert.isVoucher = payload.isVoucher;
            state.confirmAlert.isWallet = payload.isWallet;
            state.confirmAlert.voucherChange = payload.voucherChange;
        },
        [types.WITHDRAWALS_CHANGE](state,payload){
            state.wallet.status = payload.status;
            state.wallet.addBankCard = payload.addBankCard;
            state.wallet.detailReload = payload.detailReload;
        }
    }
})

export default store
