import {
  AddMember,
  CreateTeam,
  DeleteTeamById,
  FindMembershipByUserId,
  RemoveMember,
} from "../repository/TeamRepository.js";

export interface UserCreatedEvent {
  userId: string;
  name: string;
  email: string;
  createdAt?: string;
  createdBy?: string | null;
}

export interface UserDeletedEvent {
  userId: string;
  deletedBy: string;
}

const EnsureCreatorTeam = async (
  userId: string,
  name: string,
): Promise<{ teamId: string }> => {
  const team = await CreateTeam({ name: `Time do ${name}`, ownerId: userId });
  await AddMember({ teamId: team.id, userId, role: "OWNER" });
  return { teamId: team.id };
};

export const HandleUserCreated = async (event: UserCreatedEvent) => {
  if (event.createdBy) {
    const creatorTeam =
      (await FindMembershipByUserId(event.createdBy)) ??
      (await EnsureCreatorTeam(event.createdBy, event.name));

    await AddMember({
      teamId: creatorTeam.teamId,
      userId: event.userId,
      role: "MEMBER",
    });
    return;
  }

  const team = await CreateTeam({
    name: `Time do ${event.name}`,
    ownerId: event.userId,
  });
  await AddMember({ teamId: team.id, userId: event.userId, role: "OWNER" });
};

export const HandleUserDeleted = async (event: UserDeletedEvent) => {
  const membership = await FindMembershipByUserId(event.userId);
  if (!membership) {
    return;
  }

  if (membership.role === "OWNER") {
    await DeleteTeamById(membership.teamId);
    return;
  }

  await RemoveMember(event.userId);
};
