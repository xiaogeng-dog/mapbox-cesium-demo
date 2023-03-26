<template>
	<view class="content">
		页面 - 1
	</view>
</template>

<script>
	import amap from '../../../static/utils/amap-wx.130.js'
	export default {
		data() {
			return {
				title: 'Hello'
			};
		},
		onLoad() {},
		mounted() {
			const amapObject = new amap.AMapWX({
				key: 'a06c5230602e0f8dd1bff9fba0158eb8'
			})
			amapObject.getRegeo({
				success: (res) => {
					console.log(res, res[0].regeocodeData.formatted_address)
				},
				fail: (err) => {
					console.log(err)
				}
			})
		},
		methods: {}
	};
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
		margin-top: 200upx;
	}
</style>