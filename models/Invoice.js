import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    projectProcess: { type: String },
    invoiceDescription: { type: String },
    invoiceTo: { type: String, required: true },
    invoicePrice: { type: Number, required: true },
    invoiceTaxCheck: { type: Boolean },
    paymentType: { type: String },
    paymentBankacct: { type: String },
    invoicePriority: { type: String },
    invoiceStatus: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", InvoiceSchema);

export default Invoice;
