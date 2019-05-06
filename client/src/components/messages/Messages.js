import React, {Component} from 'react';

export default class Messages extends Component {

    constructor(props) {
        super(props)

        this.scrollDown = this.scrollDown.bind(this)
    }

    scrollDown() {
        const {container} = this.refs
        container.scrollTop = container.scrollHeight
    }

    componentDidMount() {
        this.scrollDown()
    }

    componentDidUpdate(prevProps, prevState) {
        this.scrollDown()
    }

    render() {
        const {messages, user, typingUsers} = this.props
        console.log(messages)

        const outOrInGoingMessage = (mes) => {
            if (mes.sender === user.name) {
                return (
                    <div key={mes.id} 
                        className='outgoing_msg'>
                        <div className='sent_msg'>
                            <p>{mes.message}</p>
                            <span className="time_date">{mes.time}</span>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div key={mes.id} 
                        className='incoming_msg'>
                        <div className='incoming_msg_img'><img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /></div>
                        <div className='received_msg'>
                            <div class="received_withd_msg">
                                <h1>{mes.sender}</h1>
                                <p>{mes.message}</p>
                                <span className="time_date">{mes.time}</span>
                            </div>
                        </div>
                    </div>
                )
            }
        }

        return (
            <div ref='container'
                className="mesgs">
                <div className="msg_history">
                    {
                        messages.map((mes) => {
                            console.log("message: ", mes)
                            return (
                                <div>
                                    {outOrInGoingMessage(mes)}
                                </div>
                            )
                        })
                    }
                    {
                        typingUsers.map((name) => {
                            return (
                                <div key={name} className="typing-user">
                                    {`${name} is typing...`}
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        )
    }
}