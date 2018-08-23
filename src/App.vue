<template>
  <div id="app">
    <QueryBuilder v-model="value" v-bind:fields="fields"/>
    
    <pre class="mt-3">{{value}}</pre>
  </div>
</template>
<style>
#app {
  margin: 25px;
}
pre {
  background: whitesmoke;
  border: 1px solid lightgray;
  padding: 25px;
}
</style>

<script>
import QueryBuilder from './components/QueryBuilder.vue';

export default {
  name: 'app',
  components: {
    QueryBuilder
  },
  data() {
    return {
      value: {
        type: 'AND',
        rules: [
          { field: 'firstName', value: 'R%', operator: 'LIKE' },
          { field: 'firstName', value: 'Roobin', operator: '!=' },
          { field: 'id', value: 'Roobin', operator: '!=' },
          { field: 'attended', value: false, operator: '=' },
          { field: 'car', value: 'mercedes', operator: '=' }
        ]
      },
      fields: {
        id: { type: 'INTEGER' },
        firstName: { type: 'STRING' },
        attended: { type: 'BOOLEAN' },
        car: { type: 'LIST', options: ['mercedes', 'audi'] }
      }
    };
  }
};
</script>
