jsDesign.showUI(__html__);
jsDesign.ui.onmessage = (msg) => {
    if (msg.type === "create-rectangles") {
        const nodes = [];
        for (let i = 0; i < msg.count; i++) {
            const rect = jsDesign.createRectangle();
            rect.x = i * 150;
            rect.fills = [{ type: "SOLID", color: { r: 1, g: 0.5, b: 0 } }];
            jsDesign.currentPage.appendChild(rect);
            nodes.push(rect);
        }
        jsDesign.currentPage.selection = nodes;
        jsDesign.viewport.scrollAndZoomIntoView(nodes);
    }
    jsDesign.closePlugin();
};
