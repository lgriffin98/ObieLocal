import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Tab from './Tab';
import './tabs.css'

class Tabs extends Component {
    static propTypes = {
        children: PropTypes.instanceOf(Array).isRequired
    }

    constructor(props){
        super(props);

        this.state = {
            activeTab: this.props.activeTab,
        };
    }   

    onClickTabItem = (tab) => {
        this.setState({ activeTab: tab });
    }

    componentWillReceiveProps() {
        this.setState({activeTab: this.props.activeTab});
    }

    render() {
        const {
            onClickTabItem,
            props: {
                children
            },
            state: {
                activeTab
            }
        } = this;
        console.log("State in tabs");
        console.log(this.state.activeTab);
        return (
            <div className="tabs">
                <ol className="tab-list">
                {children.map((child) => {
                    const { label } = child.props;

                    return (
                        <Tab
                            activeTab={activeTab}
                            key={label}
                            label={label}
                            onClick={onClickTabItem}
                        />
                    );
                })
                }
                </ol>
                <div className="tab-content">
                {children.map((child) => {
                    if (child.props.label !== activeTab) return undefined
                    return child.props.children;
                    })}
                </div>
            </div>
        );
    }
}

export default Tabs;