/** @type {typeof import('ol')} */
// EL PUERTO DEL SERVER ES 5500, NO 8080
const source = "http://200.126.24.196:8080" // Puede ser ip (poner la ip actualizada) o https://localhost:8080


// Coordenadas de puntos del lindero obtenido con Google Maps y transformado a coordenadas GeoJSON con Mapshaper
var lindero_geom = new ol.geom.Polygon([[
    [-79.982435,-2.151406],[-79.982385,-2.147952],[-79.981731,-2.144858],[-79.981156,-2.144333],[-79.968392,-2.13964],[-79.968154,-2.139688],[-79.9674006,-2.1395158],[-79.961451,-2.137411],[-79.9586325,-2.1367511],[-79.955032,-2.136118],[-79.952349,-2.135548],[-79.949207,-2.134686],[-79.947943,-2.1346],[-79.947656,-2.134801],[-79.94661,-2.138208],[-79.947179,-2.139331],[-79.947154,-2.139921],[-79.9469689,-2.1412942],[-79.94705,-2.142129],[-79.946844,-2.142172],[-79.946819,-2.142066],[-79.946667,-2.141856],[-79.946437,-2.141763],[-79.946128,-2.141857],[-79.946136,-2.1442279],[-79.946155,-2.145537],[-79.946202,-2.147717],[-79.946441,-2.14965],[-79.948978,-2.150719],[-79.949852,-2.151076],[-79.951259,-2.151611],[-79.952622,-2.152254],[-79.952839,-2.152379],[-79.954163,-2.152894],[-79.954186,-2.152878],[-79.955498,-2.153403],[-79.956497,-2.153757],[-79.958846,-2.154693],[-79.962863,-2.156287],[-79.967174,-2.157574],[-79.9704073,-2.1547897],[-79.975341,-2.152406],[-79.97591,-2.153082],[-79.977137,-2.153758],[-79.980967,-2.153143],[-79.982435,-2.151406] 
]]);

lindero_geom.transform('EPSG:4326', 'EPSG:3857'); 

const fillStyle = new ol.style.Style({
  fill: new ol.style.Fill({
    color: '#111111' // No importa el color, funciona como opacity mask
  })
});

// Color del borde del basemap
const borderStyle = new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: '#1d1b1c',
    width: 3,         // Grosor en pixeles
  })
});


const lindero_Feature = new ol.Feature({
  geometry: lindero_geom,
  name: 'Lindero',
  status: 'Active' // You can attach custom attributes here just like in PostgreSQL!
});

// 4. Create an empty Vector Source and add your JavaScript feature into it
const lindero_localVectorSource = new ol.source.Vector({
  features: [lindero_Feature] // You can add multiple features inside this array separated by commas
});

// 5. Apply your custom styling
const lindero_vectorStyle = new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: '#edf030',
    width: 3,
  }),
});

// 6. Define the final layer and attach it to your main map instance
const lindero = new ol.layer.Vector({
  source: lindero_localVectorSource,
  style: lindero_vectorStyle
});








var basemap = new ol.layer.Tile({
  // type: 'base',
  visible: true,
  source: new ol.source.XYZ({
    url: 'https://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
  //source: new ol.source.OSM(),
  //className: 'clipped-basemap-canvas',
})
});

/*basemap.on('postrender', (event) => {
  const vectorContext = ol.render.getVectorContext(event);
  const ctx = event.context;


  ctx.globalCompositeOperation = 'destination-in';
  

  vectorContext.setStyle(fillStyle);
  vectorContext.drawGeometry(lindero);
  

  ctx.globalCompositeOperation = 'source-over';

  vectorContext.setStyle(borderStyle);
  vectorContext.drawGeometry(lindero);
});*/

// Con la capa poligonos se puede hacer que todo un subgrupo tenga el mismo estilo. No debe tener título
/*
const poligonos = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: source + '/geoserver/gis_espol/wms',
    params: {
      'LAYERS': 'gis_espol:pg_polig_espol, gis_espol:pg_puntos_espol', 
      'TILED': true,                        
      'FORMAT': 'image/png',
      'STYLES': 'gis_espol:poligonos_grupo, ',
      'CQL_FILTER': "propietario IS NOT NULL; propietario IS NOT NULL",
      //'SRS': 'EPSG:3857'     // Proyecta el layer de 4326 (original) a 3857 (mapa base)
    },
    //crossOrigin: null       // No es necesario null porque se quitó el comentario 'cross origin' en el código base de Geoserver (Program Files\Apache Software Foundation\Tomcat 10.1\webapps\geoserver\WEB-INF\web.xml)
  }),
  visible: false, 
  projection: 'EPSG:4326'
});
*/

const poligonosStyle = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgba(49, 192, 68, 0.9)'    // El 0.5 se refiere a la opacidad
  }),
  stroke: new ol.style.Stroke({ 
    color: '#17191a', 
    width: 2 
  })
});

const poligonosStyle1 = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgba(109, 100, 52, 1)'    // El 0.5 se refiere a la opacidad
  }),
  stroke: new ol.style.Stroke({ 
    color: '#17191a', 
    width: 2 
  })
});

const poligonosStyle2 = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgba(19, 114, 32, 1)'  
  }),
  stroke: new ol.style.Stroke({ 
    color: '#17191a', 
    width: 2 
  })
});

const poligonosStyle3 = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgb(87, 226, 106)'    
  }),
  stroke: new ol.style.Stroke({ 
    color: '#17191a', 
    width: 2 
  })
});

const poligonosStyle4 = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgba(26, 67, 128, 1)'   
  }),
  stroke: new ol.style.Stroke({ 
    color: '#17191a', 
    width: 2 
  })
});

const poligonosStyle5 = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgba(103, 196, 196, 1)'    
  }),
  stroke: new ol.style.Stroke({ 
    color: '#17191a', 
    width: 2 
  })
});

const poligonosStyle6 = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgba(15, 15, 15, 1)'    
  }),
  stroke: new ol.style.Stroke({ 
    color: '#17191a', 
    width: 2 
  })
});

const poligonosStyle7 = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgb(236, 110, 26)'  
  }),
  stroke: new ol.style.Stroke({ 
    color: '#17191a', 
    width: 2 
  })
});

const poligonosStyle8 = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgb(250, 235, 29)'   
  }),
  stroke: new ol.style.Stroke({ 
    color: '#17191a', 
    width: 2 
  })
});

const poligonosStyle9 = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgb(81, 11, 173)'  
  }),
  stroke: new ol.style.Stroke({ 
    color: '#17191a', 
    width: 2 
  })
});

const poligonosStyle10 = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgb(255, 38, 23)'    
  }),
  stroke: new ol.style.Stroke({ 
    color: '#17191a', 
    width: 2 
  })
});

const poligonosStyle11 = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgba(120, 127, 128, 1)'    
  }),
  stroke: new ol.style.Stroke({ 
    color: '#17191a', 
    width: 2 
  })
});

const poligonosStyle12 = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgb(20, 63, 126)'    
  }),
  stroke: new ol.style.Stroke({ 
    color: '#17191a', 
    width: 2 
  })
});

const poligonosStyle13 = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgba(126, 185, 111, 1)'    
  }),
  stroke: new ol.style.Stroke({ 
    color: '#17191a', 
    width: 2 
  })
});

const poligonosStyle14 = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgba(196, 64, 178, 1)'    
  }),
  stroke: new ol.style.Stroke({ 
    color: '#17191a', 
    width: 2 
  })
});


const poligonos = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/polig_espol.geojson', format: new ol.format.GeoJSON() }),
  title: '<b>Edificaciones</b>',
  visible: false,
  style: function(feature) {
    const attributeValue = feature.get('propietario'); 
    const zona = feature.get('zona');
    if (attributeValue === null && attributeValue === undefined && String(attributeValue).trim() === '') {  // Quita las celdas null
      return null; // Oculta el polígono si el campo está vacío o es nulo
    }

    if (zona == 1) {
      return poligonosStyle1; 
    }
    else if (zona == 2) {
      return poligonosStyle2; 
    }
    else if (zona == 3) {
      return poligonosStyle3; 
    }
    else if (zona == 4) {
      return poligonosStyle4; 
    }
    else if (zona == 5) {
      return poligonosStyle5; 
    }
    else if (zona == 6) {
      return poligonosStyle6; 
    }
    else if (zona == 7) {
      return poligonosStyle7; 
    }
    else if (zona == 8) {
      return poligonosStyle8; 
    }
    else if (zona == 9) {
      return poligonosStyle9; 
    }
    else if (zona == 10) {
      return poligonosStyle10; 
    }
    else if (zona == 11) {
      return poligonosStyle11; 
    }
    else if (zona == 12) {
      return poligonosStyle12; 
    }
    else if (zona == 13) {
      return poligonosStyle13; 
    }
    else if (zona == 14) {
      return poligonosStyle14; 
    }

  }
});



// Filtrar solo los edificios espol
/*
const polig_espol = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: source + '/geoserver/gis_espol/wms',
    params: {
      'LAYERS': 'gis_espol:pg_polig_espol, gis_espol:pg_puntos_espol', 
      'TILED': true,                        
      'FORMAT': 'image/png',
      //'STYLES': 'gis_espol:poligonos_grupo, ',
      'CQL_FILTER': "propietario = 'ESPOL'; propietario = 'ESPOL'",  // Filtro por columna en cada capa
      //'SRS': 'EPSG:3857'     // Proyecta el layer de 4326 (original) a 3857 (mapa base)
    },
    //crossOrigin: null       // No es necesario null porque se quitó el comentario 'cross origin' en el código base de Geoserver (Program Files\Apache Software Foundation\Tomcat 10.1\webapps\geoserver\WEB-INF\web.xml)
  }),
  title: 'ESPOL',
  visible: false, 
  projection: 'EPSG:4326'
});
*/


const polig_espolStyle = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgba(47, 49, 51, 0.9)'    // El 0.5 se refiere a la opacidad
  }),
  stroke: new ol.style.Stroke({ 
    color: '#17191a', 
    width: 2 
  })
});


const polig_espol= new ol.layer.Vector({
  title: 'ESPOL',
  source: new ol.source.Vector({ url: './capas/polig_espol.geojson', format: new ol.format.GeoJSON() }),
  visible: false,
  style: function(feature) {
    const attributeValue = feature.get('propietario'); 
    if (attributeValue && attributeValue.toLowerCase().includes('espol')) {  // debe estar en minúsculas
      return polig_espolStyle;
    } else {
      return null; 
    }
  }
});




// Filtrar solo los edificios comodato
/*
const polig_comodato = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: source + '/geoserver/gis_espol/wms',
    params: {
      'LAYERS': 'gis_espol:pg_polig_espol, gis_espol:pg_puntos_espol', 
      'TILED': true,                        
      'FORMAT': 'image/png',
      'CQL_FILTER': "propietario = 'COMODATO'; propietario = 'COMODATO'",
      //'SRS': 'EPSG:3857'     // Proyecta el layer de 4326 (original) a 3857 (mapa base)
    },
    //crossOrigin: null       // No es necesario null porque se quitó el comentario 'cross origin' en el código base de Geoserver (Program Files\Apache Software Foundation\Tomcat 10.1\webapps\geoserver\WEB-INF\web.xml)
  }),
  title: 'COMODATO',
  visible: false, 
  projection: 'EPSG:4326'
});
*/

const polig_comodatoStyle = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgba(47, 49, 51, 0.9)' 
  }),
  stroke: new ol.style.Stroke({ 
    color: '#17191a', 
    width: 2 
  })
});


const polig_comodato = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/polig_espol.geojson', format: new ol.format.GeoJSON() }),
  title: '<b>Comodatos</b>',
  visible: false,
  style: function(feature) {
    const attributeValue = feature.get('propietario'); 
    const zona = feature.get('zona');
    if (attributeValue && attributeValue.toLowerCase().includes('comodato')) {  // debe estar en minúsculas
      
      if (zona == 1) {
        return poligonosStyle1; 
      }
      else if (zona == 2) {
        return poligonosStyle2; 
      }
      else if (zona == 3) {
        return poligonosStyle3; 
      }
      else if (zona == 4) {
        return poligonosStyle4; 
      }
      else if (zona == 5) {
        return poligonosStyle5; 
      }
      else if (zona == 6) {
        return poligonosStyle6; 
      }
      else if (zona == 7) {
        return poligonosStyle7; 
      }
      else if (zona == 8) {
        return poligonosStyle8; 
      }
      else if (zona == 9) {
        return poligonosStyle9; 
      }
      else if (zona == 10) {
        return poligonosStyle10; 
      }
      else if (zona == 11) {
        return poligonosStyle11; 
      }
      else if (zona == 12) {
        return poligonosStyle12; 
      }
      else if (zona == 13) {
        return poligonosStyle13; 
      }
      else if (zona == 14) {
        return poligonosStyle14; 
      }



    } else {
      return null; 
    }
  }
});




// Filtrar solo los edificios arriendo
/*
const polig_arriendo = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: source + '/geoserver/gis_espol/wms',
    params: {
      'LAYERS': 'gis_espol:pg_polig_espol, gis_espol:pg_puntos_espol', 
      'TILED': true,                        
      'FORMAT': 'image/png',
      'CQL_FILTER': "propietario = 'ARRIENDO'; propietario = 'ARRIENDO'",
      //'SRS': 'EPSG:3857'     // Proyecta el layer de 4326 (original) a 3857 (mapa base)
    },
    //crossOrigin: null       // No es necesario null porque se quitó el comentario 'cross origin' en el código base de Geoserver (Program Files\Apache Software Foundation\Tomcat 10.1\webapps\geoserver\WEB-INF\web.xml)
  }),
  title: 'ARRIENDO',
  visible: false, 
  projection: 'EPSG:4326'
});
*/

const polig_arriendoStyle = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgba(47, 49, 51, 0.9)' 
  }),
  stroke: new ol.style.Stroke({ 
    color: '#17191a', 
    width: 2 
  })
});


const polig_arriendo = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/polig_espol.geojson', format: new ol.format.GeoJSON() }),
  title: '<b>Arriendos</b>',
  visible: false,
  style: function(feature) {
    const attributeValue = feature.get('propietario'); 
    const zona = feature.get('zona');
    if (attributeValue && attributeValue.toLowerCase().includes('arriendo')) {  // debe estar en minúsculas
      
      if (zona == 1) {
        return poligonosStyle1; 
      }
      else if (zona == 2) {
        return poligonosStyle2; 
      }
      else if (zona == 3) {
        return poligonosStyle3; 
      }
      else if (zona == 4) {
        return poligonosStyle4; 
      }
      else if (zona == 5) {
        return poligonosStyle5; 
      }
      else if (zona == 6) {
        return poligonosStyle6; 
      }
      else if (zona == 7) {
        return poligonosStyle7; 
      }
      else if (zona == 8) {
        return poligonosStyle8; 
      }
      else if (zona == 9) {
        return poligonosStyle9; 
      }
      else if (zona == 10) {
        return poligonosStyle10; 
      }
      else if (zona == 11) {
        return poligonosStyle11; 
      }
      else if (zona == 12) {
        return poligonosStyle12; 
      }
      else if (zona == 13) {
        return poligonosStyle13; 
      }
      else if (zona == 14) {
        return poligonosStyle14; 
      }

    } else {
      return null; 
    }
  }
});




/*
const puntos = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: source + '/geoserver/gis_espol/wms',
    params: {
      'LAYERS': 'gis_espol:pg_puntos_espol', 
      'TILED': true,                        
      'FORMAT': 'image/png',
      //'SRS': 'EPSG:3857'
    },
    //crossOrigin: null,
    projection: 'EPSG:4326'
  }),
});
*/


const puntosStyle = new ol.style.Style({
  image: new ol.style.Circle({
    radius: 0, 
    fill: new ol.style.Fill({
      color: 'rgba(47, 49, 51, 0.9)' 
    }),
    stroke: new ol.style.Stroke({ 
      color: '#17191a', 
      width: 1 
    })
  }),
  text: new ol.style.Text({
    font: 'bold 12px Calibri,sans-serif',
    fill: new ol.style.Fill({ color: '#17191a' }),
    stroke: new ol.style.Stroke({ color: '#ffffff', width: 3 }),
    offsetY: -20, 
    text: ''
  })
});


const puntos = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/puntos_espol.geojson', format: new ol.format.GeoJSON() }),
  visible: false,
  style: function(feature, resolution) {

    if (resolution < 0.8) {
      // Muestra etiquetas al hacer zoom
      const codigo = feature.get('name') || '';
      const codigoAnterior = feature.get('cod_anterior') || '';
      let labelText = codigo; 
        
      if (codigoAnterior) {
        labelText += `\nAntes:  ${codigoAnterior}`;
      }
      puntosStyle.getText().setText(labelText);
    } else {
      // Quita etiquetas al hacer zoom out
      puntosStyle.getText().setText('');
    }
    return puntosStyle;
  }
});



const puntos_espol = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/puntos_espol.geojson', format: new ol.format.GeoJSON() }),
  visible: false,
  style: function(feature, resolution) {
    const attributeValue = feature.get('propietario'); 
    if (attributeValue && attributeValue.toLowerCase().includes('espol')) {  // debe estar en minúsculas

      if (resolution < 0.8) {
        // Muestra etiquetas al hacer zoom
        const codigo = feature.get('name') || '';
        const codigoAnterior = feature.get('cod_anterior') || '';
        let labelText = codigo; 
        
        if (codigoAnterior) {
          labelText += `\nAntes:  ${codigoAnterior}`;
        }
        puntosStyle.getText().setText(labelText);
      } else {
        // Quita etiquetas al hacer zoom out
        puntosStyle.getText().setText('');
      }

      return puntosStyle;
    } else {
      return null; 
    }
  }
});


