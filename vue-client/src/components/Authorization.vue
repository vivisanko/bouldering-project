<template>
<div>
  <div class='main'>
    <div class='content'>
      <div class='entry-group'>
        <input class='entry-group-input' v-model='email' />
        <p class='entry-group-text'>e-mail</p>
      </div>
      <div class='entry-group'>
        <input class='entry-group-input' type = "password" v-model='password' />
        <p class='entry-group-text'>Пароль</p>
        <button class='button-small'>Забыли?</button>
      </div>
      <div class='mistake'>{{ message }}</div>
      <div class='underside'>
        <button class='underside-button-big' v-on:click='inGoing'>ВОЙТИ</button>
        <router-link class='underside-link' to='/registration'>Зарегистрироваться</router-link>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Authorization',
  data () {
    return {
      email: 'vivisanko@gmail.com',
      password: '1111',
      message: ''
    }
  },
  methods: {
    inGoing () {
      var vm = this
      var pars = JSON.stringify({
        email: this.email,
        psw: this.password
      })
      fetch('/logon', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: pars
        })
        .then(function (response) {
          console.log('ответ от сервера')
          if (response.status === 200) {
            return response.json()
          } else {
            throw new Error('ошибка ' + response.status)
          }
        }, function (error) {
          throw error
        })
        .then(function (data) {
          console.log(data)
          if (data.error) {
            vm.message = data.error
            throw data
          } else {
            sessionStorage.setItem('token', data.token)
            sessionStorage.setItem('userId', data.userId)
            console.log(data.token)
            vm.$router.push('/cabinet')
          }
        })
        .catch(function genericError (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.main {
  position: relative;
  overflow: hidden;
  margin: 0px;
  min-height: 100vh;
  width: 100%;
}

.main:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  z-index: -1;
  background-image: url("../assets/stone.png");
  background-origin: content-box;
  background-size: cover;
  background-position: 50% 0%;
}

.content {
  width: 300px;
  height: 350px;
  display: block;
  margin: auto;
  margin-top: 40vh;
}

.entry-group-text {
  width: 82px;
  height: 15px;
  font-family: 'Fira Sans', sans-serif;
  font-size: 10px;
  line-height: 1.5;
  text-align: left;
  color: #999999;
  margin-top: -40px;
}

.entry-group {
  padding-top: 20px;
  margin: auto;
  width: 260px;
  height: 30px;
  position: relative;
}


input:focus~p {
  color: #000;
}


.entry-group-input {
  width: 255px;
  height: 21px;
  border-style: hidden;
  box-shadow: inset 5px 5px 5px rgba(0, 0, 0, 0.3);
  font-family: 'Fira Sans', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  letter-spacing: 0.5px;
  text-align: left;
  padding-left: 5px;
  color: #3c3c3c;
}

.entry-group-input:focus {
  letter-spacing: normal;
  outline: none;
  box-shadow: none;
}


.button-small {
  width: 41px;
  height: 15px;
  font-family: 'Fira Sans', sans-serif;
  font-size: 10px;
  line-height: 1.5;
  text-align: left;
  color: #999999;
  background-color: inherit;
  border: none;
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.mistake {
  width: 260px;
  height: 30px;
  display: block;
  font-family: 'Fira Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  margin: auto;
  color: #fff;
}

.underside {
  width: 260px;
  margin: auto;
  margin-top: 10px;
}

.underside-button-big {
  width: 260px;
  height: 40px;
  border-radius: 100px;
  background-color: #161616;
  border: solid 2px #161616;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.7);
  font-family: 'Fira Sans', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 2px;
  text-align: center;
  color: #ffffff;
}

.underside-link {
  width: 144px;
  height: 21px;
  font-family: 'Fira Sans', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  letter-spacing: 0.5px;
  text-align: left;
  color: #999;
  text-decoration: none;
  display: block;
  margin: auto;
  margin-top: 37px;
}
</style>
