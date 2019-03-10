import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ENDPOINT } from '../../Values';
import {connect} from "react-redux";
import {SignIn} from "../../Redux/Action"
class Login extends React.Component {
    Login(e){
        e.preventDefault();
        this.props.SignIn(this.email.value,this.password.value);
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
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
       
    };
};
const mapDispatchToProps = {
    SignIn
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);