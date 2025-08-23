import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/tools/email',
      name: 'email-send',
      component: () => import('../views/EmailSendView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/tools/tables',
      name: 'data-tables',
      component: () => import('../views/DataTablesView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/tools/map',
      name: 'map',
      component: () => import('../views/MapView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/tools/booking',
      name: 'booking',
      component: () => import('../views/BookingView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/tools/bulk-email',
      name: 'bulk-email',
      component: () => import('../views/BulkEmailView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/tools/charts',
      name: 'charts',
      component: () => import('../views/ChartsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/health',
      name: 'health',
      component: () => import('../views/HealthWellnessView.vue'),
    },
    {
      path: '/health/articles',
      name: 'health-articles',
      component: () => import('../views/HealthArticlesView.vue'),
    },
    {
      path: '/health/articles/nutrition',
      name: 'nutrition-diet',
      component: () => import('../views/NutritionDietView.vue'),
    },
    {
      path: '/health/articles/conditions',
      name: 'managing-conditions',
      component: () => import('../views/ManagingConditionsView.vue'),
    },
    {
      path: '/health/exercise',
      name: 'exercise-fitness',
      component: () => import('../views/ExerciseFitnessView.vue'),
    },
    {
      path: '/health/exercise/athome',
      name: 'athome-workouts',
      component: () => import('../views/AtHomeWorkoutsView.vue'),
    },
    {
      path: '/health/exercise/local',
      name: 'local-classes',
      component: () => import('../views/LocalClassesView.vue'),
    },
    {
      path: '/health/mental',
      name: 'mental-wellbeing',
      component: () => import('../views/MentalWellbeingView.vue'),
    },
    {
      path: '/health/digital',
      name: 'digital-literacy',
      component: () => import('../views/DigitalLiteracyView.vue'),
    },
    {
      path: '/health/digital/smartphone',
      name: 'using-smartphone',
      component: () => import('../views/UsingSmartphoneView.vue'),
    },
    {
      path: '/health/digital/safety',
      name: 'online-safety-scams',
      component: () => import('../views/OnlineSafetyScamsView.vue'),
    },
    {
      path: '/community',
      name: 'community',
      component: () => import('../views/CommunityHubView.vue'),
    },
    {
      path: '/community/events',
      name: 'events-calendar',
      component: () => import('../views/EventsCalendarView.vue'),
    },
    {
      path: '/community/clubs',
      name: 'clubs-groups',
      component: () => import('../views/ClubsGroupsView.vue'),
    },
    {
      path: '/community/clubs/search',
      name: 'search-clubs',
      component: () => import('../views/SearchClubsView.vue'),
    },
    {
      path: '/community/clubs/start',
      name: 'start-club',
      component: () => import('../views/StartClubView.vue'),
    },
    {
      path: '/community/volunteer',
      name: 'volunteer-opportunities',
      component: () => import('../views/VolunteerOpportunitiesView.vue'),
    },
    {
      path: '/community/news',
      name: 'local-news-announcements',
      component: () => import('../views/LocalNewsAnnouncementsView.vue'),
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('../views/ServicesDirectoryView.vue'),
    },
    {
      path: '/services/search',
      name: 'search-all-services',
      component: () => import('../views/SearchAllServicesView.vue'),
    },
    {
      path: '/services/category',
      name: 'services-by-category',
      component: () => import('../views/ServicesByCategoryView.vue'),
    },
    {
      path: '/services/category/homecare',
      name: 'home-care',
      component: () => import('../views/HomeCareView.vue'),
    },
    {
      path: '/services/category/transportation',
      name: 'transportation',
      component: () => import('../views/TransportationView.vue'),
    },
    {
      path: '/services/category/mealdelivery',
      name: 'meal-delivery',
      component: () => import('../views/MealDeliveryView.vue'),
    },
    {
      path: '/services/category/legalfinancial',
      name: 'legal-financial',
      component: () => import('../views/LegalFinancialView.vue'),
    },
    {
      path: '/services/how-to-get-listed',
      name: 'how-to-get-listed',
      component: () => import('../views/HowToGetListedView.vue'),
    },
    {
      path: '/caregivers',
      name: 'caregivers',
      component: () => import('../views/ForCaregiversView.vue'),
      meta: { requiresAuth: true, roles: ['Caregiver'] },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/about/mission',
      name: 'our-mission-vision',
      component: () => import('../views/OurMissionVisionView.vue'),
    },
    {
      path: '/about/team',
      name: 'our-team',
      component: () => import('../views/OurTeamView.vue'),
    },
    {
      path: '/about/donate',
      name: 'donate',
      component: () => import('../views/DonateView.vue'),
    },
    {
      path: '/account/profile',
      name: 'my-profile',
      component: () => import('../views/MyProfileView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/account/saved',
      name: 'saved-articles-events',
      component: () => import('../views/SavedArticlesEventsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/account/settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/account/settings/accessibility',
      name: 'accessibility',
      component: () => import('../views/AccessibilityView.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

// 路由守卫
import { useAuthStore } from '../store/auth'
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      return next({ path: '/login', query: { redirect: to.fullPath } })
    }
    if (to.meta.roles && !to.meta.roles.includes(authStore.user?.role)) {
      return next({ path: '/', query: { forbidden: 1 } })
    }
  }
  next()
})

export default router
