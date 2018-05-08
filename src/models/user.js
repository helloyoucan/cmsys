import {queryList, add, getOne, update, enable, disable, resetPs, updatePsw} from '../services/user';

export default {
  namespace: 'user',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    loading: true,
    modalLoading: true,
  },

  effects: {
    *queryList({payload}, {call, put}) {
      yield put({
        type: 'changeLoading',
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
        type: 'changeLoading',
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
    *enableOne({payload, callback}, {call, put}) {
      const response = yield call(enable, payload);
      if (response.ret) {
        yield put({
          type: 'enableOneReducers',
          payload: {
            id: payload.id,
          }
        });
      }
      if (callback) callback(response);
    },
    *disableOne({payload, callback}, {call, put,}) {
      const response = yield call(disable, payload);
      if (response.ret) {
        yield put({
          type: 'disableOneReducers',
          payload: {
            id: payload.id,
          }
        });
      }
      if (callback) callback(response);
    },
    *resetPs({payload, callback}, {call, put,}) {
      const response = yield call(resetPs, payload);
      /*if (response.ret) {
       yield put({
       type: 'resetPsReducers',
       payload: {
       id: payload.id,
       }
       });
       }*/
      if (callback) callback(response);
    },
    *updatePsw({payload, callback}, {call, put,}) {
      const response = yield call(updatePsw, payload);
      /*if (response.ret) {
       yield put({
       type: 'updatePswPswReducers',
       payload: {
       id: payload.id,
       }
       });
       }*/
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
    changeLoading(state, {payload}) {
      return {
        ...state,
        loading: payload,
      };
    },
    enableOneReducers(state, {payload}) {
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
    disableOneReducers(state, {payload}) {
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
  },
};
