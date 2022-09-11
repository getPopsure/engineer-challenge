import { Request, Response } from 'express';
import ExpressValidator from "express-validator";

import { ErrorDetails, ErrorResponse } from '../models/error';
import logger from '../lib/logger';

const ERROR_MESSAGES = {
    VALIDATION_ERROR: 'Request failed due to invalid or no paramter(s) sent.',
    INTERNAL_SERVER_ERROR: 'Request failed due to server error.',
    'SEARCH_POLICIES.VALIDATION_ERROR.INVALID_INSURANCE_TYPE_VALUE': 'Insurance type value is not valid',
    'SEARCH_POLICIES.VALIDATION_ERROR.INVALID_POLICY_STATUS_VALUE': 'Policy status value is not valid',
    'SEARCH_POLICIES.VALIDATION_ERROR.INVALID_INSURANCE_TYPE_TYPE': 'Insurance type must be array',
    'SEARCH_POLICIES.VALIDATION_ERROR.INVALID_POLICY_STATUS_TYPE': 'Policy status must be array',
    'SEARCH_POLICIES.VALIDATION_ERROR.INVALID_FIELD_TYPE': 'Search field must be string',
    'SEARCH_POLICIES.VALIDATION_ERROR.INVALID_VALUE_TYPE': 'Search value must be string'
}

function buildSystemErrorResponse(req: Request, res: Response, err: any) {
    logger.error(req, res, err);
    const resp: ErrorResponse = {
        name: 'INTERNAL_SERVER_ERROR',
        message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR
    };

    return resp;
}

function buildValidatorErrorResponse(req: Request, res: Response, errors: any[]) {
    logger.error(req, res, errors);
    const resp: ErrorResponse = {
        name: 'VALIDATION_ERROR',
        message: ERROR_MESSAGES.VALIDATION_ERROR,
        details: errors.map((error: ExpressValidator.ValidationError): ErrorDetails => ({
            field: error.param,
            value: error.value,
            location: error.location,
            issue: error.msg,
            //@ts-ignore
            description: ERROR_MESSAGES[error.msg]
        }))
    };

    return resp;
}


export {
    buildSystemErrorResponse,
    buildValidatorErrorResponse
}
