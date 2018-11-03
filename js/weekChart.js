  // 基于准备好的dom，初始化一个echarts实例
  var myChart = echarts.init(document.getElementById("main"));
  //天气图json对象
  var weatherIcons = {
      'W0': 'img/W0.png',
      'W1': 'img/W1.png',
      'W2': 'img/W2.png',
      'W3': 'img/W3.png',
      'W4': 'img/W4.png',
      'W5': 'img/W5.png',
      'W6': 'img/W6.png',
      'W7': 'img/W7.png',
      'W8': 'img/W8.png',
      'W9': 'img/W9.png',
      'W10': 'img/W10.png',
      'W13': 'img/W13.png',
      'W14': 'img/W14.png',
      'W15': 'img/W15.png',
      'W16': 'img/W16.png',
      'W17': 'img/W17.png',
      'W18': 'img/W18.png',
      'W19': 'img/W19.png',
      'W20': 'img/W20.png',
      'W29': 'img/W29.png',
      'W30': 'img/W30.png',
      'W31': 'img/W31.png',
      'W32': 'img/W32.png',
      'W33': 'img/W33.png',
      'W34': 'img/W34.png',
      'W35': 'img/W35.png',
      'W36': 'img/W36.png',
      'W44': 'img/W44.png',
      'W45': 'img/W45.png',
      'W46': 'img/W46.png',
  };
  //根据传入的data3数据判断相对应的图片，作为x轴刻度标签的背景图
  function setLine(data1, data2, data3, dateArr) {
      // console.log(dateArr)
      var weekTag = []
      var dayTag = []
      var day_1, day_2, day_3, day_4, day_5, day_6, day_7
      var week_1, week_2, week_3, week_4, week_5, week_6, week_7
      var str = [];
      var temp = "";
      var weekArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      $.each(dateArr, function (index, item) {
          var weekIndex = new Date(Date.parse(item)).getDay()
          // 取星期值
          weekTag.push(weekArr[weekIndex])
          // 取日期值
          dayTag.push(item.substring(5, 10))
      })
      week_1 = weekTag[0]
      week_2 = weekTag[1]
      week_3 = weekTag[2]
      week_4 = weekTag[3]
      week_5 = weekTag[4]
      week_6 = weekTag[5]
      week_7 = weekTag[6]

      day_1 = dayTag[0]
      day_2 = dayTag[1]
      day_3 = dayTag[2]
      day_4 = dayTag[3]
      day_5 = dayTag[4]
      day_6 = dayTag[5]
      day_7 = dayTag[6]

      for (var i = 0; i < data3.length; i++) {
        var iconImg = data3[i]
        if(iconImg == "晴" || iconImg == "大部分晴朗"){
            temp = weatherIcons.W0;
        }
        if(iconImg == "多云" || iconImg == "少云"){
            temp = weatherIcons.W1;
        }
        if(iconImg == "阴" ){
            temp = weatherIcons.W2;
        }
        if(iconImg == "阵雨" || iconImg == "局部阵雨" || iconImg == "小阵雨" || iconImg == "强阵雨"){
            temp = weatherIcons.W3;
        }
        if(iconImg == "阵雪" || iconImg == "小阵雪"){
            temp = weatherIcons.W13;
        }
        if(iconImg == "雾" || iconImg == "冻雾"){
            temp = weatherIcons.W18;
        }
        if(iconImg == "沙尘暴" || iconImg == "强沙尘暴"){
            temp = weatherIcons.W20;
        }
        if(iconImg == "浮尘" || iconImg == "尘卷风" || iconImg == "扬沙"){
            temp = weatherIcons.W29;
        }
        if(iconImg == "霾"){
            temp = weatherIcons.W45;
        }
        if(iconImg == "雷阵雨" || iconImg == "雷电" || iconImg == "雷暴"){
            temp = weatherIcons.W4;
        }
        if(iconImg == "雷阵雨伴有冰雹" || iconImg == "冰雹" || iconImg == "冰针" || iconImg == "冰粒"){
            temp = weatherIcons.W5;
        }
        if(iconImg == "雨夹雪"){
            temp = weatherIcons.W6;
        }
        if(iconImg == "小雨" || iconImg == "小到中雨"){
            temp = weatherIcons.W7;
        }
        if(iconImg == "中雨" || iconImg == "雨"){
            temp = weatherIcons.W8;
        }
        if(iconImg == "大雨" || iconImg == "中到大雨"){
            temp = weatherIcons.W9;
        }
        if(iconImg == "暴雨" || iconImg == "大暴雨" || iconImg == "特大暴雨"  || iconImg == "大到暴雨"){
            temp = weatherIcons.W10;
        }
        if(iconImg == "小雪"){
            temp = weatherIcons.W14;
        }
        if(iconImg == "中雪" || iconImg == "雪" || iconImg == "小到中雪"){
            temp = weatherIcons.W15;
        }
        if(iconImg == "大雪"){
            temp = weatherIcons.W16;
        }
        if(iconImg == "暴雪"){
            temp = weatherIcons.W17;
        }
        if(iconImg == "冻雨"){
            temp = weatherIcons.W19;
        }
          str.push(temp);
      }
      // 指定图表的配置项和数据
      var option = {
          tooltip: {
              trigger: 'axis'
          },
          // backgroundColor: '#413b41',
          backgroundColor: 'rgba(0,0,0,.2)',
          color: ['#f44336', '#ffeb3b'],
          legend: {
              data: ['最高气温', '最低气温'],
              // orient:'vertical',
              textStyle: { //修改图例中文字颜色
                  color: '#fff'
              },
          },
          textStyle: { //修改全局文字颜色
              color: '#fff'
          },
          grid: {
              bottom: 65, // 图表距离容器下方边距,默认60
              top: 95 //图标距离上方边距--图例文字位置不受影响
          },
          xAxis: [{ //设置x轴
              type: 'category',
              boundaryGap: false,
              data: [day_1, day_2, day_3, day_4, day_5, day_6, day_7],
              axisLine: {
                  show: false //是否显示坐标轴轴线。
              },
              axisTick: {
                  show: false, //是否显示坐标轴刻度。
                  interval: 0
              },
              axisLabel: { //刻度标签--即轴线下的文字
                  formatter: function (value) {
                      return '{value|' + value + '}';
                  },
                  interval: 0, //设置成 0 强制显示所有标签。
                  margin: 20,
                  rich: { //x轴刻度标签的自定义--图片+文字
                      value: {
                          lineHeight: 20,
                          align: 'center'
                      },
                      day_1: { //与data中的数组元素要对应
                          height: 20,
                          align: 'center',
                          backgroundColor: {
                              image: str[0]
                          }
                      },
                      day_2: {
                          height: 20,
                          align: 'center',
                          backgroundColor: {
                              image: str[1]
                          }
                      },
                      day_3: {
                          height: 20,
                          align: 'center',
                          backgroundColor: {
                              image: str[2]
                          }
                      },
                      day_4: {
                          height: 20,
                          align: 'center',
                          backgroundColor: {
                              image: str[3]
                          }
                      },
                      day_5: {
                          height: 20,
                          align: 'center',
                          backgroundColor: {
                              image: str[4]
                          }
                      },
                      day_6: {
                          height: 20,
                          align: 'center',
                          backgroundColor: {
                              image: str[5]
                          }
                      },
                      day_7: {
                          height: 20,
                          align: 'center',
                          backgroundColor: {
                              image: str[6]
                          }
                      },
                  }
              },
          }, { //设置x轴
              type: 'category',
              boundaryGap: false,
              data: [1, 2, 3, 4, 5, 6, 7],
              axisLine: {
                  show: false //是否显示坐标轴轴线。
              },
              axisTick: {
                  show: false, //是否显示坐标轴刻度。
                  interval: 0
              },
              axisLabel: { //刻度标签--即轴线下的文字
                  formatter: function (value) {
                      return '{' + value + '| }\n{value|' + " " + '}';
                  },
                  interval: 0, //设置成 0 强制显示所有标签。
                  margin: 20,
                  rich: { //x轴刻度标签的自定义--图片+文字
                      value: {
                          lineHeight: 20,
                          align: 'center'
                      },
                      1: {
                          //与data中的数组元素要对应
                          height: 20,
                          align: 'center',
                          backgroundColor: {
                              image: str[0]
                          }
                      },
                      2: {
                          height: 20,
                          align: 'center',
                          backgroundColor: {
                              image: str[1]
                          }
                      },
                      3: {
                          height: 20,
                          align: 'center',
                          backgroundColor: {
                              image: str[2]
                          }
                      },
                      4: {
                          height: 20,
                          align: 'center',
                          backgroundColor: {
                              image: str[3]
                          }
                      },
                      5: {
                          height: 20,
                          align: 'center',
                          backgroundColor: {
                              image: str[4]
                          }
                      },
                      6: {
                          height: 20,
                          align: 'center',
                          backgroundColor: {
                              image: str[5]
                          }
                      },
                      7: {
                          height: 20,
                          align: 'center',
                          backgroundColor: {
                              image: str[6]
                          }
                      },
                  }
              },
          }],
          yAxis: {
              type: 'value',
              min: 'dataMin',
              axisLabel: {
                  formatter: '{value} °C'
              },
              show: false,
              // max:60,//设置y轴最大值为60
              // min:-20,
              axisTick: {
                  show: false, //是否显示坐标轴刻度。
              }
          },
          series: [{
                  name: '最高气温',
                  type: 'line',
                  data: data1,
                  smooth: true, //圆滑线条
                  itemStyle: {
                      normal: {
                          label: {
                              show: true
                          }
                      }
                  },
                  lineStyle: {
                      color: '#f44336'
                  },
              },
              {
                  name: '最低气温',
                  type: 'line',
                  data: data2,
                  smooth: true,
                  itemStyle: {
                      normal: {
                          label: {
                              show: true
                          }
                      }
                  },
                  lineStyle: {
                      color: '#ffeb3b'
                  }
              }
          ]
      };

      // 使用刚指定的配置项和数据显示图表。---echarts实例对象的setOption()方法
      myChart.setOption(option);
      // option["xAxis"][1]["axisLabel"]["rich"][week_1] = {
      //     //与data中的数组元素要对应
      //     height: 20,
      //     align: 'center',
      //     backgroundColor: {
      //         image: str[0]
      //     }
      // }
  }