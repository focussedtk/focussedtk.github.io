var fileZ;
var numFiles = 0;
var thumbnailUrls = [];
var embedUrls = []; 
var articlesLength = 0;
var previousPage;
	
function gotoPage(page)
{
	readTextFile(page+'.csv')
	//var bgcolors = {'celebs':"#84FFF9 ","hollywood":"#FFEC00","sports":"#000","music":"#0027FF","tikTok":"#000","rappers":"#000000","youtubers":"#FFFF35"};
	//var pgcolors = {'celebs':"#FFFF35","hollywood":"#A80000","sports":"#ff9933","music":"#7D3C98","tikTok":"#84FFF9","rappers":"#FF1744","youtubers":"#FFD0DF"};
	if(page == "rappers")
		document.body.style.backgroundColor = "#FF1744";
	else
		document.body.style.backgroundColor = "#84FFF9";
	if(previousPage!=null)
		document.getElementById("_"+previousPage).style.textDecoration = "none";
	document.getElementById("_"+page).style.textDecoration = "underline";
	previousPage = page;
}
function readTextFile(file)
{
	numFiles=0;
	var data;
	fetch(file)
		.then(response => response.text())
		.then(data => updateFile(data));
	return data;
}
function updateFile(data)
{
	fileZ=data;
	numFiles++;
	if(numFiles == 1){
		thumbnailUrls = [];
		embedUrls = []; 
		articlesLength = 0;
		renderPage()
	}
}
function renderPage()
{
	document.getElementById("content").innerHTML ="";
	var articles = fileZ.split('\n');
	articlesLength = articles.length;
	for(var articleNum = 1 ; articleNum < articles.length;articleNum++)
	{
		var article = articles[articleNum].split(",");
		document.getElementById("content").innerHTML+="";
		var title = article[1];
		var url = article[2];
		var imgUrl = url.replace("https://www.youtube.com/watch?v=","https://i3.ytimg.com/vi/");
		var embedUrl = url.replace("watch?v=","embed/");
		thumbnailUrls[articleNum] = imgUrl;
		imgUrl+="/maxresdefault.jpg";
		var images = article[3];
		var text = article[4];
		embedUrls[articleNum] = '<iframe width="940" height="528" src="'+embedUrl+'?&autoplay=1"  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
		var a = `<br><table>
				<tr>
					<td>
						<div class="shadowElement">
							<img id="i`+articleNum+`" src="`+imgUrl+`" width="940" height="528" onclick="javascript:play(this.parentElement,`+articleNum+`)"onload = "checkImage(event,`+articleNum+`)">
							<img id="play" src="playButton.png"/>
						</div>
					</td>
					<td width="2"></td>
					<td>
						<div class="textColumn">
							<!--<h1 onclick="javascript:play(this.parentElement.previousElementSibling.previousElementSibling  ,`+articleNum+`)">`+title+`</h1>-->
							<h1>`+title+`</h1>
							`+text+`
						</div>
					</td>
				</tr>
			</table>
			<br>`;
		if(article[3]!="0-20")
		{
			a+=`<br>
			<div class="scrollingWindow">`;
			for(var i = 1; i <= images.split("-")[1] ;i++)
				a += `<img width="200" height="200" src="i/`+images.split("-")[0]+`-`+i+`.jpg"/>`;
			a+=`</div>
				<br><br>`;
		}
		if(article[0]=='ad')
			document.getElementById("content").innerHTML += "<div style='background-color:#00FFA9; border-radius:10px;'>"+a+"</div>";
		else
			document.getElementById("content").innerHTML += a;
	}
}
function checkImage(event,aN)
{
	if(document.getElementById("i"+aN)!=null && document.getElementById("i"+aN).naturalWidth<300)
	{
		document.getElementById("i"+aN).src = thumbnailUrls[aN]+'/sddefault.jpg';
		document.getElementById("i"+aN).style = 'height: 528px;  object-fit: cover; ';
	}
}
function play(element,id)
{
	element.innerHTML=embedUrls[id];
}