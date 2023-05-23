<script>
import { db } from "../firebase";
import {
  equalTo,
  limitToLast,
  onValue,
  orderByChild,
  query,
  ref,
  set,
  push,
} from "firebase/database";

export default {
  data() {
    return {
      formdata: {
        experience: [{ companyname: "", joiningdate: "", leavingdate: "" }],
      },
      states: [
        { label: "gujarat", value: "gujarat" },
        { label: "maharastra", value: "maharastra" },
        { label: "rajasthan", value: "rajasthan" },
      ],
      city: {
        gujarat: [
          { label: "ahmedabad", value: "ahmedabad" },
          { label: "surat", value: "surat" },
          { label: "vadodara", value: "vadodara" },
        ],
        maharastra: [
          { label: "mumbai", value: "mumbai" },
          { label: "pune", value: "pune" },
          { label: "panvel", value: "panvel" },
        ],
        rajasthan: [
          { label: "jaipur", value: "jaipur" },
          { label: "udaipur", value: "udaipur" },
          { label: "abu", value: "abu" },
        ],
      },
      cityArray: [],
      experienceRows: 1,
      listData: [],
      isEdit: false,
    };
  },
  methods: {
    submitForm: function () {
      console.log("here");
      const transactionRef = ref(db, "transaction");
      push(transactionRef, {
        city: this.formdata.city,
        dob: this.formdata.dob,
        experience: this.formdata.experience,
        gender: this.formdata.gender,
        name: this.formdata.name,
        state: this.formdata.state,
      });
      this.formdata = {
        experience: [{ companyname: "", joiningdate: "", leavingdate: "" }],
      };
      // set(transactionRef, { name: this.formdata.name });
    },
    getCity: function (e) {
      if (e.target.value) {
        this.formdata.city = "";
        this.cityArray = this.city[e.target.value];
      }
    },
    AddExperienceRows: function () {
      if (this.experienceRows < 3) {
        this.formdata.experience.push({
          companyname: "",
          joiningdate: "",
          leavingdate: "",
        });
        this.experienceRows++;
      }
    },
    onEdit: function (data) {
      this.isEdit = true;
      this.formdata = { ...data };
      this.experienceRows = data.experience.length;
    },
  },
  async mounted() {
    const stakerref = await query(ref(db, `transaction`));
    onValue(stakerref, async (snapshot) => {
      if (snapshot.exists()) {
        const data = await snapshot.val();
        const data2 = Object.keys(data).map((key) => data[key]);
        this.listData = data2;
      }
    });
  },
};
</script>

<template>
  <div
    class="transactionContainer w-full h-full rounded-[20px] flex gap-4 shadow-[0_5px_11px_0px_rgba(0,0,0,0.30)]"
  >
    <!-- <p class="text-[22px] text-primary-color font-mono">Transactions</p> -->
    <div class="w-1/2 p-5">
      <p class="text-[20px] font-semibold">Transaction Form</p>
      <form @submit.prevent="submitForm" class="mt-5">
        <div class="mb-2">
          <div class="title mb-1 ml-2">Full Name</div>
          <input
            v-model="formdata.name"
            type="text"
            placeholder="Enter your name"
          />
        </div>

        <div class="mb-2 flex justify-between gap-4">
          <div class="w-1/2">
            <div class="title mb-1 ml-2">Dob</div>
            <input
              v-model="formdata.dob"
              type="date"
              placeholder="Enter your name"
            />
          </div>
          <div class="w-1/2">
            <div class="title mb-1 ml-2">Gender</div>
            <div class="flex flex-row items-center p-[10px] gap-4">
              <div class="flex gap-2">
                <input
                  id="radiomale"
                  type="radio"
                  v-model="formdata.gender"
                  value="Male"
                />
                <label for="radiomale">Male</label>
              </div>
              <div class="flex gap-2">
                <input
                  id="radiofemale"
                  type="radio"
                  v-model="formdata.gender"
                  value="Female"
                />
                <label for="radiofemale">Female</label>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-2 flex justify-between gap-4">
          <div class="w-1/2">
            <div class="title mb-1 ml-2">State</div>
            <select
              v-model="formdata.state"
              @change="(event) => getCity(event)"
            >
              <option v-for="state in states" :value="state.value">
                {{ state.label }}
              </option>
            </select>
          </div>
          <div class="w-1/2">
            <div class="title mb-1 ml-2">City</div>
            <select v-model="formdata.city">
              <option v-for="city in cityArray" :value="city.value">
                {{ city.label }}
              </option>
            </select>
          </div>
        </div>

        <div class="mt-6 flex justify-end">
          <button
            type="button"
            :disabled="experienceRows === 3"
            @click="(event) => AddExperienceRows()"
          >
            +
          </button>
        </div>

        <div class="mb-2 mt-2" v-for="n in experienceRows">
          <div class="flex justify-between gap-4" :key="n">
            <div class="w-1/3">
              <div class="title mb-1 ml-2">Company Name</div>
              <input
                v-model="formdata.experience[n - 1].companyname"
                type="text"
                placeholder="Company Name"
              />
            </div>

            <div class="w-1/3">
              <div class="title mb-1 ml-2">Joining Date</div>
              <input
                v-model="formdata.experience[n - 1].joiningdate"
                type="date"
              />
            </div>

            <div class="w-1/3">
              <div class="title mb-1 ml-2">Leaving Date</div>
              <input
                v-model="formdata.experience[n - 1].leavingdate"
                type="date"
              />
            </div>
          </div>
        </div>
        <div class="flex justify-center mt-5">
          <input
            class="submit px-6 py-2 bg-primary-color rounded-[25px] text-white cursor-pointer"
            type="submit"
            :value="isEdit ? 'Edit' : 'Submit'"
          />
        </div>
      </form>
    </div>
    <div class="w-1/2 p-2">
      <p class="text-[20px] font-semibold">Transaction List</p>
      <table class="border w-full mt-8" v-if="listData.length > 0">
        <thead>
          <tr>
            <th>name</th>
            <th>gender</th>
            <th>dob</th>
            <th>state</th>
            <th>city</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(list, index) in listData" :key="list.name + index">
            <td>{{ list.name }}</td>
            <td>{{ list.gender }}</td>
            <td>{{ list.dob }}</td>
            <td>{{ list.state }}</td>
            <td>{{ list.city }}</td>
            <td><button type="button" @click="onEdit(list)">edit</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

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

input[type="text"],
input[type="date"] {
  padding: 10px;
  border: 1px solid rgb(145, 145, 145);
  border-radius: 20px;
  width: 100%;
}

select {
  width: 100%;
  padding: 14px;
  border-radius: 20px;
  background-color: white;
  border: 1px solid rgb(145, 145, 145);
}

input:focus,
select:focus {
  outline: 1px solid var(--primary-color);
}

input[type="radio"] {
  -webkit-appearance: none;
  appearance: none;
  outline: 1px solid #90969b;
  margin: 0;
  font: inherit;
  color: currentColor;
  width: 1.3em;
  height: 1.3em;
  border-radius: 50%;
  display: grid;
  place-content: center;
}

input[type="radio"]::before {
  content: "";
  width: 1.3em;
  height: 1.3em;
  border-radius: 50%;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em var(--primary-color);
}

input[type="radio"]:checked::before {
  transform: scale(1);
}
</style>
