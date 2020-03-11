import React from 'react';
import { RECEIVE_CAMPSITES } from '../../actions/campsite_actions';

class MoreFilter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            campsites: props.campsites,
            count: ((props.campsites) ? props.campsites.length : 0), 
        };
        this.handleChange = this.handleChange.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange(e){
        $(e.target).toggleClass("selected-more-filter");
        const filters = document.querySelectorAll("input.selected-more-filter");
        let campsites 
        if (filters.length){
            campsites = this.props.tags[filters[0].id].campsites;
            this.props.updateAppliedFilter(true);
            filters.forEach( el => {
                    const newSites = el.getAttribute("data-campsites")
                                        .split(",")
                                        .map( id => parseInt(id));
                    campsites = campsites.filter(id => newSites.includes(id));
                })
        }
        else{
            this.props.updateAppliedFilter(false);
        };        
        this.setState({campsites, count: campsites.length})
    };

    handleSubmit(e){
        e.preventDefault();
        this.props.updateFilter("tags", this.state.campsites)
        this.props.closeModal();

    };

    clearFilter(e){
        e.preventDefault();
        $("input[type='checkbox']").prop("checked", false)
        $(".selected-more-filter").removeClass("selected-more-filter")
        const campsites = this.props.campsites;
        this.setState({
            campsites,
            count: campsites ? campsites.length : 0
        })
    }

    componentDidMount(){
        this.props.fetchTags();
    };

    render(){
        if (this.props.categorized){
            const categorizedList = {};
            Object.keys(this.props.categorized).forEach(key => 
                categorizedList[key] = Object.values(this.props.categorized[key]).map( tag => 
                    <label key={tag.id}>
                        <input
                            type="checkbox"
                            name={tag.id}
                            id={tag.id} 
                            onChange={this.handleChange}
                            data-campsites={tag.campsites}
                            />
                        {tag.name}
                    </label>
                )
            )
            const groupSize = [];
            const priceRange = []; 
            for(let i = 1 ; i <= 10; i++){
                groupSize.push(
                    <option value={i}>{i} camper{i > 1 ? "s" : ""}</option>
                )
            }
            return(
                <div className="more-filter-large">
                    <div className="more-filter-section">
                        <h2>Group Size</h2>
                        <select className="form-control" name="" id="">
                            <option value="">Any size</option>
                            {groupSize}
                            <option value="">10+ campers</option>
                            <option value="">15+ campers</option>
                        </select>
                        <h2>Pricing</h2>
                        <select className="form-control" name="" id="">
                            <option value="25">Under $25</option>
                            <option value="50">Under $50</option>
                            <option value="75">Under $75</option>
                            <option value="125">Under $125</option>
                            <option value="175">Under $175</option>
                            <option value="175+">$175 or more</option>
                        </select>
                    </div>
                    <div className="more-filter-section">
                        <h2>Amenities</h2>
                        <div className="strong-filter amentities">
                            {categorizedList["Amenities"]}
                        </div>
                    </div>
                    <div className="more-filter-section">
                        <h2>Activities</h2>
                        <div className="strong-filter activities">
                            {categorizedList["Activities"]}
                        </div>
                    </div>
                    <div className="more-filter-section">
                        <h2>Terrain</h2>
                        <div className="strong-filter terrain">
                            {categorizedList["Terrain"]}

                        </div>
                        <button></button>
                    </div>
                    {/* TODO IMPLEMENT THE LOGIC */}
                    <button onClick={this.clearFilter}>Clear Filter</button>
                    <button onClick={this.handleSubmit}>Show {this.state.count}+ camps </button>

                </div>
            )
        }
        else 
            return null; 
    }
};

export default MoreFilter; 