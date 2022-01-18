import React, { useState, useEffect } from "react";
import PageHeader from "./common/pageHeader";
import TextParagraph from "./common/textParagraph";
import CardBiz from "./cardBiz";
import cardService from "../services/cardService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


function MyCards() {

    const [cards, setCards] = useState([])
   
    useEffect(()=>{
        setDataFromServer();
    },[])


    let setDataFromServer= async () =>{
        const { data } = await cardService.getMyCards();
        if (data.length >= 0){
            setCards(data);
        }
    }

    let deleteCard = async (cardID) => {
        await cardService.deleteCard(cardID);
        toast("card is deleted");
        setDataFromServer();
    }

        return (
            <div className="container">
                <PageHeader textHeader="My Cards Page" />
                <div className="row">
                    <div className="col-12">
                        <TextParagraph textParagraph="Your cards in the list below..." />
                    </div>
                    <div className="col-12 text-center">
                        <Link className="btn btn-primary" to="/create-card">Add a new card</Link>
                    </div>
                </div>
                <div className="row">
                    {cards.length ?
                        cards.map(card => <CardBiz key={card._id} card={card}
                            onDelete={() => deleteCard(card._id)}
                        />) : <div className="col-12 text-center"><p>No cards to show, creat card...</p></div>}
                </div>
            </div>
        );
    
}

export default MyCards;