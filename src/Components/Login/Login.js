import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ENDPOINT } from '../../Values';
import {connect} from "react-redux";
import {SignIn} from "../../Redux/Action"
import history from '../../history'
import {
    withRouter
} from "react-router-dom";
class Login extends React.Component {
    state = {
        error : false,
        msg : null,
        signedIn : false,
    }
    Login(e){
        e.preventDefault();
        this.props.SignIn(this.email.value,this.password.value);
    }
    componentWillReceiveProps(nextProps){
            
        this.setState({error : nextProps.error,msg : nextProps.msg,signedIn : nextProps.signedIn});
    }
    render(){
        return(
            <div className="row justify-content-center h-100 align-items-center">
                <div className="col-8 col-lg-3">
                    <form onSubmit={(e) => this.Login(e)}>
                        <div className="row">
                            <div className="col-12 pb-2">
                                <p>Email :</p>
                                <input type="text" className="form-control" ref={(ref) => { this.email = ref; }}/>
                            </div>
                            <div className="col-12 pb-2">
                                <p>Password: </p>
                                <input type="password" className="form-control" ref={(ref) => { this.password = ref; }}/>
                            </div>
                            
                            <div className="col-12 pb-2 d-flex justify-content-end">
                                <button className="btn redstar">Login</button>
                            </div>
                            {this.state.error ? <div className="col-12 pb-2 d-flex ">
                                <span className="">{this.state.msg}</span>
                            </div> : null}
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        error : state.error,
        msg : state.msg,
        signedIn : state.signedIn
    };
};
const mapDispatchToProps = {
    SignIn
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));