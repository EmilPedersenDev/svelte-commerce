<script lang="ts">
    import Category from "../../../components/category.svelte";
    import {onMount} from "svelte";

    export let data;
</script>

<div class="container prose md:container md:mx-auto">
    <h1>
        Pants
    </h1>

    <Category products={data?.products} categoryName="pants"/>
</div>
