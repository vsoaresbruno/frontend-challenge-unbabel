<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/new-page">New page</router-link>
  </nav>
  <router-view />
</template>

<style>
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: var(--base-color);
}

nav a.router-link-exact-active {
  color: var(--blue);
}
</style>
