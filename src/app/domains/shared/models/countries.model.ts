export interface Country{
    id: number;
    name: string;
}

export interface State{
    id: number;
    id_country: number;
    name: string;
}

export interface Citie{
    id: number;
    id_state: number;
    name: string;
}

export interface States{
    states: State[];
}

export interface Cities{
    cities: Citie[];
}

export interface Countries{
    countries: Country[];
}