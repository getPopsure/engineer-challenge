import {Request, RequestHandler, Response} from "express/ts4.0"

export class IndexController {
  public get: RequestHandler = async (req: Request, res: Response) => {
    res.send("Server is up and running 🚀")
  }
}
