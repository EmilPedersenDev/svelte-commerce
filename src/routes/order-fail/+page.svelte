<script lang="ts">
    import BackBtn from "../../components/back-button.svelte";

</script>

<section id="order-fail" class="container prose md:container md:mx-auto p-5 md:p-0 order-status">
    <BackBtn url={"/cart"} msg={"Back to cart"}/>
    <h1>Your order did unfortunately not go through</h1>
    <h2>Please try again</h2>
    <i class="fa-solid fa-xmark"></i>
</section>

<style lang="scss">
  #order-fail {

    &.container {
      position: relative;
    }
  }

</style>
