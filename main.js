$('document').ready(function(){

  //Menu button functionality
  var menuOpen = false;
  $('#menu').click(function(){
    if(menuOpen = false){
      //$('.drop-main').style.display('grid');
      $('.drop-main').animate({
        'top': '-100%'
      },300);
    } else {
      $('.drop-main').animate({
        'top': '100%'
      },300);
    }
  })

  var requestUrl = 'https://api.mapbox.com/v4/mapbox.dark/-76.9,38.9,5/400x200@2x.png?access_token=pk.eyJ1IjoiY2Fyc29uamQiLCJhIjoiY2o3Z2lkeHhqMTkzZzMybzIydXN0OXVyMSJ9.Fb8VNtwKGcp3cV9Xev1vfQ'

  var xhr = $.getJSON(requestUrl);
  xhr.done(function(data){
    console.log(data)
  })

  mapboxgl.accessToken = 'pk.eyJ1IjoiY2Fyc29uamQiLCJhIjoiY2o3Z2lkeHhqMTkzZzMybzIydXN0OXVyMSJ9.Fb8VNtwKGcp3cV9Xev1vfQ';

  $('body').append(new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-streets-v10',
    center: [-77.034084, 38.909671],
    zoom: 5
  }));




//mapbox.mapbox-terrain-v2


})
