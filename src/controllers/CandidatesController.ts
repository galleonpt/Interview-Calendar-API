import { Request, Response } from "express";
import prismaClient from "../prisma";
import { getTimeSlots } from "../utils/getTimeSlots";
import { getMatches } from "../utils/getMatches";

class CandidatesController {
  async index(request: Request, response: Response) {
    const candidates = await prismaClient.candidates.findMany({
      include: { availabilities: true },
    });

    return response.json(candidates);
  }

  async create(request: Request, response: Response) {
    const { name, times } = request.body;

    if (!name || times.length === 0) {
      return response.status(400).json({ error: "Invalid data" });
    }

    const nameInUse = await prismaClient.candidates.findFirst({
      where: {
        name,
      },
    });

    let slots = [];

    for (let i = 0; i < times.length; i++) {
      if (getTimeSlots(times[i].startDate, times[i].endDate) === -1) {
        return response.status(400).json({ error: "Invalid time" }).end();
      }

      slots.push(getTimeSlots(times[i].startDate, times[i].endDate));
    }

    slots = slots.flat();

    const candidate = await prismaClient.candidates.create({
      data: { name },
    });

    slots.forEach(async (item) => {
      const availalities = await prismaClient.candidatesAvailability.create({
        data: {
          candidate_id: candidate.id,
          start_date: item.startDate,
          end_date: item.endDate,
        },
      });

      return availalities;
    });

    return response.status(201).json({ message: "Inserted" });
  }

  async matches(request: Request, response: Response) {
    let { candidate, interviewers } = request.query;

    if (!candidate || !interviewers || interviewers.length === 0) {
      return response.status(400).json({ error: "Invalid date" });
    }

    interviewers = interviewers.split(",");

    const candidateInfo = await prismaClient.candidates.findFirst({
      where: {
        name: candidate,
      },
      select: {
        availabilities: {
          orderBy: {
            start_date: "asc",
          },
        },
      },
    });

    const newerAvailability = candidateInfo["availabilities"][0].start_date;
    const olderAvailability =
      candidateInfo["availabilities"].slice(-1).end_date;

    const interviewersInfo = await prismaClient.interviewers.findMany({
      where: {
        name: { in: interviewers },
      },
      select: {
        name: true,
        availabilities: {
          where: {
            start_date: { gte: newerAvailability },
            end_date: { lte: olderAvailability },
          },
          orderBy: {
            start_date: "asc",
          },
        },
      },
    });

    const matches = getMatches(
      candidateInfo["availabilities"],
      interviewersInfo
    );
    return response.status(200).json(matches);
  }
}

export default new CandidatesController();
