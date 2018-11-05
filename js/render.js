// 渲染数据
(function (root) {
    // 未来一星期天气
    function renderWeek(cache, index) {
        if (cache && index) {
            setLine(cache[index][0], cache[index][1], cache[index][2], dateArr)
        }
        if (cache && index == 0) {
            setLine(cache[index][0], cache[index][1], cache[index][2], dateArr)
        }
    }
    // 生活指数
    function renderLive(data) {
        this.render = function (data) {
            $(".index-item").each(function () {
                var index = $(this).index()
                $(this).find(".item-advice").text(data["liveStatus"][index])
                $(this).find(".item-des").text(data["liveDesc"][index])
            })
        }
    }

    // 天气预警
    function renderAlert(data) {
        data.forEach(function (ele) {
            var alertTitle = ele["title"]
            var infoid = ele["infoid"]
            var name = ele["name"]
            var level = ele["level"]
            var type = ele["type"] + "预警信号"
            var imgSrc = "img/hong1.png"
            if (infoid == null) {
                var alertItem = `
                         <li class="item" ><a href="warning_details.html">暂无天气预警</a></li>
                     `
                $("#alertList_1").append(alertItem)
                var alertItem2 = `
                         <li class="item" ><a href="warning_signal_details.html">
                             <span>暂无天气预警</span>
                        </a></li>
                      `
                $("#alertList_2").append(alertItem2)
            } else {
                var alertItem = `
                  <li class="item" data-id = ${infoid}><a href="warning_details.html?infoid=${infoid}">${alertTitle}</a></li>
                `
                $("#alertList_1").append(alertItem)
                // 获取预警图片
                switch (level) {
                    case "红色":
                        imgSrc = "img/hong1.png"
                        break
                    case "橙色":
                        imgSrc = "img/cheng1.png"
                        break
                    case "黄色":
                        imgSrc = "img/huang1.png"
                        break
                    case "蓝色":
                        imgSrc = "img/lan1.png"
                        break
                }
                var alertItem2 = `
                <li class="item" data-id = ${infoid}><a href="warning_signal_details.html?infoid=${infoid}"><img src="${imgSrc}" alt="${level}">
                <span>${type}</span>
                </a></li>
            `
                $("#alertList_2").append(alertItem2)
            }
        })
    }

    // 预警详情页面
    function renderAlertDet(data, infoid) {
        if (infoid == "") {
            $(".details-title").text("暂无天气预警")
            $(".details-content p").text("暂无天气预警")
        } else {
            data.forEach(function (ele) {
                var alertTitle = ele["title"]
                var id = ele["infoid"]
                var content = ele["content"]
                if (infoid == id) {
                    $(".details-title").text(alertTitle)
                    $(".details-content p").text(content)
                }
            })
        }
    }
    // 预警详情页面
    function renderSignalDet(data, infoid) {
        if (infoid == "") {
            var htmlTitle = `
            <img src="" alt=""><span>暂无天气预警</span>
           `
            $(".warning-signal").append(htmlTitle)
            $(".details-content p").text("暂无天气预警")
        } else {
            data.forEach(function (ele) {
                var type = ele["type"]
                var id = ele["infoid"]
                var level = ele["level"]
                var content = ele["content"]
                var imgSrc = "img/hong1.png"
                // 获取预警图片
                switch (level) {
                    case "红色":
                        imgSrc = "img/hong1.png"
                        break
                    case "橙色":
                        imgSrc = "img/cheng1.png"
                        break
                    case "黄色":
                        imgSrc = "img/huang1.png"
                        break
                    case "蓝色":
                        imgSrc = "img/lan1.png"
                        break
                }
                if (infoid == id) {
                    var htmlTitle = `
                 <img src="${imgSrc}" alt="${level}"><span>${type}</span>
                `
                    $(".warning-signal").append(htmlTitle)
                    $(".details-content p").text(content)
                }
            })
        }

    }
    // 原型链
    renderWeek.prototype = {
        init: function (max, min, condistion) {
            setLine(max, min, condistion, dateArr);
        },
        renderCur: function (data) {
            // console.log(data)
            var index
            // console.log(data)
            $(".swiper-slide").each(function () {
                index = $(this).index()
                $(this).find(".r-det-text").text(data[index][0])
                $(this).find(".tep").text(data[index][1] + "°C")
                $(this).find(".tieshi").text(data[index][2].replace("。", ''))
                $(this).find(".fengxiang").text(data[index][3])
                $(this).find(".fengsu").text(data[index][4] + "级")
                var iconImg = data[index][0]
                if(iconImg == "晴" || iconImg == "大部分晴朗"){
                    $(this).find(".icon-bg").css("backgroundImage", "url(" + "./img/W0.png" + ")")
                }
                if(iconImg == "多云" || iconImg == "少云"){
                    $(this).find(".icon-bg").css("backgroundImage", "url(" + "./img/W1.png" + ")")
                }
                if(iconImg == "阴" ){
                    $(this).find(".icon-bg").css("backgroundImage", "url(" + "./img/W2.png" + ")")
                }
                if(iconImg == "阵雨" || iconImg == "局部阵雨" || iconImg == "小阵雨" || iconImg == "强阵雨"){
                    $(this).find(".icon-bg").css("backgroundImage", "url(" + "./img/W3.png" + ")")
                }
                if(iconImg == "阵雪" || iconImg == "小阵雪"){
                    $(this).find(".icon-bg").css("backgroundImage", "url(" + "./img/W13.png" + ")")
                }
                if(iconImg == "雾" || iconImg == "冻雾"){
                    $(this).find(".icon-bg").css("backgroundImage", "url(" + "./img/W18.png" + ")")
                }
                if(iconImg == "沙尘暴" || iconImg == "强沙尘暴"){
                    $(this).find(".icon-bg").css("backgroundImage", "url(" + "./img/W20.png" + ")")
                }
                if(iconImg == "浮尘" || iconImg == "尘卷风" || iconImg == "扬沙"){
                    $(this).find(".icon-bg").css("backgroundImage", "url(" + "./img/W29.png" + ")")
                }
                if(iconImg == "霾"){
                    $(this).find(".icon-bg").css("backgroundImage", "url(" + "./img/W45.png" + ")")
                }
                if(iconImg == "雷阵雨" || iconImg == "雷电" || iconImg == "雷暴"){
                    $(this).find(".icon-bg").css("backgroundImage", "url(" + "./img/W4.png" + ")")
                }
                if(iconImg == "雷阵雨伴有冰雹" || iconImg == "冰雹" || iconImg == "冰针" || iconImg == "冰粒"){
                    $(this).find(".icon-bg").css("backgroundImage", "url(" + "./img/W5.png" + ")")
                }
                if(iconImg == "雨夹雪"){
                    $(this).find(".icon-bg").css("backgroundImage", "url(" + "./img/W6.png" + ")")
                }
                if(iconImg == "小雨" || iconImg == "小到中雨"){
                    $(this).find(".icon-bg").css("backgroundImage", "url(" + "./img/W7.png" + ")")
                }
                if(iconImg == "中雨" || iconImg == "雨"){
                    $(this).find(".icon-bg").css("backgroundImage", "url(" + "./img/W8.png" + ")")
                }
                if(iconImg == "大雨" || iconImg == "中到大雨"){
                    $(this).find(".icon-bg").css("backgroundImage", "url(" + "./img/W9.png" + ")")
                }
                if(iconImg == "暴雨" || iconImg == "大暴雨" || iconImg == "特大暴雨"  || iconImg == "大到暴雨"){
                    $(this).find(".icon-bg").css("backgroundImage", "url(" + "./img/W10.png" + ")")
                }
                if(iconImg == "小雪"){
                    $(this).find(".icon-bg").css("backgroundImage", "url(" + "./img/W14.png" + ")")
                }
                if(iconImg == "中雪" || iconImg == "雪" || iconImg == "小到中雪"){
                    $(this).find(".icon-bg").css("backgroundImage", "url(" + "./img/W15.png" + ")")
                }
                if(iconImg == "大雪"){
                    $(this).find(".icon-bg").css("backgroundImage", "url(" + "./img/W16.png" + ")")
                }
                if(iconImg == "暴雪"){
                    $(this).find(".icon-bg").css("backgroundImage", "url(" + "./img/W17.png" + ")")
                }
                if(iconImg == "冻雨"){
                    $(this).find(".icon-bg").css("backgroundImage", "url(" + "./img/W19.png" + ")")
                }
            })
        },
        renderTemDif: function (data) {
            $(".swiper-slide").each(function () {
                index = $(this).index()
                $(this).find(".r-det-num").text(data[index][0] + "°C" + "~" + data[index][1] + "°C")
            })
        },
        renderArround: function (data) {
            var index
            // console.log(data)
            $(".swiper-slide").each(function () {
                index = $(this).index()
                $(this).find(".info-item:nth-of-type(1) .right-info").text(data[index][5])
                $(this).find(".info-item:nth-of-type(2) .right-info").text(data[index][6])
                $(this).find(".info-item:nth-of-type(3) .right-info").text(data[index][9] + "米")
                $(this).find(".r-det-num").text(data[index][8] + "°C ~" + data[index][7] + "°C")
                $(this).find(".city").text(data[index][10])
            })
        }
    }

    renderLive.prototype.curDate = function (date) {
        var week = date["weekIndex"]
        switch (week) {
            case 1:
                $(".info-right .time").text("今天 星期一 农历" + date["nongli"]["month"] + "月" + date["nongli"]["day"])
                break
            case 2:
                $(".info-right .time").text("今天 星期二 农历" + date["nongli"]["month"] + "月" + date["nongli"]["day"])
                break
            case 3:
                $(".info-right .time").text("今天 星期三 农历" + date["nongli"]["month"] + "月" + date["nongli"]["day"])
                break
            case 4:
                $(".info-right .time").text("今天 星期四 农历" + date["nongli"]["month"] + "月" + date["nongli"]["day"])
                break
            case 5:
                $(".info-right .time").text("今天 星期五 农历" + date["nongli"]["month"] + "月" + date["nongli"]["day"])
                break
            case 6:
                $(".info-right .time").text("今天 星期六 农历" + date["nongli"]["month"] + "月" + date["nongli"]["day"])
                break
            case 7:
                $(".info-right .time").text("今天 星期日 农历" + date["nongli"]["month"] + "月" + date["nongli"]["day"])
                break
        }
    }

    root.renderLive = renderLive
    root.renderWeek = renderWeek
    root.renderAlert = renderAlert
    root.renderAlertDet = renderAlertDet
    root.renderSignalDet = renderSignalDet
}(window.forecast || (window.forecast = {})))