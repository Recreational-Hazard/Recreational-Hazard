<script lang="ts">
  import ClientReviews from "../components/ClientReviews.svelte";
import ProductsSlider from "../components/ProductsSlider.svelte";
</script>

<div class="container-fluid">
  <div
    class="w-100 p-5 d-grid justify-content-center align-items-center background-1"
  >
    <h1 class="text-white mx-auto text-center headline display-4 scale-up">
      We work with premium Gadgets and Accessories for your daily needs, and
      anything you need in Gadgets,We're here!
    </h1>
  </div>

  <ProductsSlider />

  <div class="py-2 container my-1 d-grid gap-2 text-sm-start text-center align-items-center justify-content-evenly text-by-img">
    <div class="max-width-500">
      <h2 class="h1 fw-bolder d-grid side-text"> Keep the winter vibe alive </h2>
      <button class="btn btn-success mt-2 mb-3"> Check out </button>
    </div>
    <img
      src="/static/assets/friday_sale.webp"
      class="w-100 max-width-500"
      alt="Friday sale"
    />
  </div>
</div>

<div class="py-3 my-3 container my-1 d-grid gap-2 text-sm-end text-center align-items-center justify-content-evenly text-by-img-2">
  <img
      src="/static/assets/custom-stickers.jpg"
      class="w-100 max-width-500 shadow rounded-3"
      alt="Custom sticker service"
    />
  <div class="max-width-500">
    <h2 class="h1 fw-bolder d-grid side-text"> Where your designs come into being </h2>
    <button class="btn btn-danger mt-2 mb-3"> Submit your design </button>
  </div>
</div>

<ClientReviews/>

<div class="w-100">
  <img
    src="/static/assets/web_bg.jpg"
    alt="Cover 2"
    class="w-100 max-height-400"
  />
</div>

<style>
  .headline {
    line-height: 1.6;
    letter-spacing: 1px;
    max-width: 900px;
  }
  .background-1 {
    background: linear-gradient(rgba(0, 0, 0, 0.56), rgba(0, 0, 0, 0.56)),
      url("/static/assets/img-1.webp") center center / cover no-repeat;
  }
  .text-by-img > div{
    grid-row: 2;
  }
  .side-text {
    line-height: 1.6;
    letter-spacing: 2px;
    font-size: clamp(1rem, calc( 12px + 3.300vw ), 3.450rem);
    font-family: 'Wendy One';
  }
  @media only screen and (min-width: 768px) {
    .text-by-img {
      grid-template-columns: auto auto;
    }
    .text-by-img-2 {
      grid-template-columns: auto auto;
    }
  .text-by-img > div{
    grid-row: 1;
  }
  }
</style>
