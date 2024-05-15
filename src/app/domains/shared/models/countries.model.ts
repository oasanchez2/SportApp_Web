export interface Countries{
    id: number;
    name: string;
}

export interface States{
    id: number;
    id_country: number;
    name: string;
}

export interface Cities{
    id: number;
    id_state: number;
    name: string;
}