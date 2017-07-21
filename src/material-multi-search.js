import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import FlatButton from 'material-ui/FlatButton'

class MultiSearch extends Component {
    constructor(props,context) {
            super(props,context)
        this.state = {
            dataSource: [],
        };
        this.handleUpdateInput = this.handleUpdateInput.bind(this)
    }

    handleUpdateInput(value) {
        this.setState({
            dataSource: [
                value,
                value + value,
                value + value + value,
            ],
        });
    };


    render() {
        return (
            <div>
                <p>hello</p>
                    <FlatButton label="hen the man"/>
            </div>
        )

    }



}


export default MultiSearch;