
class GameManager
{
	constructor(myWordsDic, wordsPerBatch)
	{
		this.wordsPerBatch = wordsPerBatch;
		this.unkownWords = this.createUnknownWordDic(myWordsDic);
		
		this.batches = Math.floor(this.unkownWords.length/wordsPerBatch);
		
		this.hide();
		
		
	}
	
	createUnknownWordDic(myWordsDic)
	{
		var dic = [];
		
		for (var i =0; i < myWordsDic.length; i++)
		{
			if (!myWordsDic[i]["known"]){ dic.push(new FlashCard(myWordsDic[i],i)); }
		}
		
		return dic;
	}
	
	
	hide()
	{
		for (var i = 0; i < this.unkownWords.length; i ++)
		{
			this.unkownWords[i].hide();
		}
	}
	show()
	{
		for (var i = 0; i < this.unkownWords.length; i ++)
		{
			this.unkownWords[i].show();
		}
	}
	
	showFlashCard(index)
	{
		this.unkownWords[index].show();
	}
	
	hideFlashCard(index)
	{
		this.unkownWords[index].hide();
	}
	
	startGame(batchNo,soundFirst = true , randomSelection) // starts from 0 
	{
		if ((batchNo + 1) * this.wordsPerBatch > this.unkownWords.length) {return;}
		
		var flashCardBatch = [];
		var includedIndexes = [];
		
		for (let  i = 0; i < this.wordsPerBatch ; i ++ )
		{
			if  (randomSelection)
			{
				var idx = Math.floor((Math.random() * this.unkownWords.length));
				while (includedIndexes.indexOf(idx) != -1) { idx = Math.floor((Math.random() * this.unkownWords.length));} 
				
				flashCardBatch.push( this.unkownWords[idx] );
				includedIndexes.push(idx);
				
			}
			else
			{
				flashCardBatch.push( this.unkownWords[ batchNo * this.wordsPerBatch + i ] );
			}
		}
				
		var wordsPerBatch =  this.wordsPerBatch;
		
		var game = new Game(flashCardBatch,soundFirst);
		
		document.getElementById("remembered").innerHTML = `0/${wordsPerBatch}`;
		
		return game;
	}

}

class Game
{
	constructor(flashCardList,soundFirst = true)
	{
		this.flashcards = flashCardList;
		this.remembered = Array(flashCardList.length).fill(false);
		this.soundFirst = soundFirst;
		this.rememberedCnt  = 0;

		this.tbl = generateTable(this.flashcards[0].keys.length,1,[], false);
		
		//style
		this.tbl.style.borderWidth  = "5px";
		this.tbl.style.borderColor  = "#00cc99";
		this.tbl.style.backgroundColor='#00cc99';
		
		for (let i = 0;  i < this.tbl.rows.length; i++) 
		{ 
			this.tbl.rows[i].cells[0].style.border  = "none"; 
			this.tbl.rows[i].cells[0].style.height  = "50px";
		}
		
		this.clearTable();
		
		this.start();
	}
	
	start()
	{
		
		document.getElementById("remembered").style.display = "";
		document.getElementById("refresh").style.display = "";
		
		var rowIdx = Math.floor(this.tbl.rows.length/2);
		addButton(this.tbl.rows[rowIdx-1].cells[0],`showNextFlashcard()`,"Start");
		this.tbl.rows[1].cells[0].innerHTML += "&nbsp;";
		addButton(this.tbl.rows[rowIdx +1].cells[0],`review()`,"Review");
	}
	
	showNextFlashcard()
	{
		
		var idx = Math.floor((Math.random() * this.flashcards.length));
		while (this.remembered[idx]) { idx = Math.floor((Math.random() * this.flashcards.length)); }
		
		
		var realIdx = this.flashcards[idx].index;
		//var realIdx = this.realIndex(idx);
		
		if  (this.soundFirst)
		{
			playSoundOnline(realIdx);
			addButton(this.tbl.rows[2].cells[0],`playSoundOnline(${realIdx})`,"Play Sound");
		}
		
		else  
		{
			this.tbl.rows[0].cells[0].innerHTML = "<b><label  style='font-size:40px'>" + this.flashcards[idx].data["word"]+ "</label></b>";
		}
		addButton(this.tbl.rows[1].cells[0],`showFlashCard(${idx})`,"Show Answer");
		
	}
	
