import React, { Component } from 'react'
import api from '../services/api';
import socket from 'socket.io-client'

import twitterLogo from '../twitter.svg';
import './Timeline.css';

import Tweet from '../components/Tweet';

export default class Timeline extends Component {

    state = {
        tweets: [],
        newTweet: '',
    };

    async componentDidMount() { //executado sempre que a pagina eh exibida em tela
        this.subscribeToEvents();
        const response = await api.get('tweets'); //toda vez que a tela é exibida, requisita todos os tweets da base

        this.setState({ tweets: response.data }); //popula o array de tweets do componente
    }

    subscribeToEvents = () => {
        const io = socket("http://localhost:3000");

        io.on('tweet', data => {
            this.setState({ tweets: [data, ...this.state.tweets] });
        });

        io.on('like', data => {
            this.setState({ tweets: this.state.tweets.map(tweet => tweet._id === data._id ? data : tweet )});
        });

    }

    handleNewTweet = async (event) => {
        if (event.keyCode !== 13) //13 eh o valor ASCII do '\n' ou CR
            return;

        const content = this.state.newTweet;
        const author = localStorage.getItem("@GoTwitter:username");

        await api.post('tweets', {content, author});    //usa a lib axios pra criar uma requisicao e mandar os dados como JSON via POST
        
        this.setState({ newTweet: '' }); //limpa o conteudo ao terminar de enviar a requisicao

    }

    handleInputChange = (event) => {
        this.setState({ newTweet: event.target.value });
    }

    render() {
        return (
            <div className="timeline-wrapper">
                <img height={24} src={twitterLogo} alt="GoTwitter" />

                <form>
                    <textarea
                        value={this.state.newTweet}
                        onChange={this.handleInputChange}
                        onKeyDown={this.handleNewTweet}
                        placeholder="O que está acontecendo?"
                        />
                </form>
                <ul className="tweet-list">
                    { this.state.tweets.map(tweet =>        //map: percorre todo array e pra cada indice performa a funcao dentro do parenteses
                        <Tweet key={tweet._id} tweet={tweet} />         
                    )}
                </ul>
            </div>
        )
    }

}