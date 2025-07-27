<template>
  <div class="container py-5">
    <h1 class="mb-4 text-center display-4 fw-bold text-secondary">My Profile</h1>
    <div class="row justify-content-center mb-4">
      <div class="col-lg-8 col-md-10">
        <ul class="list-group shadow-sm rounded-3">
          <li class="list-group-item bg-light">
            <router-link to="/account/profile" class="link-secondary fs-5">My Profile</router-link>
          </li>
          <li class="list-group-item">
            <router-link to="/account/saved" class="link-secondary fs-5"
              >Saved Articles & Events</router-link
            >
          </li>
          <li class="list-group-item bg-light">
            <router-link to="/account/settings" class="link-secondary fs-5">Settings</router-link>
            <ul class="list-unstyled ms-3 mt-2">
              <li>
                <router-link to="/account/settings/accessibility" class="link-secondary"
                  >Accessibility</router-link
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