const puntos_comodato = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/puntos_espol.geojson', format: new ol.format.GeoJSON() }),
  visible: false,
  style: function(feature, resolution) {
    const attributeValue = feature.get('propietario'); 
    if (attributeValue && attributeValue.toLowerCase().includes('comodato')) {  // debe estar en minúsculas

      if (resolution < 0.8) {
        // Muestra etiquetas al hacer zoom
        const codigo = feature.get('name') || '';
        const codigoAnterior = feature.get('cod_anterior') || '';
        let labelText = codigo; 
        
        if (codigoAnterior) {
          labelText += `\nAntes:  ${codigoAnterior}`;
        }
        puntosStyle.getText().setText(labelText);
      } else {
        // Quita etiquetas al hacer zoom out
        puntosStyle.getText().setText('');
      }

      return puntosStyle;
    } else {
      return null; 
    }
  }
});


const puntos_arriendo = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/puntos_espol.geojson', format: new ol.format.GeoJSON() }),
  visible: false,
  style: function(feature, resolution) {
    const attributeValue = feature.get('propietario'); 
    if (attributeValue && attributeValue.toLowerCase().includes('arriendo')) {  // debe estar en minúsculas

      if (resolution < 0.8) {
        // Muestra etiquetas al hacer zoom
        const codigo = feature.get('name') || '';
        const codigoAnterior = feature.get('cod_anterior') || '';
        let labelText = codigo; 
        
        if (codigoAnterior) {
          labelText += `\nAntes:  ${codigoAnterior}`;
        }
        puntosStyle.getText().setText(labelText);
      } else {
        // Quita etiquetas al hacer zoom out
        puntosStyle.getText().setText('');
      }

      return puntosStyle;
    } else {
      return null; 
    }
  }
});


polig_espol.on('change:visible', () => {
  const isVisible = polig_espol.getVisible();
  puntos_espol.setVisible(isVisible);
});

polig_comodato.on('change:visible', () => {
  const isVisible = polig_comodato.getVisible();
  puntos_comodato.setVisible(isVisible);
});

polig_arriendo.on('change:visible', () => {
  const isVisible = polig_arriendo.getVisible();
  puntos_arriendo.setVisible(isVisible);
});

poligonos.on('change:visible', () => {
  const isVisible = poligonos.getVisible();
  puntos.setVisible(isVisible);
});


// No es necesario utilizarias las layer line para edificaciones
/*const edificaciones = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: source + '/geoserver/gis_espol/wms',
    params: {
      'LAYERS': 'gis_espol:pg_lin_espol', 
      'TILED': true,                        
      'FORMAT': 'image/png',
      //'SRS': 'EPSG:3857'
    },
    //crossOrigin: null
  }),
  visible: false, 
  projection: 'EPSG:4326',
});
*/

// poligonos debe estar al final
const edificaciones = new ol.layer.Group({
  title: 'Edificaciones',
  layers: [polig_arriendo, polig_comodato, puntos_comodato, puntos_arriendo, poligonos, puntos],
  fold: 'close',
});





// COMODATOS Y ARRIENDOS
const puntos_arriendos = new ol.layer.Vector({    // NO CONFUNDIR CON puntos_arriendo
  source: new ol.source.Vector({ 
    url: './capas/arriendos.geojson', 
    format: new ol.format.GeoJSON() 
  }),
  visible: false,
  style: function(feature, resolution) {

    if (resolution < 0.8) {
      const codigo = feature.get('ref') || '';
      const codigoAct = feature.get('cod_act') || '';
      let labelText = codigo; 
        
      if (codigoAct) {
        labelText += `\nCod. Act:  ${codigoAct}`;
      }
      
      // 1. Configure the text string on your existing text style object
      puntosStyle.getText().setText(labelText);

      // 2. Safely find the center coordinate regardless of Polygon vs MultiPolygon
      const geom = feature.getGeometry();
      const type = geom.getType();
      let interiorPoint = null;

      if (type === 'Polygon') {
        interiorPoint = geom.getInteriorPoint();
      } else if (type === 'MultiPolygon') {
        interiorPoint = geom.getInteriorPoints().getPoint(0);
      }

      // 3. Create a dedicated text-only style to place at the center
      const labelStyle = new ol.style.Style({
        text: puntosStyle.getText(), // Reuses your defined fonts, fills, strokes
        geometry: interiorPoint      // Anchors ONLY the text to the centroid
      });

      // 4. Return BOTH styles: the original polygon shape AND the text label on top
      return [puntosStyle, labelStyle];
      
    } else {
      // Clean fallback: Clear text string and only return the standard polygon style
      puntosStyle.getText().setText('');
      return [puntosStyle];
    }
  }
});



const arriendos = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/arriendos.geojson', format: new ol.format.GeoJSON() }),
  title: '<b>Arriendos</b>',
  visible: false,
  style: function(feature) {
    const attributeValue = feature.get('ref'); 
    const zona = feature.get('zona');
    if (attributeValue === null && attributeValue === undefined && String(attributeValue).trim() === '') {  // Quita las celdas null
      return null; // Oculta el polígono si el campo está vacío o es nulo
    }

    if (zona == 1) {
      return poligonosStyle1; 
    }
    else if (zona == 2) {
      return poligonosStyle2; 
    }
    else if (zona == 3) {
      return poligonosStyle3; 
    }
    else if (zona == 4) {
      return poligonosStyle4; 
    }
    else if (zona == 5) {
      return poligonosStyle5; 
    }
    else if (zona == 6) {
      return poligonosStyle6; 
    }
    else if (zona == 7) {
      return poligonosStyle7; 
    }
    else if (zona == 8) {
     return poligonosStyle8; 
    }
    else if (zona == 9) {
      return poligonosStyle9; 
    }
    else if (zona == 10) {
      return poligonosStyle10; 
    }
    else if (zona == 11) {
      return poligonosStyle11; 
    }
    else if (zona == 12) {
      return poligonosStyle12; 
    }
    else if (zona == 13) {
      return poligonosStyle13; 
    }
    else if (zona == 14) {
      return poligonosStyle14; 
    }

    }
});


arriendos.on('change:visible', () => {
  const isVisible = arriendos.getVisible();
  puntos_arriendos.setVisible(isVisible);
});






const puntos_comodatos = new ol.layer.Vector({    // NO CONFUNDIR CON puntos_comodato
  source: new ol.source.Vector({ 
    url: './capas/comodatos.geojson', 
    format: new ol.format.GeoJSON() 
  }),
  visible: false,
  style: function(feature, resolution) {

    if (resolution < 0.8) {
      const codigo = feature.get('ref') || '';
      const codigoAct = feature.get('cod_act') || '';
      let labelText = codigo; 
        
      if (codigoAct) {
        labelText += `\nCod. Act:  ${codigoAct}`;
      }
      
      // 1. Configure the text string on your existing text style object
      puntosStyle.getText().setText(labelText);

      // 2. Safely find the center coordinate regardless of Polygon vs MultiPolygon
      const geom = feature.getGeometry();
      const type = geom.getType();
      let interiorPoint = null;

      if (type === 'Polygon') {
        interiorPoint = geom.getInteriorPoint();
      } else if (type === 'MultiPolygon') {
        interiorPoint = geom.getInteriorPoints().getPoint(0);
      }

      // 3. Create a dedicated text-only style to place at the center
      const labelStyle = new ol.style.Style({
        text: puntosStyle.getText(), // Reuses your defined fonts, fills, strokes
        geometry: interiorPoint      // Anchors ONLY the text to the centroid
      });

      // 4. Return BOTH styles: the original polygon shape AND the text label on top
      return [puntosStyle, labelStyle];
      
    } else {
      // Clean fallback: Clear text string and only return the standard polygon style
      puntosStyle.getText().setText('');
      return [puntosStyle];
    }
  }
});



const comodatos = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/comodatos.geojson', format: new ol.format.GeoJSON() }),
  title: '<b>Comodatos</b>',
  visible: false,
  style: function(feature) {
    const attributeValue = feature.get('ref'); 
    const zona = feature.get('zona');
    if (attributeValue === null && attributeValue === undefined && String(attributeValue).trim() === '') {  // Quita las celdas null
      return null; // Oculta el polígono si el campo está vacío o es nulo
    }

    if (zona == 1) {
      return poligonosStyle1; 
    }
    else if (zona == 2) {
      return poligonosStyle2; 
    }
    else if (zona == 3) {
      return poligonosStyle3; 
    }
    else if (zona == 4) {
      return poligonosStyle4; 
    }
    else if (zona == 5) {
      return poligonosStyle5; 
    }
    else if (zona == 6) {
      return poligonosStyle6; 
    }
    else if (zona == 7) {
      return poligonosStyle7; 
    }
    else if (zona == 8) {
     return poligonosStyle8; 
    }
    else if (zona == 9) {
      return poligonosStyle9; 
    }
    else if (zona == 10) {
      return poligonosStyle10; 
    }
    else if (zona == 11) {
      return poligonosStyle11; 
    }
    else if (zona == 12) {
      return poligonosStyle12; 
    }
    else if (zona == 13) {
      return poligonosStyle13; 
    }
    else if (zona == 14) {
      return poligonosStyle14; 
    }

    }
});


comodatos.on('change:visible', () => {
  const isVisible = comodatos.getVisible();
  puntos_comodatos.setVisible(isVisible);
});




/*const viasespol = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: source + '/geoserver/gis_espol/wms',
    params: {
      'LAYERS': 'gis_espol:vias_espol', 
      'TILED': true,                        
      'FORMAT': 'image/png',
      //'SRS': 'EPSG:3857'
    },
    //crossOrigin: null
  }),
  title: 'Vías Espol',
  visible: false, 
  projection: 'EPSG:4326',
});
*/

const viaStyle = new ol.style.Style({
  stroke: new ol.style.Stroke({ 
    color: '#0e0d0d', 
    width: 2 
  })
});

const via_secStyle = new ol.style.Style({
  stroke: new ol.style.Stroke({ 
    color: '#39bfc9', 
    width: 2 
  })
});


const viasespol = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/lin_espol.geojson', format: new ol.format.GeoJSON() }),
  visible: false,
  style: function(feature) {
    const attributeValue = feature.get('name'); 
    if (attributeValue && attributeValue.toLowerCase().includes('via')) {
      return viaStyle;
    } else {
      return null; 
    }
  }
});

const vias_prin_espol = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/lin_prin_espol.geojson', format: new ol.format.GeoJSON() }),
  title: 'Vías Principales',
  visible: false,
  style: viaStyle
});

const vias_sec_espol = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/lin_sec_espol.geojson', format: new ol.format.GeoJSON() }),
  title: 'Vías Secundarias',
  visible: false,
  style: via_secStyle
});




/*
var lindero = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: source + '/geoserver/gis_espol/wms',
    params: {
      'LAYERS': 'gis_espol:lindero', 
      'TILED': true,                        
      'FORMAT': 'image/png',
      //'SRS': 'EPSG:3857'
    },
    //crossOrigin: null
  }),
  visible: true,
  projection: 'EPSG:4326',
});
*/

/*
const infraestructura = new ol.layer.Group({
  title: 'Infraestructuras',
  layers: [edificaciones],
  fold: 'close',
});
*/

const vias = new ol.layer.Group({
  title: 'Vías',
  layers: [vias_sec_espol, vias_prin_espol, viasespol],
  fold: 'close'
});



/*
edificaciones.on('change:visible', function() {
  const isSubGroupVisible = edificaciones.getVisible();

  if (isSubGroupVisible) {
    console.log("Subgroup checked! Changing to group style...");
    
    // Loop through layers inside the subgroup and apply the GROUP style
    edificaciones.getLayers().forEach(function(layer) {
      if (layer.getSource && layer.getSource().updateParams) {
        layer.getSource().updateParams({
          'STYLES': 'gis_espol:poligonos_espol, ' // 💡 Different style!
        });
      }
    });

  } else {
    console.log("Subgroup unchecked! Reverting layers to default style...");
    
    // Revert layers back to their individual default styles
    edificaciones.getLayers().forEach(function(layer) {
      if (layer.getSource && layer.getSource().updateParams) {
        layer.getSource().updateParams({
          'STYLES': 'gis_espol:formato_color, ' // 💡 Back to default!
        });
      }
    });
  }
});
*/


/*polig_espol.on('change:visible', function() {
  // If the layer is turned on individually (and not because of the subgroup)
  if (activeStatusLayer.getVisible() && edificaciones.getVisible()) {
    activeStatusLayer.getSource().updateParams({
      'STYLES': 'gis_espol:formato_color'
    });
  }
});
*/




// ZONAS
// OPCION 1
// De Civil 3D se obtienen las zonas mediante MAPEXPORT (se exportan como líneas) como shapefile shp. 
// En Geodata Converter (mygeodata.cloud) se lo convierte a geojson (el sistema de coordenadas a colocar es 32717, no 4326). Colocar los formatos shp, shx y dbf, no solo el archivo shapefile.
// Con el archivo geojson en geojson.io importar el archivo, y copiar las coordenadas en el geojson general de trabajo.
// OPCION 2
// Mediante QGIS convertir el shapefile a geojson 
// Cambiar CRS de capa a 32717. Luego reproyectar la capa en Vector - Data Management - Reproyectar capa a 4326. 
// Guardar la capa reproyectada como geojson

const zonasStyle1 = new ol.style.Style({
  stroke: new ol.style.Stroke({ 
    color: 'rgba(109, 100, 52, 1)', 
    width: 6,

    renderer: function(coordinates, state) {
      const ctx = state.context;
      ctx.save();
      
      // Begin path tracking
      ctx.beginPath();
      
      // Step 1: Handle MultiPolygons or Single Polygons safely
      const rings = Array.isArray(coordinates[0][0]) ? coordinates[0] : coordinates;
      
      rings.forEach((ring) => {
        ring.forEach((point, index) => {
          if (index === 0) {
            ctx.moveTo(point[0], point[1]);
          } else {
            ctx.lineTo(point[0], point[1]);
          }
        });
        ctx.closePath();
      });

      // Step 2: Mask everything except the inside area of your polygon geometry 
      ctx.clip();

      // Step 3: Draw the border at double thickness. 
      // The canvas clip drops the outside pixels cleanly.
      ctx.lineWidth = state.strokeWidth * 2;
      ctx.strokeStyle = state.strokeStyle;
      ctx.setLineDash(state.lineDash || []);
      ctx.lineCap = state.lineCap;
      ctx.lineJoin = state.lineJoin;
      ctx.stroke();

      ctx.restore();
    }
  })
});

const zonasStyle2 = new ol.style.Style({
  stroke: new ol.style.Stroke({ 
    color: 'rgba(19, 114, 32, 1)', 
    width: 6
  })
});

const zonasStyle3 = new ol.style.Style({
  stroke: new ol.style.Stroke({ 
    color: 'rgb(87, 226, 106)', 
    width: 6 
  })
});

const zonasStyle4 = new ol.style.Style({
  stroke: new ol.style.Stroke({ 
    color: 'rgba(26, 67, 128, 1)',   
    width: 6 
  })
});

const zonasStyle5 = new ol.style.Style({
  stroke: new ol.style.Stroke({ 
    color: 'rgba(103, 196, 196, 1)', 
    width: 6 
  })
});

const zonasStyle6 = new ol.style.Style({
  stroke: new ol.style.Stroke({ 
    color: 'rgba(15, 15, 15, 1)', 
    width: 6 
  })
});

const zonasStyle7 = new ol.style.Style({
  stroke: new ol.style.Stroke({ 
    color: 'rgb(236, 110, 26)', 
    width: 6 
  })
});

const zonasStyle8 = new ol.style.Style({
  stroke: new ol.style.Stroke({ 
    color: 'rgb(250, 235, 29)', 
    width: 6 
  })
});

const zonasStyle9 = new ol.style.Style({
  stroke: new ol.style.Stroke({ 
    color: 'rgb(81, 11, 173)', 
    width: 6 
  })
});

const zonasStyle10 = new ol.style.Style({
  stroke: new ol.style.Stroke({ 
    color: 'rgb(255, 38, 23)', 
    width: 6 
  })
});

const zonasStyle11 = new ol.style.Style({
  stroke: new ol.style.Stroke({ 
    color: 'rgba(120, 127, 128, 1)', 
    width: 6 
  })
});

const zonasStyle12 = new ol.style.Style({
  stroke: new ol.style.Stroke({ 
    color: 'rgb(20, 63, 126)', 
    width: 6 
  })
});

const zonasStyle13 = new ol.style.Style({
  stroke: new ol.style.Stroke({ 
    color: 'rgba(126, 185, 111, 1)', 
    width: 6 
  })
});

const zonasStyle14 = new ol.style.Style({
  stroke: new ol.style.Stroke({ 
    color: 'rgba(196, 64, 178, 1)', 
    width: 6 
  })
});








const zonas = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/zonas_espol.geojson', format: new ol.format.GeoJSON() }),
  title: '<b>Zonas</b>',
  visible: false,
  style: function(feature) {
    const attributeValue = feature.get('zona'); 
    const zona = feature.get('zona');
    if (attributeValue === null && attributeValue === undefined && String(attributeValue).trim() === '') {  // Quita las celdas null
      return null; // Oculta el polígono si el campo está vacío o es nulo
    }

    if (zona == 1) {
      return zonasStyle1; 
    }
    else if (zona == 2) {
      return zonasStyle2; 
    }
    else if (zona == 3) {
      return zonasStyle3; 
    }
    else if (zona == 4) {
      return zonasStyle4; 
    }
    else if (zona == 5) {
      return zonasStyle5; 
    }
    else if (zona == 6) {
      return zonasStyle6; 
    }
    else if (zona == 7) {
      return zonasStyle7; 
    }
    else if (zona == 8) {
     return zonasStyle8; 
    }
    else if (zona == 9) {
      return zonasStyle9; 
    }
    else if (zona == 10) {
      return zonasStyle10; 
    }
    else if (zona == 11) {
      return zonasStyle11; 
    }
    else if (zona == 12) {
      return zonasStyle12; 
    }
    else if (zona == 13) {
      return zonasStyle13; 
    }
    else if (zona == 14) {
      return zonasStyle14; 
    }
  

    ;
  }
});

