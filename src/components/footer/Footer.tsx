import "./footer.scss"

const Footer = () => {
    return (
        <>
            <div className="footer">

                <div className="difSections">
                    <div>
                        <section>Find Best Products</section>
                        <p>Browse Product Categories</p>
                        <p>View All Categories</p>
                        <p>Best Sellers</p>
                    </div>

                    <div>
                        <section>About Us</section>
                        <p>About Mithuji</p>
                        <p>Our Services</p>
                        <p>Client Testimonial</p>
                        <p>Buyer Stories</p>
                        <p>Blogs</p>
                    </div>

                    <div>
                        <section>Support</section>
                        <p>Help Center</p>
                        <p>Report Problem</p>
                        <p>Become Seller</p>
                    </div>

                    <div>
                        <section>Language</section>
                        <p>English</p>
                        <p>Hindi</p>
                        <p>Tamil</p>
                    </div>

                    <div>
                        <section>Explore By City</section>
                        <p>Delhi</p>
                        <p>Mumbai</p>
                        <p>Ahmadabad</p>
                        <p>Kolkata</p>
                        <p>More...</p>
                    </div>
                </div>

                <div className="socialCon"></div>

                <div className="privacyCon">
                    <div>Terms of Use</div>
                    <div>Privacy Policy</div>
                    <div>Security Measures</div>
                    <div>IP Policy</div>
                    <div>Cookie Policy</div>
                </div>
                <div className="lastContent">Copyright 2023 Publisher Representatives Limited. All rights reserved.</div>
            </div>
        </>
    )
}

export default Footer