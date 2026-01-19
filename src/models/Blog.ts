import mongoose, { Schema, model, models } from 'mongoose';

const BlogSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the blog post.'],
  },
  slug: {
    type: String,
    required: [true, 'Please provide a slug.'],
    unique: true,
  },
  excerpt: {
    type: String,
    required: [true, 'Please provide an excerpt.'],
  },
  image: {
    type: String,
  },
  content: {
    type: String, // Markdown content
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default models.Blog || model('Blog', BlogSchema);
