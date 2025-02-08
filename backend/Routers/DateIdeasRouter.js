const controller = require("../controller/VirtualCoachController");
const express = require("express");
const CoachPageRouter = express.router();



CoachPageRouter.post("/session/coach/vitualdate",controller.data.Set_Meeting)
.post("/find/resources/articles",controller.data.GetMaterial)