const zonas_puntos = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/zonas_espol.geojson', format: new ol.format.GeoJSON() }),
  visible: false,
  style: function(feature) {
    const attributeValue = feature.get('zona'); 
    const zonaValue = feature.get('zona');
    if (attributeValue === null && attributeValue === undefined && String(attributeValue).trim() === '') {  // Quita las celdas null
      return null; // Oculta el polígono si el campo está vacío o es nulo
    }

    // Si no tiene zona, no muestra texto
    const labelText = zonaValue !== undefined && zonaValue !== null ? String(zonaValue) : ''; 

    return new ol.style.Style({

      text: new ol.style.Text({
        // Since zonaValue is a number, we use .toString() here so OpenLayers can render it as text
        text: zonaValue !== undefined && zonaValue !== null ? zonaValue.toString() : '',
        font: 'bold 24px sans-serif',
        fill: new ol.style.Fill({ color: '#000000' }), 
        stroke: new ol.style.Stroke({ color: '#ffffff', width: 3 }), 
        overflow: true, 
        placement: 'point'
      }),

      // CORRECT OPENLAYERS SYNTAX: The function receives the 'feature' argument natively.
      // We use feature.getGeometry() directly.
      geometry: function(feature) {
        const geom = feature.getGeometry();
        if (!geom) return null;
        
        const type = geom.getType();
        if (type === 'Polygon') {
          return geom.getInteriorPoint();
        } else if (type === 'MultiPolygon') {
          // Correct way to extract the first point geometry from a MultiPolygon text anchor
          const interiorPoints = geom.getInteriorPoints();
          return new ol.geom.Point(interiorPoints.getCoordinates()[0]);
        }
        return geom;
      }
    })


  }
});


zonas.on('change:visible', () => {
  const isVisible = zonas.getVisible();
  zonas_puntos.setVisible(isVisible);
});






// PARQUEOS
// Se utiliza DWG de Implantacion general, parqueos y areas de circulacion
// Antes de seleccionar parqueos usar comando UNGROUP - all - Y (para quitar todos los grupos de parqueos y solo tener polilineas)
// Eliminar las polilineas de color Blue para no duplicar parqueos
// Eliminar 2 parqueos incorrectos en zona 4
// Seleccionar solo las polilineas con area igual a: 12.5, 20, 27.2, 36, 40
// Hay 1739 parqueos  (1741 con los dos 'parqueos' en bosque zona 10)

// Para el texto filtrar MText con Text Height 0.6 (queda 1 parqueo en zona 4 sin texto)

const parqueosStyle = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgb(224, 198, 46)'
  }),
  stroke: new ol.style.Stroke({ 
    color: '#17191a', 
    width: 2 
  })
});


const parqueos = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/parqueos.geojson', format: new ol.format.GeoJSON() }),
  title: '<b>Parqueos</b>',
  visible: false,
  style: parqueosStyle
});

/*const parqueos_texto = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/parqueos_texto.geojson', format: new ol.format.GeoJSON() }),
  visible: false,
  style: function(feature, resolution) {
    if (resolution < 0.5) {
      // Muestra etiquetas al hacer zoom
      const codigo = feature.get('Contents') || '';
      let labelText = codigo; 
        
      curvas_textoStyle.getText().setText(labelText);
    } else {
      // Quita etiquetas al hacer zoom out
      curvas_textoStyle.getText().setText('');
    }
    return curvas_textoStyle;
  }
});
*/

const parqueos_textoStyle = new ol.style.Style({
  text: new ol.style.Text({
    font: '12px Calibri,sans-serif',
    fill: new ol.style.Fill({ color: '#000' }),
    stroke: new ol.style.Stroke({ color: '#fff', width: 2 }),
    // Crucial properties for alignment:
    textAlign: 'center',       // Centers text horizontally on the coordinate
    textBaseline: 'middle',    // Centers text vertically on the coordinate
  })
});

const parqueos_texto = new ol.layer.Vector({
  source: new ol.source.Vector({ 
    url: './capas/parqueos_texto.geojson', 
    format: new ol.format.GeoJSON() 
  }),
  visible: false,
  style: function(feature, resolution) {
    if (resolution < 0.5) {
      const codigo = feature.get('Contents') || '';
      
      // Update text and force centering
      parqueos_textoStyle.getText().setText(codigo);
      
      // Optional: Add pixel offsets if your Civil 3D text 
      // justification properties require manual fine-tuning
      // textStyle.getText().setOffsetX(0); 
      // textStyle.getText().setOffsetY(-5); // Negative moves text up

      return parqueos_textoStyle;
    } else {
      return null; // Efficiently skips rendering when zoomed out
    }
  }
});



parqueos.on('change:visible', () => {
  const isVisible = parqueos.getVisible();
  parqueos_texto.setVisible(isVisible);
});












// CICLOVIA
// Ciclovia existente es elaboración propia en QGIS
// Ciclovía proyectada es polilinea creada en Autocad según el dwg del proyecto
const cicloviaStyle = new ol.style.Style({
  stroke: new ol.style.Stroke({ 
    color: '#17191a', 
    width: 4 
  })
});

const cicloviaStyle2 = new ol.style.Style({
  stroke: new ol.style.Stroke({ 
    color: '#d69d20', 
    width: 4 
  })
});

const ciclovia_existente = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/ciclovia_ex.geojson', format: new ol.format.GeoJSON() }),
  title: '<b>Ciclovía existente</b>',
  visible: false,
  style: cicloviaStyle
});

// ciclovia_proy.geojson es la ciclovia continua, no por tramos
const ciclovia_proyectada = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/ciclovia_proy_tramos.geojson', format: new ol.format.GeoJSON() }),
  title: '<b>Ciclovía proyectada</b>',
  visible: false,
  style: cicloviaStyle2
});




/*
const ciclovia_proyectada = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/ciclovia_pry.geojson', format: new ol.format.GeoJSON() }),
  title: '<b>Ciclovía proyectada</b>',
  visible: false,
  style: cicloviaStyle
});
*/




// BOSQUES
// Layer obtenido del dwg: ZONAS
const bosquesColor = 'rgba(43, 141, 87, 1)'
const bosquesStyle = new ol.style.Style({
  fill: new ol.style.Fill({ 
    color: bosquesColor, 
  }),
    stroke: new ol.style.Stroke({ 
    color: bosquesColor, 
    width: 4 
  })
});

const bosquesColor1 = 'rgba(19, 116, 63, 0.8)'
const bosquesStyle1 = new ol.style.Style({
  fill: new ol.style.Fill({ 
    color: bosquesColor1, 
  }),
    stroke: new ol.style.Stroke({ 
    color: bosquesColor1, 
    width: 4 
  })
});

const bosquesColor2 = 'rgba(27, 104, 143, 0.8)'
const bosquesStyle2 = new ol.style.Style({
  fill: new ol.style.Fill({ 
    color: bosquesColor2, 
  }),
  stroke: new ol.style.Stroke({ 
    color: bosquesColor2, 
    width: 4 
  })
});

const bosquesColor3 = 'rgba(110, 209, 115, 0.8)'
const bosquesStyle3 = new ol.style.Style({
  fill: new ol.style.Fill({ 
    color: bosquesColor3, 
  }),
  stroke: new ol.style.Stroke({ 
    color: bosquesColor3,
    width: 4 
  })
});

const bosquesColor4 = 'rgba(231, 188, 131, 0.8)'
const bosquesStyle4 = new ol.style.Style({
  fill: new ol.style.Fill({ 
    color: bosquesColor4, 
  }),
  stroke: new ol.style.Stroke({ 
    color: bosquesColor4,
    width: 4 
  })
});

const bosquesColor5 = 'rgba(199, 140, 51, 0.8)'
const bosquesStyle5 = new ol.style.Style({
  fill: new ol.style.Fill({ 
    color: bosquesColor5, 
  }),
  stroke: new ol.style.Stroke({ 
    color: bosquesColor5, 
    width: 4 
  })
});


const bosquesContorno = new ol.style.Style({
    stroke: new ol.style.Stroke({ 
    color: bosquesColor, 
    width: 4 
  })
});



/*
const bosques = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/bosques.geojson', format: new ol.format.GeoJSON() }),
  title: '<b>Bosques</b>',
  visible: false,
  style: function(feature) { 
    const zona = feature.get('zona');
    const zonaString = zona ? String(zona).toLowerCase() : '';

    // 3. Evaluate if the word 'bosque' is contained inside the text string
    if (zonaString.includes('protección')) {
      return bosquesStyle1;
    }
    else if (zonaString.includes('reforestación')) {
      return bosquesStyle2;
    }
    else if (zonaString.includes('bosque')) {
      return bosquesStyle3;
    }
    else if (zonaString.includes('desarrollo')) {
      return bosquesStyle4;
    }
    else if (zonaString.includes('infraestructura')) {
      return bosquesStyle5;
    }

  }
});
*/


const bosques_polig = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/bosques_polig.geojson', format: new ol.format.GeoJSON() }),
  visible: false,
  style: bosquesStyle
});

const bosques_contorno = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/bosques_polig.geojson', format: new ol.format.GeoJSON() }),
  visible: false,
  style: bosquesContorno
});

const bosques1 = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/bosques.geojson', format: new ol.format.GeoJSON() }),
  title: 'Protección permanente',
  visible: false,
  style: function(feature) { 
    const zona = feature.get('zona');
    const zonaString = zona ? String(zona).toLowerCase() : '';

    // 3. Evaluate if the word 'bosque' is contained inside the text string
    if (zonaString.includes('protección')) {
      return bosquesStyle1;
    }
  }
});

const bosques2 = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/bosques.geojson', format: new ol.format.GeoJSON() }),
  title: 'Reforestación con fines de conservación',
  visible: false,
  style: function(feature) { 
    const zona = feature.get('zona');
    const zonaString = zona ? String(zona).toLowerCase() : '';

    // 3. Evaluate if the word 'bosque' is contained inside the text string
    if (zonaString.includes('reforestación')) {
      return bosquesStyle2;
    }
  }
});

const bosques3 = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/bosques.geojson', format: new ol.format.GeoJSON() }),
  title: 'Bosque natural',
  visible: false,
  style: function(feature) { 
    const zona = feature.get('zona');
    const zonaString = zona ? String(zona).toLowerCase() : '';

    // 3. Evaluate if the word 'bosque' is contained inside the text string
    if (zonaString.includes('bosque')) {
      return bosquesStyle3;
    }
  }
});

const bosques4 = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/bosques.geojson', format: new ol.format.GeoJSON() }),
  title: 'Desarrollo turístico y de sostenibilidad',
  visible: false,
  style: function(feature) { 
    const zona = feature.get('zona');
    const zonaString = zona ? String(zona).toLowerCase() : '';

    // 3. Evaluate if the word 'bosque' is contained inside the text string
    if (zonaString.includes('desarrollo')) {
      return bosquesStyle4;
    }
  }
});

const bosques5 = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/bosques.geojson', format: new ol.format.GeoJSON() }),
  title: 'Infraestructura para vivienda, \ncaminos y otras construcciones',
  visible: false,
  style: function(feature) { 
    const zona = feature.get('zona');
    const zonaString = zona ? String(zona).toLowerCase() : '';

    // 3. Evaluate if the word 'bosque' is contained inside the text string
    if (zonaString.includes('infraestructura')) {
      return bosquesStyle5;
    }
  }
});




const bosques = new ol.layer.Group({
  title: 'Bosques',
  layers: [bosques5, bosques4, bosques3, bosques2, bosques1, bosques_polig],
  fold: 'close',
});



bosques.on('change:visible', () => {
  const isVisible = bosques.getVisible();
  bosques_contorno.setVisible(isVisible);
});



// SENDEROS
// En dwg de senderos se crearon layers de cada tipo de senderos, obtenidos del layer AB011_SENDERO_BVPP_L
const senderosColor1 = 'rgba(10, 74, 134, 1)'
const senderosStyle1 = new ol.style.Style({
  stroke: new ol.style.Stroke({ 
    color: senderosColor1, 
    width: 4 
  })
});

const senderosColor2 = 'rgba(67, 218, 75, 1)'
const senderosStyle2 = new ol.style.Style({
  stroke: new ol.style.Stroke({ 
    color: senderosColor2, 
    width: 4 
  })
});

const senderosColor3 = 'rgba(252, 96, 218, 1)'
const senderosStyle3 = new ol.style.Style({
  stroke: new ol.style.Stroke({ 
    color: senderosColor3,
    width: 4 
  })
});

const senderosColor4 = 'rgba(196, 23, 17, 1)'
const senderosStyle4 = new ol.style.Style({
  stroke: new ol.style.Stroke({ 
    color: senderosColor4,
    width: 4 
  })
});

const senderosColor5 = 'rgba(235, 161, 51, 1)'
const senderosStyle5 = new ol.style.Style({
  stroke: new ol.style.Stroke({ 
    color: senderosColor5, 
    width: 4 
  })
});

const senderosColor6 = 'rgba(98, 30, 143, 1)'
const senderosStyle6 = new ol.style.Style({
  stroke: new ol.style.Stroke({ 
    color: senderosColor6, 
    width: 4 
  })
});

const senderosColor7 = 'rgba(225, 228, 57, 1)'

const senderosStyle7 = [new ol.style.Style({
    stroke: new ol.style.Stroke({ 
      color: senderosColor7, 
      width: 10 
    })
  }),
  new ol.style.Style({
    stroke: new ol.style.Stroke({ 
      color: senderosColor2, 
      width: 4 
    })
  }),
];


  const senderosStyle8 = [new ol.style.Style({
    stroke: new ol.style.Stroke({ 
      color: senderosColor7, 
      width: 10 
    })
  }),
  new ol.style.Style({
    stroke: new ol.style.Stroke({ 
      color: senderosColor3, 
      width: 4 
    })
  })];


  const senderosStyle9 = [new ol.style.Style({
    stroke: new ol.style.Stroke({ 
      color: senderosColor7, 
      width: 10
    })
  }),
  new ol.style.Style({
    stroke: new ol.style.Stroke({ 
      color: senderosColor6, 
      width: 4 
    })
  })];



const senderos_lin = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/senderos.geojson', format: new ol.format.GeoJSON() }),
  visible: false,
  style: senderosStyle1
});


/*
const senderos = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/senderos.geojson', format: new ol.format.GeoJSON() }),
  title: '<b>Senderos</b>',
  visible: false,
  style: function(feature) { 
    const vehicular = feature.get('vehicular');
    const vehicularString = vehicular ? String(vehicular).toLowerCase() : '';
    if (vehicularString.includes('turistico')) {
      return senderosStyle7;
    }
    else if (vehicularString.includes('científico')) {
      return senderosStyle8;
    }
    else if (vehicularString.includes('serv')) {
      return senderosStyle9;
    }



    const sendero = feature.get('senderos');
    const senderoString = sendero ? String(sendero).toLowerCase() : '';

    // 3. Evaluate if the word 'bosque' is contained inside the text string
    if (senderoString.includes('deportivo')) {
      return senderosStyle1;
    }
    else if (senderoString.includes('turistico')) {
      return senderosStyle2;
    }
    else if (senderoString.includes('científico')) {
      return senderosStyle3;
    }
    else if (senderoString.includes('sendero espol')) {
      return senderosStyle4;
    }
    else if (senderoString.includes('sendero bvpp')) {
      return senderosStyle5;
    }
    else if (senderoString.includes('servidumbre poliducto')) {
      return senderosStyle6;
    }


    

  }
});

*/


const senderos1 = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/senderos.geojson', format: new ol.format.GeoJSON() }),
  title: 'Deportivo',
  visible: false,
  style: function(feature) { 
    const sendero = feature.get('senderos');
    const senderoString = sendero ? String(sendero).toLowerCase() : '';

    if (senderoString.includes('deportivo')) {
      return senderosStyle1;
    }
  }
});

const senderos2 = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/senderos.geojson', format: new ol.format.GeoJSON() }),
  title: 'Turístico',
  visible: false,
  style: function(feature) { 
    const sendero = feature.get('senderos');
    const senderoString = sendero ? String(sendero).toLowerCase() : '';

    if (senderoString.includes('turistico')) {
      return senderosStyle2;
    }
  }
});

const senderos3 = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/senderos.geojson', format: new ol.format.GeoJSON() }),
  title: 'Científico / Académico',
  visible: false,
  style: function(feature) { 
    const sendero = feature.get('senderos');
    const senderoString = sendero ? String(sendero).toLowerCase() : '';

    if (senderoString.includes('científico')) {
      return senderosStyle3;
    }
  }
});

const senderos4 = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/senderos.geojson', format: new ol.format.GeoJSON() }),
  title: 'Sendero Espol',
  visible: false,
  style: function(feature) { 
    const sendero = feature.get('senderos');
    const senderoString = sendero ? String(sendero).toLowerCase() : '';

    if (senderoString.includes('sendero espol')) {
      return senderosStyle4;
    }
  }
});

const senderos5 = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/senderos.geojson', format: new ol.format.GeoJSON() }),
  title: 'Sendero BVPP',
  visible: false,
  style: function(feature) { 
    const sendero = feature.get('senderos');
    const senderoString = sendero ? String(sendero).toLowerCase() : '';

    if (senderoString.includes('sendero bvpp')) {
      return senderosStyle5;
    }
  }
});

