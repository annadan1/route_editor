import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Reorder } from 'framer-motion';
import { actions } from '../../slices/mapSlices.js';

const Coordinates = () => {
  const dispatch = useDispatch();
  const { mappingPoints } = useSelector((state) => state.mappingPoints);

  const handleClick = (id) => {
    if (!id) {
      dispatch(actions.deleteMappingPoints());
    }
    dispatch(actions.deleteMappingPoint(id));
  };

  const handleReorder = (sortedPoints) => {
    dispatch(actions.updateMappingPoints(sortedPoints));
  };

  return (
    <>
      <Reorder.Group as="div" axys="y" values={mappingPoints} onReorder={handleReorder} className="reorderGroup">
        {mappingPoints.map((point, index) => (
          <Reorder.Item
            key={point.id}
            id={`point-${point.id}-${index}`}
            className="point"
            draggable="true"
            value={point}
            whileDrag={{
              scale: 1.1,
              borderStyle: 'dotted',
              borderWidth: '2px',
              borderColor: 'gray',
            }}
          >
            {point.name}
            <button
              type="button"
              className="deletePoint"
              onClick={() => handleClick(point.id)}
            >
              х
            </button>
          </Reorder.Item>
        ))}
      </Reorder.Group>
      {mappingPoints.length >= 1 && <button className="deleteAllPoints" type="button" onClick={() => { handleClick(); }}>Удалить все точки</button>}
    </>
  );
};

export default Coordinates;
