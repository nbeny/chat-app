import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class SideBarOption extends Component {
    static ProTypes = {
        name: PropTypes.string.isRequired,
        lastMessage: PropTypes.string,
        active: PropTypes.bool,
        onClick: PropTypes.func
    }
    static defaultProps = {
        lastMessage:"",
        active: false,
        onClick: () => {}
    }

    render() {
        const {name, lastMessage, active, onClick} = this.props
        return (
            <div className="chat_list">
            <div className={`chat_people ${active ? 'active' : ''}`}
                onClick={onClick}>
                <div className="chat_img">{name[0].toUpperCase()}</div>
                <div className="chat_ib">
                    <h5>
                        {name}
                        <span class="chat_date">
                            {lastMessage.time}
                        </span>
                    </h5>
                    <p>
                        {lastMessage && <div className="last-message">{lastMessage}</div>}
                    </p>
                </div>
            </div>
            </div>
        )
    }
}