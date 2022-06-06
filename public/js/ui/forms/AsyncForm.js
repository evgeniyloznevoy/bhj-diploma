/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
 class AsyncForm {
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
          throw new Error("cant create obj of AsyncForm.class because null-element has appeared in constructor");
      }
  }

  /**
   * Необходимо запретить отправку формы и в момент отправки
   * вызывает метод submit()
   * */

   registerEvents() {
    this.element.addEventListener('submit', e => {
      e.preventDefault();
      this.submit();
    });
  }

//   registerEvents() {
//       const submitBtn = this.element.closest(".modal-content").getElementsByClassName("btn-primary").item(0);
//       submitBtn.addEventListener("click", function (event) {
//           event.preventDefault();
//           let formName = submitBtn.closest(".modal").getAttribute("data-modal-id");
//           if (formName === "newAccount") formName = "createAccount";
//           if (formName === "newIncome") formName = "createIncome";
//           if (formName === "newExpense") formName = "createExpense";
//           const form = App.getForm(formName);
//           form.submit();
//       });
//   }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {
      const formData = new FormData(this.element);

      let object = {};
      formData.forEach(function (value, key) {
          object[key] = value;
      });
      return object;
  }

  onSubmit(options) {

  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */

   submit() {
    console.log(this.getData());
    this.onSubmit({data: this.getData()});
  }
}

//   submit() {
//       let formName = this.element.closest(".modal").getAttribute("data-modal-id");
//       if (formName === "newAccount") formName = "createAccount";
//       if (formName === "newIncome") formName = "createIncome";
//       if (formName === "newExpense") formName = "createExpense";
//       const form = App.getForm(formName);
//       const data = form.getData();
//       form.onSubmit(data);
//   }
// }