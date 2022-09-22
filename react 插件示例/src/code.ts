jsDesign.showUI(__html__);

jsDesign.ui.onmessage = (msg) => {
  if (msg.type === "create-rectangles") {
    const nodes = [];

    for (let i = 0; i < msg.count; i++) {
      const rect = jsDesign.createRectangle();
      rect.x = i * 150;
      rect.fills = [{ type: "SOLID", color: { r: 0.8, g: 0.8, b: 0.8 } }];
      jsDesign.currentPage.appendChild(rect);
      nodes.push(rect);
    }

    jsDesign.currentPage.selection = nodes;
    jsDesign.viewport.scrollAndZoomIntoView(nodes);
  }

  jsDesign.closePlugin();
};