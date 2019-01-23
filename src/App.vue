<template>
  <div id="app">
    <h1 class="logo">Memory game</h1>
    <transition name="slide-in" mode="out-in">
    <section
      v-if="screen === 'start'"
      class="start-screen"
      key="start-screen"
    >
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

    <section
      v-if="screen === 'game'"
      key="game-screen"
      class="game-screen"
    >
      <button @click="endGame()">
        Give up!
      </button>
      <div :class="[`cards`, `cards_${difficult}`]" v-if="allCards">
        <card
          :class="{'card_opened': card.open}"
          v-for="(card, i) in allCards"
          :key="`card-${i}`"
          :card="card"
          :allowSelect="allowSelect"
          :id="i"
          @selected="onCardSelected($event)"
        />
      </div>
    </section>
    </transition>

    <footer class="footer">
      Made with ❤️ by
      <a
        class="author-link"
        target="_blank"
        href="https://gerasimvol.github.io/"
      >
        gerasimvol
      </a>
    </footer>
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
      screen: 'start', // game
      difficultOptions: ['easy', 'normal', 'hard', 'insane'],
      difficult: 'normal',
      allCards: null,
      selectedCards: [],
      allowSelect: true
    }
  },
  methods: {
    startNewGame () {
      this.selectedCards = []
      this.allCards = shuffle(double(this.generateUniqueCardsArray()))
      this.screen = 'game'
    },
    endGame () {
      this.screen = 'start'
    },
    winGame () {
      return confirm('New game?')
        ? this.endGame()
        : null
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
          this.selectedCards = []
          if (this.allCards.every(card => card.selected)) {
            setTimeout(() => {
              this.winGame()
            }, 500)
          }
        } else {
          this.allowSelect = false
          setTimeout(() => {
            this.selectedCards.forEach(card => {
              this.allCards[card.id].selected = false
            })
            this.selectedCards = []
            this.allowSelect = true
          }, 700)
          
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  #app {
    position: relative;
    font-family: 'Coming Soon', cursive;
    text-align: center;
    min-height: 100vh;
    height: 100%;
    background: var(--blue);
    padding-bottom: 50px;
  }

  .game-screen {
    padding-bottom: 20px;
  }

  .footer {
    font-weight: bold;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }

  .logo {
    font-weight: 700;
    font-size: 4.6rem;
    line-height: 4.6rem;
    padding: 50px 0;

    @media screen and (max-width: 1366px) {
      font-size: 4rem;
      line-height: 4rem;
      padding: 20px 0;
    }
  }

  .cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 1200px;
    margin: 0 auto;
  }

  .cards_easy {
    max-width: 400px;
  }

  .cards_normal {
    max-width: 600px;
  }

  .cards_hard {
    max-width: 800px;

    @media screen and (max-width: 1366px) {
      max-width: 1200px;
    }
  }

  .cards_insane {
    @media screen and (max-width: 1366px) {
      transform: scale(0.8);
      margin-top: -50px;
    }
  }

  button {
    border: 2px solid var(--white);
    border-radius: 5px;
    background: transparent;
    color: var(--white);
    font-size: 1.2rem;
    line-height: 1.2rem;
    font-family: 'Coming Soon', cursive;
    font-weight: 700;
    padding: 0.6rem 2.8rem;
    padding-top: 0.8rem;
    cursor: pointer;
    transition: all 0.3s;
    margin: 20px 0;

    &:hover {
      background: var(--white);
      color: var(--blue);
    }
  }

  a {
    text-decoration: none;
    color: var(--white);
  }

  .author-link {
    padding-left: 3px;

    &:hover {
      color: var(--red);
    }
  }

  .slide-in {
    &-enter-active,
    &-leave-active {
      transition: all .3s ease;
    }

    &-enter,
    &-leave-to {
      transform: translateY(10px);
      opacity: 0;
    }
  }
</style>
