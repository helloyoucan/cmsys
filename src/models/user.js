import {login, logout} from '../services/user';
import {routerRedux} from 'dva/router';
export default {
  namespace: 'user',

  state: {},

  effects: {
    *login({payload}, {call, put}){
    },
    *logout(_, {call, put}){
    },
  },

  reducers: {
    changeLoginBtnSubmiting(state, {payload}){
    },
  },
};
