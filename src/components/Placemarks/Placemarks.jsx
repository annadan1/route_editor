import React from 'react';
import {
  Placemark,
} from '@pbe/react-yandex-maps';
import { useDispatch } from 'react-redux';
import routes from '../../routes/index.js';
import { actions } from '../../slices/mapSlices.js';

const Placemarks = ({ mappingPoints, ymaps }) => {
  const dispatch = useDispatch();

  const changePoint = ({ response }, id) => {
    const geoObject = response.GeoObjectCollection.featureMember[0];
    const { metaDataProperty, Point } = geoObject.GeoObject;
    const currentPoint = Point.pos
      .split(' ')
      .map((item) => Number(item))
      .reverse();
    const currentAdress = metaDataProperty.GeocoderMetaData.text;
    dispatch(actions.changeMappingPoint({
      coordinates: currentPoint,
      name: currentAdress,
      id,
    }));
  };

  const handleDragEnd = (e, id) => {
    const newCoordinates = e.get('target').geometry.getCoordinates();

    fetch((routes.geocodePath([...newCoordinates].reverse())))
      .then((response) => response.json())
      .then((data) => changePoint(data, id))
      .catch((err) => console.log(err));
  };

  const handleDrag = (e, id, name) => {
    const newCoordinates = e.get('target').geometry.getCoordinates();
    dispatch(actions.changeMappingPoint({
      coordinates: newCoordinates,
      name,
      id,
    }));
  };

  return (
    <>
      {mappingPoints.map(({ id, name, coordinates }, index) => (
        <Placemark
          key={id}
          geometry={coordinates}
          properties={{ iconContent: index + 1 }}
          options={{
            draggable: true,
            balloonContentLayout:
            ymaps.templateLayoutFactory.createClass(name),
            preset: 'islands#circleIcon',
            iconColor: 'green',
          }}
          onDragEnd={(e) => handleDragEnd(e, id)}
          onDrag={(e) => {
            handleDrag(e, id, name);
          }}
        />
      ))}
    </>
  );
};

export default Placemarks;
