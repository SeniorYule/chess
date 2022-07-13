import { Board } from "./Board";
import { Colors } from "./Colors";
import { Figure } from "./figures/Figure";

export class Cell{
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: Figure | null;
    board: Board;
    available: boolean; /// Можешь ли переместиться
    id : number; /// Для реакт ключей
    
    constructor(board: Board, x: number, y:number, color: Colors, figure: Figure | null){
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure =figure;
        this.board = board;
        this.available = false;
        this.id = Math.random()


    }

    isEmty() : boolean{
        return this.figure === null
    }

    isEnemy(target : Cell): boolean{
        if(target.figure){
            return this.figure?.color !== target.figure.color
        }
        return false
    }

    isEmtyVertical(target: Cell):boolean{
        if(this.y !== target.y){
            return false
        }

        const min = Math.min(this.x, target.x)
        const max = Math.max(this.x, target.x)
        for (let x = min + 1; x < max; x++) {
            if(!this.board.getCell(x, this.y).isEmty()){
                return false
            }
        }
        return true
    }

    isEmtyHorizontal(target: Cell):boolean{
        if(this.x !== target.x){
            return false
        }

        const min = Math.min(this.y, target.y)
        const max = Math.max(this.y, target.y)
        for (let y = min + 1; y < max; y++) {
            if(!this.board.getCell(this.x, y).isEmty()){
                return false
            }
        }
        return true
    }

    isEmtyDiagonal(target: Cell):boolean{
        const absX = Math.abs(target.x - this.x)
        const absY = Math.abs(target.y - this.y)
        if(absX !== absY)
            return false
        
        const dy = this.y < target.y ? 1 : -1
        const dx = this.x < target.x ? 1 : -1

        for (let i = 1; i < absY; i++) {
            if(!this.board.getCell(this.x + dx * i, this.y + dy * i ).isEmty())
                return false
            
        }
        return true
    } 

    setFigure(figure: Figure){
        this.figure = figure
        this.figure.cell = this
    }


    addLostFigure(figure: Figure){
        figure.color === Colors.BLACK
        ? this.board.lostBlackFigure.push(figure)
        : this.board.lostWhiteFigure.push(figure)
    }

    moveFigure(target: Cell){
        if( this.figure && this.figure?.canMove(target)){
            this.figure.moveFigure(target)
            if(target.figure){
                this.addLostFigure(target.figure)
            }
            target.setFigure(this.figure)
            this.figure = null 
        }
    }
}