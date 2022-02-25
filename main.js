// DOM
let search = document.querySelector("#search");
const city = document.querySelector("#city");
const date = document.querySelector("#date");
const temp = document.querySelector("#temp");
const cloud = document.querySelector("#cloud");
const hi_low = document.querySelector("#hi_low");

const url = {
    base: "https://api.openweathermap.org/data/2.5/",
    key : "appid=7609059f868060985fd5aa17a621f21c"
}
const weatherURL = url.base+"weather?units=metric&"+url.key;

// fetch
function fetchApi(url, q){
    let path = url + q;
    fetch(path)
    .then(res => res.json())
    .then(data => displayResult(data))
    .catch(err => console.log(err))
}

// display result
function displayResult(data){
    city.innerHTML = `${data.name}, ${data.sys.country}`;
    let dates = new Date();
    let dd = dates.getDate();
    let day = dates.getDay();
    let mm = dates.getMonth();
    let yy = dates.getFullYear();

    let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let DD = `${days[day]} ${dd} ${month[mm]} ${yy}`;

    date.innerHTML = DD;
    temp.innerHTML = data.main.temp.toFixed(1)+" °C";
    console.log(data)
    cloud.innerHTML = data.weather[0].main;
    hi_low.innerHTML = `MIN - ${data.main.temp_min.toFixed(1)}°C / MAX - ${data.main.temp_max.toFixed(1)}°C`
}
// get search value
search.addEventListener("keypress", e =>{
    if(e.keyCode === 13){
        let val = e.target.value;
        if(val){
            let query = `&q=`+val;
            fetchApi(weatherURL, query);
        }
        search.value = "";
    }
    
})
window.addEventListener("load", ()=>{
    let val = "Mandalay";
    let q = "&q="+val;
    fetchApi(weatherURL, q);
})