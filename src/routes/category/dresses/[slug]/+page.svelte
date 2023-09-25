<script lang="ts">
    import Product from "../../../../components/product.svelte";

    export let data;
</script>

<Product product={data.product}/>
