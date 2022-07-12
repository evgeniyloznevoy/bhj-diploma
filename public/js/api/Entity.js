/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * Имеет свойство HOST, равно 'https://bhj-diploma.herokuapp.com/'.
 * */
 class Entity {

    static get URL() {
      return '';
    }
  
    static get HOST() {
      return 'https://bhj-diplom.letsdocode.ru';
    }
  
    /**
     * Запрашивает с сервера список данных.
     * Это могут быть счета или доходы/расходы
     * (в зависимости от того, что наследуется от Entity)
     * */
    static list( data, callback = f => f ) {
  
      const options = {
        url: this.HOST + this.URL,
        data,
  
        method: 'GET',
        callback
      }
  
      return createRequest(options);
    }
  
    /**
     * Создаёт счёт или доход/расход с помощью запроса
     * на сервер. (в зависимости от того,
     * что наследуется от Entity)
     * */
    static create( data, callback = f => f ) {
  
      const options = {
        url: this.HOST + this.URL,
        data: Object.assign({ _method: 'PUT' }, data ),
        method: 'POST',
        callback
      }
  
      return createRequest(options);
  
    }
  
    /**
     * Получает информацию о счёте или доходе/расходе
     * (в зависимости от того, что наследуется от Entity)
     * */
    static get( id = '', data, callback = f => f ) {
  
      const options = {
        url: this.HOST + this.URL,
        data,
        method: 'GET',
        callback
      }
  
      options.data.id = id;
  
      return createRequest(options);
      
    }
  
    /**
     * Обновляет информацию о счёте или доходе/расходе
     * (в зависимости от того, что наследуется от Entity)
     * */
    static update( id = '', data, callback = f => f ) {
  
    }
  
    /**
     * Удаляет информацию о счёте или доходе/расходе
     * (в зависимости от того, что наследуется от Entity)
     * */
    static remove( id = '', data, callback = f => f ) {
  
      const options = {
        url: this.HOST + this.URL,
        data: Object.assign({ _method: 'DELETE' }, data ),
        method: 'POST',
        callback
      }
  
      options.data.id = id;
      return createRequest(options);
    }
  }
  