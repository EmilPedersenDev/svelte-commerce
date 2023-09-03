<script lang="ts">
    import '../styling/app.scss';
    import {productOrder} from "../stores/order-store";
    import {onDestroy} from "svelte";
    import type {Order, Product} from "../types";

    let numOfProductItems = 0;
    let productOrderPromise = getProductOrder();

    async function getProductOrder(): Promise<Order | {} | void> {
        return productOrder.get();
    }

    const unsubscribe = productOrder.subscribe((productOrder: Order): void => {
        numOfProductItems = productOrder?.orderItems?.length || 0;
    })

    onDestroy((): void => {
        unsubscribe();
    })

    const handleClick = (e): void => {
        e.preventDefault();
        window.location.href = '/cart';
    }
</script>

<div class="navbar bg-base-100">
    <div class="flex-1">
        <a class="btn btn-ghost normal-case text-xl" href="/">Home</a>
    </div>
    <div class="flex-none">
        <div class="categories">
            <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost rounded-btn">Clothes</label>
                <ul tabindex="0" class="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                    <li><a href="/clothes">Item 1</a></li>
                </ul>
            </div>
            <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost rounded-btn">Shoes</label>
                <ul tabindex="0" class="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                    <li><a href="/clothes">Item 1</a></li>
                </ul>
            </div>
        </div>
        <div class="cart">
            <a href="/cart">
                <label tabindex="0" class="btn btn-ghost btn-circle">
                    <div class="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                        </svg>
                        {#await productOrderPromise}
                        {:then productOrder}
                            {#if numOfProductItems > 0}
                                <span class="badge badge-sm indicator-item">{numOfProductItems}</span>
                            {/if}
                        {/await}
                    </div>
                </label>
            </a>

        </div>
        <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                <div class="w-10 rounded-full">
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"/>
                </div>
            </label>
            <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                    <a class="justify-between" href="/account">
                        Profile
                        <span class="badge">New</span>
                    </a>
                </li>
                <li><a>Logout</a></li>
            </ul>
        </div>
    </div>
</div>


<slot></slot>

<style lang="scss">
  .navbar {
    box-shadow: 0px 0px 3px 1px gray;
    margin-bottom: 1rem;
  }
</style>
