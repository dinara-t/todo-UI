export type ApiValidationDetails = Record<string, string[]>;

export type ExceptionResponse = {
  path?: string;
  message?: string;
  status?: number;
  errorCode?: string;
  timestamp?: string;
  details?: ApiValidationDetails | null;
};

export class ApiError extends Error {
  status: number;
  errorCode?: string;
  details?: ApiValidationDetails | null;
  path?: string;

  constructor(
    message: string,
    status: number,
    errorCode?: string,
    details?: ApiValidationDetails | null,
    path?: string,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errorCode = errorCode;
    this.details = details;
    this.path = path;
  }
}

export function formatApiError(err: unknown): string {
  if (err instanceof ApiError) {
    const base = err.message || "Request failed";
    if (err.details && Object.keys(err.details).length) {
      const lines = Object.entries(err.details)
        .flatMap(([field, msgs]) => (msgs || []).map((m) => `${field}: ${m}`))
        .slice(0, 6);
      return `${base}\n${lines.join("\n")}`;
    }
    return base;
  }
  if (err instanceof Error) return err.message;
  return "Something went wrong";
}
