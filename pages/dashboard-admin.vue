<template>
  <div class="topRootDashboard" v-if="isAdmin">
    <h2 class="titlePage">Data Summary Overview</h2>
    <div class="rootDashboard">
      <card-admin-dashboard :total="totalAdmin" :totalTitle="title[0]" />
      <card-kasir-dashboard :total="totalKasir" :totalTitle="title[1]" />
      <!-- <card-kasir-dashboard :total="totalKasir" :totalTitle="title[1]" /> -->
      <card-owner-dashboard :total="totalOwner" :totalTitle="title[2]" />
    </div>
    <div class="rootDashboard">
      <card-member-dashboard :total="totalMember" :totalTitle="title[3]" />
      <card-outlet-dashboard :total="totalOutlet" :totalTitle="title[4]" />
    </div>
  </div>
  <div v-else-if="notFound">You're not allowed to access</div>
</template>
<script>
import cardAdminDashboard from "../components/cardAdminDashboard.vue";
import CardKasirDashboard from "../components/cardKasirDashboard.vue";
import CardMemberDashboard from "../components/cardMemberDashboard.vue";
import CardOutletDashboard from "../components/cardOutletDashboard.vue";
import CardOwnerDashboard from "../components/cardOwnerDashboard.vue";
export default {
  components: {
    cardAdminDashboard,
    CardKasirDashboard,
    CardOwnerDashboard,
    CardMemberDashboard,
    CardOutletDashboard,
  },
  data: () => ({
    headers: [
      {
        text: "ID",
        sortable: false,
        value: "id_user",
      },
      { text: "Nama", value: "nama_user", align: "start" },
      { text: "Username", value: "username" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    tableValues: [],
    isAdmin: false,
    notFound: false,
    data: {},
    token: "",
    actions: "",
    totalAdminTemp: [],
    totalKasirTemp: [],
    totalOwnerTemp: [],
    totalOutletTemp: [],
    totalMemberTemp: [],
    totalOutlet: "",
    totalMember: "",
    totalAdmin: "",
    totalKasir: "",
    totalOwner: "",
    title: [
      "Total Admin",
      "Total Kasir",
      "Total Owner",
      "Total Member",
      "Total Semua Outlet",
    ],
  }),

  mounted() {
    this.getToken();
    this.getUser();
    this.getOutlet();
    this.getMember();
  },

  methods: {
    getToken() {
      if (localStorage.getItem("token")) {
        if (localStorage.getItem("role") === "admin") {
          this.isAdmin = true;
        } else {
          this.notFound = true;
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
          this.data = res.data;
          this.data.data.forEach((element) => {
            if (element.role == "admin") {
              try {
                this.totalAdminTemp.push(element);
                this.totalAdmin = this.totalAdminTemp.length;
              } catch (error) {
                console.log(error);
              }
            }
          });
          this.data.data.forEach((element) => {
            if (element.role == "kasir") {
              try {
                this.totalKasirTemp.push(element);
                this.totalKasir = this.totalKasirTemp.length;
              } catch (error) {
                console.log(error);
              }
            }
          });
          this.data.data.forEach((element) => {
            if (element.role == "owner") {
              try {
                this.totalOwnerTemp.push(element);
                this.totalOwner = this.totalOwnerTemp.length;
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
    async getOutlet() {
      let url = "http://localhost:8000/api/outlet";
      await this.$axios
        .get(url, this.headerConfig())
        .then((res) => {
          this.data = res.data;
          this.data.data.forEach((element) => {
            try {
              this.totalOutletTemp.push(element);
              this.totalOutlet = this.totalOutletTemp.length;
            } catch (error) {
              console.log(error);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getMember() {
      let url = "http://localhost:8000/api/member";
      await this.$axios
        .get(url, this.headerConfig())
        .then((res) => {
          this.data = res.data;
          this.data.data.forEach((element) => {
            try {
              this.totalMemberTemp.push(element);
              this.totalMember = this.totalMemberTemp.length;
            } catch (error) {
              console.log(error);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>