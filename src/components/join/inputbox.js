import React from 'react';

const Inputbox = (props) => {
    // let typeEmnu = ["text","password"];
    // let inputType = 0;
    // let realType = !props.eyeClosed ? "text" : typeEmnu[inputType];

    return(
        <div className="inputBox">
            <i className={`icon ${props.icon}`}></i>
            <input type={props.inputType} placeholder={props.placeholder}
            onFocus={props.onFocus.bind(null, props.colName)}
            onBlur={props.onBlur} />
            <div className="icon-module">
                <i className={`icon ${!props.showPsw ? "icon-eye-blocked" : "icon-eye"}`}
                    onClick={props.showPswHandler}></i>
                <i className={`icon ${props.warningState ? "icon-warning" : ''}`}></i>            
            </div>    
            <div className = {`${props.ClassName} ${props.showTips ? "open" : ''}`}>
                {props.Tips}
            </div>
            <div className = {`${props.ClassName} ${props.warningState ? "open" : ''}`}>
                {props.Warning}
            </div>
        </div>
    )
}

export default Inputbox;