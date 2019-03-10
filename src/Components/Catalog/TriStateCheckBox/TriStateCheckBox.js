import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Checkbox from 'react-three-state-checkbox';
export default class TriStateCheckBox extends Component {
    state = {
        checked: false,
        indeterminate: false,
    }
    /**
     * vrací prop text.
     */
    getID = () =>{
        return this.props.text;
    }
    /**
     * vrací jestli je zaškrtnutí.
     */
    isChecked =()=>{
        if(this.state.indeterminate) return false;
        return this.state.checked;
    }
    /**
     * vrací jestli není zaškrtnutí.
     */
    isIndeterminate = () => {
        return this.state.indeterminate;
    }
    /**
     * Volána při stisknutí CheckBoxu.
     * Mění state checked a indeterminate.
     */
    handleChange =()=>{
        let Checked = this.state.checked;
        let Indeterminate = this.state.indeterminate;
        if(Checked === false && Indeterminate == false) {
            Checked = true;
        } else if(Checked === true && Indeterminate == false) {
            Indeterminate = true;
        } else if(Checked === true && Indeterminate == true) {
            Checked = false;
            Indeterminate = false;
        }
        this.setState({checked:Checked,indeterminate:Indeterminate});
    }
    render() {
        const { checked, indeterminate } = this.state;
        return (
            <div>
            <Checkbox
                checked={checked}
                indeterminate={indeterminate}
                onChange={this.handleChange}
            />
            <span>{this.props.text}</span>
          </div>
        );
      }
    }
