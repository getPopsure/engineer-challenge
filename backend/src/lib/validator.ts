import { InsuranceType, PolicyStatus } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { body, validationResult } from 'express-validator';

import { buildValidatorErrorResponse } from "../helpers/error-handler";

function validateRequestSchema(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(buildValidatorErrorResponse(req, res, errors.array()));
    }
    return next();
}

const SEARCH_POLICY_REQUEST_VALIDATOR = [
    body('insuranceType').isIn(Object.keys(InsuranceType)).withMessage('INVALID_INSURANCE_TYPE'),
    body('status').isIn(Object.keys(PolicyStatus)).withMessage('INVALID_POLICY_STATUS'),
    body('searchKey').escape()
]

export {
    validateRequestSchema,

    SEARCH_POLICY_REQUEST_VALIDATOR
}
