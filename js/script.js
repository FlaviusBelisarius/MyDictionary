var urls = ['https://raw.githubusercontent.com/FlaviusBelisarius/MyDictionary/master/data/1.json',
'https://raw.githubusercontent.com/FlaviusBelisarius/MyDictionary/master/data/2.json',
'https://raw.githubusercontent.com/FlaviusBelisarius/MyDictionary/master/data/3.json',
'https://raw.githubusercontent.com/FlaviusBelisarius/MyDictionary/master/data/4.json',
'https://raw.githubusercontent.com/FlaviusBelisarius/MyDictionary/master/data/5.json',
'https://raw.githubusercontent.com/FlaviusBelisarius/MyDictionary/master/data/6.json',
'https://raw.githubusercontent.com/FlaviusBelisarius/MyDictionary/master/data/7.json',
'https://raw.githubusercontent.com/FlaviusBelisarius/MyDictionary/master/data/8.json'];

var map = {};

window.onload = function initializeHashing(){
    console.log('Data Received');
    Promise.all(urls.map(url =>
        fetch(url).then(response => {return response.json()})
    )).then(jsons => {
        for(var i of jsons){
            for(var j of i){
                map[j.word.toLowerCase()] = j;
            }
        }
    });
}

function search(){
    var input = document.getElementById('query');
    var word = input.value.toLowerCase();
    var output = document.getElementById('output');
    try{
        if(map[word] == null){
            throw 'Word Not Found';
        }else{
            output.innerHTML = "中文释义: "+map[word].translation+'<br>'+
                               "英文释义: "+map[word].definition+'<br>'+
                               "音标: "+map[word].phonetic
                               ;
        }
    }catch(err){
        console.log(err);
        output.innerHTML = '';
    };
}

//单词,英语英标,英文释义,中文释义,词语位置,科林斯星级,是否牛津三千核心词汇,字符串标签,英国国家语料库词频顺序,当代语料库词频顺序,时态复数等变换,json扩展信息,读音音频url
//https://www.convertcsv.com/csv-to-json.htm
