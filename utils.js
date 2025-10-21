function unhighlight(cell)
{
	cell.innerHTML = cell.textContent;
}

function unhighlightAll(row)
{
	for (j = 0; j < row.cells.length; j++)
	{
		// if (j == 4) {continue;}
		unhighlight(row.cells[j]);
	}
}