import express from "express";

import { login, logout } from "../controllers/authController.js";
import { refreshToken } from "../controllers/refreshToken.js";

import {
  getUsers,
  showUser,
  registerUser,
  updateUser,
  deleteUser,
  uploadUserPhoto,
} from "../controllers/user.js";
import upload from "../middlewares/upload.js";

import {
  getInquiries,
  createInquiry,
  showInquiry,
  updateInquiry,
  deleteInquiry,
} from "../controllers/inquiry.js";

import {
  getProjects,
  addProject,
  createProject,
  showProject,
  updateProject,
  deleteProject,
} from "../controllers/project.js";

import {
  createReport,
  deleteReport,
  getReports,
} from "../controllers/report.js";

import {
  getSchedule,
  addSchedule,
  updateSchedule,
  deleteSchedule,
} from "../controllers/schedule.js";

import {
  getInvoices,
  addInvoice,
  updateInvoice,
  deleteInvoice,
} from "../controllers/invoice.js";

import {
  getPartners,
  addPartner,
  updatePartner,
  deletePartner,
} from "../controllers/partner.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);

router.get("/users", getUsers);
router.get("/users/:id", showUser);
router.post("/users", upload.single("userPhoto"), registerUser);
router.patch("/users/:id", upload.single("userPhoto"), updateUser);
router.delete("/users/:id", deleteUser);
router.post("/upload", upload.single("userPhoto"), uploadUserPhoto);

router.get("/inquiries", getInquiries);
router.post("/inquiries", createInquiry);
router.get("/inquiries/:id", showInquiry);
router.patch("/inquiries/:id", updateInquiry);
router.delete("/inquiries/:id", deleteInquiry);

router.get("/projects", getProjects);
router.post("/projects/create", createProject);
router.post("/projects/:id", addProject);
router.get("/projects/:id", showProject);
router.patch("/projects/:id", updateProject);
router.delete("/projects/:id", deleteProject);

router.get("/reports", getReports);
router.post("/:id/reports", createReport);
router.delete("/:id/reports/:reportId", deleteReport);

router.get("/schedule", getSchedule);
router.post("/schedule", addSchedule);
router.patch("/schedule/:id", updateSchedule);
router.delete("/schedule/:id", deleteSchedule);

router.get("/invoices/:projectId?", getInvoices);
router.post("/invoices", addInvoice);
router.patch("/invoices/:id", updateInvoice);
router.delete("/invoices/:id", deleteInvoice);

router.get("/partners", getPartners);
router.post("/partners", addPartner);
router.patch("/partners/:id", updatePartner);
router.delete("/partners/:id", deletePartner);

export default router;
