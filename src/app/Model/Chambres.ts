import { Bloc } from "./Bloc";
import { TypeChambre } from "./TypeC";

export class Chambres{
    idChambre?:number;
    typeChambre?: TypeChambre;
    numeroChambre?:number;    
    capaciteChambre:number;
    bloc?: Bloc
}