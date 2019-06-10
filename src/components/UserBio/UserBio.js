import React, { Component } from 'react';
import './UserBio.scss';
import * as GetGithubAPI from '../../utils/GetGithubAPI'

class UserBio extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            userData: {},
            userFollowers: [],
            userFollowing: []
        }
        
        this.getUserData = this.getUserData.bind(this);
        this.getUserFollowers = this.getUserFollowers.bind(this);
    }
    
    //Função que trás os dados do usuário
    getUserData(data) {
        let self = this; //para poder acessar a variavel State dentro do Axios
        GetGithubAPI.getUserData(data, function(response) {
            self.setState({
                userData: response
            }, function() {
                this.getUserFollowers(data);
                this.getUserFollowing(data);
            });
        });
    }
    
    //Trago os usuários está seguindo
    getUserFollowing(data) {
        let self = this; //para poder acessar a variavel State dentro do Axios
        GetGithubAPI.getUserFollowing(data, function(response) {
            self.setState({
                userFollowing: response
            });
        });
    }
    
    //Trago os usuários que o seguem
    getUserFollowers(data) {
        let self = this; //para poder acessar a variavel State dentro do Axios
        GetGithubAPI.getUserFollowing(data, function(response) {
            self.setState({
                userFollowers: response
            });
        });
    }
    
    componentWillReceiveProps(nextProps) {
        if (this.state.userData.login !== nextProps.userLogin) {
            this.getUserData(nextProps.userLogin);
        }
    }
    
    render() {
        let toRender;
        
        //Faço as validações antes de renderizar
        if (this.props.userLogin.isNull !== true) {
            toRender = <div className={`user-info`}>
            <div className={`user-description`}>
            <img className={`user-avatar`} src={this.state.userData.avatar_url} alt={`avatar`}/>
            <div className={`namesCard`}>
            <h1>{this.state.userData.name}</h1>
            <span className={`userLogin`}>{this.state.userData.login}</span>
            </div>
            </div>
            <div className={`user-details`}>
            {this.state.userData.bio !== null ? <div className={`item noteCard`}>{this.state.userData.bio}</div> : ''}
            {this.state.userData.email !== null ? <a href={`mailto:${this.state.userData.email}`} className={`item email`}>{this.state.userData.email}</a> : ''}
            <div className={`item follow`}>
            <span className={`following`}>{this.state.userFollowing.length} Seguindo</span>
            <span className={`followers`}>{this.state.userFollowers.length} Seguidores</span>
            </div>
            </div>
            </div>
        }
        
        return(
            <div className={`userData`}>
            {toRender}
            </div>
            )
        };
    }
    
    export default UserBio;