import React, { Component } from 'react';
import UploadForm from "../Upload/UploadForm"
import Catalogs from '../Catalog/CatalogView';
import ChapterUpload from '../Upload/ChapterUpload/ChapterUpload';
import Login from '../Login/Login';
import {
  BrowserRouter as Router,
  Route,
  Link,
  
} from "react-router-dom";
import Detail from "../Detail/Detail";
import { AuthRoute } from 'react-router-auth'
import {connect} from "react-redux";
class Layout extends Component {
    state={
        isSignedIn : false
    }
    componentWillReceiveProps(nextProps){
        this.setState({isSignedIn:nextProps.isSignedIn})
    }
    render() {
        return (
            <Router path="/" component={Login}>
            <div className="container">
                <ul>
                <li>
                    <Link to="/Catalogs">Catalogs</Link>
                </li>
                </ul>
                <Route path="/Login" component={Login} />
                <AuthRoute path="/AddChapter/:BookID" component={ChapterUpload} redirectTo="/login" authenticated={this.state.isSignedIn}/>
                <AuthRoute path="/AddBook" component={UploadForm} redirectTo="/login" authenticated={this.state.isSignedIn} />
                <AuthRoute path="/Catalogs" component={Catalogs} redirectTo="/login" authenticated={this.state.isSignedIn}/>
                <AuthRoute path="/Detail/:BookID" component={Detail} redirectTo="/login" authenticated={this.state.isSignedIn}/>
            </div>
            </Router>
        );
    }
}
const mapStateToProps = state => {
    return {
       isSignedIn : state.signedIn,
    };
};
const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(Layout);