// 获取数据

/** 
 * 定义函数
 */
var root = window.forecast
var renderWeek = new root.renderWeek
var renderLive = new root.renderLive
var showNongLi = root.showNongLi
var cache = [] //缓存所有数据
var cacheDif = []
var cityidArr = [1587, 1589, 1588, 1590, 1591, 1585]
var cityidArrDif = [1587, 1589, 1588, 1590, 1591, 1585]
var maxTemp = []
var minTemp = []
var conditionDay = []
var dateArr = []
var clickIndex
// 实况天气
var condition
var realFeel
var tips
var windDir
var windLevel
// 生活指数
var liveStatus = []
var liveDesc = []
/** 
 * 定义函数
 */
function getDate(url, cityid, fn, dateArr) {
    var name = "&name=ChengShaoBo"
    $.ajax({
        url: url + "&cityid=" + cityid + name,
        dataType: "jsonp",
        jsonp: "callback",
        type: "GET",
        success: fn,
        error: error,
    })
}

function getDate2(url, fn) {
    $.ajax({
        url: url,
        dataType: "json",
        type: "GET",
        success: fn,
        error: error,
    })
}

function fifteenDays(data) {
    var forecastArr = data.info
    var weekNum = 1
    maxTemp = []
    minTemp = []
    conditionDay = []
    dateArr = []
    $.each(forecastArr, function (index, ele) {
        if (weekNum < 8) {
            // console.log(ele)
            var week = new Date(ele.sunrise).getDay();
            maxTemp.push(ele.tempDay)
            minTemp.push(ele.tempNight)
            conditionDay.push(ele.conditionDay)
            dateArr.push(ele.predictDate)
        }
        // 控制锁 取7天
        weekNum++
    })
    cache.push([maxTemp, minTemp, conditionDay])
    // 初始化 渲染屯溪
    renderWeek.init(cache[0][0], cache[0][1], cache[0][2])
}

function error() {
    console.log("error!")
}

function bindClick() {
    $(".nav-hd-item").each(function () {
        $(this).on("click", function () {
            $(".nav-hd-item").removeClass("cur")
            $(this).addClass("cur")
            clickIndex = $(this).index()
            root.renderWeek(cache, clickIndex)
        })
    })
}

function curDay(data) {
    var arr
    var data = data.info
    condition = data.condition
    realFeel = data.realFeel
    tips = data.tips
    windDir = data.windDir
    windLevel = data.windLevel
    cache.push([condition, realFeel, tips, windDir, windLevel])
    arr = cityidArr.splice(0, 1)
    if (cityidArr.length != 0) {
        getDate(url, cityidArr[0], curDay, dateArr)
    } else {
        renderWeek.renderCur(cache)
    }
}

function curTempDif(data) {
    var data = data["info"][2]
    maxTemp = data["tempDay"]
    minTemp = data["tempNight"]
    cacheDif.push([maxTemp, minTemp])
    arr = cityidArrDif.splice(0, 1)
    if (cityidArrDif.length != 0) {
        getDate(url_dif, cityidArrDif[0], curTempDif)
    } else {
        renderWeek.renderTemDif(cacheDif)
    }
    // console.log(data)
}

function alertFn(data) {
    console.log(data)
}

function liveIndex(data) {
    var data = data["liveIndex"]
    // 取得日期
    var date 
    $.each(data, function (index, item) {
        date = index
        for (var i = 0; i < item.length; i++) {
            liveStatus.push(item[i].status)
            liveDesc.push(item[i].desc)
        }
    })

    liveStatus.splice(3,1)
    liveDesc.splice(3,1)
    liveStatus.splice(7,1)
    liveDesc.splice(7,1)

    var objLive = {
        liveDesc: liveDesc,
        liveStatus: liveStatus
    }
    var nongli = showNongLi(date)
    var weekIndex = new Date(Date.parse(date)).getDay()
    var objDate = {
        nongli: nongli,
        weekIndex: weekIndex
    }

    // 渲染农历
    renderLive.curDate(objDate)
    renderLive.render(objLive)
}