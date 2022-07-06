//不显示 插件ui
jsDesign.showUI('', { visible: false })
//获取画布当前页 选中的 图层
const selection = jsDesign.currentPage.selection;

let note = null;

let allowBox = ['GROUP', 'BOOLEAN_OPERATION']

const CommandHorizontal = "h";

const CommandVertical = "v";

if (selection.length > 0) {

    let unframed = [];

    selection.forEach(node => {

        const cl = node
        //通过parent 获取node 的父级
        const container = node.parent;

        if (container.type === 'PAGE') {

            jsDesign.notify('请选中含有父级的图层运行插件')

            return;

        } else if (container.type === 'INSTANCE') {//对于实例组件不支持调整

            jsDesign.notify('此元素不支持尺寸调整')

            return;
        }

        const cs = cl.constraints

        //constrainProportions 获取当前图层 是否处于 宽高比 锁定状态
        if (node.constrainProportions) {

            jsDesign.notify('此元素不支持同时调整')

            return;

        }
        //通过 resize 的方法 改变宽高，其子元素将会被等比缩放。
        //jsDesign.command 可以获取 描述文件中 menu 所配置的 command属性值
        switch (jsDesign.command) {
            case CommandHorizontal: {
                if (allowBox.indexOf(node.type) == -1 && cs.horizontal == "MIN") cl.constraints = { horizontal: "STRETCH", vertical: cs.vertical };
                cl.resize(container.width, cl.height);
                cl.x = 0;
                break;
            }
            case CommandVertical: {
                if (allowBox.indexOf(node.type) == -1 && cs.vertical == "MIN") cl.constraints = { horizontal: cs.horizontal, vertical: "STRETCH" };
                cl.resize(cl.width, container.height);
                cl.y = 0;
                break;
            }
            default: {
                if (allowBox.indexOf(node.type) == -1 && cs.horizontal == "MIN" && cs.vertical == "MIN") cl.constraints = { horizontal: "STRETCH", vertical: "STRETCH" };
                cl.resize(container.width, container.height);
                cl.x = cl.y = 0;
                break;
            }
        }

        //对于隐藏的图层进行 拉伸并显示处理
        if (!node.visible) {
            node.visible = true;
        }
        if (!container.visible) {
            container.visible = true;
        }

    });

    if (unframed.length > 0) jsDesign.currentPage.selection = unframed;

} else {
    note = '请选中画板内部图层运行插件';
}

if (note) jsDesign.notify(note);

// jsDesign.closePlugin(); 用来关闭插件

