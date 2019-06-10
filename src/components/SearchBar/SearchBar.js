import React, { Component } from 'react';
import './SearchBar.scss';
import Sugestions from './Sugestions';

class SearchBar extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            search: '',
            searchOnFocus: false
        };
        
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleKeyPressInput = this.handleKeyPressInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getUserData = this.getUserData.bind(this);
        this.setSearch = this.setSearch.bind(this);
    }

    getUserData() {
        if (this.state.search.length !== 0) {
            this.props.setUserLogin(this.state.search);
        }
    }

    handleChangeInput(event) {
        this.setState({
            search: event.target.value
        });
    }  
    
    handleKeyPressInput(event) {
        if (event.key === 'Enter') {
            this.getUserData();
        }
    }

    handleSubmit(event) {
        this.getUserData();
    }
    
    setSearch(value) {
        this.setState({
            search: value
        }, function(){
            this.getUserData();
        });
    }
    
    render() {
        return (
            <div className="header">
            <div className={`searchBar ${this.state.searching === true ? 'loading' : ''}`}>
            <input type="text" className="searchBarInput" ref="searchInput" placeholder="Pesquise ou digite o nome de usuário" value={this.state.search} onChange={this.handleChangeInput} onKeyPress={this.handleKeyPressInput}></input>
            <Sugestions search={this.state.search} setSearch={this.setSearch} />
            <button className={`searchButton`} onClick={this.handleSubmit}></button>
            </div>
            </div>
            );
        }
    }
    
    export default SearchBar;