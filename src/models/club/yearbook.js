import {
  del,
  getOne,
  queryList,
  getTaskList,
  add,
  startProcess,
  submitTask,
  update,
  viewHisComment,
  viewTaskFrom
} from '../../services/club/yearbook';
import {routerRedux} from 'dva/router';
export default {
  namespace: 'yearbook',
  state: {
    data: {
      list: [],
      pagination: {},
    },
    taskSubmit: {
      list: [],
      pagination: {},
    },
    loading: true,
    modalLoading: true,
  },

  effects: {
    *goToPath({payload}, {call, put}) {
      yield put(routerRedux.push({
        pathname: payload.path,
        data: payload
      }));
    },
    *changeLoading({payload}, {call, put}) {
      yield put({
        type: 'changeLoadingReducers',
        payload: payload.bool,
      });
    },
    *del({payload, callback}, {call, put,}) {
      const response = yield call(del, payload);
      if (response.ret) {
        yield put({
          type: 'delReducers',
          payload: {
            id: payload.id,
          }
        });
      }
      if (callback) callback(response);
    },
    *getOne({payload, callback}, {call}) {
      const response = yield call(getOne, payload);
      if (callback) callback(response);
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
    *getTaskList({payload}, {call, put}) {
      yield put({
        type: 'changeLoadingReducers',
        payload: true,
      });
      const response = yield call(getTaskList, payload);
      yield put({
        type: 'getTaskListReducers',
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
    *startProcess({payload, callback}, {call, put}) {
      const response = yield call(startProcess, payload);
      /*if (response.ret) {
       yield put({
       payload: payload
       });
       }*/
      if (callback) callback(response);
    },
    *submitTask({payload, callback}, {call, put}) {
      const response = yield call(submitTask, payload);
      /*if (response.ret) {
       yield put({
       payload: payload
       });
       }*/
      if (callback) callback(response);
    },
    *update({payload, callback}, {call}) {
      const response = yield call(update, payload);
      if (callback) callback(response);
    },
    *viewHisComment({payload, callback}, {call, put}) {
      const response = yield call(viewHisComment, payload);
      /*if (response.ret) {
       yield put({
       payload: {
       id: payload.id
       }
       });
       }*/
      if (callback) callback(response);
    },
    *viewTaskFrom({payload, callback}, {call, put}) {
      const response = yield call(viewTaskFrom, payload);
      /* if (response.ret) {
       yield put({
       payload: {
       taskId: payload.taskId
       }
       });
       }*/
      if (callback) callback(response);
    },
  },

  reducers: {
    changeLoadingReducers(state, {payload}) {
      return {
        ...state,
        loading: payload,
      };
    },
    delReducers(state, {payload}) {
      const newList = state.data.list.filter((item) => {
        return payload.id != item.id;
      });
      return {
        ...state,
        data: {
          ...state.data,
          list: newList
        }
      };
    },
    queryListReducers(state, {payload}) {
      return {
        ...state,
        data: payload,
      };
    },
    getTaskListReducers(state, {payload}) {
      return {
        ...state,
        taskSubmit: payload,
      };
    },
  },
};
