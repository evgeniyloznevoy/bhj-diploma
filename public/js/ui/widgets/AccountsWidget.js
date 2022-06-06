/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */
 class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
      if (element == null) {
          throw new Error("cant create obj of AccountsWidget.class because null-element has appeared in constructor");
      } else {
          this.element = element;
          this.registerEvents();
          this.update();
      }
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
      const createBtn = document.getElementsByClassName("create-account").item(0);
      createBtn.addEventListener("click", function (event) {
          event.preventDefault();
          App.getModal("createAccount").open();
      })
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */

   update() {
    const user = User.current();
    if (!user)
      return;
    
    Account.list(user, (err, response) => {
      
      if (err) {
        alert(JSON.stringify(err));
        return;
      }
   
      if (!response.success) {
        alert(JSON.stringify(response));
        return;
      }  
      
      this.clear();
      for (const item of response.data)
        this.renderItem(item);
   
    });
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
      let accounts = document.getElementsByClassName("accounts-panel").item(0).children;

      while (accounts[1]) {
          accounts[1].parentNode.removeChild(accounts[1]);
      }
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount(element) {
      let arr = Array.from(document.getElementsByClassName("accounts-panel").item(0).children);
      let found = arr.find((item) => item.classList.contains("active"));
      if (found != undefined) found.classList.remove("active");
      element.classList.toggle("active");

      App.showPage("transactions", {
          accound_id: element.getAttribute("data-id")
      });
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item) {
      let li = document.createElement("li");
      li.classList.add("account");
      li.setAttribute("data-id", item.id);

      let a = document.createElement("a");
      a.setAttribute("href", "#");

      let title = document.createElement("span");
      title.textContent = item.name + " | ";

      let sum = document.createElement("span");
      sum.textContent = item.sum + " ₽";

      a.appendChild(title);
      a.appendChild(sum);
      li.appendChild(a);

      return li;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(item) {
    const container = document.createElement('div');
    container.innerHTML = this.getAccountHTML(item);
    
    const account = container.querySelector('.account');
    account.querySelector('a').addEventListener('click', e => {
      e.preventDefault();
      this.onSelectAccount(account);
    }); 

    this.element.appendChild(account);
  }
}