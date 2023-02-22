export default class Product{
    brand: string;
    name: string;
    description:string;
    price: string;
    reduziert: string;
    oldprice: string;

    constructor(brand: string,name: string,
     description:string,     price: string,
     reduziert: string,
     oldprice: string,){
        this.brand = brand;
        this.name = name;
        this.description = description;
        this.price = price;
        this.reduziert = reduziert;
    }
}