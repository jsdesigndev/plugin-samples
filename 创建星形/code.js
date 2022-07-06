// 详细内容见开发者文档：https://js.design/developer-doc/Guide/2.Development/4.manifest.json
// 打开 GUI 用户界面 "ui.html".
jsDesign.showUI(__html__, {
    width: 260,
    height: 293,
});
jsDesign.ui.onmessage = (msg) => {
    if (msg.type === 'create-star')
        create(msg.count, hexToRgb(msg.hex));
    if (msg.type === 'cancel')
        cancel();
};
function create(count, color) {
    if (count <= 0)
        return;
    const frame = jsDesign.createFrame();
    frame.expanded = true;
    // 设置 Frame 的布局方式
    frame.layoutMode = 'HORIZONTAL';
    frame.fills = [];
    for (let i = 0; i < count; i++) {
        const star = jsDesign.createStar();
        star.name = '星形';
        star.pointCount = 5;
        star.fills = [{ type: 'SOLID', color }];
        frame.appendChild(star);
    }
    jsDesign.currentPage.appendChild(frame);
    //将页面中的选中目标设置为「画板」
    jsDesign.currentPage.selection = [frame];
     //调用scrollAndZoomIntoView方法将创建的 节点 居中并以最佳缩放比展示
    jsDesign.viewport.scrollAndZoomIntoView([frame]);
}
function hexToRgb(hex) {
    const r = parseInt(hex.substring(1, 3), 16) / 255;
    const g = parseInt(hex.substring(3, 5), 16) / 255;
    const b = parseInt(hex.substring(5), 16) / 255;
    return { r, g, b };
}
function cancel() {
    jsDesign.closePlugin();
}
