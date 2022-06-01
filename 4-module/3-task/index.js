function highlight(table) {
  for ( let i = 1; i < table.rows.length; i++ ) {
    let row = table.rows[i];
    for ( let y = 0; y < row.cells.length; y++) {
      let cell = row.cells[y];
      let isAvailable = cell.getAttribute("data-available");
      if ( !isAvailable ) {
        row.hidden = true;
        if ( y === 1){
          if ( +cell.innerHTML < 18){
            row.style.cssText += (row.style.cssText.length > 0) ? ";text-decoration: line-through" : "text-decoration: line-through";
            
          }
        } else if ( y === 2 ){
          if ( cell.innerHTML === "f"){
            row.classList.add ( "female" );
          }else if ( cell.innerHTML === "m" ){
            row.classList.add ( "male" );
          }
        }
      } else if ( isAvailable === "true" ) {
        row.classList.add ( "available" );
      } else {
        row.classList.add ( "unavailable" );
      }
    }
  }
}
