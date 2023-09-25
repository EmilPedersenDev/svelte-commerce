<script lang="ts">
    import {productOrder} from "../../stores/order-store";
    import Alert from "../../components/Alert.svelte";
    import {changeQuantityTypes} from "../../enums";
    import type {Order, OrderItem, ProductOrderReq, User} from "../../types";
    import api from "../../service/axios";

    let error = null;
    let loading = false;
    let removeOrderItemDialog;
    let selectedOrderItemId = null;
    let productOrderPromise = getProductOrder();

    async function getProductOrder(): Promise<Order | {}> {
        return productOrder.get();
    }

    const showRemoveOrderItemModal = (orderItemId: number): void => {
        selectedOrderItemId = orderItemId;
        removeOrderItemDialog.showModal();
    }

    const closeRemoveOrderItemModal = (e: any): void => {
        if (e.currentTarget.returnValue === "confirm") {
            removeProductOrderItem()
        }
        selectedOrderItemId = null;
        removeOrderItemDialog.close();
    }

    const getTotalPrice = (productOrder: Order): number => {
        if (productOrder?.orderItems == null) {
            return 0;
        }
        return productOrder.orderItems.reduce((acc: number, curr: OrderItem) => acc + curr.price, 0);
    }

    const removeProductOrderItem = async (): Promise<void> => {
        try {
            if (!selectedOrderItemId) throw new Error("Order item id is required");
            await productOrder.deleteOrderItem(selectedOrderItemId);
            productOrderPromise = getProductOrder();
        } catch (err: any) {
            error = err.response?.data?.message;
        }
    }

    const changeQuantity = async (action: string, orderItem: OrderItem): Promise<void> => {
        try {
            if (orderItem.quantity <= 1 && action === changeQuantityTypes.DECREMENT) {
                showRemoveOrderItemModal(orderItem.id)
                return;
            }
            await productOrder.changeOrderItemQuantity(action, orderItem.id);
            productOrderPromise = getProductOrder();
        } catch (err: any) {
            error = err.response?.data?.message;
        }
    }

    const onStripeCheckout = async (productOrder: Order): Promise<void> => {
        try {
            const {data: redirectUrl}: { data: string; } = await api.post("productOrders/checkout", productOrder);
            window.location.href = redirectUrl;
        } catch (err: any) {
            error = err.response?.data?.message;
        }
    }

    const clearCart = async (order: Order) => {
        try {
            await productOrder.deleteAllOrderItems(order.id);
            productOrderPromise = getProductOrder();
        } catch (err: any) {
            error = err.response?.data?.message;
        }
    }

</script>

<section id="cart">
    {#await productOrderPromise}
        <span class="loading loading-ring loading-lg"></span>
    {:then productOrder}
        <h1>Cart</h1>
        <div class="overflow-x-auto">
            {#if productOrder.orderItems}
                <table class="table">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Product</th>
                        <th>Size</th>
                        <th>Quantity</th>
                        <th>Color</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {#each productOrder.orderItems as orderItem}
                        <tr>
                            <th>{orderItem.id}</th>
                            <td>{orderItem.productItem?.product?.name}</td>
                            <td>{orderItem.productItem?.size}</td>
                            <td>
                                <button on:click={() => { changeQuantity(changeQuantityTypes.DECREMENT, orderItem) }}
                                        class="number-btn decrement">
                                    -
                                </button>
                                <span class="number-input">{orderItem.quantity}</span>
                                <button on:click={() => { changeQuantity(changeQuantityTypes.INCREMENT, orderItem) }}
                                        class="number-btn increment">
                                    +
                                </button>
                            </td>
                            <td>{orderItem.productItem?.color}</td>
                            <td>{orderItem.price}$</td>
                            <td>
                                <button class="btn btn-circle btn-sm"
                                        on:click={() => {showRemoveOrderItemModal(orderItem.id)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                         viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    {/each}
                    </tbody>
                </table>
            {:else}
                <p>No products added to the cart yet</p>
            {/if}
        </div>
        {#if productOrder?.orderItems?.length > 0}
            <button class="btn btn-outline btn-error" on:click={clearCart(productOrder)}>Clear Cart</button>
        {/if}
        <h2><span>Total Price: </span>{getTotalPrice(productOrder)}$</h2>
        <button class="btn btn-outline" disabled={productOrder?.orderItems?.length < 1}
                on:click={onStripeCheckout(productOrder)}>
            {#if loading}
                <span class="loading loading-spinner"></span>
            {:else}
                <i class="fa-brands fa-stripe-s"></i>
            {/if}
            Checkout with Stripe
        </button>
        <dialog bind:this={removeOrderItemDialog} on:close={closeRemoveOrderItemModal} id="my_modal_1"
                class="modal">
            <form method="dialog" class="modal-box">
                <h2 class="font-bold text-lg">Remove order item</h2>
                <p class="py-4">Are you sure you want to remove this order item?</p>
                <button class="btn" value="confirm">
                    Delete
                </button>
                <button class="btn" value="cancel">Cancel</button>
            </form>
        </dialog>
    {:catch error}
        <Alert type={'error'} alertMsg={error} cloasable={false}/>
    {/await}

    {#if error}
        <Alert type={'error'} alertMsg={error} on:closeAlert={() => {error = null}}/>
    {/if}
</section>

<style lang="scss">
  #cart {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    > * {
      margin: 1rem 0;
    }

    h1 {
      font-weight: bold;
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    span {
      font-style: italic;
    }

    .number-input {
      padding: 0 2px;
    }

    .number-btn {
      background-color: rgb(242, 242, 242);
      border-radius: 50%;
      padding: 1px 7px 3px;
      transition: all ease 0.3s;

      &:hover {
        background-color: rgb(238, 236, 236);
      }

      &.decrement {
        padding: 1px 8px 3px;

      }
    }
  }
</style>
