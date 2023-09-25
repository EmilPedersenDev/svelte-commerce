/** @type {import('./$types').PageLoad} */
import type {ProductCategory} from "../types";
import api from '../service/axios';

export async function load(): Promise<{ productCategories: ProductCategory } | undefined> {
    try {
        const {data}: any = await api.get("productCategories");
        return {productCategories: data};
    } catch (err) {
        console.error(err)
    }
}
