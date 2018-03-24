import {queryList, add, getOne, update, getAll} from '../../services/club/info';
import {routerRedux} from 'dva/router';
export default {
  namespace: 'info',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    clubsNames: [],
    loading: true,
    modalLoading: true,
  },

  effects: {
    *goToPage({payload}, {call, put}) {
      yield put(routerRedux.push('/clubManagement/cinfo'));
    },
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
      yield put({
        type: 'queryListReducers',
        payload: response.data,
      });
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
    *getAll({payload, callback}, {call, put}) {
      const response = yield call(getAll, payload);
      yield put({
        type: 'getAllReducers',
        payload: response.data,
      });
      if (callback) callback(response);
    }

  },

  reducers: {
    queryListReducers(state, {payload}) {
      return {
        ...state,
        data: payload,
      };
    },
    getAllReducers(state, {payload}) {
      return {
        ...state,
        clubsNames: payload,
      };
    },
    changeLoadingReducers(state, {payload}) {
      return {
        ...state,
        loading: payload,
      };
    }
  },
};
