import mongoose from "mongoose";
import Inquiry from "../models/Inquiry.js";
import Project from "../models/Project.js";
import Schedule from "../models/Schedule.js";
import Report from "../models/Report.js";
import Invoice from "../models/Invoice.js";

// Project
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    const count = await Project.countDocuments({});
    res.header("x-total-count", count);
    res.header("Access-Control-Expose-Headers", "x-total-count");

    const response = { data: projects, totalCount: count };
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addProject = async (req, res) => {
  try {
    const { id } = req.params;
    const inquiry = await Inquiry.findById(id);

    const projectNo = await Project.getNextSequence();
    const newProject = new Project({
      projectNo: projectNo,
      projectTitle: inquiry.inquiryTitle,
      spaceType: inquiry.spaceType,
      spaceSize: inquiry.spaceSize,
      spaceLocation: inquiry.spaceLocation,
      clientName: inquiry.clientName,
      clientPhone: inquiry.clientPhone,
      salesManager: inquiry.salesManager,
      projectManager: inquiry.salesManager,
      projectPrice: inquiry.salesPrice,
      projectStatus: "철거설비",
      projectDescription: inquiry.salesDescription,
    });
    await newProject.save();
    await Report.updateMany({ inquiryId: id }, { projectId: newProject._id });
    await Inquiry.findByIdAndDelete(id);

    res
      .status(201)
      .json({ message: "프로젝트로 변경되었습니다!", project: newProject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const data = req.body;

    const projectNo = await Project.getNextSequence();
    const newProject = new Project({ ...data, projectNo });
    await newProject.save();

    // Add schedule
    if (newProject.projectStart && newProject.projectEnd) {
      const scheduleData = {
        scheduleTitle: newProject.projectTitle,
        scheduleStart: newProject.projectStart,
        scheduleEnd: newProject.projectEnd,
      };
      const newSchedule = new Schedule(scheduleData);
      await newSchedule.save();
    }

    res
      .status(201)
      .json({ message: "새 프로젝트가 생성되었습니다!", project: newProject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const showProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    res.status(200).json(project);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const newProject = await Project.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    // Add Schedule
    const scheduleFilter = {
      scheduleTitle: newProject.projectTitle,
    };
    const scheduleDates = {
      scheduleStart: newProject.projectStart,
      scheduleEnd: newProject.projectEnd,
    };
    if (newProject.projectStart && newProject.projectEnd) {
      await Schedule.findOneAndUpdate(scheduleFilter, scheduleDates, {
        new: true,
        upsert: true, // If no filter, new document will be created
      });
    }

    res
      .status(201)
      .json({ message: "프로젝트가 수정되었습니다!", project: newProject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const session = await mongoose.startSession();
    session.startTransaction();

    await Report.deleteMany({ projectId: id }, { session });
    await Invoice.deleteMany({ projectId: id }, { session });
    await Project.findByIdAndDelete(id, { session });
    await session.commitTransaction();

    res.status(201).json({ message: "프로젝트가 삭제되었습니다!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
