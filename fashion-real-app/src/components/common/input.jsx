import React from 'react';

const Input = ({ name, label, type, error, ...rest }) => {
    return (
        <>
            <div className="form-group">
                <label htmlFor={name}>{label}</label>
                <input {...rest} type={type} id={name} name={name} className="form-control" />
                {error && <span className="text-danger">{error}</span>}
            </div>
        </>
    );
}

export default Input;