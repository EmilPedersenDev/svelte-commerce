<script lang="ts">
    import type {Product, ProductItem, ProductOrderReq, User} from "../../../types";
    import {productOrder} from "../../../stores/order-store";
    import {onDestroy} from "svelte";
    import Alert from '../../../components/alert.svelte'
    import {user} from "../../../stores/user-store";

    // Reactive state
    export let data;
    const {product}: Product = data;
    let selectedSize = "";
    let error = null;
    let userId;
    let orderSuccess = false;

    // Computed properties
    $: selectedProductItem = product.productItems.find((productItem: ProductItem) => productItem.size === selectedSize);

    const unsubscribeUserStore = user.subscribe((value: User): void => {
        userId = value?.id;
    })

    onDestroy((): void => {
        unsubscribeUserStore();
    })

    const addToCart = async (): Promise<void> => {
        try {
            const productOrderReq: ProductOrderReq = {
                userId: userId,
                productItem: {...selectedProductItem, quantity: 1},
                currentProductOrder: null
            }
            await productOrder.create(productOrderReq);
            orderSuccess = true;
        } catch (err) {
            error = err.response?.data?.message || "Error message";
            console.error(err)
        }

    }

    function onChange(event: any): void {
        selectedSize = event.target.value;
    }
</script>

{#if orderSuccess}
    <Alert type={'success'} alertMsg={"Successfully added product to cart"} on:closeAlert={() => {error = null}}/>
{/if}
<h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">Product
    no.{data?.slug}</h1>

<div class="card card-compact bg-base-100">
    <figure><img
            src="https://plus.unsplash.com/premium_photo-1673125287084-e90996bad505?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
            alt="Shoes"/></figure>
    <div class="card-body">
        <h2>{product.name}</h2>
        <p>{product.price}$</p>
        <h2>Sizes</h2>
        {#each product.productItems as productItem, i}
            <div class="form-control">
                <label class="label cursor-pointer">
                    <span class="label-text">{productItem.size}</span>
                    {#if productItem.quantity > 0}
                        <input type="radio" name="radio-10" value={productItem.size} on:change={onChange}
                               class="radio checked:bg-red-500"
                               checked="{selectedSize.toLowerCase() === productItem.size.toLowerCase()}"/>
                    {/if}
                </label>
            </div>
        {/each}
        <div class="card-actions justify-center">
            <button on:click={addToCart} class="btn" disabled="{!selectedSize}">Add to cart</button>
        </div>
    </div>
    {#if error}
        <Alert type={'error'} alertMsg={error} on:closeAlert={() => {error = null}}/>
    {/if}
</div>

<style lang="scss">
  img {
    width: 300px;
    height: auto;
  }

  h1, h2, p {
    text-align: center;
  }
</style>
