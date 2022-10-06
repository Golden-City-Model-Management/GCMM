const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
  asset_id: String,
  bytes: Number,
  created_at: Date,
  etag: String,
  folder: String,
  format: String,
  height: Number,
  original_filename: String,
  placeholder: Boolean,
  public_id:  {
    type: String,
    required: [true, 'missing image public_id!']
  },
  resource_type: String,
  secure_url: {
    type: String,
    required: [true, 'missing image url!']
  },
  signature: String,
  version: Number,
  version_id: String,
  width: Number,
})

module.exports = ImageSchema