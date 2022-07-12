/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
 class User {
  static URL = "/user";
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
      localStorage.setItem("user", JSON.stringify(user));
  }

  /**
* Возвращает текущего авторизованного пользователя
* из локального хранилища
* */
static current() {
    if (JSON.parse(localStorage.getItem("user"))) {
      return JSON.parse(localStorage.getItem("user"))
    } else {
      return null
    };
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
      localStorage.removeItem("user");
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
      let currentUser = User.current();
      if (currentUser != null && currentUser != undefined) {
          let obj = {
              "success": true,
              "user": {
                  "id": currentUser.id,
                  "name": currentUser.name,
                  "email": currentUser.email,
                  //"created_at": "2019-03-06 18:46:41",
                  //"updated_at": "2019-03-06 18:46:41"
              }
          }
          callback(null, obj);
      } else {
          let err = new Error("such user is not authorized");
          let obj = {
              "success": false,
              "error": "authorization required"
          }
          callback(err, obj);
      }
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
      createRequest({
          url: this.URL + '/login',
          method: 'POST',
          responseType: 'json',
          data: data,
          callback: (err, response) => {
              if (response && response.user) User.setCurrent(response.user);
              callback(err, response);
          }
      });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
      createRequest({
          url: this.URL + '/register',
          method: 'POST',
          responseType: 'json',
          data,
          callback: (err, response) => {
              if (response && response.user) this.setCurrent(response.user);
              callback(err, response);
          }
      });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
      createRequest({
          url: this.URL + "/logout",
          method: "POST",
          data: {},
          callback: (err, response) => {
              if (response.success) this.unsetCurrent();
              callback(err, response);
          }
      });
  }
}