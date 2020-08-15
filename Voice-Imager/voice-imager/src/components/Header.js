import React from 'react';
import bootstrap from "../../../node_modules/bootstrap/dist/css/bootstrap.css"

const Header = () => {
    return ( 
        <div className="col-xs-12 m-3">
            <div className="row justify-content-center m-5">
           <u><h1 className="display-1"> Voice Imager</h1></u>
           </div>
           <div className="row justify-content-center m-5">
           <h4 className="display-4">Create Image Designs with just voice commands</h4>
           </div>
           <div className="row justify-content-center m-5">
           <btn className="btn btn-primary btn-lg p-3">Get Started</btn>
           </div>
        </div>
     );
}
 
export default Header;