export abstract class DomainException extends Error {
  constructor(message: string) {
    super(message)
  }

  abstract getStatus(): number
}


export class NotFoundException extends DomainException {
  constructor(message: string) {
    super(message)
  }

  getStatus(): number {
    return 404
  }
}

export const getStatus = (e: any): number => {
  if (e instanceof DomainException) {
    return e.getStatus()
  } else {
    return 500
  }
}

export const getMessage = (e: any): string => {
  if (e instanceof Error) {
    return e.message
  } else {
    return "Something Went Wrong"
  }
}
