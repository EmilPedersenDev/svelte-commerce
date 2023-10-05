import type {Order} from "./index";

interface User {
    id: number;
    name: string;
    productOrders?: Order[]
}
