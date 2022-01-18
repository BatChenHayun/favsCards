import React from "react";
import PageHeader from "./common/pageHeader";
import TextParagraph from "./common/textParagraph";
import Joi from "joi-browser";
import Form from "./common/form";
import cardService from "../services/cardService";
import { toast } from "react-toastify";


class EditCard extends Form {
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
        _id: Joi.string(),
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

    async componentDidMount() {
        const cardID = this.props.match.params.id;
        const { data } = await cardService.getCard(cardID);
        this.setState({ data: this.mapToViewModel(data) });
    }

    mapToViewModel(card) {
        return {
            _id: card._id,
            dressedName: card.dressedName,
            dressedDescription: card.dressedDescription,
            dressedPrice: card.dressedPrice,
            dressedImage: card.dressedImage
        };
    }
    doSubmit = async () => {
        const { data } = this.state;
        await cardService.editCard(data);
        toast("Card is Updated");
        this.props.history.replace("/my-cards");
    };

    handleCancel = () => {
        this.props.history.push("/my-cards");
    };



    render() {
        return (
            <div className="container">
                <PageHeader textHeader="Edit Page" />
                <div className="row">
                    <div className="col-12">
                        <TextParagraph textParagraph="Edit this card" />
                    </div>
                </div>
                <div className="row h-100 justify-content-center align-items-center ">
                    <div className="col-6">
                        <form method="POST" onSubmit={this.handleSubmit} className="bg-secondary-light px-5 py-5 mx-0" style={{ border: "1px solid black" }}>
                            {this.renderInput("dressedName", "Dressed Name")}
                            {this.renderInput("dressedDescription", "Dressed Description")}
                            {this.renderInput("dressedPrice", "Dressed Price")}
                            {this.renderInput("dressedImage", "Dressed Image")}
                            {this.renderButton("Update Card")}
                            <button
                                className="btn btn-secondary ml-4"
                                onClick={this.handleCancel}>
                                Cancel
                        </button>
                        </form>

                    </div>
                </div>
            </div>
        );
    }
}

export default EditCard;