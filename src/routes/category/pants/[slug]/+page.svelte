<script lang="ts">
    import Product from "../../../../components/product.svelte";
    import {onMount} from "svelte";

    export let data;
</script>

<Product product={data.product}/>
