import React, { Component } from 'react';
import Input from "./input";
import Joi from "joi-browser";


class Form extends Component {

    //check validate when form onsubmit
    validate = () => {
        const {
            schema,
            state: { data } } = this;
        //abortEarly: false => show all mistakes
        const { error } = Joi.validate(data, schema, { abortEarly: false })

        if (!error)
            return null;

        const errors = {};
        for (const detailsItem of error.details) {
            errors[detailsItem.path[0]] = detailsItem.message;
        }

        return errors;



    }

    handleSubmit = (e) => {
        e.preventDefault();

        const errors = this.validate();

        this.setState({ errors: errors || {} })
        console.log(errors);
        if (errors) {
            return;
        }
        this.doSubmit();
    }



    //check validate when user enter the data (on change)
    validateProperty = (name, value) => {

        const obj = { [name]: value }
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;

    }

    //{target:{name,value}}
    handleChange = (e) => {
        const { name, value } = e.target;
        const { data, errors } = this.state;

        const updateError = { ...errors };
        const errorMassage = this.validateProperty(name, value);
        if (errorMassage) { updateError[name] = errorMassage }
        else delete updateError[name];

        console.log(updateError)

        let updateData = { ...data };
        updateData[e.target.name] = e.target.value;

        this.setState({ data: updateData, errors: updateError });
        console.log(errors);
    }

    renderInput(name, label, type = "text") {
        const { data, errors } = this.state;
        return (
            <Input
                name={name}
                label={label}
                type={type}
                onChange={this.handleChange}
                value={data[name]}
                error={errors[name]}

            ></Input>
        );
    }

    renderButton(label) {
        return (
            <button disabled={this.validate()} className="btn btn-primary">{label}</button>
        )

    }
}

export default Form;