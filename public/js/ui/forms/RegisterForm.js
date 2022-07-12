/**
 * Класс RegisterForm управляет формой
 * регистрации
 * Наследуется от AsyncForm
 * */
 class RegisterForm extends AsyncForm{
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {
    User.register( options.data, ( err, response ) => {
      
      if (err) return console.log( 'Ошибка:', err );
      else if (response.error) return alert('Ошибка:', response.error)
 
      this.element.reset();
      User.setCurrent(response.user);
      App.setState('user-logged')
      const modal = new Modal(this.element.closest('.modal'))
      modal.close();

    });

  }
}