const senderos6 = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/senderos.geojson', format: new ol.format.GeoJSON() }),
  title: 'Servidumbre poliducto',
  visible: false,
  style: function(feature) { 
    const sendero = feature.get('senderos');
    const senderoString = sendero ? String(sendero).toLowerCase() : '';

    if (senderoString.includes('servidumbre poliducto')) {
      return senderosStyle6;
    }
  }
});

const senderos7 = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/senderos.geojson', format: new ol.format.GeoJSON() }),
  visible: false,
  style: function(feature) { 
    const vehicular = feature.get('vehicular');
    const vehicularString = vehicular ? String(vehicular).toLowerCase() : '';
    if (vehicularString.includes('turistico')) {
      return senderosStyle7;
    }
  }
});

const senderos8 = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/senderos.geojson', format: new ol.format.GeoJSON() }),
  visible: false,
  style: function(feature) { 
    const vehicular = feature.get('vehicular');
    const vehicularString = vehicular ? String(vehicular).toLowerCase() : '';
    if (vehicularString.includes('científico')) {
      return senderosStyle8;
    }
  }
});

const senderos9 = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/senderos.geojson', format: new ol.format.GeoJSON() }),
  visible: false,
  style: function(feature) { 
    const vehicular = feature.get('vehicular');
    const vehicularString = vehicular ? String(vehicular).toLowerCase() : '';
    if (vehicularString.includes('serv')) {
      return senderosStyle9;
    }
  }
});



const senderos = new ol.layer.Group({
  title: 'Senderos',
  layers: [senderos9, senderos8, senderos7, senderos6, senderos5, senderos4, senderos3, senderos2, senderos1, /*senderos_lin*/],
  fold: 'close',
});


senderos2.on('change:visible', () => {
  const isVisible = senderos2.getVisible();
  senderos7.setVisible(isVisible);
});

senderos3.on('change:visible', () => {
  const isVisible = senderos3.getVisible();
  senderos8.setVisible(isVisible);
});

senderos6.on('change:visible', () => {
  const isVisible = senderos6.getVisible();
  senderos9.setVisible(isVisible);
});



// PLANTAS DE TRATAMIENTO
const pt = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/polig_espol.geojson', format: new ol.format.GeoJSON() }),
  title: '<b>Plantas de tratamiento</b>',
  visible: false,
  style: function(feature) {
    const attributeValue = feature.get('referencia_inmueble'); 
    const zona = feature.get('zona');
    if (attributeValue && attributeValue.toLowerCase().includes('planta de tratamiento')) {  // debe estar en minúsculas
      
      if (zona == 1) {
        return poligonosStyle1; 
      }
      else if (zona == 2) {
        return poligonosStyle2; 
      }
      else if (zona == 3) {
        return poligonosStyle3; 
      }
      else if (zona == 4) {
        return poligonosStyle4; 
      }
      else if (zona == 5) {
        return poligonosStyle5; 
      }
      else if (zona == 6) {
        return poligonosStyle6; 
      }
      else if (zona == 7) {
        return poligonosStyle7; 
      }
      else if (zona == 8) {
        return poligonosStyle8; 
      }
      else if (zona == 9) {
        return poligonosStyle9; 
      }
      else if (zona == 10) {
        return poligonosStyle10; 
      }
      else if (zona == 11) {
        return poligonosStyle11; 
      }
      else if (zona == 12) {
        return poligonosStyle12; 
      }
      else if (zona == 13) {
        return poligonosStyle13; 
      }
      else if (zona == 14) {
        return poligonosStyle14; 
      }

    } else {
      return null; 
    }
  }
});



const puntos_pt = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/puntos_espol.geojson', format: new ol.format.GeoJSON() }),
  visible: false,
  style: function(feature, resolution) {
    const attributeValue = feature.get('name'); 
    if (attributeValue && attributeValue.toLowerCase().includes('pt')) {  // debe estar en minúsculas

      if (resolution < 0.8) {
        // Muestra etiquetas al hacer zoom
        const codigo = feature.get('name') || '';
        const codigoAnterior = feature.get('cod_anterior') || '';
        let labelText = codigo; 
        
        if (codigoAnterior) {
          labelText += `\nAntes:  ${codigoAnterior}`;
        }
        puntosStyle.getText().setText(labelText);
      } else {
        // Quita etiquetas al hacer zoom out
        puntosStyle.getText().setText('');
      }

      return puntosStyle;
    } else {
      return null; 
    }
  }
});


pt.on('change:visible', () => {
  const isVisible = pt.getVisible();
  puntos_pt.setVisible(isVisible);
});







// REDES AASS
// Layers usados para redes: MP_COLECTOR GENERAL, MP_PENDIENTE
// Layers usados para camaras: MP_CAMARAS AASS
const aassStyle1 = new ol.style.Style({
  stroke: new ol.style.Stroke({ 
    color: '#102d8b', 
    width: 4 
  })
});

const aassStyle2 = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgb(199, 9, 9)'  
  }),
  stroke: new ol.style.Stroke({ 
    color: 'rgb(199, 9, 9)', 
    width: 2 
  })
});




// Incluye código para convertir los círculos (cámaras) de líneas a polígonos
const aass = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/aass.geojson', format: new ol.format.GeoJSON() }),
  title: '<b>Redes AA.SS.</b>',
  visible: false,
  style: aassStyle1
  
  /* function(feature) {
    const attributeValue = feature.get('Layer');
    const geom = feature.getGeometry();
  
    // 1. ISOLATE THE CIRCLE: Check if the feature geometry is a MultiLineString
    
    if (geom.getType() === 'MultiLineString') {
      const allLines = geom.getCoordinates();
      const firstLine = allLines[0]; // Extract the inner coordinate path loop
      
      if (firstLine && firstLine.length > 1) {
        const firstPoint = firstLine[0];
        const lastPoint = firstLine[firstLine.length - 1];
        
        // Match the microscopic floating-point gap from your data sample
        const diffX = Math.abs(firstPoint[0] - lastPoint[0]);
        const diffY = Math.abs(firstPoint[1] - lastPoint[1]);
        const isClosedLoop = diffX < 0.001 && diffY < 0.001;
        
        if (isClosedLoop) {
          // 2. THE DYNAMIC FIX: Use a geometryFunction inside a dedicated Style object
          // This overrides how OpenLayers *draws* the feature without mutating the source data
          return new ol.style.Style({
            zIndex: 100,  // Hace que el círculo este por encima de las líneas
            geometry: function(f) {
              const originalGeom = f.getGeometry();
              const coords = originalGeom.getCoordinates();
              // Wrap the line coordinates inside a MultiPolygon layout array structure
              return new ol.geom.MultiPolygon([coords]);
            },
            fill: new ol.style.Fill({
              color: 'rgb(255, 38, 23)' // Yellow interior fill with 50% opacity
            }),
            stroke: new ol.style.Stroke({
              color: 'rgb(255, 38, 23)', // Yellow outline border
              width: 4
            })
          });
        }
      }
    } */

});

const aass_camaras = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/aass_camaras.geojson', format: new ol.format.GeoJSON() }),
  visible: false,
  style: aassStyle2
});


aass.on('change:visible', () => {
  const isVisible = aass.getVisible();
  aass_camaras.setVisible(isVisible);
});



// REDES AALL
// Layers usados para redes: MP_CANALES GENERAL
const aallStyle = new ol.style.Style({
  stroke: new ol.style.Stroke({ 
    color: '#102d8b', 
    width: 4 
  })
});


const aall = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/aall.geojson', format: new ol.format.GeoJSON() }),
  title: '<b>Redes AA.LL.</b>',
  visible: false,
  style: aallStyle
});



// REDES AAPP
const aappStyle1 = new ol.style.Style({
  stroke: new ol.style.Stroke({ 
    color: '#102d8b', 
    width: 4 
  })
});

const aappStyle2 = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgb(199, 9, 9)'  
  }),
  stroke: new ol.style.Stroke({ 
    color: 'rgb(199, 9, 9)', 
    width: 2 
  })
});


const aapp = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/aapp.geojson', format: new ol.format.GeoJSON() }),
  title: '<b>Redes AA.PP.</b>',
  visible: false,
  style: aappStyle1
  

});

const aapp_camaras = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/aapp_camaras.geojson', format: new ol.format.GeoJSON() }),
  visible: false,
  style: aappStyle2
});


aapp.on('change:visible', () => {
  const isVisible = aapp.getVisible();
  aapp_camaras.setVisible(isVisible);
});




// VALVULAS Y CAMARAS
// En autocad de valvulas hay 35 valvulas y 10 valvulas_aire
// En autocad de camaras hay 58 camaras. Crear layer CAMARAS e incluir polylines con area 9.164, 14.318, 20.619 del layer PROYECTO_CAMARA_AAPP
//#102d8b
const valvulasStyle1 = new ol.style.Style({
  stroke: new ol.style.Stroke({ 
    color: 'rgb(248, 235, 48)', 
    width: 4 
  })
});

const valvulasStyle2 = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgb(248, 235, 48)'  
  }),
  stroke: new ol.style.Stroke({ 
    color: 'rgb(248, 235, 48)', 
    width: 2 
  })
});

const valvulasStyle3 = new ol.style.Style({
  stroke: new ol.style.Stroke({ 
    color: 'rgb(16, 61, 119)', 
    width: 4 
  })
});

const camarasStyle = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgb(238, 228, 92)'  
  }),
  stroke: new ol.style.Stroke({ 
    color: 'rgb(156, 147, 19)', 
    width: 4 
  })
});


// El archivo dwg de valvulas incluye las redes aa.pp. con las coordenadas correctas
// HAY UNA VALVULA QUE SE REPITE (V87 en valvulas y valvulas_aire)
// REVISAR SI FALTA UN ELEMENTO
const valvulas = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/valvulas.geojson', format: new ol.format.GeoJSON() }),
  visible: false,
  style: valvulasStyle1
  

});

const valvulas_aire = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/valvulas_aire.geojson', format: new ol.format.GeoJSON() }),
  visible: false,
  style: valvulasStyle2
});

const valvulas_aapp = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/valvulas_aapp.geojson', format: new ol.format.GeoJSON() }),
  title: '<b>Redes AA.PP.</b>',
  visible: false,
  style: valvulasStyle3
});



valvulas_aapp.on('change:visible', () => {
  const isVisible = valvulas_aapp.getVisible();
  valvulas.setVisible(isVisible);
});

valvulas_aapp.on('change:visible', () => {
  const isVisible = valvulas_aapp.getVisible();
  valvulas_aire.setVisible(isVisible);
});


const camaras = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/camaras.geojson', format: new ol.format.GeoJSON() }),
  visible: false,
  style: camarasStyle
});


valvulas_aapp.on('change:visible', () => {
  const isVisible = valvulas_aapp.getVisible();
  camaras.setVisible(isVisible);
});


//TOPOGRAFIA
// Usar archivo dwg de sólo las CN (curvas de nivel)
// Seleccionar lineas y polilineas con layers 47 y CVL_CURV_G  (21064 en total)
// Escoger texto con layers COTA_CURVAS y CVL_CURV_TX
// Usar comando TXT2MTXT (convertir a MText)
// Colocar SE (settings), y quitar el check 'Combine into a single mtext object' 
// Seleccionar todo los textos, en propiedad Justify seleccionar Middle center
const curvas_nivelStyle = new ol.style.Style({
  stroke: new ol.style.Stroke({ 
    color: 'rgb(248, 235, 48)', 
    width: 2 
  })
});

/*
const curvas_textoStyle = new ol.style.Style({
  image: new ol.style.Circle({
    radius: 0, 
    fill: new ol.style.Fill({
      color: 'rgba(47, 49, 51, 0.9)' 
    }),
    stroke: new ol.style.Stroke({ 
      color: '#17191a', 
      width: 1 
    })
  }),
  text: new ol.style.Text({
    font: 'bold 12px Calibri,sans-serif',
    fill: new ol.style.Fill({ color: '#17191a' }),
    stroke: new ol.style.Stroke({ color: '#ffffff', width: 3 }),
    offsetY: -20, 
    text: ''
  })
});
*/


const curvas_nivel = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/curvas_nivel.geojson', format: new ol.format.GeoJSON() }),
  title: '<b>Topografía</b>',
  visible: false,
  style: curvas_nivelStyle
});

/*
const curvas_texto = new ol.layer.Vector({
  source: new ol.source.Vector({ url: './capas/curvas_texto.geojson', format: new ol.format.GeoJSON() }),
  visible: false,
  style: function(feature, resolution) {
    if (resolution < 1.6) {
      // Muestra etiquetas al hacer zoom
      const codigo = feature.get('Contents') || '';
      let labelText = codigo; 
        
      curvas_textoStyle.getText().setText(labelText);
    } else {
      // Quita etiquetas al hacer zoom out
      curvas_textoStyle.getText().setText('');
    }
    return curvas_textoStyle;
  }
});
*/

const curvas_textoStyle = new ol.style.Style({
  text: new ol.style.Text({
    font: '12px Calibri,sans-serif',
    fill: new ol.style.Fill({ color: '#000' }),
    stroke: new ol.style.Stroke({ color: '#fff', width: 2 }),
    // Crucial properties for alignment:
    textAlign: 'center',       // Centers text horizontally on the coordinate
    textBaseline: 'middle',    // Centers text vertically on the coordinate
  })
});

const curvas_texto = new ol.layer.Vector({
  source: new ol.source.Vector({ 
    url: './capas/curvas_texto.geojson', 
    format: new ol.format.GeoJSON() 
  }),
  visible: false,
  style: function(feature, resolution) {
    if (resolution < 0.8) {
      const codigo = feature.get('Contents') || '';
      
      // Update text and force centering
      curvas_textoStyle.getText().setText(codigo);
      
      // Optional: Add pixel offsets if your Civil 3D text 
      // justification properties require manual fine-tuning
      // textStyle.getText().setOffsetX(0); 
      // textStyle.getText().setOffsetY(-5); // Negative moves text up

      return curvas_textoStyle;
    } else {
      return null; // Efficiently skips rendering when zoomed out
    }
  }
});


curvas_nivel.on('change:visible', () => {
  const isVisible = curvas_nivel.getVisible();
  curvas_texto.setVisible(isVisible);
});


// INFRAESTRUCTURA EXISTENTE
const infraestructuraStyle = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgb(45, 199, 39)'  
  }),
  stroke: new ol.style.Stroke({ 
    color: '#17191a', 
    width: 2 
  })
});

const infraestructura_deportesStyle = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgb(255, 52, 25)'  
  }),
  stroke: new ol.style.Stroke({ 
    color: '#17191a', 
    width: 2 
  })
});

const infraestructura_serviciosStyle = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgb(16, 81, 202)'  
  }),
  stroke: new ol.style.Stroke({ 
    color: '#17191a', 
    width: 2 
  })
});

const infraestructura_servicios_bancoStyle = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgb(8, 8, 8)'  
  }),
  stroke: new ol.style.Stroke({ 
    color: '#17191a', 
    width: 2 
  })
});

const infraestructura_servicios_barStyle = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgb(16, 81, 202)'  
  }),
  stroke: new ol.style.Stroke({ 
    color: '#17191a', 
    width: 2 
  })
});

const infraestructura_servicios_medStyle = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgb(250, 46, 31)'  
  }),
  stroke: new ol.style.Stroke({ 
    color: '#17191a', 
    width: 2 
  })
});

const infraestructura_servicios_biblioStyle = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgb(247, 159, 45)'  
  }),
  stroke: new ol.style.Stroke({ 
    color: '#17191a', 
    width: 2 
  })
});



const acceso_peatonalStyle = new ol.style.Style({
  stroke: new ol.style.Stroke({ 
    color: '#0832a7', 
    width: 3
  })
});

const acceso_vehicularStyle = new ol.style.Style({
  stroke: new ol.style.Stroke({ 
    color: '#f8f532', 
    width: 3
  })
});



const infraestructura_auditorio = new ol.layer.Vector({
  source: new ol.source.Vector({ 
    url: './capas/infraestructura.geojson', 
    format: new ol.format.GeoJSON() 
  }),
  title: "Auditorios",
  visible: false,
  style: function(feature, resolution) {
    const attributeValue = feature.get('referencia'); 
    
    if (attributeValue && attributeValue.toLowerCase().includes('auditorio')) {

      const stylesToRender = [infraestructuraStyle];

      // 2. Only generate and push the labelStyle if resolution is higher than 0.8
      if (resolution < 1) {
        const labelText = feature.get('referencia') || 'Auditorio'; 

        const labelStyle = new ol.style.Style({
          text: new ol.style.Text({
            text: labelText,
            font: 'bold 12px Arial, sans-serif',
            fill: new ol.style.Fill({ color: '#ffffff' }), 
            stroke: new ol.style.Stroke({ color: '#17191a', width: 3 }), 
            overflow: true, 
            placement: 'point'
          }),
          geometry: function(feature) {
            const geom = feature.getGeometry();
            if (geom.getType() === 'Polygon') {
              return geom.getInteriorPoint(); 
            } else if (geom.getType() === 'MultiPolygon') {
              return geom.getInteriorPoints();
            }
            return geom;
          }
        });

        stylesToRender.push(labelStyle);
      }

      // 3. Return the array (will contain 1 or 2 styles depending on the resolution)
      return stylesToRender;

    } else {
      return null; 
    }
  }
});

