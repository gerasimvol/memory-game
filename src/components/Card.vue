<template>
  <section class="container" @click="selectCard">
    <div :class="['card', {'card_flipped': card.selected}]">
      <div class="card__front"></div>
      <div class="card__back">{{ card.value }}</div>
    </div>
  </section>
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
    },
    allowSelect: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    card: {
      handler: function(newValue) {
        this.card = newValue
      },
      deep: true
    }
  },
  methods: {
    selectCard () {
      if (!this.allowSelect || this.card.selected) return
      this.$emit('selected', {
        card: this.card,
        id: this.id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    width: 100px;
    height: 100px;
    position: relative;
    border: 2px solid transparent;
    perspective: 800px;
  }

  .card {
    width: 100%;
    height: 100%;
    position: absolute;
    transition: transform 0.5s;
    transform-style: preserve-3d;
  }

  .card__front,
  .card__back {
    display: flex;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    font-size: 4.8rem;
    height: 100%;
    width: 100%;
    position: absolute;
    backface-visibility: hidden;
  }

  .card__front {
    background: var(--black);
  }

  .card__back {
      background: var(--white);
      transform: rotateY( 180deg );
  }

  .card_flipped {
      transform: rotateY( 180deg );
  }
</style>
