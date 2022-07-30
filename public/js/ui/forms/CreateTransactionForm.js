/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
 class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor( element ) {
    if(!element) {
      throw new Error('Элемент не передан!!')
    }
    super(element);
    this.renderAccountsList();
  }

  update() {
    this.renderAccountsList()
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    
    const accountsSelectList = this.element.querySelector('.accounts-select');

    Account.list(User.current(), (err, response) => {
      if ((err) || (!response.data)) return;
      accountsSelectList.innerHTML = '';
      const accounts = response.data;
      accounts.forEach(element => {
        const newOption = `<option value="${element.id}">${element.name}</option>`
        accountsSelectList.insertAdjacentHTML('beforeend', newOption);
      });
    });

  }

  /** 
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
   onSubmit(data) {
    let callback = (error, response) => {
      if (response.success) {
        this.element.reset();
        App.getModal('newIncome').close();
        App.getModal('newExpense').close();
        App.update();
      }
    }
    Transaction.create(data, callback);
  }
}
