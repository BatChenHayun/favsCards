import React from 'react';

const TextHeader = ({ textHeader }) => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 mt-4 text-center">
                        <h1>{textHeader}</h1>
                    </div>
                </div>
            </div>
        </>
    );

}

export default TextHeader;