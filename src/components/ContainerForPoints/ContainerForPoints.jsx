import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Coordinates from '../Coordinates/index.js';
import { actions } from '../../slices/mapSlices.js';
import routes from '../../routes/index.js';

const ContainerForPoints = () => {
  const dispatch = useDispatch();
  const ref = useRef();
  const [address, setAddress] = useState('');

  useEffect(() => {
    ref.current.focus();
  });

  const addPoint = ({ response }) => {
    const geoObject = response.GeoObjectCollection.featureMember[0];
    const { metaDataProperty, Point } = geoObject.GeoObject;
    const currentPoint = Point.pos
      .split(' ')
      .map((item) => Number(item))
      .reverse();
    const currentAdress = metaDataProperty.GeocoderMetaData.text;
    dispatch(actions.addMappingPoints({
      coordinates: currentPoint,
      name: currentAdress,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(routes.geocodePath(ref.current.value))
      .then((response) => response.json())
      .then((data) => addPoint(data))
      .catch((err) => console.log(err));
    setAddress('');
  };

  return (
    <div className="containerForPoints">
      <form onSubmit={handleSubmit} className="formForAddingPoint">
        <input
          placeholder="Новая точка маршрута"
          value={address}
          ref={ref}
          type="text"
          id="search-form"
          onChange={(e) => setAddress(e.target.value)}
        />
        <button type="submit" disabled={address === ''}>Добавить точку маршрута</button>
      </form>
      <Coordinates />
    </div>
  );
};

export default ContainerForPoints;
