import ExpressValidator, { Location } from "express-validator";

type ErrorResponse = {
    name: String;
    message: String;
    details?: ErrorDetails[]
}

type ErrorDetails = {
    field: String;
    value: String;
    description: String;
    issue: String;
    location: Location | undefined;
}

type ValidationError = ExpressValidator.ValidationError & {
    desc: string
}

export {
    ErrorDetails,
    ErrorResponse,
    ValidationError
}
