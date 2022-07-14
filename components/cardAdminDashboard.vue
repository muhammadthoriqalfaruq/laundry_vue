<template>
  <div class="rootCard">
    <div class="colorIdentifierAdmin"/>
    <div class="wrapInfoTotal">
      <h4>{{ totalTitle }}</h4>
      <p class="numberTotal">{{ total }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "cardAdminDashboard",
  props: { total: String, totalTitle: String},
};
</script>