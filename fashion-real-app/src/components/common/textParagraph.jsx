import React from 'react';

const TextParagraph = ({ textParagraph }) => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 mt-4 text-center">
                        <p>{textParagraph}</p>
                    </div>
                </div>
            </div>
        </>
    );

}

export default TextParagraph;