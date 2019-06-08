import React from 'react';
import { Link } from 'react-router-dom';



class Splash extends React.Component {
    constructor(props){
        super(props)
        this.slides = [
        "https://media.giphy.com/media/jtQVX0L0SE775tPpLD/giphy.gif", 
        "https://media.giphy.com/media/kEcyMBSjIIXkLucuHS/giphy.gif",
        "https://media.giphy.com/media/XGsXYhl7bPvTEEUNAK/giphy.gif" 
        ]

        this.state = {
            counter: 0
        }
        this.slideshow = this.slideshow.bind(this)
    }

    componentDidMount(){
        this.slideshow()
    }

    
    slideshow() {
        let { counter } = this.state;
        counter += 1;
        if (counter > this.slides.length - 1) {
            counter = 0;
        }

        this.setState({ counter });
        setTimeout(this.slideshow, 15000);
    }

    render() {
        const { counter } = this.state;
        return (
        <section id="splash">
            <section id="splash-content">
                <h1>It's time to ditch Skype and Roll20</h1>
                <p>All-in-one virtual tabletop simulator and text chat for tabletop gamers that's free and secure.</p>
                <section id="splash-buttons">
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign Up</Link>
                </section>
                <img id="giffer" className="gif" src={this.slides[counter]} />
            </section>
            <i className="fas fa-dice-d20"></i>
        </section>
    )
    }
}

export default Splash;