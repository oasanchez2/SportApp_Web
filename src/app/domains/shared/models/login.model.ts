import exp from "constants";

export interface LoginModel{
    username: string;
    password: string;
    codigo_MFA: string;
}

export interface Tokens{
    AccessToken: string;
    ExpiresIn: number;
    IdToken: string;
    RefreshToken: string;
    TokenType: string;
}

export interface LoginResult{
    AuthenticationResult: Tokens;
}


