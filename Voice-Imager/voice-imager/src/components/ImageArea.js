import React, { useEffect, useState } from 'react';
import bootstrap from "../../../node_modules/bootstrap/dist/css/bootstrap.css"
const ImageArea = () => {
    const [islistening, setIsListening] =useState(false)
    const [words, setWords]=useState("");



    const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;   
     let listening=false;
    const recognition=new SpeechRecognition();
    recognition.continuous=true;
    recognition.interimResults=false;

    const start=()=>{
        setIsListening(true);
        recognition.start();

    };
    

    recognition.onresult=(event)=>{
        
        console.log(event.results[event.results.length-1][0].transcript);
        
        setWords(event.results[event.results.length-1][0].transcript);
    }
    useEffect(()=>{
        recognition.start();
    },[])



    return ( 
        <div className="row justify-content-center">
            <div>
                <h1  className="display-1 mt-5">{words}</h1>
            </div>
        </div>
     );
}
 
export default ImageArea;