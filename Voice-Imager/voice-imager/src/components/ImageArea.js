import React, { useEffect, useState, useRef } from 'react';
import bootstrap from "../../../node_modules/bootstrap/dist/css/bootstrap.css"
import axios from "../../../node_modules/axios/dist/axios"
import "../App.css"



const ImageArea = ({ handleColor, handleImage}) => {
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
            let temptemp=tempwords.slice();
            temptemp.splice(0,1)
            let searchwords=temptemp.join(" ");
            console.log("name: ",searchwords)

           if(tempwords[1]=="background" && tempwords[2]=="color"){
               handleColor(tempwords.slice(4).join(" "))
               console.log("color: ",tempwords.slice(4).join(" ").trim())
           }
            if(tempwords[0]=="draw"){
                if(searchwords!==""){
            const headers= {
                "headers":{
                "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
                "x-rapidapi-key": "d5dedf0503mshd5df683c1996f5ap154385jsn6d5327764ac2"
                }
            }
            
            axios.get(`https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?autoCorrect=false&pageNumber=1&pageSize=10&q=${searchwords}%20clipart&safeSearch=false`,headers)
        .then(response => {
            let temp={}
            temp['name']=searchwords
            temp["url"]=response.data.value[0].thumbnail;
            temp["left"]=0;
            temp["top"]=0;
            setLinks(links=>[...links,temp])
            
        })
        .catch(err => {
            console.log(err);
        });
    }
            }
    else if(tempwords[0]=="move"){
        let tempLinks=links;
        
        let name=tempwords.slice(1,tempwords.length-1).join(" ");
        
        for (let i=0;i<links.length;i++){
            if(links[i]["name"]==name){
                if(tempwords[tempwords.length-1]=="down"){
                   tempLinks[i]["top"]+=100;
                   break
                }
                if(tempwords[tempwords.length-1]=="up"){
                   tempLinks[i]["top"]-=100;
                   break
                }
                if(tempwords[tempwords.length-1]=="left"){
                   tempLinks[i]["left"]-=100;
                   break
                }
                if(tempwords[tempwords.length-1]=="right"){
                   tempLinks[i]["left"]+=100;
                   break
                }
                setLinks(tempLinks)
            }
            
        }
    }

    else if(tempwords[0]=="delete"){
        let templinks=links;
        let name=tempwords.slice(1).join(" ");

        for (let i=0;i<links.length;i++){
            if(links[i]["name"]==name){
                links.splice(i,1);
                setLinks(links)
        }
    }

}
    handleImage();
        }
    
    

    setWords("")
    
    },[words])
    
    
    const parseWords=(sentence)=>{
        let finals="";
        sentence=sentence.split(" ")
        for(let word of sentence)
        {
            if(word!="a" && word!="the"  && word!="an")
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
