import React,{useEffect,useState} from 'react';
import Header from "./components/Header"
import {bounceInDown,bounceOutUp} from 'react-animations'
import styled, { keyframes } from 'styled-components';
import './App.css';

function App() {


  const Bounce = styled.div`animation: 2s ${keyframes`${bounceInDown}`} `;
  const BounceOutUp = styled.div`animation: 1s ${keyframes`${bounceOutUp}`}`;
  

  const [clicked, setClicked]= useState(false);

  const handleClick=(e)=>{
    e.preventDefault();
    setClicked(true);
    console.log("clicked");
    console.log(clicked);
  }

  



  const hidden={
    display:"none"
  }
  return (
    <div className="App">
      {clicked ? <BounceOutUp><Header style="display:none" /></BounceOutUp> :<Bounce><Header handleClick={handleClick}/></Bounce> }
     
    </div>
  );
}

export default App;
