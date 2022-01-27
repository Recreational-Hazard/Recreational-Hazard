<div
  class="d-grid gap-2 position-fixed top-0 vw-100 justify-content-center align-items-center p-1"
  style="z-index: 100;"
>
  <div
    class="p-3 rounded-1 alert alert-danger shadow d-flex justify-content-between gap-3"
  >
    <div>
      <slot name="heading" />
      <hr />
      <slot name="content" />
    </div>

    <div class="d-flex justify-content-end">
      <slot class="close-button" />
    </div>
  </div>
</div>
