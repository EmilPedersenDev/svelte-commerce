import type {Product, ProductCategory} from "../types";
import api from "./axios";

export const loadProductCategoryById = async (id: number, sex: string): Promise<{
    products: Product[]
} | undefined> => {
    try {
        if (!id || !sex) return;
        const {data} = await api.get("productCategories/" + id + '?sex=' + sex);
        console.log('DATTTA', data)
        return {
            products: data
        }
    } catch (err) {
        throw err;
    }
};

export const loadProductById = async (params: any): Promise<{
    product: Product
} | undefined> => {
    try {
        if (params == null) return;
        const {data} = await api.get("products/" + params.slug);
        return {
            product: data
        }
    } catch (err) {
        throw err;
    }
}
