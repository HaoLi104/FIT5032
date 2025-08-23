<template>
  <div class="container py-5" aria-labelledby="a11y-title">
    <h1 id="a11y-title" class="mb-4">Accessibility Settings</h1>
    <div class="card mx-auto" style="max-width: 720px">
      <div class="card-body">
        <div class="form-check form-switch mb-3">
          <input class="form-check-input" type="checkbox" id="toggle-contrast" :checked="highContrast" @change="toggleContrast" />
          <label class="form-check-label" for="toggle-contrast">High Contrast Mode</label>
        </div>
        <div class="form-check form-switch mb-3">
          <input class="form-check-input" type="checkbox" id="toggle-font" :checked="largeFont" @change="toggleFont" />
          <label class="form-check-label" for="toggle-font">Large Font Size</label>
        </div>
        <div class="mt-4">
          <button class="btn btn-outline-secondary me-2" @click="enableKeyboardFocus">Enable Focus Outline</button>
          <button class="btn btn-outline-secondary" @click="reset">Reset</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'

const highContrast = ref(false)
const largeFont = ref(false)

function applyState() {
  document.body.classList.toggle('high-contrast', highContrast.value)
  document.body.classList.toggle('large-font', largeFont.value)
}

function toggleContrast() {
  highContrast.value = !highContrast.value
  localStorage.setItem('a11y_high_contrast', String(highContrast.value))
  applyState()
}
function toggleFont() {
  largeFont.value = !largeFont.value
  localStorage.setItem('a11y_large_font', String(largeFont.value))
  applyState()
}
function enableKeyboardFocus() {
  document.body.style.outline = 'none'
  const css = document.createElement('style')
  css.innerHTML = `:focus { outline: 3px solid #ff9800 !important; outline-offset: 2px !important; }`
  css.setAttribute('data-a11y-focus', '1')
  document.head.appendChild(css)
}
function reset() {
  highContrast.value = false
  largeFont.value = false
  localStorage.removeItem('a11y_high_contrast')
  localStorage.removeItem('a11y_large_font')
  document.querySelectorAll('style[data-a11y-focus="1"]').forEach((n) => n.remove())
  applyState()
}

onMounted(() => {
  highContrast.value = localStorage.getItem('a11y_high_contrast') === 'true'
  largeFont.value = localStorage.getItem('a11y_large_font') === 'true'
  applyState()
})
</script>
