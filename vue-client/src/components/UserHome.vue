<template>
<div>
  <div class="heart"></div>
</div>
</template>

<script>
export default {
  name: 'UserHome'
}
</script>


<style scoped>
.heart {
  margin: 0px;
  background-image: url("../assets/mountains.png");
  background-origin: content-box;
  background-size: contain;
  width: 100%;
  height: 680px;
  background-repeat: no-repeat;
  background-position: bottom;
}
@media (max-width:516px) {
  .heart {
    background-position: top;
  max-height: 400px;
  }
}
</style>
