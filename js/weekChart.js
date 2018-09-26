  // 基于准备好的dom，初始化一个echarts实例
  var myChart = echarts.init(document.getElementById("main"));
  //天气图json对象
  var weatherIcons = {
      'Sunny': 'img/qingtian.png',
      'Cloudy': 'img/duoyun.png',
      'LightRain': 'img/xiaoyu.png',
      'Showers': 'img/zhenyu.png',
      'HeavyRain': 'img/dayu.png',
      'Overcast': 'img/yintian.png',
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
          switch (data3[i]) {
              case "晴":
                  temp = weatherIcons.Sunny;
                  break;
              case "多云":
                  temp = weatherIcons.Cloudy;
                  break;
              case "小雨":
                  temp = weatherIcons.LightRain;
                  break;
              case "阵雨":
                  temp = weatherIcons.Showers;
                  break;
              case "大雨":
                  temp = weatherIcons.HeavyRain;
                  break;
              case "阴":
                  temp = weatherIcons.Overcast;
                  break;
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