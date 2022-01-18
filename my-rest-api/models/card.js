const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const _ = require('lodash');

const cardSchema = new mongoose.Schema({
  dressedName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255
  },
  dressedDescription: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024
  },
  dressedPrice: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 400
  },
  // bizPhone: {
  //   type: String,
  //   required: true,
  //   minlength: 9,
  //   maxlength: 10
  // },
  dressedImage: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 1024
  },
  dressedNumber: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 99999999999,
    unique: true
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Card = mongoose.model('Card', cardSchema);

function validateCard(card) {

  const schema = Joi.object({
    dressedName: Joi.string().min(2).max(255).required(),
    dressedDescription: Joi.string().min(2).max(1024).required(),
    dressedPrice: Joi.string().min(2).max(400).required(),
    // bizPhone: Joi.string().min(9).max(10).required().regex(/^0[2-9]\d{7,8}$/),
    dressedImage: Joi.string().min(11).max(1024)
  });

  return schema.validate(card);
}

async function generateDressedNumber(Card) {

  while (true) {
    let randomNumber = _.random(1000, 999999);
    let card = await Card.findOne({ dressedNumber: randomNumber });
    if (!card) return String(randomNumber);
  }

}

exports.Card = Card;
exports.validateCard = validateCard;
exports.generateDressedNumber = generateDressedNumber;