import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../../../../node_modules/axios';
import { ENDPOINT } from '../../../Values';
import {
  Link,
} from "react-router-dom";
class CatalogItem extends Component {
 
  render() {
    var redstar = {
      color: 'red',
    }
    //<p>description: {this.props.data.description}</p>
    return (
      
      <div className="col-6 col-md-6 col-lg-3">
      <div className="CatalogCard">
        <Link to={`/Detail/${this.props.data._id}`}>
          <img className="img-fluid CatalogCardImage" src={(ENDPOINT+"public/thumbnails/") + this.props.data._id.replace(/[/\\?%*:|"<>. ]/g, '-')} alt="xd" />
          <div className="CatalogCardTitleContainer">
            <span className="CatalogCardTitle">{this.props.data._id}</span>
          </div>
        </Link>
        </div>
      </div>
    );
  }
}
/**/
/* */
export default CatalogItem;