import { Crias } from "./crias";

export interface Borregas{
    id?:string;
    arete:number;
    fecha_baja:number;
    fecha_entrada:number;
    fecha_nac:number;
    fecha_salida:number;
    ganadero: number;
    num_partos:number;
    peso_nacer: number;
    peso_actual: number;
    rfid:string;
    genero: string;
    crias: Crias[];
}