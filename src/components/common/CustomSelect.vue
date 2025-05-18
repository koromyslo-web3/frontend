<template>
  <div class="custom-select" @click.outside="close">
    <div class="select-box" @click="toggle">
      <span>{{ selectedLabel }}</span>
      <span class="arrow">▾</span>
    </div>
    <ul v-show="isOpen" class="options">
      <li
        v-for="option in options"
        :key="getValue(option)"
        @click="select(option)"
        :class="{ selected: isSelected(option) }"
      >
        {{ getLabel(option) }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CustomSelect',
  props: {
    value: null, // v-model
    options: {
      type: Array,
      required: true,
    },
    labelKey: {
      type: String,
      default: 'label',
    },
    valueKey: {
      type: String,
      default: 'value',
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    selectedLabel() {
      const found = this.options.find(opt => this.getValue(opt) === this.value)
      return found ? this.getLabel(found) : 'Выбери...'
    },
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    },
    close() {
      this.isOpen = false
    },
    select(option) {
      const val = this.getValue(option)
      this.$emit('input', val)
      this.close()
    },
    getLabel(option) {
      return typeof option === 'object' ? option[this.labelKey] : option
    },
    getValue(option) {
      return typeof option === 'object' ? option[this.valueKey] : option
    },
    isSelected(option) {
      return this.getValue(option) === this.value
    },
  },
  directives: {
    outside: {
      bind(el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
          if (!(el === event.target || el.contains(event.target))) {
            vnode.context[binding.expression](event)
          }
        }
        document.body.addEventListener('click', el.clickOutsideEvent)
      },
      unbind(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
      },
    },
  },
}
</script>

<style scoped>
.custom-select {
  position: relative;
  width: 200px;
  font-family: sans-serif;
}

.select-box {
  border: 1px solid #ccc;
  padding: 10px;
  cursor: pointer;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 10;
  border: 1px solid #ccc;
  background: white;
  max-height: 200px;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  list-style: none;
}

.options li {
  padding: 10px;
  cursor: pointer;
}

.options li.selected {
  background-color: #007bff;
  color: white;
}

.options li:hover {
  background-color: #f0f0f0;
}
.arrow {
  font-size: 0.8em;
}
</style>
