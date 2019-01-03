import React, { Component } from 'react';
import UploadForm from "./Components/Upload/UploadForm"
import Catalogs from './Components/Catalog/CatalogView';
import ChapterUpload from './Components/Upload/ChapterUpload/ChapterUpload';
class App extends Component {
  componentDidMount(){
  }
  test(){
    fetch('http://localhost:8000/test/', {
      method: "GET",
    }).then(response =>{
        return response.json()
    }).then((response) => {
        console.log(response);
    }).catch(error => {
        console.log(error);
    });
  }
  render() {

    return (
      <div className="container">
        <ChapterUpload book_id="Berserk"/>
        <button onClick={this.test}>Test</button>
      </div>
    );
  }
}
/* <UploadForm/>
<Catalogs/>*/
//  <button onClick={this.test}>Test</button>

export default App;