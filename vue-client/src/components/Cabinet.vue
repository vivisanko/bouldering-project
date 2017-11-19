<template>
<div>
  <div>{{ message }} </div>
  <div class="main-base">
    <div v-for="item in avaliableOptions" v-bind:item="item" v-bind:class="[{selected : selected == 'item'}, usual]" v-on:click="selected = item">
      <img v-bind:src=" item.img " />
      <h1>{{ item.name }}</h1>
      <p>{{ item.description }}</p>
    </div>
    <div class="basic">
      <div class="basic-left">
      <div v-for="option in options">
        <button v-on:click="showValue" v-bind:id="option.value">{{ option.text }}</button>
      </div>
    </div>
    <div class="basic-right"></div>
    </div>
  </div>
</div>
</template>


<script>
export default {
  name: 'Cabinet',
  data () {
    return {
      selected: 'border-type-active',
      usual: 'border-type-usual',
      avaliableOptions: [],
      options: [{
          text: 'Профиль',
          value: 'profile'
        },
        {
          text: 'Рейтинг',
          value: 'rating'
        },
        {
          text: 'Техника скалолазания',
          value: 'theory'
        },
        {
          text: 'План тренировки',
          value: 'coaching'
        },
        {
          text: 'Маршруты',
          value: 'suitableroute'
        },
        {
          text: 'Пройденные маршруты',
          value: 'passedroute'
        },
        {
          text: 'Случайный маршрут',
          value: 'randomroute'
        },
        {
          text: 'Выход',
          value: 'exit'
        }
      ],
      message: ''
    }
  },
  created: function () {
    this.getData()
  },
  methods: {
    getData: function () {
      var vm = this
      var userToken = sessionStorage.getItem('token')
      var uId = sessionStorage.getItem('userId')
      var userHeaders = new Headers()
      userHeaders.set('token', userToken)
      userHeaders.set('userId', uId)
      console.log(userToken)
      console.log(typeof (userToken))

      var userInit = {
        method: 'GET',
        headers: userHeaders
      }
      console.log(userInit)
      fetch('/personal', userInit)
        .then(function (response) {
          console.log(response)
          if (response.status === 200) {
            return response.json()
          } else {
            throw new Error('ошибка ' + response.status)
          }
        }, function (error) {
          throw error
        })
        .then(function (data) {
          if (data.error) {
            vm.message = data.error
            throw data
          } else {
            data.forEach(function (item) {
              vm.avaliableOptions.push(item)
            })
            console.log(vm.avaliableOptions)
          }
        })
        .catch(function genericError (error) {
          console.log(error)
        })
    },
    showValue: function (event) {
      console.log(event.target)
      console.log(event.target.id)
    }
  }
}
</script>

<style scoped>
.main-base {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
  background-color: #4b4b4b;
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
.basic {
  width: 100%;
  background-color: #000;
  display: flex;
  flex-wrap: wrap;
}
.basic-left {
  width: 240px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.basic-right {
  background-image: url("../assets/mountains.png");
  background-origin: content-box;
  background-size: contain;
  width: calc(100% - 240px - 20px);
  min-width: 300px;
  background-repeat: no-repeat;
  background-position: center;
}

button {
  background-color: #4b4b4b;
  font-family: 'Fira Sans', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  text-align: center;
  color: #fff;
  width: 200px;
  height: 50px;
  margin-top: 20px;
}
</style>
