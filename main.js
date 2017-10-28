$('document').ready(function(){

  //Menu button functionality
  var menuOpen = false;
  $('#menu-main').click(function(){
    if(menuOpen === false){
      menuOpen = true;
      $('#menu-main').text('hide');
      $('.red-glow-circle').animate({
        'opacity': '0.6'
      },300);
      $('body').css('background-blend-mode', 'color-dodge');
      $('#map').animate({
        'opacity':'0.4'
      }, 300);
      $('.drop-main').animate({
        'top': '20%'
      },300);
    } else {
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
        'top': '-70%'
      },300);
    }
  });

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
  center: [-77.034084, 38.909671],
  zoom: 5
  });
  console.log(map._interactive);





});
