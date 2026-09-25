import { getAuth } from "@clerk/react-router/server";
import { redirect, type LoaderFunctionArgs, type ActionFunctionArgs } from "react-router";

export interface AdminAuthSession {
  userId: string;
  sessionId: string;
}

/**
 * Pure authorization check verifying if the authenticated user is in the admin allowlist.
 * Siga o princípio: Clerk autentica. A aplicação autoriza.
 */
export function isAuthorizedAdmin(
  userId: string | null | undefined,
  adminUserId: string | null | undefined,
): boolean {
  if (!userId || !adminUserId) {
    return false;
  }
  return userId.trim() === adminUserId.trim();
}

/**
 * Server-side authorization guard protecting administrative routes and mutations.
 * 
 * Rules:
 * 1. Unauthenticated users are redirected to /sign-in.
 * 2. Authenticated users who are NOT the designated administrator receive 403 Forbidden.
 * 3. Only explicitly authorized administrators gain access.
 */
export async function requireAdmin(
  args: LoaderFunctionArgs | ActionFunctionArgs,
  options?: { adminUserId?: string },
): Promise<AdminAuthSession> {
  const auth = await getAuth(args);
  const adminUserId =
    options?.adminUserId ||
    (typeof process !== "undefined" && process.env ? process.env.ADMIN_CLERK_USER_ID : undefined);

  if (!auth.userId) {
    const url = new URL(args.request.url);
    const redirectUrl = encodeURIComponent(url.pathname + url.search);
    throw redirect(`/sign-in?redirect_url=${redirectUrl}`);
  }

  if (!isAuthorizedAdmin(auth.userId, adminUserId)) {
    throw new Response(
      "Acesso Negado: Seu usuário autenticado não possui autorização administrativa na Fluorite Labs.",
      {
        status: 403,
        statusText: "Forbidden",
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      },
    );
  }

  return {
    userId: auth.userId,
    sessionId: auth.sessionId || "",
  };
}
