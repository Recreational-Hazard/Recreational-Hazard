<div class="position-relative dropdown-wrapper">
  <slot name="thumbnail" />
  <ul class="position-absolute text-start rounded-2 shadow meta-dropdown p-3 bg-white list-unstyled">
    <slot name="list"/>
  </ul>
</div>

<style>
  .meta-dropdown {
    top: 70px;
    right: -10px;
    width: 200px;
    z-index: 100;
    line-height: 2.1;
    -webkit-transition-duration: 500ms;
    -o-transition-duration: 500ms;
    transition-duration: 500ms;
    opacity: 0;
    visibility: hidden;
  }
  .dropdown-wrapper:hover .meta-dropdown {
    top: 50px;
    opacity: 1;
    visibility: visible;
  }

</style>
