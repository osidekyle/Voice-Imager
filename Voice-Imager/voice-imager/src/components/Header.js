import React,{useState} from 'react';
import bootstrap from "../../../node_modules/bootstrap/dist/css/bootstrap.css"
import { CSSTransition } from 'react-transition-group';
import "../App.css"

const Header = ({handleClick}) => {


    const [emptyButton, setEmptyButton]=useState(false);



    return ( 
        <div className="col-xs-12 mt-3">
            <div className="row justify-content-center mt-5">
           <u><h1 className="display-1"> Voice Imager</h1></u>
           </div>
           <div className="row justify-content-center mt-5">
           <h4 className="display-4" >Create Image Designs with just voice commands</h4>
           </div>
           
           <div className="row justify-content-center mt-5">
          
           <button className="p-4 goButton" onClick={handleClick} >Get Started</button>
   
           </div>
           
        </div>
     );
}
 
export default Header;