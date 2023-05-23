<template>
  <div
    class="transactionContainer w-full h-full overflow-y-auto rounded-[20px] shadow-[0_5px_11px_0px_rgba(0,0,0,0.30)] p-5"
  >
    <div class="flex justify-between">
      <p class="text-[20px] font-semibold">Basic Details</p>
      <button type="button" v-if="mode === 'add'" @click="toggleMode('view')">
        view
      </button>
      <button
        type="button"
        v-if="mode === 'view' || mode === 'edit'"
        @click="toggleMode('add')"
      >
        add
      </button>
    </div>
    <TableList @onEditClick="onEdit" v-if="mode === 'view'" />
    <form
      @submit.prevent="submitForm"
      v-show="mode === 'add' || mode === 'edit'"
    >
      <!-- ---------------------------  BASIC DATILS ------------------------------- -->
      <div>
        <!-- <p class="text-[20px] font-semibold">Basic Details</p> -->
        <div class="mb-3 flex justify-between gap-6 mt-5">
          <div class="w-1/2">
            <div class="title mb-1 ml-2">First Name</div>
            <input
              v-model="formdata.fname"
              type="text"
              placeholder="Enter your first name"
            />
          </div>

          <div class="w-1/2">
            <div class="title mb-1 ml-2">Last Name</div>
            <input
              v-model="formdata.lname"
              type="text"
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div class="mb-3 flex justify-between gap-6">
          <div class="w-1/2">
            <div class="title mb-1 ml-2">Designation</div>
            <input
              v-model="formdata.designation"
              type="text"
              placeholder="Enter your designation"
            />
          </div>

          <div class="w-1/2">
            <div class="title mb-1 ml-2">Email</div>
            <input
              v-model="formdata.email"
              type="text"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div class="mb-3 flex justify-between gap-6">
          <div class="w-1/2">
            <div class="title mb-1 ml-2">Address 1</div>
            <textarea
              resize="none"
              placeholder="Enter your address 1"
              v-model="formdata.address1"
            >
            </textarea>
          </div>

          <div class="w-1/2">
            <div class="title mb-1 ml-2">Address 2</div>
            <textarea
              resize="none"
              placeholder="Enter your address 2"
              v-model="formdata.address2"
            >
            </textarea>
          </div>
        </div>

        <div class="mb-3 flex justify-between gap-6">
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

        <div class="mb-3 flex justify-between gap-6">
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

        <div class="mb-3 flex justify-between gap-6">
          <div class="w-1/2">
            <div class="title mb-1 ml-2">Phone</div>
            <input
              v-model="formdata.phone"
              type="text"
              placeholder="Enter your phone"
            />
          </div>

          <div class="w-1/2">
            <div class="title mb-1 ml-2">Zip Code</div>
            <input
              v-model="formdata.zip"
              type="text"
              placeholder="Enter your zip code"
            />
          </div>
        </div>
      </div>

      <!-- ---------------------------  WORK DATILS ------------------------------- -->

      <div class="mt-10">
        <p class="text-[20px] font-semibold">Work Details</p>
        <div>
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
              <div class="w-1/4">
                <div class="title mb-1 ml-2">Company Name</div>
                <input
                  v-model="formdata.experience[n - 1].companyname"
                  type="text"
                  placeholder="Company Name"
                />
              </div>

              <div class="w-1/4">
                <div class="title mb-1 ml-2">Designation</div>
                <input
                  v-model="formdata.experience[n - 1].designation"
                  type="text"
                  placeholder="Enter your designation"
                />
              </div>

              <div class="w-1/4">
                <div class="title mb-1 ml-2">Joining Date</div>
                <input
                  v-model="formdata.experience[n - 1].joiningdate"
                  type="date"
                />
              </div>

              <div class="w-1/4">
                <div class="title mb-1 ml-2">Leaving Date</div>
                <input
                  v-model="formdata.experience[n - 1].leavingdate"
                  type="date"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ---------------------------  EDUCATIONS DATILS ------------------------------- -->

      <div class="mt-10">
        <p class="text-[20px] font-semibold">Education Details</p>
        <div>
          <div class="mt-6 flex justify-end">
            <button
              type="button"
              :disabled="educationRows === 3"
              @click="(event) => AddEducationsRows()"
            >
              +
            </button>
          </div>
          <div class="mb-2 mt-2" v-for="n in educationRows">
            <div class="flex justify-between gap-4" :key="n">
              <div class="w-1/4">
                <div class="title mb-1 ml-2">Course Name</div>
                <input
                  v-model="formdata.education[n - 1].coursename"
                  type="text"
                  placeholder="Enter your Course Name"
                />
              </div>

              <div class="w-1/4">
                <div class="title mb-1 ml-2">Name of Board</div>
                <input
                  v-model="formdata.education[n - 1].nameofboard"
                  type="text"
                  placeholder="Enter your name of board"
                />
              </div>

              <div class="w-1/4">
                <div class="title mb-1 ml-2">Passing Year</div>
                <input
                  v-model="formdata.education[n - 1].passingyear"
                  type="text"
                  placeholder="Enter your passing year"
                />
              </div>

              <div class="w-1/4">
                <div class="title mb-1 ml-2">Percentage</div>
                <input
                  v-model="formdata.education[n - 1].percentage"
                  type="text"
                  placeholder="Enter your percentage"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ---------------------------  LANGUAGE DETILS ------------------------------- -->

      <div class="flex mt-10">
        <div class="w-1/2">
          <p class="text-[20px] font-semibold">Languages known</p>
          <div class="flex flex-col gap-3 mt-4">
            <div class="flex gap-6">
              <div class="flex min-w-[100px]">
                <input
                  type="checkbox"
                  @change="(event) => addLanguage('hindi', event)"
                  :checked="CheckLanguageIsSelected('hindi')"
                />
                <div class="ml-2">Hindi</div>
              </div>
              <div class="flex">
                <input
                  type="checkbox"
                  v-model="formdata.languageknown.hindi.read"
                />
                <div class="ml-2">Read</div>
              </div>
              <div class="flex">
                <input
                  type="checkbox"
                  v-model="formdata.languageknown.hindi.write"
                />
                <div class="ml-2">Write</div>
              </div>
              <div class="flex">
                <input
                  type="checkbox"
                  v-model="formdata.languageknown.hindi.speak"
                />
                <div class="ml-2">Speak</div>
              </div>
            </div>

            <div class="flex gap-6">
              <div class="flex min-w-[100px]">
                <input
                  type="checkbox"
                  @change="(event) => addLanguage('english', event)"
                  :checked="CheckLanguageIsSelected('english')"
                />
                <div class="ml-2">English</div>
              </div>
              <div class="flex">
                <input
                  type="checkbox"
                  v-model="formdata.languageknown.english.read"
                />
                <div class="ml-2">Read</div>
              </div>
              <div class="flex">
                <input
                  type="checkbox"
                  v-model="formdata.languageknown.english.write"
                />
                <div class="ml-2">Write</div>
              </div>
              <div class="flex">
                <input
                  type="checkbox"
                  v-model="formdata.languageknown.english.speak"
                />
                <div class="ml-2">Speak</div>
              </div>
            </div>

            <div class="flex gap-6">
              <div class="flex min-w-[100px]">
                <input
                  type="checkbox"
                  @change="(event) => addLanguage('gujarati', event)"
                  :checked="CheckLanguageIsSelected('gujarati')"
                />
                <div class="ml-2">Gujarati</div>
              </div>
              <div class="flex">
                <input
                  type="checkbox"
                  v-model="formdata.languageknown.gujarati.read"
                />
                <div class="ml-2">Read</div>
              </div>
              <div class="flex">
                <input
                  type="checkbox"
                  v-model="formdata.languageknown.gujarati.write"
                />
                <div class="ml-2">Write</div>
              </div>
              <div class="flex">
                <input
                  type="checkbox"
                  v-model="formdata.languageknown.gujarati.speak"
                />
                <div class="ml-2">Speak</div>
              </div>
            </div>
          </div>
        </div>

        <!-- ---------------------------  TECHNOLOGIES DETILS ------------------------------- -->

        <div class="w-1/2">
          <p class="text-[20px] font-semibold">Technologies you know</p>
          <div class="flex flex-col gap-3 mt-4">
            <div class="flex gap-6">
              <div class="flex min-w-[100px]">
                <input
                  type="checkbox"
                  @change="(event) => addTechnology('php', event)"
                  :checked="formdata.technologiesknown.php"
                />
                <div class="ml-2">PHP</div>
              </div>
              <div class="flex">
                <input
                  id="php"
                  type="radio"
                  v-model="formdata.technologiesknown.php"
                  value="beginer"
                />
                <div class="ml-2">Beginer</div>
              </div>
              <div class="flex">
                <input
                  id="php"
                  type="radio"
                  v-model="formdata.technologiesknown.php"
                  value="mideater"
                />
                <div class="ml-2">Mideater</div>
              </div>
              <div class="flex">
                <input
                  id="php"
                  type="radio"
                  v-model="formdata.technologiesknown.php"
                  value="expert"
                />
                <div class="ml-2">Expert</div>
              </div>
            </div>

            <div class="flex gap-6">
              <div class="flex min-w-[100px]">
                <input
                  type="checkbox"
                  @change="(event) => addTechnology('mysql', event)"
                  :checked="formdata.technologiesknown.mysql"
                />
                <div class="ml-2">Mysql</div>
              </div>
              <div class="flex">
                <input
                  id="mysql"
                  type="radio"
                  v-model="formdata.technologiesknown.mysql"
                  value="beginer"
                />
                <div class="ml-2">Beginer</div>
              </div>
              <div class="flex">
                <input
                  id="mysql"
                  type="radio"
                  v-model="formdata.technologiesknown.mysql"
                  value="mideater"
                />
                <div class="ml-2">Mideater</div>
              </div>
              <div class="flex">
                <input
                  id="mysql"
                  type="radio"
                  v-model="formdata.technologiesknown.mysql"
                  value="expert"
                />
                <div class="ml-2">Expert</div>
              </div>
            </div>

            <div class="flex gap-6">
              <div class="flex min-w-[100px]">
                <input
                  type="checkbox"
                  @change="(event) => addTechnology('laravel', event)"
                  :checked="formdata.technologiesknown.laravel"
                />
                <div class="ml-2">Laravel</div>
              </div>
              <div class="flex">
                <input
                  id="laravel"
                  type="radio"
                  v-model="formdata.technologiesknown.laravel"
                  value="beginer"
                />
                <div class="ml-2">Beginer</div>
              </div>
              <div class="flex">
                <input
                  id="laravel"
                  type="radio"
                  v-model="formdata.technologiesknown.laravel"
                  value="mideater"
                />
                <div class="ml-2">Mideater</div>
              </div>
              <div class="flex">
                <input
                  id="laravel"
                  type="radio"
                  v-model="formdata.technologiesknown.laravel"
                  value="expert"
                />
                <div class="ml-2">Expert</div>
              </div>
            </div>

            <div class="flex gap-6">
              <div class="flex min-w-[100px]">
                <input
                  type="checkbox"
                  @change="(event) => addTechnology('oracle', event)"
                  :checked="formdata.technologiesknown.oracle"
                />
                <div class="ml-2">Oracle</div>
              </div>
              <div class="flex">
                <input
                  id="oracle"
                  type="radio"
                  v-model="formdata.technologiesknown.oracle"
                  value="beginer"
                />
                <div class="ml-2">Beginer</div>
              </div>
              <div class="flex">
                <input
                  id="oracle"
                  type="radio"
                  v-model="formdata.technologiesknown.oracle"
                  value="mideater"
                />
                <div class="ml-2">Mideater</div>
              </div>
              <div class="flex">
                <input
                  id="oracle"
                  type="radio"
                  v-model="formdata.technologiesknown.oracle"
                  value="expert"
                />
                <div class="ml-2">Expert</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ---------------------------  Reference Contact ------------------------------- -->

      <div class="mt-10">
        <p class="text-[20px] font-semibold">Reference Contact</p>
        <div>
          <div class="mb-2 mt-2" v-for="n in 2">
            <div class="flex justify-between gap-4" :key="n">
              <div class="w-1/3">
                <div class="title mb-1 ml-2">Name</div>
                <input
                  v-model="formdata.referencecontact[n - 1].name"
                  type="text"
                  placeholder="Enter your Reference Name"
                />
              </div>

              <div class="w-1/3">
                <div class="title mb-1 ml-2">Reference Contact Number</div>
                <input
                  v-model="formdata.referencecontact[n - 1].contactnumber"
                  type="text"
                  placeholder="Enter your Reference Contact Number"
                />
              </div>

              <div class="w-1/3">
                <div class="title mb-1 ml-2">Relation</div>
                <input
                  v-model="formdata.referencecontact[n - 1].relation"
                  type="text"
                  placeholder="Enter your Relation"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ---------------------------  Preferences ------------------------------- -->

      <div class="mt-10">
        <p class="text-[20px] font-semibold">Preferences</p>
        <div class="flex justify-between gap-4 mt-2">
          <div class="w-1/4">
            <div class="title mb-1 ml-2">Prefered Location</div>
            <select v-model="formdata.preferences.location" multiple>
              <option
                v-for="location in preferedLocation"
                :value="location.value"
              >
                {{ location.label }}
              </option>
            </select>
          </div>
          <div class="w-1/4">
            <div class="title mb-1 ml-2">Notice Period</div>
            <input
              v-model="formdata.preferences.noticeperiod"
              type="text"
              placeholder="Enter your notice period"
            />
          </div>
          <div class="w-1/4">
            <div class="title mb-1 ml-2">Expected CTC</div>
            <input
              v-model="formdata.preferences.expectedctc"
              type="text"
              placeholder="Enter your Expected CTC"
            />
          </div>
          <div class="w-1/4">
            <div class="title mb-1 ml-2">Current CTC</div>
            <input
              v-model="formdata.preferences.currentctc"
              type="text"
              placeholder="Enter your Current CTC"
            />
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-5">
        <input
          class="submit px-6 py-2 bg-primary-color rounded-[25px] text-white cursor-pointer"
          type="submit"
          :value="mode === 'edit' ? 'Edit' : 'Submit'"
        />
      </div>
    </form>
  </div>
