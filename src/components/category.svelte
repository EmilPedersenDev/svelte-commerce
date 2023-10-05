<script lang="ts">
    import {goto} from '$app/navigation';
    import type {Product} from "../types";

    export let products: Array<Product> | undefined = undefined;
    export let categoryName: string = "";

    let placeholderImage = 'https://plus.unsplash.com/premium_photo-1673125287084-e90996bad505?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60';

    const goToProduct = (productId): void => {
        goto(`/category/${categoryName}/${productId}`)
    }
</script>


<div id="category" class="container mx-auto">
    <ul class="p-0">
        {#each products as product}
            <a href={`/category/${categoryName}/${product.id}`}>
                <li class="card card-compact bg-base-100 shadow-xl">
                    <figure><img
                            src={product.image || placeholderImage}
                            alt="Shoes"/></figure>
                    <div class="card-body">
                        <h2 class="card-title">{product.name}</h2>
                        <p>{product.price}$</p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-primary" on:click={goToProduct(product.id)}>Buy</button>
                        </div>
                    </div>
                </li>
            </a>
        {/each}
    </ul>
</div>


<style lang="scss">
  #category {
    h1 {
      text-align: center;
    }

    a {
      text-decoration: none;
    }

    ul {
      display: grid;
      grid-template-columns: repeat(4, minmax(200px, 1fr));
      gap: 20px;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }

      li {
        height: 400px;
        transition: transform 0.4s ease;

        figure {
          flex: 1 1 50%;

          img {
            height: 100%;
            width: 100%;
            object-fit: cover;
          }
        }

        &:hover {
          transform: scale(1.02);
        }

        figure {
          margin: 0;
        }

        h2 {
          margin: 0;
        }
      }
    }
  }


</style>
