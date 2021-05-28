const btnCity = document.querySelector('.change-city__change');
const search = document.querySelector('.search');
const searchOk = document.querySelector('.search__input-text');

btnCity.addEventListener('click', changeCity);
searchOk.addEventListener('click', changeCityNone);

console.log(search);
console.log(btnCity);

function changeCity() {
  search.style.display = "block";

}

function changeCityNone() {
  search.style.display = "none";
}

console.log(btnCity);


document.addEventListener('DOMContentLoaded', () => {
  const inp = document.querySelector('.search__input'),
        div = document.querySelector('.city'),
        btn = document.querySelector('.search__input-text');
  btn.addEventListener('click', function () {
    if (inp.value.length)
      div.innerHTML = inp.value;
      render();
    });
    console.log(div.innerHTML);
  });


function render() {
  const temp = document.querySelector('.forecast-term__current'),
        city = document.querySelector('.city'),
        descr = document.querySelector('.forecast-term__briefly-condition'),
        pressure = document.querySelector('.pressure-value'),
        humidity = document.querySelector('.humidity-value'),
        rain = document.querySelector('.rain-value'),
        wind = document.querySelector('.wind-value');
        cityName = city.innerHTML;

  fetch (`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&lang=ru&appid=67f9f5ed3187e21b6b8e4124dd00c9bd`)
    .then(function  (resp) { return resp.json() })
    .then(function (data) {

      console.log(data);

        city.innerHTML = data.city.name;
        temp.innerHTML = Math.round(data.list[0].main.temp - 273) + '&deg';
        descr.innerHTML = data.list[0].weather[0].description[0].toUpperCase() + data.list[0].weather[0].description.slice(1);
        pressure.innerHTML = Math.round(data.list[0].main.pressure / 1.33322) + ' мм рт. ст.';
        humidity.innerHTML = Math.round(data.list[0].main.humidity) + ' %';
        rain.innerHTML = Math.round(data.list[0].pop * 100) + ' %';
        wind.innerHTML = Math.round(data.list[0].wind.speed) + ' м/с, ' + text(data.list[0].wind.speed);

        logo = [document.getElementById('forecast1'), document.getElementById('forecast2'), document.getElementById('forecast3'), document.getElementById('forecast4'), document.getElementById('forecast5')];

        const main = data.list[0].weather[0].main;
        const description = data.list[0].weather[0].id;

        function changeLogo() {
          if ( main == 'Clear') {
            logo[0].style.display = 'block';
          } else if (main == 'Rain') {
            logo[1].style.display = 'block';
          } else if ((main == 'Clouds') && (description == '802' || '803' || '804')) {
            logo[2].style.display = 'block';
          } else if (main == 'Thunderstorm') {
            logo[3].style.display = 'block';
          } else if (description == '801') {
            logo[4].style.display = 'block';
          }
          else {
            logo[0].style.display = 'block';
          }
        }
        changeLogo();

        const newTemp = temp.innerHTML;
        const num = parseInt(`${newTemp}`.replace(/\D+/g,""))

        t = document.getElementById('click')
        t.onclick = function(){
            this.className = (this.className == 'f')?'c':'f'
        }
        document.onclick = function(e){
            if(e.target.id != 'click'){
                t.className = 'c'
            }
            function foo() {
              if(t.className == 'f'){
                  temp.innerHTML = Math.round(num + 33.8) + '&deg';

              } else {
                temp.innerHTML = num + '&deg';
              }
            }
            foo();
        }


      })
      .catch(function () {
        alert('Что-то пошло не так...')
      });






    function text(d) {
    let directions = ['северный', 'северо-восточный', 'восточный', 'юго-восточный', 'южный', 'юго-западный', 'западный', 'северо-западный'];

    if (d < 0)
        d = 360 - Math.abs(d) % 360;
    else
        d = d % 360;

    let w = parseInt(d / 45);
    return `${directions[w]}`;
  }
}




