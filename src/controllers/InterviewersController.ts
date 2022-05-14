import { Request, Response } from "express";
import prismaClient from "../prisma";
import { getTimeSlots } from "../utils/getTimeSlots";

class InterviewersController {
  async index(request: Request, response: Response) {
    const interviewers = await prismaClient.interviewers.findMany({
      include: { availabilities: true },
    });

    return response.json(interviewers);
  }

  async create(request: Request, response: Response) {
    const { name, times } = request.body;

    if (!name || times.length === 0) {
      return response.status(400).json({ error: "Invalid data" });
    }

    const nameInUse = await prismaClient.interviewers.findFirst({
      where: {
        name,
      },
    });

    // if (nameInUse)
    //   return response.status(400).json({ error: "Name already taken" });

    let slots = [];

    for (let i = 0; i < times.length; i++) {
      if (getTimeSlots(times[i].startDate, times[i].endDate) === -1) {
        return response.status(400).json({ error: "Invalid time" }).end();
      }

      slots.push(getTimeSlots(times[i].startDate, times[i].endDate));
    }

    slots = slots.flat();

    const interviewer = await prismaClient.interviewers.create({
      data: { name },
    });

    slots.forEach(async (item) => {
      const availalities = await prismaClient.interviewersAvailability.create({
        data: {
          interviewer_id: interviewer.id,
          start_date: item.startDate,
          end_date: item.endDate,
        },
      });

      return availalities;
    });

    return response.status(201).json({ message: "Inserted" });
  }
}

export default new InterviewersController();
