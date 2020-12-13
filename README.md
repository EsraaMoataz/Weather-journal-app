# Weather-journal-app
Objective:

    creating an asynchronous web app that uses Web API 
    
    and user data to dynamically update the UI for a Weather-Journal App.
    
 project files:
 
    1- website
    
        -> index.html
        -> style.css
        -> app.jsS
        
    2- server.js
    
Steps taken to build the weather web app:
    
1- Get data from API:
    
Write an async function in app.js that uses fetch() to make a GET request to the OpenWeatherMap API with the parameters:

    base url
    user entered zip code (see input in html with id zip)
    personal API key
    
                const getData=async(baseURL,zipCode,apiKey)=>{
                const response=await fetch(baseURL+zipCode+apiKey)
                try {
                  const data=await response.json();
                  console.log('Exits get API in app.js');
                  return data;
                  } catch (error) {
                        console.log(error);  
                        }
                }
                
2- post Data to the server:

store both data recieved from the API & the data entered by the user in an object in the server (projectData).

server side code:

    app.post('/all',postWeather);
    function postWeather(req,res){
    projectData['Temperature']=req.body.Temp;
    projectData['Date']=req.body.date;
    projectData['feelings']=req.body.feeling;}
    
client side code:

    const postData=async(url='',data={})=>{
    const res= await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
       // Body data type must match "Content-Type" header        
        body: JSON.stringify(data), 
      });

      try {
            const newData = await res.json();
            return ;
        } catch (error) {
            console.log(error);
            
        }
    }
    
3- update web app with data posted in the server:

server side code:

    app.get('/all',getWeather);
    function getWeather(req,res){
    res.send(projectData);}
    
client side code:

    const updateUI=async()=>{
    const request=await fetch('/all');
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
