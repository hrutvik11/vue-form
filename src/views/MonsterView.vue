<script setup>
import Logger from "../components/Logger.vue";
</script>

<script>
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
export default {
  data() {
    return {
      monsterHealth: 100,
      player1Health: 100,
      player2Health: 100,
      attacker: 1,
      player1AttackCount: 0,
      player2AttackCount: 0,
      player1HealCount: 0,
      player2HealCount: 0,
      battleLogs: [],
      surrender: [],
      winner: null,
      dead: [],
    };
  },

  methods: {
    onreset() {
      this.monsterHealth = 100;
      this.player1Health = 100;
      this.player2Health = 100;
      this.attacker = 1;
      this.player1AttackCount = 0;
      this.player2AttackCount = 0;
      this.player1HealCount = 0;
      this.player2HealCount = 0;
      this.battleLogs = [];
      this.surrender = [];
      this.winner = null;
      this.dead = [];
    },
    declareWinner() {
      if (this.monsterHealth === 0) {
        if (this.player1Health === this.player2Health) {
          return (this.winner = "Draw between both players");
        } else if (this.player1Health > this.player2Health) {
          return (this.winner = "player 1");
        } else {
          return (this.winner = "player 2");
        }
      } else {
        if (this.player1Health === 0 && this.player2Health === 0) {
          return (this.winner = "monster");
        }

        if (this.dead.includes(1) && this.dead.includes(2)) {
          return (this.winner = "monster");
        }
      }
    },
    changeAttacker() {
      if (this.surrender.includes(1) || this.dead.includes(1)) {
        this.attacker = 2;
      } else if (this.surrender.includes(2) || this.dead.includes(2)) {
        this.attacker = 1;
      } else {
        this.attacker = this.attacker === 1 ? 2 : 1;
      }
    },
    attackMonster() {
      const randNum = getRandomNumber(1, 15);
      if (this.monsterHealth - randNum > 0) {
        this.AttackCounter();
        this.monsterHealth -= randNum;
        this.logger("player" + this.attacker, "attacked", "monster", randNum);
        this.changeAttacker();
        this.attackPlayer();
      } else {
        this.monsterHealth = 0;
        this.dead.push(0);
        this.declareWinner();
      }
    },
    attackPlayer() {
      if (!this.surrender.includes(1)) {
        const randNum = getRandomNumber(1, 15);
        if (this.player1Health - randNum > 0) {
          this.player1Health -= randNum;
          this.logger("monster", "attacked", "player 1", randNum);
        } else {
          this.player1Health = 0;
          this.dead.push(1);
          this.declareWinner();
        }
      }

      if (!this.surrender.includes(2)) {
        const randNum1 = getRandomNumber(1, 15);
        if (this.player2Health - randNum1 > 0) {
          this.player2Health -= randNum1;
          this.logger("monster", "attacked", "player 2", randNum1);
        } else {
          this.player2Health = 0;
          this.dead.push(2);
          this.declareWinner();
        }
      }
    },
    specialAttack() {
      this.attacker === 1
        ? (this.player1AttackCount = 0)
        : (this.player2AttackCount = 0);
      const randNum = getRandomNumber(10, 15);
      if (this.monsterHealth - randNum > 0) {
        this.monsterHealth -= randNum;
        this.logger(
          "player" + this.attacker,
          "special attacked",
          "monster",
          randNum
        );
        this.attackPlayer();
      } else {
        this.monsterHealth = 0;
      }

      this.changeAttacker();
    },
    heal() {
      if (this.attacker === 1) {
        const randNum = getRandomNumber(7, 15);
        this.player1Health += randNum;
        this.logger("player 1", "healed", "", randNum);
        this.player1HealCount++;
      } else {
        const randNum = getRandomNumber(7, 15);
        this.player2Health += randNum;
        this.logger("player 2", "healed", "", randNum);
        this.player2HealCount++;
      }
    },
    AttackCounter() {
      if (this.attacker === 1) {
        this.player1AttackCount++;
      } else {
        this.player2AttackCount++;
      }
    },
    logger(person, action, to, data) {
      this.battleLogs.unshift({ person, action, to, data });
    },
    onSurrender() {
      this.surrender.push(this.attacker);
      this.dead.push(this.attacker);
      this.changeAttacker();
      if (this.surrender.length === 2) {
        this.winner = "monster";
      }
    },
  },
  computed: {
    disableSpecialAttack() {
      if (this.attacker === 1) {
        return (
          this.player1AttackCount < 7 || this.surrender.includes(this.attacker)
        );
      } else {
        return (
          this.player2AttackCount < 7 || this.surrender.includes(this.attacker)
        );
      }
    },
    disableHeal() {
      if (this.attacker === 1) {
        return (
          this.player1Health > 30 ||
          this.player1HealCount >= 2 ||
          this.surrender.includes(this.attacker)
        );
      } else {
        return (
          this.player2Health > 30 ||
          this.player2HealCount >= 2 ||
          this.surrender.includes(this.attacker)
        );
      }
    },

    disableAttack() {
      return this.surrender.includes(this.attacker);
    },

    disableSurrender() {
      return this.surrender.includes(this.attacker);
    },
  },
  // components: {
  //   Logger,
  // },
};
</script>

