import exp from "constants";

export interface LoginModel{
    username: string;
    password: string;
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

export interface DesafioMFAModel{
    email: string;
    session: string;
    mfa_code: string;
}

export interface VerifyMFAModel{
    session: string;
    user_code: string;
}


