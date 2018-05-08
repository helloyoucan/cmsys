import {
  getTaskList,
  saveDeployment,
  getDeployInfo,
  delDeployment,
  viewImage,
  getImageUrl,
  viewCurrentImage
} from '../services/workflow';
import {routerRedux} from 'dva/router';
export default {
  namespace: 'workflow',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    loading: false,
    modalLoading: true
  },

  effects: {
    *goToList({payload}, {call, put}) {
      yield put(routerRedux.push({
        pathname: payload.path,
        data: payload
      }));
    },
    *saveDeployment({payload, callback}, {call, put}) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(saveDeployment, payload);
      yield put({
        type: 'changeLoading',
        payload: false,
      });
      if (callback) callback(response);

    },
    *getDeployInfo({payload, callback}, {call, put}) {
      const response = yield call(getDeployInfo, payload);
      if (callback) callback(response);
    },
    *delDeployment({payload, callback}, {call, put}) {
      const response = yield call(delDeployment, payload);
      if (callback) callback(response);
    },
    *viewImage({payload, callback}, {call, put}) {
      const response = yield call(viewImage, payload);
      if (callback) callback(response);
    },
    *getImageUrl({payload, callback}, {call, put}) {
      const response = yield call(getImageUrl, payload);
      if (callback) callback(response);
    },
    *viewCurrentImage({payload, callback}, {call, put}) {
      const response = yield call(viewCurrentImage, payload);
      if (callback) callback(response);
    },
    *getTaskList({payload, callback}, {call, put}) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(getTaskList, payload);
      if (response.ret) {
        yield put({
          type: 'getTaskListReducers',
          payload: response.data,
        });
      }
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
  },

  reducers: {
    changeLoading(state, {payload}) {
      return {
        ...state,
        loading: payload,
      };
    },
    getTaskListReducers(state, {payload}) {
      return {
        ...state,
        data: payload,
      };
    },
  },
};
