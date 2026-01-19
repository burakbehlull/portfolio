import mongoose, { Schema, model, models } from 'mongoose';

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the project.'],
    maxlength: [60, 'Title cannot be more than 60 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description.'],
  },
  image: {
    type: String,
  },
  content: {
    type: String, // Markdown content
    required: true,
  },
  tags: {
    type: [String],
  },
  demoLink: String,
  repoLink: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default models.Project || model('Project', ProjectSchema);
