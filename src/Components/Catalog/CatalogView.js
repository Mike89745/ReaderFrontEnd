import React, { Component } from 'react';
import axios from '../../../node_modules/axios';
import CatalogItem from './CatalogItem/CatalogItem';
import 'bootstrap/dist/css/bootstrap.min.css';
class CatalogView extends Component {
  state ={
    data:[],
    tags:[],
  }
  getCatalogItems = () =>{
    fetch('http://localhost:8000/getBooks/1').then(response =>{
        return response.json()
    }).then((response) => {
        console.log(response);
        let data = this.state.data;
        response.rows.map(el => data.push(el));
        this.setState({data : data,})
    }).catch(error => {
        console.log(error,"Catalog")
        this.setState({loading : false,error: true});
    });
  }
  getTags=()=>{
    axios.get('http://localhost:8000/getAllTags').then((response) => {
      let data =response.data.rows;
      data.map((el,index) => {
        el.key ="tagCheckbox_" + index;
        el.checked = false;
      })
      
      this.setState({tags:data});
    });
  }
  Search(e){
    const data = new FormData();
    data.append("text" , this.SearchRef.value);
    data.append("INtags" , ["Action"]);
    data.append("NORtags", ["Comedy"]);
    e.preventDefault();
    fetch('http://localhost:8000/Search/', {
        method: 'POST',
        body: data,
      }).then(response =>{
        return response.json()
    }).then((response) => {
        console.log(response);
        let data = [];
        response.docs.map(el => data.push({doc:el}));
        this.setState({data : data,})
    }).catch(error => {
        console.log(error,"Catalog")
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
            <span className="px-3">Search</span>
            <input ref={(ref) => { this.SearchRef = ref; }}/>
            <button>Search</button>
            <div className="col pb-2">
              <div className="row">
              {this.state.tags ? this.state.tags.map(item => (
                   <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                    <input type="checkbox" id={item.key} onChange={(e) => this.onCheckBoxChange(e,item)} />
                    <label htmlFor={item.key}>{item.id}</label>
                  </div>
              )) : null}
              </div>
            </div>
          </form>
        </div>
      
        {this.state.data ? this.state.data.map((item,index) => (
          <CatalogItem data={item.doc} key={item.doc._id}/>
        )) : null}
      </div>
    );
  }
}

export default CatalogView;