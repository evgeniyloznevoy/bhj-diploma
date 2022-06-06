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
    constructor(element) {
      super(element);
      this.renderAccountsList();
    }
  
    /**
     * Получает список счетов с помощью Account.list
     * Обновляет в форме всплывающего окна выпадающий список
     * */
    renderAccountsList() {
      const user = User.current();
      if(!user)
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
        
        let options = '';
        for (const option of response.data)
          options += `<option value="${option.id}">${option.name}</option>`;
        this.element.querySelector('.accounts-select').innerHTML = options;
     
      });
      
    }
  
 //   function fillDropdownMenu(data) {
    //       const dropdownIncome = document.getElementById("income-accounts-list");
    //       const dropdownExpense = document.getElementById("expense-accounts-list");

    //       for (let item of data) {
    //           let el = createDropdownItem(item);
    //           let arr = Array.from(dropdownIncome.children);

    //           let found = arr.find((item) => item.getAttribute("value") == el.getAttribute("value"));
    //           if (!found) {
    //               dropdownIncome.appendChild(createDropdownItem(item));
    //               dropdownExpense.appendChild(createDropdownItem(item));
    //           }
    //       }
    //   }

    //   function createDropdownItem(item) {
    //       let option = document.createElement("option");
    //       option.setAttribute("value", item.id);
    //       option.textContent = item.name;
    //       return option;
    //   }


    /**
     * Создаёт новую транзакцию (доход или расход)
     * с помощью Transaction.create. По успешному результату
     * вызывает App.update(), сбрасывает форму и закрывает окно,
     * в котором находится форма
     * */
    onSubmit(options) {
      
      Transaction.create(options.data, (err, response) => {
        
        if (err) {
          alert(JSON.stringify(err));
          return;
        }
     
        if (!response.success) {
          alert(JSON.stringify(response));
          return;
        } 
        
        App.getModal(this.element.closest('.modal').dataset.modalId).close();
        App.update(); 
        
        for (const input of this.element.querySelectorAll('input'))
          input.value = '';
        
      });
  
    }
  }