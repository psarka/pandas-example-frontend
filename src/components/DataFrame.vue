<template>

    <div class="hello">
    <table class="dataframe">
      <tbody>
      <tr>
        <td v-for="(e, idx) in table.columns"
            class="removeButtonCell">
          <button v-on:click="removeColumn(idx)"
                  class="removeButton">
            --
          </button>
        </td>
      </tr>
      <tr>
        <td v-for="column in table.columns">
          <select v-model="column.type">
            <option>float64</option>
            <option>int64</option>
            <option>bool</option>
            <option>object</option>
          </select>
        </td>
      </tr>
      <tr>
        <td v-for="column in table.columns"
            class="columnNameCell">
          <input v-model="column.name" class="columnName">
        </td>
      </tr>
      <tr v-for="(row, rowId) in tableByRow">
        <td v-for="cell in row">
          <input v-model="cell.value.v"
                 v-bind:class="[cell.type, {invalid: !cell.display.correct}]"
                 v-bind:title="cell.display.errorMessage"
                 v-bind:placeholder="placeholder(cell.type)">
        </td>
        <td class="removeButtonCell">
          <button v-on:click="removeRow(rowId)"
                  class="removeButton">
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
    name: 'df',
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
          name: 'c' + this.table.columns.length,
          type: 'object',
          values: newValues
        })
      },
      placeholder: function (type) {
        if (type === 'object' || type === 'float64') {
          return 'NaN'
        } else {
          return ''
        }
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

table.dataframe button.removeButton {
  width: 100%;
  height: 100%;
  border: none;
  background-color: white;
}

table.dataframe input.invalid {
  background-color: lightpink;
}

table.dataframe tr:nth-child(odd) input.invalid {
  background-color: lightpink;
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

input {
  height: 100%;
  width: 100%;
  padding: 2px;
  border: none;
  text-align: left;
  flex: 1;
}

select {
  height: 100%;
  width: 100%;
  padding: 2px;
  border: none;
  -moz-appearance: none;
  -webkit-appearance: none;
}

table.dataframe {
  border-collapse: collapse;
  border: none;
}
table.dataframe tr {
  border: none;
  display: flex;
}

table.dataframe tr:nth-child(odd) input {
  background-color: ghostwhite;
}

table.dataframe td {
  margin: 0;
  width: 80px;
  height: 30px;
}

table.dataframe td.removeButtonCell {
  border: 10px;
}

table.dataframe tr:nth-child(odd) td.columnNameCell {
  border-bottom: 10px;
}

</style>
