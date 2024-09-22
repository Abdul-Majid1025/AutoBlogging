import {reducer as KeywordReducer, keywordKey} from '../Slice/KeywordSlice'
import { keywordSaga } from '../Saga/KeywordSaga';
import { useInjectReducer, useInjectSaga } from '../Utils/reduxInjectors';
import { reducer as WebsiteReducer, websiteKey } from 'Slice/WebsiteSlice';
import { websiteSaga } from 'Saga/WebsiteSaga';


const GlobalInjector = function GlobalInjector() {
  useInjectReducer({ key: keywordKey, reducer: KeywordReducer });
  useInjectReducer({ key: websiteKey, reducer: WebsiteReducer });
  
  useInjectSaga({ key: keywordKey, saga: keywordSaga });
  useInjectSaga({ key: websiteKey, saga: websiteSaga });
};

export default GlobalInjector;