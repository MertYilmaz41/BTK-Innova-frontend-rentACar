export interface UpdatePromoCodeRequest{
    id:number;
    code:string;
    discountRate:number;
    startDate:Date;
    endDate:Date; 
}