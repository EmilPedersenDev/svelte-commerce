import {writable} from "svelte/store";
import type {User} from "../types";
import type {Writable} from 'svelte/store';

export const user: Writable<User> = writable({
    id: 11,
    name: "Piotr Szcienski"
})
