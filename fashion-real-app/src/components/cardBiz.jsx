import React from "react";
import { Link } from "react-router-dom";

const CardBiz = ({ card, onDelete}) => {
    return (
        <>
            <div className="col-6">
                <div className="card m-4" style={{ width: "400px" }}>
                    <img className="p-2 card-img-top" style={{
                        borderRadius: "50px"
                    }}
                        src={card.dressedImage}
                        width="100"
                        height="400"
                        alt={card.dressedName}
                    />
                    <div class="card-body text-center">
                        <h4 class="card-title">{card.dressedName}</h4>
                        <p class="card-title">{card.dressedDescription}</p>
                        <p class="card-text">{card.dressedPrice}</p>
                     
                        <Link to={`/my-cards/edit/${card._id}`}>Edit</Link> |
                            <Link to={`/my-cards/delete/${card._id}`}>
                            <button className="btn btn-danger text-white ml-4"
                                onClick={onDelete}
                            >
                                Delete
                                </button>
                        </Link>




                    </div>
                </div>
            </div>
        </>

    );
};

export default CardBiz;