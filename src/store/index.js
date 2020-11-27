import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        topTitle:'',
        dptList:[],
        statusKeyList:[],
        regionList:[],
    },
    mutations:{
        //增加商品
        setTopTitle(state,title){
            state.topTitle = title
        },
        setDptList(state,list){
            state.dptList = list
        },
        setDptListNull(state){
            state.dptList = []
        },
        setStatusKeyList(state,list){
            state.statusKeyList = list
        },
        setRegionList(state,list){
            state.regionList = list
        },
    },
    actions:{

    }
})