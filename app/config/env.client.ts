import { z } from "zod";

export const clientEnvSchema = z.object({
  VITE_SITE_URL: z
    .string()
    .url("VITE_SITE_URL must be a valid URL")
    .default("http://localhost:5173"),
  VITE_CLERK_PUBLISHABLE_KEY: z.string().optional(),
});

export type ClientEnv = z.infer<typeof clientEnvSchema>;

export function getClientEnv(): ClientEnv {
  const rawEnv = {
    VITE_SITE_URL: import.meta.env.VITE_SITE_URL,
    VITE_CLERK_PUBLISHABLE_KEY: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
  };

  const result = clientEnvSchema.safeParse(rawEnv);

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => ` - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(
      `Invalid client environment configuration:\n${issues}`,
    );
  }

  return result.data;
}
