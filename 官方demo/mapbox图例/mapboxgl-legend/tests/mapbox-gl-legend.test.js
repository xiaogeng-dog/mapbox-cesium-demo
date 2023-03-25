describe('MapboxLegend', function() {

  beforeEach(() => {
    document.body.style.margin = '0'
    var fixture = "<div id='map' style='height:100vh;width:100wh'></div>";
    document.body.insertAdjacentHTML('afterbegin', fixture)
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'https://openmaptiles.github.io/osm-bright-gl-style/style-cdn.json',
      center: [16.913988783638445, 52.357498181163635],
      zoom: 8
    })
    const data = {
      'Polygon': {
        type: 'Feature',
        properties: {
          'type': 'Polygon'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [16.79685115814209,52.45684622754481],
            [17.103095054626465,52.45600939264076],
            [17.083868980407715,52.29924157848631],
            [16.696600914001465,52.300081389496114],
            [16.79685115814209,52.45684622754481]
          ]]
        }
      },
      'Line': {
        type: 'Feature',
        properties: {
          'type': 'LineString'
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [16.930060386657715,52.565499392715374],
            [16.84628963470459,52.19750685699392]
          ]
        }
      },
      'Point': {
        type: 'Feature',
        properties: {
          'type': 'Point'
        },
        geometry: {
          type: 'Point',
          coordinates: [16.895824670791626,52.39501823939772]
        }
      }
    }
    const loadLayers = layersObj => {
      let overlays = {}
      for(let layer in layersObj){
        if(layersObj[layer].geometry.type == 'Point'){
          overlays[layer] = {
            'id': layer,
            'source': layer,
            'type': 'circle',
            'paint': {
              'circle-radius': 10,
              'circle-color': '#007cbf'
            }
          }
        }else if(layersObj[layer].geometry.type == 'Polygon'){
          overlays[layer] = {
            'id': layer,
            'source': layer,
            'type': 'fill',
            'paint': {
              'fill-color': '#e50000',
              'fill-opacity': 1
            }
          }
        }else if(layersObj[layer].geometry.type == 'LineString'){
          overlays[layer] = {
            'id': layer,
            'source': layer,
            'type': 'line',
            'paint': {
              'line-color': '#007300',
              'line-width': 8
            }
          }
        }
      }
      return overlays
    }
    let legend
    map.on('load', () => {
      let overlays = loadLayers(data)
      for(let layer in overlays){
        map.addSource(layer, {
          'type': 'geojson',
          'data': data[layer]
        })
        map.addLayer(overlays[layer])
      }
      let basemaps = {
        'OSM Bright': 'https://openmaptiles.github.io/osm-bright-gl-style/style-cdn.json',
        'OSM Dark': 'https://openmaptiles.github.io/dark-matter-gl-style/style-cdn.json'
      }
      legend = new MapboxLegend(overlays, basemaps)
      map.addControl(legend)
    })  
  })

  it('Map loaded', () => {
    expect(map.id).toBe('map')
  })
})