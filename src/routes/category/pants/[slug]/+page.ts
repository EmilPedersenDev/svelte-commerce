import type {Product} from "../../../../types";
import {loadProductById} from "../../../../service/api-methods";

export const load = async ({params}: any): Promise<{ product: Product } | undefined> => {
    try {
        return await loadProductById(params);
    } catch (err) {
        console.error(err)
    }
}
