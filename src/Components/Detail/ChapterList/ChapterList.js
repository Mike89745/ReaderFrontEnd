import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ENDPOINT } from '../../../Values';
import Chapter from './Chapter/Chapter';
export default class ChapterList extends React.Component {
    state = {
        Chapters : null,
        ChaptersLoading : false,
        error : false,
    }
    RemoveChapterAt=(index)=>{
        let Chapters = this.state.Chapters;
        Chapters.splice(index,1);
        this.setState({Chapters : Chapters});
    }
    LoadChapters(){
        fetch(ENDPOINT + 'getChapters/' + this.props.BookID).then(response =>{
            return response.json()
        }).then((response) => {
            this.setState({Chapters : response.docs, ChaptersLoading : false,error:false});
        }).catch(error => {
            this.setState({error:true})
        });
    }
    componentWillMount(){
        this.LoadChapters();
    }
    render(){
        return(
            <div className="col-12">
                <div className="row"> 
                    {this.state.Chapters ? this.state.Chapters.map((item,index) =>
                            <Chapter chapter={item} key={index} RemoveChapterAt={this.RemoveChapterAt} index={index}/>
                        ) : null}
                </div>
             </div>
        )
    }
}