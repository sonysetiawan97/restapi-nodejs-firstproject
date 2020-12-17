<template>
  <div class="container">
    <div class="table">
      <p>{{ user.email }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "list",
  data() {
    return {
      user: JSON.parse(this.$cookie.get("user")),
    };
  },
};
</script>