import React, { useEffect, useState } from 'react';
import bootstrap from "../../../node_modules/bootstrap/dist/css/bootstrap.css"
import axios from "../../../node_modules/axios/dist/axios"




const ImageArea = () => {
    const [islistening, setIsListening] =useState(false)
    const [words, setWords]=useState("");
    const [links, setLinks]=useState([]);


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
        
        
        
        parseWords(event.results[event.results.length-1][0].transcript);
        
       
    }
    useEffect(()=>{
        recognition.start();
    },[])

    useEffect(()=>{
        if(words!=""){
            const headers= {
                "headers":{
                "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
                "x-rapidapi-key": "secret"
                }
            }
            
            axios.get(`https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?autoCorrect=false&pageNumber=1&pageSize=10&q=${words}&safeSearch=false`,headers)
        .then(response => {
            
            updateLinks(response.data.value[0].thumbnail)
        })
        .catch(err => {
            console.log(err);
        });
    }
    },[words])

   
   
    const parseWords=(sentence)=>{
        let finals="";
        sentence=sentence.split(" ")
        for(let word of sentence)
        {
            if(word!="draw" && word!="a")
            {
                finals+=word+" "
            }
        }
        setWords(finals)
        
    }

    const updateLinks=(link)=>{
        /*
        let temp=links;
        temp[word.slice(0,-1)]=link;
        console.log(temp["dog"])
        */
        setLinks((oldArray)=>[...oldArray,link]);
    }
    return ( 
        <div className="row justify-content-center">
            <div>
                {links.map((link)=>(
                 <img  src={link}/>
                ))}
            </div>
        </div>
     );
}

 
export default ImageArea;
