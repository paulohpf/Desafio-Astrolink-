import React, { Component } from 'react';
import './UserRepo.scss';
import * as GetGithubAPI from '../../utils/GetGithubAPI'

class UserRepo extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            repos: [],
            userLogin: '',
            sortReposBy: '',
            modal: {
                showModal: false,
                repo:{}
            }
        };
        
        this.getUserRepos = this.getUserRepos.bind(this);
        this.sortReposBy = this.sortReposBy.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }
    
    //Trago os repositórios do usuário
    getUserRepos(login) {
        let self = this; //para poder acessar a variavel State dentro do Axios
        GetGithubAPI.getUserRepos(login, function(response) {
            self.setState({
                repos: response,
                sortReposBy: 'Estrelas Decrescente'
            });
        });
    }
    
    //Capturo as alterações do Select orderBy
    handleSelectChange(event) {
        this.setState({
            sortReposBy: event.target.value
        }, function() {
            this.sortReposBy();
        });
        
    }
    
    sortReposBy(){
        if (this.state.sortReposBy === 'Estrelas Decrescente' || this.state.sortReposBy === '') {
            return this.state.repos.sort(function(a, b) {
                if(a.stargazers_count < b.stargazers_count) {
                    return 1;
                } else if (a.stargazers_count > b.stargazers_count) {
                    return -1;
                } else {
                    return 0;
                }
            });
        } else if (this.state.sortReposBy === 'Estrelas Crescente') {
            return this.state.repos.sort(function(a, b) {
                if(a.stargazers_count > b.stargazers_count) {
                    return 1;
                } else if (a.stargazers_count < b.stargazers_count) {
                    return -1;
                } else {
                    return 0;
                }
            });
        } else if (this.state.sortReposBy === 'Nome') {
            return this.state.repos.sort(function(a, b) {
                if(a.name > b.name) {
                    return 1;
                } else if (a.name < b.name) {
                    return -1;
                } else {
                    return 0;
                }
            });
        };
    }
    
    toggleModal(repo) {
        this.setState({
            modal: {
                showModal: !this.state.showModal,
                repo: repo
            }
        });
    }
    
    componentWillReceiveProps(nextProps) {
        if (this.state.userLogin !== nextProps.userLogin) {
            this.getUserRepos(nextProps.userLogin);
        }
    }
    
    render() {
        let sortReposBy = this.sortReposBy();
        let repos = this.state.repos;
        let toRender; //Variavel para renderização Condicional
            
            if(repos.length === 0){
                toRender = '';
            } else {
                toRender = <div><div className={`menu`}>
                <div className={`item`}></div>
                <div className={`item`}>
                <span>Ordenar por: </span><select value={this.state.sortReposBy} onChange={this.handleSelectChange}>
                <option value="Estrelas Decrescente">Estrelas Decrescente</option>
                <option value="Estrelas Crescente">Estrelas Crescente</option>
                <option value="Nome">Nome</option>
                </select>
                </div>
                </div>
                <div className={`repos`}>
                {sortReposBy.map((repo, index) => 
                    <div className={`item`} key={index}>
                    <a href={repo.html_url} target={`_blank`} className={`repo-name`}>{repo.name}</a>
                    {repo.description !== null ? <span className={`repo-description`}>{repo.description}</span> : ''}
                    <div className={`footer`}>
                    {repo.language !== null ? <span className={`repo-language`}>{repo.language}</span> : null }
                    <span className={`repo-stargazers`}>{repo.stargazers_count}</span>
                    </div>
                    </div>
                    )}</div>
                    </div>
                };
                
                return(
                    <div className={`userRepos`}>
                    {toRender}
                    </div>
                    )
                }
                
            }
            
            export default UserRepo;