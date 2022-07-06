// 详细内容见开发者文档：https://js.design/developer-doc/Guide/2.Development/4.manifest.json

// 打开 GUI 用户界面 "ui.html".
jsDesign.showUI(__html__, {
	width: 260,
	height: 293,
})

jsDesign.ui.onmessage = (msg) => {
	if (msg.type === 'create-star') create(msg.count, hexToRgb(msg.hex))
	if (msg.type === 'cancel') cancel()
}

function create(count: number, color: RGB) {
	if (count <= 0) return
	const frame = jsDesign.createFrame()
	frame.expanded = true
	frame.layoutMode = 'HORIZONTAL'
	frame.fills = []
	for (let i = 0; i < count; i++) {
		const star = jsDesign.createStar()
		star.name = '星形'
		star.pointCount = 5
		star.fills = [{ type: 'SOLID', color }]
		frame.appendChild(star)
	}
	jsDesign.currentPage.appendChild(frame)
	jsDesign.currentPage.selection = [frame]
	jsDesign.viewport.scrollAndZoomIntoView([frame])
}

function hexToRgb(hex: string): RGB {
	const r = parseInt(hex.substring(1, 3), 16) / 255
	const g = parseInt(hex.substring(3, 5), 16) / 255
	const b = parseInt(hex.substring(5), 16) / 255
	return { r, g, b }
}

function cancel() {
	jsDesign.closePlugin()
}
