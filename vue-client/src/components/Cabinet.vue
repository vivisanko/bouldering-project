<template>
<div>
  <div class="main">
    <div class="header">{{ message }} </div>
    <div class="center">
      <div class="sidebar">
        <div class="maininfo">
          <img v-bind:src=" userAva " />
          <h1>{{ userName }}</h1>
        </div>
        <div v-for="option in options">
          <button v-on:click="getPersonalInfo" v-bind:id="option.value">{{ option.text }}</button>
        </div>
      </div>
      <div class='content'>
        <router-view/>
      </div>
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
      userName: '',
      userAva: '',
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
      console.log(typeof (userToken))

      var userInit = {
        method: 'GET',
        headers: userHeaders
      }
      console.log(userInit)
      fetch('/personal', userInit)
        .then(function(response) {
          if (response.status === 200) {
            console.log(response)
            return response.json()
          } else {
            throw new Error('ошибка ' + response.status)
          }
        }, function(error) {
          throw error
        })
        .then(function(data) {
          if (data.error) {
            vm.message = data.error
            throw data
          } else {
            vm.userName = data.uname
            console.log(vm.userName)
            vm.userAva = data.uavatar
            console.log(vm.userAva)
          }
        })
        .catch(function genericError(error) {
          console.log(error)
        })
    },
    getPersonalInfo: function(event) {
      var info = event.target.id
      console.log(info)
      this.$router.push('/cabinet/' + info)
      var vm = this
      var userToken = sessionStorage.getItem('token')
      var uId = sessionStorage.getItem('userId')
      var userHeaders = new Headers()
      userHeaders.set('token', userToken)
      userHeaders.set('userId', uId)
      userHeaders.set('userInfo', info)
      var userInit = {
        method: 'GET',
        headers: userHeaders
      }
      console.log(userInit)
      fetch('/userinfo', userInit)
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
            vm.message = data.error
            throw data
          } else {
            console.log(data)
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

.maininfo img {
  margin-top: 20px;
  width: 160px;
  height: 95px;
  transition: all 0.5s ease-out 0.5s;
}

.maininfo h1 {
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

.main {
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  background-color: #02090f;
  min-height: 100vh;
}

.header {
flex-grow: 1;
  background-color: #02090f;
  color: #fff;
}

.center {
  flex-grow: 5;
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: #02090f;
}

.sidebar {
  flex-grow: 1;
  height: 720px;
  align-self: flex-start;
}

.content {
  flex-grow: 11;
  padding-top: 20px;
  align-self: stretch;
  min-width: 435px;
}

.maininfo {
  display: inline-block;
  width: 200px;
  height: 200px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 0 20px 0 rgba(89, 159, 246, 0.3);
  margin-top: 20px;
  text-align: center;
  transition: all 0.5s ease-out 0.5s;
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
  height: 40px;
  margin-top: 20px;
}
@media (max-width:650px) {
    .center {flex-wrap: wrap;}
    /*overflow-x: hidden;}*/
.content {min-width: 300px;}
  button {display: inline-block;}

}
</style>
