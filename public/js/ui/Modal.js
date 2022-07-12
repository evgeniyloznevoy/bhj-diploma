/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
 class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью Modal.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
      if (element != null) {
          this.element = element;
          this.registerEvents();
      } else {
          throw new Error("cant create obj of Modal.class because null-element has appeared in constructor");
      }
  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
      const crossBtn = this.element.getElementsByClassName("close").item(0);
      crossBtn.addEventListener("click", function (event) {
          event.preventDefault();
          let name = event.target.closest(".modal").getAttribute("data-modal-id");
          if (name == "newAccount") name = "createAccount";
          This(name).onClose(event.target.closest(".modal"));
      })

      const closeBtn = this.element.getElementsByClassName("btn-default").item(0);
      closeBtn.addEventListener("click", function (event) {
          event.preventDefault();
          let name = event.target.closest(".modal").getAttribute("data-modal-id");
          This(name).onClose(event.target.closest(".modal"));
      })
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose(e) {
      let name = e.getAttribute("data-modal-id");
      if (name == "newAccount") name = "createAccount";
      This(name).close();
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
      this.element.style.display = "block";
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close() {
      this.element.style.display = "";
  }
}