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
  constructor( element ) {
    if (!element) {
      throw new Error('Элемента не существует!!');
    };      
    this.element = element;
    this.registerEvents();
    this.update();
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    this.element.addEventListener('click', (e) => {

      e.preventDefault();
      const createAccountLink = e.target.closest('.create-account');
      const selectedAccount = e.target.closest('.account')

      if (createAccountLink) {
        App.getModal('createAccount').open();
      } else if (selectedAccount) {
        this.onSelectAccount(selectedAccount);
      }

    });
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода render()
   * */
  update() {
    if (!User.current()) {
      return;
    };

    Account.list(User.current(), (err, response) => {
      if ((err) || (!response.data)) {
        return;
      };
      this.clear();
      this.render(response.data);
    });
  }

  /**
   * Отрисовывает массив счетов с помощью
   * метода renderItem
   * */
  render( data ) {
    data.forEach(item => this.renderItem(item));
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const accountItems = Array.from(document.querySelectorAll('.account'));
    accountItems.forEach(item => {
      item.remove();
    });
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    const activeElement = this.element.querySelector('.active');

    if (activeElement) {
      activeElement.classList.remove('active');
    }

    element.classList.add('active');

    const elementId = element.dataset['id'];    
    App.showPage( 'transactions', { account_id: elementId });
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML( item ) {
    const accoutHTML =
      `<li class="account" data-id="${item.id}">
        <a href="#">
            <span>${item.name}</span> /
            <span>${item.sum} ₽</span>
        </a>
      </li>`;

    return accoutHTML;
  }

  /**
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem( item ) {
    this.element.insertAdjacentHTML('beforeend', this.getAccountHTML(item));
  }
}