const infraestructura_deportes = new ol.layer.Vector({
  source: new ol.source.Vector({ 
    url: './capas/infraestructura.geojson', 
    format: new ol.format.GeoJSON() 
  }),
  title: "Áreas Deportivas",
  visible: false,
  style: function(feature, resolution) {
    const attributeValue = feature.get('zonas'); 
    
    if (attributeValue && attributeValue.toLowerCase().includes('deportes')) {

      const stylesToRender = [infraestructura_deportesStyle];

      // 2. Only generate and push the labelStyle if resolution is higher than 0.8
      if (resolution < 1) {
        const labelText = feature.get('referencia') || 'Servicios'; 

        const labelStyle = new ol.style.Style({
          text: new ol.style.Text({
            text: labelText,
            font: 'bold 12px Arial, sans-serif',
            fill: new ol.style.Fill({ color: '#ffffff' }), 
            stroke: new ol.style.Stroke({ color: '#17191a', width: 3 }), 
            overflow: true, 
            placement: 'point'
          }),
          geometry: function(feature) {
            const geom = feature.getGeometry();
            if (geom.getType() === 'Polygon') {
              return geom.getInteriorPoint(); 
            } else if (geom.getType() === 'MultiPolygon') {
              return geom.getInteriorPoints();
            }
            return geom;
          }
        });

        stylesToRender.push(labelStyle);
      }

      // 3. Return the array (will contain 1 or 2 styles depending on the resolution)
      return stylesToRender;

    } else {
      return null; 
    }
  }
});

/*
const infraestructura_servicios = new ol.layer.Vector({
  source: new ol.source.Vector({ 
    url: './capas/infraestructura.geojson', 
    format: new ol.format.GeoJSON() 
  }),
  title: "Servicios",
  visible: false,
  style: function(feature, resolution) {
    const attributeValue = feature.get('referencia'); 
    
    if (attributeValue && attributeValue.toLowerCase().includes('banco')) {

      const stylesToRender = [infraestructura_servicios_bancoStyle];

      // 2. Only generate and push the labelStyle if resolution is higher than 0.8
      if (resolution < 1) {
        const labelText = feature.get('referencia') || 'Servicios'; 

        const labelStyle = new ol.style.Style({
          text: new ol.style.Text({
            text: labelText,
            font: 'bold 12px Arial, sans-serif',
            fill: new ol.style.Fill({ color: '#ffffff' }), 
            stroke: new ol.style.Stroke({ color: '#17191a', width: 3 }), 
            overflow: true, 
            placement: 'point'
          }),
          geometry: function(feature) {
            const geom = feature.getGeometry();
            if (geom.getType() === 'Polygon') {
              return geom.getInteriorPoint(); 
            } else if (geom.getType() === 'MultiPolygon') {
              return geom.getInteriorPoints();
            }
            return geom;
          }
        });

        stylesToRender.push(labelStyle);
      }

      // 3. Return the array (will contain 1 or 2 styles depending on the resolution)
      return stylesToRender;

    } 
    
    
    else if (attributeValue && attributeValue.toLowerCase().includes('bar')) {

      const stylesToRender = [infraestructura_servicios_barStyle];

      // 2. Only generate and push the labelStyle if resolution is higher than 0.8
      if (resolution < 1) {
        const labelText = feature.get('referencia') || 'Servicios'; 

        const labelStyle = new ol.style.Style({
          text: new ol.style.Text({
            text: labelText,
            font: 'bold 12px Arial, sans-serif',
            fill: new ol.style.Fill({ color: '#ffffff' }), 
            stroke: new ol.style.Stroke({ color: '#17191a', width: 3 }), 
            overflow: true, 
            placement: 'point'
          }),
          geometry: function(feature) {
            const geom = feature.getGeometry();
            if (geom.getType() === 'Polygon') {
              return geom.getInteriorPoint(); 
            } else if (geom.getType() === 'MultiPolygon') {
              return geom.getInteriorPoints();
            }
            return geom;
          }
        });

        stylesToRender.push(labelStyle);
      }

      // 3. Return the array (will contain 1 or 2 styles depending on the resolution)
      return stylesToRender;

    } 
    

    else if (attributeValue && attributeValue.toLowerCase().includes('biblioteca')) {

      const stylesToRender = [infraestructura_servicios_biblioStyle];

      // 2. Only generate and push the labelStyle if resolution is higher than 0.8
      if (resolution < 1) {
        const labelText = feature.get('referencia') || 'Servicios'; 

        const labelStyle = new ol.style.Style({
          text: new ol.style.Text({
            text: labelText,
            font: 'bold 12px Arial, sans-serif',
            fill: new ol.style.Fill({ color: '#ffffff' }), 
            stroke: new ol.style.Stroke({ color: '#17191a', width: 3 }), 
            overflow: true, 
            placement: 'point'
          }),
          geometry: function(feature) {
            const geom = feature.getGeometry();
            if (geom.getType() === 'Polygon') {
              return geom.getInteriorPoint(); 
            } else if (geom.getType() === 'MultiPolygon') {
              return geom.getInteriorPoints();
            }
            return geom;
          }
        });

        stylesToRender.push(labelStyle);
      }

      // 3. Return the array (will contain 1 or 2 styles depending on the resolution)
      return stylesToRender;

    } 


    else if (attributeValue && attributeValue.toLowerCase().includes('médico')) {

      const stylesToRender = [infraestructura_servicios_medStyle];

      // 2. Only generate and push the labelStyle if resolution is higher than 0.8
      if (resolution < 1) {
        const labelText = feature.get('referencia') || 'Servicios'; 

        const labelStyle = new ol.style.Style({
          text: new ol.style.Text({
            text: labelText,
            font: 'bold 12px Arial, sans-serif',
            fill: new ol.style.Fill({ color: '#ffffff' }), 
            stroke: new ol.style.Stroke({ color: '#17191a', width: 3 }), 
            overflow: true, 
            placement: 'point'
          }),
          geometry: function(feature) {
            const geom = feature.getGeometry();
            if (geom.getType() === 'Polygon') {
              return geom.getInteriorPoint(); 
            } else if (geom.getType() === 'MultiPolygon') {
              return geom.getInteriorPoints();
            }
            return geom;
          }
        });

        stylesToRender.push(labelStyle);
      }

      // 3. Return the array (will contain 1 or 2 styles depending on the resolution)
      return stylesToRender;

    } 


    
    
    else {
      return null; 
    }
  }
});
*/



const infraestructura_banco = new ol.layer.Vector({
  source: new ol.source.Vector({ 
    url: './capas/infraestructura.geojson', 
    format: new ol.format.GeoJSON() 
  }),
  title: "Banco",
  visible: false,
  style: function(feature, resolution) {
    const attributeValue = feature.get('referencia'); 
    
    if (attributeValue && attributeValue.toLowerCase().includes('banco')) {

      const stylesToRender = [infraestructura_servicios_bancoStyle];

      // 2. Only generate and push the labelStyle if resolution is higher than 0.8
      if (resolution < 1) {
        const labelText = feature.get('referencia') || 'Servicios'; 

        const labelStyle = new ol.style.Style({
          text: new ol.style.Text({
            text: labelText,
            font: 'bold 12px Arial, sans-serif',
            fill: new ol.style.Fill({ color: '#ffffff' }), 
            stroke: new ol.style.Stroke({ color: '#17191a', width: 3 }), 
            overflow: true, 
            placement: 'point'
          }),
          geometry: function(feature) {
            const geom = feature.getGeometry();
            if (geom.getType() === 'Polygon') {
              return geom.getInteriorPoint(); 
            } else if (geom.getType() === 'MultiPolygon') {
              return geom.getInteriorPoints();
            }
            return geom;
          }
        });

        stylesToRender.push(labelStyle);
      }

      // 3. Return the array (will contain 1 or 2 styles depending on the resolution)
      return stylesToRender;

    } 

    else {
      return null; 
    }
  }
});

const infraestructura_bar = new ol.layer.Vector({
  source: new ol.source.Vector({ 
    url: './capas/infraestructura.geojson', 
    format: new ol.format.GeoJSON() 
  }),
  title: "Bar/Cafetería/Comedor",
  visible: false,
  style: function(feature, resolution) {
    const attributeValue = feature.get('referencia'); 
    
    if (attributeValue && attributeValue.toLowerCase().includes('bar')) {

      const stylesToRender = [infraestructura_servicios_barStyle];

      // 2. Only generate and push the labelStyle if resolution is higher than 0.8
      if (resolution < 1) {
        const labelText = feature.get('referencia') || 'Servicios'; 

        const labelStyle = new ol.style.Style({
          text: new ol.style.Text({
            text: labelText,
            font: 'bold 12px Arial, sans-serif',
            fill: new ol.style.Fill({ color: '#ffffff' }), 
            stroke: new ol.style.Stroke({ color: '#17191a', width: 3 }), 
            overflow: true, 
            placement: 'point'
          }),
          geometry: function(feature) {
            const geom = feature.getGeometry();
            if (geom.getType() === 'Polygon') {
              return geom.getInteriorPoint(); 
            } else if (geom.getType() === 'MultiPolygon') {
              return geom.getInteriorPoints();
            }
            return geom;
          }
        });

        stylesToRender.push(labelStyle);
      }

      // 3. Return the array (will contain 1 or 2 styles depending on the resolution)
      return stylesToRender;

    } 
    

    
    
    else {
      return null; 
    }
  }
});

const infraestructura_biblio = new ol.layer.Vector({
  source: new ol.source.Vector({ 
    url: './capas/infraestructura.geojson', 
    format: new ol.format.GeoJSON() 
  }),
  title: "Biblioteca",
  visible: false,
  style: function(feature, resolution) {
    const attributeValue = feature.get('referencia'); 
    

    if (attributeValue && attributeValue.toLowerCase().includes('biblioteca')) {

      const stylesToRender = [infraestructura_servicios_biblioStyle];

      // 2. Only generate and push the labelStyle if resolution is higher than 0.8
      if (resolution < 1) {
        const labelText = feature.get('referencia') || 'Servicios'; 

        const labelStyle = new ol.style.Style({
          text: new ol.style.Text({
            text: labelText,
            font: 'bold 12px Arial, sans-serif',
            fill: new ol.style.Fill({ color: '#ffffff' }), 
            stroke: new ol.style.Stroke({ color: '#17191a', width: 3 }), 
            overflow: true, 
            placement: 'point'
          }),
          geometry: function(feature) {
            const geom = feature.getGeometry();
            if (geom.getType() === 'Polygon') {
              return geom.getInteriorPoint(); 
            } else if (geom.getType() === 'MultiPolygon') {
              return geom.getInteriorPoints();
            }
            return geom;
          }
        });

        stylesToRender.push(labelStyle);
      }

      // 3. Return the array (will contain 1 or 2 styles depending on the resolution)
      return stylesToRender;

    } 




    
    
    else {
      return null; 
    }
  }
});

const infraestructura_med = new ol.layer.Vector({
  source: new ol.source.Vector({ 
    url: './capas/infraestructura.geojson', 
    format: new ol.format.GeoJSON() 
  }),
  title: "Dispensario Médico",
  visible: false,
  style: function(feature, resolution) {
    const attributeValue = feature.get('referencia'); 
    

    if (attributeValue && attributeValue.toLowerCase().includes('médico')) {

      const stylesToRender = [infraestructura_servicios_medStyle];

      // 2. Only generate and push the labelStyle if resolution is higher than 0.8
      if (resolution < 1) {
        const labelText = feature.get('referencia') || 'Servicios'; 

        const labelStyle = new ol.style.Style({
          text: new ol.style.Text({
            text: labelText,
            font: 'bold 12px Arial, sans-serif',
            fill: new ol.style.Fill({ color: '#ffffff' }), 
            stroke: new ol.style.Stroke({ color: '#17191a', width: 3 }), 
            overflow: true, 
            placement: 'point'
          }),
          geometry: function(feature) {
            const geom = feature.getGeometry();
            if (geom.getType() === 'Polygon') {
              return geom.getInteriorPoint(); 
            } else if (geom.getType() === 'MultiPolygon') {
              return geom.getInteriorPoints();
            }
            return geom;
          }
        });

        stylesToRender.push(labelStyle);
      }

      // 3. Return the array (will contain 1 or 2 styles depending on the resolution)
      return stylesToRender;

    } 


    
    
    else {
      return null; 
    }
  }
});

const infraestructura_puentes = new ol.layer.Vector({
  source: new ol.source.Vector({ 
    url: './capas/infraestructura.geojson', 
    format: new ol.format.GeoJSON() 
  }),
  title: "Puentes",
  visible: false,
  style: function(feature, resolution) {
    const attributeValue = feature.get('zonas'); 
    

    if (attributeValue && attributeValue.toLowerCase().includes('puentes')) {

      const stylesToRender = [infraestructuraStyle];

      // 2. Only generate and push the labelStyle if resolution is higher than 0.8
      if (resolution < 1) {
        const labelText = feature.get('referencia') || 'Servicios'; 

        const labelStyle = new ol.style.Style({
          text: new ol.style.Text({
            text: labelText,
            font: 'bold 12px Arial, sans-serif',
            fill: new ol.style.Fill({ color: '#ffffff' }), 
            stroke: new ol.style.Stroke({ color: '#17191a', width: 3 }), 
            overflow: true, 
            placement: 'point'
          }),
          geometry: function(feature) {
            const geom = feature.getGeometry();
            if (geom.getType() === 'Polygon') {
              return geom.getInteriorPoint(); 
            } else if (geom.getType() === 'MultiPolygon') {
              return geom.getInteriorPoints();
            }
            return geom;
          }
        });

        stylesToRender.push(labelStyle);
      }

      // 3. Return the array (will contain 1 or 2 styles depending on the resolution)
      return stylesToRender;

    } 


    
    
    else {
      return null; 
    }
  }
});



const infraestructura_polig = new ol.layer.Vector({
  source: new ol.source.Vector({ 
    url: './capas/infraestructura.geojson', 
    format: new ol.format.GeoJSON() 
  }),
  visible: false,
  style: function(feature, resolution) {
    const attributeValue = feature.get('referencia'); 
    
      const stylesToRender = [infraestructuraStyle];

      // 2. Only generate and push the labelStyle if resolution is higher than 0.8
      if (resolution < 1) {
        const labelText = feature.get('referencia') || 'Auditorio'; 

        const labelStyle = new ol.style.Style({
          text: new ol.style.Text({
            text: labelText,
            font: 'bold 12px Arial, sans-serif',
            fill: new ol.style.Fill({ color: '#ffffff' }), 
            stroke: new ol.style.Stroke({ color: '#17191a', width: 3 }), 
            overflow: true, 
            placement: 'point'
          }),
          geometry: function(feature) {
            const geom = feature.getGeometry();
            if (geom.getType() === 'Polygon') {
              return geom.getInteriorPoint(); 
            } else if (geom.getType() === 'MultiPolygon') {
              return geom.getInteriorPoints();
            }
            return geom;
          }
        });

        stylesToRender.push(labelStyle);
      

      // 3. Return the array (will contain 1 or 2 styles depending on the resolution)
      return stylesToRender;

    } else {
      return null; 
    }
  }
});

const acceso_peatonal = new ol.layer.Vector({
  source: new ol.source.Vector({ 
    url: './capas/infraestructura_acceso.geojson', 
    format: new ol.format.GeoJSON() 
  }),
  title: "Acceso peatonal",
  visible: false,
  style: function(feature) {
    const attributeValue = feature.get('acceso'); 

    if (attributeValue && attributeValue.toLowerCase().includes('peatonal')) {
      return acceso_peatonalStyle
    } else {
      return null; 
    }
    }
});

const acceso_vehicular = new ol.layer.Vector({
  source: new ol.source.Vector({ 
    url: './capas/infraestructura_acceso.geojson', 
    format: new ol.format.GeoJSON() 
  }),
  title: "Acceso vehicular",
  visible: false,
  style: function(feature) {
    const attributeValue = feature.get('acceso'); 

    if (attributeValue && attributeValue.toLowerCase().includes('vehicular')) {
      return acceso_vehicularStyle
    } else {
      return null; 
    }
    }
});


const infraestructura = new ol.layer.Group({
  title: 'Infraestructura existente',
  layers: [infraestructura_puentes, acceso_peatonal, /*infraestructura_servicios*/
    infraestructura_med, infraestructura_biblio, infraestructura_bar, infraestructura_banco, infraestructura_deportes, infraestructura_auditorio, /*infraestructura_polig*/],
  fold: 'close',
});



// FIBRA OPTICA
// Fibra optica 1 (124 polilineas)
// Fibra optica 2 (10 elementos) están desfasadas las coordenadas en Civil 3D
const fibra_canalStyle = new ol.style.Style({
  stroke: new ol.style.Stroke({ 
    color: '#0832a7', 
    width: 3
  })
});

const fibra_opticaStyle = new ol.style.Style({
  stroke: new ol.style.Stroke({ 
    color: '#32ebe1', 
    width: 3
  })
});

const fibra_optica1 = new ol.layer.Vector({
  source: new ol.source.Vector({ 
    url: './capas/fibra_optica1.geojson', 
    format: new ol.format.GeoJSON() 
  }),
  title: "<b>Fibra Óptica</b>",
  visible: false,
  style: function(feature) {
    const attributeValue = feature.get('Color'); 

    if (attributeValue && attributeValue.toLowerCase().includes('blue')) {
      return fibra_canalStyle
    } 
    else if (attributeValue && attributeValue.toLowerCase().includes('122')) {
      return fibra_opticaStyle
    } 
    else {
      return null; 
    }
    }
});

const fibra_optica2 = new ol.layer.Vector({
  source: new ol.source.Vector({ 
    url: './capas/fibra_optica2.geojson', 
    format: new ol.format.GeoJSON() 
  }),
  //title: "<b>Fibra Óptica2</b>",
  visible: false,
  style: fibra_opticaStyle
});


