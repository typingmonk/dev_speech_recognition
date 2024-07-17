function convertToPunctuation(string){
    var punctuations = {
        "斷行號": "\n",
        "逗號": "，",
        "句號": "。",
        "頓號": "、",
        "冒號": "：",
        "分號": "；",
        "問號": "？",
        "感嘆號": "！",
        "破折號": "——",
        "省略號": "……",
        "開括號": "（",
        "關括號": "）",
        "開引號": "「",
        "關引號": "」",
        "開雙引號": "『",
        "關雙引號": "』",
        "開書名號": "《",
        "關書名號": "》"
//        開此增加自動匹配詞語轉換
    };
    for (var i in punctuations){
        string = string.split(i).join(punctuations[i]);
    }
    return string;
}
 
var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
 
window.addEventListener("load", function(){
    if (SpeechRecognition){
        speechRecognition = new SpeechRecognition();
        speechRecognition.continuous = true;
        speechRecognition.interimResults = true;
        speechRecognition.addEventListener("start", function(){
            console.log(new Date());
            document.getElementById("toggle").value = "Stop Speech Recognition";
        });
        speechRecognition.addEventListener("result", function(event){
            var bufferContainer = document.getElementById("bufferContainer");
            var resultContainer = document.getElementById("resultContainer");
            var resultList = event.results;
            for (var i = 0; i < resultList.length; i++){
                var result = resultList.item(i);
                try{
                   var alternative = result.item(0);
                    var text = convertToPunctuation(alternative.transcript);
                    bufferContainer.value = resultContainer.value + text;
                } catch (ex){
                    console.log(ex);
                }
                if (result.isFinal){
                    this.stop();
                    break;
                }
            }
        });
        speechRecognition.addEventListener("end", function(){
            var bufferContainer = document.getElementById("bufferContainer");
            var resultContainer = document.getElementById("resultContainer");
            resultContainer.value = bufferContainer.value;
            var toggle = document.getElementById("toggle");
            var autoResume = document.getElementById("autoResume");
            if (toggle.value == "Stop Speech Recognition" && autoResume.checked){
                this.start();
            }
        });
    }
});
 
function toggleSpeechRecognition(){
    if (SpeechRecognition){
        var toggle = document.getElementById("toggle");
        if (toggle.value == "Stop Speech Recognition"){
            toggle.value = "Start Speech Recognition";
            speechRecognition.stop();
        } else {
            speechRecognition.lang = document.getElementById("language").value;
            speechRecognition.start();
        }
    } else {
        window.alert("This browser does not support Web Speech Recognition API.");
    }
}
 
function selectAllText(element){
    element.select();
}
 
function clearAllText(element){
    element.value = "";
}
 
function clearContainer(message){
    if (window.confirm(message)){
        clearAllText(document.getElementById('bufferContainer'));
        clearAllText(document.getElementById('resultContainer'));
    }
}
