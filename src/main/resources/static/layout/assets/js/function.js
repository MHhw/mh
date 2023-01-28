
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

    console.log(d);

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
    //html += "<nav><ul><li><a href='#characterEquipInfo'>www</a></li></ul></nav>";
    html += "</div>";
    html += "</div>";

    $(".characterInfo").append(html);
}

function testF(values){
     console.log("callItem");

    var inputId = "";
    if (values=='1'){
        inputId = "명회";
    }
    if (values=='2'){
        inputId = "너무굉장해";
    }

    console.log(inputId);

    const url = 'http://localhost:8080/api/getMapleBasicInfo';
    console.log(inputId, url);

    axios.get( url, {params:{id:inputId, buttonChk:'조회'}})
    .then(function(res) {
        console.log(res.data);
        console.log(res.data.equipInfo);

        let characterInfo = res.data.characterInfo;
        let characterBasicInfo = res.data.characterBasicInfo;
        let equipList = res.data.equipInfo;

        let listArr = [ 1,    3,    5,
                        6, 7, 8,   10,
                       11,12,13,14,15,
                       16,17,18,19,20,
                       21,22,23,24,25,
                             28,   30];

        let cnt = 0;
        let equipA = '';
        let equipB = '';
        let equipC = '';
        let equipD = '';
        let equipE = '';
        let statSplit = characterBasicInfo.stat.split('~');
        let abilitySplit = characterBasicInfo.ability.split('\n');

        // 반복문으로 캐릭터 장비 채워넣기
        for(let x=0; x<listArr.length; x++){
            let potentialA = 'layout/images/layout.png'; // 불
            let potentialB = 'layout/images/layout.png'; // 번개
            let starForce = '';

            if ( equipList[cnt].equipName.slice(-4) == '성 강화') {
                starForce = "+" + equipList[cnt].equipName.slice(-6, -4);
            }

            if (equipList[cnt].equipPotential == "(레전드리 아이템)"){
                potentialA = 'layout/images/gif/gif3.gif';
            }
            else if (equipList[cnt].equipPotential == "(유니크 아이템)"){
                potentialA = 'layout/images/gif/gif5.gif'
            }
            else if (equipList[cnt].equipPotential == "(에픽 아이템)"){
                potentialA = 'layout/images/gif/gif11.gif'
            }

            if (equipList[cnt].equipAdditionalPotential == "(레전드리 아이템)"){
                potentialB = 'layout/images/gif/gif2.gif'
            }
            else if (equipList[cnt].equipAdditionalPotential == "(유니크 아이템)"){
                potentialB = 'layout/images/gif/gif10.gif'
            }
            else if (equipList[cnt].equipAdditionalPotential == "(에픽 아이템)"){
                potentialB = 'layout/images/gif/p1.gif'
            }


            if(listArr[x] == equipList[cnt].equipNum){
                if ( (equipList[cnt].equipNum == 1)  || (equipList[cnt].equipNum == 6)  || (equipList[cnt].equipNum == 11) || (equipList[cnt].equipNum == 16) || (equipList[cnt].equipNum == 21) ){
                     equipA +=  "<div class='equip'>"
                     equipA +=      "<img class='front1' id='"+equipList[cnt].equipCategory+"' src='"+potentialA+"' alt='이미지'/>"
                     equipA +=      "<img class='back'   id='"+equipList[cnt].equipCategory+"' src='"+equipList[cnt].equipImg+"' alt='이미지'/>"
                     equipA +=      "<img class='front2' id='"+equipList[cnt].equipCategory+"' src='"+potentialB+"' alt='이미지'/>"
                     equipA +=      "<div class='starForce'>"+starForce+"</div>"
                     equipA +=  "</div>"
                }
                else if ( (equipList[cnt].equipNum == 7)  || (equipList[cnt].equipNum == 12) || (equipList[cnt].equipNum == 17) || (equipList[cnt].equipNum == 22) ){
                     equipB +=  "<div class='equip'>"
                     equipB +=      "<img class='front1' id='"+equipList[cnt].equipCategory+"' src='"+potentialA+"' alt='이미지'/>"
                     equipB +=      "<img class='back'   id='"+equipList[cnt].equipCategory+"' src='"+equipList[cnt].equipImg+"' alt='이미지'/>"
                     equipB +=      "<img class='front2' id='"+equipList[cnt].equipCategory+"' src='"+potentialB+"' alt='이미지'/>"
                     equipB +=      "<div class='starForce'>"+starForce+"</div>"
                     equipB +=  "</div>"
                }
                else if ( (equipList[cnt].equipNum == 3)  || (equipList[cnt].equipNum == 8)  || (equipList[cnt].equipNum == 13) || (equipList[cnt].equipNum == 18) || (equipList[cnt].equipNum == 23) || (equipList[cnt].equipNum == 28) ){
                     equipC +=  "<div class='equip'>"
                     equipC +=      "<img class='front1' id='"+equipList[cnt].equipCategory+"' src="+potentialA+" alt='이미지'/>"
                     equipC +=      "<img class='back'   id='"+equipList[cnt].equipCategory+"' src='"+equipList[cnt].equipImg+"' alt='이미지'/>"
                     equipC +=      "<img class='front2' id='"+equipList[cnt].equipCategory+"' src="+potentialB+" alt='이미지'/>"
                     equipC +=      "<div class='starForce'>"+starForce+"</div>"
                     equipC +=  "</div>"
                }
                else if ( (equipList[cnt].equipNum == 14) || (equipList[cnt].equipNum == 19) || (equipList[cnt].equipNum == 24) ){
                     equipD +=  "<div class='equip'>"
                     equipD +=      "<img class='front1' id='"+equipList[cnt].equipCategory+"' src="+potentialA+" alt='이미지'/>"
                     equipD +=      "<img class='back'   id='"+equipList[cnt].equipCategory+"' src='"+equipList[cnt].equipImg+"' alt='이미지'/>"
                     equipD +=      "<img class='front2' id='"+equipList[cnt].equipCategory+"' src="+potentialB+" alt='이미지'/>"
                     equipD +=      "<div class='starForce'>"+starForce+"</div>"
                     equipD +=  "</div>"
                }
                else if ( (equipList[cnt].equipNum == 5)  || (equipList[cnt].equipNum == 10) || (equipList[cnt].equipNum == 15) || (equipList[cnt].equipNum == 20) || (equipList[cnt].equipNum == 25) || (equipList[cnt].equipNum == 30) ){
                     equipE +=  "<div class='equip'>"
                     equipE +=      "<img class='front1' id='"+equipList[cnt].equipCategory+"' src="+potentialA+" alt='이미지'/>"
                     equipE +=      "<img class='back'   id='"+equipList[cnt].equipCategory+"' src='"+equipList[cnt].equipImg+"' alt='이미지'/>"
                     equipE +=      "<img class='front2' id='"+equipList[cnt].equipCategory+"' src="+potentialB+" alt='이미지'/>"
                     equipE +=      "<div class='starForce'>"+starForce+"</div>"
                     equipE +=  "</div>"
                }

                if (cnt == (equipList.length-1)){
                    console.log("equipList fin");
                    break;
                }

                cnt = cnt+1;
            }
            else{

                if ( (equipList[cnt].equipNum == 1)  || (equipList[cnt].equipNum == 6)  || (equipList[cnt].equipNum == 11) || (equipList[cnt].equipNum == 16) || (equipList[cnt].equipNum == 21) ){
                     equipClass = 'equipA'
                     equipA += "<div class='equip'>"
                     equipA += "<img class='front1' id='"+equipList[cnt].equipCategory+"' src='layout/images/gif/gif5.gif' alt='이미지'/>"
                     equipA += "<img class='back'   id='"+equipList[cnt].equipCategory+"' src='layout/images/bg.png' alt='이미지'/>"
                     equipA += "<img class='front2' id='"+equipList[cnt].equipCategory+"' src='layout/images/gif/gif10.gif' alt='이미지'/>"
                     equipA += "<div class='label'>'"+"'</div>"
                     equipA += "</div>"
                }
                else if ( (equipList[cnt].equipNum == 7)  || (equipList[cnt].equipNum == 12) || (equipList[cnt].equipNum == 17) || (equipList[cnt].equipNum == 22) ){
                     equipClass = 'equipB'
                     equipB += "<div class='equip'>"
                     equipB += "<img class='front1' id='"+equipList[cnt].equipCategory+"' src='layout/images/gif/gif5.gif' alt='이미지'/>"
                     equipB += "<img class='back'   id='"+equipList[cnt].equipCategory+"' src='layout/images/bg.png' alt='이미지'/>"
                     equipB += "<img class='front2' id='"+equipList[cnt].equipCategory+"' src='layout/images/gif/gif10.gif' alt='이미지'/>"
                     equipB += "<div class='label'>'"+"'</div>"
                     equipB += "</div>"
                }
                else if ( (equipList[cnt].equipNum == 3)  || (equipList[cnt].equipNum == 8)  || (equipList[cnt].equipNum == 13) || (equipList[cnt].equipNum == 18) || (equipList[cnt].equipNum == 23) || (equipList[cnt].equipNum == 28) ){
                     equipClass = 'equipC'
                     equipC += "<div class='equip'>"
                     equipC += "<img class='front1' id='"+equipList[cnt].equipCategory+"' src='layout/images/gif/gif5.gif' alt='이미지'/>"
                     equipC += "<img class='back'   id='"+equipList[cnt].equipCategory+"' src='layout/images/bg.png' alt='이미지'/>"
                     equipC += "<img class='front2' id='"+equipList[cnt].equipCategory+"' src='layout/images/gif/gif10.gif' alt='이미지'/>"
                     equipC += "<div class='label'>'"+"'</div>"
                     equipC += "</div>"
                }
                else if ( (equipList[cnt].equipNum == 14) || (equipList[cnt].equipNum == 19) || (equipList[cnt].equipNum == 24) ){
                     equipClass = 'equipD'
                     equipD += "<div class='equip'>"
                     equipD += "<img class='front1' id='"+equipList[cnt].equipCategory+"' src='layout/images/gif/gif5.gif' alt='이미지'/>"
                     equipD += "<img class='back'   id='"+equipList[cnt].equipCategory+"' src='layout/images/bg.png' alt='이미지'/>"
                     equipD += "<img class='front2' id='"+equipList[cnt].equipCategory+"' src='layout/images/gif/gif10.gif' alt='이미지'/>"
                     equipD += "<div class='label'>'"+"'</div>"
                     equipD += "</div>"
                }
                else if ( (equipList[cnt].equipNum == 5)  || (equipList[cnt].equipNum == 10) || (equipList[cnt].equipNum == 15) || (equipList[cnt].equipNum == 20) || (equipList[cnt].equipNum == 25) || (equipList[cnt].equipNum == 30) ){
                     equipClass = 'equipE'
                     equipE += "<div class='equip'>"
                     equipE += "<img class='front1' id='"+equipList[cnt].equipCategory+"' src='layout/images/gif/gif5.gif' alt='이미지'/>"
                     equipE += "<img class='back'   id='"+equipList[cnt].equipCategory+"' src='layout/images/bg.png' alt='이미지'/>"
                     equipE += "<img class='front2' id='"+equipList[cnt].equipCategory+"' src='layout/images/gif/gif10.gif' alt='이미지'/>"
                     equipE += "<div class='label'>'"+"'</div>"
                     equipE += "</div>"
                }
            }
        }


        // 반복문으로 캐릭터 스탯 채워넣기

        $("#characterEquipInfo").empty();

        html = '';

        html += "<div class='characterDetailSub'>"
        html +=     "<h2>캐릭터 프로필</h2>"
        html += "</div>"
        html += "<div class='profile'>"
        html +=     "<div class='characterImg'>"
        html +=         "<img src='"+res.data.characterInfo.img+"'alt='캐릭터'/>"
        html +=     "</div>"
        html +=     "<div class='characterDetailEquip'>"
        html +=         "<div class='equipA'>"
        html +=             equipA
        html +=         "</div>"
        html +=         "<div class='equipB'>"
        html +=             equipB
        html +=         "</div>"
        html +=         "<div class='equipC'>"
        html +=             equipC
        html +=         "</div>"
        html +=         "<div class='equipD'>"
        html +=             equipD
        html +=         "</div>"
        html +=         "<div class='equipE'>"
        html +=             equipE
        html +=         "</div>"
        html +=     "</div>"
        html += "</div>"
        html += "<div class='characterStat'>"
        html +=     "<div class='stat'>"
        html +=         "<div class='statLabel'>"
        html +=             "<div class='characterDetail'>이름</div>"
        html +=             "<div class='characterDetail'>직업</div>"
        html +=             "<div class='characterDetail'>길드</div>"
        html +=             "<div class='characterDetail'>인기도</div>"
        html +=             "<div class='characterDetail'>스탯<br/>공격력</div>"
        html +=             "<div class='characterDetail'>HP</div>"
        html +=             "<div class='characterDetail'>MP</div>"
        html +=             "<div class='characterDetail'>STR</div>"
        html +=             "<div class='characterDetail'>DEX</div>"
        html +=             "<div class='characterDetail'>INT</div>"
        html +=             "<div class='characterDetail'>LUK</div>"
        html +=         "</div>"
        html +=         "<div class='statValue'>"
        html +=             "<div class='characterDetail'>"+characterInfo.name+"</div>"
        html +=             "<div class='characterDetail'>"+characterBasicInfo.job+"</div>"
        html +=             "<div class='characterDetail'>"+characterBasicInfo.guild+"</div>"
        html +=             "<div class='characterDetail'>"+characterBasicInfo.famous+"</div>"
        html +=             "<div class='characterDetail'>"+statSplit[0]+"</br>~"+statSplit[1]+"</div>"
        html +=             "<div class='characterDetail'>"+characterBasicInfo.hp+"</div>"
        html +=             "<div class='characterDetail'>"+characterBasicInfo.mp+"</div>"
        html +=             "<div class='characterDetail'>"+characterBasicInfo.str+"</div>"
        html +=             "<div class='characterDetail'>"+characterBasicInfo.dex+"</div>"
        html +=             "<div class='characterDetail'>"+characterBasicInfo.int+"</div>"
        html +=             "<div class='characterDetail'>"+characterBasicInfo.luk+"</div>"
        html +=         "</div>"
        html +=     "</div>"
        html +=     "<div class='detailStatLeft'>"
        html +=         "<div class='detailStatLeftLabel'>"
        html +=             "<div class='characterDetail'>데미지</div>"
        html +=             "<div class='characterDetail'>최종 데미지</div>"
        html +=             "<div class='characterDetail'>방어율 무시</div>"
        html +=             "<div class='characterDetail'>크리티컬확률</div>"
        html +=             "<div class='characterDetail'>크리 데미지</div>"
        html +=             "<div class='characterDetail'>공격력</div>"
        html +=             "<div class='characterDetail'>상태이상내성</div>"
        html +=             "<div class='characterDetail'>방어력</div>"
        html +=             "<div class='characterDetail'>이동속도</div>"
        html +=             "<div class='characterDetail'>점프력</div>"
        html +=         "</div>"
        html +=         "<div class='detailStatLeftValue'>"
        html +=             "<div class='characterDetail'>데미지 없네</div>"
        html +=             "<div class='characterDetail'>최종뎀 없네</div>"
        html +=             "<div class='characterDetail'>"+characterBasicInfo.defenseIgnore+"</div>"
        html +=             "<div class='characterDetail'>크확도 없네</div>"
        html +=             "<div class='characterDetail'>"+characterBasicInfo.criticalDamage+"</div>"
        html +=             "<div class='characterDetail'>공격력 없네</div>"
        html +=             "<div class='characterDetail'>"+characterBasicInfo.stateResistance+"</div>"
        html +=             "<div class='characterDetail'>"+characterBasicInfo.defensePower+"</div>"
        html +=             "<div class='characterDetail'>"+characterBasicInfo.moveSpeed+"</div>"
        html +=             "<div class='characterDetail'>"+characterBasicInfo.jumpPower+"</div>"
        html +=         "</div>"
        html +=     "</div>"
        html +=     "<div class='detailStatRight'>"
        html +=         "<div class='detailStatRightLabel'>"
        html +=             "<div class='characterDetail'>보스데미지</div>"
        html +=             "<div class='characterDetail'>버프지속시간</div>"
        html +=             "<div class='characterDetail'>아이템드롭률</div>"
        html +=             "<div class='characterDetail'>메소 획득량</div>"
        html +=             "<div class='characterDetail'>공격 속도</div>"
        html +=             "<div class='characterDetail'>마력</div>"
        html +=             "<div class='characterDetail'>스탠스</div>"
        html +=             "<div class='characterDetail'>스타포스</div>"
        html +=             "<div class='characterDetail'>아케인포스</div>"
        html +=         "</div>"
        html +=         "<div class='detailStatRightValue'>"
        html +=             "<div class='characterDetail'>"+characterBasicInfo.bossAttack+"</div>"
        html +=             "<div class='characterDetail'>벞지 없네</div>"
        html +=             "<div class='characterDetail'>아획 없고</div>"
        html +=             "<div class='characterDetail'>메획도 없고</div>"
        html +=             "<div class='characterDetail'>공속도없고</div>"
        html +=             "<div class='characterDetail'>마력도없고</div>"
        html +=             "<div class='characterDetail'>"+characterBasicInfo.stance+"</div>"
        html +=             "<div class='characterDetail'>"+characterBasicInfo.starForce+"</div>"
        html +=             "<div class='characterDetail'>"+characterBasicInfo.arcaneForce+"</div>"
        html +=         "</div>"
        html +=     "</div>"
        html +=     "<div class='ability'>"
        html +=         "<div class='characterDetail'>어빌리티</div>"
        html +=         "<div class='characterDetail'>"+abilitySplit[0]+"</div>"
        html +=         "<div class='characterDetail'>"+abilitySplit[1]+"</div>"
        html +=         "<div class='characterDetail'>"+abilitySplit[2]+"</div>"
        html +=     "</div>"
        html += "</div>"

        $("#characterEquipInfo").append(html);
    })

    location.href = '#characterEquipInfo';
}


