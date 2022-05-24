export abstract class DomainException extends Error {
  protected constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, DomainException.prototype);
  }

  abstract getStatus(): number
}


export class NotFoundException extends DomainException {
  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, NotFoundException.prototype);
  }

  override getStatus(): number {
    return 404
  }
}

export class BadRequestException extends DomainException {
  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, BadRequestException.prototype);
  }

  override getStatus(): number {
    return 400;
  }
}

export class InvalidEntityException extends DomainException {
  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, InvalidEntityException.prototype);
  }

  override getStatus(): number {
    return 400;
  }
}

export const getStatus = (e: Error): number => {
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


export class TODO extends Error {
  constructor() {
    super("Not Implemented");
  }
}
