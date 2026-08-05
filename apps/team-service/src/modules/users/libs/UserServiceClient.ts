import { env } from "../../../config/env.js";
import { AppError } from "../../../shared/errors/AppError.js";

interface User {
  userId: string;
  role: string;
  name: string;
  email: string;
}

export const FetchUserById = async (
  accessToken: string,
  userId: string,
): Promise<User> => {
  const res = await fetch(
    `${env.USER_SERVICE_URL}/users/list-user-by-id/${userId}`,
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
      message?: string;
    } | null;
    throw new AppError(res.status, body?.message ?? "User service error");
  }
  return (await res.json()) as User;
};
