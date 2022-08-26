import { PrismaClient, Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import { buildSystemErrorResponse } from '../helpers/error-handler';

import { buildSearchRequest } from '../helpers/search-policies';

const prisma = new PrismaClient();

const SELECT_FIELDS = {
    id: true,
    provider: true,
    insuranceType: true,
    status: true,
    startDate: true,
    endDate: true,
    client: {
        select: {
            id: true,
            firstName: true,
            lastName: true,
            dateOfBirth: true
        }
    },
    dependants: {
        select: {
            dependant: true
        }
    }
}

async function getAllPolicies(req: Request, res: Response) {
    try {
        const policies = await prisma.policy.findMany({
            select: SELECT_FIELDS
        });
        res.json(policies);
    } catch (err) {
        res.status(500).json(buildSystemErrorResponse(req, res, err))
    }
}

async function searchPolicies(req: Request, res: Response) {
    const predicate: Prisma.PolicyWhereInput = buildSearchRequest(req.body);
    try {
        const policies = await prisma.policy.findMany({
            where: predicate,
            select: SELECT_FIELDS
        })
        res.json(policies);
    } catch (err) {
        res.status(500).json(buildSystemErrorResponse(req, res, err))
    }

}

export {
    getAllPolicies,
    searchPolicies
}