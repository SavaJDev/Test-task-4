$(document).ready(function(){
    
    /*Массив игрового поля*/
    let playField=[
            ["A1","A2","A3","A4","A5","A6","A7","A8"],
            ["B1","B2","B3","B4","B5","B6","B7","B8"],
            ["C1","C2","C3","C4","C5","C6","C7","C8"],
            ["D1","D2","D3","D4","D5","D6","D7","D8"],
            ["E1","E2","E3","E4","E5","E6","E7","E8"],
            ["F1","F2","F3","F4","F5","F6","F7","F8"],
            ["G1","G2","G3","G4","G5","G6","G7","G8"],
            ["H1","H2","H3","H4","H5","H6","H7","H8"],
        ];
    
    let x=0; 
    let y=0;
    let arrSteps = []; /*Массив с возможными вариантами хода*/
    
    let prevCell=0; /*Расположение предыдущей ячейки*/
    let nextCell;   /*Следующая (текущая) ячейка*/
    
    let prevCellsStep = []; /*Массив с ранее подсвеченными ячейками возможных ходов на игровом поле*/
    
    $('.cell_game, .cell_game_black').click(function() { 
        
        /*Обнуляем массив с возможными ходами*/
       arrSteps.length=0;
       
       /*Обнуляем массив и удаляем классы от "подсвеченных" ячеек*/    
       if((prevCellsStep.length)!=0){ 
           for(let s=0;s<prevCellsStep.length;s++){
               prevCellsStep[s].removeClass('cell_step');
           };
           prevCellsStep.length=0;
        };
           
           
       /*Снимаем выделение предыдущей ячейки, если было*/    
       if(prevCell!=0) prevCell.removeClass('cell_click');    
       nextCell=$(this); 
        
       /*Ячейка по которой кликнули, добавляем класс (окрашиваем в синий), считываем значение ячейки*/ 
       $(this).addClass('cell_click');
       let valueCell = $(this).html();
        
       let search=0; /*Переменная исходного положения*/
       let i=0;   
           
       /*Поиск координат в массиве игрового поля, исходя из начального положения*/ 
       for(i=0;i<playField.length;i++){
           search=playField[i].indexOf(valueCell);
           if(search!=-1) break; 
       }; 

        /*Массивы "x" и "y" координат возможного движения фигуры*/
        let arrY = [2, 1, -1, -2, 2, 1, -1, -2];
        let arrX = [1, 2, 2, 1, -1, -2, -2, -1];
        
        /*Формирование массива с возможными вариантами хода в цикле*/
        for(let j=0;j<arrY.length;j++){

            y=i+arrY[j];
            x=search+arrX[j];
            
            provisionCondition();
        };           
        
        /*В цикле проводится поиск ячеек, удовлетворяющих условия, на игровом поле и добавление класса для окрашивания в зеленый цвет*/
        for(let n=0;n<arrSteps.length;n++) {
            let valArr=arrSteps[n];
            
          for(let q=0;q<100;q++) {
            let $findCell = $('table td:eq(' + q + ')');
            let valCell = $findCell.html();
              if(valCell==valArr) {
                $findCell.addClass('cell_step');
                prevCellsStep.push($findCell);  
               }; 
              
            };
        };
    
      /*для дальнейшего удаления класса и восстановления цвета ячейки*/       
       prevCell=nextCell;    
    });
    
    /*Функция проверки условия, чтобы не выйти за пределы поля(массива)*/
    function provisionCondition() {
        let step;
        
        if((y<8 && y>=0) && (x<8 && x>=0)) {
            step=playField[y][x];
            arrSteps.push(step);
        };
        y=x=0;
    };
});