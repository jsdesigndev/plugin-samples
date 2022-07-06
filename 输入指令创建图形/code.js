
const template = ["矩形", "圆", "三角形", "平行四边形", "星形"]
//parameters 用来监听 参数输入事件
jsDesign.parameters.on(
    'input', ({ key, query }) => {
        if (key == 'layers') {
            if (template.includes(query)) {
                switch (query) {
                    case '矩形':
                        createRangles();
                        break;
                    case '圆':
                        createEllipses();
                        break;
                    case '星形':
                        createStarts();
                        break;
                    case '三角形':
                        createTriangle();
                        break;
                    case '平行四边形':
                        createParallelogram();
                        break;
                }
                //关闭插件
                jsDesign.closePlugin();
            }
        }

    }
);


//创建正方形
function createRangles() {
    //创建正方形
    const rect = jsDesign.createRectangle()
    //设置坐标位置
    rect.x = 50
    rect.y = 50
    //设置正方形宽高
    rect.resize(100, 100)
    //设置正方形填充
    rect.fills = [{ type: 'SOLID', color: { r: 0.3, g: 0.3, b: 0.3 } }]
    jsDesign.viewport.scrollAndZoomIntoView([react])
}
//创建圆
function createEllipses() {
    const ellipse = jsDesign.createEllipse()

    //设置坐标位置
    ellipse.x = 50
    ellipse.y = 50

    //设置宽高
    ellipse.resize(100, 100)

    //填充
    ellipse.fills = [{ type: 'SOLID', color: { r: 0.3, g: 0.3, b: 0.3 } }]

    //可以设置开始角度 结束角度 和内弧度
    ellipse.arcData = { startingAngle: 0, endingAngle: 2 * Math.PI, innerRadius: 0 }

    jsDesign.viewport.scrollAndZoomIntoView([ellipse])
}
function createStarts() {
    const star = jsDesign.createStar()

    //设置坐标位置
    star.x = 50
    star.y = 50

    //设置宽高
    star.resize(200, 200)

    // Make the star 7-pointed
    star.pointCount = 5

    //填充
    star.fills = [{ type: 'SOLID', color: { r: 0.3, g: 0.3, b: 0.3 } }]

    // Make the angles of each point less acute
    star.innerRadius = 0.6

    jsDesign.viewport.scrollAndZoomIntoView([star])
}

function createTriangle() {
    const polygon = jsDesign.createPolygon()
    //设置坐标位置
    polygon.x = 50
    polygon.y = 50

    //设置宽高
    polygon.resize(200, 200)

    //设置多边形 顶点 的个数
    polygon.pointCount = 3

    //填充
    polygon.fills = [{ type: 'SOLID', color: { r: 0.3, g: 0.3, b: 0.3 } }]

    jsDesign.viewport.scrollAndZoomIntoView([polygon])
}

function createParallelogram() {
    //创建向量，不设置其他属性的情况下，向量只有一个边界框但没有任何顶点
    const vector = jsDesign.createVector();
    //设置向量的填充
    vector.fills = [{ type: 'SOLID', color: { r: 0.3, g: 0.3, b: 0.3 } }]
    //设置向量图层名称
    vector.name = '平行四边行'
    //设置向量路径
    //vectorPaths 中的data 和 windingRule 详细参数可参考文档
    vector.vectorPaths = [{
        windingRule: "EVENODD",
        data: "M 0 100 L 100 100 L 50 0 L -50 0 Z",
    }]

    jsDesign.viewport.scrollAndZoomIntoView([vector])

}