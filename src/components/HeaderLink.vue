<template>
  <li class="nav-item">
    <router-link :to="link" class="nav-link">{{ title }}</router-link>
  </li>
</template>

<script>
export default {
  name: 'HeaderLink',
  props: {
    link: {
      required: true
    },
    title: {
      type: String,
      required: true
    },
    customClass: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.nav-link,
.navbar-brand {
  color: #c3edc0;
}

.nav-link:hover,
.navbar-brand:hover {
  color: #9cbd99;
}
</style>
