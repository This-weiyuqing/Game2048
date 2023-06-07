let nums= new Array();
let score=0;
let hasConflicted=new Array();//定义一个二维数组，默认为false,如果该棋子被合并，赋值为true,不能进行合并

//定义滑动时的坐标
let startX=0;
let startY=0;
let endX=0;
let endY=0;

$(function(){
	newGame();

});

//开始新游戏
function newGame(){
	if(documentWidth>500){
		containerWidth=500;
		cellWidth=100;
		cellSpace=20;
	}
	else{
		//设置移动端尺寸
		settingForMobile();
	}
	//初始化棋盘
	init();
	//在随机的空白格子中显示2或者4
	generateOneNumber();
	generateOneNumber();

}

function settingForMobile(){
	$('#header .wrapper').css('width',containerWidth);
	$('#header .score-wrapper').css('width',cellWidth);
	$('#header .newgame-wrapper #newGame').css('width',cellWidth);
	$('#grid_container').css('width',containerWidth-cellSpace*2);
	$('#grid_container').css('height',containerWidth-cellSpace*2);
	$('#grid_container').css('padding',cellSpace);
	$('#grid_container').css('border-radius',containerWidth*0.02);

	$('.grid-cell').css('width',cellWidth);
	$('.grid-cell').css('height',cellWidth);
	$('.grid-cell').css('border-radius',containerWidth*0.02);	



}

function init(){
	for(let i=0;i<4;i++){
		for(let j=0;j<4;j++){
			//找到这16个棋盘
			//let gridCell = $(`#grid-cell-${i}-${j}`);
			let gridCell = $('#grid-cell-'+i+'-'+j);
			gridCell.css('top',getPosTop(i));
			gridCell.css('left',getPosLeft(j));
		}
	}


	//初始化数组
	for(let i=0;i<4;i++){
		nums[i]=new Array();
		hasConflicted[i]=new Array();
		for(let j=0;j<4;j++){
			nums[i][j]=0;
			//定义一个二维数组，默认为false
			hasConflicted[i][j]=false;
		}
	}
	//手动设置三个初值
	// nums[0][1]=16;
	// nums[1][3]=32;
	// nums[2][2]=4;

	//动态创建上层单元格，并初始化
	updateView();

	score=0;
	updateScore(score);



	

}
/*
	在随机的空白格子中显示2或者4
	1.在空闲的单元格中随机找一个
	2.随机产生一个数：2/4

	i,j--->k
    i*4+j--->k
    2*4+2--->10
    i=k/4=2
    j=k%4=2


 */
function generateOneNumber(){

	//判断是否还有空闲空间，如果没有，直接返回
	if(noSpace(nums)){
		return;
	}

	//定义一个存储的一维数组
    let temp = new Array();
    //定义一维数组的下标，默认从0开始
    let count=0;
	for(let i=0;i<4;i++){
		for(let j=0;j<4;j++){
			if(nums[i][j]==0){
				temp[count]=i*4+j;//1*4+3=7-->7/4=1,7%4=3
				count++;

			}
		}
	}
	let pos = Math.floor(Math.random()*count);//随机获取0---n-1的随机值
	//根据一维数组中的值，反射成二维坐标
	let randX=Math.floor(temp[pos]/4);
	let randY=Math.floor(temp[pos]%4);
	let randNum = Math.random()<0.5?2:4;
	//在当前二维坐标下赋值2/4
	nums[randX][randY]=randNum;
	//console.log(randX,randY,randNum);
	//使用动画效果显示数字
	showNumberWithAnimation(randX,randY,randNum);


}

