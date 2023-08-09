import type {Product} from "../../../types";
import api from '../../../service/axios';

export const load = async ({params}: any): Promise<{ slug: string; product: Product } | undefined> => {
    try {
        const {data} = await api.get("products/" + params.slug);
        return {
            slug: params.slug,
            product: data
        }
    } catch (err) {
        console.error(err)
    }
}
