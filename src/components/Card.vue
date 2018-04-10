<template>
  <div
    class="card"
    @click="selectCard"
  >
    <div class="card_front">
      <div class="card__icon">
        {{ card.value }}
      </div>
    </div>

    <div class="card_back"></div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  data () {
    return {}
  },
  props: {
    card: {
      type: Object,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  methods: {
    selectCard () {
      if(this.card.selected) return
      this.$emit('selected', {
        card: this.card,
        id: this.id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .card {
    box-sizing: border-box;
    border: 2px solid lightgray;
    border-radius: 5px;
    margin: 10px;
    padding: 25px;
    cursor: pointer;
    transition: all 0.5s;
    transform: rotateY(180deg);

    &_back {
      background: burlywood;
    }

    &__icon {
      font-size: 3rem;
    }
  }
</style>
