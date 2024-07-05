import httpStatus from "http-status";
import { ZodError } from "zod";

export const handleZodError = (error: ZodError) => {
  const statusCode = httpStatus.BAD_REQUEST;
  const type = "Validation Error";
  let message = "";

  const ret = error?.issues.map((issue: any) => {
    if (issue?.received === "undefined") {
      return (message = `${issue.path[issue.path.length - 1]} is required.`);
    } else if (issue?.expected !== issue?.received) {
      return (message = `${issue.path[issue.path.length - 1]} is not valid type.`);
    } else if (issue.code === "too_small") {
      return issue.message;
    }
  });

  message = ret.join(" ");

  return {
    statusCode,
    type,
    message,
  };
};
