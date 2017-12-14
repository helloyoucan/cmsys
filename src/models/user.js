import {query as queryUsers, queryCurrent} from '../services/user';
import {login, logout} from '../services/login';
import {routerRedux} from 'dva/router';
export default {
  namespace: 'user',

  state: {
    list: [],
    loading: false,
    loginBtnSubmiting: false,
    isLogin: false,
    actionMsg: '',
    currentUser: {
      // "ret": true,
      // "msg": "登录成功",
      // "data": {
      //   "id": 1,
      //   "username": "admin",
      //   "status": 1,
      //   "value": "超级管理员",
      //   "insert_time": 1513064417000,
      //   "category_id": "chaojiguanliyuan",
      //   "insert_man": "admin"
      // }
    },
  },

  effects: {
    *login({payload}, {call, put}){
      yield put({
        type: 'changeLoginBtnSubmiting',
        payload: true,
      });
      const response = yield call(login, payload);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
      yield put({
        type: 'changeLoginBtnSubmiting',
        payload: false,
      });
      if (response.ret) {
        yield put(routerRedux.push('/'));
      }
    },
    *logout(_, {call, put}){
      const response = yield call(logout);
      if (response.ret) {
        yield put(routerRedux.push('/user/login'));
        yield put({
          type: 'clearCurrentUser',
          payload: {},
        });
      } else {
        yield put({
          type: 'clearCurrentUser',
          payload: response.msg,
        });
      }
    },
    *fetch(_, {call, put}) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *fetchCurrent(_, {call, put}) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response.data,
      });
    },
    *clearCurrent(_, {call, put}) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'clearCurrentUser',
        payload: {},
      });
    },
  },

  reducers: {
    changeLoginBtnSubmiting(state, {payload}){
      return {
        ...state,
        loginBtnSubmiting: payload
      };
    },
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        isLogin:true,
        currentUser: action.payload,
      };
    },
    clearCurrentUser(state, {payload}) {
      return {
        ...state,
        currentUser: {},
        isLogin:false,
        actionMsg: payload.msg
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
