class AppError{
    message: string;
    statusCode: number;

    constructor(message, statusCode = 400){
       this.message = message;
        this.statusCode = statusCode;
    }
}

export { AppError };