function callItem(data){
    console.log("callItem");

    var inputId = document.getElementById(data+"id").innerText;
    console.log(inputId);

    const url = 'http://localhost:8080/api/getMapleBasicInfo';
    console.log(inputId, url);

    axios.get( url, {params:{id:inputId, buttonChk:'조회'}})
    .then(function(res) {
        console.log(res);
        console.log(res.data);
        console.log(res.data.characterInfo.name);
        console.log("--");
        console.log(res.data.equipInfo);
        console.log(res.data.equipInfo[0].equipCategory);

        let equipList = res.data.equipInfo;

        console.log("-------------");
        let ring = 0;

        // 반복문으로 캐릭터 장비 채워넣기
        for(let x=0; x<equipList.length;x++){
            console.log(x);
            console.log(equipList[x]);
            console.log(equipList[x].equipCategory);

            if (equipList[x].equipCategory == "장비분류 | 반지"){
                console.log('!!!');
                ring = ring + 1;
            }
        }

        // 반복문으로 캐릭터 스탯 채워넣기

        $("#characterEquipInfo").empty();

        html = '';

        html += "<div class='characterDetailSub'>"
		html +=     "<h2>캐릭터 프로필</h2>"
		html += "</div>"
        html += "<div class='profile'>"
        html +=     "<div class='characterImg'>"
        html +=         "<img src='"+res.data.characterInfo.img+"'alt='캐릭터'/>"
        html +=     "</div>"

        html +=     "<div class='characterDetailEquip'>"
        html +=         "<div class='equipA'>"

        html +=         "</div>"
        html +=     "</div>"

        html += "</div>"

//        html += "<div id='ccc'>"
//        html += "<div>"+res.data.characterInfo.name+"</div>";
//        html += "<button id='delete' onClick=btnRemove('ccc')>삭제</button>";
//        html += "</div>"

        $("#characterEquipInfo").append(html);
    })

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
    location.hash = '';
}