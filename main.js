$('document').ready(function(){

  var menuOpen = false;
  var homeOpen = false;
  var mapOpen = true;

  function menuView (){
    menuOpen = true;
    $('#menu-main').text('hide');
    $('.red-glow-circle').animate({
      'opacity': '0.9'
    },300);
    $('body').css('background-blend-mode', 'color-dodge');
    $('#map').animate({
      'opacity':'0.2'
    }, 300);
    $('h1').animate({
      'margin-top': '30%'
    }, 300);
    $('.drop-main').animate({
      'top': '12%'
    },300);
    $('.about').css('opacity', '0.1');
    $('.locations').css('opacity', '0.1');
    $('.form-container').animate({
      'opacity': '0.1'
    },300);
  };

  function menuHide (){
    menuOpen = false;
    mapBright();
    $('#menu-main').text('menu');
    $('.red-glow-circle').animate({
      'opacity': '0.35'
    },300);
    $('body').css('background-blend-mode', 'normal');
    $('.drop-main').animate({
      'top': '-75%'
    },300);
    $('h1').animate({
      'margin-top': '300%'
    }, 300);
    $('.about').css('opacity', '0.6');
    $('.locations').css('opacity', '0.9');
    $('.form-container').animate({
      'opacity': '0.9'
    },300);
  };

  function homeShow (){
    homeOpen = true;
    $('body').css('background-image','url(DSC00858skiny.jpg)');
    $('.about').animate({
      'opacity': '0.6'
    },300).fadeIn(300);
  }

  function homeHide (){
    homeOpen = false;
    $('body').css('background-image','url()');
    $('.about').fadeOut(300);
  }

  function mapShow (){
    mapOpen = true;
    $('#map').css('display', 'block');
    $('body').css('background-image', 'url()');
    $('#map').animate({
      'opacity':'1.0'
    }, 300);
  }

  function mapHide (){
    mapOpen = false;
    $('#map').css('display', 'none');
  }

  function mapDim (){
    $('#map').animate({
      'opacity':'0.3'
    }, 300);
  }

  function mapBright (){
    $('#map').animate({
      'opacity':'1.0'
    }, 300);
  }

  function formShow (){
    $('.form-container').animate({
      'top': '30%'
    },300);

  }

  function formHide (){
    $('.form-container').animate({
      'top': '100%'
    },300);
  }

  function locationListShow (){
    $('.locations').animate({
      'top':'2%'
    },300);
  };

  function locationListHide (){
    $('.locations').animate({
      'top':'100%'
    },300);
  };

  //Menu click/tap events
  $('#menu-main').click(function(){
    if(menuOpen === false){
      menuView();
    } else {
      menuHide();
    }
  });

  $('#menu-home').click(function(event){
    homeShow();
    mapHide();
    menuHide();
    locationListHide();
    formHide();
  });

  $('#menu-map').click(function(event){
    menuHide();
    mapShow();
    homeHide();
    locationListHide();
    formHide();
  });

  $('#menu-locations').click(function(event){
    mapDim();
    menuHide();
    homeHide();
    formHide();
    locationListShow();
  });

  $('#locations').click(function(){
    locationListHide();
    mapShow();
  })

  $('#menu-add').click(function(){
    formShow();
    menuHide();
    locationListHide();
    mapDim();
  });

  $('#your-location').click(function(event){
    $('.mapboxgl-ctrl-icon.mapboxgl-ctrl-geolocate').trigger('click');
    formHide();
    navigator.geolocation.getCurrentPosition(function(position){
	    var locationMarker = null;
	      if (locationMarker){
	         return;
	        }
	    lat = position.coords["latitude"];
	    lng = position.coords["longitude"];
      featureBlank.geometry.coordinates.push(lng);
      featureBlank.geometry.coordinates.push(lat);
	    },
	      function(error) {
	        console.log("Error: ", error);
	      },
	    {
       enableHighAccuracy: true
     });
    var nameField = $('<input>').attr({'type':'text', 'placeholder':'Location Name','id':'nameinput' }).addClass('location-input-item');
    var descField = $('<input>').attr({'type':'text', 'placeholder':'Add A Description','id':'descriptionField' }).addClass('location-input-item');
    var submit = $('<div>').attr('id', 'location-submit').text('Add');
    $('#location-input').append(nameField)
      .append(descField)
      .append(submit);
    $('#location-input').css('display', 'flex');
  });

  $('#location-input').on('click','#location-submit',function(){
    var props = featureBlank.properties
      props.city = $('#nameinput').val();
      props.address = $('#descriptionField').val();
      places.features.unshift(featureBlank);
      console.log(featureBlank);
      //featureBlankReset();
      $('#location-input').empty();
      $('#location-input').css('display', 'none');
      mapShow();
      buildLocationList(places);
      createMarkers();
      createPopUp(places.features[0]);
      localStorage.setItem('places', JSON.stringify(places));
  });

  function featureBlankReset(){
    featureBlank.geometry.coordinates = [];
    var props = featureBlank.properties;
    props.address = "";
    props.city = "";
    props.country = "";

  }

  var featureBlank = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": []
      },
      "properties": {
        "address": "",
        "city": "",
        "country": "",
      }
    }


  var places = JSON.parse(localStorage.getItem('places')) || {
    'type':'FeatureCollection',
    'features':[]
  };

  // var places = {
  //         "type": "FeatureCollection",
  //         "features": [
  //           {
  //             "type": "Feature",
  //             "geometry": {
  //               "type": "Point",
  //               "coordinates": [
  //                 -77.0299533,-12.1284567
  //               ]
  //             },
  //             "properties": {
  //               "address": "Manco Capac 515 Miraflores, Miraflores Lima 18, Peru",
  //               "city": "Lima",
  //               "country": "Peru",
  //             }
  //           },
  //           {
  //             "type": "Feature",
  //             "geometry": {
  //               "type": "Point",
  //               "coordinates": [
  //                 -76.107998,-5.8875404
  //               ]
  //             },
  //             "properties": {
  //               "address": "Progreso 1022, Yurimaguas, Peru",
  //               "city": "Yurimaguas",
  //               "country": "Peru",
  //             }
  //           },
  //           {
  //             "type": "Feature",
  //             "geometry": {
  //               "type": "Point",
  //               "coordinates": [
  //                 -73.2466347,-3.7482733
  //               ]
  //             },
  //             "properties": {
  //               "address": "Jirón Putumayo, Iquitos, Peru",
  //               "city": "Iquitos",
  //               "country": "Peru",
  //             }
  //           },
  //           {
  //             "type": "Feature",
  //             "geometry": {
  //               "type": "Point",
  //               "coordinates": [
  //                 -71.9806863,-13.5137949
  //               ]
  //             },
  //             "properties": {
  //               "address": "Suecia 504, Cusco 08000, Peru",
  //               "city": "Cusco",
  //               "country": "Peru",
  //             }
  //           },
  //           {
  //             "type": "Feature",
  //             "geometry": {
  //               "type": "Point",
  //               "coordinates": [
  //                 -72.2684338,-13.2623302
  //               ]
  //             },
  //             "properties": {
  //               "address": "Av. Ferrocarril s/n - a 50mts de la Estacion de Tren a Machu Picchu, Ollantaytambo, Peru",
  //               "city": "Ollantaytambo",
  //               "country": "Peru",
  //             }
  //           },
  //           {
  //             "type": "Feature",
  //             "geometry": {
  //               "type": "Point",
  //               "coordinates": [
  //                 -72.5262548,-13.1547655
  //               ]
  //             },
  //             "properties": {
  //
  //               "address": "Avenida Hermanos Ayar, Aguas Calientes, Peru",
  //               "city": "Aguas Calientes",
  //               "country": "Peru",
  //             }
  //           },
  //           {
  //             "type": "Feature",
  //             "geometry": {
  //               "type": "Point",
  //               "coordinates": [
  //                 -71.5402653,-16.4034247,
  //               ]
  //             },
  //             "properties": {
  //               "address": "28 de Julio 224, Arequipa, Peru",
  //               "city": "Arequipa",
  //               "country": "Peru",
  //             }
  //           },
  //           {
  //             "type": "Feature",
  //             "geometry": {
  //               "type": "Point",
  //               "coordinates": [
  //                 -71.911844,-17.0946905
  //               ]
  //             },
  //             "properties": {
  //               "address": "Mejia, Peru",
  //               "city": "Mejía",
  //               "country": "Peru",
  //             }
  //           },
  //           {
  //             "type": "Feature",
  //             "geometry": {
  //               "type": "Point",
  //               "coordinates": [
  //                 -70.3051519,-18.4718177
  //               ]
  //             },
  //             "properties": {
  //               "address": "898,, Av. Diego Portales 810, Arica, Región de Arica y Parinacota, Chile",
  //               "city": "Arica",
  //               "country": "Chile",
  //             }
  //           },
  //           {
  //             "type": "Feature",
  //             "geometry": {
  //               "type": "Point",
  //               "coordinates": [
  //                 -69.176536,-18.2512175
  //               ]
  //             },
  //             "properties": {
  //               "address": "Ruta 11 17900, Putre, Región de Arica y Parinacota, Chile",
  //               "city": "Lago Chungara",
  //               "country": "Chile",
  //             }
  //           },
  //           {
  //             "type": "Feature",
  //             "geometry": {
  //               "type": "Point",
  //               "coordinates": [
  //                 -68.2003496,-22.9112444
  //               ]
  //             },
  //             "properties": {
  //               "address": "Caracoles 317 - Departamento 15 - Galeria El Peral, San Pedro de Atacama, Región de Antofagasta, Chile",
  //               "city": "San Pedro de Atacama",
  //               "country": "Chile",
  //             }
  //           },
  //           {
  //             "type": "Feature",
  //             "geometry": {
  //               "type": "Point",
  //               "coordinates": [
  //                 -65.4041787,-24.7887849
  //               ]
  //             },
  //             "properties": {
  //               "address": "Juramento 109, Salta, Argentina",
  //               "city": "Salta",
  //               "country": "Argentina",
  //             }
  //           },
  //           {
  //             "type": "Feature",
  //             "geometry": {
  //               "type": "Point",
  //               "coordinates": [
  //                 -54.5699711,-25.5979978,
  //               ]
  //             },
  //             "properties": {
  //               "address": "N3370AQA, Av. Guaraní 7, N3370AQA Puerto Iguazú, Misiónes, Argentina",
  //               "city": "Iguazú",
  //               "country": "Argentina",
  //             }
  //           },
  //           {
  //             "type": "Feature",
  //             "geometry": {
  //               "type": "Point",
  //               "coordinates": [
  //                 -58.4010115,-34.5939392,
  //               ]
  //             },
  //             "properties": {
  //               "address": "Arenales 2302, C1124AAL CABA, Argentina",
  //               "city": "Buenos Aires",
  //               "country": "Argentina",
  //             }
  //           },
  //           {
  //             "type": "Feature",
  //             "geometry": {
  //               "type": "Point",
  //               "coordinates": [
  //                 -64.180701,-31.4154509
  //               ]
  //             },
  //             "properties": {
  //               "address": "Gral Alvear, 158, 5000 Córdoba, Argentina",
  //               "city": "Córdoba",
  //               "country": "Argentina",
  //             }
  //           },
  //           {
  //             "type": "Feature",
  //             "geometry": {
  //               "type": "Point",
  //               "coordinates": [
  //                 -72.2621318,-50.33492,
  //               ]
  //             },
  //             "properties": {
  //               "address": "Perito Moreno 235, El Calafate, Santa Cruz, Argentina",
  //               "city": "El Calafate",
  //               "country": "Argentina",
  //             }
  //           },
  //           {
  //             "type": "Feature",
  //             "geometry": {
  //               "type": "Point",
  //               "coordinates": [
  //                 -72.8838404,-49.3322695,
  //               ]
  //             },
  //             "properties": {
  //               "address": "Avenida Río de las Vueltas y Halvorsen, 9301 El Chalten, Santa Cruz, Argentina",
  //               "city": "El Chaltén",
  //               "country": "Argentina",
  //             }
  //           },
  //           {
  //             "type": "Feature",
  //             "geometry": {
  //               "type": "Point",
  //               "coordinates": [
  //                 -72.5053105,-51.7278604
  //               ]
  //             },
  //             "properties": {
  //               "address": "Arturo Prat 367, Puerto Natales, Natales, Región de Magallanes y de la Antártica Chilena, Chile",
  //               "city": "Puerto Natales",
  //               "country": "Chile",
  //             }
  //           },
  //            {
  //             "type": "Feature",
  //             "geometry": {
  //               "type": "Point",
  //               "coordinates": [
  //                 -70.8941162,-53.1562665
  //               ]
  //             },
  //             "properties": {
  //               "address": "Punta Arenas, Magallanes y la Antártica Chilena Region, Chile",
  //               "city": "Punta Arenas",
  //               "country": "Chile",
  //             }
  //           },
  //            {
  //             "type": "Feature",
  //             "geometry": {
  //               "type": "Point",
  //               "coordinates": [
  //                 -68.3014403,-54.8051936
  //               ]
  //             },
  //             "properties": {
  //               "address": "Rivadavia 172, V9410 Ushuaia, Tierra del Fuego, Argentina",
  //               "city": "Ushuaia",
  //               "country": "Argentina",
  //             }
  //           },
  //            {
  //             "type": "Feature",
  //             "geometry": {
  //               "type": "Point",
  //               "coordinates": [
  //                 -3.643473,40.4352067
  //               ]
  //             },
  //             "properties": {
  //               "address": "28027 Madrid, Spain",
  //               "city": "Madrid",
  //               "country": "Spain",
  //             }
  //           },
  //           {
  //             "type": "Feature",
  //             "geometry": {
  //               "type": "Point",
  //               "coordinates": [
  //                 -7.9879966,31.6269109
  //               ]
  //             },
  //             "properties": {
  //               "address": "21 Derb Sidi Bouloukate، Marrakech 40000, Morocco",
  //               "city": "Marrakech",
  //               "country": "Morocco",
  //             }
  //           },
  //           {
  //             "type": "Feature",
  //             "geometry": {
  //               "type": "Point",
  //               "coordinates": [
  //                 -7.9384224,31.0642341
  //               ]
  //             },
  //             "properties": {
  //               "address": "Chemin Sommet Toubkal, Morocco",
  //               "city": "Toubkal",
  //               "country": "Morocco",
  //             }
  //           },
  //           {
  //             "type": "Feature",
  //             "geometry": {
  //               "type": "Point",
  //               "coordinates": [
  //                 85.3074823,27.7174765
  //               ]
  //             },
  //             "properties": {
  //               "address": "Paknajol, Thamel, Kathmandu 44600, Nepal",
  //               "city": "Kathmandu",
  //               "country": "Nepal",
  //             }
  //           },
  //           {
  //             "type": "Feature",
  //             "geometry": {
  //               "type": "Point",
  //               "coordinates": [
  //                 -105.2838747,40.0165447
  //               ]
  //             },
  //             "properties": {
  //               "address": "1023 Walnut St, Boulder, CO 80302",
  //               "city": "Boulder",
  //               "country": "United States",
  //             }
  //           }
  //           // {
  //           //   "type": "Feature",
  //           //   "geometry": {
  //           //     "type": "Point",
  //           //     "coordinates": [
  //           //
  //           //     ]
  //           //   },
  //           //   "properties": {
  //           //     "address": "",
  //           //     "city": "",
  //           //     "country": "",
  //           //   }
  //           // },
  //           // {
  //           //   "type": "Feature",
  //           //   "geometry": {
  //           //     "type": "Point",
  //           //     "coordinates": [
  //           //
  //           //     ]
  //           //   },
  //           //   "properties": {
  //           //     "address": "",
  //           //     "city": "",
  //           //     "country": "",
  //           //   }
  //           // }
  //
  // ]
  // };



  // var requestUrl = ''
  //
  // var xhr = $.getJSON(requestUrl);
  // xhr.done(function(data){
  //   console.log(data)
  // })

  // $.get('https://www.reddit.com/r/aww.json')
  // .done(function (response) {
  //   //What to do if HTTP was successful
  //   localStorage.setItem('redditData', JSON.stringify(response));
  // })
  // .fail(function (error) {
  //   //What to do if HTTP failed
  //   JSON.parse(localStorage.getItem('redditData'));
  //   console.log('redditData');
  // })



  mapboxgl.accessToken = 'pk.eyJ1IjoiY2Fyc29uamQiLCJhIjoiY2o5YmxuYXkyMWVjMTMzbzdsajJnc3kycyJ9.xoTkOio_DVGEpXsE97I3Zg';

  var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/carsonjd/cj9bo5zhx4i4p2rmk9c5xrsax',
  center: [-105.2838747,40.0165447],
  zoom: 10
  });
  map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
  }));


  map.on('click', function(event){
    JSON.stringify(event.lngLat);
    var features = map.queryRenderedFeatures(event.point);
  })

  function flyToLocation(item) {
    map.flyTo({
      center: item.geometry.coordinates,
      zoom: 14
    });
  }

  function createPopUp(item) {
    var popUps = document.getElementsByClassName('mapboxgl-popup');
    if (popUps[0]) popUps[0].remove();
    var popup = new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat(item.geometry.coordinates)
      .setHTML('<h5>'+item.properties.city+'</h5>' +
        '<h4>' + item.properties.address + '</h4>')
      .addTo(map);
  }

  function buildLocationList(data) {
  for (i = 0; i < data.features.length; i++) {
    var currentFeature = data.features[i];
    var prop = currentFeature.properties;
    var locations = document.getElementById('locations');
    var location = locations.appendChild(document.createElement('div'));
    location.className = 'item';
    location.id = 'location-' + i;

    var details = location.appendChild(document.createElement('div'));
    details.innerHTML = prop.city;

    var link = location.appendChild(document.createElement('a'));
    link.href = '#';
    link.className = 'title';
    link.dataPosition = i;
    link.innerHTML = prop.address;

    link.addEventListener('click', function(e) {
      var clickedLocation = places.features[this.dataPosition];
      flyToLocation(clickedLocation);
      createPopUp(clickedLocation);
      var activeItem = document.getElementsByClassName('active');
      if (activeItem[0]) {
        activeItem[0].classList.remove('active');
      }
      this.parentNode.classList.add('active');
    });
  }
};

  map.on('load', function(event) {
  map.addSource('places', {
    type: 'geojson',
    data: places
  });
  buildLocationList(places);
  createMarkers();
});

function createMarkers(){
  places.features.forEach(function(marker){
    var element = document.createElement('div');
    element.classList = 'marker';
    new mapboxgl.Marker(element, {
        // offset: [-30, -40]
      })
      .setLngLat(marker.geometry.coordinates)
      .addTo(map);
    element.addEventListener('click',   function(event){
      var activeItem = $('active');
      flyToLocation(marker);
      createPopUp(marker);
      event.stopPropagation();
      if (activeItem[0]) {
        activeItem[0].classList.remove('active');
      }
      var location =   document.getElementById('location-' +   places.features.indexOf(marker));
      location.classList.add('active');
    });
  });
};

});
