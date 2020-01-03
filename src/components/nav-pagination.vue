<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li v-if="pagination.current_page > 1" class="page-item">
        <a v-on:click.prevent="changePage(pagination.current_page - 1)" class="page-link" href="#">Atras</a>
      </li>

      <li v-for="page in pagesNumber" v-bind:key="page" v-bind:class="[ page == isActive ? 'active' : '']" class="page-item">
        <a v-on:click.prevent="changePage(page)" class="page-link" href="#" v-text="page">
        </a>
      </li>

      <li v-if="pagination.current_page < pagination.last_page" class="page-item">
        <a v-on:click.prevent="changePage(pagination.current_page + 1)" class="page-link" href="#">Siguiente</a>
      </li>
    </ul>
  </nav>
</template>
<style>
  .pagination {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding-left: 0;
    list-style: none;
    border-radius: .25rem;
  }
</style>

<script>

import Pagination from '../models/Pagination'

export default {
  name: 'NavPagination',
  props: ['pagination', 'action'],
  data() {
    return {
      offset: 10
    }
  },
  computed: {
    isActive: function() {
      return this.pagination.current_page;
    },
    pagesNumber: function() {

      if (!this.pagination.to) { return []; }

      var from = this.pagination.current_page - this.offset

      if (from < 1) { from = 1; }

      var to = from + (this.offset * 2);

      if (to >= this.pagination.last_page) { to = this.pagination.last_page; }

      var pagesArray = [];

      while(from <= to) {
        pagesArray.push(from);
        from++;
      }

      return pagesArray;
    }
  },
  methods: {
    changePage:  function(page) {
      this.pagination.current_page = page;
      this.$store.dispatch(this.action, page)
    }
  }
}
</script>
