
const d=document,
w=window;
const API_KEY="aa96fabe1767406cca8c0fa756186e46";

d.addEventListener("DOMContentLoaded",(e)=>{
    onLoad();

});

const fetchData=async (position)=>{
    const {latitude,longitude}=position.coords;
    
  try {
    let res= await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
    let json=await res.json();
    if(!res.ok) throw {status:res.status,statusText:res.statusText};
    setWeatherData(json); 

  } catch (err) {
     let message =err.statusText || "ocurrio un error";
  }

}

const onLoad=()=>{
    navigator.geolocation.getCurrentPosition(fetchData)
    console.log(navigator.geolocation);
};
const setWeatherData=(data)=>{
  const weatherData={
    location:data.name,
    description:data.weather[0].main,
    humidity:data.main.humidity,
    pressure:data.main.pressure,
    temperature:data.main.temp,
    date:getDate(),
  };

  Object.keys(weatherData).forEach(key=>{
    d.getElementById(key).textContent=weatherData[key];
  });
  cleanUp();
};

const getDate=()=>{
  let date=new Date();
  return` ${date.getDate()}-${('0'+(date.getMonth())).slice(-2)}-${date.getFullYear()}`
}
const cleanUp=()=>{
  let container=d.getElementById('container');
  let loader=d.getElementById('loader');

  loader.style.display="none";
  container.style.display="flex";
}

    
