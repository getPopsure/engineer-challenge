import { ErrorDetails, ErrorResponse } from '../models/error';
import { Request, Response } from 'express';

import logger from '../lib/logger';

function buildSystemErrorResponse(req: Request, res: Response, err: any) {
    logger.error(req, res, err);
    const resp: ErrorResponse = {
        name: 'INTERNAL_SERVER_ERROR',
        message: '',
        details: []
    };

    return resp;
}

function buildValidatorErrorResponse(req: Request, res: Response, errors: any[]) {
    logger.error(req, res, errors);
    const resp: ErrorResponse = {
        name: 'VALIDATION_ERROR',
        message: '',
        details: errors.map((error: any): ErrorDetails => ({
            field: error.param,
            value: error.value,
            description: "",
            path: error.location,
            issue: error.msg
        }))
    };

    return resp;
}


export {
    buildSystemErrorResponse,
    buildValidatorErrorResponse
}
