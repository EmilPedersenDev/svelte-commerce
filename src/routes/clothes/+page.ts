/** @type {import('./$types').PageLoad} */
import type {Product} from "../../types";
import api from '../../service/axios';

export async function load(): Promise<{ item: Product } | undefined> {
    try {
        const {data}: any = await api.get("products");
        return {item: data};
    } catch (err) {
        console.error(err)
    }
}
