// 轉換幣別用的function
function convert() {
    // 定義輸入變數與xml檔毒入變數
    var amount = parseFloat(document.getElementById("amount").value);
    var from_currency = document.getElementById("from").value;
    var to_currency = document.getElementById("to").value;
    
    // 調整背景顏色用 來自chatGPT
    document.body.className = to_currency.toLowerCase();

    // 判斷是否為數字
    if (isNaN(amount)) {
        alert("請輸入有效數字！");
        return;
    }


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var rates = xhttp.responseXML.getElementsByTagName("rate")[0];
            
            var from_rate = parseFloat(rates.getElementsByTagName(from_currency)[0].textContent);
            var to_rate = parseFloat(rates.getElementsByTagName(to_currency)[0].textContent);
            
            // 計算匯率的方法
            var conversion_rate = from_rate / to_rate;
            var result = amount * conversion_rate;

            // 計算且輸出的顯示結果
            document.getElementById("result").innerHTML = amount + " " + from_currency + " = " + result.toFixed(2) + " " + to_currency;
        }
    };
    
    // 讀取xml檔
    xhttp.open("GET", "rate.xml", true);
    xhttp.send();
}

// 重製結果用的function
function reset() {
    document.getElementById("amount").value = "";
    document.getElementById("from").selectedIndex = 0;
    document.getElementById("to").selectedIndex = 0;
    document.getElementById("result").innerHTML = "";
    document.body.className = "default";
}