</template>
<script scoped>
import { db } from "../firebase";
import { ref, push, set } from "firebase/database";
import TableList from "../components/TableList.vue";
export default {
  components: { TableList },
  data() {
    return {
      mode: "add",
      initailFormData: {
        experience: [
          {
            companyname: "",
            joiningdate: "",
            leavingdate: "",
            designation: "",
          },
        ],
        education: [
          { coursename: "", nameofboard: "", passingyear: "", percentage: "" },
        ],
        languageknown: {
          hindi: { read: false, write: false, speak: false },
          english: { read: false, write: false, speak: false },
          gujarati: { read: false, write: false, speak: false },
        },
        technologiesknown: {},
        referencecontact: [
          { name: "", contactnumber: "", relation: "" },
          { name: "", contactnumber: "", relation: "" },
        ],
        preferences: {},
      },
      formdata: {
        experience: [
          {
            companyname: "",
            joiningdate: "",
            leavingdate: "",
            designation: "",
          },
        ],
        education: [
          { coursename: "", nameofboard: "", passingyear: "", percentage: "" },
        ],
        languageknown: {
          hindi: { read: false, write: false, speak: false },
          english: { read: false, write: false, speak: false },
          gujarati: { read: false, write: false, speak: false },
        },
        technologiesknown: {},
        referencecontact: [
          { name: "", contactnumber: "", relation: "" },
          { name: "", contactnumber: "", relation: "" },
        ],
        preferences: {},
      },
      experienceRows: 1,
      educationRows: 1,
      cityArray: [],
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
      preferedLocation: [
        { label: "london", value: "london" },
        { label: "newyork", value: "newyork" },
        { label: "america", value: "america" },
      ],
    };
  },
  mounted() {
    this.formdata = this.initailFormData;
  },
  methods: {
    submitForm: function () {
      const data = {
        fname: this.formdata.fname,
        lname: this.formdata.lname,
        designation: this.formdata.designation,
        email: this.formdata.email,
        address1: this.formdata.address1,
        address2: this.formdata.address2,
        dob: this.formdata.dob,
        gender: this.formdata.gender,
        state: this.formdata.state,
        city: this.formdata.city,
        phone: this.formdata.phone,
        zip: this.formdata.zip,
        experience: this.formdata.experience,
        education: this.formdata.education,
        languageknown: this.formdata.languageknown,
        technologiesknown: this.formdata.technologiesknown,
        referencecontact: this.formdata.referencecontact,
        preferences: this.formdata.preferences,
      };
      if (this.mode === "edit") {
        const editref = ref(db, `jobapp/${this.formdata.id}`);
        set(editref, { ...data });
        this.mode = "view";
      } else {
        const transactionRef = ref(db, "jobapp");
        push(transactionRef, {
          ...data,
        });
      }

      this.resetForm();
    },
    addLanguage(language, event) {
      if (!event.target.checked) {
        this.formdata.languageknown[language] = {
          read: false,
          write: false,
          speak: false,
        };
      }
    },
    addTechnology(tech, event) {
      if (!event.target.checked) {
        const data = this.formdata.technologiesknown;
        delete data[tech];
      }
    },
    AddExperienceRows: function () {
      if (this.experienceRows < 3) {
        this.formdata.experience.push({
          companyname: "",
          joiningdate: "",
          leavingdate: "",
          designation: "",
        });
        this.experienceRows++;
      }
    },
    AddEducationsRows() {
      if (this.educationRows < 3) {
        this.formdata.education.push({
          coursename: "",
          nameofboard: "",
          passingyear: "",
          percentage: "",
        });
        this.educationRows++;
      }
    },
    getCity(e) {
      if (e.target.value) {
        this.formdata.city = "";
        this.cityArray = this.city[e.target.value];
      }
    },
    toggleMode(mode) {
      this.mode = mode;
      if (mode === "add") {
        this.resetForm();
      }
    },
    onEdit(data) {
      this.toggleMode("edit");
      this.formdata = { ...data };
      this.experienceRows = data.experience.length;
      this.educationRows = data.education.length;
      this.cityArray = this.city[data.state];
    },
    CheckLanguageIsSelected(language) {
      const langObj = this.formdata.languageknown[language];
      const boolArr = Object.keys(langObj).map((key) => langObj[key]);

      if (boolArr.some((el) => el === true)) {
        return true;
      } else {
        return false;
      }
    },
    resetForm() {
      this.formdata = this.initailFormData;
      this.experienceRows = 1;
      this.educationRows = 1;
      this.cityArray = [];
    },
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
input[type="text"],
input[type="date"] {
  padding: 10px;
  border: 1px solid rgb(145, 145, 145);
  border-radius: 20px;
  width: 100%;
}

select,
textarea {
  width: 100%;
  padding: 14px;
  border-radius: 20px;
  background-color: white;
  border: 1px solid rgb(145, 145, 145);
}

input:focus,
select:focus,
textarea:focus {
  outline: 1px solid var(--primary-color);
}

input[type="checkbox"]:focus {
  outline: none;
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
