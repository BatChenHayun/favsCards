import React from 'react';
import Form from "./form";

class FormStyle extends Form {
    render() {
        const { renderInputName = null, renderInputEmail, renderInputPassword, renderButton, onSubmit } = this.props;

        return (
            <>
                <div className="row h-100 justify-content-center align-items-center ">
                    <div className="col-6">
                        <form method="POST" onSubmit={onSubmit} className="bg-secondary-light px-5 py-5 mx-0" style={{ border: "1px solid black" }}>
                            {renderInputName}
                            {renderInputEmail}
                            {renderInputPassword}
                            {renderButton}
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

export default FormStyle;

