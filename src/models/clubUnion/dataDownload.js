import {queryList, add, getOne, update, enable, disable, del} from '../../services/clubUnion/dataDownload';
export default {
  namespace: 'dataDownload',
  state: {
    data: {
      list: [],
      pagination: {
        categoryId: '',
        pageNo: 1,
        pageSize: 10
      },
    },
    loading: true,
    modalLoading: true,
  },

  effects: {
    *changeLoading({payload}, {call, put}) {
      yield put({
        type: 'changeLoadingReducers',
        payload: payload.bool,
      });
    },
    *queryList({payload}, {call, put}) {
      yield put({
        type: 'changeLoadingReducers',
        payload: true,
      });
      const response = yield call(queryList, payload);
      if (response && response.ret) {
        yield put({
          type: 'queryListReducers',
          payload: response.data,
        });
      }
      yield put({
        type: 'changeLoadingReducers',
        payload: false,
      });
    },
    *add({payload, callback}, {call}) {
      const response = yield call(add, payload);
      if (callback) callback(response);
    },
    *getOne({payload, callback}, {call}) {
      const response = yield call(getOne, payload);
      if (callback) callback(response);
    },
    *update({payload, callback}, {call}) {
      const response = yield call(update, payload);
      if (callback) callback(response);
    },
    *enable({payload, callback}, {call, put}) {
      const response = yield call(enable, payload);
      if (response.ret) {
        yield put({
          type: 'enableReducers',
          payload: {
            id: payload.id,
          }
        });
      }
      if (callback) callback(response);
    },
    *disable({payload, callback}, {call, put,}) {
      const response = yield call(disable, payload);
      if (response.ret) {
        yield put({
          type: 'disableReducers',
          payload: {
            id: payload.id,
          }
        });
      }
      if (callback) callback(response);
    },
    *del({payload, callback}, {call, put,}) {
      const response = yield call(del, payload);
      if (response.ret) {
        yield put({
          type: 'delReducers',
          payload: {
            ids: payload.ids,
          }
        });
      }
      if (callback) callback(response);
    },
  },

  reducers: {
    queryListReducers(state, {payload}) {
      return {
        ...state,
        data: payload,
      };
    },
    changeLoadingReducers(state, {payload}) {
      return {
        ...state,
        loading: payload,
      };
    },
    enableReducers(state, {payload}) {
      const newList = state.data.list.map((item) => {
        if (payload.id == item.id) {
          return {
            ...item,
            status: 1,
          }
        }
        return item;
      });
      return {
        ...state,
        data: {
          ...state.data,
          list: newList
        }
      };
    },
    disableReducers(state, {payload}) {
      const newList = state.data.list.map((item) => {
        if (payload.id == item.id) {
          return {
            ...item,
            status: 0,
          }
        }
        return item;
      });
      return {
        ...state,
        data: {
          ...state.data,
          list: newList
        }
      };
    },
    delReducers(state, {payload}) {
      const newList = state.data.list.filter((item) => {
        return payload.id == item.id
      });
      return {
        ...state,
        data: {
          ...state.data,
          list: newList
        }
      };
    },
  },
};
