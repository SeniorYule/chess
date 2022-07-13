import React, { FC } from 'react'
import { Figure } from '../models/figures/Figure'


interface LostFigureProps{
    title : string
    figures: Figure[]
}
const LostFigure: FC<LostFigureProps> = ({title , figures}) => {
  return (
    <div className='Lost'>
        <h3>{title}
        {figures.map(figure =>
            <div key={figure.id}>
                {figure.name} {figure.logo && <img src={figure.logo}/>}
            </div>)}
        </h3>
    </div>
  )
}

export default LostFigure