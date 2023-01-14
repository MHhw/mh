
console.log("ww");
document.querySelector('#characterName').addEventListener('keypress', function (e) { if (e.key === 'Enter') { send(); } });
/*
$(document).ready(function(){
    document.querySelector('#characterName').addEventListener('keypress', function (e) { if (e.key === 'Enter') { send(); } });
    let d_width = 0; // 브라우저 가로
    let d_height = 0; // 문서 전체의 높이

    function tmp() {
        // container의 가로사이즈(화면가로 * info 개수)
        let con_width = $(window).outerWidth() * $('.info').length;

//        $('.characterInfo').css({
//            width: con_width,
//            height: '100vh',
//            position: 'fixed',
//            top: 0,
//            left: 0
//        });

        // css에서 해도 상관없다.
//        $('.info').css({
//            width: con_width / $('.info').length,
//            height: '100vh',
//            float: 'left'
//        });

        // box들을 위로 끌어올렸기 때문에 body의 높이는 100vh나 마찬가지인 상태.
        // 그래서 억지로 전체 box들의 세로크기 만큼 body에 줘야한다.(스크롤 내리기위함)
        // 이때 높이는 가로영역의 비율과 동일하게 준다. (이후 리미트를 주게 됨으로써 비율의 값이 정해진다.)
//        $('body').css({
//            height: '100vh'
//        });

        let w_width = $(window).width(); // 화면의 가로값
        let w_height = $(window).height() // 화면의 세로값

        // 스크롤 될때의 리미트
        d_width = con_width - w_width; // 전체 가로값 - 현재 화면의 가로값
        d_height = $('body').height() - w_height // 전체 세로값 - 현재 화면의 세로값
    }

    tmp();

    let array = [];
    for(let i=0; i<$('.info').length; i++) {
        array[i] = $('.info').eq(i).offset().left
    }

    let chk = true;
    $('.info').on('mousewheel DOMMouseScroll', function(){

        if(chk) {
            // 휠 일정시간동안 막기
            chk = false;
            setTimeout(function(){
                chk = true;
            }, 500)

            // 휠 방향 감지(아래: -120, 위: 120)
            let w_delta = event.wheelDelta / 120;

            // 휠 아래로
            if(w_delta < 0 && $(this).next().length > 0) {
                $('.characterInfo').animate({
                    left: -array[$(this).index()+1]
                }, 500)
            }
            // 휠 위로
            else if(w_delta > 0 && $(this).prev().length > 0) {
                $('.characterInfo').animate({
                    left: -array[$(this).index()-1]
                }, 500)
            }
        }
    });

    //브라우저를 resize했을시를 대비해 박스의 크기는 다시 구해준다.
    $(window).resize(function(){
        for(let i=0; i<$('.info').length; i++) {
            array[i] = $('.info').eq(i).offset().left
        }

        tmp();
    })

});
*/

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

    var slideLength = document.getElementsByClassName("info").length;
    if (slideLength !== 0){
        slideLength = Number($(".info:last")[0].id.split('_')[1]) + 1;
    }

    var divId = data.characterInfo.name+'_'+slideLength;

    html = '';
//    html += "<div class='slide'>";
    html += "<div class='info' id='"+divId+"'>";
    html += "<div class='characterInfoBasic'>";
    html += "<div id='"+divId+"img'><img src="+data.characterInfo.img+" alt='캐릭터이미지'/></div>";
    html += "<div id='"+divId+"id'>id : "+data.characterInfo.name+"</div>";
    html += "<div id='"+divId+"lv'>lv : "+data.characterInfo.level+"</div>";
    html += "</div>";

    html += "<div class='characterInfoBtn'>";
    html += "<button id='search' onClick=callItem()>조회</button>";
    html += "<button id='search' onClick=createProfile()>생성</button>";
    html += "<button id='update' onClick=updateDiv('"+divId+"')>갱신</button>";
    html += "<button id='delete' onClick=btnRemove('"+divId+"')>삭제</button>";
    html += "</div>";
    html += "</div>";
//    html += "</div>";

    $(".characterInfo").append(html);
}

function callItem(){
    console.log("callItem");
}

function createProfile(){
    console.log("createProfile");
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
        document.getElementById(data+'img').innerText = res.data.characterInfo.img;
    })

    console.log("ok");
//    document.getElementById(data.characterInfo.name);
}


function btnRemove(element){
    console.log("remove", element);
    document.getElementById(element).remove();
}