<script lang="ts">
    import Category from "../../../components/category.svelte";
    import {onMount} from "svelte";

    export let data;

    onMount(() => {
        console.log("Category", data)
    })
</script>

<div class="container prose md:container md:mx-auto p-5 md:p-0">
    <h1>
        T-Shirt
    </h1>

    <Category products={data?.products} categoryName="t-shirt"/>
</div>
