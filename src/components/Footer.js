import logo from "./assets/Item_Logo_footer.jpg"
import instagram_logo from "./assets/instagram-logo.svg"
import facebook_logo from "./assets/facebook-logo.svg"
import twitter_logo from "./assets/twitter-logo.svg"
import linkedin_logo from "./assets/linkedin-logo.svg"
import youtube_logo from "./assets/youtube-logo.svg"


const Footer = () => {
    return (
        <footer>
            <div className='footer__upper-part'>
                <div className='footer__short-info'>
                    <h4>Laptop store</h4>
                    <p>
                        This is test web page, made by 
                        Vitaliy Musyanovych for studying. 
                        All rights are reserved and this
                        invention is patented.
                    </p>
                </div>
                <img className='logo' src={logo} alt='Logo'/>
                <div className='socials'>
                    <img src={instagram_logo} alt='instagram'/>
                    <img src={facebook_logo} alt='instagram'/>
                    <img src={twitter_logo} alt='instagram'/>
                    <img src={linkedin_logo} alt='instagram'/>
                    <img src={youtube_logo} alt='instagram'/>
                </div>    
            </div>
            <div className='line'></div>
            <div className='footer__rights'>
                <p>2021 VM © All rights reserved</p>
            </div>
        </footer>
    )
}

export default Footer
