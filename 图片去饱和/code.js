// 允许的图层类型
const legalNodeTypes = ['COMPONENT', 'COMPONENT_SET', 'ELLIPSE', 'FRAME', 'GROUP', 'INSTANCE', 'LINE', 'POLYGON', 'RECTANGLE', 'SLICE', 'STAR', 'VECTOR'];
// 已去饱和的图片数量
let desaturatedImageCount = 0;
// 判断是否选中图层
if (jsDesign.currentPage.selection.length > 0) {
    // 循环处理选中图层中的所有图层
    for (const node of jsDesign.currentPage.selection) {
        // 处理图层及其子图层
        desaturateNodeTree(node);
    }
    if (desaturatedImageCount > 0) {
        notify(desaturatedImageCount + '张图片已去饱和');
    }
    else {
        notify('无需去饱和，请检查所选内容。');
    }
}
else {
    notify('未选择任何内容，选择具有图像填充的内容以降低饱和度。');
}
jsDesign.closePlugin();
function notify(message, timeout = 3000) {
    // 弹出 toast 提示
    jsDesign.notify(message, { timeout });
}
/**
 * 处理图层
 * @param node 传入去饱和度的图层
 */
function desaturateNodeTree(node) {
    // 如果不是允许的图层类型或已经去饱和则退出
    if (!isNodeAllowed(node) || !isImageSaturated(node))
        return;
    // fills: 填充, 是涂层的属性, 数组类型, 可以
    const fills = Array.isArray(node.fills) ? _clone(node.fills) : [_clone(node.fills)];
    for (const fill of fills) {
        if (fill.type === 'IMAGE') {
            desaturateFill(fill);
            desaturatedImageCount++;
        }
    }
    node.fills = fills;
    // 递归的对图层子节点进行去饱和
    if ('children' in node) {
        for (const child of node.children) {
            desaturateNodeTree(child);
        }
    }
}
// 判断是否是允许的节点
function isNodeAllowed(node) {
    return legalNodeTypes.includes(node.type);
}
function isImageSaturated(node) {
    if (!node.fills)
        return false;
    const fills = Array.isArray(node.fills) ? node.fills : [node.fills];
    // 遍历图层填充, 判断是否是图片填充以及是否已经去饱和
    return fills.some((fill) => fill.type === 'IMAGE' && fill.filters.saturation > -1);
}
// 去饱和
function desaturateFill(fill) {
    fill.filters.saturation = -1;
}
// 克隆图层填充
function _clone(val) {
    const type = typeof val;
    if (val === null) {
        return null;
    }
    else if (type === 'undefined' || type === 'number' || type === 'string' || type === 'boolean') {
        return val;
    }
    else if (type === 'object') {
        if (val instanceof Array) {
            return val.map((x) => _clone(x));
        }
        else if (val instanceof Uint8Array) {
            return new Uint8Array(val);
        }
        else {
            let o = {};
            for (const key in val) {
                o[key] = _clone(val[key]);
            }
            return o;
        }
    }
    throw 'unknown';
}
