import React from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import MoreFilterContainer from './more_filter_container';

class FilterBar extends React.Component{
    constructor(props){
        super(props);
        this.CAMPSITE_TYPE = ["CAMPING", "RV", "GLAMPING"];
        this.state = { typeFilter: this.CAMPSITE_TYPE};
        this.updateTypeFilter = this.updateTypeFilter.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    };

    // componentWillUnmount remove filter modal 
    handleButtonClick(e){
        e.preventDefault();
        $(e.target).toggleClass("selected-filter");
        this.updateTypeFilter();
    };

    updateTypeFilter(){
        const typeFilter = []; 
        document.querySelectorAll('button.selected-filter').forEach(el =>
            typeFilter.push(el.innerHTML)
        );
        this.setState({typeFilter}, ()=> {
            this.props.updateFilter("type", this.state.typeFilter);
        });
    };

    render(){
        const types = this.CAMPSITE_TYPE.map( (type,idx) => 
            <button 
                className="type-filter"
                onClick={this.handleButtonClick}
                key={idx}
                >
                    {type}
            </button>
        )

        return (
            <div className="filter-bar">
                <DayPickerInput /> 
                {types}
                <div className="more-filter">
                    <button>More filters</button>
                    <MoreFilterContainer />
                </div>
            </div>
        )
    };
};

export default FilterBar;