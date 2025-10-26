// TODO: make the FlashCard dynamic
class FlashCard 
{
	constructor(wordCard , index)
	{

		this.data = wordCard;
		this.keys = Object.keys(this.data);
		
		this.index =  index;
		
		this.createTable();
		
		this.hide();
	}
	
	createTable()
	{
		const width = Array(this.keys.length).fill('');

		width[0] = '20%';
		width[1] = '20%';
		width[this.keys.length - 1] = '10%';
		
		
		this.tbl = generateTable(2,this.keys.length -1,width);
		
		var colNum = 0;
		for (let i = 0; i< this.keys.length; i++)
		{
			const title = this.keys[i]
			.replace(/_/g, " ")
			.replace(/\b\w/g, (c) => c.toUpperCase());

			if (title == "Example" || title == "Known") {continue;}
		  	this.tbl.rows[0].cells[colNum].innerHTML = `<b>${title}</b>`;

			this.tbl.rows[1].cells[colNum].innerHTML = this.data[this.keys[i]];

			colNum++;
		}
		this.tbl.rows[0].cells[colNum].innerHTML = "<b>Sound</b>";

		
		this.tbl.rows[1].cells[colNum].innerHTML = "";
		addPlayButton(this.tbl.rows[1].cells[colNum],this.index);
		
		if (this.data.example)
			{
				this.tbl.rows[2].cells[0].innerHTML = "&emsp; &emsp;&emsp;&emsp;<b>Example:&emsp;</b>" + this.data.example;
			}
			
			else
			{
				this.tbl.rows[2].style.display = "none";
			}
	}
	
	
	show(topRow = true)
	{
		this.tbl.style.display = "";
		
		if (topRow) { this.tbl.rows[0].style.display = "";}
		else 		{ this.tbl.rows[0].style.display = "none";}
	}
	
	hide()
	{
		this.tbl.style.display = "none";
	}
}	
	function playSound(index)
	{
		var audioFileLoc = "./audio/" + index +".mp3";
		var audio = new Audio(audioFileLoc);
		audio.play();
	}
	
	function addPlayButton(cell,index, big = false)
	{
		let but = document.createElement('button');
		but.innerText = '►';
		
		var funcString =`playSound(${index})`;
		
		but.setAttribute('onclick', funcString);
		
		if (big)
		{
			but.style  =  " background-color: #9999ff;   \
						border: 2px solid  black;\
						color: white;\
						padding: 15px 32px;\
						text-align: center;\
						text-decoration: none;\
						display: inline-block;\
						font-size: 16px;";
			but.innerText = "Play Sound";
		}
		
		cell.appendChild(but);
	}
	
	function addButton(cell,funcStr,txt = " ")
	{
		let but = document.createElement('button');
		but.innerText = txt;
		
		var funcString = funcStr;
		
		but.setAttribute('onclick', funcString);
		
		//but.style =  "padding: 0px";
		
		but.style  =  " background-color: #00a3cc; /* Facbook  Blue */  \
						border: 2px solid  black;\
						color: white;\
						padding: 15px 32px;\
						text-align: center;\
						text-decoration: none;\
						display: inline-block;\
						font-size: 16px;";
		
		cell.appendChild(but);
	}