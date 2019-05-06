import React, {Component} from 'react';
import {FaSearch} from 'react-icons/fa'
import {MdEject} from 'react-icons/md'
import {SideBarOption} from './SideBarOption'
import {get, last, differenceBy} from 'lodash'
import {createChatNameFromUsers} from '../../Factories'

export default class SideBar extends Component {
    static type = {
        CHATS:"chats",
        USERS:"users"
    }
    constructor(props) {
        super(props)

        this.state = {
            reciever:"",
            activeSideBar: SideBar.type.CHATS
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {reciever} = this.state
        const {onSendPrivateMessage} = this.props

        onSendPrivateMessage(reciever)
        this.setState({reciever:""})
    }

    addChatForUser = (username) => {
        this.props.onSendPrivateMessage(username)
        this.setActiveSideBar(SideBar.type.CHATS)
    }

    setActiveSideBar = (newSideBar) => {
        this.setState({activeSideBar:newSideBar})
    }

    render() {
        const {setActiveChat, chats, activeChat, user, logout, users} = this.props
        const {reciever, activeSideBar} = this.state
        return (
            <div className="inbox_msg">
                <div id="inbox_people">
                    <div className="headind_srch">
                        <div className="recent_heading"><h4>Recent</h4></div>
                            <div className="srch_bar">
                                <div className="stylish-input-group">
                                    <form onSubmit={this.handleSubmit} className="search">
                                        <input placeholder="Search"
                                            className="search-bar"
                                            type="text"
                                            value={reciever}
                                            onChange={(e) => {this.setState({reciever:e.target.value})}} />
                                        <span className="input-group-addon">
                                            <button className="search-icon"
                                                value={reciever}
                                                formAction={(e) => {this.setState({reciever:e.target.value})}}>
                                                <FaSearch />
                                            </button>
                                        </span>
                                    </form>
                                </div>
                            </div>
                        </div>

                    <div className="nav nav-masthead justify-content-center">
                        <div
                            onClick = {() => {this.setActiveSideBar(SideBar.type.CHATS)}}
                            className={`nav-link ${(activeSideBar === SideBar.type.CHATS) ? 'active' : ''}`}>
                            <span className="choiceChatsUsers">Chats</span>
                        </div>
                        <div
                            onClick = {() => {this.setActiveSideBar(SideBar.type.USERS)}}
                            className={`nav-link ${(activeSideBar === SideBar.type.USERS) ? 'active' : ''}`}>
                            <span className="choiceChatsUsers">Users</span>
                        </div>
                    </div>
                    <div className="inbox_chat">
                    <div
                    ref="users"
                    onClick={(e) => {(e.target === this.refs.user) && setActiveChat(null)}}>
                    {
                        activeSideBar === SideBar.type.CHATS ?
                        chats.map((chat) => {
                            if (chat.name) {
                                return (
                                    <SideBarOption
                                        key={chat.id}
                                        name={chat.isCommunity ? chat.name : createChatNameFromUsers(chat.users, user.name)}
                                        lastMessage={get(last(chat.messages), 'message')}
                                        active ={activeChat.id === chat.id}
                                        onClick={() => {this.props.setActiveChat(chat)}}
                                        />
                                )
                            }
                            return null
                        }) :
                        differenceBy(users, [user], 'name').map((otherUser) => {
                            return (
                                <SideBarOption
                                    key={otherUser.id}
                                    name={otherUser.name}
                                    onClick={() => {this.addChatForUser(otherUser.name)}}
                                    />
                            )
                        })
                    }
                    </div>
                    </div>
                    <div className="current-user">
                        <span>{user.name}</span>
                        <div onClick={() => {logout()}} title="Logout" className="logout">
                            <MdEject />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}