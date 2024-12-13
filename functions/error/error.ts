export class CustomErrorHandler extends Error {
  public status: number;

  constructor(status: number = 500, message: string = "Internal Server Error") {
    super(message);
    this.status = status;

    // Ensures the name of the error is preserved
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;
  }

  getErrorInfo(msg: string = "Internal Server Error", status: number = 500) {
    return {
      message: msg,
      status: status,
    };
  }
}
