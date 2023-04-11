import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    inquiryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inquiry",
    },
    reportType: {
      type: String,
      enum: ["inquiry", "project"],
      required: true,
    },
    reportStatus: { type: String, required: true },
    reportContent: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", ReportSchema);

export default Report;
