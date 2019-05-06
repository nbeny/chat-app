import React, {Component} from 'react';

export default class MessageInput extends Component {

    constructor(props) {
        super(props)

        this.state = {
            message:"",
            isTyping:false
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.sendMessage()
        this.setState({message:""})
    }

    sendMessage = () => {
        this.props.sendMessage(this.state.message)
    }

    componentWillUnmount() {
        this.stopCheckingTyping()
    }

    /*
	*	startCheckingTyping
	*	Start an interval that checks if the user is typing.
	*/
    sendTyping = () => {
		this.lastUpdateTime = Date.now()
		if(!this.state.isTyping){
			this.setState({isTyping:true})
			this.props.sendTyping(true)
			this.startCheckingTyping()
        }
    }

    /*
	*	startCheckingTyping
	*	Start an interval that checks if the user is typing.
	*/
	startCheckingTyping = ()=>{
		// console.log("Typing");
		this.typingInterval = setInterval(() => {
			if((Date.now() - this.lastUpdateTime) > 300){
				this.setState({isTyping:false})
				this.stopCheckingTyping()
			}
		}, 300)
    }

    /*
	*	stopCheckingTyping
	*	Start the interval from checking if the user is typing.
	*/
	stopCheckingTyping = () => {
		// console.log("Stop Typing");
		if(this.typingInterval) {
			clearInterval(this.typingInterval)
			this.props.sendTyping(false)
		}
    }

    render() {
        const {message} = this.state
        return (
            <div className="type_msg">
                <form onSubmit={this.handleSubmit}
                    className="input_msg_write">
                    <input id="message"
                        ref={"messageinput"}
                        type="text"
                        className="write_msg"
                        value={message}
                        autoComplete={'off'}
                        placeholder="Type something interesting"
                        onKeyUp={e => {e.keyCode !== 13 && this.sendTyping()}}
                        onChange={
                            ({target}) => {
                                this.setState({message:target.value})
                            }
                        } />
                    <button disabled={message.length < 1}
                        type="submit"
                        className="msg_send_btn"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                </form>
            </div>
        )
    }
}