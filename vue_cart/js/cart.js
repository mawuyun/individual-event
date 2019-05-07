new Vue({
	el:'#app',
	data:{
		cartData:{},
		isAllCheck:false,
	},
	filters:{
		yuan:function(value){
			return value + "元";
		}
	},
	mounted: function(){

		this.getCartData();

	},
	methods: {
		getCartData:function(){ // 获取数据
			var _this = this;
			_this.$http.get("data/cartData.json")
			.then(function(res){
				console.log(res.data.result.list);
				_this.cartData = res.data.result.list;
			},
			function(error){
				console.log(error);
			})
		},
		changeTheNumber:function(item,add){ //点击选择商品数量 改变商品总金额
			if(add > 0){
				item.productQuantity++;
			}else{
				item.productQuantity--;
				if(item.productQuantity <= 0){
					item.productQuantity = 1;
				}
			}
		},
		productCheck:function(item){ // 点击选择
			if(typeof item.isCheck == "undefined"){
				this.$set(item,"isCheck",true);
			}else{
				item.isCheck = !item.isCheck;
			}
		},
		changeAllCheck:function(isOk){
			var _this = this;
			_this.isAllCheck = isOk;
			_this.cartData.forEach(function(item,index){
				if(typeof item.isCheck == "undefined"){
					_this.$set(item,"isCheck",_this.isAllCheck);
				}else{
					item.isCheck = _this.isAllCheck;
				}
			})
		},
		deteleItem:function(item,index){
			var _this = this;
			_this.cartData.splice(index,1);
		}
	}
});