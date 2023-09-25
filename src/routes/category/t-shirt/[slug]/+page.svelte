<script lang="ts">
    import Product from "../../../../components/product.svelte";
    import {onMount} from "svelte";

    export let data;

    onMount(() => {
        console.log('AHAHAHAH', data)
    })
</script>

<Product product={data.product}/>
