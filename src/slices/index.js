import { configureStore } from '@reduxjs/toolkit';
import mappingPointsReducer from './mapSlices.js';

const store = configureStore({
  reducer: {
    mappingPoints: mappingPointsReducer,
  },
});

export default store;
