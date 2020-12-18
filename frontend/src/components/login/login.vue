<template>
  <div class="form-login">
    <div class="form-group">
      <label for="email">email</label>
      <input
        type="email"
        name="email"
        id="email"
        class="form-control"
        required
        v-model="user.email"
      />
    </div>

    <div class="form-group">
      <label for="password">password</label>
      <input
        type="password"
        name="password"
        id="password"
        class="form-control"
        required
        v-model="user.password"
      />
    </div>

    <button @click="loginUser" class="btn btn-success">submit</button>
  </div>
</template>

<script>
import Login from "../../services/login";

export default {
  name: "loginUser",
  data() {
    return {
      user: {
        email: "admin@mail.com",
        password: "password",
      },
    };
  },
  methods: {
    loginUser() {
      var data = {
        email: this.user.email,
        password: this.user.password,
      };

      Login.signin(data)
        .then((response) => {
          if (response.data.error) return console.log(response.data.error);
          this.$cookie.set("token", response.data.token, { expires: "10m" });
          this.$cookie.set(
            "user",
            JSON.stringify(response.data.user, { expires: "10m" })
          );
          if (this.$cookie.get("token")) {
            this.$emit("loggedIn");
            this.$router.push("book");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>