import React from 'react';

const Select = (props) => {
    // console.log("------------------------------props.options",props.options)
    // console.log("props=====>",props)

    // return false
    return (
        <div className="form-group" style={{width: '100%'}}>
            <label className="form-label">{props.title}</label>
            <select
                id={props.name}
                name={props.name}
                value={props.value}
                onChange={props.handlechange}
                className="form-control "
                >
                <option value="" disabled>{props.placeholder}</option>

                {props.options.map(options => {
                    return (
                        <option
                            key={options.id} 
                            value={options.id}
                            
                        >
                            {options.value}
                        </option>

                    );
                })}

            </select>
        </div>
    );
}
export default Select;