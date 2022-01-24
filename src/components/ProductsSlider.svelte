<script lang="ts">
  import type { Product } from "../utils/types";
import Rating from "./Rating.svelte";

  let products: Product[] = [];

  const getProduct = async (url: string) => {
    const data = await fetch(url).catch((err) => console.log(err));
    if (data) {
      const res = await data.json();
      products = res;
    }
  };
</script>

<div class="container py-4">
  <div class="d-flex align-items-center justify-content-between">
    <h1 class="h3 mb-0 pt-3 me-2 fw-bolder">Trending products</h1>
    <button
      class="btn d-flex align-items-center justify-content-center btn-outline-danger"
    >
      View more <span class="material-icons"> arrow_forward_ios </span>
    </button>
  </div>
  <hr class="position-relative" />
  <div class="d-grid products py-4">
    {#await getProduct("https://fakestoreapi.com/products?limit=8")}
      <div class=" spinner-border" />
    {:then}
      {#if products.length}
        {#each products as product}
        <a class="un-a d-block" href={`product/${product.id}`}>
          <div
            class="product product_hover d-grid justify-content-center align-items-stretch"
          >
            <img
              class="card-img-top d-block overflow-hidden"
              src={product.image}
              alt={product.title}
            />
            <div class="d-grid p-1">
              <h5 class="title">{product.title}</h5>
              <span class=" text-secondary text-capitalize">
                {product.category}
              </span>
              <div class="d-flex align-items-center justify-content-between">
                <span class="p-1">TK. {product.price}</span>
                <Rating size="small" rating={+product.rating} />
              </div>
            </div>
          </div>
        </a>
        {/each}
      {/if}
    {:catch error}
      <div class=" alert alert-danger">Error occured:{error}</div>
    {/await}
  </div>
</div>

<style>
  .products {
    grid-template-columns: repeat(auto-fit, minmax(265px, 1fr));
    grid-gap: 1vw;
    gap: 1vw;
  }
  .product {
    grid-gap: 0.5rem;
    gap: 0.5rem;
    background: #f5f5f5;
    border: 1px solid #eaeaea;
    padding-bottom: 1vw;
    transition: all 0.15s ease-in-out;
  }
  img {
    aspect-ratio: 3.5/4;
  }
  .title {
    font-size: 18px;
    font-weight: bold;
  }
  .product_hover:hover {
    border-color: #fff !important;
    box-shadow: 0 0.3rem 1.525rem -0.375rem rgb(0 0 0 / 10%);
  }
</style>
