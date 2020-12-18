<template>
  <div class="container">
    <div class="table">
      <p>{{ user.email }}</p>
      <ul v-if="books">
        <li v-for="book in books" :key="book.title">
          {{ book.title }}
        </li>
      </ul>
      <p v-else>{{ error }}</p>
    </div>
    <button @click="logout">logout</button>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "list",
  data() {
    return {
      user: JSON.parse(this.$cookie.get("user")),
      books: null,
      error: null,
    };
  },
  created() {
    Axios.get("http://localhost:3000/api/v1/book", {
      headers: { Authorization: this.$cookie.get("token") },
    })
      .then((response) => {
        if (response.data.entries) this.books = response.data.entries;
        if (response.data.message) this.error = response.data.message;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    logout() {
      this.$cookie.delete("token");
      this.$cookie.delete("user");
      this.$emit("loggedOut");
      this.$router.push("login");
    },
  },
};
</script>