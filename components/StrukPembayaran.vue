<template>
  <div class="rootStruk">
    <div class="strukTitle">
      <img class="logoStruk" src="../assets/logo.png" alt="" />
    </div>
    <div class="strukHeader">
      <p>
        Mama Clean Laundry <br />
        Order #{{ idTransaksi }} for {{ member }} <br />
        Tanggal pesan: {{tanggalPesanan}}<br />
        Petugas : {{ petugas }}
      </p>
    </div>
    <p>------------------------------------------------</p>
    <div class="strukItem">
      <div>
        <p>Qty</p>
        <p>{{ qty }}</p>
      </div>
      <div>
        <p>Item</p>
        <p>{{ item }}</p>
      </div>
      <div>
        <p>Harga</p>
        <p>Rp{{ hargaSatuan }}</p>
      </div>
    </div>
    <!-- <v-data-table
        :headers="headers"
        :items="tableValues"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Items</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
          </v-toolbar>
        </template>
        <template v-slot:no-data>
          <p>No Data</p>
        </template>
      </v-data-table> -->
    <p>------------------------------------------------</p>
    <div class="strukFooter">
      <p>Harga</p>
      <p>Rp{{ total }}</p>
    </div>
    <p>
        Batas pembayaran: {{batasPembayaran}} <br>
        Tanggal dibayar: {{status}}
    </p>
  </div>
</template>

<script>
export default {
  name: "StrukPembayaran",
  props: [
    "qty",
    "item",
    "total",
    "idTransaksi",
    "member",
    "petugas",
    "hargaSatuan",
    "tanggalPesanan",
    "batasPembayaran",
    "status",
    "detailItems"
  ],
};
</script>