//更新上层单元格视图
function updateView(){

	//将上层所有单元格清空，然后重新初始创建
	$('.number-cell').remove();

	for(let i=0;i<4;i++){
		for(let j=0;j<4;j++){

			$('#grid_container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			let numberCell=$('#number-cell-'+i+'-'+j);
			//如果值为0，将值放入对应位置，长高为0
			if(nums[i][j]==0){
				numberCell.css('top',getPosTop(i)+cellWidth*0.5);
				numberCell.css('left',getPosLeft(j)+cellWidth*0.5);
				numberCell.css('width','0px');
				numberCell.css('height','0px');

			}	
			//如果值不为0，将值放入对应位置，长高为100px，重新设置其数字和颜色，背景色
			else{
				numberCell.css('top',getPosTop(i));
				numberCell.css('left',getPosLeft(j));
				numberCell.css('width',cellWidth);
				numberCell.css('height',cellWidth);
				numberCell.css('background-color',getNumberBackgroundColor(nums[i][j]));
				numberCell.css('color',getNumberColor(nums[i][j]));
				numberCell.text(nums[i][j]);
			}

			//恢复格子的状态位，让其能继续可以合并
			hasConflicted[i][j]=false;

			//适配移动端尺寸
			$('.number-cell').css('border-radius',cellWidth*0.02);
			$('.number-cell').css('font-size',cellWidth*0.5);
			$('.number-cell').css('line-height',cellWidth+'px');

			

			
		}
	}

}

//实现键盘点击事件
$(document).keydown(function(e){
	//阻止事件的默认动作执行，如触发滚动条移动
	e.preventDefault();
	//console.log(e.keyCode);
	switch (e.keyCode) {
		case 37: //left
			//判断是否可以向左移动
			if(canMoveLeft(nums)){
				moveLeft();
				setTimeout(generateOneNumber,200);
				setTimeout(isGameOver,500);
			}
			
			break;
		case 38: //up
			//判断是否可以向上移动
			if(canMoveUp(nums)){
				moveUp();
				setTimeout(generateOneNumber,200);
				setTimeout(isGameOver,500);
			}
			break;
		case 39: //right
			//判断是否可以向右移动
			if(canMoveRight(nums)){
				//console.log(1);
				moveRight();
				setTimeout(generateOneNumber,200);
				setTimeout(isGameOver,500);
			}

			break;
		case 40: //down
			//判断是否可以向下移动
			if(canMoveDown(nums)){
				moveDown();
				setTimeout(generateOneNumber,200);
				setTimeout(isGameOver,500);
			}
			break;
		default:

			break;
	}
});

/*
	向左移动：
	逻辑:
	需要对每一个数字的左边进行判断，选择落脚点，落脚点有2种情况 
	1.落脚点没有数字，并且移动路径中没有障碍物
	2.落脚点数字和自己相同，并且移动路径中没有障碍物

 */
function moveLeft(){
	for(let i=0;i<4;i++){
		for(let j=1;j<4;j++){//从第二列开始
			if(nums[i][j]!=0){
				for(let k=0;k<j;k++){//这个k是你要落脚的列
					if(nums[i][k]==0 && noBlockHorizontal(i,k,j,nums)){//第i行的第k-j列之间是否有障碍
						//左移操作
						showMoveAnimation(i,j,i,k);//设置移动的动画效果
						nums[i][k]=nums[i][j];
						nums[i][j]=0;
						break;//跳出循环，后面的数字不再判断
					}
					else if(nums[i][k]==nums[i][j]&& noBlockHorizontal(i,k,j,nums)&&!hasConflicted[i][k]){
						showMoveAnimation(i,j,i,k);
						// nums[i][k]+=nums[i][j];
						nums[i][k]*=2;
						nums[i][j]=0;
						//统计分数
						score+=nums[i][k];
						//更新分数节点
						updateScore(score);

						hasConflicted[i][k]=true;//如果该棋子被合并，赋值为true,不能进行合并
						break;
						
					}
				}
			}

		}
	}
	//更新页面
	setTimeout(updateView,200);//等待200ms,为了让单元格的动画效果显示完成
}
//向右移动
function moveRight(){
	for(let i=0;i<4;i++){
		for(let j=2;j>=0;j--){//从右边的第二列开始
			if(nums[i][j]!=0){
				for(let k=3;k>j;k--){//这个k是你要落脚的列
					if(nums[i][k]==0 && noBlockHorizontal(i,j,k,nums)){//第i行的第k-j列之间是否有障碍
						//左移操作
						showMoveAnimation(i,j,i,k);//设置移动的动画效果
						nums[i][k]=nums[i][j];
						nums[i][j]=0;
						break;//跳出循环，后面的数字不再判断
					}
					else if(nums[i][k]==nums[i][j]&& noBlockHorizontal(i,j,k,nums)&&!hasConflicted[i][k]){
						showMoveAnimation(i,j,i,k);
						// nums[i][k]+=nums[i][j];
						nums[i][k]*=2;
						nums[i][j]=0;
						//统计分数
						score+=nums[i][k];
						//更新分数节点
						updateScore(score);

						hasConflicted[i][k]=true;//如果该棋子被合并，赋值为true,不能进行合并
						break;
						
					}
				}
			}

		}
	}
	//更新页面
	setTimeout(updateView,200);//等待200ms,为了让单元格的动画效果显示完成
}

function moveUp(){
	for(let j=0;j<4;j++){//j为列
		for(let i=1;i<4;i++){//i为行
			if(nums[i][j]!=0){
				for(let k=0;k<i;k++){//这个k是你要落脚的列
					if(nums[k][j]==0 && noBlockVertical(j,k,i,nums)){//第i行的第k-j列之间是否有障碍
						//左移操作
						showMoveAnimation(i,j,k,j);//设置移动的动画效果
						nums[k][j]=nums[i][j];
						nums[i][j]=0;
						break;//跳出循环，后面的数字不再判断
					}
					else if(nums[k][j]==nums[i][j]&& noBlockVertical(j,k,i,nums)&&!hasConflicted[k][j]){
						showMoveAnimation(i,j,k,j);
						// nums[i][k]+=nums[i][j];
						nums[k][j]*=2;
						nums[i][j]=0;
						//统计分数
						score+=nums[k][j];
						//更新分数节点
						updateScore(score);

						hasConflicted[k][j]=true;//如果该棋子被合并，赋值为true,不能进行合并
						break;
						
					}
				}
			}

		}
	}
	//更新页面
	setTimeout(updateView,200);//等待200ms,为了让单元格的动画效果显示完成
}
function moveDown(){
	for(let j=0;j<4;j++){//j为列
		for(let i=2;i>=0;i--){//i为行
			if(nums[i][j]!=0){
				for(let k=3;k>i;k--){//这个k是你要落脚的列
					if(nums[k][j]==0 && noBlockVertical(j,i,k,nums)){//第i行的第k-j列之间是否有障碍
						//左移操作
						showMoveAnimation(i,j,k,j);//设置移动的动画效果
						nums[k][j]=nums[i][j];
						nums[i][j]=0;
						break;//跳出循环，后面的数字不再判断
					}
					else if(nums[k][j]==nums[i][j]&& noBlockVertical(j,i,k,nums)&&!hasConflicted[k][j]){
						showMoveAnimation(i,j,k,j);
						// nums[i][k]+=nums[i][j];
						nums[k][j]*=2;
						nums[i][j]=0;
						//统计分数
						score+=nums[k][j];
						//更新分数节点
						updateScore(score);

						hasConflicted[k][j]=true;//如果该棋子被合并，赋值为true,不能进行合并
						break;
						
					}
				}
			}

		}
	}
	//更新页面
	setTimeout(updateView,200);//等待200ms,为了让单元格的动画效果显示完成
}

//实现触摸滑动
document.addEventListener('touchstart',function(e){
	//console.log(e);
	startX=e.touches[0].pageX;
	startY=e.touches[0].pageY;
});
document.addEventListener('touchend',function(e){
	//console.log('456-'+e);
	endX=e.changedTouches[0].pageX;
	endY=e.changedTouches[0].pageY;

	//判断滑动方向
	let deltaX=endX-startX;
	let deltaY=endY-startY;

	//判断当前滑动距离小于一定阈值，不做任何操作
	if(Math.abs(deltaX)<documentWidth*0.08 && Math.abs(deltaY)<documentWidth*0.08){
		return;
	}
	//水平方向
	if(Math.abs(deltaX)>=Math.abs(deltaY)){
		//向右移动
		if(deltaX>0){
			if(canMoveRight(nums)){
				//console.log(1);
				moveRight();
				setTimeout(generateOneNumber,200);
				setTimeout(isGameOver,500);
			}			
		}
		//向左移动
		else{
			if(canMoveLeft(nums)){
				moveLeft();
				setTimeout(generateOneNumber,200);
				setTimeout(isGameOver,500);
			}
			
		}
    }
	//垂直方向
	else{
		//向下移动
		if(deltaY>0){
			if(canMoveDown(nums)){
				moveDown();
				setTimeout(generateOneNumber,200);
				setTimeout(isGameOver,500);
			}
		}
		//向上移动
		else{
			if(canMoveUp(nums)){
				moveUp();
				setTimeout(generateOneNumber,200);
				setTimeout(isGameOver,500);
			}			
		}
	

	}

});