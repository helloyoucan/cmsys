import {queryUserList, addUser, getOneUser, updateUser} from '../services/user';

export default {
  namespace: 'user',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    loading: true,
    modalLoading: true,
    category: [],
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
    *remove({payload, callback}, {call, put}) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });

      if (callback) callback();
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
  },
};
