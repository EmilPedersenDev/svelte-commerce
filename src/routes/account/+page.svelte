<script lang="ts">
    export let data = undefined
    let selectedOrderType: string = "pending";


    $: selectedOrders = getSelectedOrders(selectedOrderType);

    function getSelectedOrders(selectedOrderType) {
        return data.account.productOrders.filter(order => order.status === selectedOrderType);
    }

    const setSelectedOrderType = (orderType: string) => {
        selectedOrderType = orderType;
    }

    const getOrderPrice = (productOrder): number => {
        if (productOrder?.orderItems == null) {
            return 0;
        }
        return productOrder.orderItems.reduce((acc: number, curr: any) => acc + curr.price, 0);
    }

</script>

<div class="account container prose md:container md:mx-auto p-5 md:p-0">
    <h1>Account</h1>
    <h2>{data.account.name}</h2>

    <div class="account__orders">
        <div class="dropdown">
            <label tabindex="0" class="btn m-1">Filter Orders</label>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li class={selectedOrderType === "pending" ? "active" : ""}
                    on:click={() => setSelectedOrderType("pending")}>Pending Orders
                </li>
                <li class={selectedOrderType === "completed" ? "active" : ""}
                    on:click={() => setSelectedOrderType("completed")}>Completed Orders
                </li>
                <li class={selectedOrderType === "cancelled" ? "active" : ""}
                    on:click={() => setSelectedOrderType("cancelled")}>Cancelled Orders
                </li>
            </ul>
        </div>
        <table class="table">
            <thead>
            <tr>
                <th>Id</th>
                <th>Status</th>
                <th>Order Items</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>
            {#each selectedOrders as order, i}
                <tr>
                    <th>{order.id}</th>
                    <td>{order.status}</td>
                    <td>{order.orderItems.length}</td>
                    <td>{getOrderPrice(order)}</td>
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
</div>

<style lang="scss">
  .account {

    h2 {
      margin-top: 1rem;
    }

    .account__orders {

      width: 100%;
      max-width: 1200px;
      margin: 4rem auto 0;

      .dropdown-content {
        padding: 0;
        border-radius: 0;


        li {
          margin: 0;
          padding: 0.5rem;

          &.active {
            background-color: lightgray;
          }


          &:hover {
            background-color: lightgray;
            cursor: pointer;

          }
        }
      }
    }
  }
</style>

