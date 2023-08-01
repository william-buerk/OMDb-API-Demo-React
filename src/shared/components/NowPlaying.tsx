import TinySlider from "tiny-slider-react";
import 'tiny-slider/dist/tiny-slider.css';
import "./NowPlaying.scss";
import { Link } from "react-router-dom";

const imgs = [
    {title: "Asteroid City", imdbID:"tt14230388", src:"/src/assets/asteroid_city_poster.jpg"},
    {title: "Barbie", imdbID:"tt1517268", src:"/src/assets/Barbie_2023_poster.jpg"},
    {title: "Oppenheimer", imdbID:"tt15398776", src:"/src/assets/openheimer_poster.jpg"},
    {title: "Teenage Mutant Ninja Turtles", imdbID:"tt8589698", src:"/src/assets/turtles-mutant-mayhem-character-posters.webp"},
    {title: "Talk To Me", imdbID:"tt10638522", src:"/src/assets/talk_to_me_poster.jpg"},
    {title: "Elemental", imdbID:"tt15789038", src:"/src/assets/elemental_poster.jpeg"},
    {title: "Indiana Jones", imdbID:"tt1462764", src:"/src/assets/indiana_jones.jpg"},
    {title: "Haunded Mansion", imdbID:"tt1695843", src:"/src/assets/haunted-mansion-poster.jpg"},
]

export default function NowPlaying() {

    let tinyslider: any;
    const onGoTo = (dir: string) => { 
        tinyslider?.slider.goTo(dir); 
    };

    const settings = {
        lazyload: true,
        nav: false,
        mouseDrag: true,
        loop: false,
        items: 1,
        controls: false,
        prevButton: ".now-playing__button--prev",
        nextButton: ".now-playing__button--next",
        responsive: {
            700: {
                items: 2
            },
            900: {
                items: 3
            },
            1200: {
                items: 4
            },
            1600: {
                items: 5
            }
        }
    };

    const imgStyles:any = {
        height: "320px",
        objectFit: "scale-down"
    };

    return (
        <div className="now-playing">
            <h2 className="now-playing__header">Now Playing:</h2>
            <div className="now-playing__slider">
                <TinySlider settings={settings} ref={ts => {tinyslider = ts;}}>
                    {imgs.map((el, index) => (
                        <div key={index} style={{ position: "relative" }}>
                            <Link reloadDocument to={`/description/?imdbID=${el.imdbID}`}>
                            <img
                            className={`tns-lazy-img`}
                            src={el.src}
                            data-src={el.src}
                            alt={el.title + " Poster"}
                            style={imgStyles}
                            />
                            </Link>
                        </div>
                    ))}
                </TinySlider>  
                <button className="now-playing__button now-playing__button--prev" onClick={() => onGoTo('prev')} type="button"></button>
                <button className="now-playing__button now-playing__button--next" onClick={() => onGoTo('next')} type="button"></button>
            </div>
        </div>
    );
}