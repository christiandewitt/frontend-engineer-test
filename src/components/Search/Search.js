import React, { Component } from 'react';
import { Dropdown } from 'primereact/dropdown';

export default class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: null
        };

        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(e) {
        this.setState({ 
            selected: e.value 
        });

        this.props.onChange(e.value);
    }

    render() {
        return <div>
            <Dropdown
                value={this.state.selected}
                options={this.props.items}
                onChange={this.handleOnChange}
                filter={true}
                filterPlaceholder={this.props.placeholder}
                filterBy={this.props.filterBy || "label,value"}
                placeholder={this.props.placeholder}
                optionLabel={this.props.optionLabel || "label"}
                optionValue={this.props.optionValue || "value"}
                style={{width: "200px"}}
                className="float-right"
            />
        </div>;
    }
}