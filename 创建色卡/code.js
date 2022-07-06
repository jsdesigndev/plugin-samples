
jsDesign.showUI(__html__,{ width: 260, height: 123 });


function hex2rgb(hex) {
  return [Number('0x' + hex[1] + hex[2]) | 0, Number('0x' + hex[3] + hex[4]) | 0, Number('0x' + hex[5] + hex[6])| 0];
}

let markId = null;
//监听从 插件ui 发过来的信息
jsDesign.ui.onmessage = msg => {
  if (msg.type === 'createLayer') {
    const nodes = [];
    //创建 画板
    const colorsFrame = jsDesign.createFrame();
    //设置画板宽高
    const frameHeight = 100
    const frameWidth = (msg.colorsList.length * 100) 
    //调用jsDesignConstraints设置画板的宽高，子图层不会被等比缩放，
    colorsFrame.resizeWithoutConstraints(frameWidth, frameHeight);
    //设置画板名称
    colorsFrame.name = msg.name
    //处理画板位置
    if(markId){
        //getNodeById 通过id 获取画布中的图层
      let node = jsDesign.getNodeById(markId);
      markId = colorsFrame.id;
      if(node){
        colorsFrame.x = node.x;
        colorsFrame.y = node.y+200;
      }else{
        colorsFrame.x = jsDesign.viewport.center.x
        colorsFrame.y = jsDesign.viewport.center.y
      }
    }else{
      //将 colorsFrame画板定位在画布中央
      colorsFrame.x = jsDesign.viewport.center.x
      colorsFrame.y = jsDesign.viewport.center.y
      markId = colorsFrame.id;
    }
  
    //循环创建颜色图层
    for (let i = 0; i < msg.colorsList.length; i++) {
      //创建 矩形图层
      const rect = jsDesign.createRectangle();
      //设置 矩形图层 坐标、图层名称、填充
      rect.y = 0;
      rect.x = (i * 100);
      let rgbColor = hex2rgb(msg.colorsList[i]);
      rect.name = msg.name + "-" + i
      rect.fills = [{type: 'SOLID', color: {r: rgbColor[0]/255, g: rgbColor[1]/255, b: rgbColor[2]/255}}];
      jsDesign.currentPage.appendChild(rect);
      colorsFrame.appendChild(rect);
      nodes.push(rect);
    }
    //调用scrollAndZoomIntoView方法将创建的 节点 居中并以最佳缩放比展示
    jsDesign.viewport.scrollAndZoomIntoView(nodes);
  }

};

