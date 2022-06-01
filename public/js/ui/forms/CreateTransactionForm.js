/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
 class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
      super(element);
      this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
      const currentUserJSON = User.current();
      if (currentUserJSON != null && currentUserJSON != undefined) {
          const currentUser = JSON.parse(currentUserJSON);
          Account.list(currentUser, function (err, response) {
              fillDropdownMenu(response.data);
          });
      }

      function fillDropdownMenu(data) {
          const dropdownIncome = document.getElementById("income-accounts-list");
          const dropdownExpense = document.getElementById("expense-accounts-list");

          for (let item of data) {
              let el = createDropdownItem(item);
              let arr = Array.from(dropdownIncome.children);

              let found = arr.find((item) => item.getAttribute("value") == el.getAttribute("value"));
              if (!found) {
                  dropdownIncome.appendChild(createDropdownItem(item));
                  dropdownExpense.appendChild(createDropdownItem(item));
              }
          }
      }

      function createDropdownItem(item) {
          let option = document.createElement("option");
          option.setAttribute("value", item.id);
          option.textContent = item.name;
          return option;
      }
  }


  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
      Transaction.create(data, function (err, response) {
          if (response.success === true) {
              App.update();

              document.getElementById("new-income-form").reset();
              App.getModal("newIncome").close();

              document.getElementById("new-expense-form").reset();
              App.getModal("newExpense").close();
          }
      })
  }
}