export default function genPassRateOptions(count: number, total: number) {
	const rate = Number((count / (total || 1)) * 100).toFixed(0)

	return {
		title: {
			text: `{a|${rate}}{b|%}`,
			left: 'center',
			top: 'center',
			textStyle: {
				align: 'center',
				rich: {
					a: {
						color: "#01A6EE",
						fontSize: '36px',
						fontFamily: "DIN",
						fontWeight: "bold",
					},
					b: {
						color: "#01A6EE",
						fontSize: '30px',
					}
				}
			}
		},
		tooltip: {
			trigger: 'item',
			showContent: false,
			triggerOn: 'none'
		},
		series: [
			{
				type: 'pie',
				radius: ['85%', '100%'],
				color: ["#01A6EE", "#172651"],
				label: {
					normal: {
						show: false, //展示
						position: 'outside', // outside表示文本显示位置为外部
						textStyle: {
							//文本样式
							fontSize: '12',
							fontWeight: '400'
						},
						color: '#fff',
						formatter: `{b}\n\n{c}辆`
					}
				},
				emphasis: {
					disabled: true,
				},
				itemStyle: {
					borderRadius: [0, 15, 0, 15]
				},
				data: [
					{ value: count, name: '在线' },
					{ value: total - count, name: '离线' }
				]
			}
		]
	}
}
