'use strict';

function initMap() {
	var coords, map, marker, content, info, styles;

	content = '<h1 class="title">I\'ll be back</h1>';

	coords = {lat: 50.460135, lng:   30.640238};

	map = new google.maps.Map(
		document.getElementById('map'), {
			zoom: 14, 
			center: coords,
			styles: styles
		}
		);
	info = new google.maps.InfoWindow({
		content: content
	});
	marker = new google.maps.Marker({
		position: coords, 
		map: map,
		icon: 'images/marker.png',
		draggable:true
	});

	marker.addListener('click', function() {
		info.open(map, marker);
	});

}

//reverse clock
function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.parse(new Date()) + 18 * 24 * 60 * 60 * 1000);
initializeClock('clock', deadline);