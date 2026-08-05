import { env } from "../../config/env.js";
import { AppError } from "../tags/errors/AppError.js";

interface User {
  teamId: string;
  userId: string;
  role: "OWNER" | "MEMBER";
  joinedAt: Date;
}
export const FetchTeamExisting = async (
  userId: string,
  accessToken: string,
): Promise<User> => {
  const res = await fetch(
    `${env.TEAM_SERVICE_URL}/teams/manager-user-by-id/${userId}`,
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
  return (await res.json()) as User;
};
