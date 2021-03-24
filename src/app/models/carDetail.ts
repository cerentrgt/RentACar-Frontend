
import { RentalDetail } from "./rentalDetail";

export interface CarDetail extends RentalDetail{
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