
const d=document,
w=window;
const API_KEY="aa96fabe1767406cca8c0fa756186e46";

d.addEventListener("DOMContentLoaded",(e)=>{
    onLoad();

});

const fetchData=async (position)=>{
    const {latitude,longitude}=position.coords;
    console.log(position); 
    console.log(latitude);
    console.log(longitude);
  try {
    let res= await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
    let json=await res.json();
    if(!res.ok) throw {status:res.status,statusText:res.statusText};
    console.log(json);
    setWeatherData(json); 

  } catch (err) {
      console.log(err);
     let message =err.statusText || "ocurrio un error";
  }

}

const onLoad=()=>{
    navigator.geolocation.getCurrentPosition(fetchData)
    console.log(navigator.geolocation);
};
const setWeatherData=(data)=>{
  console.log(data);
  const weatherData={
    location:data.name,
    description:data.weather[0].main,
    humidity:data.main.humidity,
    pressure:data.main.pressure,
    temperature:data.main.temp,
    date:getDate(),
  };
  console.log(weatherData);

  Object.keys(weatherData).forEach(key=>{
    console.log( d.getElementById(key).textContent=weatherData[key]);
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

    
