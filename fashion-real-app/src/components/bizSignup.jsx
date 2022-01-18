import React from 'react';
import TextHeader from "./common/pageHeader";
import TextParagraph from "./common/textParagraph";
import FormStyle from "./common/formStyle";
import Form from "./common/form";
import Joi from "joi-browser";
import { apiUrl } from "../config.json";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import userService from "../services/userService";
import http from "../services/httpService";

class BizSignup extends Form {

    state = {
        data: {
            name: "",
            email: "",
            password: ""
        },
        errors: {}
    }

    schema = {
        name: Joi.string().required().min(3).label("Name"),
        password: Joi.string().required().min(6).label("Password"),
        email: Joi.string().required().email().label("Email"),
    };


    doSubmit = async () => {
        const { data } = this.state;
        data.biz = true;

        try {
            await http.post(`${apiUrl}/users`, data);
            await userService.login(data.email, data.password);
            toast("A new bizness acoount is opened...");
            window.location = "/create-card";
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                this.setState({ errors: { email: "Email is taken" } });
            }

        }


        console.log("submitted");
    }
    render() {
        if (userService.getCurrentUser()) return <Redirect to="/" />;

        return (
            <>
                <div className="container">
                    <div className="row">
                        <TextHeader textHeader="Biz Signup"></TextHeader>
                    </div>
                    <div className="row">
                        <TextParagraph textParagraph="please signup for bizness account"></TextParagraph>
                    </div>
                    <FormStyle
                        renderInputName={this.renderInput("name", "name")}
                        renderInputEmail={this.renderInput("email", "email", "email")}
                        renderInputPassword={this.renderInput("password", "password", "password")}
                        renderButton={this.renderButton("Signup")}
                        onSubmit={this.handleSubmit}  >
                    </FormStyle>
                </div>
            </>
        );
    }
}

export default BizSignup;