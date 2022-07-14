<template>
  <v-app light>
    <div v-if="isadmin">
      <v-navigation-drawer
        v-if="isadmin"
        class="sideBar"
        v-model="drawer"
        :mini-variant="miniVariant"
        :clipped="clipped"
        fixed
        app
      >
        <template v-slot:prepend>
          <v-list-item two-line>
            <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/women/81.jpg" />
            </v-list-item-avatar>

            <v-list-item-content>
              <p class="nameProfil">{{ user.nama_user }}</p>
              <p class="nameProfilr">Logged In</p>
            </v-list-item-content>
          </v-list-item>
        </template>

        <v-divider></v-divider>
        <v-list dense>
          <v-list-item
            v-for="(item, i) in itemsAdmin"
            :key="i"
            :to="item.to"
            router
          >
            <v-list-item-action>
              <v-icon color="#">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="sideText" v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar flat :clipped-left="clipped" fixed app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <img
          class="logo"
          src="https://drive.google.com/uc?id=1tm1FtY1BlDm7q89q3c4MyS1orNRUwfAs"
        />
        <v-spacer />
        <div class="badge">{{ user.role }}</div>
        <button @click="logout">
          <img
            src="https://drive.google.com/uc?id=1TcDvcxR6a1nNn691Cp8wTov06gOxRlRf"
            alt=""
          />
        </button>
      </v-app-bar>
    </div>

    <div v-else-if="iskasir">
      <v-navigation-drawer
        v-if="iskasir"
        class="sideBar"
        v-model="drawer"
        :mini-variant="miniVariant"
        :clipped="clipped"
        fixed
        app
      >
        <template v-slot:prepend>
          <v-list-item two-line>
            <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/women/81.jpg" />
            </v-list-item-avatar>

            <v-list-item-content>
              <p class="nameProfil">{{ user.nama_user }}</p>
              <p class="nameProfilr">Logged In</p>
            </v-list-item-content>
          </v-list-item>
        </template>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-item
            v-for="(item, i) in itemsKasir"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon color="#">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="sideText" v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar flat :clipped-left="clipped" fixed app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <img
          class="logo"
          src="https://drive.google.com/uc?id=1tm1FtY1BlDm7q89q3c4MyS1orNRUwfAs"
        />
        <v-spacer />
        <div class="badge">{{ user.role }}</div>
        <button @click="logout">
          <img
            src="https://drive.google.com/uc?id=1TcDvcxR6a1nNn691Cp8wTov06gOxRlRf"
            alt=""
          />
        </button>
      </v-app-bar>
    </div>

    <div v-else-if="isowner">
      <v-navigation-drawer
        v-if="isowner"
        class="sideBar"
        v-model="drawer"
        :mini-variant="miniVariant"
        :clipped="clipped"
        fixed
        app
      >
        <template v-slot:prepend>
          <v-list-item two-line>
            <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/women/81.jpg" />
            </v-list-item-avatar>

            <v-list-item-content>
              <p class="nameProfil">{{ user.nama_user }}</p>
              <p class="nameProfilr">Logged In</p>
            </v-list-item-content>
          </v-list-item>
        </template>
        <v-list dense>
          <v-list-item
            v-for="(item, i) in itemsOwner"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon color="#">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="sideText" v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar flat :clipped-left="clipped" fixed app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <img
          class="logo"
          src="https://drive.google.com/uc?id=1tm1FtY1BlDm7q89q3c4MyS1orNRUwfAs"
        />
        <v-spacer />
        <div class="badge">{{ user.role }}</div>
        <button @click="logout">
          <img
            src="https://drive.google.com/uc?id=1TcDvcxR6a1nNn691Cp8wTov06gOxRlRf"
            alt=""
          />
        </button>
      </v-app-bar>
    </div>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      itemsAdmin: [
        {
          icon: "mdi-home-city",
          title: "Dashboard",
          to: "/dashboard-admin",
        },
        {
          icon: "mdi-apps",
          title: "Transaksi",
          to: "/transaksi",
        },
        {
          icon: "mdi-file-document-multiple",
          title: "Histori Transaksi",
          to: "/histori",
        },
        {
          icon: "mdi-account-multiple",
          title: "Daftar Member",
          to: "/list-member",
        },
        {
          icon: "mdi-home-city",
          title: "Daftar Outlet",
          to: "/list-outlet",
        },
        {
          icon: "mdi-archive",
          title: "Daftar Paket",
          to: "/list-paket",
        },
        {
          icon: "mdi-account-multiple",
          title: "Daftar User Admin",
          to: "/list-admin",
        },
        {
          icon: "mdi-account-multiple",
          title: "Daftar User Owner",
          to: "/list-owner",
        },
        {
          icon: "mdi-account-multiple",
          title: "Daftar User Kasir",
          to: "/list-kasir",
        },
      ],
      itemsKasir: [
        {
          icon: "mdi-apps",
          title: "Transaksi",
          to: "/transaksi",
        },
        {
          icon: "mdi-file-document-multiple",
          title: "Histori Transaksi",
          to: "/histori",
        },
        {
          icon: "mdi-account-multiple",
          title: "Daftar Member",
          to: "/list-member",
        },
      ],
      itemsOwner: [
        {
          icon: "mdi-home-city",
          title: "Dashboard",
          to: "/home-owner",
        },
      ],
      miniVariant: false,
      right: false,
      rightDrawer: false,
      token: "",
      role: "",
      isadmin: false,
      iskasir: false,
      isowner: false,
      user: [
        {
          id_user: "",
          nama_user: "",
          role: "",
        },
      ],
    };
  },

  mounted() {
    this.getToken();
    this.getUser();
    this.getRole();
    console.log(this.user.role);
    console.log(this.user.nama_user);
  },
  methods: {
    logout() {
      this.$router.push("/");
      localStorage.removeItem("role");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    getToken() {
      if (localStorage.getItem("token")) {
        if (localStorage.getItem("role") === "admin") {
          this.isadmin = true;
        } else if (localStorage.getItem("role") === "kasir") {
          this.iskasir = true;
        } else {
          this.isowner = true;
        }
      } else {
        console.log("NO TOKEN");
        this.$router.push("/");
      }
    },
    headerConfig() {
      let header = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      return header;
    },
    async getUser() {
      let url = "http://localhost:8000/api/user";
      await this.$axios
        .get(url, this.headerConfig())
        .then((res) => {
          res.data.data.forEach((element) => {
            if (element.id_user == localStorage.getItem("id_user")) {
              try {
                this.user.id_user = element.id_user;
                this.user.nama_user = element.nama_user;
                console.log(element, "ppp");
              } catch (error) {
                console.log(error);
              }
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getRole() {
      this.user.role = localStorage.getItem("role");
    },
  },
};
</script>
