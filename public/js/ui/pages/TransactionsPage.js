/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
 class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
      if (element != null) {
          this.element = element;
          this.registerEvents();
      } else {
          throw new Error("cant create obj of TransactionsPage.class because null-element has appeared in constructor");
      }
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
      let options=App.getPage("transactions")["lastOptions"];
      App.getPage("transactions").render(options);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
      const deleteAcoountButton = document.getElementsByClassName("remove-account").item(0);
      deleteAcoountButton.addEventListener("click", function (event) {
          event.preventDefault();
          App.getPage("transactions").removeAccount();
      });
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets(),
   * либо обновляйте только виджет со счетами
   * для обновления приложения
   * */
  removeAccount() {
      const lastOpt = App.getPage("transactions")["lastOptions"];
      if (lastOpt != undefined && lastOpt != null) {
          var areYouSure = confirm("Do you really want to delete this account?");
          if (areYouSure) {
              Account.remove(lastOpt, function (err, response) {
                  if (response.success === true) {
                      App.getPage("transactions").clear();
                      App.updateWidgets();
                  }
              })
          }
      }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction(id) {
      const btns = Array.from(document.querySelectorAll(".transaction__remove"));
      const currentTransaction = btns.find((item) => item.getAttribute("data-id") === id).closest(".transaction");
      const title = currentTransaction.getElementsByClassName("transaction__title").item(0).textContent;
      const date = currentTransaction.getElementsByClassName("transaction__date").item(0).textContent;

      if (id != null && id != undefined) {
          const areYouSure = confirm("Do you really want to delete the transaction? [" + title + " : " + date + "]");
          if (areYouSure) {
              Transaction.remove(id, function (err, response) {
                  if (response.success === true) {
                      console.log("transaction id:" + id + " was removed successfully");
                      App.update();
                  }
              })
          }
      }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options) {
      if (options != null && options != undefined) {
          App.getPage("transactions")["lastOptions"] = options;

          Account.get(options.accound_id, function (err, response) {
              if (response.success === true) {
                  let newTitle = response.data.name;
                  Transaction.list(response.data.id, function (err, response) {
                      if (response.success === true) {
                          App.getPage("transactions").renderTransactions(response.data);
                          App.getPage("transactions").renderTitle(newTitle);
                      }
                  })
              }
          });
      }

  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
      let transactions = document.querySelectorAll(".transaction");
      transactions.forEach(tr => { tr.remove() });
      App.getPage("transactions").renderTitle("Название счёта");
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name) {
      document.getElementsByClassName("content-title").item(0).textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date) {
      const d = new Date(date);

      let month = "";
      if (d.getMonth() == 0) month = "января";
      if (d.getMonth() == 1) month = "февраля";
      if (d.getMonth() == 2) month = "марта";
      if (d.getMonth() == 3) month = "апреля";
      if (d.getMonth() == 4) month = "мая";
      if (d.getMonth() == 5) month = "июня";
      if (d.getMonth() == 6) month = "июля";
      if (d.getMonth() == 7) month = "августа";
      if (d.getMonth() == 8) month = "сентября";
      if (d.getMonth() == 9) month = "октября";
      if (d.getMonth() == 10) month = "ноября";
      if (d.getMonth() == 11) month = "декабря";


      const resultString = d.getDate() + " " +
          month + " " +
          d.getFullYear() + "г. в " +
          d.getHours() + ":" + d.getMinutes();
      return resultString;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item) {
      let transactionExpense = document.createElement("div");
      if (item.type === "expense") transactionExpense.className = "transaction transaction_expense row";
      else if (item.type === "income") transactionExpense.className = "transaction transaction_income row";
      else transactionExpense.className = "transaction row";

      let transactionDetails = document.createElement("div");
      transactionDetails.className = "col-md-7 transaction__details";

      let transactionIcon = document.createElement("div");
      transactionIcon.classList.add("transaction__icon");

      let faMoney = document.createElement("span");
      faMoney.className = "fa fa-money fa-2x";

      let transactionInfo = document.createElement("div");
      transactionInfo.classList.add("transaction__info");

      let transactionTitle = document.createElement("h4");
      transactionTitle.classList.add("transaction__title");
      transactionTitle.textContent = item.name;

      let transactionDate = document.createElement("div");
      transactionDate.classList.add("transaction__date");
      transactionDate.textContent = App.getPage("transactions").formatDate(item.created_at);

      let col_md3 = document.createElement("div");
      col_md3.classList.add("col-md-3");

      let transactionSumm = document.createElement("div");
      transactionSumm.classList.add("transaction__summ");

      let currency = document.createElement("span");
      currency.classList.add("currency");
      currency.textContent = item.sum + "₽";

      let transactionControls = document.createElement("div");
      transactionControls.className = "col-md-2 transaction__controls";

      let transactionRemove = document.createElement("div");
      transactionRemove.className = "btn btn-danger transaction__remove";
      transactionRemove.setAttribute("data-id", item.id);
      transactionRemove.addEventListener("click", function (event) {
          event.preventDefault();
          App.getPage("transactions").removeTransaction(transactionRemove.getAttribute("data-id"));
      })

      let faTrash = document.createElement("i");
      faTrash.className = "fa fa-trash";

      //------------------------------------------------------------------
      transactionInfo.appendChild(transactionTitle);
      transactionInfo.appendChild(transactionDate);
      transactionIcon.appendChild(faMoney);
      transactionDetails.appendChild(transactionIcon);
      transactionDetails.appendChild(transactionInfo);

      transactionSumm.appendChild(currency);
      col_md3.appendChild(transactionSumm);

      transactionRemove.appendChild(faTrash);
      transactionControls.appendChild(transactionRemove);

      transactionExpense.appendChild(transactionDetails);
      transactionExpense.appendChild(col_md3);
      transactionExpense.appendChild(transactionControls);

      return transactionExpense;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data) {
      App.getPage("transactions").clear();
      let content = document.querySelector("section.content");
      data.forEach(item => { content.appendChild(App.getPage("transactions").getTransactionHTML(item)) });
  }
}