import { useInjectReducer as useReducer, useInjectSaga as useSaga } from 'redux-injectors';
import { InjectReducerParams, InjectSagaParams, RootStateKeyType } from '../Store/InjectorsTypes';

/* Wrap redux-injectors with stricter types */

export function useInjectReducer<Key extends RootStateKeyType>(params: InjectReducerParams<Key>) {
  return useReducer(params);
} // used to inject a new reducer into the state

export function useInjectSaga(params: InjectSagaParams) {
  return useSaga(params);
} // used to initialize new saga into the saga middleware listener