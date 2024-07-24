const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const teacherRoutes = require("./routes/teacher.routes");
const feedbackRoutes = require("./routes/feedback.routes");
const managerRoutes = require("./routes/manager.routes");
const materialRoutes = require("./routes/material.routes");
const noticeRoutes = require("./routes/notice.routes");
const teacherRequestRoutes = require("./routes/teacherRequest.routes");
const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://root:root@cluster0.zekgg7g.mongodb.net/teacher_crud"
);

// Use Routes
app.use("/api", teacherRoutes);
app.use("/api", feedbackRoutes);
app.use("/api", managerRoutes);
app.use("/api", materialRoutes);
app.use("/api", noticeRoutes);
app.use("/api", teacherRequestRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
