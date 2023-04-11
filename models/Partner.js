import mongoose from "mongoose";

const PartnerSchema = new mongoose.Schema(
  {
    partnerName: { type: String },
    partnerBusiness: { type: String },
    partnerRepresentative: { type: String },
    partnerLicenseNum: { type: String },
    partnerContactPerson: { type: String },
    partnerPhone: { type: String },
    partnerEmail: { type: String },
    partnerAddress: { type: String },
    partnerBankacct: { type: String },
  },
  { timestamps: true }
);

const Partner = mongoose.model("Partner", PartnerSchema);

export default Partner;
