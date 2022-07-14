<template>
  <div class="row">
    <div class="loginRow1">
      <img
        class="loginImg"
        src="https://drive.google.com/uc?id=1iUV7R0HE1-X26FCDAoorBWDJbtzGzTS7"
        alt=""
      />
    </div>
    <div class="loginRow2">
      <img
        class="logoLogin"
        src="https://drive.google.com/uc?id=1tm1FtY1BlDm7q89q3c4MyS1orNRUwfAs"
      />
      <div class="welcomeText">
        <h2>Selamat Datang</h2>
        <p>
          Kami membantu anda mendapatkan pengalaman memesan layanan laundry yang
          lebih terintegrasi, cepat, dan efisien.
        </p>
      </div>
      <v-form xs12 sm8 md4>
        <v-text-field
          name="login"
          label="Login"
          type="text"
          v-model="username"
        ></v-text-field>
        <v-text-field
          id="password"
          name="password"
          label="Password"
          type="password"
          v-model="password"
        ></v-text-field>
      </v-form>
      <v-item v-if="loginFailed">
        <p>{{ messageFailed }}</p>
      </v-item>
      <v-card-actions class="loginBtn">
        <v-btn block color="primary" @click="login">Login</v-btn>
      </v-card-actions>
    </div>
  </div>
</template>

<script>
import Notification from "~/components/Notification";
import axios from "axios";

export default {
  layout: "clear",

  components: {
    Notification,
  },

  data() {
    return {
      username: "",
      password: "",
      role: "",
      error: null,
      logged: "",
      loginFailed: false,
      messageFailed: "",
    };
  },

  methods: {
    login() {
      let role = this.role.toLowerCase();
      let checkData = {
        username: this.username,
        password: this.password,
      };

      let url = "http://localhost:8000/api/user/login";
      axios.post(url, checkData).then((res) => {
        this.logged = res.status;
        console.log(res);
        try {
          if (this.logged === 200) {
            this.role = res.data.data.role;
            localStorage.setItem("id_user", res.data.data.id_user);
            localStorage.setItem("role", res.data.data.role);
            localStorage.setItem("token", res.data.data.token);

            if (this.role === "admin") {
              this.$router.push("/dashboard-admin");
              console.log(res);
            } else if (this.role === "kasir") {
              this.$router.push("/transaksi");
            } else {
              this.$router.push("/home-owner");
            }
          } else{
            this.messageFailed = "salah"
            this.loginFailed = true
          }
        } catch (err) {
          console.log(err, "fail");
        }
      });
    },
  },
};
</script>
