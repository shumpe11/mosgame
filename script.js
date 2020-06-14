/**
* ボタンを押すとゲームに必要なもの以外を削除してゲーム開始をする関数
* @return　
*/
const startGame = () => {

let div = document.createElement('div');
div.id = 'gameArea';
document.body.appendChild(div);

document.getElementById('button');
button.remove();

fetchMosquito();

setInterval(fetchMosquito,5500);
setTimeout(finishGame,22000);
}

/**
* 蚊の出現に関する処理をする関数
*
*/
const fetchMosquito = () => {
	for(let i=0; i<5; i++){

		mosquito[i]= document.createElement('img');
		mosquito[i].src = 'img/bug_ka01.png';
		mosquito[i].width=55;
		mosquito[i].height=55;
		mosquito[i].style.position="absolute";

		//一部の蚊をアクティブに
		let numberForActivate = Math.floor(Math.random() * (100 - 0) + 0);
		if(numberForActivate >= 35){
			active[i]=1;
		}else{
			active[i]=0;
		}

		//蚊が出現する場所をtopが70~100の範囲で毎回ランダムな位置になるよう設定
		let numberForPositioning = Math.floor(Math.random() * ( 100 - 70 ) + 70);
		mosquito[i].style.top = numberForPositioning * (i + 1) + "px";

		//一番上の蚊のtopが低いと上にはみ出る場合があるので調整
		const numberForAdjust = 30;
		if(i == 0){
			mosquito[0].style.top=(numberForPositioning + numberForAdjust) * (i + 1) + "px";
		}
		//左端から出現させるためにleftを蚊が出現する0度にpxに
		mosquito[i].style.left = "0px"
	}

	//蚊をクリックしたら蚊が見えなくなりカウントが増えるように設定
	for(let i=0; i<mosquito.length; i++){
		mosquito[i].onclick = () =>{
			countMos += 1;
			document.getElementById("counter").innerHTML=countMos;
			mosquito[i].style.display="none";
		}
	}

	//蚊の画像を gameArea の子要素として追加
	for(let i=0; i<5; i++){
		if(active[i] == 1){
			left[i] = 0;
			document.getElementById('gameArea').appendChild(mosquito[i]);
		}
	}
}

/**
 * 画像が動く処理をする関数
 * @return
 */
const moveMosquito = () => {

	for(i=0; i<5; i++){
		if(active[i]==1){

			//蚊の移動速度をランダムに
			let randomizeSpeed = Math.random() * (5 - 0.1) + 0.1;

			left[i] = left[i] + randomizeSpeed;
			mosquito[i].style.left = left[i] + margin + "px";

			if(left[i] >= 950){
				mosquito[i].remove();
			}
		}
	}
	//10秒ごとに実行
	loop();
}

const loop = () => {
		setTimeout(moveMosquito, 10);
};

//ゲーム終了時に行う処理をまとめた関数
const finishGame = () => {
	document.getElementById('gameArea');
	gameArea.remove();
}

//蚊をクリックした回数を記録する変数
let countMos = 0;

// 通過する 蚊 のimg要素を生成
let mosquito = Array(5);
let active = Array(5);

//蚊の画像が背景画像の左端から出てくるように調整
const margin = (window.innerWidth - 1000) / 2;
let left = [margin,margin,margin,margin,margin];
