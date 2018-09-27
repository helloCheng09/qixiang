// 渲染数据
(function (root) {
    function renderWeek(cache, index) {
        if (cache && index) {
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
                switch (data[index][0]) {
                    case "晴":
                        $(this).find(".icon-bg").css("backgroundImage", "url(" + "./img/qingtian.png" + ")")
                        break
                    case "多云":
                        $(this).find(".icon-bg").css("backgroundImage", "url(" + "./img/duoyun.png" + ")")
                        break
                    case "小雨":
                        $(this).find(".icon-bg").css("backgroundImage", "url(" + "./img/xiaoyu.png" + ")")
                        break
                    case "阵雨":
                        $(this).find(".icon-bg").css("backgroundImage", "url(" + "./img/zhenyu.png" + ")")
                        break
                    case "大雨":
                        $(this).find(".icon-bg").css("backgroundImage", "url(" + "./img/dayu.png" + ")")
                        break
                    case "阴":
                        $(this).find(".icon-bg").css("backgroundImage", "url(" + "./img/yintian.png" + ")")
                        break
                }
            })
        },
        renderTemDif: function (data) {
            $(".swiper-slide").each(function () {
                index = $(this).index()
                $(this).find(".r-det-num").text(data[index][0] + "°C" + "~" + data[index][1] + "°C")
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
            case 1:
            $(".info-right .time").text("今天 星期四 农历" + date["nongli"]["month"] + "月" + date["nongli"]["day"])
            break
            case 1:
            $(".info-right .time").text("今天 星期五 农历" + date["nongli"]["month"] + "月" + date["nongli"]["day"])
            break
            case 1:
            $(".info-right .time").text("今天 星期六 农历" + date["nongli"]["month"] + "月" + date["nongli"]["day"])
            break
            case 1:
            $(".info-right .time").text("今天 星期日 农历" + date["nongli"]["month"] + "月" + date["nongli"]["day"])
            break
        }
    }

    root.renderLive = renderLive
    root.renderWeek = renderWeek
}(window.forecast || (window.forecast = {})))