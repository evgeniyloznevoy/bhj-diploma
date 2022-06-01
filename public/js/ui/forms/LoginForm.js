/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
 class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
    onSubmit(data) {
        if (data != null) {
            User.login(data, function (err, response) {
                if (response.success === true) {
                    App.setState('user-logged');
                    document.getElementById("login-form").reset();
                    App.getModal("login").close();
                }
            });
            
        }
    }
}