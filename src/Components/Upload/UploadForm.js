import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../../../node_modules/axios';
import { ENDPOINT } from '../../Values';
import {connect} from "react-redux";
class UploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleUpload = this.handleUpload.bind(this);
    this.getImage = this.getImage.bind(this);
    this.addBook = this.addBook.bind(this);
  }
  state = {
    tags: null,
    UploadResponse : " "
  }

  handleUpload(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInputs.files[0]);
    console.log(data);
    fetch(ENDPOINT + 'upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        this.setState({UploadResponse : body.status});
      });
    });
  }
  isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
  }
  addBook(e){
    e.preventDefault();
    
    let tags = [];
    this.state.tags.map((el) =>{
      if(el.checked) tags.push(el.id);
    });
    const data = new FormData();
    data.append("title" , this.title.value);
    data.append("author" , this.author.value);
    data.append("artist" , this.artist.value);
    data.append("rating" , 0.00);
    data.append("description" , this.description.value);
    data.append("status" , this.status.value);
    data.append("tags",tags);
    data.append('file', this.uploadInput.files[0]);
    data.append("token", this.props.token);
    const check = !this.isEmptyOrSpaces(this.title.value) 
    && !this.isEmptyOrSpaces(this.author.value) 
    && !this.isEmptyOrSpaces(this.description.value) 
    && !this.isEmptyOrSpaces(this.status.value) 
  
    if(check){
      fetch(ENDPOINT + 'addBook', {
        method: 'POST',
        body: data,
      }).then((response) => {
         console.log(response);
       //  this.setState({UploadResponse : body.status});
      });
    }
   
  }
  getImage(ev){
    ev.preventDefault();
    let url;
    if(this.imageFolder.value){
      url = ENDPOINT + "image/" + this.imageFolder.value + "/" +this.imageID.value + ".jpg";
    }else{
      url = ENDPOINT + "image/NoFolder" + this.imageID.value + ".jpg";
    }
    this.setState({imageURL : url});
  }
  getTags=()=>{
    axios.get(ENDPOINT + 'getAllTags').then((response) => {
      let data =response.data.rows;
      data.map((el,index) => {
        el.key ="tagCheckbox_" + index;
        el.checked = false;
      })
      
      this.setState({tags:data});
    });
  }
  onCheckBoxChange(e,item){
    const isChecked = e.target.checked;
    const index = parseInt(e.target.id.split("_").pop())
    const tags = this.state.tags
    tags[index].checked = isChecked;
    
    this.setState({tags:tags});
  }
  componentWillMount(){
    this.getTags();
  }
  render() {
    var redstar = {
      color: 'red',
    }
    return (
      <div className="row">
      <div className="col-lg-10 mx-auto"> 
        <h1>Upload Title</h1>
        <form onSubmit={(e) => this.addBook(e)}>
          <div className="row">
            <div className="col-12 pb-2">
              <p>ThumbNail<span style={redstar}>*</span></p>
              <input ref={(ref) => { this.uploadInput = ref; }} type="file" className="form-file-control"/>
            </div>
            
            <div className="col-12 pb-2">
              <p>Title<span style={redstar}>*</span></p>
              <input ref={(ref) => { this.title = ref; }} type="text" className="form-control"/>
            </div>
            <div className="col-12 pb-2">
              <p>Author<span style={redstar}>*</span></p>
              <input ref={(ref) => { this.author = ref; }} type="text" className="form-control"/>
            </div> 
            <div className="col-12 pb-2">
              <p>Artist</p>
              <input ref={(ref) => { this.artist = ref; }} type="text" className="form-control"/>
            </div>
            <div className="col-12 pb-2">
              <p>Description<span style={redstar}>*</span></p>
              <textarea ref={(ref) => { this.description = ref; }} type="text" className="form-control"/>
            </div>
            <div className="col pb-2">
            <p>Tags</p>
              <div className="row">
              {this.state.tags ? this.state.tags.map(item => (
                   <div className="col-6 col-md-4 col-lg-3 col-xl-2" key={item.id}>
                    <input type="checkbox" id={item.key} onChange={(e) => this.onCheckBoxChange(e,item)} />
                    <label htmlFor={item.key}>{item.id}</label>
                  </div>
              )) : null}
              </div>
            </div>
            <div className="col-12 pb-2">
              <p>status<span style={redstar}>*</span></p>
              <select ref={(ref) => { this.status = ref; }} className="form-control">
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="col-12 pb-2">
              <button>Add Book</button>
            </div>
            <p>{this.state.UploadResponse}</p>
          </div>
        </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
    return {
        token : state.token,
    };
};
const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(UploadForm);