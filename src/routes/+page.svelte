<script lang="ts">
    import '../styling/app.scss';
</script>

<div class="landing-page">
    <h1 class="mb-5 text-5xl font-bold">Clothing Store</h1>
    <div class="landing-page landing-page__men background">
    </div>
    <div class="landing-page landing-page__women background">
    </div>
</div>

<style lang="scss">
  .landing-page {
    height: calc(100vh - 66px);
    display: flex;
    position: relative;

    h1 {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      color: white;
    }

    &.background {
      flex: 1 1 50%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      display: flex;
      justify-content: center;
      align-items: center;

      a {
        background: white;
        padding: 12px;
        transition: all 0.3s ease;
        border: 1px solid transparent;

        &:hover {
          border: 1px solid white;
          border-radius: 5px;
          background: transparent;
          color: white;

        }
      }

      &.landing-page__women {
        @media (max-width: 768px) {
          display: none;
        }
      }
    }

    .btn.glass {
      color: white;

      &:hover {
        color: black;
      }
    }


    &__men {
      background-image: url("$lib/assets/men.jpg");
    }

    &__women {
      background-image: url("$lib/assets/women.jpg");

    }
  }
</style>



