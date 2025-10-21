function removeAccents(str) 
{
	if (str == null) return "";
	return String(str)
	  .normalize("NFD")
	  .replace(/[\u0300-\u036f]/g, "");
  }

function isAccent(str)
{
	return /[^\u0000-\u007F]/.test(str)
}

function highlight(text,cell)
{
	var innerHTML = cell.textContent;
	
	var allLowCase = innerHTML.toLowerCase();
	
	var cellText;
	
	var index = allLowCase.indexOf(text.toLowerCase());
	if (index >= 0) 
	{ 
		cellText = innerHTML.substring(0,index) + "<span class='highlight'>" + innerHTML.substring(index,index+text.length) + "</span>" + innerHTML.substring(index + text.length);
		cell.innerHTML = cellText;
	}
}

function unhighlight(cell)
{
	if (cell.querySelector("button")) return;
	cell.innerHTML = cell.textContent;
}

function unhighlightAll(row)
{
	for (j = 0; j < row.cells.length; j++)
	{
		unhighlight(row.cells[j]);
	}
}