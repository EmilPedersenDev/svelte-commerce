<script>
  import {createEventDispatcher, onMount} from "svelte";

  const dispatch = createEventDispatcher();

  export let type = 'success';
  export let alertMsg = 'alert default message';
  export let cloasable = true;
  let showAlert = true;

  const onCloseAlert = () => {
    showAlert = false;
    dispatch('closeAlert');
  }

</script>

{#if showAlert}
    <div class={`alert alert-${type}`}>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span>{alertMsg}</span>
        {#if cloasable}
            <button class="btn btn-circle btn-outline" on:click={onCloseAlert}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        {/if}
    </div>
{/if}

