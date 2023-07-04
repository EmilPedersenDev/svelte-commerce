export interface Product {
    id: number;
    name: string;
    price: number;
    sex: string;
    company_id: null | number;
    productItems: ProductItem[]
}


export interface ProductItem {
    id: number;
    quantity: number;
    size: string;
    color: string;
}
