export interface CreateRentalRequestForIndividualCustomer{
	  rentDate:Date;
	  returnDate:Date;
	  individualCustomerId:number;
	  carId:number;
	  promoCodeId:number;
}