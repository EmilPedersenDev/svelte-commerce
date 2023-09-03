<script lang="ts">
    import BackBtn from "../../components/back-button.svelte";
    import {productOrder} from "../../stores/order-store";
    import Alert from "../../components/alert.svelte";

    let completeOrderPromise = productOrder.completeOrder();
</script>

<section id="order-success" class="container prose md:container md:mx-auto order-status">
    {#await completeOrderPromise}
    {:then completedOrderId}
        <BackBtn url={"/clothes"} msg={"Buy more clothes"}/>
        <h1>Your order went through</h1>
        <h2>Check your email for confirmation</h2>
        <h3>Order id: {completedOrderId}</h3>
        <i class="fa-solid fa-check"></i>
    {:catch error}
        <Alert type={'error'} alertMsg={error} cloasable={false}/>
    {/await}

</section>

<style lang="scss">
  #order-success {
    &.container {
      position: relative;
    }
  }
</style>
