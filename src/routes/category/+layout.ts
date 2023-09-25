import type {Product, ProductCategory} from "../../types";
import api from '../../service/axios';
import {loadProductCategoryById} from "../../service/api-methods";

export const load = async ({url}: any): Promise<{ products: Product[] } | undefined> => {
    try {
        return await loadProductCategoryById(url.searchParams.get('id'), url.searchParams.get('sex'));
    } catch (err) {
        console.error(err)
    }
}
