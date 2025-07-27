<template>
  <div class="container py-5">
    <h1 class="mb-4 text-center display-4 fw-bold text-primary">Community Hub</h1>
    <div class="row justify-content-center mb-4">
      <div class="col-lg-8 col-md-10">
        <ul class="list-group shadow-sm rounded-3">
          <li class="list-group-item bg-light">
            <router-link to="/community/events" class="link-primary fs-5"
              >Events Calendar</router-link
            >
          </li>
          <li class="list-group-item">
            <router-link to="/community/clubs" class="link-primary fs-5"
              >Clubs & Groups</router-link
            >
            <ul class="list-unstyled ms-3 mt-2">
              <li>
                <router-link to="/community/clubs/search" class="link-secondary"
                  >Search Clubs</router-link
                >
              </li>
              <li>
                <router-link to="/community/clubs/start" class="link-secondary"
                  >Start a Club</router-link
                >
              </li>
            </ul>
          </li>
          <li class="list-group-item bg-light">
            <router-link to="/community/volunteer" class="link-primary fs-5"
              >Volunteer Opportunities</router-link
            >
          </li>
          <li class="list-group-item">
            <router-link to="/community/news" class="link-primary fs-5"
              >Local News & Announcements</router-link
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="row g-4 justify-content-center">
      <div class="col-md-6 col-lg-4" v-for="event in communityEvents" :key="event.id">
        <div class="card h-100 shadow-sm border-0 rounded-4">
          <div class="card-body">
            <h5 class="card-title fw-bold text-info">{{ event.title }}</h5>
            <p class="card-text">{{ event.description }}</p>
            <ul class="list-unstyled mb-2 small text-muted">
              <li><strong>Date: </strong>{{ event.date }}</li>
              <li><strong>Location: </strong>{{ event.location }}</li>
            </ul>
            <!-- Rating Component -->
            <div class="mt-3 pt-3 border-top">
              <AggregateRating :itemId="event.id" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { communityEvents } from '../data/mockData'
import AggregateRating from '../components/AggregateRating.vue'
</script>
