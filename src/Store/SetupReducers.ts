/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from '@reduxjs/toolkit';

import { InjectedReducersType } from './InjectorsTypes';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(injectedReducers: InjectedReducersType = {}) {
  // Initially we don't have any injectedReducers, so returning identity function to avoid the error
  if (Object.keys(injectedReducers).length === 0) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (state: any) => state;
  }
  return combineReducers({
    ...injectedReducers,
  });
}
