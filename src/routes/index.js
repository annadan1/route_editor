const baseUrl = 'https://geocode-maps.yandex.ru/1.x/?apikey=6d04da34-f9a4-4fa1-bcf7-8191c77f641f';

export default {
  geocodePath: (adress) => [baseUrl, `geocode=${adress}`, 'format=json', 'results=1'].join('&'),
};
