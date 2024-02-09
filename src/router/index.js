import { createRouter, createWebHistory } from 'vue-router'

const Login = () => import('@/views/LoginView.vue')
const Register = () => import('@/views/RegisterView.vue')
const Feed = () => import('@/views/FeedView.vue')
const SearchProfiles = () => import('@/views/SearchProfilesView.vue')
const SearchMovie = () => import('@/views/SearchMovieView.vue')
const SearchMovieResults = () => import('@/views/SearchMovieResultsView.vue')
const AddMovie = () => import('@/views/AddMovieView.vue')
const Account = () => import('@/views/AccountView.vue')
const Profile = () => import('@/views/ProfileView.vue')
const Notifications = () => import('@/views/NotificationsView.vue')
const Chats = () => import('@/views/ChatsView.vue')
const Chat = () => import('@/views/ChatView.vue')

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
    path: '/profile/:id',
    component: Profile
  },
  {
    name: 'notifications',
    path: '/notifications/',
    component: Notifications
  },
  {
    name: 'chats',
    path: '/chats/',
    component: Chats
  },
  {
    name: 'chat',
    path: '/chats/:userId/:recipientId',
    component: Chat
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
