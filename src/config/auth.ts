export const AuthConfig: AuthConfigToken = {
    jwt: {
        secret:"default",
        expiresIn: "1d"
    }
}

export interface AuthConfigToken {
    jwt: {
        secret: string,
        expiresIn: string,
    }
}