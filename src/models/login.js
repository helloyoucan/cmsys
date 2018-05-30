import { login, logout, checkLogin } from '../services/login';
import { routerRedux } from 'dva/router';
export default {
  namespace: 'login',

  state: {
    loginBtnSubmiting: false,
    actionMsg: '',
    currentUser: window.sessionStorage ? JSON.parse(sessionStorage.getItem('currentUser')) : {},
  },

  effects: {
    *login({ payload }, { call, put }){
      yield put({
        type: 'changeLoginBtnSubmiting',
        payload: true,
      });
      const response = yield call(login, payload);
      if (response.ret && response.data != null) {
        yield put({
          type: 'saveCurrentUser',
          payload: response.data,
        });
        if (window.sessionStorage) {
          sessionStorage.setItem('currentUser', JSON.stringify(response.data));
        }
        yield put(routerRedux.push('/'));
      } else {

      }
      yield put({
        type: 'changeLoginBtnSubmiting',
        payload: false,
      });
    },
    *logout(_, { call, put }){
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
    *checkLogin({ payload }, { call, put }){
      const response = yield call(checkLogin, payload);
      if (response.ret) {
        if (response.data != null) {
          yield put({
            type: 'saveCurrentUser',
            payload: response.data,
          });
          if (window.sessionStorage) {
            sessionStorage.setItem('currentUser', JSON.stringify(response.data));
          }
          yield put(routerRedux.push('/'));
        }
      } else {
        yield put(routerRedux.push('/user/login'));
        if (window.sessionStorage) {
          sessionStorage.removeItem('currentUser');
        }
      }
    }
  },

  reducers: {
    changeLoginBtnSubmiting(state, { payload }){
      return {
        ...state,
        loginBtnSubmiting: payload
      };
    },
    saveCurrentUser(state, { payload }) {
      return {
        ...state,
        currentUser: payload,
      };
    },
    clearCurrentUser(state, { payload }) {
      return {
        ...state,
        currentUser: {},
        actionMsg: payload.msg
      };
    },
  },
};
