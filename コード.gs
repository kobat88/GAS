function groupData() {

  //N日前のNを定義
  const prevNum = 5;

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('data');

  //データが存在する全範囲の（行）グループを解除
  let allRange = sheet.getDataRange();
  allRange.shiftRowGroupDepth(-1);

  //A列データを取得
  let values = sheet.getRange(1,1,sheet.getLastRow(),1).getValues();

  //二次元配列を一次元配列にする
  let values1D = values.flat();

  //実行時の当日を取得
  let today = new Date();

  //時分秒を切り捨て
  let todayTimeReset = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  //N日前の日付を取得
  let prevDay = new Date(todayTimeReset.setDate((todayTimeReset.getDate())-prevNum)); 

  //N日前以前のデータの最終行を検索
  var idx = 0;
  for(var i=values1D.length-1; i>=0; i--){
    if(values1D[i] <= prevDay){
      idx = i;
      break;
    }
  }
  
  //2行目から上記で検索した最終行までの範囲を取得
  let gpRange = sheet.getRange("2:"+(idx+1));

  //上記範囲を深さ1でグループ化
  gpRange.shiftRowGroupDepth(1);

  //上記グループ化範囲を折り畳み
  gpRange.collapseGroups();
  
}
