let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let toySchema = new Schema({
  toyName: { type: Number, required: true },
  toyUrl: { type: String, required: true },
  toyImg: { type: String },
  toyDescription: { type: String },
  toyVisit: { type: Number, default: 0 },
  toyShow: { type: Number, default: 0 },
  toyIssue: [{
    name: { type: String, require: true },
    content: { type: String, require: true },
    createTime: { type: Number, default: new Date().getTime() },
    email: String,
    website: String,
    ip: String
  }]
}, {
  versionKey: false
})

module.exports = mongoose.model('Toys', toySchema, 'toys')