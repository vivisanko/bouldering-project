<template>
<div>

  <div class='main'>

    <div class='content'>
      <div class='entry-group'>
        <input class='entry-group-input' v-model="logon" />
        <p class="entry-group-text">Логин</p>
      </div>
      <div class='entry-group'>
        <input class='entry-group-input' v-model="password" />
        <p class="entry-group-text">Пароль</p>
        <button class="button-small">Забыли?</button>
      </div>
      <div class="underside">
        <button class="underside-button-big" v-on:click="inGoing">ВОЙТИ</button>
        <router-link class="underside-link" to="/registration">Зарегистрироваться</router-link>

      </div>

    </div>
  </div>

</div>
</template>

<script>
export default {
  name: 'Authorization',
  data() {
    return {
      logon: 'anonim',
      password: 'zzzzzz'
    }

  },
  methods: {
    inGoing() {
      var vm = this
      var pars = JSON.stringify({
        logon: this.logon,
        password: this.password
      })
      fetch('https://test-task-api.insirion.ru/user/authorization', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: pars

        })
        .then(function(response) {
          console.log('ответ от сервера')
          return response.json()

        })
        .then(function(data) {
          console.log(data)
          console.log(data.token)
          localStorage.setItem('token', data.token)
          vm.$router.push('/cabinet')
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
  height: 300px;
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
