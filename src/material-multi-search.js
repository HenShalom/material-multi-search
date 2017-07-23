import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import equal from 'deep-equal'
import RaisedButton from 'material-ui/RaisedButton'


class MultiSearch extends Component {
    constructor(props, context) {
        super(props, context)
        console.log(props.data)
        this.state = {
            hinText: props.hinText,
            maxResult: props.maxResult,
            inputData: props.data,
            data: this.dataDicider(props.data, props.converter),
            selectedItem: [],
            selectedItemConvereted: [],
            maxItems: props.maxItems,
            onItemChange: props.onItemChange,
        };
        this.handleItemChange = this.handleItemChange.bind(this);
    }

    dataDicider(data, converter) {
        if (typeof (data[0]) === "object") {
            console.log("this is an object list")
            return this.mangedData(data, converter)
        } else {
            return data
        }
    }

    mangedData(data, converter) {
        let convertedData = [];
        for (let d in data) {
            convertedData.push(converter(data[d]));
        }
        return convertedData;
    }


    handleItemChange(value, index) {
        let item = this.state.inputData[index];
        if (this.state.selectedItem.length < this.state.maxItems) {
            if (!this.checkInList(this.state.selectedItem, item)) {
                this.setState((prevState) => {
                    let newItems = prevState.selectedItem;
                    let convertedItem = prevState.selectedItemConvereted
                    newItems.push(item);
                    convertedItem.push(this.state.data[index])
                    return { selectedItem: newItems, selectedItemConvereted: convertedItem };
                });
            }
        }
        this.state.onItemChange(this.state.selectedItem);
    }

    checkInList(selectedItem, item) {
        for (let i = 0; i < selectedItem.length; i++) {
            if (equal(item, selectedItem[i])) {
                return true;
            }
        }
        return false;
    }

    handleListClick(index) {
        console.log(index)
        this.setState((prevState) => {
            return { selectedItem: this.removeElmentAt(prevState.selectedItem, index), selectedItemConvereted: this.removeElmentAt(prevState.selectedItemConvereted, index) }
        })
    }
    removeElmentAt(arr, index) {
        let len = arr.length
        let newArr=[];
        for (let i = 0; i < len; i++) {
            if (i !== index) {
                newArr.push(arr[i])
            }
        }
        return newArr
    }

    render() {

        return (

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {this.state.selectedItemConvereted.map((item, index) => {
                    return <RaisedButton key={index} style={{ margin: 5 }} secondary={true} label={item} onTouchTap={this.handleListClick.bind(this, index)} />
                })}
                <AutoComplete
                    floatingLabelText={this.state.hinText}
                    filter={AutoComplete.caseInsensitiveFilter}
                    dataSource={this.state.data}
                    maxSearchResults={this.state.maxResult}
                    onNewRequest={this.handleItemChange}
                    fullWidth={true}

                />
            </div>
        )
    }
}

MultiSearch.defaultProps = {
    data: [],
    maxItems: 5,
    onItemChange: () => { },


};


export default MultiSearch;