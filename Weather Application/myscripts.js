function GetInfo() {

    var newName = document.getElementById("cityInput");
    var cityName = document.getElementById("cityName");
    var newDate = document.getElementById("dates");
    cityName.innerHTML = newName.value;


    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + newName.value +
            '&appid=32ba0bfed592484379e51106cef3f204')
        .then(response => response.json())
        .then(data => {


            var ts = new Date(data.list[0].dt);
            var date = new Date(ts * 1000)
            newDate.innerHTML = date.toDateString();
            console.log(date.toDateString());

            for (i = 0; i < 1; i++) {
                document.getElementById("lat").innerHTML = data.city.coord.lat + "E";
            }

            for (i = 0; i < 1; i++) {
                document.getElementById("long").innerHTML = data.city.coord.lon + "N";
            }

            for (i = 0; i < 1; i++) {
                document.getElementById("country").innerHTML = data.city.country;
            }

            //Getting the temp values for each day
            var dum = 0;
            for (i = 0; i < 40; i += 8) {
                document.getElementById("day" + (dum + 1) + "Min").innerHTML = Number(data.list[
                        i]
                    .main.temp - 273.15).toFixed(1) + "° C";
                dum++;
            }

             //Getting the Date for each day
            var dummy = 0;
            for (i = 0; i < 40; i += 8) {
                var trialone = new Date(data.list[i].dt_txt);
                var trialTwo = trialone.toDateString();
                document.getElementById("date" + (dummy + 1)).innerHTML = trialTwo;
                dummy++;
            }


            var dumthree = 0;
            //Getting Weather Icons
            for (i = 0; i < 40; i += 8) {
                document.getElementById("img" + (dumthree + 1)).src = "http://openweathermap.org/img/wn/" +
                    data.list[i].weather[0].icon +
                    "@2x.png";
                dumthree++;
            }

            var trialone = new Date(data.list[8].dt_txt);
            var trialTwo = trialone.toDateString();
            console.log(trialTwo);
            console.log(data)
   
        })

        .catch(err => alert("Input error, Please try again"))
}

function DefaultScreen() {
    document.getElementById("cityInput").defaultValue = "Davao";
    GetInfo();
}

    //Getting and displaying the text for the upcoming five days of the week
    var d = new Date();
    var weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT", ];

    //Function to get the correct integer for the index of the days array
    function CheckDay(day) {
        if (day + d.getDay() > 6) {
            return day + d.getDay() - 7;
        } else {
            return day + d.getDay();
        }
    }

    for (i = 0; i < 5; i++) {
        document.getElementById("day" + (i + 1)).innerHTML = weekday[CheckDay(i)];
    }