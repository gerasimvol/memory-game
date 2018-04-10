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
      <button @click="startNewGame()">
        Start
      </button>
    </section>
    <section class="cards" v-if="allCards">
      <card
        :class="{'card_opened': card.open}"
        v-for="(card, i) in allCards"
        :key="`card-${i}`"
        :card="card"
        :id="i"
        @selected="onCardSelected($event)"
      />
    </section>
  </div>
</template>

<script>
import Card from './components/Card'
import getRandomEmoji from './utils/generateRandomEmoji'
import double from './utils/doubleArray'
import shuffle from './utils/shuffleArray'
import addId from './utils/addId'

export default {
  name: 'App',
  components: {
    Card
  },
  data () {
    return {
      difficultOptions: ['easy', 'normal', 'hard', 'insane'],
      difficult: 'normal',
      allCards: null,
      selectedCards: []
    }
  },
  methods: {
    startNewGame () {
      this.selectedCards = []
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
    },
    onCardSelected (selectedCard) {
      this.allCards[selectedCard.id].selected = true

      if (this.selectedCards.length < 2) {
        this.selectedCards.push(selectedCard)
      }

      if (this.selectedCards.length === 2) {
        if (this.selectedCards[0].card.value === this.selectedCards[1].card.value) {
          console.log('PAIR')
          this.selectedCards = []
          if (this.allCards.every(card => card.selected)) {
            console.log('GG')
          }
        } else {
          this.selectedCards.forEach(card => {
            this.allCards[card.id].selected = false
          })
          this.selectedCards = []
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .cards {
    display: flex;
    max-width: 100vw;
    flex-wrap: wrap;
  }

  .card {
    &_opened {
      transform: rotateY(-180deg);
    }
  }
</style>
