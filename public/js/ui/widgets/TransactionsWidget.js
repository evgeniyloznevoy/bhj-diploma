/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

 class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
      if (element != null) {
          this.element = element;
          this.registerEvents();
      } else {
          throw new Error("cant create obj of TransactionsWidget.class because null-element has appeared in constructor");
      }
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
      const incomBtn = document.getElementsByClassName("create-income-button").item(0);
      incomBtn.addEventListener("click", function (event) {
          event.preventDefault();
          App.getModal("newIncome").open();
      })

      const expenseBtn = document.getElementsByClassName("create-expense-button").item(0);
      expenseBtn.addEventListener("click", function (event) {
          event.preventDefault();
          App.getModal("newExpense").open();
      })
  }
}