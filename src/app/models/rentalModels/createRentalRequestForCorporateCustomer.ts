export interface CreateRentalRequestForCorporateCustomer{
    rentDate:Date;
    returnDate:Date;
    corporateCustomerId:number;
    carId:number;
    promoCodeId:number;
   
}