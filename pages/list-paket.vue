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
            <v-toolbar-title>Daftar Paket</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark class="mb-2" @click="tambahItem()">
              Tambah Paket
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
                      <v-text-field
                        v-model="editedItem.jenis"
                        label="Jenis"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.harga"
                        label="Harga"
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
                      <v-text-field
                        v-model="editedItem.jenis"
                        label="Jenis"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.harga"
                        label="Harga"
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
    jenis_kelamin: ["perempuan", "laki-laki"],
    headers: [
      {
        text: "ID",
        sortable: false,
        value: "id_paket",
      },
      { text: "Jenis", value: "jenis" },
      { text: "Harga", value: "harga" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    tableValues: [],
    editedIndex: -1,
    editedItem: {
      jenis: "",
      harga: "",
    },
    isAdmin: false,
    notFound: false,
    data: {},
    token: "",
    actions: "",
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Tambah Paket" : "Edit Paket";
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
  },

  methods: {
    getToken() {
      if (localStorage.getItem("token")) {
        if (
          localStorage.getItem("role") === "admin" ||
          localStorage.getItem("role") === "kasir"
        ) {
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
      let url = "http://localhost:8000/api/paket";
      await this.$axios
        .get(url, this.headerConfig())
        .then((res) => {
          this.data = res.data;
          res.data.data.forEach((element) => {
            this.tableValues.push(element);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async update(e) {
      e.preventDefault();
      let data = {
        jenis: this.editedItem.jenis,
        harga: this.editedItem.harga,
      };
      await this.$axios
        .put(
          `http://localhost:8000/api/paket/` + this.editedItem.id_paket,
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
        let url = `http://localhost:8000/api/paket/` + selected.id_paket;
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
      let url = `http://localhost:8000/api/paket`;
      let checkData = {
        jenis: this.editedItem.jenis,
        harga: this.editedItem.harga,
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
      console.log(this.editedItem);
      this.dialogEdit = true;
    },

    closeEdit() {
      this.dialogEdit = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({});
        this.editedIndex = -1;
      });
    },

    deleteItem(item) {
      this.editedIndex = this.tableValues.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
  },
};
</script>