



export class CustomErrorHandler extends Error {
  constructor(status = 500, message){
    super()
      this.message = message
      this.status = status
  }

  getErrorInfo(msg = "Internal Server Error", status = 500){
    return {
      message:msg ,
      status 
    }
  }
}