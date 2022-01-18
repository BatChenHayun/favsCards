import React, {useState, useEffect} from "react";
import PageHeader from "./common/pageHeader";
import TextParagraph from "./common/textParagraph";
import Card from "./card";
import { toast } from "react-toastify";
import userService from "../services/userService";


function MyFavsCards(props) {
    const[cards, setCards]=useState([])
    const[favs, setFavs]=useState([])
    const[user,setUser]=useState(null)
   
    useEffect(()=>{
        setDataFromServer();
    },[])

    let setDataFromServer=async()=> {
        setUser(userService.getCurrentUser());
        setCards(await userService.getMyFavsCards());
        setFavs(await getNumOfDredded())
    }

    let getNumOfDredded = async () => {
        let helpArr = [];
        const data = await userService.getMyFavsCards();
        //insert only num cards to array
        for (let i = 0; i < data.length; i++) {
            helpArr.push(data[i].dressedNumber)
        }
        return helpArr;

    }

    let addToFavs = async (_numDressed) => {
        if (favs.includes(_numDressed)) {
            favs.splice(favs.indexOf(_numDressed), 1);
        }
        else
            favs.push(_numDressed);
        const { data } = await userService.insertCardsFavs(favs)
        setFavs(data);
        toast("card is deleted from favs");
        setDataFromServer();
    }

    let buttonClass = (cardId) => {
        let classes = "btn btn-sm ";
        classes += favs.includes(cardId) ? "btn-secondary" : "btn-primary";
        return classes;
    }

    let handleCancel = () => {
        props.history.push("/");
    };

    return (
            <div className="container">
                <PageHeader textHeader="My Favs Cards Page" />
                <div className="row">
                    <div className="col-12">
                        <TextParagraph textParagraph="Your Favs cards in the list below..." />
                    </div>

                </div>
                <div className="row">
                    {cards.length ?
                        cards.map(card => <Card key={card._id} card={card}user={user}
                            handleFavs={() => addToFavs(card.dressedNumber)} buttonClass={buttonClass(card.dressedNumber)}
                        />) : <div className="col-12 text-center"><p>No favorites cards....</p></div>}
                </div>
                <div className="row justify-content-center">
                    <div className=" align-items-center">
                        <button
                            className="btn btn-success align-center"
                            onClick={handleCancel}>
                            back to home page
                        </button>
                    </div>
                </div>


            </div>
        );
    
}

export default MyFavsCards;