import { env } from "../../../config/env.js";
import { AppError } from "../../../shared/errors/AppError.js";

interface TeamMember {
  userId: string;
  role: string;
  joinedAt: string;
}

interface ListTeamMembersResponse {
  teamId: string;
  members: TeamMember[];
}

export const FetchMyTeamMembers = async (
  accessToken: string,
): Promise<ListTeamMembersResponse> => {
  const res = await fetch(`${env.TEAM_SERVICE_URL}/teams/members`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as
      | { message?: string }
      | null;
    throw new AppError(res.status, body?.message ?? "Team service error");
  }

  return (await res.json()) as ListTeamMembersResponse;
};
