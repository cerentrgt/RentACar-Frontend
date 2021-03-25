
import { Rental } from "./rental";


export interface CarDetail extends Rental{
    id:number,
    carId:number,
    brandName:string,
    brandId:number,
    colorId:number,
    colorName:string,
    carName:string,
    dailyPrice:number,
    descriptions:string,
    modelYears:number

    
}