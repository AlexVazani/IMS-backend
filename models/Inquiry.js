import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema(
  {
    inquiryId: { type: Number, required: true },
    inquiryTitle: { type: String, required: true },
    spaceType: { type: String },
    spaceSize: { type: Number },
    spaceLocation: { type: String },
    clientName: { type: String },
    clientPhone: { type: String },
    salesManager: { type: String },
    salesPrice: { type: Number },
    salesStatus: { type: String },
    salesDescription: { type: String },
  },
  { timestamps: true }
);

InquirySchema.statics.getNextSequence = async function () {
  const inquiry = await this.findOne().sort({ inquiryId: -1 });
  const nextInquiryId = inquiry ? inquiry.inquiryId + 1 : 1;
  return nextInquiryId;
};

const Inquiry = mongoose.model("Inquiry", InquirySchema);

export default Inquiry;
