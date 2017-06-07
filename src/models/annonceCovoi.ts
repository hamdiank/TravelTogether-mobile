import { User } from "./user";

export class AnnonceCovoi {
    id: string;
    datePublication: string;
    heureDepart:string;
    dateDepart: string;
    paysDepart: string;
    villeDepart: string;
    paysArrivee: string;
    villeArrivee: string;
    utilisateur : User;
    nombrePlaces: string;
    cotisation: string;
}