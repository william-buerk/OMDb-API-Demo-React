import { Link } from "react-router-dom";
import "./Header.scss";

export default function Header() {

    return (
        <header className="header">
            <Link className="header__logo-link" to="/">
                <svg className="header__logo-svg" fill="#ffffff" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                    viewBox="0 0 472.658 472.658" xmlSpace="preserve">
                <g>
                    <g>
                        <path d="M472.572,327.116h-0.005c-0.697,0-55.428-0.981-58.861-96.663c-3.622-100.851-72.728-138.885-120.515-140.647
                            c-30.639-23.009-68.59-36.81-109.857-36.81C82.08,52.996,0,135.077,0,236.33C0,337.582,82.08,419.662,183.333,419.662
                            c101.252,0,183.332-82.08,183.332-183.331c0-46.164-17.191-88.224-45.353-120.457c31.737,12.036,70.133,43.435,72.711,115.291
                            c4.111,114.481,77.659,115.644,78.634,115.644L472.572,327.116z M112.458,317.943c-16.857,9.731-38.41,3.956-48.142-12.899
                            s-3.956-38.411,12.899-48.142c16.856-9.733,38.41-3.956,48.142,12.899C135.089,286.657,129.313,308.212,112.458,317.943z
                            M125.357,202.856c-9.732,16.856-31.286,22.63-48.142,12.899c-16.856-9.731-22.631-31.284-12.899-48.14
                            c9.732-16.858,31.285-22.632,48.142-12.901C129.313,164.447,135.089,186.001,125.357,202.856z M183.333,373.758
                            c-19.464,0-35.242-15.779-35.242-35.243c0-19.461,15.778-35.24,35.242-35.24c19.463,0,35.241,15.779,35.241,35.24
                            C218.575,357.98,202.796,373.758,183.333,373.758z M163.436,236.33c0-10.988,8.908-19.897,19.897-19.897
                            c10.988,0,19.896,8.909,19.896,19.897c0,10.987-8.908,19.896-19.896,19.896C172.344,256.226,163.436,247.318,163.436,236.33z
                            M183.333,169.385c-19.464,0-35.242-15.779-35.242-35.242c0-19.465,15.778-35.243,35.242-35.243
                            c19.463,0,35.241,15.778,35.241,35.243C218.575,153.607,202.796,169.385,183.333,169.385z M302.35,305.044
                            c-9.732,16.856-31.285,22.63-48.142,12.899c-16.856-9.731-22.631-31.286-12.899-48.142c9.732-16.856,31.286-22.632,48.142-12.899
                            C306.307,266.633,312.082,288.188,302.35,305.044z M289.45,215.756c-16.856,9.731-38.41,3.956-48.142-12.899
                            c-9.732-16.856-3.956-38.409,12.899-48.142c16.857-9.731,38.41-3.956,48.142,12.901
                            C312.082,184.472,306.307,206.025,289.45,215.756z"/>
                    </g>
                </g>
                </svg>
                <h1 className="header__link-title">React OMDb API Demo</h1>
            </Link>
        </header>
    );
}