
class FlashCard 
{
	constructor(wordCard , index)
	{
		this.word 		 = 	wordCard["word"];
		this.simplified  = 	wordCard["simplified"];
		this.pinyin 	 = 	wordCard["pinyin"];
		this.translation = 	wordCard["translation"];		
		this.example     = 	wordCard["example"];
		
		this.index		 =  index;
		
		this.createTable();
		
		this.hide();
	}
	
	createTable()
	{
		
		const width = ['20%','20%','','','10%'];
		
		
		this.tbl = generateTable(2,5,width);
		
		this.tbl.rows[0].cells[0].innerHTML = "<b>Word</b>";
		this.tbl.rows[0].cells[1].innerHTML = "<b>Simplified</b>";
		this.tbl.rows[0].cells[2].innerHTML = "<b>Pinyin</b>";
		this.tbl.rows[0].cells[3].innerHTML = "<b>Meaning</b>";
		this.tbl.rows[0].cells[4].innerHTML = "<b>Sound</b>";
		
		this.tbl.rows[1].cells[0].innerHTML = this.word;
		this.tbl.rows[1].cells[1].innerHTML = this.simplified;
		this.tbl.rows[1].cells[2].innerHTML = this.pinyin;
		this.tbl.rows[1].cells[3].innerHTML = this.translation;
		
		this.tbl.rows[1].cells[4].innerHTML = "";
		addPlayButton(this.tbl.rows[1].cells[4],this.index);
		
		if (this.example)
			{
				this.tbl.rows[2].cells[0].innerHTML = "&emsp; &emsp;&emsp;&emsp;<b>Example:&emsp;</b>" + this.example;
			}
			
			else
			{
				this.tbl.rows[2].style.display = "none";
			}
	}
	
	
	show(topRow = true)
	{
		//createTable();
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