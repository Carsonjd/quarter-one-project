$('document').ready(function(){

  var menuOpen = false;
  var homeOpen = false;
  var mapOpen = true;

  function menuView (){
    menuOpen = true;
    $('#menu-main').text('hide');
    $('.red-glow-circle').animate({
      'opacity': '0.7'
    },300);
    $('body').css('background-blend-mode', 'color-dodge');
    $('#map').animate({
      'opacity':'0.4'
    }, 300);
    $('h1').animate({
      'margin-top': '32%'
    }, 300);
    $('.drop-main').animate({
      'top': '20%'
    },300);
    $('.about').css('opacity', '0.1');
  };

  function menuHide (){
    menuOpen = false;
    $('#menu-main').text('menu');
    $('.red-glow-circle').animate({
      'opacity': '0.35'
    },300);
    $('body').css('background-blend-mode', 'normal');
    $('#map').animate({
      'opacity':'1.0'
    }, 300);
    $('.drop-main').animate({
      'top': '-75%'
    },300);
    $('h1').animate({
      'margin-top': '300%'
    }, 300);
    $('.about').css('opacity', '0.6');
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
  }

  function mapHide (){
    mapOpen = false;
    $('#map').css('display', 'none');
  }

  function formShow (){

  }

  //Menu click/tap events
  $('#menu-main').click(function(){
    if(menuOpen === false){
      menuView();
    } else {
      menuHide();
    }
  });

  //Menu functionality
  $('#menu-home').click(function(event){
    homeShow();
    mapHide();
    menuHide();
  });

  $('#menu-map').click(function(event){
    menuHide();
    mapShow();
    homeHide();
  });



// function filmObj (imdbID, Poster, Title, Year){
//   this.id = imdbID;
//   this.poster = Poster;
//   this.title = Title;
//   this.year = Year;
// }
// var film = new filmObj (imdbID, Poster, Title, Year);
// movies.push(film)

  //Form data
  // function placeProto (){
  //
  // }
  // var places = {
  //
  // }

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
    console.log(JSON.stringify(features[0].geometry.coordinates));
    console.log(JSON.stringify(features[0].properties.name));
  })



  //console.log(map);





});
