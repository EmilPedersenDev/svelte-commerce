<script lang="ts">
    import {onMount} from "svelte";
    import Category from "../../../components/category.svelte";

    export let data;

    onMount(() => {
        console.log(data)
    })
</script>

<div class="container prose md:container md:mx-auto">
    <h1>
        Shoes
    </h1>

    <Category products={data?.products} categoryName="shoes"/>
</div>
