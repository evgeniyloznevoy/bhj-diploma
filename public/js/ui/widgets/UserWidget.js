/**
 * Класс UserWidget отвечает за
 * отображение информации о имени пользователя
 * после авторизации или его выхода из системы
 * */

 class UserWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
    constructor(element) {
        if (element == null) {
            throw new Errow("cant create obj of UserWidget.class because null-element has appeared in constructor");
        } else {
            this.element = element;
        }
  }

  /**
   * Получает информацию о текущем пользователе
   * с помощью User.current()
   * Если пользователь авторизован,
   * в элемент .user-name устанавливает имя
   * авторизованного пользователя
   * */
    update() {
        let currentUser = User.current();
        if (currentUser != null) {
            const usernameElement = document.getElementsByClassName("user-name").item(0);
            let tempObj = JSON.parse(User.current());
            if (tempObj != null) usernameElement.textContent = tempObj.name;
        }
  }
}