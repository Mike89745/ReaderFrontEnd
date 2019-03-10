import React from 'react'
import {Line} from 'rc-progress';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ENDPOINT } from '../../../Values';
import {connect} from "react-redux";
class ChapterUpload extends React.Component {
    state = {
        Files : null,
        uploadType : "Images",
        UploadProgress : 0,
        error : null
    }
    onDrop = (acceptedFiles, rejectedFiles) => {
     this.setState({Files:acceptedFiles});
    }
    UploadChapter = (e) =>{
        this.setState({UploadProgress:0})
        e.preventDefault();
        let size = 0;
        for (let i = 0; i < this.files.files.length; i += 1) {
            size +=  this.files.files[i].size;
        }
        if( this.UploadType.value != "IMAGE" && this.files.files.length > 1){
            return null;
        }
        for (let i = 0; i < this.files.files.length; i += 1) {
            if( this.UploadType.value === "IMAGE" && this.files.files[i].type != "image/jpeg" && this.files.files[i].type != "image/png"){
                this.setState({error : "Invalid file Type"})
                return null;
            }
            if( this.UploadType.value === "PDF" && this.files.files[i].type != "application/pdf"){
                this.setState({error : "Invalid file Type"})
                return null;
            }
            if( this.UploadType.value === "EPUB" && this.files.files[i].type != "application/epub+zip"){
                this.setState({error : "Invalid file Type"})
                return null;
            }
        }
        const chapter = {
            book_id :  this.BookID.value,
            number : this.number.value,
            title : this.title.value,
            dateAdded : new Date().toDateString(),
            size : size,
            pages : this.files.files.length,
            type : this.UploadType.value,
            token : this.props.token
        }
       
        fetch(ENDPOINT+ 'addChapter', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(chapter),
        }).then(response =>{
            return response.json()
        }).then((response) => {
            let progressValue = 100/this.files.files.length;
            this.setState({length : this.files.files.length,progress: 0})
            for (let i = 0; i < this.files.files.length; i += 1) {
                const data = new FormData();
                size +=  this.files.files[i].size;
                data.append('file', this.files.files[i]);
                data.append("book_id" , this.BookID.value);
                data.append("chapterName",  this.number.value + "-" +  this.title.value.replace(/[/\\?%*:|"<>. ]/g, '-'))
                data.append("token",this.props.token);
                fetch(ENDPOINT+ 'upload/image', {
                    method: 'POST',
                    body: data,
                  }).then(response =>{
                    return response.json()
                }).then((response) => {
                    let progressState = this.state.UploadProgress;
                    progressState += progressValue;
                    let progress = this.state.progress
                    progress++;
                    this.setState({UploadProgress : progressState,progress:progress})
              //      console.log(response);
                }).catch(error => {
                 //   console.log(error);
                });
            }
        }).catch(error => {
            console.log(error);
        });
   }
   componentDidMount(){
        this.BookID.value = this.props.match.params.BookID;
   }
   SelectChange(e){
       this.setState({uploadType : e.target.value})
   }
   render() {
    var redstar = {
        color: 'red',
      }
    return (
        <div className="col-lg-8 d-block mx-auto">
            {this.state.error ? <p>{this.state.error}</p> : null}
            <form onSubmit={(e) => this.UploadChapter(e)}>
              <div className="row ">
                <div className="col-12 pb-2">
                    <p>BookID<span style={redstar}>*</span></p>
                    <input type="text" className="form-control" ref={(ref) => { this.BookID = ref; }} disabled/>
                </div>
                <div className="col-12 pb-2">
                    <p>Chapter Type</p>
                    <select ref={(ref) => { this.UploadType = ref; }} onChange={e => this.SelectChange(e)} className="form-control">
                        <option value="IMAGE">Images</option>
                        <option value="PDF">PDF</option>
                        <option value="EPUB">EPUB</option>
                    </select>
                </div>
                <div className="col-12 pb-2">
                    <input type="file" className="form-control-file" ref={(ref) => { this.files = ref; }} multiple/>
                </div>
                    <p>{this.state.UploadResponse}</p>
                <div className="col-12 pb-2">
                  <p>Title<span style={redstar}>*</span></p>
                  <input ref={(ref) => { this.title = ref; }}  className="form-control" type="text" />
                </div>
                <div className="col-12 pb-2">
                  <p>number<span style={redstar}>*</span></p>
                  <input ref={(ref) => { this.number = ref; }}  className="form-control" type="text" />
                </div>
                <div className="col-12 pb-2">
                    <button>Add chapter</button>
                </div>
              </div>
          </form>
          <div className="row">
            <div className="col-12 p-3">
                <Line percent={parseInt(Math.floor(this.state.UploadProgress))} strokeWidth="1" strokeColor="#00b211" />
            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(ChapterUpload);