<template>
  <div class="flex gap-4 justify-around">
    <div
      class="healthcard"
      :class="dead.includes(0) ? 'bg-gray-400' : 'bg-[#4e46e563]'"
    >
      <span>
        <p>Monster health</p>
        <p>{{ monsterHealth }}%</p>
      </span>
      <div class="bg-white w-full h-[30px] mt-3">
        <div
          class="h-full"
          :style="{
            width: monsterHealth + '%',
            backgroundColor: monsterHealth > 30 ? ' green ' : ' red ',
          }"
        ></div>
      </div>
    </div>
    <div
      class="healthcard"
      :class="dead.includes(1) ? 'bg-gray-400' : 'bg-[#4e46e563]'"
    >
      <span>
        <p>Player1 health</p>
        <p>{{ player1Health }}%</p>
      </span>
      <div class="bg-white w-full h-[30px] mt-3">
        <div
          class="h-full"
          :style="{
            width: player1Health + '%',
            backgroundColor: player1Health > 30 ? ' green ' : ' red ',
          }"
        ></div>
      </div>
    </div>
    <div
      class="healthcard"
      :class="dead.includes(2) ? 'bg-gray-400' : 'bg-[#4e46e563]'"
    >
      <span>
        <p>Player2 health</p>
        <p>{{ player2Health }}%</p>
      </span>
      <div class="bg-white w-full h-[30px] mt-3">
        <div
          class="h-full"
          :style="{
            width: player2Health + '%',
            backgroundColor: player2Health > 30 ? ' green ' : ' red ',
          }"
        ></div>
      </div>
    </div>
  </div>
  <div class="mt-20 flex justify-center flex-col items-center" v-if="winner">
    <div class="bg-red-400 w-[20%] p-7 rounded-[15px] text-center">
      <p class="text-[18px] uppercase font-bold">attacker</p>
      <span>Winner is {{ winner }}</span>
      <button @click="onreset" class="mt-5">reset</button>
    </div>
  </div>
  <div class="mt-20 flex justify-center flex-col items-center" v-if="!winner">
    <div class="w-full mb-8 flex gap-4 justify-center">
      <div class="bg-red-400 w-[20%] p-7 rounded-[15px] text-center">
        <p class="text-[18px] uppercase font-bold">attacker</p>
        <span>player {{ attacker }}</span>
      </div>

      <div class="bg-red-400 w-[20%] p-7 rounded-[15px] text-center">
        <p class="text-[18px] uppercase font-bold">attack count</p>
        <div class="flex flex-col">
          <span>player 1 : {{ player1AttackCount }}</span>
          <span>player 2 : {{ player2AttackCount }}</span>
        </div>
      </div>
    </div>

    <div class="flex gap-5">
      <button type="button" @click="attackMonster" :disabled="disableAttack">
        Attack
      </button>
      <button
        type="button"
        @click="specialAttack"
        :disabled="disableSpecialAttack"
      >
        special Attack
      </button>
      <button type="button" @click="heal" :disabled="disableHeal">Heal</button>
      <button type="button" @click="onSurrender" :disabled="disableSurrender">
        Surrender
      </button>
    </div>
  </div>
  <div
    class="mt-10 shadow-[0_5px_11px_0px_rgba(0,0,0,0.30)] w-full h-[400px] battlecard flex flex-col items-center"
  >
    <Logger :battle-logs="battleLogs" />
  </div>
</template>
<style scoped>
button {
  background-color: var(--primary-color);
  padding: 15px 20px 15px 20px;
  border-radius: 15px;
  min-width: 180px;
  color: white;
  cursor: pointer;
}

.logs {
  padding: 10px;
}

button:disabled {
  background-color: gray;
  cursor: not-allowed;
}
.healthcard {
  /* background-color: #4e46e563; */
  padding: 30px;
  border-radius: 25px;
  min-width: 450px;
  text-align: center;
}

.battlecard {
  background-color: #4e46e563;
}

.healthcard p {
  font-size: 18px;
}
</style>
