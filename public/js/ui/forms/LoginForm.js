/**
 * Класс LoginForm управляет формой
 * входа в портал
 * Наследуется от AsyncForm
 * */
 class LoginForm extends AsyncForm{
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {

    User.login( options.data, ( err, response ) => {
      if (err) return console.log( 'Ошибка:', err );
      else if (!response.user) alert('Неправильный логин или пароль');
      else {
        this.element.reset();
        User.setCurrent(response.user);
        App.setState('user-logged')
        const modal = new Modal(this.element.closest('.modal'))
        modal.close();
      }
    });

  }
}
