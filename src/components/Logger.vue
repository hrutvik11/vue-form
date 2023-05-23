<script>
export default {
  data() {
    return {};
  },
  props: {
    // battleLogs: Array,
    battleLogs: {
      type: Array,
      required: true,
    },
  },
};
</script>

<template>
  <p class="text-[18px] mt-5 uppercase">Battle Log</p>
  <div class="mt-3 w-[40%] h-[90%] overflow-y-auto">
    <ul>
      <li
        v-for="logs in battleLogs"
        class="logs mb-1 text-center"
        :class="
          logs.action === 'healed'
            ? 'bg-blue-300'
            : logs.action === 'surrender'
            ? 'bg-yellow-200'
            : logs.person === 'monster'
            ? 'bg-red-300'
            : 'bg-green-300'
        "
      >
        <span v-if="logs.action === 'attacked'"
          >{{ logs.person }} {{ logs.action }} {{ logs.to }} by
          {{ logs.data }}
        </span>
        <span v-else-if="logs.action === 'surrender'">
          {{ logs.person }} {{ logs.action }}
        </span>
        <span v-else
          >{{ logs.person }} {{ logs.action }} by {{ logs.data }}
        </span>
      </li>
    </ul>
  </div>
</template>
