import {queryUserList, addUser, getOneUser, updateUser, enableUser, disableUser} from '../services/user';

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
    *queryUserList({payload}, {call, put}) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryUserList, payload);
      yield put({
        type: 'queryUserListReducers',
        payload: response.data,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *addUser({payload, callback}, {call}) {
      const response = yield call(addUser, payload);
      if (callback) callback(response);
    },
    *getOneUser({payload, callback}, {call}) {
      const response = yield call(getOneUser, payload);
      if (callback) callback(response);
    },

    *updateUser({payload, callback}, {call}) {
      const response = yield call(updateUser, payload);
      if (callback) callback(response);
    },
    *enableOneUser({payload, callback}, {call, put}) {
      const response = yield call(enableUser, payload);
      if (response.ret) {
        yield put({
          type: 'enableOneUserReducers',
          payload: {
            id: payload.id,
          }
        });
      }
      if (callback) callback(response);
    },
    *disableOneUser({payload, callback}, {call, put,}) {
      const response = yield call(disableUser, payload);
      if (response.ret) {
        yield put({
          type: 'disableOneUserReducers',
          payload: {
            id: payload.id,
          }
        });
      }
      if (callback) callback(response);
    },
  },

  reducers: {
    queryUserListReducers(state, {payload}) {
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
    enableOneUserReducers(state, {payload}) {
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
    disableOneUserReducers(state, {payload}) {
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
