import React, { Component } from 'react';
import './TabNav.css';

class TabNav extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div style={{ width: '100%' }}>
                <ul className="nav nav-tabs">
                    {
                        this.props.tabs.map(tab => {
                            const active = (tab === this.props.selected ? 'active ' : '');
                            return (
                                <li className="nav-item" key={tab}>
                                    <button
                                        className={"nav-link " + active}
                                        onClick={() => this.props.setSelected(tab)}
                                        style={{ background: 'none', border: 'none', padding: '0', cursor: 'pointer', color: 'inherit' }} // стили для кнопки
                                    >
                                        {tab}
                                    </button>
                                </li>
                            );
                        })
                    }
                </ul>
                <div className="tab-content">{this.props.children}</div>
            </div>
        );
    }
}

export default TabNav;