fibra_optica1.on('change:visible', () => {
  const isVisible = fibra_optica1.getVisible();
  fibra_optica2.setVisible(isVisible);
});







// SONDEO GEOTECNICO
const sondeoStyle = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgb(224, 127, 0)'  
  }),
  stroke: new ol.style.Stroke({ 
    color: '#17191a', 
    width: 2 
  })
});

const sondeo = new ol.layer.Vector({
  source: new ol.source.Vector({ 
    url: './capas/sondeo.geojson', 
    format: new ol.format.GeoJSON() 
  }),
  title: "<b>Sondeo Geotécnico</b>",
  visible: false,
  style: function(feature, resolution) {
    const attributeValue = feature.get('Layer'); 
    

    if (attributeValue && attributeValue.toLowerCase().includes('')) {

      // 1. Clone the geometry so we don't alter the source file data coordinates
      const scaledGeometry = feature.getGeometry().clone();
      
      // 2. Scale the geometry up. Change 1.5 to whatever multiplier you want 
      // (e.g., 2.0 doubles the size, 0.5 cuts it in half)
      scaledGeometry.scale(3); 
      
      // 3. Assign this new scaled geometry explicitly to your base style
      // (Assuming sondeoStyle is your ol.style.Style variable declared outside)
      sondeoStyle.setGeometry(scaledGeometry);

      const stylesToRender = [sondeoStyle];

      // 2. Only generate and push the labelStyle if resolution is higher than 0.8
      if (resolution < 1.6) {
        const labelText = feature.get('Layer') || ''; 

        const labelStyle = new ol.style.Style({
          text: new ol.style.Text({
            text: labelText,
            font: 'bold 12px Arial, sans-serif',
            fill: new ol.style.Fill({ color: '#ffffff' }), 
            stroke: new ol.style.Stroke({ color: '#17191a', width: 3 }), 
            overflow: true, 
            placement: 'point'
          }),
          geometry: function(feature) {
            const geom = feature.getGeometry();
            if (geom.getType() === 'Polygon') {
              return geom.getInteriorPoint(); 
            } else if (geom.getType() === 'MultiPolygon') {
              return geom.getInteriorPoints();
            }
            return geom;
          }
        });

        stylesToRender.push(labelStyle);
      }

      // 3. Return the array (will contain 1 or 2 styles depending on the resolution)
      return stylesToRender;

    } 
    }
});


const map = new ol.Map(
    {   
        target: "map",
        layers: [
            basemap,
            lindero,
            sondeo,
            fibra_optica2,
            fibra_optica1,
            infraestructura,
            curvas_nivel,
            curvas_texto,
            valvulas_aapp,
            //camaras,
            valvulas_aire,
            valvulas,
            aass,
            aass_camaras,
            //aapp,
            //aapp_camaras,
            aall,
            pt,
            puntos_pt,
            senderos,
            bosques_contorno,
            bosques,
            ciclovia_proyectada,
            ciclovia_existente,
            parqueos,
            parqueos_texto,
            vias,
            arriendos,
            puntos_arriendos,
            comodatos,
            puntos_comodatos,
            zonas,
            zonas_puntos,
            poligonos, // edificaciones
            puntos,
        ], 
        view: new ol.View({
            center: new ol.proj.fromLonLat([-79.964506 , -2.148383]),
            zoom: 16
        })
    }
);

//map.addLayer(lindero);
// enero pasa con factura, febrero con ahorros; enero sin trabajar, febrero ya debería 


const layerSwitcher = new ol.control.LayerSwitcher(
{
  startActive: true,
  activationMode: 'click',
  //groupSelectStyle: 'none'  
}
);

map.addControl(layerSwitcher);


// Para evitar que los layers se activen al hacer click en los labels
document.querySelectorAll('.layer-switcher label').forEach(label => {
  label.addEventListener('click', function(e) {
    if (e.target.tagName !== 'INPUT') {
      e.preventDefault();    
      e.stopPropagation();   
    }
  });
});



// Para cambiar el mouse solamente cuando se mueve
map.on('pointermove', function (evt) {
  var viewPort = map.getViewport();

  if (evt.dragging) {
    // Estilo que se muestra al mover
    viewPort.style.cursor = 'all-scroll'; 
  } else {
    
    viewPort.style.cursor = ''; 
  }
});

// Resetea el mouse cuando se deja de mover
map.on('pointerup', function () {
  map.getViewport().style.cursor = '';
});


var overlay = new ol.Overlay({
  element: document.getElementById('popup'),
  autoPan: true
});

// Añadir overlay
map.addOverlay(overlay);

// Añadir el botón de closer
document.getElementById('popup-closer').onclick = function() {
  overlay.setPosition(undefined);
  return false;
};



// Para mostrar información al hacer click en poligonos
/*
map.on('singleclick', function (evt) {

  // 1. Evita que aparezca el popup si la capa principal está desactivada
  if (!poligonos.getVisible()) {
    overlay.setPosition(undefined); 
    return; 
  }

  // 2. Buscar el elemento vector directamente en el pixel del click
  var feature = map.forEachFeatureAtPixel(evt.pixel, function (clickedFeature, layer) {
    // Asegura que solo lea elementos de tu capa polig_espol_
    if (layer === poligonos) {
      return clickedFeature;
    }
  });

  // 3. Si encontramos un polígono válido bajo el cursor
  if (feature) {
    // Con GeoJSON local, extraes las columnas usando .getProperties()
    var props = feature.getProperties(); 
    
    // Muestra todas las columnas disponibles en la consola (F12)
    console.log("Polygon data found: ", props);
    
    // 4. Construir la tabla con HTML utilizando los nombres de tus campos GeoJSON
    // NOTA: Asegúrate de que las propiedades coincidan exactamente (ej. 'área_total_construcción' o 'area_total')
    var htmlContent = 
    '<table class="popup-table">' + 
    '<tr>'
    + '<td><strong>Ref.</strong></td>' + '<td>'+ (props.referencia_inmueble || 'N/A') + '</td>' + 
    '</tr>' +
    '<tr>'
    + '<td><strong>Área (m2)</strong></td>' + '<td>'+ (props.área_total_construcción || 'N/A') + '</td>' +
    '</tr>' +
    '</table>';
    
    document.getElementById('popup-content').innerHTML = htmlContent;
    overlay.setPosition(evt.coordinate);
    
  } else {
    // Esconder popup al hacer click en espacio vacío
    overlay.setPosition(undefined);
  }
});
*/

/*
map.on('singleclick', function (evt) {

  // Evita que aparezca el popup si la capa está descactivada
  if (!poligonos.getVisible()) {
    overlay.setPosition(undefined); 
    return; 
  }

  var viewResolution = map.getView().getResolution();
  var viewProjection = map.getView().getProjection();
  
  // Colocar url dinámica
  var url = poligonos.getSource().getFeatureInfoUrl(
    evt.coordinate,
    viewResolution,
    viewProjection,
    {
      'INFO_FORMAT': 'application/json',
      'FEATURE_COUNT': '1',
      // Para que GeoServer solo observe la tabla polígonos:
      'QUERY_LAYERS': 'gis_espol:pg_polig_espol' 
    }
  );

  
  if (url) {
    fetch(url)
      .then(function (response) { return response.json(); })
      .then(function (data) {
        // Chequea si se realizó la intersección del polígono
        if (data.features && data.features.length > 0) {
          
          // GeoServer coloca las columnas de la tabla PostgreSQL dentro de features[0].properties
          var props = data.features[0].properties; 
          
          // Colocar todas las columnas disponibles en consola F12
          console.log("Polygon data found: ", props);
          
          // Contruir la tabla con HTML
          var htmlContent = 
          '<table class="popup-table">' + 
          '<tr>'
          + '<td><strong>Ref.</strong></td>' + '<td>'+ (props.referencia_inmueble || 'N/A') + '</td>' + 
          '</tr>' +
          '<tr>'
          + '<td><strong>Área (m2)</strong></td>' + '<td>'+ (props.área_total_construcción || 'N/A') + '</td>' +
          '</tr>' +
          '</table>'
          ;
          
          document.getElementById('popup-content').innerHTML = htmlContent;
          overlay.setPosition(evt.coordinate);
        } else {
          // Esconder popup al hacer click en espacío vacío
          overlay.setPosition(undefined);
        }
      })
      .catch(function (error) {
        console.error('Error fetching data from GeoServer:', error);
      });
  }
});
*/



/*
// Para mostrar información al hacer click en polig_espol
map.on('singleclick', function (evt) {

  // 1. Evita que aparezca el popup si la capa principal está desactivada
  if (!polig_espol.getVisible()) {
    overlay.setPosition(undefined); 
    return; 
  }

  // 2. Buscar el elemento vector directamente en el pixel del click
  var feature = map.forEachFeatureAtPixel(evt.pixel, function (clickedFeature) {
    return clickedFeature;
  }, {
    layerFilter: function (layer) {
      return layer === polig_espol; // Reemplaza esto con la variable de cada capa en sus respectivos archivos
    }
  });

  

  // 3. Si encontramos un polígono válido bajo el cursor
  if (feature) {
    // Con GeoJSON local, extraes las columnas usando .getProperties()
    var props = feature.getProperties(); 
    
    // Muestra todas las columnas disponibles en la consola (F12)
    console.log("Polygon data found: ", props);
    
    // 4. Construir la tabla con HTML utilizando los nombres de tus campos GeoJSON
    // NOTA: Asegúrate de que las propiedades coincidan exactamente (ej. 'área_total_construcción' o 'area_total')
    var htmlContent = 
    '<table class="popup-table">' + 
    '<tr>'
    + '<td><strong>Ref.</strong></td>' + '<td>'+ (props.referencia_inmueble || 'N/A') + '</td>' + 
    '</tr>' +
    '<tr>'
    + '<td><strong>Área (m2)</strong></td>' + '<td>'+ (props.área_total_construcción || 'N/A') + '</td>' +
    '</tr>' +
    '</table>';
    
    document.getElementById('popup-content').innerHTML = htmlContent;
    overlay.setPosition(evt.coordinate);
    
  } else {
    // Esconder popup al hacer click en espacio vacío
    if (!map.hasFeatureAtPixel(evt.pixel)) {
    overlay.setPosition(undefined);
  }
  }
});


// Para mostrar información al hacer click en polig_comodato
map.on('singleclick', function (evt) {

  // 1. Evita que aparezca el popup si la capa principal está desactivada
  if (!polig_comodato.getVisible()) {
    overlay.setPosition(undefined); 
    return; 
  }

  // 2. Buscar el elemento vector directamente en el pixel del click
  var feature = map.forEachFeatureAtPixel(evt.pixel, function (clickedFeature, layer) {
    // Asegura que solo lea elementos de tu capa polig_espol_
    if (layer === polig_comodato) {
      return clickedFeature;
    }
  });

  // 3. Si encontramos un polígono válido bajo el cursor
  if (feature) {
    // Con GeoJSON local, extraes las columnas usando .getProperties()
    var props = feature.getProperties(); 
    
    // Muestra todas las columnas disponibles en la consola (F12)
    console.log("Polygon data found: ", props);
    
    // 4. Construir la tabla con HTML utilizando los nombres de tus campos GeoJSON
    // NOTA: Asegúrate de que las propiedades coincidan exactamente (ej. 'área_total_construcción' o 'area_total')
    var htmlContent = 
    '<table class="popup-table">' + 
    '<tr>'
    + '<td><strong>Ref.</strong></td>' + '<td>'+ (props.referencia_inmueble || 'N/A') + '</td>' + 
    '</tr>' +
    '<tr>'
    + '<td><strong>Área (m2)</strong></td>' + '<td>'+ (props.área_total_construcción || 'N/A') + '</td>' +
    '</tr>' +
    '</table>';
    
    document.getElementById('popup-content').innerHTML = htmlContent;
    overlay.setPosition(evt.coordinate);
    
  } else {
    // Esconder popup al hacer click en espacio vacío
    overlay.setPosition(undefined);
  }
});



// Para mostrar información al hacer click en polig_arriendo
map.on('singleclick', function (evt) {

  // 1. Evita que aparezca el popup si la capa principal está desactivada
  if (!polig_arriendo.getVisible()) {
    overlay.setPosition(undefined); 
    return; 
  }

  // 2. Buscar el elemento vector directamente en el pixel del click
  var feature = map.forEachFeatureAtPixel(evt.pixel, function (clickedFeature) {
    return clickedFeature;
  }, {
    layerFilter: function (layer) {
      return layer === polig_arriendo; // Reemplaza esto con la variable de cada capa en sus respectivos archivos
    }
  });


  // 3. Si encontramos un polígono válido bajo el cursor
  if (feature) {
    // Con GeoJSON local, extraes las columnas usando .getProperties()
    var props = feature.getProperties(); 
    
    // Muestra todas las columnas disponibles en la consola (F12)
    console.log("Polygon data found: ", props);
    
    // 4. Construir la tabla con HTML utilizando los nombres de tus campos GeoJSON
    // NOTA: Asegúrate de que las propiedades coincidan exactamente (ej. 'área_total_construcción' o 'area_total')
    var htmlContent = 
    '<table class="popup-table">' + 
    '<tr>'
    + '<td><strong>Ref.</strong></td>' + '<td>'+ (props.referencia_inmueble || 'N/A') + '</td>' + 
    '</tr>' +
    '<tr>'
    + '<td><strong>Área (m2)</strong></td>' + '<td>'+ (props.área_total_construcción || 'N/A') + '</td>' +
    '</tr>' +
    '</table>';
    
    document.getElementById('popup-content').innerHTML = htmlContent;
    overlay.setPosition(evt.coordinate);
    
  } else {
    // Esconder popup al hacer click en espacio vacío
    if (!map.hasFeatureAtPixel(evt.pixel)) {
    overlay.setPosition(undefined);
  }
  }
});
*/



// CODIGO A UTILIZAR PARA LAS TABLAS
// Para mostrar tabla de información al hacer click en capas

map.on('singleclick', function (evt) {
  
  var clickedFeature = null;
  var clickedLayer = null;

  // 1. Buscamos el elemento y guardamos a qué capa pertenece
  map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
    clickedFeature = feature;
    clickedLayer = layer;
    return true; // Se detiene al encontrar la capa más alta
  });

  // 2. Si se hizo click en el vacío, escondemos el popup y salimos
  if (!clickedFeature || !clickedLayer) {
    overlay.setPosition(undefined);
    return;
  }

  // Si la capa que tocamos no está visible, no hacemos nada
  if (!clickedLayer.getVisible()) {
    overlay.setPosition(undefined);
    return;
  }

  var props = clickedFeature.getProperties();
  console.log("Polygon data found on layer: ", props);

  var htmlContent = '<table class="popup-table">';

  // 3. FILTRAMOS EL CONTENIDO DEPENDIENDO DE QUÉ CAPA SE HIZO CLICK
  
  // --- CASO 1: CAPA ESPOL (La que editaste) ---
  if (clickedLayer === polig_espol) {
    htmlContent += 
    '<tr><td><strong>Ref.</strong></td><td>'+ (props.referencia_inmueble || 'N/A') + '</td></tr>' +
    '<tr><td><strong>Área (m2)</strong></td><td>'+ (props.área_total_construcción || 'N/A') + '</td></tr>';
  } 
  
  // --- CASO 2: TU SEGUNDA CAPA (Reemplaza 'capa_dos' con tu variable real) ---
  else if (typeof polig_comodato !== 'undefined' && clickedLayer === polig_comodato) {
    htmlContent += 
    '<tr><td><strong>Ref.</strong></td><td>'+ (props.referencia_inmueble || 'N/A') + '</td></tr>' +
    '<tr><td><strong>Área (m2)</strong></td><td>'+ (props.área_total_construcción || 'N/A') + '</td></tr>';
  }

  else if (typeof polig_arriendo !== 'undefined' && clickedLayer === polig_arriendo) {
    htmlContent += 
    '<tr><td><strong>Ref.</strong></td><td>'+ (props.referencia_inmueble || 'N/A') + '</td></tr>' +
    '<tr><td><strong>Área (m2)</strong></td><td>'+ (props.área_total_construcción || 'N/A') + '</td></tr>';
  }

  else if (typeof poligonos !== 'undefined' && clickedLayer === poligonos) {
    htmlContent += 
    '<tr><td><strong>Ref.</strong></td><td>'+ (props.referencia_inmueble || 'N/A') + '</td></tr>' +
    '<tr><td><strong>Área (m2)</strong></td><td>'+ (props.área_total_construcción || 'N/A') + '</td></tr>';
  }

  else if (typeof valvulas_aire !== 'undefined' && clickedLayer === valvulas_aire) {
    htmlContent += 
    '<tr><td><strong>Ubicación</strong></td><td>'+ (props.UBICACION || 'N/A') + '</td></tr>' +
    '<tr><td><strong>Cámara</strong></td><td>'+ (props.CAMARA || 'N/A') + '</td></tr>' +
    '<tr><td><strong>Diámetro</strong></td><td>'+ (props.DIAMETRO || 'N/A') + '</td></tr>' +
    '<tr><td><strong>Tipo Válvula</strong></td><td>'+ (props.TIPO_VALV || 'N/A') + '</td></tr>' +
    '<tr><td><strong>Marca</strong></td><td>'+ (props.MARCA || 'N/A') + '</td></tr>';
  }

  else if (typeof valvulas !== 'undefined' && clickedLayer === valvulas) {
    htmlContent += 
    '<tr><td><strong>Ubicación</strong></td><td>'+ (props.UBICACION || 'N/A') + '</td></tr>' +
    '<tr><td><strong>Cámara</strong></td><td>'+ (props.CAMARA || 'N/A') + '</td></tr>' +
    '<tr><td><strong>Diámetro</strong></td><td>'+ (props.DIAMETRO || 'N/A') + '</td></tr>' +
    '<tr><td><strong>Tipo Válvula</strong></td><td>'+ (props.TIPO_VALV || 'N/A') + '</td></tr>' +
    '<tr><td><strong>Marca</strong></td><td>'+ (props.MARCA || 'N/A') + '</td></tr>';
  }


  // --- CASO 3: CUALQUIER OTRA CAPA (Automatizada para que nunca falle) ---
  else {
    /*for (var key in props) {
      if (key !== 'geometry' && key !== 'boundedBy' && props.hasOwnProperty(key)) {
        htmlContent += '<tr><td><strong>' + key + '</strong></td><td>' + (props[key] || 'N/A') + '</td></tr>';
      }
    }*/
  }

  htmlContent += '</table>';

  // 4. INYECTAMOS EL CONTENIDO Y POSICIONAMOS EN EL CLICK EXACTO
  document.getElementById('popup-content').innerHTML = htmlContent;
  overlay.setPosition(evt.coordinate); // Mantiene tu posición de click original exacta
});





