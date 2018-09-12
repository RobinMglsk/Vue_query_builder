<template>
  <div id="query-builder">
    <div id="query">
      <div class="card">
        <div class="card-body">

          <div class="row">
            <div class="col-md-6">
              <div class="form-group row">
                <label v-bind:for="index" class="col-sm-4 col-form-label">Match Type</label>
                <div class="col-sm-8">
                  <select v-model="value.type" class="form-control">
                    <option value="AND">All</option>
                    <option value="OR">One</option>
                  </select>
                </div>
              </div>
            </div>
          
            <div class="col-md-5 offset-md-1">
              <div class="form-group row">
                
                <div class="col-sm-9">
                  <select v-model="addField" class="form-control">
                    <option v-for="(field, index) in fields" v-bind:value="index" v-bind:key="index">{{getFieldName(field, index)}}</option>
                  </select>
                </div>
                <div class="col-sm-3">
                  <button class="btn btn btn-primary btn-block mb-2" v-on:click="addRule(0)" v-bind:disabled="addField == null">Add</button>
                </div>
              </div>
            </div>
          </div>
          

          
          

          
          <div v-if="loaded" v-for="(rule, index) in value.rules" v-bind:key="index">
            
            <!-- Type: STRING -->
            <div v-if="fields[rule.field].type == 'STRING'" class="type-sting form-group row">
              <label v-bind:for="index" class="col-10 col-sm-2 col-form-label">{{ getRuleName(rule) }}</label>
              <div class="col-2 col-sm-1"><button class="btn btn-outline-danger remove" v-on:click="removeRule(index)">×</button></div>
              <div class="col-sm-2">
                <select class="form-control mb-2" v-model="rule.operator" v-on:change="$emit('change')">
                  <option v-for="option in operators.STRING" v-bind:value="option" v-bind:key="option">{{option}}</option>
                </select>
              </div>
              <div class="col-sm-7">
                <input type="text" class="form-control" v-bind:id="index" v-model="rule.value" v-on:change="$emit('change')">
              </div>
            </div>

            <!-- Type: INTEGER -->
            <div v-else-if="fields[rule.field].type == 'INTEGER'" class="type-integer form-group row">
              <label v-bind:for="index" class="col-10 col-sm-2 col-form-label">{{ getRuleName(rule) }}</label>
              <div class="col-2 col-sm-1"><button class="btn btn-outline-danger remove" v-on:click="removeRule(index)">×</button></div>
              <div class="col-sm-2">
                <select class="form-control mb-2" v-model="rule.operator" v-on:change="$emit('change')">
                  <option v-for="option in operators.INTEGER" v-bind:value="option" v-bind:key="option">{{option}}</option>
                </select>
              </div>
              <div class="col-sm-7">
                <input type="number" class="form-control" v-bind:id="index" v-model="rule.value" v-on:change="$emit('change')">
              </div>
            </div>

            <!-- Type: BOOLEAN -->
            <div v-else-if="fields[rule.field].type == 'BOOLEAN'" class="type-sting form-group row">
              <label v-bind:for="index" class="col-10 col-sm-2 col-form-label">{{ getRuleName(rule) }}</label>
              <div class="col-2 col-sm-1"><button class="btn btn-outline-danger remove" v-on:click="removeRule(index)">×</button></div>
              <div class="col-sm-2">
                <select class="form-control mb-2" v-model="rule.operator" v-on:change="$emit('change')">
                  <option v-for="option in operators.BOOLEAN" v-bind:value="option" v-bind:key="option">{{option}}</option>
                </select>
              </div>
              <div class="col-sm-7">
                <select type="text" v-bind:id="index" class="form-control" v-model="rule.value" v-on:change="$emit('change')">
                  <option v-bind:value="true">True</option>
                  <option v-bind:value="false">False</option>
                </select>
              </div>
            </div>

            <!-- Type: LIST -->
            <div v-else-if="fields[rule.field].type == 'LIST'" class="type-sting form-group row">
              <label v-bind:for="index" class="col-10 col-sm-2 col-form-label">{{ getRuleName(rule) }}</label>
              <div class="col-2 col-sm-1"><button class="btn btn-outline-danger remove" v-on:click="removeRule(index)">×</button></div>
              <div class="col-sm-2">
                <select class="form-control mb-2" v-model="rule.operator">
                  <option v-for="option in operators.LIST" v-bind:value="option" v-bind:key="option" v-on:change="$emit('change')">{{option}}</option>
                </select>
              </div>
              <div class="col-sm-7">
                <select type="text" v-bind:id="index" class="form-control" v-model="rule.value" v-on:change="$emit('change')">
                  <option v-for="(option, optionIndex) in fields[rule.field].options" v-value="option" v-bind:key="optionIndex">{{option}}</option>
                </select>
              </div>
            </div>

            <!-- Type: DEFAULT -->
            <div v-else class="type-default form-group row">
              <label v-bind:for="index" class="col-10 col-sm-2 col-form-label">{{ getRuleName(rule) }}</label>
              <div class="col-2 col-sm-1"><button class="btn btn-outline-danger remove" v-on:click="removeRule(index)">×</button></div>
              <div class="col-sm-2">
                <select class="form-control mb-2" v-model="rule.operator" v-on:change="$emit('change')">
                  <option v-for="option in operators.DEFAULT" v-bind:value="option" v-bind:key="option">{{option}}</option>
                </select>
              </div>
              <div class="col-sm-7">
                <input type="text" class="form-control" v-bind:id="index" v-model="rule.value" v-on:change="$emit('change')">
              </div>
            </div>
            
          </div>
          <div v-else class="text-center">Loading...</div>
          
        </div>
      </div>
      
    </div>

  </div>
</template>

<style lang="scss">
label,
option {
  text-transform: capitalize;
}
button.remove {
  border: none;
  background: transparent;
  text-align: center;
  min-width: 100%;
}
</style>

<script>
export default {
  name: 'QueryBuilder',

  props: {
    value: Object,
    fields: Object
  },
  data() {
    return {
      operators: {
        STRING: ['=', '!=', 'LIKE'],
        INTEGER: ['=', '!=', '>', '>=', '<', '<='],
        FLOAT: ['=', '!=', '>', '>=', '<', '<='],
        DATETIME: ['=', '!=', '>', '>=', '<', '<='],
        BOOLEAN: ['=', '!='],
        LIST: ['=', '!='],
        DEFAULT: ['=', '!=']
      },
      addField: null
    };
  },
  computed: {
    loaded() {
      if (
        Object.keys(this.value).length !== 0 &&
        Object.keys(this.fields).length !== 0
      ) {
        return true;
      }
      return false;
    }
  },
  methods: {
    getRuleName(rule) {
      if (
        this.fields[rule.field].name !== undefined &&
        this.fields[rule.field].name !== ''
      ) {
        return this.fields[rule.field].name;
      } else {
        return rule.field;
      }
    },

    getFieldName(field, index) {
      if (field.name !== undefined && field.name !== '') {
        return field.name;
      } else {
        return index;
      }
    },
    addRule(level) {
      if (level == 0) {
        this.value.rules.push({
          field: this.addField,
          value: '',
          operator: '='
        });
        this.$emit('change');
      }
      return;
    },
    removeRule(rule) {
      this.value.rules.splice(rule, 1);
      this.$emit('change', 'removed');
      return;
    }
  }
};
</script>
