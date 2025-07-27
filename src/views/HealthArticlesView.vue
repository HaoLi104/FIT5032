<template>
  <div class="container py-5">
    <h1 class="mb-4 text-center display-4 fw-bold text-success">Health Articles</h1>
    <div class="row g-4 justify-content-center">
      <div class="col-md-6 col-lg-4" v-for="article in articles" :key="article.id">
        <div class="card h-100 shadow-sm border-0 rounded-4">
          <div class="card-body">
            <h5 class="card-title fw-bold text-success">{{ article.title }}</h5>
            <p class="card-text">{{ article.description }}</p>
            <ul class="list-unstyled mb-2 small text-muted">
              <li><strong>Date: </strong>{{ article.date }}</li>
              <li><strong>Location: </strong>{{ article.location }}</li>
            </ul>
            <!-- Rating Component -->
            <div class="mt-3 pt-3 border-top">
              <AggregateRating :itemId="'article-' + article.id" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { articles } from '../data/mockData'
import AggregateRating from '../components/AggregateRating.vue'
</script>
