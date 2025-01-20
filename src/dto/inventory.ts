// Check In Request 
export interface CheckInRequest {
  barcode: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  size_id: number;
}

// Check In Response
export interface CheckInResponse {

}


