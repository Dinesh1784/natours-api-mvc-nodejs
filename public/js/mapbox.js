export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibWF0cml4MTc4NCIsImEiOiJja3ZocXZhN3cxb3IzMndvMHk2Y3RwNTM5In0.ZpH40YjIqSTIm7wVZdBHXQ';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/matrix1784/ckvj0f9p8jsek14o8fnxxwk8t',
    scrollZoom: false,
    // center: [-118.113491, 34.111745],
    // zoom: 6,
    // interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    const el = document.createElement('div');
    el.className = 'marker';
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 200,
      right: 200,
    },
  });
};
