import { env } from "../../config/env.js";
import { AppError } from "../tags/errors/AppError.js";

interface Team {
  id: string;
  name: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}
export const FetchTeamExisting = async (
  teamId: string,
  accessToken: string,
): Promise<Team> => {
  const res = await fetch(
    `${env.TEAM_SERVICE_URL}/teams/list-team-by-teamId/${teamId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      signal: AbortSignal.timeout(5000),
    },
  );
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as {
      massage?: string;
    } | null;
    throw new AppError(res.status, body?.massage ?? "Team service error");
  }
  return (await res.json()) as Team;
};
