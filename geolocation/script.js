/*
 Есть два способа показать данные местоположения пользователя: геодезические и общественное.

 Геодезические — это описание позиции непосредственно относится к широте и долготе.
 Общественное — это показ данных о местоположении для лучшего понимания человеком.
 Геодезический и общественный имеют свои атрибуты для показа данных о месте.

 Геодезические и общественные данные
 Атрибуты	Геодезические	Общественные
 Позиция	      59.3, 18.6	 Стокгольм
 Высота	      10 метров      4-й этаж
 Цель	     234 градуса	К центру города
 Скорость	   5 км/ч	      пешком
 Направление	     45	        северо восток
 От Geolocation API вы получите геодезические данные. Представление данные о местоположении с редко полезными номерами.
 Но есть онлайн-сервисы, такие как Bing Maps и Yahoo GeoPlanet помогут вам перевести их в общественные.
 */
function geoFindMe() {
  const output = document.getElementById('out');

  if (!navigator.geolocation) {
    output.innerHTML = '<p>Geolocation is not supported by your browser</p>';
    return;
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    output.innerHTML = `<p>Latitude is ${latitude}° <br>Longitude is ${longitude}°</p>`;

    const img = new Image();
    img.src = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=13&size=300x300&sensor=false`;

    output.appendChild(img);
  }

  function error() {
    output.innerHTML = 'Unable to retrieve your location';
  }

  output.innerHTML = '<p>Locating…</p>';

  navigator.geolocation.getCurrentPosition(success, error);
}
