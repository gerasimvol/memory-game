<template>
  <div id="app">
    <section class="start-screen">
      <div class="difficult">
        <h3>Choose difficult</h3>
        <select v-model="difficult">
          <option
            v-for="level in difficultOptions"
            :key="`difficult-${level}`"
          >
            <span>{{ level }}</span>
          </option>
        </select>
      </div>
      <button @click="generateCards()">
        Start
      </button>
    </section>
    <section class="cards"></section>
  </div>
</template>

<script>
import Card from './components/Card'
import getRandomEmoji from './utils/generateRandomEmoji'
import double from './utils/doubleArray'
import shuffle from './utils/shuffleArray'

export default {
  name: 'App',
  components: {
    Card
  },
  data () {
    return {
      difficultOptions: ['easy', 'normal', 'hard', 'insane'],
      difficult: 'normal',
      allCards: []
    }
  },
  methods: {
    generateCards () {
      this.allCards = shuffle(double(this.generateUniqueCardsArray()))
    },
    generateUniqueCardsArray () {
      // First hald of allCard. Second half is copy of first
      const amountOfUniqueCards = this.getAmountOfCardFromDifficult()
      const uniqueCards = []

      function generateUniqueEmoji (arrayToPush) {
        const newEmoji = getRandomEmoji()
        const emojiIsUsed = !!arrayToPush.find(card => card.value === newEmoji)

        return emojiIsUsed
          ? generateUniqueEmoji(arrayToPush)
          : newEmoji
      }
      
      for (let i = 0; i < amountOfUniqueCards; i++) {
        const card = {
          id: i,
          value: generateUniqueEmoji(uniqueCards),
          selected: false
        }
        uniqueCards.push(card)
      }

      return uniqueCards
    },
    getAmountOfCardFromDifficult () {
      const basicAmount = 6

      switch (this.difficult) {
        case 'easy': return basicAmount
        case 'normal': return basicAmount * 2
        case 'hard': return basicAmount * 4
        case 'insane': return basicAmount * 6
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
