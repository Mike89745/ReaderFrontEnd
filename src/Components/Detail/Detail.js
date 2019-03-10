import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ENDPOINT } from '../../Values';
import ChapterList from './ChapterList/ChapterList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faBookMedical } from '@fortawesome/free-solid-svg-icons'
import {
    BrowserRouter as Router,
    Link,
    
  } from "react-router-dom";
  import Modal from "react-responsive-modal";
  import {connect} from "react-redux";
import history from '../../history';
class Detail extends React.Component {
    state = {
        Book : null,
        BookLoading : false,
        error : false,
        open: false
    }
    LoadBook(){
        fetch(ENDPOINT + 'getBook/' + this.props.match.params.BookID).then(response =>{
            return response.json()
        }).then((response) => {
            console.log(response)
            this.setState({Book : response.docs[0], BookLoading : false,error:false});
        }).catch(error => {
            this.setState({error:true})
        });
    }
    deleteBook =()=>{
        fetch(`${ENDPOINT}deleteBook`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({id:this.state.Book._id,token:this.props.token}),
        }).then((response) => {
            return response.json()
        }).then((response) => {
        }).catch(err => console.log(err));
        this.onCloseModal();
        history.push("/Catalogs");
    }
    onOpenModal = () => {
        this.setState({ open: true });
    };
    onCloseModal = () => {
        this.setState({ open: false });
    };
    componentWillMount(){
        this.LoadBook();
    }
    render(){
        return(
            this.state.Book ? <div className="col-12 DetailCardContainer">
            <div className="row">
                <div className="col-12 DetailCardTitle"> 
                    <p className="DetailCardTitleText">{this.state.Book._id}</p>
                </div>
                <div className="col-12">
                    <div className="row">
                        <div className="col-12 col-md-5">
                            <img className="img-fluid" src={(ENDPOINT+"public/thumbnails/") + this.state.Book._id.replace(/[/\\?%*:|"<>. ]/g, '-')} alt="xd" />
                        </div>
                        <div className="col">
                            <div className="row">
                                <div className="col-12 col-md-3">
                                    <p><b>Author</b></p>
                                </div>
                                <div className="col-12 col-md-9">
                                    <p>{this.state.Book.author}</p>
                                </div>
                            </div>
                            <div className="row DetailCardBorderTop">
                                <div className="col-12 col-md-3">
                                    <p><b>Artist</b></p>
                                </div>
                                <div className="col-12 col-md-9">
                                    <p>{this.state.Book.artist}</p>
                                </div>
                            </div>
                            <div className="row DetailCardBorderTop">
                                <div className="col-12 col-md-3">
                                    <p><b>Rating</b></p>
                                </div>
                                <div className="col-12 col-md-9">
                                    <p>{this.state.Book.rating}</p>
                                </div>
                            </div>
                            <div className="row DetailCardBorderTop"> 
                                <div className="col-12 col-md-3">
                                    <p><b>status</b></p>
                                </div>
                                <div className="col-12 col-md-9">
                                    <p>{this.state.Book.status}</p>
                                </div>
                            </div>
                            <div className="row DetailCardBorderTop"> 
                                <div className="col-12 col-md-3">
                                    <p><b>Tags</b></p>
                                </div>
                                <div className="col-12 col-md-9">
                                    {this.state.Book.tags ? this.state.Book.tags.map(item =>(
                                        <span className="tagContainer" key={item}>{item}</span>
                                    )) : null}
                                </div>
                            </div>
                            <div className="row DetailCardBorderTop"> 
                                <div className="col-12 col-md-3">
                                    <p><b>Description</b></p>
                                </div>
                                <div className="col-12 col-md-9">
                                    <p>{this.state.Book.description}</p>
                                </div>
                            </div>
                            <div className="row DetailCardBorderTop pt-2 "> 
                               
                            </div>     
                          
                        </div>
                        <div className="col-12 d-flex justify-content-end AddChapterButtonContainer pb-2">
                            <div className="p-2">
                                <Link to={`/AddChapter/${this.state.Book._id}`} className="btn LinkButton d-inline-flex"><FontAwesomeIcon icon={faBookMedical} className="align-self-center"/><p className="mb-0 ml-1"> Add new chapter</p></Link>
                            </div>
                            <div className="p-2">
                                <button onClick={this.onOpenModal} className="btn btn-danger d-inline-flex"><FontAwesomeIcon icon={faTrash} className="align-self-center"/><p className="mb-0 ml-1">Remove Book </p></button>
                            </div>
                        </div>   
                    </div>
                </div>
            </div>
            <Modal open={this.state.open} onClose={this.onCloseModal} center>
                    <h3 className="pt-4">Are you sure you want to delete this book?</h3>
                    <div className="d-inline-flex justify-content-end w-100">
                        <button className="btn btn-secondary m-2" onClick={this.onCloseModal}>Close</button>
                        <button className="btn btn-danger m-2" onClick={this.deleteBook}>Delete Book</button>
                    </div>
            </Modal>
            <ChapterList BookID={this.state.Book._id}></ChapterList>
          </div> : null
            
        )
    }
}
const mapStateToProps = state => {
    return {
        token : state.token,
    };
};
const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(Detail);