import React, { Component } from 'react';
import * as GetGithubAPI from '../../utils/GetGithubAPI'
import './Sugestions.scss';

const _ = require('lodash'); //Utilizo a função debounced para não estourar o servidor

class Sugestions extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            search: '', //Armazeno a escolha da sugestão
            hideSuggestions: false, //Variavel que verifica se a sugestão está visivel ou não
            suggetions: [],
            searching: false
        }
        
        this.getSuggetionsJSON = this.getSuggetionsJSON.bind(this);
        this.debounced = _.debounce(this.getSuggetionsJSON, 500); //Utilizo a função debounced para não estourar o servidor
    }
    
    getSuggetionsJSON(search) {
        let self = this; //Variavel para acesso ao this de Sugestions
        
        this.setState({
            hideSuggestions: false,
            suggetions: [],
            searching: true
        }, function() {
            GetGithubAPI.searchUsers(search, function(response) {
                self.setState({
                    suggetions: response.items,
                    hideSuggestions: false,
                    searching: false
                });
            });
        })
    }
    
    setSearch(value) {
        this.setState({
            search: value,
            hideSuggestions: true
        }, function() {
            this.props.setSearch(value);
        });
    }
    
    componentWillReceiveProps(nextProps){
        if(this.props.search !== nextProps.search && this.state.search !== nextProps.search && nextProps.search !== '') {
            this.debounced(nextProps.search);
            this.setState({
            //    hideSuggestions: true
            });
        }
        //Não exibo a caixa de sugestão quando é vazio
        if(nextProps.search === '') {
            this.setState({
                hideSuggestions: true
            });
        }
    }
    
    render() {


        return (
            <div className={`suggestions ${this.state.hideSuggestions !== false ? 'hide' : ''} ${this.state.searching ? 'loading' : ''} `}>
            <ul>{this.state.suggetions.map((suggetion, index) => 
                <li key={index} onClick={() => this.setSearch(suggetion.login)}>{suggetion.login}</li>)}
                </ul>
                </div>
                )
            };
        }
        
        export default Sugestions;