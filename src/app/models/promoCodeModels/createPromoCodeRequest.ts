export interface CreatePromoCodeRequest{
    code:string;
    discountRate:number;
    startDate:Date;
    endDate:Date;
}