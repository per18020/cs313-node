import React, { useState, useEffect } from 'react';
import onClickOutside from "react-onclickoutside";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import './style/Dropdown.scss';

function Dropdown(props) {
    let [selectedItem, setSelectedItem] = useState(props.list[0]);
    let [dropdownActive, setDropdownActive] = useState(false);

    useEffect(() => {
        props.onSelect(selectedItem);
    }, [])

    const onSelectItem = (item, index, event) => {
        event.preventDefault();
        setSelectedItem(item);
        setDropdownActive(false);
        props.onSelect(item, index);
    }

    Dropdown.handleClickOutside = () => setDropdownActive(false);

    return (
        <div className={dropdownActive ? "dropdown is-active" : "dropdown"}>
            <div className="dropdown-trigger is-expanded" onClick={() => setDropdownActive(!dropdownActive)}>
                <button className="button is-fullwidth" aria-haspopup="true" aria-controls="dropdown-menu">
                    <span>{selectedItem}</span>
                    <span className="icon is-small">
                        <FontAwesomeIcon icon={faAngleDown} />
                    </span>
                </button>
            </div>
            <div className="dropdown-menu">
                <div className="dropdown-content">
                    {props.list.map((item, index) => {
                        return (
                            <a
                                href="/"
                                key={index} 
                                className={item === selectedItem ? "dropdown-item is-active" : "dropdown-item"} 
                                onClick={onSelectItem.bind(this, item, index)}
                                >
                                {item}
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

const clickOutsideConfig = {
    handleClickOutside: () => Dropdown.handleClickOutside
};

export default onClickOutside(Dropdown, clickOutsideConfig)