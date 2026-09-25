import { z } from "zod";

export const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  SITE_URL: z.string().url("SITE_URL must be a valid URL").optional(),
  DATABASE_URL: z
    .string()
    .refine((val) => val.startsWith("postgresql://") || val.startsWith("postgres://"), {
      message: "DATABASE_URL must be a valid PostgreSQL connection URI",
    })
    .optional(),
  CLERK_SECRET_KEY: z.string().min(1, "CLERK_SECRET_KEY cannot be empty").optional(),
  ADMIN_CLERK_USER_ID: z.string().min(1, "ADMIN_CLERK_USER_ID cannot be empty").optional(),
});

export const strictProductionEnvSchema = serverEnvSchema.extend({
  NODE_ENV: z.literal("production"),
  DATABASE_URL: z
    .string({
      error: "DATABASE_URL is required in production environment",
    })
    .refine((val) => val.startsWith("postgresql://") || val.startsWith("postgres://"), {
      message: "DATABASE_URL must be a valid PostgreSQL connection URI",
    }),
  CLERK_SECRET_KEY: z.string({
    error: "CLERK_SECRET_KEY is required in production environment",
  }),
  ADMIN_CLERK_USER_ID: z.string({
    error: "ADMIN_CLERK_USER_ID is required in production environment",
  }),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

export class EnvValidationError extends Error {
  public readonly issues: string[];

  constructor(issues: string[]) {
    super(`Invalid server environment configuration:\n${issues.map((i) => ` - ${i}`).join("\n")}`);
    this.name = "EnvValidationError";
    this.issues = issues;
  }
}

export function validateServerEnv(
  rawEnv: Record<string, unknown>,
  options: { strict?: boolean } = {},
): ServerEnv {
  const schema = options.strict ? strictProductionEnvSchema : serverEnvSchema;
  const result = schema.safeParse(rawEnv);

  if (!result.success) {
    const issues = result.error.issues.map(
      (issue) => `${issue.path.join(".") || "env"}: ${issue.message}`,
    );
    throw new EnvValidationError(issues);
  }

  return result.data;
}
