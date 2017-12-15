import {query as queryUsers, queryCurrent} from '../services/user';
import {login, logout} from '../services/login';
import {routerRedux} from 'dva/router';
export default {
  namespace: 'user',

  state: {
    list: [],
    loading: false,
    loginBtnSubmiting: false,
    actionMsg: '',
    currentUser: window.sessionStorage ? JSON.parse(sessionStorage.getItem('currentUser')) : {},
  },

  effects: {
    *login({payload}, {call, put}){
      yield put({
        type: 'changeLoginBtnSubmiting',
        payload: true,
      });
      const response = yield call(login, payload);

      if (response.ret) {
        yield put({
          type: 'saveCurrentUser',
          payload: response,
        });
        if (window.sessionStorage) {
          sessionStorage.setItem('currentUser', JSON.stringify(response));
        }
        yield put(routerRedux.push('/'));
      } else {

      }
      yield put({
        type: 'changeLoginBtnSubmiting',
        payload: false,
      });
    },
    *logout(_, {call, put}){
      const response = yield call(logout);
      if (response.ret) {
        yield put(routerRedux.push('/user/login'));
        yield put({
          type: 'clearCurrentUser',
          payload: {},
        });
        if (window.sessionStorage) {
          sessionStorage.removeItem('currentUser');
        }
      } else {
        yield put({
          type: 'clearCurrentUser',
          payload: response.msg,
        });
      }
    },
  },

  reducers: {
    changeLoginBtnSubmiting(state, {payload}){
      return {
        ...state,
        loginBtnSubmiting: payload
      };
    },
    saveCurrentUser(state, {payload}) {
      return {
        ...state,
        currentUser: payload,
      };
    },
    clearCurrentUser(state, {payload}) {
      return {
        ...state,
        currentUser: {},
        actionMsg: payload.msg
      };
    },
  },
};
