import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    projectNo: { type: Number, required: true },
    projectTitle: { type: String, required: true },
    spaceType: { type: String },
    spaceSize: { type: Number },
    spaceLocation: { type: String },
    clientName: { type: String },
    clientPhone: { type: String },
    salesManager: { type: String },
    projectManager: { type: String },
    projectPrice: { type: Number },
    projectStatus: { type: String },
    projectDescription: { type: String },
    projectStart: { type: Date },
    projectEnd: { type: Date },
    projectNotice: { type: String },
  },
  { timestamps: true }
);

ProjectSchema.statics.getNextSequence = async function () {
  const project = await this.findOne().sort({ projectNo: -1 });
  const nextProjectNo = project ? project.projectNo + 1 : 1;
  return nextProjectNo;
};

const Project = mongoose.model("Project", ProjectSchema);

export default Project;
