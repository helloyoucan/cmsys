import {routerRedux} from 'dva/router';
import {fakeAccountLogin} from '../services/api';
import {login} from '../services/login';
export default {
  namespace: 'login',
  state: {
    data: {
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
    }
  },

  effects: {
    *login({payload}, {call, put}) {
      //yield put(routerRedux.push('/'));
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      const response = yield call(login, payload);//这里的login是前面import的services的login,payload为传递过去的参数
      yield put({
        type: 'saveUserInfo',
        payload: {
          data: response,
          submitting: true,
        },
      });
      // Login successfully
      if (response.ret) {
        yield put(routerRedux.push('/'));
      }
    },
    *logout(_, {put}) {
      yield put({
        type: 'saveUserInfo',
        payload: {
          submitting: false,
          data: {},
        },
      });
      if (response.ret) {
        yield put(routerRedux.push('/user/login'));
      }
    },
  },

  reducers: {
    saveUserInfo(state, {payload}){
      return {
        ...state,
        data: payload.data,
        submitting: payload.submitting
      }
    }
  },
};
