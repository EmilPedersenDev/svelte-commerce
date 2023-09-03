import {get, writable} from 'svelte/store';
import api from '../service/axios';
import type {AxiosResponse} from 'axios';
import type {Writable} from 'svelte/store';
import type {Order, OrderItem, ProductOrderReq, User} from "../types";
import {user} from "./user-store";

function getProductOrder() {
    const productOrderStore: Writable<{}> = writable({});
    const {subscribe, set, update} = productOrderStore;

    return {
        subscribe,
        get: async (): Promise<Order | {} | null> => {
            try {
                const productOrder = get(productOrderStore);
                if (productOrder && Object.keys(productOrder).length !== 0) {
                    return productOrder;
                }

                const cachedUser: User = get(user);
                if (cachedUser && Object.keys(cachedUser).length === 0) return null;

                const {data: pendingProductOrder}: AxiosResponse<Order> = await api.get(`productOrders/${cachedUser.id}?status=pending`);
                set(pendingProductOrder);
                return pendingProductOrder;
            } catch (err) {
                throw err;
            }
        },
        create: async (productOrderReq: ProductOrderReq): Promise<void> => {
            try {
                const {data: newProductOrder}: AxiosResponse<Order> = await api.post("productOrders", productOrderReq);
                set(newProductOrder)
            } catch (err: any) {
                throw err;
            }
        },
        deleteOrderItem: async (orderItemId: number): Promise<void> => {
            try {
                await api.delete(`orderItems/${orderItemId}`);
                update((productOrder: any) => {
                    productOrder?.orderItems.forEach((orderItem: OrderItem, i: number): void => {
                        if (orderItem.id === orderItemId) {
                            productOrder.orderItems.splice(i, 1);
                        }
                    })
                    return productOrder;
                })
            } catch (err: any) {
                console.error(err);
                throw err;
            }
        },
        changeOrderItemQuantity: async (type: string, orderItemId: number): Promise<void> => {
            try {
                const updateOrderItemQuantityReq: { type: string, orderItemId: number } = {
                    type,
                    orderItemId
                }
                const {data: updatedOrderItem}: AxiosResponse<OrderItem> = await api.patch(`orderItems/${orderItemId}`, updateOrderItemQuantityReq);

                update((productOrder: any) => {
                    for (let i: number = 0; i < productOrder?.orderItems.length; i++) {
                        if (productOrder.orderItems[i].id === orderItemId) {
                            productOrder.orderItems[i] = updatedOrderItem;
                        }
                    }
                    return productOrder;
                })
            } catch (err: any) {
                console.error(err);
                throw err;
            }
        },
        completeOrder: async function (): Promise<number | void> {
            try {
                debugger
                const productOrder: Order | {} | null = await this.get();
                if (productOrder && Object.keys(productOrder).length !== 0) {
                    const {data: completedOrderID}: AxiosResponse<number> = await api.post(`productOrders/complete-order`, productOrder);
                    set({});
                    return completedOrderID;
                } else {
                    throw new Error("No productOrder was found")
                }
            } catch (err: any) {
                console.error(err);
                throw err;
            }
        }
    };
}

export const productOrder = getProductOrder();

