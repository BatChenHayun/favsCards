import React from 'react';

const Footer = () => {
    return (
        <>
            <footer class="bg-dark text-center text-lg-start">
                <div class="p-3" style={{ color: "white" }}>
                    © {new Date().getFullYear()} Copyright:
                    <span class="text-white">  Batchen Hayun</span>
                </div>
            </footer>
        </>
    );

}

export default Footer;