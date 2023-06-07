//定义移动端尺寸
let documentWidth=document.documentElement.clientWidth;//页面的DOM宽度
let containerWidth=documentWidth*0.92;//容器宽度(游戏界面)
let cellWidth=documentWidth*0.18;//单元格的宽度
let cellSpace=documentWidth*0.04;//单元格间隔宽度



function getPosTop(i){
	return cellSpace+(cellWidth+cellSpace)*i;
}
function getPosLeft(j){
	return cellSpace+(cellWidth+cellSpace)*j;
}

//获取数字背景颜色
function getNumberBackgroundColor(num){
	switch(num){
		case 2:return "#eee4da";break;
		case 4:return "#ede0c8";break;
		case 8:return "#f2b179";break;
		case 16:return "#f59563";break;
		case 32:return "#f67c5f";break;
		case 64:return "#f65e3b";break;
		case 128:return "#edcf72";break;
		case 256:return "#edcc61";break;
		case 512:return "#9c0";break;
		case 1024:return "#33b5e5";break;
		case 2048:return "#09c";break;
		case 4096:return "#a6c";break;
		case 8192:return "#93c";break;
	}
}

//获取数字颜色
function getNumberColor(num){
	if(num<=4){
		return '#776e65';//灰色
	}else{
		return '#fff';//白色
	}
}

//判断是有没有空间
function noSpace(nums){
	//遍历二维数组，如果有值为0，直接返回false,
	//如果遍历结束，值都不为0,返回true
	for(let i=0;i<4;i++){
		for(let j=0;j<4;j++){
			if(nums[i][j]==0){
				return false;
			}

		}
	}
	return true;

}

//判断是否可以向左移动
function canMoveLeft(nums){
	for(let i=0;i<4;i++){
		for(let j=1;j<4;j++){
			if(nums[i][j]!=0){
				//在该数字所在行的前一列等于0或者和当前值相等
				if(nums[i][j-1]==0 ||nums[i][j-1]==nums[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
//判断是否可以向右移动
function canMoveRight(nums){
	for(let i=0;i<4;i++){
		for(let j=0;j<3;j++){
			if(nums[i][j]!=0){
				//在该数字所在行的前一列等于0或者和当前值相等
				if(nums[i][j+1]==0 ||nums[i][j+1]==nums[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

//判断是否可以向上移动
function canMoveUp(nums){
	for(let i=1;i<4;i++){//第一行不考虑
		for(let j=0;j<4;j++){
			if(nums[i][j]!=0){
				//在该数字所在行的前一列等于0或者和当前值相等
				if(nums[i-1][j]==0 ||nums[i-1][j]==nums[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
//判断是否可以向下移动
function canMoveDown(nums){
	for(let i=0;i<3;i++){
		for(let j=0;j<4;j++){
			if(nums[i][j]!=0){
				//在该数字所在行的前一列等于0或者和当前值相等
				if(nums[i+1][j]==0 ||nums[i+1][j]==nums[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

//判断水平方向有无障碍物
function noBlockHorizontal(row,col1,col2,nums){
	for(let i=col1+1;i<col2;i++){
		if(nums[row][i]!=0){
			return false;
		}
	}
	return true;
}
//判断垂直方向有无障碍物
function noBlockVertical(col,row1,row2,nums){
	for(let i=row1+1;i<row2;i++){
		if(nums[i][col]!=0){
			return false;
		}
	}
	return true;
}



//更新分数
function updateScore(){
	$('#score').text(score);

}

//判断是否可以移动
function noMove(nums){
  if(canMoveLeft(nums)||canMoveRight(nums)||canMoveUp(nums)||canMoveDown(nums) ){
  	 return false;
  }
  return true;
}

//判断游戏是否结束，两个条件：1:没有空闲单元格2：不能移动
function isGameOver(){
	if(noSpace(nums)&&noMove(nums)){
		alert('game over!!!!');
	}
}