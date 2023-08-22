export default function genPassRateOptions(count: number, total: number) {
	const rate = Number((count / (total || 1)) * 100).toFixed(0)

	return {
		title: {
			text: `${rate}%`,
			left: 'center',
			top: 'center',
			textStyle: {
				color: 'rgba(31,223,236,1)',
				fontSize: '30px',
				align: 'center',
				fontFamily: 'Digital'
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
