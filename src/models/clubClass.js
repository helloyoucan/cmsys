import {queryList, add, getOne, update, enable, disable, dels} from '../services/clubClass';

export default {
  namespace: 'clubClass',
  state: {
    data: {
      list: [],
      pagination: {},
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
      if (response.ret) {
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
    *dels({payload, callback}, {call, put,}) {
      const response = yield call(dels, payload);
      if (response.ret) {
        yield put({
          type: 'delsReducers',
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
      const newUserList = state.data.list.map((item) => {
        if (item.id == payload.id) {
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
          list: newUserList
        }
      };
    },
    disableReducers(state, {payload}) {
      const newUserList = state.data.list.map((item) => {
        if (item.id == payload.id) {
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
          list: newUserList
        }
      };
    },
    delsReducers(state, {payload}) {
      const newList = state.data.list.filter((item) => {
        return payload.ids.find((id) => (id == item.id)) == undefined;
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
