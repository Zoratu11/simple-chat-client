import React from "react";
import io from "socket.io-client";

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            message: "",
            messages: []
        };

        this.socket = io("https://simple-chat-server.herokuapp.com/");

        this.socket.on("RECIEVE_MESSAGE", (data) => {
            addMessage(data);
        });

        const addMessage = data => {
            //Spread operator is the ...
            this.setState({messages: [...this.state.messages, data]});
        }
    }

    sendMessage(event) {
        event.preventDefault();
        this.socket.emit("SEND_MESSAGE", {
            author: this.state.username,
            message: this.state.message
        });
        //Set message to empty after message is sent!
        this.setState({message: ""});
    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    handleMessageChange(event) {
        this.setState({message: event.target.value});
    }

    render() {
        return (
            <div>
                <div id="title">Global Chat</div>
                <hr />
                <div className="messages">
                    {this.state.messages.map((message, index) => {
                        return (
                            <div className="message" key={index}>{message.author}: {message.message}</div>
                        );
                    })}
                </div>
                <div className="fixedBar">
                    <input 
                        value={this.state.username} 
                        onChange={(event) => this.handleUsernameChange(event)} 
                        type="text" placeholder="Username"/>
                    <input 
                        id="inputMessage"
                        value={this.state.message} 
                        onChange={(event) => this.handleMessageChange(event)} 
                        type="text" placeholder="Message"/>
                    <button 
                        onClick={(event) => this.sendMessage(event)}>Send
                    </button>
                </div>
            </div>
        );
    }
}

export default Chat;