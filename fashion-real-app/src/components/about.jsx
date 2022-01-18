import React from "react";
import TextHeader from "./common/pageHeader";

const About = () => {
    return (  <div className="container">
                <div className="row">
                    <div className="col-12 mt-4">
                        <TextHeader textHeader="About us..."></TextHeader>
                    </div>
                </div>
                <div className="container">
                    <div className="row box1">
                        <div className="col-12 mt-4 text-center">
                            <p>On this site you can watch different clothing cards.</p>
                            <p> Regular users will be able to sign-up to the site,
                            <br></br>
                            then connect to it and only then add tickets to their favorite list and of course watch it.</p>
                            <p> Users that log-in as administrators:("BizSignup")
                            <br></br>
                            will be able to do the same actions above
                            <br></br>
                            and in addition add new cards and update or delete existing cards.</p>
                            <p> In the search input you can enter a search item by its full name or part of the name,
                            <br></br>
                            For example: input 'ג'ינס' will bring all the elements in which this word appears
                            </p>
                            Enjoy.
                        </div>
                    </div>
                </div>
            </div> );
}
 
export default About;

