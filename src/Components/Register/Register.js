import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ENDPOINT } from '../../Values';
export default class Register extends React.Component {
    Register(e){
        /*
        Email regex : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        Password regex :  "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
        */
        e.preventDefault();
        const user = {
            password : this.password.value,
            email : this.email.value,
            nick : this.nick.value
        }
        fetch(`${ENDPOINT}Register`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(user),
        }).then((response) => {
            response.json().then((body) => {    
                console.log(body);
            });
        });
    }
    render(){
        var redstar = {
            color: 'red',
        }
        return(
        <form onSubmit={(e) => this.Register(e)}>
            <div className="row">
                <div className="col-12 pb-2">
                    <p>Nick<span style={redstar}>*</span></p>
                    <input type="text" ref={(ref) => { this.nick = ref; }}/>
                </div>
                <div className="col-12 pb-2">
                    <p>Email<span style={redstar}>*</span></p>
                    <input type="text" ref={(ref) => { this.email = ref; }}/>
                </div>
                <div className="col-12 pb-2">
                    <p>Password<span style={redstar}>*</span></p>
                    <input type="password" ref={(ref) => { this.password = ref; }}/>
                </div>
                <div className="col-12 pb-2">
                    <button>Register</button>
                </div>
            </div>
        </form>
        )
    }
}