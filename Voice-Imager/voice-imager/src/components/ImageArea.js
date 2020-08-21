import React, { useEffect, useState, useRef } from 'react';
import bootstrap from "../../../node_modules/bootstrap/dist/css/bootstrap.css"
import axios from "../../../node_modules/axios/dist/axios"
import "../App.css"



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
        console.log(event.results[event.results.length-1][0].transcript)
       
    }
    useEffect(()=>{
        recognition.start();
    },[])

    useEffect(()=>{
        if(words!=""){
            let tempwords=words.trim().split(" ");
            console.log(tempwords)
            if(tempwords[0]=="draw"){
            const headers= {
                "headers":{
                "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
                "x-rapidapi-key": "d5dedf0503mshd5df683c1996f5ap154385jsn6d5327764ac2"
                }
            }
            
            axios.get(`https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?autoCorrect=false&pageNumber=1&pageSize=10&q=${tempwords[1]}%20clipart&safeSearch=false`,headers)
        .then(response => {
            let temp={}
            temp['name']=tempwords[1]
            temp["url"]=response.data.value[0].thumbnail;
            temp["left"]=0;
            temp["top"]=0;
            setLinks(links=>[...links,temp])
            
        })
        .catch(err => {
            console.log(err);
        });
    }

    else if(tempwords[0]=="move"){
        console.log("got move")
        for (let i=0;i<links.length;i++){
            if(links[i]["name"]==tempwords[1]){
                console.log("got name")
                if(tempwords[2]=="down"){
                    console.log("got down")
                   let tempLinks=links;
                   tempLinks[i]["top"]+=100;
                   setLinks(tempLinks)
                }
                if(tempwords[2]=="up"){
                    console.log("got down")
                   let tempLinks=links;
                   tempLinks[i]["top"]-=100;
                   setLinks(tempLinks)
                }
                if(tempwords[2]=="left"){
                    console.log("got down")
                   let tempLinks=links;
                   tempLinks[i]["left"]-=100;
                   setLinks(tempLinks)
                }
                if(tempwords[2]=="right"){
                    console.log("got down")
                   let tempLinks=links;
                   tempLinks[i]["left"]+=100;
                   setLinks(tempLinks)
                }
            }
        }
    }

    setWords("")
    }
    },[words])
    
    
    const parseWords=(sentence)=>{
        let finals="";
        sentence=sentence.split(" ")
        for(let word of sentence)
        {
            if(word!="a" && word!="the")
            {
                finals+=word+" "
            }
        }
        setWords(finals)
        
    }
    const imageStyle={
        positon:"relative",
        padding:0,
        margin:0
    }
    return ( 
        <React.Fragment>
                {links.map((link)=>(
                 <img src={link.url} className="image" alt={link.name} id={link.name} style={{left:link["left"],top:link["top"]}}/>
                ))}
           </React.Fragment>
     );
}

 
export default ImageArea;
