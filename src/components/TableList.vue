<template>
  <table class="border w-full mt-8" v-if="listData.length > 0">
    <thead>
      <tr>
        <th>first name</th>
        <th>last name</th>
        <th>gender</th>
        <th>dob</th>
        <th>state</th>
        <th>city</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(list, index) in listData" :key="list.name + index">
        <td>{{ list.fname }}</td>
        <td>{{ list.lname }}</td>
        <td>{{ list.gender }}</td>
        <td>{{ list.dob }}</td>
        <td>{{ list.state }}</td>
        <td>{{ list.city }}</td>
        <td><button type="button" @click="onEdit(list)">edit</button></td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { db } from "../firebase";
import { onValue, query, ref } from "firebase/database";
export default {
  data() {
    return { listData: [] };
  },
  methods: {
    onEdit(listdata) {
      this.$emit("onEditClick", listdata);
    },
  },
  async mounted() {
    const stakerref = await query(ref(db, `jobapp`));
    onValue(stakerref, async (snapshot) => {
      if (snapshot.exists()) {
        const data = await snapshot.val();
        const data2 = Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }));

        this.listData = data2;
      }
    });
  },
};
</script>
<style scoped>
button {
  background-color: var(--primary-color);
  padding: 5px 10px 5px 10px;
  border-radius: 25px;
  min-width: 70px;
  color: white;
  cursor: pointer;
}
table {
  display: table;
}

table td {
  text-align: center;
}

table th {
  padding: 5px;
}

table td {
  padding: 10px;
}

table tr:nth-child(even) {
  background-color: #4e46e563;
}
</style>
