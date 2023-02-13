"use strict";

const today = new Date();  //現在時刻の取得
let year = today.getFullYear(); //現在年度の取得
let month = today.getMonth(); //現在月の取得

function calendarTop() { //カレンダーの一番上の列の処理
  const dates = []; //前月の末日を絡んだ1日の処理
  const d = new Date(year, month, 0).getDate();//現在月の0番目＝前月の末尾の取得
  const n = new Date(year, month, 1).getDay();//現在の月の1日の曜日の箇所を取得
  
  for (let i=0; i<n; i++) { //iはn箇所まで回し
    dates.unshift(d - i); //31日から回したi回分の末尾を配列の先頭に取得する
  }
  return dates; //処理した内容を空の配列dateに戻す
}

function calendarCenter() {//1日から末日までの呼び出し
  const dates = [];
  const lastDate = new Date(year, month+1, 0).getDate();
  //1日から末尾まで取得したいので翌月の0番目を取得することで当月の末尾を取得する
  for (let i=1; i<=lastDate; i++) {
    dates.push(i);
  }//iは1日から取得した末日lastDateまで回し、配列にpushで追加していく
  return dates;//処理した内容をからの配列に戻します
}

function calendarBottom() { //カレンダの一番下の列の処理
  const dates = []; 
  const lastDay = new Date(year, month+1, 0).getDay();
  //翌月の0番目の曜日＝31日の曜日の配列番号を取得し7回分から引くことで
  //翌月分の1日以降の表示日数を追加している
  //例えば末日が火曜日であれば配列は2なので7-2=5でiから5に満たない数
  //つまり1,2,3,4をdatesの末尾に追加してねという処理
  for (let i=1; i<7-lastDay; i++) {
    dates.push(i);
  }
  return dates;
}

function mainCalendar() { //カレンダを描画するための関数

  const tbody = document.querySelector("tbody");//再描画すると以前のtbody要素が残ったままになる現象を消すための処理
  while (tbody.firstChild) { //tbodyの最初の子要素がある限り
    tbody.removeChild(tbody.firstChild); //tbodyの中身を消してね、tbodyの最初の子要素を
  }

  const title = `${year}年${month+1}月`; //変更された年と月に表示も変更する
  //htmlのtitleクラスに文字列として変更後の年と月を代入する処理
  document.getElementById("title").textContent = title;

  const dates = [ //dates配列に各日付表示処理の配列を統合する
    ...calendarTop(), //一つの配列の中で三つの配列の処理を統合したいので
    ...calendarCenter(), //スプレッド構文で処理をまとめてあげる
    ...calendarBottom(),
  ];

  const weeks = []; //週毎にカレンダを描画していきたいのでweeksの空の配列を用意
  const weeksCount = dates.length / 7; //何周分あるかはdates日数から7日分割れば求められる

  for (let i=0; i<weeksCount; i++) { //求めたweeksCount分回していきたい
    weeks.push(dates.splice(0, 7));
  }//datesの0番目から表示7日分欲しいのでspliceで切り取ってweeksの配列にpushで
  //追加していく。それをweeksCount分回すので列毎の表示ができていく
  
  weeks.forEach(week => {
    const tr = document.createElement("tr");
    week.forEach(date => {
      const td = document.createElement("td");
      td.textContent = date;
      tr.appendChild(td);
    });
    document.querySelector("tbody").appendChild(tr);
  });
  //weeks関数をweekプロパティとしtrにcreateElementで作ったhtmlの"tr"要素を作成し列の表示を確保
  //さらにその中にdateプロパティで"td"要素を取得し、tdの中にdateを代入し一日の日付描画を行う
  //tr列にappendChildでtdを代入し、週のtr列表示とその中のtd日付表示を連結させる
  //htmlのtbody要素を呼び出し、appendChildでtr列を代入することでweeksCount分週の回数表示と
  //週の配列の中のtd要素＝日付が表示される
}

//左ボタン（戻る）のクリックイベント
document.getElementById("prev").addEventListener("click", function() {
  month--;
  if(month < 0) {
    year--;
    month = 11;
  }
  mainCalendar();
});

//右ボタン（進む）のクリックイベント
document.getElementById("next").addEventListener("click", function() {
  month++;
  if(month > 11) {
    year++;
    month = 0;
  }
  mainCalendar();
})

//現在時刻へ戻るリセットボタンのクリックイベント
document.getElementById("today").addEventListener("click", function() {
  year = today.getFullYear();
  month = today.getMonth();
  mainCalendar();
});

// セレクトボックス内のoption要素内の処理
function selectOption() {
  let n ;
	//年の変更
	document.sDate.sYear.length = 201;
  //セレクトボックスの要素数lengthを201個に設定。遡る100年と未来の100年と今いる年の
  //合計201の要素数。表示されるtextプロパティと内部の値であるvalueプロパティに代入
  //代入してる値は今の年から100年前から100年後の合計201年分
	for (n=0;n<201;n++) {
		document.sDate.sYear[n].text = n + year - 100;
		document.sDate.sYear[n].value = n + year - 100;
	}
	document.sDate.sYear[100].selected = true; //selectedプロパティを使って初期位置を100番目のメニューを選択する
	//月の変更＿年と同様の処理
	document.sDate.sMonth.length = 12;
	for (n=0;n<12;n++) {
		document.sDate.sMonth[n].text = n+1;
		document.sDate.sMonth[n].value = n+1;
	}
	document.sDate.sMonth[month-1].selected = true;
}
selectOption();

function changeCalendar() { //formのonchangeプロパティのvalueを変数year,monthに代入
	year = document.sDate.sYear.value;
	month = document.sDate.sMonth.value - 1;
	mainCalendar(); 
}//mainCalendarの再描画で表示変更する

mainCalendar();


