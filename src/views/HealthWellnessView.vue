<template>
  <div class="container py-5">
    <h1 class="mb-4 text-center display-4 fw-bold text-success">Health & Wellness</h1>
    <div class="row justify-content-center mb-4">
      <div class="col-lg-8 col-md-10">
        <ul class="list-group shadow-sm rounded-3">
          <li class="list-group-item bg-light">
            <router-link to="/health/articles" class="link-success fs-5"
              >Health Articles</router-link
            >
            <ul class="list-unstyled ms-3 mt-2">
              <li>
                <router-link to="/health/articles/nutrition" class="link-secondary"
                  >Nutrition & Diet</router-link
                >
              </li>
              <li>
                <router-link to="/health/articles/conditions" class="link-secondary"
                  >Managing Conditions</router-link
                >
              </li>
            </ul>
          </li>
          <li class="list-group-item">
            <router-link to="/health/exercise" class="link-success fs-5"
              >Exercise & Fitness</router-link
            >
            <ul class="list-unstyled ms-3 mt-2">
              <li>
                <router-link to="/health/exercise/athome" class="link-secondary"
                  >At-Home Workouts</router-link
                >
              </li>
              <li>
                <router-link to="/health/exercise/local" class="link-secondary"
                  >Local Classes</router-link
                >
              </li>
            </ul>
          </li>
          <li class="list-group-item bg-light">
            <router-link to="/health/mental" class="link-success fs-5"
              >Mental Wellbeing</router-link
            >
          </li>
          <li class="list-group-item">
            <router-link to="/health/digital" class="link-success fs-5"
              >Digital Literacy</router-link
            >
            <ul class="list-unstyled ms-3 mt-2">
              <li>
                <router-link to="/health/digital/smartphone" class="link-secondary"
                  >Using Your Smartphone</router-link
                >
              </li>
              <li>
                <router-link to="/health/digital/safety" class="link-secondary"
                  >Online Safety & Scams</router-link
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
// No logic yet
</script>
