import Partner from "../models/Partner.js";

// Partner
export const getPartners = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, sort = null } = req.query;

    const sortObj = sort
      ? (() => {
          const { field, sort: sortOrder } = JSON.parse(sort);
          return { [field]: sortOrder === "asc" ? 1 : -1 };
        })()
      : {};

    const partners = await Partner.find()
      .sort(sortObj)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Partner.countDocuments();

    res.status(200).json({ partners, total });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addPartner = async (req, res) => {
  try {
    const data = req.body;

    const newPartner = new Partner(data);
    await newPartner.save();

    res
      .status(201)
      .json({ message: "새 협력업체가 등록되었습니다!", partner: newPartner });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePartner = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const newPartner = await Partner.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      message: "협력업체 정보가 수정되었습니다!",
      partner: newPartner,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePartner = async (req, res) => {
  try {
    const { id } = req.params;

    await Partner.findByIdAndDelete(id);

    res.status(201).json({ message: "협력업체가 삭제되었습니다!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
