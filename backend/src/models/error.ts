
type ErrorResponse = {
    name: String;
    message: String;
    details: ErrorDetails[]
}

type ErrorDetails = {
    field: String;
    value: String;
    issue: String;
    description: String;
    path: String;
}

export {
    ErrorDetails,
    ErrorResponse
}
