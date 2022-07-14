<template>
  <div class="rootCard">
    <div class="colorIdentifierOwner" />
    <div class="wrapInfoTotal">
      <h4>{{ totalTitle }}</h4>
      <p class="numberTotal">{{ total }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "cardOwnerDashboard",
  props: { total: String, totalTitle: String },
};
</script>