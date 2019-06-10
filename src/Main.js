import React, { Component } from 'react';
import 'normalize.css'; //Uso para padronizar o CSS em todos os Browsers antes do desenvolvimento
import UserBio from './components/UserBio/UserBio'
import UserRepo from './components/UserRepo/UserRepo';
import Search from './components/SearchBar/SearchBar';
import './Main.scss';


class Main extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            userLogin: {
                isNull: true
            }
        }
        
        this.setUserLogin = this.setUserLogin.bind(this);
    }
    
    setUserLogin(userLogin) {
        this.setState({
            userLogin: userLogin
        });
    }
    
    render() {
        return (
            <div className="container">
            <Search setUserLogin={this.setUserLogin}/>
            <div className={`content`}>
            <UserBio userLogin={this.state.userLogin} />
            <UserRepo userLogin={this.state.userLogin}/>
            </div>
            </div>
            );
        }
        
    }
    
    export default Main;