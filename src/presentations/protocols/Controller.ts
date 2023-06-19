import { HttpRequest, HttpResponse } from "./http";

export interface HttpController {
    handle(req: HttpRequest): Promise<HttpResponse>;
}