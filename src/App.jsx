import {useState, useEffect } from 'react';
import './App.css'
import Figure from './Figure';

const NASA_URL = "https://api.nasa.gov/";
const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;
const MARS_URL= "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/";

function App() {
  const today = new Date(Date.now()).toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [apodData, setApodData]= useState({});
  const [marsData, setMarsData]= useState({});
  const [category, setCategory]= useState('apod');
  const [message, setMessage]= useState('');


  useEffect(()=> {  
     
    getData();

  }, [date, category]);


  const getData=()=> {
    setMessage("");
    const selectedDateTime= new Date(date).getTime();
    const todaysTime= new Date().getTime();

    if(selectedDateTime > todaysTime){
      setMessage("No photo is available");
    }
    else{
      if(category === 'apod'){
      fetch(`${NASA_URL}planetary/apod?date=${date}&api_key=${NASA_API_KEY}`)
      .then(res=> res.json())
      .then(res=> {
        // console.log(res)
        setApodData(res);
      })
      .catch(err=> console.log(err));
      }
      if(category === 'mars rovers'){
        fetch(`${MARS_URL}photos?earth_date=${date}&api_key=${NASA_API_KEY}`)
        .then(res=> res.json())
        .then(res=> {
        // console.log(res.photos[0])
        setMarsData(res.photos[0]);
        })
        .catch(err=> console.log(err));
      }
    }
    
  }

  const handleInput = (ev) => {
    setDate(ev.target.value.toLocaleString()); 
  }

  const handleSelect=(ev)=> {
     setCategory(ev.target.value);
  }

  return (
    <>
       <h1>{category === 'apod' ? 'Astronomical Picture of the Day' : 'Mars Rovers Picture of the Day'}</h1>
       <h3>This image corresponds to the date - {date}</h3>
       <div>
         <input type="date" value={date} onChange={ handleInput }/>
         <select value={category} onChange={ handleSelect }>
           <option value="apod">Apod</option>
           <option value="mars rovers">Mars Rovers</option>
         </select>
       </div>
       {message === "" ? <Figure apodData={apodData} marsData={marsData} category={category}/> : <p className="message">{message}</p>
      }
    </>
  )
}

export default App;
