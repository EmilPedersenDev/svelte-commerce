export interface Product {
    id: number;
    name: string;
    price: number;
    sex: string;
    company_id: null | number;
    productItems: ProductItem[]
}

export interface ProductCategory {
    id: number;
    name: string;
    link: string;
    products: Product[]
}


export interface Status {
    PENDING: string;
    COMPLETED: string;
    REJECTED: string;
}


export interface Order {
    id: number;
    status: string;
    orderItems?: OrderItem[]
    userId?: number
}


export interface ProductOrderReq {
    userId: number | undefined;
    productItem: ProductItem | undefined;
    currentProductOrder: null
}

export interface OrderItem {
    id: number;
    quantity: number;
    price: number;
}


export interface ProductItem {
    id: number;
    quantity: number;
    size: string;
    color: string;
    productId: number
}

export interface User {
    id: number;
    name: string;
}
