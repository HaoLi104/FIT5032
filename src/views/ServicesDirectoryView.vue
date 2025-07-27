<template>
  <div class="container py-5">
    <h1 class="mb-4 text-center display-4 fw-bold text-primary">Services Directory</h1>
    <div class="row justify-content-center mb-4">
      <div class="col-lg-8 col-md-10">
        <ul class="list-group shadow-sm rounded-3">
          <li class="list-group-item bg-light">
            <router-link to="/services/search" class="link-primary fs-5"
              >Search All Services</router-link
            >
          </li>
          <li class="list-group-item">
            <router-link to="/services/category" class="link-primary fs-5">By Category</router-link>
            <ul class="list-unstyled ms-3 mt-2">
              <li>
                <router-link to="/services/category/homecare" class="link-secondary"
                  >Home Care</router-link
                >
              </li>
              <li>
                <router-link to="/services/category/transportation" class="link-secondary"
                  >Transportation</router-link
                >
              </li>
              <li>
                <router-link to="/services/category/mealdelivery" class="link-secondary"
                  >Meal Delivery</router-link
                >
              </li>
              <li>
                <router-link to="/services/category/legalfinancial" class="link-secondary"
                  >Legal & Financial</router-link
                >
              </li>
            </ul>
          </li>
          <li class="list-group-item bg-light">
            <router-link to="/services/how-to-get-listed" class="link-primary fs-5"
              >How to Get Listed</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
// No logic yet
</script>
