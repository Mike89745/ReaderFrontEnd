import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../../../../node_modules/axios';
class CatalogItem extends Component {
  state = {
    chapters : null,
  }
  addChapter(e){
    e.preventDefault();
    const data = new FormData();
    data.append("book_id" , this.props.data._id);
    data.append("number" , this.number.value);
    data.append("title" , this.title.value);
    fetch('http://localhost:8000/addChapter', {
      method: 'POST',
      body: data,
    }).then((response) => {
        console.log(response);
      //  this.setState({UploadResponse : body.status});
    });
  }
  getChapters(){
    axios.get('http://localhost:8000/getChapters/' + this.props.data._id).then((response) => {
      this.setState({chapters:response.data.docs});
    });
  }
  componentWillMount(){
    this.getChapters();
  }
  render() {
    var redstar = {
      color: 'red',
    }
    //<p>description: {this.props.data.description}</p>
    return (
      <div className="col-12 col-md-6 col-lg-3">
        <img className="img-fluid" src={("http://localhost:8000/public/thumbnails/") + this.props.data._id.replace(/[/\\?%*:|"<>. ]/g, '-')} alt="xd" />
        <div>
            <h3>{this.props.data._id}</h3>
            <p>author : {this.props.data.author}</p>
            <p>artist : {this.props.data.artist}</p>
            <p>Rating : {this.props.data.rating}</p>
            <p>status : {this.props.data.status}</p>
            {this.props.data.tags ?this.props.data.tags.map(item =>(
                <span key={item}>{item}<br/></span>
            )) : null}
            <br/>
            <form onSubmit={(e) => this.addChapter(e)}>
              <div className="row">
                <div className="col-12 pb-2">
                  <p>Title<span style={redstar}>*</span></p>
                  <input ref={(ref) => { this.title = ref; }} type="text" />
                </div>
                <div className="col-12 pb-2">
                  <p>number<span style={redstar}>*</span></p>
                  <input ref={(ref) => { this.number = ref; }} type="text" />
                </div>
              </div>
              <div className="col-12 pb-2">
                <button>add chapter</button>
              </div>
          </form>
        </div>
        <div>
              {this.state.chapters ? this.state.chapters.map(item =>(
                <span key={item._id}>{item.number}-{item.title}<br/></span>
            )) : null} 
        </div>
      </div>
    );
  }
}
/**/
/* */
export default CatalogItem;