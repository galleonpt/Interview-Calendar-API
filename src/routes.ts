import { Router } from "express";

import InterviewersController from "./controllers/InterviewersController";
import CandidatesController from "./controllers/CandidatesController";

const routes = Router();

routes.post("/interviewers", InterviewersController.create);
routes.get("/interviewers", InterviewersController.index);

routes.post("/candidates", CandidatesController.create);
routes.get("/candidates", CandidatesController.index);

routes.get("/matches", CandidatesController.matches);
routes.get("/matches", CandidatesController.matches);
routes.get("/matches", CandidatesController.matches);
routes.get("/matches", CandidatesController.matches);
routes.get("/matches", CandidatesController.matches);

export { routes };
