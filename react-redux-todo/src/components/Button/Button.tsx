import React from 'react'

import './button.css'

export interface IButton {
    label?: string,
    icon?: React.ReactNode,
    onClick?: () => void,
    className?: string
}


export const Button = ({label, icon, className, onClick}: IButton) => {

    return (
        <button className={className} onClick={onClick}>
            {icon && <div> {icon}</div>}
            {label}
        </button>
    )

};
