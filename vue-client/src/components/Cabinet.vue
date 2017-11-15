<template>
<div>
  <div>{{ message }} </div>
  <div class="main-base">
    <div v-for="item in avaliableOptions" v-bind:item="item" v-bind:class="[{selected : selected == 'item'}, usual]" v-on:click="selected = item">
      <img v-bind:src=" item.img " />
      <h1>{{ item.name }}</h1>
      <p>{{ item.description }}</p>
    </div>
  </div>
</div>
</template>


<script>
export default {
  name: 'Cabinet',
  data() {
    return {
      selected: 'border-type-active',
      usual: 'border-type-usual',
      avaliableOptions: [],
      message: ''
    }
  },
  created: function() {
    this.getData()
  },
  methods: {
    getData: function() {
      var vm = this
      var userToken = sessionStorage.getItem('token')
      var uId = sessionStorage.getItem('userId')
      var userHeaders = new Headers()
      userHeaders.set('token', userToken)
      userHeaders.set('userId', uId)
      console.log(userToken)
      console.log(typeof(userToken))

      var userInit = {
        method: 'GET',
        headers: userHeaders
      }
      console.log(userInit)
      fetch('/personal', userInit)
        .then(function(response) {
          console.log(response)
          if (response.status === 200) {
            return response.json()
          } else {
            throw new Error('ошибка ' + response.status)
          }
        }, function(error) {
          throw error
        })
        .then(function(data) {
          if (data.error) {
            vm.message = data.error;
            throw data
          } else {
            data.forEach(function(item) {
              vm.avaliableOptions.push(item)
            })
            console.log(vm.avaliableOptions)
          }
        })
        .catch(function genericError(error) {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.main-base {
  width: 100%;
  min-height: 90vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
}

.border-type-usual {
  width: 160px;
  height: 192px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 0 20px 0 rgba(89, 159, 246, 0.3);
  margin: 20px 20px 20px 20px;
  text-align: center;
  transition: all 0.5s ease-out 0.5s;
}

.border-type-active {
  width: 160px;
  height: 192px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 0 20px 0 rgba(89, 159, 246, 0.6);
  margin: 20px 20px 20px 20px;
  text-align: center;
  transition: all 0.5s ease-out 0.5s;
}

.border-type-usual:hover>img {
  transform: scale(1.2);
}

img {
  width: 160px;
  height: 95px;
  transition: all 0.5s ease-out 0.5s;
  transform-origin: 50% 100%;
}

h1 {
  display: inline-block;
  width: auto;
  height: 21px;
  font-family: 'Fira Sans', sans-serif;
  font-size: 18px;
  line-height: 1.17;
  text-align: left;
  color: #3c3c3c;
  margin: auto;
  margin-top: 15px;
  padding: 0px;
}

p {
  display: inline-block;
  width: 140px;
  height: 36px;
  font-family: 'Fira Sans', sans-serif;
  font-size: 12px;
  line-height: 1.5;
  text-align: center;
  color: #999999;
  margin: auto;
  margin-top: 10px;
  padding: 0px;
}
</style>