	showFlashCard(index)
	{

		var flashcard = this.flashcards[index];
		
		if  (!this.soundFirst)
		{
			var realIdx = flashcard.index;
			playSoundOnline(realIdx);

		}
		
		this.tbl.rows[0].cells[0].innerHTML = "<b><label  style='font-size:40px'>" + flashcard.data["word"]+"</label></b>";

		var colNum = 1;
		for (let i = 0; i< flashcard.keys.length; i++)
		{
			const title = flashcard.keys[i]

			if (title == "example" || title == "known" || title == "word") {continue;}
			this.tbl.rows[colNum].cells[0].innerHTML = flashcard.data[flashcard.keys[i]];

			colNum++;
		}
		
		if(flashcard.data.example) {this.tbl.rows[0].cells[0].innerHTML += "<br> <b>Example:</b>&emsp; &emsp;" + flashcard.data.example;}
		
		// removeAllChildNodes(this.tbl.rows[0].cells[0]);
		this.tbl.rows[colNum].cells[0].innerHTML = "Did you remember? <br><br>";
		addButton(this.tbl.rows[colNum].cells[0],`markRemembered(${index})`,"Yes");
		
		this.tbl.rows[colNum].cells[0].innerHTML += "&nbsp;"
		
		addButton(this.tbl.rows[colNum].cells[0],`didNotRemember()`,"No");

		this.tbl.rows[colNum].cells[0].innerHTML += "<br><br>"

		addButton(this.tbl.rows[colNum].cells[0],`playSoundOnline(${flashcard.index})`,"Play Sound");
		
		

	}
	
	didNotRemember()
	{
		this.clearTable();
		this.showNextFlashcard();
	}
	
	markRemembered(index)
	{
		this.clearTable();
		this.remembered[index] = true;
		
		this.rememberedCnt ++;
		
		document.getElementById("remembered").innerHTML = `${this.rememberedCnt}/${this.flashcards.length}`;
		
		if (this.gameEnded()) 
		{
			this.tbl.rows[0].cells[0].innerHTML = "<h1 style='font-size:48px; text-align:center;'>Game Over! :)</h1>";
			return;
		}
		
		this.showNextFlashcard();

	}
	
	clearTable()
	{

		for (let i=0; i<this.tbl.rows.length;i++)
		{
			this.tbl.rows[i].cells[0].innerHTML = "";
		}
		
	}
	
	
	review()
	{
		
		//  find min index
		
		var minIndex = this.flashcards[0].index;
		var localMinIndex = 0;
		
		for (let i = 1; i < this.flashcards.length; i++)
		{
			if ( this.flashcards[i].index < minIndex)
			{
				minIndex = this.flashcards[i].index;
				localMinIndex = i;
			}
		}
		
		this.flashcards[localMinIndex].show();
		
		for (let i  = 0 ; i < this.flashcards.length; i ++)
		{
			if (i == localMinIndex) {continue;}
			this.flashcards[i].show(false);
		}
		addButton(document.getElementById("clearReview"),`clearReview()`,"Hide Review");
	}
	
	
	clearReview()
	{
		for (let i  = 0 ; i < this.flashcards.length; i ++)
		{
			this.flashcards[i].hide();
		}
		document.getElementById("clearReview").innerHTML = "";
	}
	
	show()
	{
		this.tbl.style.display = "";
	}
	
	hide()
	{
		this.tbl.style.display = "none";
	}
	
	restart()
	{
		this.rememberedCnt = 0;
		document.getElementById("remembered").innerHTML = `${this.rememberedCnt}/${this.flashcards.length}`;
		this.remembered = Array(this.flashcards.length).fill(false);
		this.clearTable();
		this.start();

		
	}
	
	gameEnded()
	{
		for (let i = 0; i < this.remembered.length ; i ++)
		{
			if (!this.remembered[i]) {return false;}
		}
		return true;
	}
}


function showFlashCard(idx)
{
	game.showFlashCard(idx);
}

function markRemembered(idx)
{
	game.markRemembered(idx);
}

function didNotRemember()
{
	game.didNotRemember();
}

function removeAllChildNodes(parent) 
{
    while (parent.firstChild) 
	{
        parent.removeChild(parent.firstChild);
    }
}

function showNextFlashcard()
{
	game.clearTable();
	game.showNextFlashcard();
}

function review()
{
	game.review();
	game.hide();
}

function clearReview()
{
	game.clearReview();
	game.show();
}









