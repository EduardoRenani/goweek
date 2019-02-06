import React, { Component } from 'react'

import twitterLogo from "../twitter.svg";
import './Login.css';

export default class Login extends Component {

    state = {               //estado que renderiza todo componente novamente quando algo é alterado
        username: "",
    };

    handleSubmit = (event) => {
        event.preventDefault();     //evita o redirecionamento de pagina
        
        const { username } = this.state;

        if(username.length === 0)
            return;
        
        localStorage.setItem("@GoTwitter:username", username); //salva a info no storage do navegador

        this.props.history.push("/timeline"); //desloca o usuario para a timeline

    }

    handleInputChange = (event) =>{ //sempre use o setState pra alterar algum campo do estado do componente
        this.setState({ username: event.target.value });
    }

    render() {
        return (
            <div className="login-wrapper">
                <img src={twitterLogo} alt="GoTwitter" />
                <form onSubmit={this.handleSubmit}>
                    <input 
                        value={this.state.username}  //one-way data binding: o input vai assumir o ultimo username como default
                        onChange={this.handleInputChange} //chama uma funcao qualquer quando o input alterado
                        placeholder="Nome de Usuário"
                        />
                    <button type="submit">Entrar</button>
                </form>
            </div>
        )
    }

}