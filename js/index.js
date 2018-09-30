// 获取数据

/** 
 * 定义函数
 */
var root = window.forecast
var renderWeek = new root.renderWeek
var renderLive = new root.renderLive
var renderAlert = root.renderAlert
var renderAlertDet = root.renderAlertDet
var renderSignalDet = root.renderSignalDet
var showNongLi = root.showNongLi
var cache = [] //缓存所有数据
var cacheDif = []
var alertData = []
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
// ajax
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

// 未来一周天气
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

// 天气实况
function curDay(data) {
    var data = data.info
    condition = data.condition
    realFeel = data.realFeel
    tips = data.tips
    windDir = data.windDir
    windLevel = data.windLevel
    cache.push([condition, realFeel, tips, windDir, windLevel])
    cityidArr.splice(0, 1)
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

// 天气预警
function alertFn(data) {
    alertData.push(data.info[0])
    cityidArr.splice(0, 1)
    if (cityidArr.length != 0) {
        getDate(url, cityidArr[0], alertFn)
    } else {
        renderAlert(alertData)
    }
}

function alertToggle() {
    $(".tab-item").click(function () {
        $(this).addClass("cur").siblings().removeClass("cur");
        var idx = $(this).index();
        $(".bd-item").eq(idx).addClass("current").siblings().removeClass("current");
    })
}

function showTag() {
    var detail = getQueryString("detail")
    if (detail == 2) {
        $(".tab-item").eq(0).removeClass("cur")
        $(".tab-item").eq(1).addClass("cur")
        $(".bd-item").eq(0).removeClass("current")
        $(".bd-item").eq(1).addClass("current")
    }
}

// 预警详情
function alertDetail(data) {
    alertData.push(data.info[0])
    cityidArr.splice(0, 1)
    if (cityidArr.length != 0) {
        getDate(url, cityidArr[0], alertDetail)
    } else {
        var id = getQueryString("infoid")
        renderAlertDet(alertData, id)
    }
}

// 预警信号详情
function alertSignalDet(data) {
    alertData.push(data.info[0])
    cityidArr.splice(0, 1)
    if (cityidArr.length != 0) {
        getDate(url, cityidArr[0], alertDetail)
    } else {
        var id = getQueryString("infoid")
        renderSignalDet(alertData, id)
    }
}

// 获取url参数
function getQueryString(id) {
    var reg = new RegExp("(^|&)" + id + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return r[2];
    return '';
}

// 生活指数
function liveIndex(data) {

    var data = data["info"]
    console.log(data)
    // 取得日期
    var date
    $.each(data, function (index, item) {
        date = index
        liveStatus.push(item["status"])
        liveDesc.push(item["desc"])
    })

    liveStatus.splice(0, 2)
    liveDesc.splice(0, 2)
    liveStatus.splice(2, 2)
    liveDesc.splice(2, 2)
    liveStatus.splice(4, 1)
    liveDesc.splice(4, 1)

    var objLive = {
        liveDesc: liveDesc,
        liveStatus: liveStatus
    }

    console.log(objLive)
    var nongli = showNongLi(date["day"])
    var weekIndex = new Date(Date.parse(date)).getDay()
    var objDate = {
        nongli: nongli,
        weekIndex: weekIndex
    }

    // 渲染农历
    renderLive.curDate(objDate)
    renderLive.render(objLive)
}