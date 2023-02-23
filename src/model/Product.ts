export type product = {
    brand: string;
    name: string;
    description:string;
    price: string;
    reduziert: string;
    oldprice: string;
    pictures: Array<string>;
    thumbnailImg: string;

    // constructor(brand: string,name: string,
    //  description:string,     price: string,
    //  reduziert: string,
    //  oldprice: string,){
    //     this.brand = brand;
    //     this.name = name;
    //     this.description = description;
    //     this.price = price;
    //     this.reduziert = reduziert;
    //     this.oldprice = oldprice;
    // }
}
export interface cartProduct extends product{
    amount: number;
}