// TABLA PARA COMODATOS
const popupElement = document.createElement('div');
popupElement.id = 'comodato-map-control';
popupElement.className = 'ol-unselectable ol-control'; 
popupElement.style.position = 'absolute';
popupElement.style.bottom = '10px';       
popupElement.style.left = '20px';         
popupElement.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
popupElement.style.border = '1px solid #ccc';
popupElement.style.borderRadius = '4px';
popupElement.style.padding = '12px';
popupElement.style.boxShadow = '0 1px 4px rgba(0,0,0,0.2)';
popupElement.style.maxWidth = '450px';
popupElement.style.zIndex = '1000';
popupElement.style.display = 'none';      

const comodatoTableControl = new ol.control.Control({ element: popupElement });
map.addControl(comodatoTableControl);

// 2. SEPARATED FUNCTION: This builds and displays the table safely
function updateComodatoTable() {
  const source = comodatos.getSource();
  const features = source.getFeatures(); 
  
  if (features.length === 0) {
    popupElement.innerHTML = `<div style="font-size:12px; color:#666; padding:10px;">Cargando datos...</div>`;
    popupElement.style.display = 'block';
    return;
  }

  // PARA ORDENAR TABLA ALFABETICAMENTE
  features.sort((featureA, featureB) => {
    // Extract the 'ref' strings safely
    const refA = featureA.get('ref') ? String(featureA.get('ref')) : '';
    const refB = featureB.get('ref') ? String(featureB.get('ref')) : '';
    
    // localeCompare handles alphabetical sorting perfectly (including casing and accents)
    return refA.localeCompare(refB);
  });


  let tableRowsHTML = '';
  
  features.forEach((feature, index) => {   // index para hacer click
    const props = feature.getProperties(); 
    
    // 1. EXTRAE EL PROPIETARIO PARA VALIDACIÓN (Maneja nulos de forma segura)
    const ref = props.ref ? String(props.ref).toLowerCase() : '';

    // 2. FILTRO CRUCIAL: Solo procesa el polígono si el campo contiene la palabra 'comodato'
    if (ref.includes('')) {
      
      const refActual = props.ref || 'N/A'; //hacer click en refActual para mostrar en el mapa
      const codigoActual = props.cod_act || 'N/A';
      const codigoAnterior = props.cod_ant || 'N/A';
      const zona = props.zona !== undefined && props.zona !== null ? props.zona : 'N/A';
      const fecha_venc = props.fecha_venc || 'N/A';

      // feature.getId PARA EL INDEX
      if (!feature.getId()) {
      feature.setId('comodato-' + index);
    }

      const featureId = feature.getId();
      
      tableRowsHTML += `
        <tr>
          <td style="padding: 6px; border: 1px solid #ddd;">
          <span class="zoom-to-feature" data-id="${featureId}" style="color: #141516; text-decoration: underline; cursor: pointer; font-weight: bold;">
            ${refActual}</span></td>
          <td style="padding: 6px; border: 1px solid #ddd;">${codigoActual}</td>
          <td style="padding: 6px; border: 1px solid #ddd;">${codigoAnterior}</td>
          <td style="padding: 6px; border: 1px solid #ddd; text-align: center;">${zona}</td>
          <td style="padding: 6px; border: 1px solid #ddd; text-align: center;">${fecha_venc}</td>
        </tr>
      `;
    }
  });

  // 3. MENSAJE DE FALLBACK: Si ningún polígono coincide con el criterio
  if (tableRowsHTML === '') {
    tableRowsHTML = `<tr><td colspan="3" style="padding: 10px; text-align: center; color: #888;">No se encontraron comodatos activos</td></tr>`;
  }
  // USAR max-height PARA CAMBIAR ALTURA DE LA TABLA
  popupElement.innerHTML = `
    <h4 style="margin: 0 0 8px 0; color:#0064c8; font-size:14px; border-bottom: 1px solid #0064c8; padding-bottom: 4px;">
      Comodatos
    </h4>
    <div style="max-height: 150px; overflow-y: auto;">
      <table style="border-collapse: collapse; text-align: left; width: 100%; font-size: 14px;">
        <tr style="background-color: #f8f9fa; border-bottom: 1px solid #aaa;">
          <th style="padding: 6px; border: 1px solid #ddd;">Referencia</th>
          <th style="padding: 6px; border: 1px solid #ddd;">Cód. Actual</th>
          <th style="padding: 6px; border: 1px solid #ddd;">Cód. Ant.</th>
          <th style="padding: 6px; border: 1px solid #ddd; text-align: center;">Zona</th>
          <th style="padding: 6px; border: 1px solid #ddd; text-align: center;">F.V.</th>
        </tr>
        ${tableRowsHTML}
      </table>
    </div>
  `;
  
  popupElement.style.display = 'block';
}

// 3. LISTEN TO INITIAL VISIBILITY TOGGLE
comodatos.on('change:visible', () => {
  if (comodatos.getVisible()) {
    updateComodatoTable(); // Attempts to run immediately
  } else {
    popupElement.style.display = 'none'; // Hides instantly when unchecked
  }
});

// 4. THE CRUCIAL FIX: If data arrives AFTER the user clicks, update the table instantly
comodatos.getSource().on('featuresloadend', () => {
  // Only update the table if the user currently wants to see the layer
  if (comodatos.getVisible()) {
    updateComodatoTable();
  }
});



// PARA HACER CLICK EN TABLA Y MOSTRAR EN EL MAPA EL ELEMENTO
popupElement.addEventListener('click', function(event) {
  // Check if the clicked element has our specific zoom class template
  if (event.target.classList.contains('zoom-to-feature')) {
    const featureId = event.target.getAttribute('data-id');
    const source = comodatos.getSource();
    
    // Find the original map feature by its unique internal string identification key
    const targetFeature = source.getFeatureById(featureId);
    
    if (targetFeature) {
      const geometry = targetFeature.getGeometry();
      const view = map.getView();
      
      if (geometry) {
        // Fit the map viewport cleanly around the polygon boundaries
        view.fit(geometry.getExtent(), {
          size: map.getSize(),
          duration: 1000, // Smooth 1-second zoom animation transition effect
          maxZoom: 18     // Prevents zooming in too close on tiny polygon structures
        });
      }
    }
  }
});





// TABLA PARA ARRIENDOS
const popupElement_arriendo = document.createElement('div');
popupElement_arriendo.id = 'arriendo-map-control';
popupElement_arriendo.className = 'ol-unselectable ol-control'; 
popupElement_arriendo.style.position = 'absolute';
popupElement_arriendo.style.bottom = '10px';       
popupElement_arriendo.style.left = '20px';         
popupElement_arriendo.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
popupElement_arriendo.style.border = '1px solid #ccc';
popupElement_arriendo.style.borderRadius = '4px';
popupElement_arriendo.style.padding = '12px';
popupElement_arriendo.style.boxShadow = '0 1px 4px rgba(0,0,0,0.2)';
popupElement_arriendo.style.maxWidth = '450px';
popupElement_arriendo.style.zIndex = '1000';
popupElement_arriendo.style.display = 'none';      

const arriendoTableControl = new ol.control.Control({ element: popupElement_arriendo });
map.addControl(arriendoTableControl);

// 2. SEPARATED FUNCTION: This builds and displays the table safely
function updateArriendoTable() {
  const source = arriendos.getSource();
  const features = source.getFeatures(); 
  
  if (features.length === 0) {
    popupElement_arriendo.innerHTML = `<div style="font-size:12px; color:#666; padding:10px;">Cargando datos...</div>`;
    popupElement_arriendo.style.display = 'block';
    return;
  }



  // PARA ORDENAR TABLA ALFABETICAMENTE
  features.sort((featureA, featureB) => {
    // Extract the 'ref' strings safely
    const refA = featureA.get('ref') ? String(featureA.get('ref')) : '';
    const refB = featureB.get('ref') ? String(featureB.get('ref')) : '';
    
    // localeCompare handles alphabetical sorting perfectly (including casing and accents)
    return refA.localeCompare(refB);
  });
  

  let tableRowsHTML = '';
  
  features.forEach((feature, index) => { // index para hacer click
    const props = feature.getProperties(); 
    
    // 1. EXTRAE EL PROPIETARIO PARA VALIDACIÓN (Maneja nulos de forma segura)
    const ref = props.ref ? String(props.ref).toLowerCase() : '';

    // 2. FILTRO CRUCIAL: Solo procesa el polígono si el campo contiene la palabra 'arriendo'
    if (ref.includes('')) {
      
      const refActual = props.ref || 'N/A';
      const codigoActual = props.cod_act || 'N/A';
      const codigoAnterior = props.cod_ant || 'N/A';
      const zona = props.zona !== undefined && props.zona !== null ? props.zona : 'N/A';
      const fecha_venc = props.fecha_venc || 'N/A';

      // feature.getId PARA EL INDEX
      if (!feature.getId()) {
      feature.setId('arriendo-' + index);
    }

      const featureId = feature.getId();
      
      tableRowsHTML += `
        <tr>
          <td style="padding: 6px; border: 1px solid #ddd;">
          <span class="zoom-to-feature" data-id="${featureId}" style="color: #141516; text-decoration: underline; cursor: pointer; font-weight: bold;">
          ${refActual}</span></td>
          <td style="padding: 6px; border: 1px solid #ddd;">${codigoActual}</td>
          <td style="padding: 6px; border: 1px solid #ddd;">${codigoAnterior}</td>
          <td style="padding: 6px; border: 1px solid #ddd; text-align: center;">${zona}</td>
          <td style="padding: 6px; border: 1px solid #ddd; text-align: center;">${fecha_venc}</td>
        </tr>
      `;
    }
  });

  // 3. MENSAJE DE FALLBACK: Si ningún polígono coincide con el criterio
  if (tableRowsHTML === '') {
    tableRowsHTML = `<tr><td colspan="3" style="padding: 10px; text-align: center; color: #888;">No se encontraron arriendos activos</td></tr>`;
  }
  // USAR max-height PARA CAMBIAR ALTURA DE LA TABLA
  popupElement_arriendo.innerHTML = `
    <h4 style="margin: 0 0 8px 0; color:#0064c8; font-size:14px; border-bottom: 1px solid #0064c8; padding-bottom: 4px;">
      Arriendos
    </h4>
    <div style="max-height: 150px; overflow-y: auto;"> 
      <table style="border-collapse: collapse; text-align: left; width: 100%; font-size: 14px;">
        <tr style="background-color: #f8f9fa; border-bottom: 1px solid #aaa;">
          <th style="padding: 6px; border: 1px solid #ddd;">Referencia</th>
          <th style="padding: 6px; border: 1px solid #ddd;">Cód. Actual</th>
          <th style="padding: 6px; border: 1px solid #ddd;">Cód. Ant.</th>
          <th style="padding: 6px; border: 1px solid #ddd; text-align: center;">Zona</th>
          <th style="padding: 6px; border: 1px solid #ddd; text-align: center;">F.V.</th>
        </tr>
        ${tableRowsHTML}
      </table>
    </div>
  `;
  
  popupElement_arriendo.style.display = 'block';
}

// 3. LISTEN TO INITIAL VISIBILITY TOGGLE
arriendos.on('change:visible', () => {
  if (arriendos.getVisible()) {
    updateArriendoTable(); // Attempts to run immediately
  } else {
    popupElement_arriendo.style.display = 'none'; // Hides instantly when unchecked
  }
});

// 4. THE CRUCIAL FIX: If data arrives AFTER the user clicks, update the table instantly
arriendos.getSource().on('featuresloadend', () => {
  // Only update the table if the user currently wants to see the layer
  if (arriendos.getVisible()) {
    updateArriendoTable();
  }
});



// PARA HACER CLICK EN TABLA Y MOSTRAR EN EL MAPA EL ELEMENTO
popupElement_arriendo.addEventListener('click', function(event) {
  // Check if the clicked element has our specific zoom class template
  if (event.target.classList.contains('zoom-to-feature')) {
    const featureId = event.target.getAttribute('data-id');
    const source = arriendos.getSource();
    
    // Find the original map feature by its unique internal string identification key
    const targetFeature = source.getFeatureById(featureId);
    
    if (targetFeature) {
      const geometry = targetFeature.getGeometry();
      const view = map.getView();
      
      if (geometry) {
        // Fit the map viewport cleanly around the polygon boundaries
        view.fit(geometry.getExtent(), {
          size: map.getSize(),
          duration: 1000, // Smooth 1-second zoom animation transition effect
          maxZoom: 18     // Prevents zooming in too close on tiny polygon structures
        });
      }
    }
  }
});





/*
// TABLA DE SIMBOLOGIA BOSQUES
document.addEventListener('DOMContentLoaded', function() {
  // 1. Verify that your layer variable 'poligonos' exists [Query-relevant Context]
  if (typeof bosques === 'undefined') {
    console.error("Error: The map layer variable 'poligonos' is not defined yet.");
    return;
  }

  // 2. Create the Legend DOM Element completely inside JavaScript [Query-relevant Context]
  const legendElement = document.createElement('div');
  legendElement.id = 'legend-container';
  
  // Apply all window positions and box styling
  legendElement.style.position = 'absolute';
  legendElement.style.bottom = '20px';
  legendElement.style.left = '20px';
  legendElement.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
  legendElement.style.padding = '15px 20px';
  legendElement.style.borderRadius = '6px';
  legendElement.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
  legendElement.style.zIndex = '1000';
  legendElement.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  legendElement.style.minWidth = '180px';
  legendElement.style.border = '1px solid #e0e0e0';
  legendElement.style.display = 'none'; // Hidden by default [Query-relevant Context]

  // 3. Inject the Symbology Layout Content (Edit your text descriptions and colors here) [Query-relevant Context]
  //<span style="color: #888; margin: 0 4px;">— </span>    
  legendElement.innerHTML = `
    <h4 style="margin: 0 0 10px 0; font-weight: 700; font-size: 13px; color: #444; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #eaeaea; padding-bottom: 6px;">
      BOSQUES
    </h4>
    <table style="border-collapse: collapse; width: 100%;">
      <tbody>
        <tr style="height: 28px;">
          <td style="vertical-align: middle; font-size: 12px; color: #333; padding: 4px 0;">
            <span style="display: inline-block; color: ${bosquesColor1}; font-weight: bold; transform: scale(5, 2); margin: 0 15px; vertical-align: 3px">-</span>
            <span style="font-weight: 500; color: #222;">PROTECCIÓN PERMANENTE</span> 
          </td>
        </tr>
        <tr style="height: 28px;">
          <td style="vertical-align: middle; font-size: 12px; color: #333; padding: 4px 0;">
            <span style="display: inline-block; color: ${bosquesColor2}; font-weight: bold; transform: scale(5, 2); margin: 0 15px; vertical-align: 3px">-</span>
            <span style="font-weight: 500; color: #222;">REFORESTACIÓN CON FINES DE CONSERVACIÓN</span> 
          </td>
        </tr>
        <tr style="height: 28px;">
        <td style="vertical-align: middle; font-size: 12px; color: #333; padding: 4px 0;">
            <span style="display: inline-block; color: ${bosquesColor3}; font-weight: bold; transform: scale(5, 2); margin: 0 15px; vertical-align: 3px">-</span>
            <span style="font-weight: 500; color: #222;">BOSQUE NATURAL</span>
          </td>
        </tr>
        <tr style="height: 28px;">
        <td style="vertical-align: middle; font-size: 12px; color: #333; padding: 4px 0;"> 
            <span style="display: inline-block; color: ${bosquesColor4}; font-weight: bold; transform: scale(5, 2); margin: 0 15px; vertical-align: 3px">-</span>
            <span style="font-weight: 500; color: #222;">DESARROLLO TURISTICO Y DE SOSTENIBILIDAD</span>
          </td>
        </tr>
        <tr style="height: 28px;">
        <td style="vertical-align: middle; font-size: 12px; color: #333; padding: 4px 0;"> 
            <span style="display: inline-block; color: ${bosquesColor5}; font-weight: bold; transform: scale(5, 2); margin: 0 15px; vertical-align: 3px">-</span>
            <span style="font-weight: 500; color: #222;">INFRAESTRUCTURA PARA VIVIENDA, CAMINOS Y OTRAS CONSTRUCCIONES</span>
          </td>
        </tr>
      </tbody>
    </table>
  `;

  // 4. Append the newly created template directly onto the webpage layout body
  document.body.appendChild(legendElement);

  // 5. Toggle display parameter based directly on layer switcher click events [Query-relevant Context]
  bosques.on('change:visible', function() {
    if (bosques.getVisible()) {
      legendElement.style.display = 'block'; // Show on check click [Query-relevant Context]
    } else {
      legendElement.style.display = 'none';  // Hide on uncheck click [Query-relevant Context]
    }
  });

  // Run a manual checkpoint setup validation at script load execution
  if (bosques.getVisible()) {
    legendElement.style.display = 'block';
  } else {
    legendElement.style.display = 'none';
  }
});
*/



