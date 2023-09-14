import { sign,verify } from "jsonwebtoken";
import { GerenciadorDeToken, Options } from "./GerenciadorDeToken";

export class GerenciadorDeTokenAdaptarJsonWebToken implements GerenciadorDeToken {
	verifyToken(token: string, secket: string): object {
		const payload = verify(token, secket);
		return payload;
	}

	createToken(payload: object, privateKey: string, options: Options) {
		const token = sign(payload, privateKey, options);
		return token;
	}

}