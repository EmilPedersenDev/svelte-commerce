<script lang="ts">
    import api from '../../../service/axios'
    import type {Product} from "../../../types";

    export let data;
    let selectedSize = "";
    const {product}: Product = data;

    const addToCart = (e) => {
        try {
            // const { data } = api.post();
            console.log("post to cart");
        } catch (err) {
            console.error(err)
        }

    }

    function onChange(event) {
        console.log(event.currentTarget.value)
        selectedSize = event.target.value;
    }
</script>

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
                    <input type="radio" name="radio-10" value={productItem.size} on:change={onChange}
                           class="radio checked:bg-red-500"
                           checked="{selectedSize.toLowerCase() === productItem.size.toLowerCase()}"/>
                </label>
            </div>
        {/each}
        <div class="card-actions justify-center">
            <button on:click={addToCart} class="btn">Add to cart</button>
        </div>
    </div>
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
