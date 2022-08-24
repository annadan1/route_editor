import {
  YMaps,
  Map,
  ZoomControl,
  Polyline,
} from '@pbe/react-yandex-maps';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ContainerForPoints from '../ContainerForPoints/index.js';
import Placemarks from '../Placemarks/Placemarks.jsx';

const App = () => {
  const { mappingPoints, currentCenterPoints } = useSelector(
    (state) => state.mappingPoints,
  );

  const { ymaps } = window;

  useEffect(() => {
    const init = () => new ymaps.SuggestView('search-form');
    ymaps.ready(init);
  }, []);

  return (
    <>
      <div className="header"><h3>Редактор маршрута</h3></div>
      <div className="container">
        <ContainerForPoints />
        <YMaps
          query={{
            lang: 'ru_RU',
            load: [
              'geoObject.addon.balloon',
              'Placemark',
              'Polyline',
            ],
          }}
        >
          <Map
            state={{ center: currentCenterPoints, zoom: 9 }}
            width="100%"
            height="100%"
          >
            <ZoomControl />
            <Placemarks mappingPoints={mappingPoints} ymaps={ymaps} />
            <Polyline
              geometry={mappingPoints.map(({ coordinates }) => coordinates)}
              options={{
                balloonCloseButton: false,
                strokeColor: '#000',
                strokeWidth: 4,
                strokeOpacity: 0.5,
              }}
            />
          </Map>
        </YMaps>
      </div>
    </>
  );
};

export default App;
