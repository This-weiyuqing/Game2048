function showNumberWithAnimation(i,j,randNum){
	let numberCell = $('#number-cell-'+i+'-'+j);
	numberCell.css('background-color',getNumberBackgroundColor(randNum));
	numberCell.css('color',getNumberColor(randNum));
	numberCell.text(randNum);
	//设置自定义动画，显示数字
	//第一个参数是一个json格式：{key:value,key:value}
	numberCell.animate({
		width:cellWidth,
		height:cellWidth,
		top:getPosTop(i),
		left:getPosLeft(j)

	},500);
	
}

function showMoveAnimation(fromx,fromy,tox,toy){
	let numberCell=$(`#number-cell-${fromx}-${fromy}`);
	numberCell.animate({
		top:getPosTop(tox),
		left:getPosLeft(toy)
	},200);

}