import Report from "../models/Report.js";

// Report
export const createReport = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const { reportType, ...otherData } = data;

    // for validation
    if (!id || !reportType) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newReport = new Report({
      ...otherData,
      inquiryId: reportType === "inquiry" ? id : undefined,
      projectId: reportType === "project" ? id : undefined,
      reportType,
    });
    await newReport.save();

    res
      .status(201)
      .json({ message: "New report is created!", report: newReport });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReports = async (req, res) => {
  try {
    const { id } = req.params;
    const { inquiryId, projectId } = req.query;

    let query = {};

    if (inquiryId) {
      query.inquiryId = inquiryId;
    } else if (projectId) {
      query.projectId = projectId;
    }

    const reports = await Report.find(query)
      .populate("inquiryId", "inquiryTitle")
      .populate("projectId", "projectTitle")
      .populate("user", "userName userPhoto");

    res.status(200).json(reports);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const { id, reportId } = req.params;

    await Report.findByIdAndDelete(reportId);

    res.status(201).json({ message: "리포트가 삭제되었습니다!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
