import {uploadFile} from '../services/file';

export default {
  namespace: 'file',
  state: {
    loading: false,
  },

  effects: {
    *uploadFile({payload, callback}, {call, put}) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(uploadFile, payload);
      yield put({
        type: 'changeLoading',
        payload: false,
      });
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
