<template>
  <div class="container py-5">
    <h1 class="mb-4 text-center display-4 fw-bold text-danger">For Caregivers</h1>
    <div class="row justify-content-center mb-4">
      <div class="col-lg-8 col-md-10">
        <ul class="list-group shadow-sm rounded-3">
          <li class="list-group-item bg-light">
            <router-link to="/caregivers/guides" class="link-danger fs-5"
              >Caregiver Guides</router-link
            >
          </li>
          <li class="list-group-item">
            <router-link to="/caregivers/forum" class="link-danger fs-5">Support Forum</router-link>
          </li>
          <li class="list-group-item bg-light">
            <router-link to="/caregivers/checklists" class="link-danger fs-5"
              >Checklists & Planners</router-link
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
