import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { ENDPOINT } from '../../../../Values';
import Modal from "react-responsive-modal";
export default class Chapter extends React.Component {
    state = {
        open: false,
    };
    deleteChapter =() =>{
        fetch(ENDPOINT + 'deleteChapter/' + this.props.chapter._id).then(response =>{
            return response.json()
        }).then((response) => {
           console.log(response);
        }).catch(error => {
            console.log(error);
        });
        this.onCloseModal();
        this.props.RemoveChapterAt(this.props.index);
    }
    onOpenModal = () => {
        this.setState({ open: true });
    };
    onCloseModal = () => {
        this.setState({ open: false });
    };
    render(){
        const chapter = this.props.chapter;
        return(
            <div className="ChapterContainer col-12 d-inline-flex p-2 justify-content-between DetailCardBorderTop">
                <div className="my-auto">
                    <p className="m-0">{chapter.number}.{chapter.title}</p>
                </div>
                <div className="">
                    <button className="btn btn-danger" onClick={this.onOpenModal}><FontAwesomeIcon icon={faTrash} /></button>
                </div>
                <Modal open={this.state.open} onClose={this.onCloseModal} center>
                    <h3 className="pt-4">Are you sure you want to delete this chapter?</h3>
                    <div className="d-inline-flex justify-content-end w-100">
                        <button className="btn btn-secondary m-2" onClick={this.onCloseModal}>Close</button>
                        <button className="btn btn-danger m-2" onClick={this.deleteChapter}>Delete chapter</button>
                    </div>
                </Modal>
            </div>
        )
    }
}