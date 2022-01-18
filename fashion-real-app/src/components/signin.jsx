import React from "react";
import Pageheader from "./common/pageHeader";
import TextParagraph from "./common/textParagraph";
import FormStyle from "./common/formStyle";
import Joi from "joi-browser";
import Form from "./common/form";
import userService from "../services/userService";
import { Redirect } from "react-router-dom";


class Signin extends Form {
    state = {
        data: { email: "", password: "" },
        errors: {}
    };

    schema = {
        email: Joi.string()
            .required()
            .email()
            .label("Email"),
        password: Joi.string()
            .required()
            .min(6)
            .label("Password")
    };

    doSubmit = async () => {
        const { email, password } = this.state.data;
        try {
            await userService.login(email, password);
            window.location = "/";
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                this.setState({ errors: { email: ex.response.data } });
            }
        }
    };

    render() {

        if (userService.getJwt()) return (<Redirect to="/" />)
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Pageheader textHeader="Signin" />

                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <TextParagraph textParagraph="signin here with your account!"></TextParagraph>

                    </div>
                </div>
                <FormStyle
                    onSubmit={this.handleSubmit}
                    renderInputEmail={this.renderInput("email", "email", "email")}
                    renderInputPassword={this.renderInput("password", "password", "password")}
                    renderButton={this.renderButton("Signin")}
                ></FormStyle>
            </div>
        );
    }
}

export default Signin;