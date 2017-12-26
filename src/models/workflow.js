import {saveDeployment, getDeployInfo, delDeployment, viewImage, getImageUrl} from '../services/workflow';

export default {
  namespace: 'file',
  state: {
    loading: false,
  },

  effects: {
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
  },

  reducers: {
    changeLoading(state, {payload}) {
      return {
        ...state,
        loading: payload,
      };
    },

  },
};
