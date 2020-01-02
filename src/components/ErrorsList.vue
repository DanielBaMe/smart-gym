<template>
  <div class="alert alert-danger" v-if="errors && errors.length">
    <ul class="list-group">
      <li v-for="error in errors" v-bind:key="error" v-text="error"></li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'errors-list',
    props: ['errors']
  }
</script>
<style>
  .alert-danger {
    margin-top: 5px !important;
    padding: 5px !important;
  }
  .alert > ul > li{
    margin-left: 25px;
  }
</style>
