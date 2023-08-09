import {writable} from 'svelte/store';
import api from '../service/axios';
import type {AxiosResponse} from 'axios';
import type {Order, OrderItem, ProductItem, ProductOrderReq} from "../types";

function getProductOrder() {
    const {subscribe, set, update} = writable({});

    return {
        subscribe,
        get: async (userId: number): Promise<Order> => {
            try {
                const {data: pendingProductOrder}: AxiosResponse<Order> = await api.get(`productOrders/${userId}?status=pending`);
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
        }
    };
}

export const productOrder = getProductOrder();

