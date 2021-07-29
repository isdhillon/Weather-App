//declarations
let searchBtn=document.querySelector(".search-btn")
let input=document.querySelector(".input")
const apiKey="43cb09341f67a86e3b7e622576a41b75";
let weatherContainer=document.querySelector(".weather-container");
//current entered city array
let cityArr=[];
//search btn
searchBtn.addEventListener("click",function(){
    //getting the input from user
    let selectedCity=input.value.toLowerCase();
    for(let i=0;i<cityArr.length;i++)
    {
        let currentCity=cityArr[i].toLowerCase();
        //if the city doesnt exist
        if(currentCity!=selectedCity){
        }
        else{
            //if exists
            alert("enter a valid city");
            return;
        }
    }
    //call the function for the selected city
    fetchData(selectedCity);
    input.value=""
    
})
function fetchData(selectedCity){
    //url of api
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}&units=metric`;
    //fetch from url
    fetch(url)
    //getting the json data
    .then(response=>response.json())
    //getting the object
    .then(data=>{
        //getting variables from object
        const {name,weather,main}=data;
        //getting the icon 
        let icon=`https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
            weather[0]["icon"]
          }.svg`;
          //creating element
          let weatherCard=document.createElement("div");
          weatherCard.setAttribute("class","weather-card")
          weatherCard.innerHTML=`
          <div class="city">${name}</div>
          <div class="temperature">${Math.round(main.temp)}<sup>°C</sup></div>
          <div class="icon"><img src="${icon}"></div>
          <div class="weather-info">${(weather[0]["description"]).toUpperCase()}</div>`
          weatherContainer.appendChild(weatherCard);
          //clearing input field
          input.value="";
          //pushing the data in array
          cityArr.push(name);

    })
    //if any error occurs
    .catch(()=>{
        alert("enter a valid city name");
    })
}