import {queryUserList, queryCategory} from '../services/user';

export default {
  namespace: 'user',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    loading: true,
    category: [],
  },

  effects: {
    *getCategory({payload}, {call, put}){
      const response = yield call(queryCategory, payload);
      yield put({
        type: 'queryCategoryReducers',
        payload: response.data,
      });
    },
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
    *add({payload, callback}, {call, put}) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(addRule, payload);
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
    queryCategoryReducers(state, {payload}) {
      return {
        ...state,
        category: payload,
      };
    },
  },
};
