<script lang="ts">
    export let url = "/"
    export let msg = "Back button"

</script>


<div class="back-btn">
    <i class="fa-solid fa-arrow-right"></i>
    <a href={url}>{msg}</a>
</div>

<style lang="scss">
  .back-btn {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;

    a {
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    .fa-solid.fa-arrow-right {
      transform: rotate(180deg);
      font-size: 1rem;
      margin-right: 0.5rem;
    }
  }
</style>
