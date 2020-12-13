
/* Global Variables */
let baseURL='https://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey='&appid=6b5fc034d37d04178c6612f7e4a79c84';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

//Add event Listener to button generate
document.getElementById('generate').addEventListener('click',generate);

function generate()
{

    const zipCode=document.getElementById('zip').value;
    const feeling=document.getElementById('feelings').value;
    getData(baseURL,zipCode,apiKey).then(function(data){
        
        postData('/all',{Temp:data.main.temp ,date:newDate,feeling:feeling});
    })
    .then(updateUI());
}

//GET data from API
const getData=async(baseURL,zipCode,apiKey)=>{
    const response=await fetch(baseURL+zipCode+apiKey);

    try {
        const data=await response.json();
        return data;
    } catch (error) {
        console.log(error);  
    }
}

//POST data to server
const postData=async(url='',data={})=>{
    console.log("post data");
    const res= await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
       // Body data type must match "Content-Type" header        
        body: JSON.stringify(data), 
      });
      console.log("post data after");
        console.log(res);
        
        try {
            const newData = await res.json();
            
            console.log(newData);
            return ;
        } catch (error) {
            console.log(error);
            
        }
}

//Update UI
const updateUI=async()=>{
    const request=await fetch('/allData');
    try {
        
        const dataUpdated=await request.json();
        console.log(dataUpdated);
        document.getElementById('temp').innerHTML=dataUpdated.Temperature;
        document.getElementById('date').innerHTML=dataUpdated.Date;
        document.getElementById('content').innerHTML=dataUpdated.feelings;

    } catch (error) {
        
        console.log(error);
    }
}
