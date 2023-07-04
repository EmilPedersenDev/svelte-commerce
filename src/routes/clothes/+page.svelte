<script lang="ts">
    import {goto} from '$app/navigation';

    export let data;

    const goToProduct = (productId): void => {
        goto(`/clothes/${productId}`)
    }
</script>


<div class="container prose md:container md:mx-auto">
    <h1>Clothes</h1>
    <ul>
        {#each data.item as product}
            <li class="card card-compact bg-base-100 shadow-xl">
                <figure><img
                        src="https://plus.unsplash.com/premium_photo-1673125287084-e90996bad505?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
                        alt="Shoes"/></figure>
                <div class="card-body">
                    <h2 class="card-title">{product.name}</h2>
                    <p>{product.price}$</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary" on:click={goToProduct(product.id)}>Buy Now</button>
                    </div>
                </div>
            </li>
        {/each}
    </ul>
</div>


<style lang="scss">

  h1 {
    text-align: center;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;

    li {
      max-height: 400px;

      figure {
        margin: 0;
      }

      h2 {
        margin: 0;
      }
    }
  }
</style>
