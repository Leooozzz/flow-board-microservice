import { AppError } from "../../../shared/errors/AppError.js";
import {
  FindMembersByTeamId,
  FindMembershipByUserId,
} from "../repository/TeamRepository.js";

export interface ListTeamMembersResponse {
  teamId: string;
  members: {
    userId: string;
    role: string;
    joinedAt: Date;
  }[];
}

export const ListTeamMembersService = async (
  userId: string,
): Promise<ListTeamMembersResponse> => {
  const membership = await FindMembershipByUserId(userId);

  if (!membership) {
    throw new AppError(404, "User is not part of any team");
  }

  const members = await FindMembersByTeamId(membership.teamId);

  return {
    teamId: membership.teamId,
    members: members.map((m) => ({
      userId: m.userId,
      role: m.role,
      joinedAt: m.joinedAt,
    })),
  };
};
