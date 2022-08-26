import { Request, Response } from "express";


function error(req: Request, res: Response, data: any) {
    console.error(`Error on ${req.method} ${req.url}`, data);
}

function info(req: Request, res: Response, data: any) {
    console.error(`Info about ${req.method} ${req.url}`, data);
}

function debug(req: Request, res: Response, data: any) {
    console.error(`Debug at ${req.method} ${req.url}`, data);
}

export default {
    error,
    info,
    debug
}

