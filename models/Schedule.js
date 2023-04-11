import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema(
  {
    scheduleTitle: { type: String, required: true },
    scheduleStart: { type: String, required: true },
    scheduleEnd: { type: String },
  },
  { timestamps: true }
);

const Schedule = mongoose.model("Schedule", ScheduleSchema);

export default Schedule;
