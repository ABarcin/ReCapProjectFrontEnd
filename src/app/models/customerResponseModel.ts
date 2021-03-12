import { Customer } from "./customer";
import { ResponseModel } from "./responseModel";

export interface CustomerResponseModel extends ResponseModel{
    data:Customer[],
    message:string,
    success:boolean
}