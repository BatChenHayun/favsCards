import React, { useState, useEffect } from "react";
import TextHeader from "./common/pageHeader";
import TextParagraph from "./common/textParagraph";
import Card from "./card";
import cardService from "../services/cardService";
import userService from "../services/userService";

function Home(props) {

    const [cards, setCards]=useState([]);
    const [favs, setFavs]=useState([]);
    const [input, setInput]=useState("");
    const [user, setUser]=useState(userService.getCurrentUser());

    useEffect( ()=>{
        async function fetchData(){
            const { data } = await cardService.getAllCards();
            setCards(data); 
            if (user) {
             setFavs(await getNumOfDredded())
            } 
        }
        fetchData();        
    },[user])

    //search items
    let handleSearchChange = (e) => {
        let updateInput = input;
        updateInput = e.target.value;
        setInput(updateInput);   
    }

    let handleSearchSubmit = async () => {
        try {
            let result = await cardService.searchCards(input)
            setCards(result)
        }
        catch (ex) {
            console.log(ex);
        }
    }

    //Initializing user's favs cards if they are
    let getNumOfDredded = async () => {
        let helpArr = [];
        const data = await userService.getMyFavsCards();
        //insert only num cards to array
        for (let i = 0; i < data.length; i++) {
            helpArr.push(data[i].dressedNumber)
        }
        return helpArr;
    }

    //add item to favorite
    let addToFavs = async (_numDressed) => {
        if (favs.includes(_numDressed)) {
            favs.splice(favs.indexOf(_numDressed), 1);
        }
        else
            favs.push(_numDressed);
        const { data } = await userService.insertCardsFavs(favs)
        setFavs(data);
    }

    
    let buttonClass = (cardId) => {
        let classes = "btn btn-sm ";
        classes += favs.includes(cardId) ? "btn-secondary" : "btn-primary";
        return classes;
    }

    let handleMyFavsCards = () => {
        if (user)
            props.history.push("/my-favs");
        else
            alert("signin to site first");
    };

    return (
            <>
                <div className="box">
                    <div className="row">
                        <div className="mainHeader col-12 mt-4">
                            <TextHeader textHeader="Fashion Cards"></TextHeader>
                        </div>
                    </div>
                </div>
                <div class="blackline bg-dark"></div>

                <div className="box2">
                    <p id="box2text" className="text-center">
                        <div className="row">
                            <div className="col-12 text-white"  >
                                <TextParagraph textParagraph="all fashion is here..."></TextParagraph>
                            </div>
                        </div>
                    </p>
                </div>
                <div class="blackline bg-dark"></div>


                <div className="container box1">
                    <div className="row p-5">
                        <div className="row input-group rounded d-flex col-6 ">
                            <input type="search" className="input form-control" placeholder="Search" aria-label="Search"
                                aria-describedby="search-addon" onChange={handleSearchChange}
                            />
                            <span className="input-group-text p-0" id="search-addon">
                                <button className="bg-white border border-bottom border-dark" onClick={handleSearchSubmit}>
                                    <i className="fas fa-search p-2 bg-white "></i>
                                </button>
                            </span>
                        </div>
                        <div className="col-6 d-flex justify-content-around ">
                            <div className="align-items-center">
                                <button className="btn btn-success" onClick={handleMyFavsCards} >To my favs cards</button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {cards.map(card => <Card key={card._id} card={card} user={user} handleFavs={() => addToFavs(card.dressedNumber)} buttonClass={buttonClass(card.dressedNumber)} />)}
                    </div>
                </div >
            </>
        );
}


export default Home;