import { Chambre } from "./Chambre";
import { Foyer } from "./Foyer";

export class Bloc{
    idBloc?:number;
    nomBloc?:string;
    capaciteBloc?:number;
    foyers? : Foyer;
    chambres? : Chambre[];

 
}