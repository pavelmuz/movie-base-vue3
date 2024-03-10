import { createRouter, createWebHistory } from 'vue-router'

const Login = () => import('@/views/Login.vue')
const Register = () => import('@/views/Register.vue')
const Feed = () => import('@/views/MainFeed.vue')
const SearchProfiles = () => import('@/views/SearchProfiles.vue')
const SearchMovie = () => import('@/views/SearchMovie.vue')
const SearchMovieResults = () => import('@/views/SearchMovieResults.vue')
const AddMovie = () => import('@/views/AddMovie.vue')
const Account = () => import('@/views/Account.vue')
const Profile = () => import('@/views/Profile.vue')
const Notifications = () => import('@/views/Notifications.vue')
const ActiveChats = () => import('@/views/ActiveChats.vue')
const Chat = () => import('@/views/Chat.vue')
const MovieDetails = () => import('@/views/MovieDetails.vue')

const routes = [
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'register',
    path: '/register',
    component: Register
  },
  {
    name: 'feed',
    path: '/',
    component: Feed
  },
  {
    name: 'profiles',
    path: '/profiles',
    component: SearchProfiles
  },
  {
    name: 'search',
    path: '/search',
    component: SearchMovie
  },
  {
    name: 'search-results',
    path: '/search-results/:title',
    component: SearchMovieResults
  },
  {
    name: 'add-movie',
    path: '/add-movie/:id',
    component: AddMovie
  },
  {
    name: 'account',
    path: '/account',
    component: Account
  },
  {
    name: 'profile',
    path: '/profile/:id?',
    component: Profile
  },
  {
    name: 'notifications',
    path: '/notifications',
    component: Notifications
  },
  {
    name: 'chats',
    path: '/chats',
    component: ActiveChats
  },
  {
    name: 'chat',
    path: '/chats/:recipientId?',
    component: Chat
  },
  {
    name: 'movie',
    path: '/movie/:movieId',
    component: MovieDetails
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
