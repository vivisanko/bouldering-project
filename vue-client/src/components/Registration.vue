<template>
<div>
  <div class="main">
    <div class='content'>
      <div class='entry-group'>
        <input class="entry-group-input" v-model="logon" />
        <p class="entry-group-text">Введите логин</p>
      </div>
      <div class='entry-group'>
        <input class="entry-group-input" v-model="passwordOriginal" />
        <p class="entry-group-text">Придумайте пароль</p>
      </div>
      <div class='entry-group'>
        <input class="entry-group-input" v-model="password" />
        <p class="entry-group-text">Повторите пароль</p>
      </div>
      <div class='entry-group'>
        <input class="entry-group-input" v-model="email" />
        <p class="entry-group-text">Введите ваш e-mail</p>
      </div>
      <div class="mistake">{{ message }}</div>
      <div class="underside">
        <button class="underside-button-big" v-on:click="doRegistration">Регистрация</button>
        <router-link class="underside-link" to="/authorization">У меня есть аккаунт</router-link>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Registration',
  data() {
    return {
      logon: '',
      passwordOriginal: '',
      password: '',
      email: '',
      message: '',
      verification: false
    }
  },
  methods: {
    makeVerification: function() {
      if (this.logon.length < 1 || this.passwordOriginal.length < 1 || this.password.length < 1 || this.email.length < 1) {
        this.message = 'ВНИМАНИЕ: Для регистрации заполните все поля формы'
        this.verification = false
      } else {
        this.verification = true
        this.message = ''
        if (this.password !== this.passwordOriginal) {
          this.message = 'ВНИМАНИЕ: При вводе пароля вы допустили ошибку'
          this.verification = false
        }
      }
    },
    doRegistration: function() {
      this.makeVerification()
      if (!this.verification) {
        return
      }
      var vm = this
      var parsel = JSON.stringify({
        logon: this.logon,
        email: this.email,
        password: this.password
      })
      console.log(parsel)
      fetch('/checkin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: parsel
        })
        .then(function(response) {
          console.log('ответ от сервера')
          if (response.status === 200) {
            return response.json()
          } else {
            throw new Error('ошибка ' + response.status)
          }
        }, function(error) {
          throw error
        })
        .then(function(data) {
          console.log(data)
          if (data.error) {
            vm.message = data.error;
            throw data
          } else {
            vm.$router.push('/authorization')
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
  height: 370px;
  display: block;
  margin: auto;
  margin-top: 40vh;
}



.entry-group-text {
  width: 120px;
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
