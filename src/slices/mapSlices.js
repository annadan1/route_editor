/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  uniqueId: 1,
  mappingPoints: [],
  currentCenterPoints: [55.64, 37.76],
};

const mapSlice = createSlice({
  name: 'mappingPoints',
  initialState,
  reducers: {
    addMappingPoints: (state, { payload }) => {
      const { coordinates, name } = payload;
      state.mappingPoints.push({ id: state.uniqueId, coordinates, name });
      state.uniqueId += 1;
      state.currentCenterPoints = coordinates;
    },
    deleteMappingPoint: (state, { payload }) => {
      const newPoints = state.mappingPoints.filter(({ id }) => id !== payload);
      state.mappingPoints = newPoints;
      const previousCenterPoints = state.mappingPoints[state.mappingPoints.length - 1]?.coordinates;
      const newCenterPoints = previousCenterPoints || [55.64, 37.76];
      state.currentCenterPoints = newCenterPoints;
    },
    deleteMappingPoints: (state) => {
      state.mappingPoints = [];
    },
    changeMappingPoint: (state, { payload }) => {
      const currentPoint = state.mappingPoints.find(({ id }) => id === payload.id);
      currentPoint.name = payload.name;
      currentPoint.coordinates = payload.coordinates;
    },
    updateMappingPoints: (state, { payload }) => {
      state.mappingPoints = payload;
    },
  },
});

export const { actions } = mapSlice;
export default mapSlice.reducer;
