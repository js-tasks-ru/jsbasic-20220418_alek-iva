/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  
  constructor(rows) {
    let tBodyText = ''
    this.elem = document.createElement("table"); 
    
    rows.forEach(row => {
      tBodyText += `<tr>
                      <td>${row.name}</td>
                      <td>${row.age}</td>
                      <td>${row.salary}</td>
                      <td>${row.city}</td>
                      <td><button>X</button></td>
                    </tr>`
    });
    
    this.elem.innerHTML = `
                      <thead>
                          <tr>
                              <th>Имя</th>
                              <th>Возраст</th>
                              <th>Зарплата</th>
                              <th>Город</th>
                              <th></th>
                          </tr>
                      </thead>
                      <tbody>
                      ${tBodyText}
                      </tbody>
                      `

    const tbody = this.elem.querySelector("tbody");
    
    tbody.querySelectorAll("tr").forEach( (row) => {
      row.querySelector("button").addEventListener("click", () => {
        row.remove();
      })
    });
}
}
