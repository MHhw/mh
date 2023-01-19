
console.log("ww");
document.querySelector('#characterName').addEventListener('keypress', function (e) { if (e.key === 'Enter') { send(); } });

function send() {
    console.log("send~");

    var inputId = document.getElementById("characterName").value;
//    var inputId = '명회';

    document.getElementById("characterName").value = '';

    const url = 'http://localhost:8080/api/getMapleBasicInfo';
    console.log(inputId, url);

    axios.get( url, {params:{id:inputId, buttonChk:'조회'}})
    .then(function(res) {
        console.log(res);
        console.log("dd", res.data);

        makeDiv(res.data)
    })

}

function makeDiv(data){
    console.log("makeDiv");
    var d = data;

    var slideLength = document.getElementsByClassName("info").length;
    if (slideLength !== 0){
        slideLength = Number($(".info:last")[0].id.split('_')[1]) + 1;
    }

    var divId = data.characterInfo.name+'_'+slideLength;

    html = '';
    html += "<div class='info' id='"+divId+"'>";
    html += "<div class='characterInfoBasic'>";
    html += "<div id='"+divId+"img'><img src="+data.characterInfo.img+" alt='캐릭터이미지'/></div>";
    html += "<div id='"+divId+"id'>"+data.characterInfo.name+"</div>";
    html += "<div id='"+divId+"lv'>"+data.characterInfo.level+"</div>";
    html += "</div>";

    html += "<div class='characterInfoBtn'>";
    html += "<button id='search' onClick=callItem('"+divId+"')>상세</button>";
    html += "<button id='search' onClick=createProfile('"+divId+"')>생성</button>";
    html += "<button id='update' onClick=updateDiv('"+divId+"')>갱신</button>";
    html += "<button id='delete' onClick=btnRemove('"+divId+"')>삭제</button>";
    html += "<nav><ul><li><a href='#characterEquipInfo'>www</a></li></ul></nav>";
    html += "</div>";
    html += "</div>";

    $(".characterInfo").append(html);
}

function callItem(data){
    console.log("callItem");
    console.log(data);

    var e = document.getElementById(data);
    console.log(e);

    location.href = '#characterEquipInfo';
}

function createProfile(data){
    console.log("createProfile");
    console.log(data);

}

function updateDiv(data){
    console.log("update");

    const url = 'http://localhost:8080/api/getMapleBasicInfo';
    var inputId = data.split('_')[0];
    console.log(inputId, url);

    //axios.get( url, {params:{id:inputId, buttonChk:'갱신'}})
    axios.get( url, {params:{id:inputId, buttonChk:'조회'}})
    .then(function(res) {
        console.log(res);
        console.log("dd", res.data);

        console.log("name : ", res.data.characterInfo.name);
        console.log("level : ",res.data.characterInfo.level);
        console.log("img : ",  res.data.characterInfo.img);

        document.getElementById(data+'id').innerText = res.data.characterInfo.name;
        document.getElementById(data+'lv').innerText = res.data.characterInfo.level;
        document.getElementById(data+'img').querySelector('img').src = res.data.characterInfo.img;
    })

    console.log("ok");
//    document.getElementById(data.characterInfo.name);
}


function btnRemove(element){
    console.log("remove", element);
    document.getElementById(element).remove();
}