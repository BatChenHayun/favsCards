import React from "react";
import TextHeader from "./common/pageHeader";
import TextParagraph from "./common/textParagraph";
import Form from "./common/form";
import FormStyle from "./common/formStyle";
import Joi from "joi-browser";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import userService from "../services/userService";



class Signup extends Form {
    state = {
        data: {
            name: "",
            email: "",
            password: ""
        },
        errors: {}
    };

    schema = {
        name: Joi.string().required().min(3).label("Name"),
        password: Joi.string().required().min(6).label("Password"),
        email: Joi.string().required().email().label("Email"),
    };

    doSubmit = async () => {
        const { data } = this.state;
        data.biz = false;

        try {
            await http.post(`${apiUrl}/users`, data);
            toast("A new acoount is opened");
            this.props.history.replace("/signin");
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                this.setState({ errors: { email: "Email is taken" } });
            }
        }
    };

    render() {
        if (userService.getJwt()) return <Redirect to="/" />
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 mt-4">
                        <TextHeader textHeader="Signup"></TextHeader>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <TextParagraph textParagraph="You can open new account for free!"></TextParagraph>
                    </div>
                </div>
                <FormStyle
                    onSubmit={this.handleSubmit}
                    renderInputName={this.renderInput("name", "name")}
                    renderInputEmail={this.renderInput("email", "email", "email")}
                    renderInputPassword={this.renderInput("password", "password", "password")}
                    renderButton={this.renderButton("Signup")}
                ></FormStyle>
            </div >
        );
    }
}

export default Signup;