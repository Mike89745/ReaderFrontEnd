import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import {
    Link,
  } from "react-router-dom";
export default class Header extends React.Component {
    
    render(){
        return(
        <div className={"Header"}>
        <Link to="/Login" className="HeaderIcon"> <FontAwesomeIcon icon={faHome} /></Link>
           
        </div>
        )
    }
}