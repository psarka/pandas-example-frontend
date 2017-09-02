<template>
  <div class="hello">

    <table>
      <thead>
      <tr>
        <th v-for="(e, idx) in table.columns">
          <button v-on:click="removeColumn(idx)">
            --
          </button></th>
      </tr>
      <tr>
        <th v-for="column in table.columns">

          <select v-model="column.type">
            <option>float64</option>
            <option>int64</option>
            <option>bool</option>
            <option>object</option>
          </select>
        </th>
      </tr>
      <tr>
        <th v-for="column in table.columns">
          <input v-model="column.name" class="columnName">
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, rowId) in tableByRow">
        <td v-for="cell in row">
          <input v-model="cell.value.v" v-bind:class="cell.type">
        </td>
        <td>
          <button v-on:click="removeRow(rowId)">
            --
          </button>
        </td>
      </tr>
      </tbody>
    </table>

    <button v-on:click="addColumn()">add column</button>
    <button v-on:click="addRow()">add row</button>



  </div>
</template>

<script>
  let zip = require('./zip')
  let validate = require('./validate')
  export default {
    name: 'hello',
    data () {
      return {
        selected: 'float',
        table: {
          'indices': [
            {
              'type': 'int64',
              'values': [{'v': '0'}, {'v': '1'}]
            }
          ],
          'columns': [
            {
              'name': 'a',
              'values': [{'v': '1'}, {'v': '2'}],
              'type': 'int64'
            },
            {
              'name': 'b',
              'values': [{'v': 'a'}, {'v': 'b'}],
              'type': 'object'}
          ]
        }
      }
    },
    computed: {
      tableByRow: function () {
        if (this.table.columns.length > 0) {
          return zip.zip(this.table.columns.map(
            c => c.values.map(
              v => ({
                'value': v,
                'type': c.type,
                'display': validate.validate(v.v, c.type)
              }))
          ))
        } else {
          return []
        }
      }
    },
    methods: {
      removeColumn: function (idx) {
        this.table.columns.splice(idx, 1)
      },
      removeRow: function (idx) {
        this.table.columns.forEach(
          column => column.values.splice(idx, 1)
        )
      },
      addRow: function () {
        this.table.columns.forEach(
          column => column.values.push({'v': ''})
        )
      },
      addColumn: function () {
        let newValues = []
        if (this.table.columns.length > 0) {
          for (let i of this.table.columns[0].values) {
            i = i + 1
            newValues.push({'v': ''})
          }
        }

        this.table.columns.push({
          name: 'new-column',
          type: 'object',
          values: newValues
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.columnName {
  font-weight: bold;
}

.int64 {
  color: red;
}

.object {
  color: olive;
  font-style: italic;
}

#int {
  color: aquamarine;
}

#bool {
  color: antiquewhite;
}

#float {
  color: aliceblue;
}
</style>
