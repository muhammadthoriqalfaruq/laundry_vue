<template>
  <div id="app" v-if="isAdmin">
    <v-app id="list-admin">
      <v-data-table
        :headers="headers"
        :items="tableValues"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Daftar Outlet</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark class="mb-2" @click="tambahItem()">
              Tambah Outlet
            </v-btn>
            <!-- MODAL TAMBAH -->
            <v-dialog v-model="dialogTambah" max-width="500px">
              <v-card>
                <v-card-title>
                  <span>{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-col>
                      <v-select
                        :items="jobTitles"
                        v-model="editedItem.id_user"
                        item-text="nama_user"
                        item-value="id_user"
                        label="Owner"
                      >
                      </v-select>
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.alamat"
                        label="Alamat"
                      ></v-text-field>
                    </v-col>
                  </v-container>
                </v-card-text>
                <div class="actionModal">
                  <v-spacer></v-spacer>
                  <v-btn color="error" text @click="closeTambah"> Tutup </v-btn>
                  <v-btn color="primary" text @click="add"> Simpan </v-btn>
                </div>
              </v-card>
            </v-dialog>

            <!-- MODAL EDIT -->
            <v-dialog v-model="dialogEdit" max-width="500px">
              <v-card>
                <v-card-title>
                  <span>{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-col>
                      <v-select
                        :items="jobTitles"
                        v-model="editedItem.id_user"
                        item-text="nama_user"
                        item-value="id_user"
                        label="Owner"
                      >
                      </v-select>
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.alamat"
                        label="Alamat"
                      ></v-text-field>
                    </v-col>
                  </v-container>
                </v-card-text>
                <div class="actionModal">
                  <v-spacer></v-spacer>
                  <v-btn color="error" text @click="closeEdit"> Tutup </v-btn>
                  <v-btn color="primary" text @click="update"> Simpan </v-btn>
                </div>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon color="primary" small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon color="error" small @click="deleteData(item)">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <p>No Data</p>
        </template>
      </v-data-table>
    </v-app>
  </div>
  <div v-else-if="notFound">
    <p>You're not allowed to access</p>
  </div>
</template>
<script>
export default {
  data: () => ({
    dialogTambah: false,
    dialogDelete: false,
    dialogEdit: false,
    role: ["admin", "kasir", "owner"],
    headers: [
      {
        text: "ID",
        sortable: false,
        value: "id_outlet",
      },
      { text: "Alamat", value: "alamat", align: "start" },
      { text: "Owner", value: "nama_user" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    tableValues: [],
    editedIndex: -1,
    editedItem: {
      id_user: "",
      alamat: "",
    },
    isAdmin: false,
    notFound: false,
    token: "",
    actions: "",
    jobTitles: [],
    selectedJobTitle: null,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Tambah Outlet" : "Edit Outlet";
    },
  },

  watch: {
    dialogTambah(val) {
      val || this.closeTambah();
    },
    dialogEdit(val) {
      val || this.closeEdit();
    },
  },

  created() {
    this.initialize();
  },

  mounted() {
    this.getToken();
    this.getUser();
    this.getOwner();
    // console.log(this.selectedJobTitle);
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
      let url = "http://localhost:8000/api/outlet";
      await this.$axios
        .get(url, this.headerConfig())
        .then((res) => {
          this.tableValues = res.data.data.map((val) => ({
            id_user: val.id_user,
            id_outlet: val.id_outlet,
            nama_user: val.user.nama_user,
            alamat: val.alamat,
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getOwner() {
      let url = "http://localhost:8000/api/user";
      await this.$axios
        .get(url, this.headerConfig())
        .then((res) => {
          res.data.data.forEach((element) => {
            if (element.role == "owner") {
              try {
                console.log(element);
                this.jobTitles.push(element);
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
    async update(e) {
      e.preventDefault();
      let data = {
        id_user: this.editedItem.id_user,
        alamat: this.editedItem.alamat,
      };
      await this.$axios
        .put(
          `http://localhost:8000/api/outlet/` + this.editedItem.id_outlet,
          data,
          this.headerConfig()
        )
        .then(() => {
          this.closeEdit();
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async deleteData(selected) {
      if (window.confirm("Apakah anda yakin akan menghapus data ?")) {
        let url = `http://localhost:8000/api/outlet/` + selected.id_outlet;
        await this.$axios
          .delete(url, this.headerConfig())
          .then((res) => {
            this.getUser();
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    },

    async add() {
      let url = `http://localhost:8000/api/outlet`;
      let checkData = {
        id_user: this.editedItem.id_user,
        alamat: this.editedItem.alamat,
      };
      await this.$axios
        .post(url, checkData, this.headerConfig())
        .then((res) => {
          this.getUser();
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    tambahItem() {
      this.dialogTambah = true;
    },

    closeTambah() {
      this.dialogTambah = false;
    },

    initialize() {},

    editItem(item) {
      this.editedIndex = this.tableValues.indexOf(item);
      this.editedItem = Object.assign({}, item);
      // this.selectedJobTitle = item.id_user;
      console.log(item);
      this.dialogEdit = true;
    },

    closeEdit() {
      this.dialogEdit = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({});
        this.editedIndex = -1;
      });
    },
  },
};
</script>