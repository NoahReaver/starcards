import React from 'react'
import { useState } from "react";
import { storage } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import createPackCardsAdmin from './../../redux/actions/admin/cardPacksMod'
import getAllCards from './../../redux/actions/cards/getAllCards';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function CreatePacks() {
    //packs
    async function uploadFilePack(file, name) {
        const storageRef = ref(storage, `packs/${name}`); //nombre de ref para la subida
        await uploadBytes(storageRef, file); //subida del archivo
        const url = await getDownloadURL(storageRef); //la url de la subida
        return url;
    }

    const dispatch = useDispatch();
    const allcards = useSelector((state)=>state.album.cards);

    useEffect(()=>{
      dispatch(getAllCards());
    }, [dispatch])


    //hooks
    const [file, setFile] = useState(null);
    //packs
    const [namepack, setNamepack] = useState('');
    const [errors, setErrors] = useState('')

    const [input, setInput] = useState({
        name: '',
        price: '',
        race: [],
        cards: 
            [],
        stock: '',
        image: null,
        amount: ''
    });

    const handleChange = (e)=>{
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    }

    const handleSelect = (e)=>{
        let arraycards = [];
        if(input.cards.includes(e.target.value)){
            alert('Otra raza');
        }else{
            if(input.cards.includes(e.target.value)){
                alert('Otra carta literal')
            }else{
                setInput({
                    ...input,
                    race: [...input.race, e.target.value],
                    cards:[...input.cards,[e.target.value]],
                });
                e.target.value = 'Select Card'
            }
        }
    }

    const handleSubmitPack = async (e) => {
        e.preventDefault();
        try {
        
        const result = await uploadFilePack(file, input.name);
            //console.log(result);
        input.image = result
        dispatch(createPackCardsAdmin(input))
        } catch (error) {
            alert('intentelo otra vez');
        }
    };

    const handleDelete = (e)=>{
      setInput({
        ...input,
        cards: input.cards.filter((card)=>card!==e)
      });
    };


    return (
      <>
      <h1>New Pack</h1>
        <form onSubmit={handleSubmitPack}>
        <input
          type="text"
          name="name"
          value={input.name}
          onChange={(e) => handleChange(e)}
          placeholder="Name pack"
        />
        <input
          type="number"
          name="price"
          min="1"
          max="3000"
          value={input.price}
          onChange={(e) => handleChange(e)}
          placeholder="Precio"
        />
        <input
          type="text"
          name="amount"
          value={input.amount}
          onChange={(e) => handleChange(e)}
          placeholder="Amount"
        />
        <input
          type="number"
          name="stock"
          value={input.stock}
          onChange={(e) => handleChange(e)}
          placeholder="stock"
        />
        <div>
          <select 
            onChange={(e)=>handleSelect(e)}
          >
            <option disabled selected>Raza:</option>
            <option value="Zerg">Zerg</option>
            <option value="Terran">Terran</option>
            <option value="Protoss">Protoss</option>
          </select>
        </div>
        <div>
        <select
          onChange={(e)=>{handleSelect(e);}}
        >
           <option disabled selected>Selecciona una opción</option>
          {allcards?.map((e)=>{
            return (
              <option value={e.name}>
                {e.name}
              </option>
            );
          })}
        </select>
          </div>

        <input
          type="file"
          name=""
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button>new Pack</button>
      </form>

      {/* muestra */}
      <div>
        {input.cards?.map((e)=>{
          return(
            <div>
              <p>{e}</p>
              <input type="text" onChange={(e)=>handleChange(e)} />
              <button 
                onClick={()=>{
                  handleDelete(e);
                }}
              >
                x
              </button>
            </div>
          )
        })}
      </div>


    </>
  )
}

export default CreatePacks