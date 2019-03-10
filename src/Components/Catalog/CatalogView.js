import React, { Component } from 'react';
import axios from '../../../node_modules/axios';
import CatalogItem from './CatalogItem/CatalogItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ENDPOINT} from "../../Values";
import TriStateCheckBox from './TriStateCheckBox/TriStateCheckBox';
import {
  Link,
} from "react-router-dom";
class CatalogView extends Component {
  state ={
    data:[],
    tags:[],
  }
  getCatalogItems = () =>{
    fetch(ENDPOINT+'getBooks/1').then(response =>{
        return response.json()
    }).then((response) => {
        let data = this.state.data;
        response.rows.map(el => data.push(el));
        this.setState({data : data,})
    }).catch(error => {
        this.setState({loading : false,error: true});
    });
  }
  getTags=()=>{
    axios.get(ENDPOINT +'getAllTags').then((response) => {
      let data =response.data.rows;
      data.map((el,index) => {
        el.key ="tagCheckbox_" + index;
        el.checked = false;
      })
      
      this.setState({tags:data});
    });
  }
  Search(e){
    e.preventDefault();
    let CheckedTags = [];
    let IndeterminateTags = [];
    this.state.tags.map(tag => {
        if(this.tagsRefs[tag.id].isChecked())
          CheckedTags.push( this.tagsRefs[tag.id].getID())
        else{
          if(this.tagsRefs[tag.id].isIndeterminate()) IndeterminateTags.push( this.tagsRefs[tag.id].getID())
        }
    });
    fetch(ENDPOINT+'Search/', {
        method: 'POST',
        body: JSON.stringify({text: this.SearchRef.value, INtags: CheckedTags,NINtags : IndeterminateTags})
      }).then(response =>{
        return response.json()
    }).then((response) => {
        let data = [];
        response.docs.map(el => data.push({doc:el}));
        this.setState({data : data,})
    }).catch(error => {
        this.setState({loading : false,error: true});
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
    this.getCatalogItems();
    this.getTags();
  }
  render() {
    return (
      <div className="row">
        <div className="col-12 py-3">
          <form onSubmit={(e) => this.Search(e)}>
            <div className="row">
              <div className="col-12 col-lg-3">
                <input ref={(ref) => { this.SearchRef = ref; }} className="form-control" placeholder="search..."/>
              </div>
              <button>Search</button>
              <div className="col-8 d-flex">
                <Link to="/AddBook" className="btn LinkButton">Add new Book</Link>
              </div>
            </div>
            <div className="col pb-2">
              <div className="row">
              {this.state.tags ? this.state.tags.map(item => (
                   <div className="col-6 col-md-4 col-lg-3 col-xl-2" key={item.id}>
                    <TriStateCheckBox text={item.id} ref={(ref) => this.tagsRefs = {...this.tagsRefs, [`${item.id}`]: ref}}></TriStateCheckBox>
                  </div>
              )) : null}
              </div>
            </div>
          </form>
        </div>
        <div className="col pb-2">
            <div className="row d-flex justify-content-center  justify-content-md-start">        
                {this.state.data ? this.state.data.map((item,index) => (
                  
                    <CatalogItem data={item.doc} key={item.doc._id}/>
                  
                )) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default CatalogView;