/*
// TABLA DE SIMBOLOGIA SENDEROS 
document.addEventListener('DOMContentLoaded', function() {
  // 1. Verify that your layer variable 'poligonos' exists [Query-relevant Context]
  if (typeof senderos === 'undefined') {
    console.error("Error: The map layer variable 'poligonos' is not defined yet.");
    return;
  }

  // 2. Create the Legend DOM Element completely inside JavaScript [Query-relevant Context]
  const legendElement_senderos = document.createElement('div');
  legendElement_senderos.id = 'legend-container';
  
  // Apply all window positions and box styling
  legendElement_senderos.style.position = 'absolute';
  legendElement_senderos.style.bottom = '20px';
  legendElement_senderos.style.left = '20px';
  legendElement_senderos.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
  legendElement_senderos.style.padding = '15px 20px';
  legendElement_senderos.style.borderRadius = '6px';
  legendElement_senderos.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
  legendElement_senderos.style.zIndex = '1000';
  legendElement_senderos.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  legendElement_senderos.style.minWidth = '180px';
  legendElement_senderos.style.border = '1px solid #e0e0e0';
  legendElement_senderos.style.display = 'none'; // Hidden by default [Query-relevant Context]
  //legendElement_senderos.style.height = '200px'; 

  // 3. Inject the Symbology Layout Content (Edit your text descriptions and colors here) [Query-relevant Context]
  //<span style="color: #888; margin: 0 4px;">— </span>    
  legendElement_senderos.innerHTML = `
    <h4 style="margin: 0 0 10px 0; font-weight: 700; font-size: 13px; color: #444; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #eaeaea; padding-bottom: 6px;">
      SENDEROS
    </h4>
    <table style="border-collapse: collapse; width: 100%;">
      <tbody>
        <tr style="height: 28px;">
          <td style="vertical-align: middle; font-size: 14px; color: #333; padding: 4px 0;">
            <span style="display: inline-block; color: ${senderosColor1}; font-weight: bold; transform: scale(5, 2); margin: 0 15px; vertical-align: 3px">-</span>
            <span style="font-weight: 500; color: #222;">DEPORTIVO</span> 
          </td>
        </tr>
        <tr style="height: 28px;">
          <td style="vertical-align: middle; font-size: 14px; color: #333; padding: 4px 0;">
            <span style="display: inline-block; color: ${senderosColor2}; font-weight: bold; transform: scale(5, 2); margin: 0 15px; vertical-align: 3px">-</span>
            <span style="font-weight: 500; color: #222;">TURISTICO</span> 
          </td>
        </tr>
        <tr style="height: 28px;">
        <td style="vertical-align: middle; font-size: 14px; color: #333; padding: 4px 0;">
            <span style="display: inline-block; color: ${senderosColor3}; font-weight: bold; transform: scale(5, 2); margin: 0 15px; vertical-align: 3px">-</span>
            <span style="font-weight: 500; color: #222;">CIENTÍFICO / ACADÉMICO</span>
          </td>
        </tr>
        <tr style="height: 28px;">
        <td style="vertical-align: middle; font-size: 14px; color: #333; padding: 4px 0;"> 
            <span style="display: inline-block; color: ${senderosColor4}; font-weight: bold; transform: scale(5, 2); margin: 0 15px; vertical-align: 3px">-</span>
            <span style="font-weight: 500; color: #222;">SENDERO ESPOL</span>
          </td>
        </tr>
        <tr style="height: 28px;">
        <td style="vertical-align: middle; font-size: 14px; color: #333; padding: 4px 0;"> 
            <span style="display: inline-block; color: ${senderosColor5}; font-weight: bold; transform: scale(5, 2); margin: 0 15px; vertical-align: 3px">-</span>
            <span style="font-weight: 500; color: #222;">SENDERO BVPP</span>
          </td>
        </tr>
        <td style="vertical-align: middle; font-size: 14px; color: #333; padding: 4px 0;"> 
            <span style="display: inline-block; color: ${senderosColor6}; font-weight: bold; transform: scaleX(5); margin: 0 15px; vertical-align: 3px">-</span>
            <span style="font-weight: 500; color: #222;">SERVIDUMBRE POLIDUCTO</span>
          </td>
        </tr>
        <td style="vertical-align: middle; font-size: 14px; color: #333; padding: 4px 0;"> 
            <span style="display: inline-block; color: ${senderosColor7}; font-weight: bold; transform: scale(5, 2); margin: 0 15px; vertical-align: 3px">-</span>
            <span style="font-weight: 500; color: #222;">ACCESO RÚSTICO VEHICULAR</span>
          </td>
        </tr>
      </tbody>
    </table>
  `;

  // 4. Append the newly created template directly onto the webpage layout body
  document.body.appendChild(legendElement_senderos);

  // 5. Toggle display parameter based directly on layer switcher click events [Query-relevant Context]
  senderos.on('change:visible', function() {
    if (senderos.getVisible()) {
      legendElement_senderos.style.display = 'block'; // Show on check click [Query-relevant Context]
    } else {
      legendElement_senderos.style.display = 'none';  // Hide on uncheck click [Query-relevant Context]
    }
  });

  // Run a manual checkpoint setup validation at script load execution
  if (senderos.getVisible()) {
    legendElement_senderos.style.display = 'block';
  } else {
    legendElement_senderos.style.display = 'none';
  }
});
*/





// TABLA PARA PLANTA DE TRATAMIENTOS
const popupElement_pt = document.createElement('div');
popupElement_pt.id = 'arriendo-map-control';
popupElement_pt.className = 'ol-unselectable ol-control'; 
popupElement_pt.style.position = 'absolute';
popupElement_pt.style.bottom = '10px';       
popupElement_pt.style.left = '20px';         
popupElement_pt.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
popupElement_pt.style.border = '1px solid #ccc';
popupElement_pt.style.borderRadius = '4px';
popupElement_pt.style.padding = '12px';
popupElement_pt.style.boxShadow = '0 1px 4px rgba(0,0,0,0.2)';
popupElement_pt.style.maxWidth = '350px';
popupElement_pt.style.zIndex = '1000';
popupElement_pt.style.display = 'none';      

const ptTableControl = new ol.control.Control({ element: popupElement_pt });
map.addControl(ptTableControl);

// 2. SEPARATED FUNCTION: This builds and displays the table safely
function updateptTable() {
  const source = pt.getSource();
  const features = source.getFeatures(); 
  
  if (features.length === 0) {
    popupElement_pt.innerHTML = `<div style="font-size:12px; color:#666; padding:10px;">Cargando datos...</div>`;
    popupElement_pt.style.display = 'block';
    return;
  }

  // PARA ORDENAR TABLA ALFABETICAMENTE
  features.sort((featureA, featureB) => {
    // Extract the 'ref' strings safely
    const refA = featureA.get('ref') ? String(featureA.get('ref')) : '';
    const refB = featureB.get('ref') ? String(featureB.get('ref')) : '';
    
    // localeCompare handles alphabetical sorting perfectly (including casing and accents)
    return refA.localeCompare(refB);
  });



  let tableRowsHTML = '';
  
  features.forEach((feature, index) => {
    const props = feature.getProperties(); 
    
    // 1. EXTRAE EL PROPIETARIO PARA VALIDACIÓN (Maneja nulos de forma segura)
    const planta = props.referencia_inmueble ? String(props.referencia_inmueble).toLowerCase() : '';

    // 2. FILTRO CRUCIAL: Solo procesa el polígono si el campo contiene la palabra 'arriendo'
    if (planta.includes('planta de tratamiento')) {
      
      const refActual = props.referencia_inmueble || 'N/A';
      const codigoActual = props.código_actual || 'N/A';
      const codigoAnterior = props.código_anterior || 'N/A';
      const zona = props.zona !== undefined && props.zona !== null ? props.zona : 'N/A';


      // feature.getId PARA EL INDEX
      if (!feature.getId()) {
      feature.setId('comodato-' + index);
    }

      const featureId = feature.getId();
      
      tableRowsHTML += `
        <tr>
          <td style="padding: 6px; border: 1px solid #ddd;">
          <span class="zoom-to-feature" data-id="${featureId}" style="color: #141516; text-decoration: underline; cursor: pointer; font-weight: bold;">
          ${refActual}</span></td>
          <td style="padding: 6px; border: 1px solid #ddd; font-weight: bold;">${codigoActual}</td>
          <td style="padding: 6px; border: 1px solid #ddd; color: #555;">${codigoAnterior}</td>
          <td style="padding: 6px; border: 1px solid #ddd; text-align: center;">${zona}</td>
        </tr>
      `;
    }
  });

  // 3. MENSAJE DE FALLBACK: Si ningún polígono coincide con el criterio
  if (tableRowsHTML === '') {
    tableRowsHTML = `<tr><td colspan="3" style="padding: 10px; text-align: center; color: #888;">No se encontraron comodatos activos</td></tr>`;
  }

  popupElement_pt.innerHTML = `
    <h4 style="margin: 0 0 8px 0; color:#0064c8; font-size:14px; border-bottom: 1px solid #0064c8; padding-bottom: 4px;">
      Plantas de tratamiento
    </h4>
    <div style="max-height: 150px; overflow-y: auto;">
      <table style="border-collapse: collapse; text-align: left; width: 100%; font-size: 14px;">
        <tr style="background-color: #f8f9fa; border-bottom: 1px solid #aaa;">
          <th style="padding: 6px; border: 1px solid #ddd;">Referencia</th>
          <th style="padding: 6px; border: 1px solid #ddd;">Cód. Actual</th>
          <th style="padding: 6px; border: 1px solid #ddd;">Cód. Ant.</th>
          <th style="padding: 6px; border: 1px solid #ddd; text-align: center;">Zona</th>
        </tr>
        ${tableRowsHTML}
      </table>
    </div>
  `;
  
  popupElement_pt.style.display = 'block';
}

// 3. LISTEN TO INITIAL VISIBILITY TOGGLE
pt.on('change:visible', () => {
  if (pt.getVisible()) {
    updateptTable(); // Attempts to run immediately
  } else {
    popupElement_pt.style.display = 'none'; // Hides instantly when unchecked
  }
});

// 4. THE CRUCIAL FIX: If data arrives AFTER the user clicks, update the table instantly
pt.getSource().on('featuresloadend', () => {
  // Only update the table if the user currently wants to see the layer
  if (pt.getVisible()) {
    updateptTable();
  }
});


// PARA HACER CLICK EN TABLA Y MOSTRAR EN EL MAPA EL ELEMENTO
popupElement_pt.addEventListener('click', function(event) {
  // Check if the clicked element has our specific zoom class template
  if (event.target.classList.contains('zoom-to-feature')) {
    const featureId = event.target.getAttribute('data-id');
    const source = pt.getSource();
    
    // Find the original map feature by its unique internal string identification key
    const targetFeature = source.getFeatureById(featureId);
    
    if (targetFeature) {
      const geometry = targetFeature.getGeometry();
      const view = map.getView();
      
      if (geometry) {
        // Fit the map viewport cleanly around the polygon boundaries
        view.fit(geometry.getExtent(), {
          size: map.getSize(),
          duration: 1000, // Smooth 1-second zoom animation transition effect
          maxZoom: 18     // Prevents zooming in too close on tiny polygon structures
        });
      }
    }
  }
});





/*
// Para mostrar información al hacer click en edificaciones
map.on('singleclick', function (evt) {

  // Evita que aparezca el popup si la capa está descactivada
  if (!edificaciones.getVisible()) {
    overlay.setPosition(undefined); 
    return; 
  }

  var viewResolution = map.getView().getResolution();
  var viewProjection = map.getView().getProjection();
  
  // Colocar url dinámica
  var url = edificaciones.getSource().getFeatureInfoUrl(
    evt.coordinate,
    viewResolution,
    viewProjection,
    {
      'INFO_FORMAT': 'application/json',
      'FEATURE_COUNT': '1',
      // Para que GeoServer solo observe la tabla polígonos:
      'QUERY_LAYERS': 'gis_espol:pg_lin_espol' 
    }
  );

  
  if (url) {
    fetch(url)
      .then(function (response) { return response.json(); })
      .then(function (data) {
        // Chequea si se realizó la intersección del polígono
        if (data.features && data.features.length > 0) {
          
          // GeoServer coloca las columnas de la tabla PostgreSQL dentro de features[0].properties
          var props = data.features[0].properties; 
          
          // Colocar todas las columnas disponibles en consola F12
          console.log("Polygon data found: ", props);
          
          // Contruir la tabla con HTML
          var htmlContent = 
          '<table class="popup-table">' + 
          '<tr>'
          + '<td><strong>Ref.</strong></td>' + '<td>'+ (props.name || 'N/A') + '</td>' + 
          '</tr>' +
          '</table>'
          ;
          
          document.getElementById('popup-content').innerHTML = htmlContent;
          overlay.setPosition(evt.coordinate);
        } else {
          // Esconder popup al hacer click en espacío vacío
          overlay.setPosition(undefined);
        }
      })
      .catch(function (error) {
        console.error('Error fetching data from GeoServer:', error);
      });
  }
});
*/




/*const infraestructura = new LayerSwitcher({
  tipLabel: 'Legend', // Optional button tooltip
  groupSelectStyle: 'children' // 'children' allows you to toggle the whole group
});
map.addLayer(infraestructura) */



/*var map = L.map("map").setView([-2.148383, -79.964506], 16)

var osm =L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: '© Google Maps'
}).addTo(map);

// Para publicarlo en la misma red se uso Browser Sync, en sus settings se puso "port" : 3000
// Se creó una regla "Geoportal Espol" en Firewall Windows Defender", que permitía los puertos 3000 y 8080
// En "Firewall y protección de red" se permitió pasar a través de Firewall a Geoportal Espol y OpenJDK (la ubicación de java.exe)
// Ingreso localhost como una variable, para reemplazarlo por mi ip 172.20.131.153 (es variable)
// En Firewall de Windows Defender se permitió la conexión de los Apache Server

const source = "http://172.20.132.87:8080" // Puede ser ip (poner la ip actualizada) o https://localhost:8080

var poligonos = L.tileLayer.wms(source + "/geoserver/gis_espol/wms?",{
	Layers: "pg_polig_espol",
	format: "image/png",
	transparent: true
});






// CODIGO PARA MOSTRAR TABLA DE ATRIBUTOS AL HACER CLICK EN POLIGONOS
// OTRO METODO PUEDE SER CON getFeatureInfoUrl
// NECESARIO MODIFICAR CARPETA DE GEOSERVER/WEB-INFO. AHI COLOCAR:
// <context-param>
//    <param-name>geoserver.xframe.shouldSetPolicy</param-name>
//    <param-value>false</param-value>
// </context-param>
// 1. Create your standard, functional WMS Polygon Layer
var espolPolygons = L.tileLayer.wms(source + '/geoserver/gis_espol/wms', {
    layers: 'gis_espol:pg_polig_espol',
    format: 'image/png',
    transparent: true,
    version: '1.1.0',
    srs: 'EPSG:4326',
    maxZoom: 22,       // The furthest the user can zoom in
    maxNativeZoom: 19
});

// 2. Add the native click handler directly to your Leaflet map object
map.on('click', function(e) {
    var size = map.getSize();
    var pixelPoint = map.latLngToContainerPoint(e.latlng);
    var bounds = map.getBounds();
    
    // Calculates a bounding box string compatible with GeoServer's layout
    var bbox = bounds.getSouthWest().lng + ',' + bounds.getSouthWest().lat + ',' + 
               bounds.getNorthEast().lng + ',' + bounds.getNorthEast().lat;

    // 3. Construct the clean, targeted Feature Information Request Link
    var infoUrl = source + '/geoserver/gis_espol/wms' +
                  '?service=WMS&version=1.1.0&request=GetFeatureInfo' +
                  '&layers=gis_espol:pg_polig_espol&query_layers=gis_espol:pg_polig_espol' +
                  '&info_format=text/html' +       // Instructs GeoServer to build an HTML table
                  '&bbox=' + bbox +
                  '&width=' + size.x + '&height=' + size.y +
                  '&srs=EPSG:4326' +
                  '&x=' + Math.round(pixelPoint.x) + '&y=' + Math.round(pixelPoint.y);

    // 4. Mount the resulting data view inside a standard Leaflet Popup box via an Iframe
    L.popup({maxWidth: 480,  // Forces the white vignette box to be wide enough
    		maxHeight: 400}  // Forces the white vignette box to be tall enough
    	)
        .setLatLng(e.latlng)
        .setContent('<iframe src="' + infoUrl + '" width="380" height="160" style="border:none;"></iframe>')
        .openOn(map);
});





var puntos = L.tileLayer.wms(source + "/geoserver/gis_espol/wms?",{
	Layers: "pg_puntos_espol",
	format: "image/png",
	transparent: true,
	maxZoom: 22,       
    maxNativeZoom: 19
});

var grupozonas = L.layerGroup([espolPolygons, puntos])



var tree = [
    {type: 'leaflet',
    name: 'Infraestructura',
    children: [
        {
            name: 'Zonas',
            layer: grupozonas
        }
        ]
    }
 ];

var control_layers = new L.Control.LayerTreeControl(tree, {
  position: 'topleft',
});
map.addControl(control_layers);

var container = control_layers.getContainer();
L.DomEvent.disableClickPropagation(container);
*/
