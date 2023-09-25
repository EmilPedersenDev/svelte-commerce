<script lang="ts">
    import Category from "../../../components/category.svelte";

    export let data;
</script>

<div class="container prose md:container md:mx-auto">
    <h1>
        Dresses
    </h1>

    <Category products={data?.products} categoryName="dresses"/>
</div>
