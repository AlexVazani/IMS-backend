import Invoice from "../models/Invoice.js";

// Invoice
export const getInvoices = async (req, res) => {
  try {
    const projectId = req.query.projectId;

    let invoices;
    if (projectId) {
      invoices = await Invoice.find({ projectId: projectId })
        .populate("projectId", "projectTitle")
        .populate("user", "userName");
    } else {
      invoices = await Invoice.find()
        .populate("projectId", "projectTitle")
        .populate("user", "userName");
    }

    res.status(200).json(invoices);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addInvoice = async (req, res) => {
  try {
    const data = req.body;

    const newInvoice = new Invoice(data);
    await newInvoice.save();

    res
      .status(201)
      .json({ message: "새 품의서가 생성되었습니다!", invoice: newInvoice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const newInvoice = await Invoice.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    res
      .status(201)
      .json({ message: "품의서가 수정되었습니다!", invoice: newInvoice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;

    await Invoice.findByIdAndDelete(id);

    res.status(201).json({ message: "품의서가 삭제되었습니다!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
