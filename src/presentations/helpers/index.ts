import { HttpResponse } from "../protocols/http"

export const ServerError = (): HttpResponse => {
    return {
        statusCode: 500,
        body: {
            msg: "Server Internal Error"
        }
    }
}


export const BadRequest = (params): HttpResponse => {
    return {
        statusCode: 400,
        body: {
            msg: params
        }
    }
}