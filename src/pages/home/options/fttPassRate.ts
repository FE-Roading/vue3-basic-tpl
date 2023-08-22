export default function genFttPassRateOptions(count: number, total: number) {
	return {
		title: {
			text: `{a|${count}}{s|｜}{b|${ total }}`,
			left: 'center',
			top: 'center',
			textStyle: {
				fontSize: '30px',
				fontWeight: "normal",
				align: 'center',
				rich: {
					a: {
						color: "#c80a17",
						fontSize: '30px',
					},
					s: {
						color: "#01A6EE",
						fontSize: '20px',
					},
					b: {
						color: "#01A6EE",
						fontSize: '30px',
					}
				}
			},
			
		},
		tooltip: {
			show: false,
			trigger: 'item',
			showContent: false,
			triggerOn: 'none'
		},
		series: [
			{
				type: 'pie',
				radius: ['85%', '100%'],
				color: ["#01A6EE", "#c80a17"],
				label: {
					normal: {
						show: false, //展示
					}
				},
				emphasis: {
					disabled: true,
				},
				itemStyle: {
					borderRadius: [0, 15, 0, 15]
				},
				data: [
					{ value: total, name: '通过' },
					{ value: count, name: '未通过' }
				]
			}
		]
	}
}
