function generateTable(rows,cols,colWidth = [],anotherRow = true) 
{
  
	
  // creates a <table> element and a <tbody> element
  const tbl = document.createElement("table");
  const tblBody = document.createElement("tbody");

  // creating all cells
  for (let i = 0; i < rows; i++) {
    // creates a table row
    const row = document.createElement("tr");

    for (let j = 0; j < cols; j++) {
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
      const cell = document.createElement("td");
      const cellText = document.createTextNode(`cell in row ${i}, column ${j}`);
	  cell.align ="center";
      cell.appendChild(cellText);
	  if (colWidth.length == cols)
	  {
		cell.style.width = colWidth[j];
	  }
      row.appendChild(cell);
    }

    // add the row to the end of the table body

	tblBody.appendChild(row);
	if (i !=0 && anotherRow)
	{
		tblBody.appendChild(emptyRow(cols));
	}
  }

  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  document.body.appendChild(tbl);
  // sets the border attribute of tbl to '2'
  tbl.setAttribute("border", "2");
  
  tbl.width = "100%";
  
  return tbl;
}

function emptyRow(cols)
{
	const row = document.createElement("tr");
	const cell = document.createElement("td");
    const cellText = document.createTextNode("Empty");
	cell.align ="left";
	cell.appendChild(cellText);
	cell.setAttribute('colspan', cols.toString());
	row.appendChild(cell);
	
	return row;
	
}





