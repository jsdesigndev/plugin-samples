jsDesign.showUI(__html__, { width: 360, height: 182 });

const CUSTOM_NODE_KEY = "isPhosphorIcon";

//监听 由插件ui发送过来的消息和相关数据
jsDesign.ui.onmessage = ({ type, payload }) => {
    switch (type) {
        case "insert"://点击生成icon
            insertIcon(payload);
            break;
        case "drop"://拖拽生成icon
            dropIcon(payload);
            break;
        default:
            break;
    }
};
//通过点击生成icon
function insertIcon(payload) {
    //通过 selection 获取当前 页面 所选中的图层
    const [currentSelection] = jsDesign.currentPage.selection;
    //对于 选中不同图层的情况下，进行边界处理，不重要可忽略
    const injectableNode = getInjectableNode(currentSelection);
    //通过 createNodeFromSvg 方法 将svg字符串创建成节点，可以理解为导入一个svg
    const tempNode = jsDesign.createNodeFromSvg(payload.svg);
    //通过 group 方法 创建一个分组图层
    const node = jsDesign.group(tempNode.children, injectableNode);
    //通过remove 方法清除 createNodeFromSvg所产生的 无用画板
    tempNode.remove();

    const { x, y } = getOffsetVector(currentSelection);
    //设置icon 
    node.name = payload.name;
    node.constrainProportions = true;
    node.x = x + 20;
    node.y = y;
    //setPluginData 方法可以用在任何节点上面 进行存储数据
    node.setPluginData(CUSTOM_NODE_KEY, "true");

    node.children.forEach((child) => ungroup(child, node));
    //将 该节点 设置为 选中状态
    jsDesign.currentPage.selection = [node];
    //将 缩放比 设置为 1
    jsDesign.viewport.zoom = 1;
    // jsDesign.viewport.scrollAndZoomIntoView([node]);
    jsDesign.notify(`${payload.name} 已添加`, { timeout: 2000 });


}
//通过拖拽生成icon
function dropIcon(payload) {
    const { name, svg, dropPosition, windowSize, offset } = payload;

    const { bounds, zoom } = jsDesign.viewport;

    const hasUI = Math.abs((bounds.width * zoom) / windowSize.width) < 0.99;

    const leftPaneWidth = windowSize.width - bounds.width * zoom - 240;

    const xFromCanvas = hasUI
        ? dropPosition.clientX - leftPaneWidth
        : dropPosition.clientX;
    const yFromCanvas = hasUI ? dropPosition.clientY - 40 : dropPosition.clientY;

    const tempNode = jsDesign.createNodeFromSvg(svg);

    const node = jsDesign.group(tempNode.children, jsDesign.currentPage);

    tempNode.remove();

    node.name = name;

    node.constrainProportions = true;

    node.x = bounds.x + xFromCanvas / zoom - offset.x;

    node.y = bounds.y + yFromCanvas / zoom - offset.y;

    node.setPluginData(CUSTOM_NODE_KEY, "true");

    node.children.forEach((child) => ungroup(child, node));

    jsDesign.currentPage.selection = [node];

    jsDesign.notify(`${name} 已添加`, { timeout: 2000 });
}

function nodeSupportsChildren(node) {
    return (
        (node && node.type === "COMPONENT") ||
        (node && node.type === "FRAME") ||
        (node && node.type === "GROUP")
    );
}


function getInjectableNode(node) {
    if (!node) {
        return jsDesign.currentPage;
    }
    if (!nodeIsIcon(node) && nodeSupportsChildren(node)) {
        return node;
    }
    if (node.parent) {
        return node.parent;
    }
    return jsDesign.currentPage;
}

//将 分组图层解开
function ungroup(node, parent) {
    if (node.type === "GROUP") {
        node.children.forEach((grandchild) => {
            ungroup(grandchild, parent);
        });
        return;
    }
    parent.appendChild(node);
}

function nodeIsIcon(node) {
    //getPluginData 读取该节点上面的信息，来判断 选中的图层 是否是自己生成的icon
    return node && node.getPluginData(CUSTOM_NODE_KEY) === "true";
}

function getOffsetVector(node) {
    if (nodeIsIcon(node)) {
        return {
            x: node.x + 32,
            y: node.y,
        };
    }
    if (nodeSupportsChildren(node)) {
        return {
            x: node.width / 2 - 16,
            y: node.height / 2 - 16,
        };
    }
    if (node && "width" in node) {
        return {
            x: node.x + node.width / 2 - 16,
            y: node.y + node.height / 2 - 16,
        };
    }

    return jsDesign.viewport.center;
}