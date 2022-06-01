/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
 class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
      this.initAuthLinks();
      this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
      const sidebarOpenBtn = document.getElementsByClassName("sidebar-toggle").item(0);
      const body = document.getElementsByClassName("app").item(0);
      sidebarOpenBtn.addEventListener("click", function (event) {
          event.preventDefault();
          body.classList.toggle("sidebar-open");
          body.classList.toggle("sidebar-collapse");
      });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
      const enterBtn = document.getElementsByClassName("menu-item_login").item(0);
      const registerBtn = document.getElementsByClassName("menu-item_register").item(0);
      const exitBtn = document.getElementsByClassName("menu-item menu-item_logout").item(0);

      enterBtn.addEventListener("click", function (event) {
          event.preventDefault();
          App.getModal("login").open();
      });

      registerBtn.addEventListener("click", function (event) {
          event.preventDefault();
          App.getModal("register").open();
      })

      exitBtn.addEventListener("click", function (event) {
          event.preventDefault();
          User.logout(function (err, response) {
              if (response.success) App.setState('init');
          })
      })
  }
}