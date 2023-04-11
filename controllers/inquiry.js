import Inquiry from "../models/Inquiry.js";

// Inquiry
export const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find();

    const count = await Inquiry.countDocuments({});
    res.header("x-total-count", count);
    res.header("Access-Control-Expose-Headers", "x-total-count");

    const response = { data: inquiries, totalCount: count };
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createInquiry = async (req, res) => {
  try {
    const data = req.body;

    const inquiryId = await Inquiry.getNextSequence();
    const newInquiry = new Inquiry({ ...data, inquiryId });
    await newInquiry.save();

    res
      .status(201)
      .json({ message: "새 영업문의가 생성되었습니다!", inquiry: newInquiry });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const showInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const inquiry = await Inquiry.findById(id);

    res.status(200).json(inquiry);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const newInquiry = await Inquiry.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    res
      .status(201)
      .json({ message: "영업문의가 수정되었습니다!", inquiry: newInquiry });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const session = await mongoose.startSession();
    session.startTransaction();

    await Report.deleteMany({ inquiryId: id }, { session });
    await Invoice.deleteMany({ inquiryId: id }, { session });
    await Inquiry.findByIdAndDelete(id, { session });
    await session.commitTransaction();

    res.status(201).json({ message: "영업문의가 삭제되었습니다!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
