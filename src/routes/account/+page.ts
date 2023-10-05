/** @type {import('./$types').PageLoad} */
import type {ProductCategory} from "../../types";
import api from '../../service/axios';

export async function load(): Promise<{ account: any } | undefined> {
    try {
        const {data}: any = await api.get(`users/${11}`);
        return {account: data};
    } catch (err) {
        console.error(err)
    }
}
