<template>
  <header class="header">
    <div class="header__wrap">
      <span class="header__logo">
        IP CHECKER
      </span>

      <nav>
        <RouterLink
          to="/"
          class="header__link"
        >
          Table
        </RouterLink>
        <RouterLink
          to="/new-ip"
          class="header__link"
        >
          Add New
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped lang="scss">
.header {
  display: flex;
  position: fixed;
  justify-content: center;
  height: 3rem;
  padding: 1rem;
  width: 100%;
  background-color: #F2F0F0;
}

.header__wrap {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1240px;
}

.header__logo {
  color: #101F2C;
  font-weight: bold;
}

.header__link {
  color: #5E687E;
  font-weight: bold;
  text-decoration: none;
  padding: 0.2rem 0.4rem;

  &:hover {
    color: #101F2C;
  }
}
</style>
