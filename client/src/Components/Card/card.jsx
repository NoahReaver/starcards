import React from 'react'
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import detailCard from '../../redux/acinions/cards/detailCard'
import getOpinions from '../../redux/acinions/cards/getOptions'

export default function Card ({ id, name, image, cost, Gdmg, Admg, life, ability, abilities, race, movement }) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  function detailCard(){
    dispatch(cardDetail(id)) //dispach hay que hacer
    dispatch(getOpinions(id)) //dispach hay que hacer
    navigate("/detail")
  }
  return (
    <div onClick={() => detailCard()}>
      <h3>{name}</h3>
      <img src={image} alt={image} />
      <div>
        <p>cost:{cost}</p>
        <p>Gdmg:{Gdmg}</p>
        <p>Admg:{Admg}</p>
        <p>life:{life}</p>
        <p>ability:{ability}</p>
        <p>abilities:{abilities}</p>
        <p>race:{race}</p>
        <p>movement:{movement}</p>
      </div>
    </div>
  )
}
