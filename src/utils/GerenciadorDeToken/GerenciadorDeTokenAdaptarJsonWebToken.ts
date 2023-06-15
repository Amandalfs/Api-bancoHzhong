import { sign } from "jsonwebtoken";
import { GerenciadorDeToken, Options } from "./GerenciadorDeToken";

export class GerenciadorDeTokenAdaptarJsonWebToken implements GerenciadorDeToken {
    createToken(payload: object, privateKey: string, options: Options) {
        const token = sign(payload, privateKey, options);
        return token;
    }

}