const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;
const Categorychema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  slug: {
    type: String,
    unique: true,
  },
});
Categorychema.pre('validate', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});
const Category = mongoose.model('Category', Categorychema);
module.exports = Category;
