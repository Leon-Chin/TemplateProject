import * as echarts from 'echarts'
import COLORS from '../constants/COLORS';

const SimpleLineChartOption = (xArr, yArr, title) => {
    let yarr = yArr.filter(element => element);
    // let min = Math.min(...yarr) - 1
    // min = Math.floor(min)
    // let max = Math.max(...yarr) + 1
    // max = Math.ceil(max)
    const xaxis = [
        {
            data: yArr,
            type: 'line',
            name: title,
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 0.7, [{
                        offset: 0, color: COLORS.primary // 0% 处的颜色
                    }, {
                        offset: 1, color: "#fff"// 100% 处的颜色
                    }]
                    ),  //背景渐变色 
                },
            },
            smooth: true
        }]
    return {
        title: {
            text: title, // Main title text
            left: 'center', // Position the title in the center
            textStyle: {
                color: COLORS.primary, // Title color
                fontWeight: 'bold', // Make the title font bold
                fontSize: 24 // Set the font size for the title
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: COLORS.primary,
                },
            },
        },
        toolbox: {
            feature: {
                saveAsImage: {
                    type: 'png', // 设置保存图片的类型，例如 'png', 'jpeg'
                    name: title, // 设置保存的图片名称
                }
            }
        },
        xAxis: {
            type: 'category',
            data: xArr,
            show: true
        },
        yAxis: {
            type: 'value',
            // min: min,
            // max: max,
            show: true,
            splitLine: {
                show: true // Do not show the split lines
            },
        },
        grid: {
            top: '50', // Give more room at the top
            right: '50',
            bottom: '50', // Provide space for rotated labels
            left: '8%',
            containLabel: true
        },
        series: xaxis,
        backgroundColor: ''
    }
};
export default SimpleLineChartOption