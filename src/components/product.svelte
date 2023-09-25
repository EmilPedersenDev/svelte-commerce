<script lang="ts">
    import type {Product, ProductItem, ProductOrderReq, User} from "../types";
    import {productOrder} from "../stores/order-store";
    import {onDestroy, onMount} from "svelte";
    import Alert from '../components/alert.svelte'
    import {user} from "../stores/user-store";

    // Reactive state
    export let product: Product | undefined = undefined;
    let selectedSize = "";
    let selectedColor = "";
    let error = null;
    let userId;
    let orderSuccess = false;
    let availableSizes = [];

    onMount(() => {
        console.log("MOUUUUNT", product);
    })

    function setAvailableColors(product) {
        const colors: string[] = [];
        product.productItems.forEach(item => {
            if (!colors.includes(item.color)) {
                colors.push(item.color)
            }
        })
        return colors;
    }

    $: availableColors = setAvailableColors(product);

    const getSelectedProductItem = (): ProductItem | undefined => {
        if (!product) return undefined;
        return product?.productItems?.find((productItem: ProductItem) => productItem.size === selectedSize && productItem.color === selectedColor);
    }

    function getAvailableSizes() {
        let tempAvailableSizes = [];
        product?.productItems.forEach(item => {
            if (item.color === selectedColor) {
                tempAvailableSizes.push(item.size)
            }
        })
        availableSizes = tempAvailableSizes;
    }

    const unsubscribeUserStore = user.subscribe((value: User): void => {
        userId = value?.id;
    })

    onDestroy((): void => {
        unsubscribeUserStore();
    })

    const addToCart = async (): Promise<void> => {
        try {
            const selectedProductItem: ProductItem | undefined = getSelectedProductItem();

            if (!selectedProductItem) {
                throw new Error("No productItem was selected");
            }

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

    const onColorChange = (event: any): void => {
        selectedColor = event.target.value;
        getAvailableSizes();
    }

    function onChange(event: any): void {
        selectedSize = event.target.value;
    }
</script>

{#if orderSuccess}
    <Alert type={'success'} alertMsg={"Successfully added product to cart"} on:closeAlert={() => {error = null}}/>
{/if}
<h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"> {product.name} </h1>

<div class="card card-compact bg-base-100">
    <figure><img
            src={product.image}
            alt="Shoes"/></figure>
    <div class="card-body">
        <p class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-2xl">{product.price}
            $</p>
        <div class="sizes-container">
            <h2 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-2xl">Colors</h2>
            {#each availableColors as color, i}
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text">{color}</span>
                        <input type="radio" name="color" value={color} on:change={onColorChange}
                               class="radio checked:bg-red-500"
                               checked="{selectedColor.toLowerCase() === color.toLowerCase()}"/>
                    </label>
                </div>
            {/each}
        </div>
        {#if selectedColor}
            <div class="sizes-container">
                <h2 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-2xl">
                    Sizes</h2>
                {#each availableSizes as size, i}
                    <div class="form-control">
                        <label class="label cursor-pointer">
                            <span class="label-text">{size}</span>
                            <input type="radio" name="size" value={size} on:change={onChange}
                                   class="radio checked:bg-red-500"
                                   checked="{selectedSize.toLowerCase() === size.toLowerCase()}"/>
                        </label>
                    </div>
                {/each}
            </div>
        {/if}

        <div class="card-actions justify-center">
            <button on:click={addToCart} class="btn" disabled="{!selectedSize || !selectedColor}">Add to cart</button>
        </div>
    </div>
    {#if error}
        <Alert type={'error'} alertMsg={error} on:closeAlert={() => {error = null}}/>
    {/if}
</div>

<style lang="scss">
  img {
    width: 500px;
    max-width: 500px;
    height: 500px;
    max-height: 500px;
    object-fit: cover;
    border-radius: 5px;
  }

  h1, h2, p {
    text-align: center;
  }

  .sizes-container {
    margin: 1rem 0;

    h2 {
      margin-bottom: 1rem;
    }

    .label {
      justify-content: center;
      column-gap: 1rem;
    }
  }

  .form-control {
    //max-width: 100px;
  }
</style>
