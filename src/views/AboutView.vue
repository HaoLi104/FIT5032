<template>
  <div class="about container py-5 text-center">
    <h1 class="mb-4 display-4 fw-bold text-info">About Us</h1>
    <div class="row justify-content-center mb-4">
      <div class="col-lg-8 col-md-10">
        <ul class="list-group shadow-sm rounded-3">
          <li class="list-group-item bg-light">
            <router-link to="/about/mission" class="link-info fs-5"
              >Our Mission & Vision</router-link
            >
          </li>
          <li class="list-group-item">
            <router-link to="/about/team" class="link-info fs-5">Our Team</router-link>
          </li>
          <li class="list-group-item bg-light">
            <router-link to="/about/donate" class="link-info fs-5">Donate</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
  }
}
</style>
