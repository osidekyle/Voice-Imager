import React,{useEffect,useState} from 'react';
import Header from "./components/Header"
import Message from "./components/Message"
import ImageArea from "./components/ImageArea"
import {bounceInDown,bounceOutUp, fadeIn} from 'react-animations'
import styled, { keyframes } from 'styled-components';
import './App.css';

function App() {


  const Bounce = styled.div`animation: 2s ${keyframes`${bounceInDown}`} `;
  const BounceOutUp = styled.div`animation: 1s ${keyframes`${bounceOutUp}`}`;
  const FadeIn = styled.div`animation: 1s ${keyframes`${fadeIn}`}`;

  const [clicked, setClicked]= useState(false);
  const [rendered,setRendered]=useState(true);

  const handleClick=async (e)=>{
    e.preventDefault();
    setClicked(true);
    await new Promise(r => setTimeout(r, 1000));
    setRendered(false);
  }

  



  
  return (
    <div className="App container">
      {rendered ? clicked ? <BounceOutUp><Header style="display:none" /></BounceOutUp> :<Bounce><Header handleClick={handleClick}/></Bounce> : null}
      {rendered ? null : <FadeIn><Message/></FadeIn>}
      {rendered ? null : <FadeIn><ImageArea/></FadeIn>}
    </div>
  );
}

export default App;
