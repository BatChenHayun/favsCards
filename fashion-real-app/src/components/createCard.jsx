import React from "react";
import PageHeader from "./common/pageHeader";
import TextParagraph from "./common/textParagraph";
import Joi from "joi-browser";
import Form from "./common/form";
import cardService from "../services/cardService";
import { toast } from "react-toastify";


class CreateCard extends Form {
    state = {
        data: {
            dressedName: "",
            dressedDescription: "",
            dressedPrice: "",
            dressedImage: ""
        },
        errors: {}
    };

    schema = {
        dressedName: Joi.string()
            .min(2)
            .max(255)
            .required(),
        dressedDescription: Joi.string()
            .min(2)
            .max(1024)
            .required(),
        dressedPrice: Joi.string()
            .min(2)
            .max(400)
            .required(),
        dressedImage: Joi.string()
            .min(11)
            .max(1024)
            .uri()
            .allow("")
    };

    doSubmit = async () => {
        const { data } = this.state;
        if (!data.dressedImage) delete data.dressedImage;
        await cardService.createCard(this.state.data);
        toast("A new card is opened");
        this.props.history.replace("/my-cards");
    };

    render() {
        return (
            <div className="container">
                <PageHeader textHeader="Create new dressed card" />
                <div className="row">
                    <div className="col-12">
                        <TextParagraph textParagraph="Create dressed card" />
                    </div>
                </div>
                <div className="row h-100 justify-content-center align-items-center ">
                    <div className="col-6">
                        <form method="POST" onSubmit={this.handleSubmit} className="bg-secondary-light px-5 py-5 mx-0" style={{ border: "1px solid black" }}>
                            {this.renderInput("dressedName", "Dressed Name")}
                            {this.renderInput("dressedDescription", "Dressed Description")}
                            {this.renderInput("dressedPrice", "Dressed Price")}
                            {this.renderInput("dressedImage", "Dressed Image")}
                            {this.renderButton("Create Card")}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateCard;