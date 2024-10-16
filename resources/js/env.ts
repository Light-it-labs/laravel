import { z, ZodError } from "zod";

// We've defined here the validations & schema for making sure the env vars ARE correct.
const defaultValidation = z.string().min(1, "Env Var is not defined");
const envSchema = z.object({
  VITE_APP_ENV: defaultValidation,
  VITE_APP_URL: defaultValidation,
  VITE_GOOGLE_AUTH_SSO_CLIENT_ID: defaultValidation,
  VITE_API_URL: defaultValidation,
  VITE_SENTRY_DSN: defaultValidation,
  VITE_SENTRY_TRACE_PROPAGATION_TARGET_REGEX: defaultValidation,
});

type EnvValues = z.infer<typeof envSchema>;

// IDEA: trigger a toast message on dev instead of just a console error
function logEnvError(errors: ZodError<EnvValues>) {
  const { ...formattedErrors } = errors.format();

  console.error("<");
  console.error("ENVIRONMENT VARIABLES ERRORS:");
  console.error("----");
  Object.entries(formattedErrors).forEach(([name]) => {
    console.error(name);
  });
  console.error("----");
  console.error(">");
}

function checkEnv() {
  try {
    return envSchema.parse(import.meta.env);
  } catch (errors) {
    if (errors instanceof ZodError) {
      logEnvError(errors as ZodError<EnvValues>);
    }

    // So! We had some validation errors
    // let's just make sure the shape of the object is what we are expecting
    return Object.fromEntries(
      Object.keys(envSchema.shape).map((key) => [
        key,
        import.meta.env[key] || "",
      ]),
    ) as EnvValues;
  }
}

export const env = checkEnv();
