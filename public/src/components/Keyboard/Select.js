import React from 'react';

const Select = (props) => {
    // console.log(props)
    return (
        <div className="form-group" style={{width: '100%'}}>
            <label className="form-label">{props.title}</label>
            <select
                id={props.name}
                name={props.name}
                value={props.value}
                onChange={props.handlechange}
                className="form-control dropdown"
                >
                <option value="" disabled>{props.placeholder}</option>

                {props.options.map(options => {
                    return (
                        <option
                            key={options}
                            value={options}
                            label={options}
                        >{options}

                        </option>

                    );
                })}

            </select>
        </div>
    );
}
export default Select;