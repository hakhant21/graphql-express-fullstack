const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: String,
    task: String,
    completed: Boolean,
    categoryId: String
});

module.exports = mongoose.model('Project', projectSchema);