import React from "react";

const Card = ({ card,  handleFavs, buttonClass, user }) => {
    return (
        <>
            <div className="col-lg-4" >
                <div className="card m-4">
                    <img className="p-2 card-img-top" style={{
                        borderRadius: "50px"
                    }}
                        src={card.dressedImage}
                        width="100"
                        height="300"
                        alt={card.dressedName}
                    />
                    <div class="card-body text-center">
                        <h4 class="card-title">{card.dressedName}</h4>
                        <p class="card-title">{card.dressedDescription}</p>
                        <p class="card-text">{card.dressedPrice}</p>
                        {user &&
                            (<><button className={buttonClass} onClick={handleFavs}>Bookmark</button></>)}

                    </div>
                </div>
            </div>
        </>

    );
};

export default Card;