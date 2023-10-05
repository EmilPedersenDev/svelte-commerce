<script lang="ts">
    import Category from "../../../components/category.svelte";

    export let data;
</script>

<div class="container prose md:container md:mx-auto p-5 md:p-0">
    <h1>
        Accessories
    </h1>

    <Category products={data?.products} categoryName="accessories"/>
</div>
