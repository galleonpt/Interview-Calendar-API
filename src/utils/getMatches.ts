/**
 * @param candidateAvailabilities Array of candidate availabilities
 * @param interviewersInfo Array of interviewers
 * @returns Array with the information of the interviewers who are available to speak with the candidate
 */
export function getMatches(candidateAvailabilities, interviewersInfo) {
  let matches = [];

  interviewersInfo.forEach((interviewer) => {
    // each interviewer
    let temp = [];
    interviewer["availabilities"].forEach((time) => {
      //each availability of the interviewer
      candidateAvailabilities.forEach((candidate) => {
        //each availability of the candidate
        if (
          time.start_date === candidate.start_date &&
          time.end_date === candidate.end_date
        ) {
          temp.push(time);
        }
      });
    });

    matches.push({
      name: interviewer.name,
      availabilities: temp,
    });
  });

  return matches;
}
